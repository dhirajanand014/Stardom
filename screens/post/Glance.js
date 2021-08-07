import React, { useEffect, useRef, useContext } from 'react';
import { View, Image, StatusBar, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import {
    componentErrorConsts, errorMessages,
    width, miscMessage, numericConstants, jsonConstants
} from '../../constants/Constants';
import {
    onSwiperScrollEnd, fetchPostsAndSaveToState,
    resetAnimatePostTextDetails, setImageLoadError
} from '../../helper/Helper';
import { glancePostStyles, SDGenericStyles } from '../../styles/Styles';
import Animated, { useDerivedValue, useSharedValue } from 'react-native-reanimated';
import Swiper from 'react-native-swiper';
import { PostDetails } from './PostDetails';
import FastImage from 'react-native-fast-image';
import { CategoryContext } from '../../App';
import { SwipeItem } from '../../components/swiper/SwipeItem';
import { SDFallBackComponent } from '../../views/errorHandleView/SDFallBackComponent';
import { useIsFocused, useRoute } from '@react-navigation/native';

const category_selection = require('../../assets/category_selection_icon.png');

export const Glance = ({ navigation }) => {

    const { postIdFromNotification, categoryIdFromNotification, sdomDatastate, setSdomDatastate, currentPostIndexForProfileRef,
        optionsState, setOptionsState, loggedInUser, setDrawerOpen, postDetailsRef } = useContext(CategoryContext);
    const viewPagerRef = useRef(null);
    const isFromNotification = useRef(false);
    const isFocused = useIsFocused();

    const route = useRoute();
    isFromNotification.current = route.params?.isFromNotification || false;
    const postId = route.params?.postIdFromNotification || postIdFromNotification;

    let { height } = Dimensions.get(miscMessage.WINDOW);
    height += StatusBar.currentHeight;

    useEffect(() => {
        if (!isFocused) postDetailsRef?.current?.setPostAnimationVisible(false);
    }, [!isFocused]);

    useEffect(() => {
        (async () => {
            await fetchPostsAndSaveToState(sdomDatastate, setSdomDatastate, optionsState, setOptionsState,
                categoryIdFromNotification, loggedInUser);
            postDetailsRef?.current?.setScrollOffset(height);
        })();
    }, jsonConstants.EMPTY);

    const textPostDescriptionAnimationValue = useSharedValue(-numericConstants.TEN);
    const textPostTypeAnimationValue = useSharedValue(-numericConstants.TEN);

    const textPostDescriptionAnimationValue_translate_x = useDerivedValue(() => {
        return textPostDescriptionAnimationValue.value * numericConstants.ONE_HUNDRED;
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

    const textPostTypeAnimationValue_translate_x = useDerivedValue(() => {
        return textPostTypeAnimationValue.value * numericConstants.ONE_HUNDRED;
    });

    return (
        <GlanceComponent sdomDatastate={sdomDatastate} viewPagerRef={viewPagerRef} postDetailsRef={postDetailsRef} optionsState={optionsState} setOptionsState={setOptionsState}
            textPostDescriptionAnimationValue_translate_x={textPostDescriptionAnimationValue_translate_x} textPostTypeAnimationValue_translate_x={textPostTypeAnimationValue_translate_x}
            currentPostIndexForProfileRef={currentPostIndexForProfileRef} height={height} postIdFromNotification={postId} navigation={navigation}
            setSdomDatastate={setSdomDatastate} isFromNotification={isFromNotification} setDrawerOpen={setDrawerOpen} loadMinimalLoaderView={loadMinimalLoaderView} />
    )
}

const GlanceComponent = React.memo(({ sdomDatastate, viewPagerRef, postDetailsRef, optionsState, setOptionsState, textPostDescriptionAnimationValue_translate_x, textPostTypeAnimationValue_translate_x, currentPostIndexForProfileRef, height,
    postIdFromNotification, navigation, isFromNotification, setDrawerOpen, loadMinimalLoaderView }) => {
    return <SafeAreaView style={SDGenericStyles.fill}>
        {
            sdomDatastate.posts && sdomDatastate.posts.length &&
            <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack]}>
                <Swiper ref={viewPagerRef} index={postDetailsRef?.current?.postIndex} horizontal={false} showsPagination={false} scrollEventThrottle={numericConstants.SIXTEEN}
                    bounces loadMinimal loadMinimalSize={numericConstants.TWENTY_FIVE} loadMinimalLoader={loadMinimalLoaderView(height)}
                    onMomentumScrollBegin={(event) => {
                        const index = Math.round(event.nativeEvent.contentOffset.y / event.nativeEvent.layoutMeasurement.height) - numericConstants.ONE;
                        if ((index == numericConstants.ZERO && ((postDetailsRef?.current?.scrollOffset == height && postDetailsRef?.current?.scrollOffset > event.nativeEvent.contentOffset.y)
                            || postDetailsRef?.current?.scrollOffset > event.nativeEvent.contentOffset.y)) || index == sdomDatastate.posts.length - numericConstants.ONE
                            && postDetailsRef?.current?.scrollOffset < event.nativeEvent.contentOffset.y) {
                            postDetailsRef?.current?.setRenderLoaderScroll(true);
                        }
                        if (optionsState.isImageLoadError) {
                            setImageLoadError(optionsState, setOptionsState, false);
                        }
                        postDetailsRef?.current?.setPostAnimationVisible(true);
                    }}
                    onMomentumScrollEnd={(event) => onSwiperScrollEnd(event, postDetailsRef, textPostDescriptionAnimationValue_translate_x, textPostTypeAnimationValue_translate_x,
                        currentPostIndexForProfileRef)}
                    onScroll={(event) => {
                        const index = Math.round(event.nativeEvent.contentOffset.y / event.nativeEvent.layoutMeasurement.height) - numericConstants.ONE;
                        if (!(index == numericConstants.ZERO || index == sdomDatastate.posts.length - numericConstants.ONE)) {
                            resetAnimatePostTextDetails(textPostDescriptionAnimationValue_translate_x,
                                textPostTypeAnimationValue_translate_x);
                        }
                    }}>
                    {
                        sdomDatastate.posts.map((item, index) => {
                            return <Animated.View key={index} style={glancePostStyles.overlayImage}>
                                <SwipeItem width={width} height={height} item={item} index={index} posts={sdomDatastate.posts}
                                    postIdFromNotification={postIdFromNotification} viewPagerRef={viewPagerRef} isFromNotification={isFromNotification}
                                    postDetailsRef={postDetailsRef} optionsState={optionsState} />
                            </Animated.View>;
                        })}
                </Swiper>
                <PostDetails ref={postDetailsRef} textPostTypeAnimationValue={textPostTypeAnimationValue_translate_x} viewPagerRef={viewPagerRef}
                    navigation={navigation} textPostDescriptionAnimationValue={textPostDescriptionAnimationValue_translate_x} />
            </View> || sdomDatastate.posts && !sdomDatastate.posts.length &&
            <SDFallBackComponent width={width} height={height} componentErrorConst={componentErrorConsts.CATEGORY_WITHOUT_POST}
                descriptionText={errorMessages.SELECT_OTHER_CATEGORIES} navigation={navigation} /> || <View>
                <View style={{ width: width, height: height }}>
                    <View style={glancePostStyles.shimmerViewInit}>
                        <FastImage style={glancePostStyles.preloaderStyle} source={{
                            uri: Image.resolveAssetSource(require(`../../assets/stardom_loader.gif`)).uri,
                            priority: FastImage.priority.normal
                        }} />
                    </View>
                </View>
            </View>}
        <TouchableOpacity style={glancePostStyles.category_selection} onPress={() => { setDrawerOpen(true); navigation.openDrawer(); }}>
            <Image source={category_selection} style={glancePostStyles.category_selection_image} />
        </TouchableOpacity>
    </SafeAreaView>;
});

