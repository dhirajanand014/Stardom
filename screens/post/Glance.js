import React, { useEffect, useRef, useContext } from 'react';
import { View, Image, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
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
import Shimmer from 'react-native-shimmer';
import Swiper from 'react-native-swiper';
import { PostDetails } from './PostDetails';
import FastImage from 'react-native-fast-image';
import { CategoryContext } from '../../App';
import { SwipeItem } from '../../components/swiper/SwipeItem';
import { SDFallBackComponent } from '../../views/errorHandleView/SDFallBackComponent';
import { useRoute } from '@react-navigation/native';

const category_selection = require('../../assets/category_selection_icon.png');

export const Glance = ({ navigation }) => {

    const { postIdFromNotification, categoryIdFromNotification, sdomDatastate, setSdomDatastate, currentPostIndexForProfileRef,
        optionsState, setOptionsState, loggedInUser } = useContext(CategoryContext);
    const viewPagerRef = useRef(null);
    const postDetailsRef = useRef(null);
    const isFromNotification = useRef(false);

    const route = useRoute();
    isFromNotification.current = route.params?.isFromNotification || false;
    const postId = route.params?.postIdFromNotification || postIdFromNotification;

    useEffect(() => {
        (async () => {
            await fetchPostsAndSaveToState(sdomDatastate, setSdomDatastate, optionsState, setOptionsState,
                categoryIdFromNotification, loggedInUser);
        })();
    }, jsonConstants.EMPTY);

    let { height } = Dimensions.get(miscMessage.WINDOW);
    height += StatusBar.currentHeight;

    const textPostDescriptionAnimationValue = useSharedValue(-numericConstants.TEN);
    const textPostTypeAnimationValue = useSharedValue(-numericConstants.TEN);

    const textPostDescriptionAnimationValue_translate_x = useDerivedValue(() => {
        return textPostDescriptionAnimationValue.value * numericConstants.ONE_HUNDRED;
    });

    const textPostTypeAnimationValue_translate_x = useDerivedValue(() => {
        return textPostTypeAnimationValue.value * numericConstants.ONE_HUNDRED;
    });

    return (
        <GlanceComponent sdomDatastate={sdomDatastate} viewPagerRef={viewPagerRef} postDetailsRef={postDetailsRef} optionsState={optionsState} setOptionsState={setOptionsState}
            textPostDescriptionAnimationValue_translate_x={textPostDescriptionAnimationValue_translate_x} textPostTypeAnimationValue_translate_x={textPostTypeAnimationValue_translate_x}
            currentPostIndexForProfileRef={currentPostIndexForProfileRef} height={height} postIdFromNotification={postId} navigation={navigation}
            setSdomDatastate={setSdomDatastate} isFromNotification={isFromNotification} />
    )
}

const GlanceComponent = React.memo(({ sdomDatastate, viewPagerRef, postDetailsRef, optionsState, setOptionsState, textPostDescriptionAnimationValue_translate_x, textPostTypeAnimationValue_translate_x, currentPostIndexForProfileRef, height,
    postIdFromNotification, navigation, isFromNotification }) => {
    return <View style={SDGenericStyles.fill}>
        {
            sdomDatastate.posts && sdomDatastate.posts.length &&
            <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack]}>
                <Swiper ref={viewPagerRef} index={postDetailsRef?.current?.postIndex} horizontal={false} showsPagination={false} scrollEventThrottle={numericConstants.SIXTEEN}
                    bounces={true} onMomentumScrollBegin={() => {
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
                                    postDetailsRef={postDetailsRef} optionsState={optionsState} setOptionsState={setOptionsState} />
                            </Animated.View>;
                        })}
                </Swiper>
                <PostDetails ref={postDetailsRef} textPostTypeAnimationValue={textPostTypeAnimationValue_translate_x} width={width} height={height}
                    navigation={navigation} viewPagerRef={viewPagerRef} textPostDescriptionAnimationValue={textPostDescriptionAnimationValue_translate_x} />
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
            </View>}
        <TouchableOpacity style={glancePostStyles.category_selection} onPress={() => navigation.openDrawer()}>
            <Image source={category_selection} style={glancePostStyles.category_selection_image} />
        </TouchableOpacity>
    </View>;
});