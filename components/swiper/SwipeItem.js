import React from 'react';
import FastImage from 'react-native-fast-image';
import { PinchGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle, useSharedValue, withTiming
} from 'react-native-reanimated';
import { numericConstants } from '../../constants/Constants';
import { scrollWhenPostIdFromNotification } from '../../helper/Helper';

export const SwipeItem = (props) => {

    const { width, height, item, index, posts, postIdFromNotification, viewPagerRef,
        postDetailsRef, optionsState, isFromNotification } = props;

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
                        <FastImage style={[{ width: width, height: height }]} source={{
                            uri: item.postImage,
                            priority: FastImage.priority.high,
                            cache: FastImage.cacheControl.immutable
                        }} fallback={optionsState.isImageLoadError} onLoadEnd={() =>
                            scrollWhenPostIdFromNotification(posts, postIdFromNotification, viewPagerRef, postDetailsRef, isFromNotification)} />
                    </Animated.View>
                </PinchGestureHandler>
            </Animated.View>
        </TapGestureHandler >)
}