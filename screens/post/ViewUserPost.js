import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, StatusBar, Dimensions, Image } from 'react-native';
import {
    width, miscMessage, numericConstants, jsonConstants, stringConstants, keyChainConstansts
} from '../../constants/Constants';
import {
    fetchUserProfilePosts, getPostIdFromStorage, onSwiperScrollEnd,
    resetAnimatePostTextDetails, setImageLoadError
} from '../../helper/Helper';
import { glancePostStyles, SDGenericStyles } from '../../styles/Styles';
import Animated, { useDerivedValue, useSharedValue } from 'react-native-reanimated';
import Swiper from 'react-native-swiper';
import * as Keychain from 'react-native-keychain';
import { SwipeItem } from '../../components/swiper/SwipeItem';
import { useNavigation, useRoute } from '@react-navigation/core';
import { ViewUserPostDetails } from './ViewUserPostDetails';
import FastImage from 'react-native-fast-image';
import { BackButton } from '../../components/button/BackButton';
import { SDLoaderLogo } from '../../views/absoluteView/SDLoaderLogo';
import { CategoryContext } from '../../App';

export const ViewUserPost = () => {

    const navigation = useNavigation();
    const { loggedInUser } = useContext(CategoryContext);
    const route = useRoute();
    const userId = route.params?.userId;
    const postId = route.params?.postId;

    const [posts, setPosts] = useState(jsonConstants.EMPTY);

    const [postsOptions, setPostOptions] = useState({
        currentPostIndex: numericConstants.ZERO,
        selectedPost: stringConstants.EMPTY,
        isImageLoadError: false
    });

    const viewPagerRef = useRef(null);
    const postDetailsRef = useRef(null);

    let { height } = Dimensions.get(miscMessage.WINDOW);
    height += StatusBar.currentHeight;

    useEffect(() => {
        (async () => {
            await fetchUserProfilePosts(userId, setPosts, postDetailsRef);
            setTimeout(() => postDetailsRef?.current?.setScrollOffset(height), numericConstants.FIVE_HUNDRED);
        })();
    }, jsonConstants.EMPTY);

    const textPostDescriptionAnimationValue = useSharedValue(-numericConstants.TEN);
    const textPostTypeAnimationValue = useSharedValue(-numericConstants.TEN);

    const textPostDescriptionAnimationValue_translate_x = useDerivedValue(() => {
        return textPostDescriptionAnimationValue.value * numericConstants.ONE_HUNDRED;
    });

    const textPostTypeAnimationValue_translate_x = useDerivedValue(() => {
        return textPostTypeAnimationValue.value * numericConstants.ONE_HUNDRED;
    });

    const loadMinimalLoaderView = height => {
        return <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter, SDGenericStyles.backGroundAppBlack,
        SDGenericStyles.paddingHorizontal10, { width: width, height: height }]}>
            <FastImage source={{
                uri: Image.resolveAssetSource(require(`../../assets/stardom_loader.gif`)).uri,
                priority: FastImage.priority.normal
            }} style={{ width: numericConstants.ONE_HUNDRED, height: numericConstants.ONE_HUNDRED }} resizeMode={FastImage.resizeMode.contain} />
        </View>;
    }

    return (
        <UserPostsView posts={posts} viewPagerRef={viewPagerRef} postDetailsRef={postDetailsRef} postsOptions={postsOptions} setPostOptions={setPostOptions}
            textPostDescriptionAnimationValue_translate_x={textPostDescriptionAnimationValue_translate_x} textPostTypeAnimationValue_translate_x={textPostTypeAnimationValue_translate_x}
            height={height} navigation={navigation} postIdFromNotification={postId} loadMinimalLoaderView={loadMinimalLoaderView} loggedInUser={loggedInUser} />
    )
}

