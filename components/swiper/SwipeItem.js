import React from 'react';
import FastImage from 'react-native-fast-image';
import { PinchGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle, useSharedValue, withTiming
} from 'react-native-reanimated';
import { componentErrorConsts, errorMessages, numericConstants } from '../../constants/Constants';
import { scrollWhenPostIdFromNotification, setImageLoadError } from '../../helper/Helper';
import { SDFallBackComponent } from '../../views/errorHandleView/SDFallBackComponent';

export const SwipeItem = (props) => {

    const { width, height, item, index, posts, postIdFromNotification, viewPagerRef,
        postDetailsRef, optionsState, setOptionsState } = props;

    const imageScale = useSharedValue(numericConstants.ONE);
    const focalX = useSharedValue(numericConstants.ZERO);
    const focalY = useSharedValue(numericConstants.ZERO);

    const pinchGenstureHandler = useAnimatedGestureHandler({
        onActive: (event) => {
            imageScale.value = event.scale;
            focalX.value = event.focalX;
            focalY.value = event.focalY;
        },
        onEnd: () => imageScale.value = withTiming(numericConstants.ONE)
    });

    const pinchZoomStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: focalX.value },
                { translateY: focalY.value },
                { translateX: -width / numericConstants.TWO },
                { translateY: -height / numericConstants.TWO },
                { scale: imageScale.value },
                { translateX: -focalX.value },
                { translateY: -focalY.value },
                { translateX: width / numericConstants.TWO },
                { translateY: height / numericConstants.TWO }
            ]
        }
    })
    return (
        <TapGestureHandler numberOfTaps={numericConstants.TWO} onActivated={() => postDetailsRef.current?.setWallPaper()}>
            <Animated.View>
                <PinchGestureHandler onGestureEvent={pinchGenstureHandler}>
                    <Animated.View key={`${index}_${item.categoryId}`} style={pinchZoomStyle}>
                        {
                            (optionsState.isImageLoadError &&
                                <SDFallBackComponent width={width} height={height} componentErrorConst={componentErrorConsts.POST_IMAGE_LOAD_ERROR}
                                    descriptionText={errorMessages.POST_IMAGE_LOAD_ERROR} />)
                        }

                        <FastImage style={[{ width: width, height: height }]} source={{
                            uri: item.postImage,
                            priority: FastImage.priority.high,
                            cache: FastImage.cacheControl.immutable
                        }} fallback={optionsState.isImageLoadError} onLoadEnd={() =>
                            scrollWhenPostIdFromNotification(posts, postIdFromNotification, viewPagerRef,
                                postDetailsRef)} onError={() => setImageLoadError(optionsState, setOptionsState, true)} />
                    </Animated.View>
                </PinchGestureHandler>
            </Animated.View>
        </TapGestureHandler >)
}