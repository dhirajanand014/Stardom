import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FlatList, StatusBar, View, Text } from "react-native"
import { CategoryContext } from '../../App';
import {
    actionButtonTextConstants, alertTextMessages, fieldControllerName, jsonConstants,
    miscMessage, modalTextConstants, numericConstants, placeHolderText, PRIVATE_FOLLOW_UNFOLLOW,
    requestConstants, responseStringData, screens, stringConstants
} from '../../constants/Constants';
import {
    fetchUserFollowersFollowing, showSnackBar, userPostAction, handleUserFollowUnfollowAction,
} from '../../helper/Helper';
import { SDGenericStyles, userAuthStyles } from '../../styles/Styles';
import { SDSearchInput } from '../../components/input/SDSearchInput';
import Animated, {
    Extrapolate, interpolate, useAnimatedScrollHandler,
    useAnimatedStyle, useSharedValue
} from 'react-native-reanimated';
import { BackButton } from '../../components/button/BackButton';
import { UserFollowFollowingRenderer } from '../../views/menus/UserFollowFollowingRenderer';

export const UserFollowFollowing = () => {

    const navigation = useNavigation();
    const scrollYValue = useSharedValue(numericConstants.ZERO);

    const listViewScrollHandler = useAnimatedScrollHandler((event) => (scrollYValue.value = event.contentOffset.y));

    const itemSize = numericConstants.SEVENTY + numericConstants.TWENTY * numericConstants.THREE;

    const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

    const { loggedInUser, setLoggedInUser, setLoaderCallback } = useContext(CategoryContext);

    const route = useRoute();
    const listFor = route.params?.listFor || stringConstants.EMPTY;
    const userLoggedIn = route.params?.loggedInUser || loggedInUser;

    const [userFollowerFollowing, setUserFollowerFollowing] = useState({
        users: jsonConstants.EMPTY
    });
    const [searchList, setSearchList] = useState({
        users: jsonConstants.EMPTY,
    });

    const filterPrivateAccessUsers = (responseData) => {
        const user = JSON.parse(userLoggedIn.loginDetails.details);
        const followerIds = user.followers.filter(follower => follower.pvtaccess == PRIVATE_FOLLOW_UNFOLLOW.REQUESTED)
            .map(follower => follower.follower_id);
        responseData.users && responseData.users.filter(user => followerIds.some(followerId => followerId == user.id));
    }

    useEffect(() => {
        (async () => {
            setLoaderCallback(true, alertTextMessages.LOADING_USER_DETAILS);
            const responseData = await fetchUserFollowersFollowing(listFor, userLoggedIn.loginDetails.token);
            if (listFor == miscMessage.PRIVATE_REQUEST_ACCESS) {
                filterPrivateAccessUsers(responseData);
            }
            setSearchList({ ...searchList, users: responseData.users });
            setUserFollowerFollowing(responseData);
            setLoaderCallback(false);
        })();
    }, jsonConstants.EMPTY);

    const viewFollowerFollowingProfile = useCallback((userItem) => {
        let item = { ...userItem, profile_image: userItem.profile_picture };
        delete item.profile_picture;
        navigation.navigate(screens.FOLLOWER_FOLLOWING_PROFILE, {
            isFrom: modalTextConstants.VIEW_FOLLOWER_FOLLOWING_PROFILE,
            followerFollowingProfile: item
        })
    });

    const setLoading = (action, isLoading) => {
        if (action == actionButtonTextConstants.APPROVE) {
            setLoaderCallback(isLoading, alertTextMessages.APPROVING_VERIFICATION_REQUEST);
        } else if (action == actionButtonTextConstants.REJECT) {
            setLoaderCallback(isLoading, alertTextMessages.REJECTING_VERIFICATION_REQUEST);
        } else if (action == actionButtonTextConstants.REMOVE) {
            setLoaderCallback(isLoading, alertTextMessages.REMOVING_FOLLOWER);
        }
    }

    const actionCallBack = useCallback(async (id, index, action) => {
        setLoading(action, true);
        if (action == actionButtonTextConstants.REMOVE) {
            const responseData = await handleUserFollowUnfollowAction(actionButtonTextConstants.REMOVE, id, false);
            if (responseData && responseData.message.includes(responseStringData.SUCCESS)) {
                const userDetails = JSON.parse(userLoggedIn.loginDetails.details);
                const followerIndex = userDetails.followers.findIndex(follower => follower.follower_id = id);

                userDetails.followers.splice(followerIndex, numericConstants.ONE);
                userFollowerFollowing.users.splice(index, numericConstants.ONE);

                userLoggedIn.loginDetails.details = JSON.stringify(userDetails);

                setLoggedInUser({ ...userLoggedIn });
                setUserFollowerFollowing({ ...userFollowerFollowing });
            }
        } else if (action == actionButtonTextConstants.APPROVE || action == actionButtonTextConstants.REJECT) {
            const requestData = { [requestConstants.FOLLOWER_ID]: id, [requestConstants.APPROVAL_ACTION]: action };
            const requestJSON = JSON.stringify(requestData);

            const responseData = await userPostAction(requestConstants.PRIVATE_ACCESS_ACTION, requestJSON,
                userLoggedIn.loginDetails.token);
            if (responseData.message == responseStringData.SUCCESSFULLY_UPDATED) {
                const userDetails = JSON.parse(userLoggedIn.loginDetails.details);
                userDetails.followers.filter(follower => follower.follower_id == id)
                    .map(follower => follower.pvtaccess = action == actionButtonTextConstants.APPROVE && PRIVATE_FOLLOW_UNFOLLOW.APPROVED ||
                        PRIVATE_FOLLOW_UNFOLLOW.REJECTED);
                userLoggedIn.loginDetails.details = JSON.stringify(userDetails);
                userFollowerFollowing.users.splice(index, numericConstants.ONE);
                showSnackBar(action == actionButtonTextConstants.APPROVE && alertTextMessages.YOU_HAVE_SUCCESSFULLY_APPROVED ||
                    alertTextMessages.YOU_HAVE_SUCCESSFULLY_REJECTED, true);
                setLoggedInUser({ ...userLoggedIn });
                setUserFollowerFollowing({ ...userFollowerFollowing });
            }
        }
        setLoading(action, false);
        navigation.goBack();
    })

    const emptyListMessage = () => {
        return (
            <View style={[SDGenericStyles.fill_half, SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter]}>
                <Text style={[SDGenericStyles.ft18, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.placeHolderTextColor,
                SDGenericStyles.textCenterAlign, SDGenericStyles.paddingTop40]}>
                    {
                        listFor == miscMessage.FOLLOWERS_TEXT && alertTextMessages.YOU_HAVE_NO_FOLLOWERS
                    }
                    {
                        listFor == miscMessage.FOLLOWING_TEXT && alertTextMessages.NO_ONE_FOLLOWING
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
            animationStyle={animationStyle} viewFollowerFollowingProfile={props.viewFollowerFollowingProfile} />
    }

    return (
        <Animated.View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack]}>
            {
                (listFor == miscMessage.FOLLOWERS_TEXT || listFor == miscMessage.FOLLOWING_TEXT) &&
                <Animated.View style={SDGenericStyles.padding20}>
                    <BackButton goBack leftStyle={numericConstants.ONE} isWithSearch />
                    <Animated.View style={[userAuthStyles.searchUserInput, SDGenericStyles.marginStart20]}>
                        <SDSearchInput extraStyles={[SDGenericStyles.ft16, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoRegular]}
                            state={searchList} setState={setSearchList} inputName={listFor == miscMessage.FOLLOWERS_TEXT && fieldControllerName.SEARCH_FOLLOWERS ||
                                fieldControllerName.SEARCH_FOLLOWINGS} items={userFollowerFollowing.users} placeHolderText={listFor == miscMessage.FOLLOWERS_TEXT
                                    && placeHolderText.SEARCH_FOLLOWERS || placeHolderText.SEARCH_FOLLOWINGS} />
                    </Animated.View>
                </Animated.View>
            }
            <AnimatedFlatlist data={searchList.users} keyExtractor={(item) => item.id} key={`1_${numericConstants.ONE}`}
                renderItem={({ item, index }) => {
                    return <RenderFollowingFollower item={item} scrollYValue={scrollYValue} index={index} listFor={listFor}
                        actionCallBack={actionCallBack} viewFollowerFollowingProfile={viewFollowerFollowingProfile} />
                }} contentContainerStyle={[SDGenericStyles.padding20, { paddingTop: StatusBar.currentHeight || numericConstants.FORTY_TWO }]}
                ListEmptyComponent={emptyListMessage} onScroll={listViewScrollHandler} scrollEventThrottle={numericConstants.SIXTEEN} />
        </Animated.View>
    )
}