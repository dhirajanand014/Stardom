import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FlatList, StatusBar, View, Text, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { CategoryContext } from '../../App';
import {
    alertTextMessages, errorMessages, fieldControllerName, jsonConstants,
    modalTextConstants,
    numericConstants, placeHolderText, screens, stringConstants
} from '../../constants/Constants';
import { fetchUserForSearch } from '../../helper/Helper';
import { UserFollowFollowingRenderer } from '../../views/menus/UserFollowFollowingRenderer';
import { BackButton } from '../../components/button/BackButton';
import { SDSearchInput } from '../../components/input/SDSearchInput';
import { SDGenericStyles, userAuthStyles, userMenuStyles } from '../../styles/Styles';
import { TabView, TabBar } from 'react-native-tab-view';
import FastImage from 'react-native-fast-image';
export const SDSearchUserAndPosts = props => {

    const { viewPagerPostsRef } = useContext(CategoryContext);

    const [userFollowerFollowing, setUserFollowerFollowing] = useState({
        users: jsonConstants.EMPTY
    });
    const [searchList, setSearchList] = useState({
        users: jsonConstants.EMPTY,
        posts: jsonConstants.EMPTY
    });

    const route = useRoute();
    const toIndex = route.params?.toIndex || numericConstants.ZERO;
    const userPosts = route.params?.userPosts || stringConstants.EMPTY;
    const postDetailsRef = route.params?.postDetailsRef || stringConstants.EMPTY;

    const [routes] = useState([
        { key: screens.POSTS_TAB, title: placeHolderText.POSTS },
        { key: screens.USERS_TAB, title: placeHolderText.USERS }]);

    const [index, setIndex] = useState(toIndex);

    const navigation = useNavigation();
    const scrollYValue = useSharedValue(numericConstants.ZERO);

    const listViewScrollHandler = useAnimatedScrollHandler((event) => (scrollYValue.value = event.contentOffset.y));
    const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

    const { loggedInUser, setLoaderCallback } = useContext(CategoryContext);

    useEffect(() => {
        (async () => {
            setLoaderCallback(true, index == numericConstants.ZERO && alertTextMessages.LOADING_USERS_POSTS ||
                alertTextMessages.LOADING_USERS);
            searchList.posts = userPosts;
            if (loggedInUser.isLoggedIn) {
                const responseData = await fetchUserForSearch(loggedInUser.loginDetails.token);
                searchList.users = responseData.users;
                setUserFollowerFollowing(responseData);
            }
            setSearchList({ ...searchList });
            setLoaderCallback(false);
        })();
    }, jsonConstants.EMPTY);

    const emptyListMessage = () => {
        return (
            <View style={[SDGenericStyles.fill_half, SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter]}>
                <Text style={[SDGenericStyles.ft18, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.placeHolderTextColor,
                SDGenericStyles.textCenterAlign, SDGenericStyles.paddingTop40]}>
                    {
                        index == numericConstants.ZERO && alertTextMessages.NO_POSTS || !loggedInUser.isLoggedIn &&
                        alertTextMessages.PLEASE_LOGIN_TO_VIEW_USERS || alertTextMessages.NO_USERS_AVAILABLE
                    }
                </Text>
            </View>
        )
    }

    const actionCallBack = useCallback(async (action, index, userItem) => {
        switch (action) {
            case screens.POSTS_TAB:
                const currentViewPagerIndex = viewPagerPostsRef.current?.state.index;
                viewPagerPostsRef.current?.scrollBy(index - currentViewPagerIndex);
                postDetailsRef?.current?.setPostAnimationVisible(false);
                navigation.navigate(screens.GLANCE);
                break;
            case screens.USERS_TAB:
                let item = { ...userItem, profile_image: userItem.profile_picture };
                delete item.profile_picture;
                navigation.navigate(screens.FOLLOWER_FOLLOWING_PROFILE, {
                    isFrom: modalTextConstants.VIEW_FOLLOWER_FOLLOWING_PROFILE,
                    followerFollowingProfile: item
                })
                break;
            default:
                console.warn(errorMessages.COULD_NOT_PERFORM_ACTION, action);
                break;
        }
    });

    const RenderPostSearchContent = props => {
        return <TouchableOpacity activeOpacity={.7} style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.backGroundColorGray,
        SDGenericStyles.padding20, SDGenericStyles.marginBottom15, SDGenericStyles.borderRadius5]} onPress={() =>
            props.actionCallBack(screens.POSTS_TAB, props.index)}>
            <FastImage source={{
                uri: props.item.postImage, priority: FastImage.priority.normal, cache: FastImage.cacheControl.immutable
            }} style={[userMenuStyles.followerFollowingImageStyle, SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter,
            SDGenericStyles.marginRight15]}>
            </FastImage>
            <Text style={[SDGenericStyles.ft20, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.paddingBottom5]}>
                {props.item.postTitle}
            </Text>
        </TouchableOpacity >
    }

    const renderScene = ({ route }) => {
        switch (route.key) {
            case screens.POSTS_TAB:
                return <AnimatedFlatlist data={searchList.posts} keyExtractor={(item) => item.id} key={`1_${numericConstants.ONE}`} renderItem={({ item, index }) => {
                    return <RenderPostSearchContent item={item} index={index} actionCallBack={actionCallBack} />
                }} contentContainerStyle={[SDGenericStyles.padding20, { paddingTop: StatusBar.currentHeight || numericConstants.FORTY_TWO }]}
                    ListEmptyComponent={emptyListMessage} onScroll={listViewScrollHandler} scrollEventThrottle={numericConstants.SIXTEEN} />
            case screens.USERS_TAB:
                return <AnimatedFlatlist data={searchList.users} keyExtractor={(item) => item.id} key={`1_${numericConstants.ONE}`} renderItem={({ item, index }) => {
                    return <UserFollowFollowingRenderer item={item} index={index} actionCallBack={actionCallBack} isSearchUser />
                }} contentContainerStyle={[SDGenericStyles.padding20, { paddingTop: StatusBar.currentHeight || numericConstants.FORTY_TWO }]}
                    ListEmptyComponent={emptyListMessage} onScroll={listViewScrollHandler} scrollEventThrottle={numericConstants.SIXTEEN} />
            default: return <View />;
        }
    };

    const setIndexCallBack = useCallback((index) => {
        setLoaderCallback(true, index == numericConstants.ZERO && alertTextMessages.LOADING_USERS_POSTS ||
            alertTextMessages.LOADING_USERS);
        setIndex(index);
        setLoaderCallback(false);
    });
    const renderTabBar = props => (
        <TabBar {...props} indicatorStyle={SDGenericStyles.colorYellow} style={SDGenericStyles.backGroundColorBlack} />
    );

    return (
        <PostUsersTabbedView searchList={searchList} setSearchList={setSearchList} index={index} routes={routes} renderScene={renderScene}
            setIndex={setIndex} renderTabBar={renderTabBar} setIndexCallBack={setIndexCallBack} setLoaderCallback={setLoaderCallback} userPosts={userPosts}
            userFollowerFollowing={userFollowerFollowing} />
    )
}

