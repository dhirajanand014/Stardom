import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FlatList, StatusBar, View, Text } from "react-native"
import { CategoryContext } from '../../App';
import {
    actionButtonTextConstants, alertTextMessages, fieldControllerName, jsonConstants,
    miscMessage, numericConstants, PRIVATE_FOLLOW_UNFOLLOW,
    requestConstants, responseStringData, stringConstants
} from '../../constants/Constants';
import { fetchUserFollowersFollowing, showSnackBar, userPostAction } from '../../helper/Helper';
import { SDGenericStyles, userAuthStyles } from '../../styles/Styles';
import Animated, {
    Extrapolate, interpolate, useAnimatedScrollHandler,
    useAnimatedStyle, useSharedValue
} from 'react-native-reanimated';
import { UserFollowFollowingRenderer } from '../../views/menus/UserFollowFollowingRenderer';
import { SDSearchInput } from '../../components/input/SDSearchInput';

export const UserFollowFollowing = () => {

    const [userFollowerFollowing, setUserFollowerFollowing] = useState({
        users: jsonConstants.EMPTY
    });

    const [searchList, setSearchList] = useState({
        users: jsonConstants.EMPTY
    });

    const navigation = useNavigation();
    const scrollYValue = useSharedValue(numericConstants.ZERO);

    const listViewScrollHandler = useAnimatedScrollHandler((event) => (scrollYValue.value = event.contentOffset.y));

    const itemSize = numericConstants.SEVENTY + numericConstants.TWENTY * numericConstants.THREE;

    const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

    const { loggedInUser, setLoggedInUser, loader, setLoader } = useContext(CategoryContext);

    const route = useRoute();
    const listFor = route.params?.listFor || stringConstants.EMPTY;

    const filterPrivateAccessUsers = (responseData) => {
        const user = JSON.parse(loggedInUser.loginDetails.details);
        const followerIds = user.followers.filter(follower => follower.pvtaccess == PRIVATE_FOLLOW_UNFOLLOW.REQUESTED)
            .map(follower => follower.follower_id);
        responseData.users && responseData.users.filter(user => followerIds.some(followerId => followerId == user.id));
    }

    useEffect(async () => {
        setLoader({ ...loader, isLoading: true, loadingText: alertTextMessages.LOADING_USER_DETAILS });
        const responseData = await fetchUserFollowersFollowing(listFor, loggedInUser.loginDetails.token);
        if (listFor == miscMessage.PRIVATE_REQUEST_ACCESS) {
            filterPrivateAccessUsers(responseData);
        } else if (listFor == fieldControllerName.SEARCH_USERS) {
            setSearchList(responseData);
        }
        setUserFollowerFollowing(responseData);
        setLoader({ ...loader, isLoading: false, loadingText: stringConstants.EMPTY });
    }, jsonConstants.EMPTY);

    const setLoading = (action, isLoading) => {
        if (action == actionButtonTextConstants.APPROVE) {
            setLoader({ ...loader, isLoading: isLoading, loadingText: alertTextMessages.APPROVING_VERIFICATION_REQUEST });
        } else if (action == actionButtonTextConstants.REJECT) {
            setLoader({ ...loader, isLoading: isLoading, loadingText: alertTextMessages.REJECTING_VERIFICATION_REQUEST });
        }
    }

    const actionCallBack = useCallback(async (id, action) => {
        setLoading(action, true);
        const requestData = { [requestConstants.FOLLOWER_ID]: id, [requestConstants.APPROVAL_ACTION]: action };
        const requestJSON = JSON.stringify(requestData);

        const responseData = await userPostAction(requestConstants.PRIVATE_ACCESS_ACTION, requestJSON,
            loggedInUser.loginDetails.token);

        if (responseData.message == responseStringData.SUCCESSFULLY_UPDATED) {
            const userDetails = JSON.parse(loggedInUser.loginDetails.details);
            userDetails.followers.filter(follower => follower.follower_id == id)
                .map(follower => follower.pvtaccess = action == actionButtonTextConstants.APPROVE && PRIVATE_FOLLOW_UNFOLLOW.APPROVED ||
                    PRIVATE_FOLLOW_UNFOLLOW.REJECTED);
            loggedInUser.loginDetails.details = JSON.stringify(userDetails);
            showSnackBar(action == actionButtonTextConstants.APPROVE && alertTextMessages.YOU_HAVE_SUCCESSFULLY_APPROVED ||
                alertTextMessages.YOU_HAVE_SUCCESSFULLY_REJECTED, true);
            setLoggedInUser({ ...loggedInUser });
        }
        setLoading(action, false);
        navigation.goBack();
    })

    const emptyListMessage = () => {
        return (
            <View style={[SDGenericStyles.fill_half, SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter]}>
                <Text style={[SDGenericStyles.ft18, SDGenericStyles.fontFamilyRoman, SDGenericStyles.placeHolderTextColor,
                SDGenericStyles.textCenterAlign, SDGenericStyles.paddingTop40]}>
                    {
                        listFor == miscMessage.FOLLOWERS_TEXT && alertTextMessages.YOU_HAVE_NO_FOLLOWERS
                    }
                    {
                        listFor == miscMessage.FOLLOWING_TEXT && alertTextMessages.NO_ONE_FOLLOWING
                    }
                    {
                        listFor == fieldControllerName.SEARCH_USERS && alertTextMessages.NO_USERS_AVAILABLE
                    }
                </Text>
            </View>
        )
    }

    const scaleAnimation = (scrollYValue, index) => {
        'worklet';

        return interpolate(scrollYValue.value, [numericConstants.MINUS_ONE, numericConstants.ZERO,
        itemSize * index, itemSize * (index + numericConstants.TWO)], [numericConstants.ONE,
        numericConstants.ONE, numericConstants.ONE, numericConstants.ZERO], Extrapolate.CLAMP);
    };

    const opacity = (scrollYValue, index) => {
        'worklet';

        return interpolate(scrollYValue.value, [numericConstants.MINUS_ONE, numericConstants.ZERO,
        itemSize * index, itemSize * (index + numericConstants.ZEROPTFIVE)], [numericConstants.ONE,
        numericConstants.ONE, numericConstants.ONE, numericConstants.ZERO], Extrapolate.CLAMP);
    }

    const RenderFollowingFollower = props => {
        const animationStyle = useAnimatedStyle(() => {
            return {
                transform: [{
                    scale: scaleAnimation(props.scrollYValue, props.index)
                }],
                opacity: opacity(props.scrollYValue, props.index)
            }
        });
        return <UserFollowFollowingRenderer item={props.item} index={props.index} listFor={props.listFor} actionCallBack={props.actionCallBack}
            animationStyle={animationStyle} />
    }

    return (
        <Animated.View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack]}>
            {
                listFor == fieldControllerName.SEARCH_USERS &&
                <Animated.View style={SDGenericStyles.padding20}>
                    <Animated.View style={[userAuthStyles.searchUserInput, SDGenericStyles.paddingStart10]}>
                        <SDSearchInput extraStyles={[SDGenericStyles.ft16, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRoman]}
                            state={searchList} setState={setSearchList} inputName={fieldControllerName.SEARCH_USERS} items={userFollowerFollowing.users} />
                    </Animated.View>
                </Animated.View>
            }
            <AnimatedFlatlist data={listFor == fieldControllerName.SEARCH_USERS && searchList.users || userFollowerFollowing.users}
                keyExtractor={(item) => item.key} key={`1_${numericConstants.ONE}`} renderItem={({ item, index }) => {
                    return <RenderFollowingFollower item={item} scrollYValue={scrollYValue} index={index}
                        actionCallBack={actionCallBack} />
                }} contentContainerStyle={[SDGenericStyles.padding20, { paddingTop: StatusBar.currentHeight || numericConstants.FORTY_TWO }]}
                ListEmptyComponent={emptyListMessage} onScroll={listViewScrollHandler} scrollEventThrottle={numericConstants.SIXTEEN} />
        </Animated.View>
    )
}