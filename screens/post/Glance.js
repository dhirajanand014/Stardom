import React, { useEffect, useRef, useContext } from 'react';
import { View, Image, StatusBar, Dimensions } from 'react-native';
import {
    componentErrorConsts, errorMessages,
    width, miscMessage, numericConstants, jsonConstants
} from '../../constants/Constants';
import {
    onSwiperScrollEnd, fetchPostsAndSaveToState,
    resetAnimatePostTextDetails, setImageLoadError
} from '../../helper/Helper';
import { PostDescriptionModal } from '../../views/imagePost/PostDescriptionModal';
import { PostReportAbuseModal } from '../../views/imagePost/PostReportAbuseModal';
import { glancePostStyles, SDGenericStyles } from '../../styles/Styles';
import Animated, { useAnimatedScrollHandler, useDerivedValue, useSharedValue } from 'react-native-reanimated';
import Shimmer from 'react-native-shimmer';
import Swiper from 'react-native-swiper-hooks';
import { PostDetails } from './PostDetails';
import FastImage from 'react-native-fast-image';
import { CategoryContext } from '../../App';
import { SwipeItem } from '../../components/swiper/SwipeItem';
import { SDFallBackComponent } from '../../views/errorHandleView/SDFallBackComponent';

const post_report_abuse = require('../../assets/post_report_abuse_icon.png');

export const Glance = ({ navigation }) => {

    const { postIdFromNotification, categoryIdFromNotification, sdomDatastate, setSdomDatastate,
        optionsState, setOptionsState, loggedInUser, loader, setLoader } = useContext(CategoryContext);
    const viewPagerRef = useRef(null);
    const postDetailsRef = useRef(null);

    useEffect(() => {
        fetchPostsAndSaveToState(sdomDatastate, setSdomDatastate, optionsState, setOptionsState,
            categoryIdFromNotification, loggedInUser);
    }, jsonConstants.EMPTY);

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

    return (
        <View style={SDGenericStyles.fill}>
            {
                sdomDatastate.posts && sdomDatastate.posts.length &&
                <View style={[SDGenericStyles.fill, SDGenericStyles.backgroundColorYellow]}>
                    <Swiper ref={viewPagerRef} initIndex={postDetailsRef?.current?.postIndex} direction='column' showsPagination={false} scrollEventThrottle={numericConstants.SIXTEEN}
                        width={width} height={height} boxBackgroundColor={SDGenericStyles.backgroundColorYellow} scrollToIndexWithAnimate={true} bounces={true} loop={true}
                        autoplayDirection={false} autoplay={false} onScrollBeginDrag={() => {
                            if (optionsState.isImageLoadError) {
                                setImageLoadError(optionsState, setOptionsState, false);
                            }
                            postDetailsRef?.current?.setPostAnimationVisible(true);
                        }}
                        onScrollEndDrag={(event) => onSwiperScrollEnd(event, postDetailsRef, textPostDescriptionAnimationValue_translate_x, textPostTypeAnimationValue_translate_x)}>
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
                        width={width} height={height} optionsState={optionsState} setOptionsState={setOptionsState} navigation={navigation}
                        sdomDatastate={sdomDatastate} setSdomDatastate={setSdomDatastate} optionsState={optionsState} loader={loader} setLoader={setLoader}
                        setOptionsState={setOptionsState} viewPagerRef={viewPagerRef} textPostDescriptionAnimationValue={textPostDescriptionAnimationValue_translate_x} />
                </View> || sdomDatastate.posts && !sdomDatastate.posts.length &&
                <SDFallBackComponent width={width} height={height} componentErrorConst={componentErrorConsts.CATEGORY_WITHOUT_POST}
                    descriptionText={errorMessages.SELECT_OTHER_CATEGORIES} navigation={navigation} /> || <View>
                    <Shimmer style={{ width: width, height: height }} duration={numericConstants.FIVE_HUNDRED} direction={miscMessage.UP} tilt={numericConstants.FORTY_FIVE}>
                        <View style={glancePostStyles.shimmerViewInit}>
                            <FastImage style={glancePostStyles.preloaderStyle} source={{
                                uri: Image.resolveAssetSource(require(`../../assets/stardom_loader.gif`)).uri,
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