const UserPostsView = React.memo(({ posts, viewPagerRef, postDetailsRef, postsOptions, setPostOptions, textPostDescriptionAnimationValue_translate_x, textPostTypeAnimationValue_translate_x,
    height, navigation, postIdFromNotification, loadMinimalLoaderView, loggedInUser }) => {
    return <View style={SDGenericStyles.fill}>
        <BackButton goBack leftStyle={numericConstants.TEN} extraStyles={SDGenericStyles.marginTop20} />
        {
            posts && posts.length &&
            <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack]}>
                <Swiper ref={viewPagerRef} index={postDetailsRef?.current?.postIndex} horizontal={false} showsPagination={false} scrollEventThrottle={numericConstants.SIXTEEN}
                    bounces loadMinimal loadMinimalSize={numericConstants.TWENTY_FIVE} loadMinimalLoader={loadMinimalLoaderView(height)} onContentSizeChange={async () => {
                        const postIdStorage = await getPostIdFromStorage();
                        if (postIdStorage) {
                            const index = posts.findIndex(post => post.id == JSON.parse(postIdStorage.password).id)
                            viewPagerRef.current.scrollBy(index, false);
                            await Keychain.resetGenericPassword({ service: keyChainConstansts.POST_ID_KEY });
                        }
                    }} onMomentumScrollBegin={(event) => {
                        const index = Math.round(event.nativeEvent.contentOffset.y / event.nativeEvent.layoutMeasurement.height) - numericConstants.ONE;
                        if ((index == numericConstants.ZERO && ((postDetailsRef?.current?.scrollOffset == height && postDetailsRef?.current?.scrollOffset > event.nativeEvent.contentOffset.y)
                            || postDetailsRef?.current?.scrollOffset > event.nativeEvent.contentOffset.y)) || index == posts.length - numericConstants.ONE
                            && postDetailsRef?.current?.scrollOffset < event.nativeEvent.contentOffset.y) {
                            postDetailsRef?.current?.setRenderLoaderScroll(true);
                        }
                        if (postsOptions.isImageLoadError) {
                            setImageLoadError(postsOptions, postsOptions, false);
                        }
                        postDetailsRef?.current?.setPostAnimationVisible(true);
                    }}
                    onMomentumScrollEnd={(event) => onSwiperScrollEnd(event, postDetailsRef, textPostDescriptionAnimationValue_translate_x, textPostTypeAnimationValue_translate_x, false)}
                    onScroll={(event) => {
                        const index = Math.round(event.nativeEvent.contentOffset.y / event.nativeEvent.layoutMeasurement.height) - numericConstants.ONE;
                        if (!(index == numericConstants.ZERO || index == posts.length - numericConstants.ONE)) {
                            resetAnimatePostTextDetails(textPostDescriptionAnimationValue_translate_x,
                                textPostTypeAnimationValue_translate_x);
                        }
                    }}>
                    {
                        posts.map((item, index) => {
                            return <Animated.View key={index} style={glancePostStyles.overlayImage}>
                                <SwipeItem width={width} height={height} item={item} index={index} posts={posts} postIdFromNotification={postIdFromNotification}
                                    viewPagerRef={viewPagerRef} postDetailsRef={postDetailsRef} optionsState={postsOptions} setOptionsState={setPostOptions} />
                            </Animated.View>;
                        })}
                </Swiper>
                <ViewUserPostDetails ref={postDetailsRef} textPostTypeAnimationValue={textPostTypeAnimationValue_translate_x} width={width} height={height} posts={posts}
                    navigation={navigation} viewPagerRef={viewPagerRef} textPostDescriptionAnimationValue={textPostDescriptionAnimationValue_translate_x} loggedInUser={loggedInUser} />
            </View> || <View>
                <View style={{ width: width, height: height }} >
                    <View style={glancePostStyles.shimmerViewInit}>
                        <FastImage style={glancePostStyles.preloaderStyle} source={{
                            uri: Image.resolveAssetSource(require(`../../assets/stardom_loader.gif`)).uri,
                            priority: FastImage.priority.normal
                        }} />
                    </View>
                    <SDLoaderLogo />
                </View>
            </View>}
    </View>;
});