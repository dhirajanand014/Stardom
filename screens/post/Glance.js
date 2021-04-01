import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Image, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import {
    colorConstants, componentErrorConsts, errorMessages,
    width, jsonConstants, miscMessage, numericConstants,
    screens, stringConstants
} from '../../constants/Constants';
import {
    onSwiperScrollEnd, fetchPostsAndSaveToState,
    resetAnimatePostTextDetails, setImageLoadError
} from '../../helper/Helper';
import { PostDescriptionModal } from '../../views/imagePost/PostDescriptionModal';
import { PostReportAbuseModal } from '../../views/imagePost/PostReportAbuseModal';
import { glancePostStyles } from '../../styles/Styles';
import Animated, { useAnimatedScrollHandler, useDerivedValue, useSharedValue } from 'react-native-reanimated';
import Shimmer from 'react-native-shimmer';
import Swiper from 'react-native-swiper';
import { PostDetails } from './PostDetails';
import FastImage from 'react-native-fast-image';
import { CategoryContext } from '../../App';
import { SwipeItem } from '../../components/swiper/SwipeItem';
import { SDFallBackComponent } from '../../views/errorHandleView/SDFallBackComponent';

const category_selection = require('../../assets/category_selection_icon.png');
const post_report_abuse = require('../../assets/post_report_abuse_icon.png');

export function Glance({ navigation }) {

    const [sdomDatastate, setSdomDatastate] = useState([]);
    const [optionsState, setOptionsState] = useState({
        descriptionModal: false,
        reportAbuseModal: false,
        showSearch: false,
        selectedPost: stringConstants.EMPTY,
        selectedReportAbuse: {},
        reportAbuses: jsonConstants.EMPTY,
        reportAbuseSubmitDisabled: false,
        isImageLoadError: false
    });
    const { postIdFromNotification, categoryIdFromNotification } = useContext(CategoryContext);
    const viewPagerRef = useRef(null);
    const postDetailsRef = useRef(null);

    useEffect(() => {
        fetchPostsAndSaveToState(sdomDatastate, setSdomDatastate, optionsState, setOptionsState,
            categoryIdFromNotification);
    }, []);

    let { height } = Dimensions.get(miscMessage.WINDOW);
    height += StatusBar.currentHeight;

    const textPostDescriptionAnimationValue = useSharedValue(-10);
    const textPostTypeAnimationValue = useSharedValue(-10);

    const postImageParallax = useSharedValue(numericConstants.ZERO);

    const textPostDescriptionAnimationValue_translate_x = useDerivedValue(() => {
        return textPostDescriptionAnimationValue.value * numericConstants.ONE_HUNDRED;
    });

    const textPostTypeAnimationValue_translate_x = useDerivedValue(() => {
        return textPostTypeAnimationValue.value * numericConstants.ONE_HUNDRED;
    });

    const onPostScrollFunction = (event) => {
        `worklet`;
        postImageParallax.value = event.nativeEvent.contentOffset.y;
    }

    const onPostScroll = useAnimatedScrollHandler({
        onScroll: onPostScrollFunction,
    });

    console.log(sdomDatastate);

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity style={glancePostStyles.category_selection}
                onPress={() => navigation.navigate(screens.CATEGORY)}>
                <Image source={category_selection} style={glancePostStyles.category_selection_image} />
            </TouchableOpacity>
            {
                sdomDatastate.posts && sdomDatastate.posts.length &&
                <View style={{ flex: 1, backgroundColor: colorConstants.YELLOW }}>
                    <Swiper ref={viewPagerRef} index={postDetailsRef?.current?.postIndex} horizontal={false} showsPagination={false} scrollEventThrottle={numericConstants.SIXTEEN}
                        bounces={true} onMomentumScrollBegin={(event) => {
                            if (optionsState.isImageLoadError) {
                                setImageLoadError(optionsState, setOptionsState, false);
                            }
                            postDetailsRef?.current?.setPostAnimationVisible(true);
                        }}
                        onMomentumScrollEnd={(event) => onSwiperScrollEnd(event, postDetailsRef, textPostDescriptionAnimationValue_translate_x, textPostTypeAnimationValue_translate_x)}
                        onScroll={(event) => {
                            const index = Math.round(event.nativeEvent.contentOffset.y / event.nativeEvent.layoutMeasurement.height) - numericConstants.ONE;
                            if (!(index == 0 || index == sdomDatastate.posts.length - numericConstants.ONE)) {
                                resetAnimatePostTextDetails(textPostDescriptionAnimationValue_translate_x,
                                    textPostTypeAnimationValue_translate_x);
                            }
                            //onPostScrollFunction(event);
                        }}>
                        {
                            sdomDatastate.posts.map((item, index) => {
                                return <Animated.View key={index}>
                                    <SwipeItem width={width} height={height} item={item} index={index}
                                        postImageParallax={postImageParallax} sdomDatastate={sdomDatastate}
                                        postIdFromNotification={postIdFromNotification} viewPagerRef={viewPagerRef}
                                        postDetailsRef={postDetailsRef} optionsState={optionsState} setOptionsState={setOptionsState} />
                                </Animated.View>
                            })}
                    </Swiper>
                    <PostDetails ref={postDetailsRef} posts={sdomDatastate.posts} textPostTypeAnimationValue={textPostTypeAnimationValue_translate_x}
                        width={width} height={height} optionsState={optionsState} setOptionsState={setOptionsState}
                        sdomDatastate={sdomDatastate} setSdomDatastate={setSdomDatastate} optionsState={optionsState}
                        setOptionsState={setOptionsState} viewPagerRef={viewPagerRef} textPostDescriptionAnimationValue={textPostDescriptionAnimationValue_translate_x} />
                </View> || sdomDatastate.posts && !sdomDatastate.posts.length &&
                <SDFallBackComponent width={width} height={height} componentErrorConst={componentErrorConsts.CATEGORY_WITHOUT_POST}
                    descriptionText={errorMessages.SELECT_OTHER_CATEGORIES} navigation={navigation} /> || <View>
                    <Shimmer style={{ width: width, height: height }} duration={numericConstants.FIVE_HUNDRED} direction={miscMessage.UP} tilt={numericConstants.FORTY_FIVE}>
                        <View style={glancePostStyles.shimmerViewInit}>
                            <FastImage style={glancePostStyles.preloaderStyle} source={{
                                uri: Image.resolveAssetSource(require(`../../assets/wallpiper-preloader.gif`)).uri,
                                priority: FastImage.priority.normal
                            }} />
                        </View>
                    </Shimmer>
                </View>
            }
            <PostDescriptionModal optionsState={optionsState} setOptionsState={setOptionsState}
                reportAbuseIcon={post_report_abuse} />
            <PostReportAbuseModal optionsState={optionsState} setOptionsState={setOptionsState} />
        </View >
    );
}