const PostUsersTabbedView = React.memo(({ searchList, setSearchList, index, routes, renderScene, setIndexCallBack, renderTabBar,
    setLoaderCallback, userFollowerFollowing, userPosts }) => {
    return <Animated.View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack]}>
        <BackButton leftStyle={numericConstants.ONE} isWithSearch />
        <Animated.View style={SDGenericStyles.padding20}>
            <Animated.View style={[userAuthStyles.searchUserInput, SDGenericStyles.marginStart20]}>
                <SDSearchInput extraStyles={[SDGenericStyles.ft16, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoRegular]}
                    state={searchList} setState={setSearchList} inputName={index == numericConstants.ZERO && fieldControllerName.SEARCH_POSTS ||
                        fieldControllerName.SEARCH_USERS} items={index == numericConstants.ZERO && userPosts || userFollowerFollowing.users}
                    placeHolderText={index == numericConstants.ZERO && placeHolderText.SEARCH_POSTS || placeHolderText.SEARCH_USERS} />
            </Animated.View>
        </Animated.View>
        <TabView navigationState={{ index, routes }} renderScene={renderScene} onIndexChange={setIndexCallBack}
            renderTabBar={renderTabBar} onSwipeStart={() => setLoaderCallback(true, index == numericConstants.ZERO && alertTextMessages.LOADING_USERS_POSTS ||
                alertTextMessages.LOADING_USERS)} onSwipeEnd={() => setLoaderCallback(false)} />
    </Animated.View>;
});
