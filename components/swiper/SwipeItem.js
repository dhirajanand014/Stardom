import React from 'react';
import FastImage from 'react-native-fast-image';
import { PinchGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { numericConstants, stringConstants } from '../../constants/Constants';
import { scrollWhenPostIdFromNotification } from '../../helper/Helper';
import { glancePostStyles } from '../../styles/Styles';

export const SwipeItem = (props) => {

    const { width, height, item, index, posts, postIdFromNotification, viewPagerRef, postDetailsRef,
        optionsState, isFromNotification, animation, viewSharedPost, navigation } = props;

    const imageScale = useSharedValue(numericConstants.ONE);
    const focalX = useSharedValue(numericConstants.ZERO);
    const focalY = useSharedValue(numericConstants.ZERO);

    const animationStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(animation.value, {
                duration: numericConstants.FIVE_HUNDRED
            })
        }
    })

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
        <Animated.View key={index} style={glancePostStyles.overlayImage}>
            <TapGestureHandler key={`${numericConstants.ONE}${stringConstants.UNDERSCORE}${index}`} numberOfTaps={numericConstants.ONE}
                onActivated={() => {
                    postDetailsRef.current?.setTapVisible(!postDetailsRef.current?.tapVisible);
                    animation.value = animation.value == numericConstants.ONE && numericConstants.ZEROPTSEVEN || numericConstants.ONE;
                }}>
                <TapGestureHandler key={`${numericConstants.TWO}${stringConstants.UNDERSCORE}${index}`} numberOfTaps={numericConstants.TWO} onActivated={() => postDetailsRef.current.setWallPaper()}>
                    <Animated.View style={animationStyle}>
                        <PinchGestureHandler key={`${numericConstants.THREE}${stringConstants.UNDERSCORE}${index}`} onGestureEvent={pinchGenstureHandler}>
                            <Animated.View style={pinchZoomStyle}>
                                <FastImage key={`${numericConstants.FOUR}${stringConstants.UNDERSCORE}${index}`} style={[{ width: width, height: height }]} source={{
                                    uri: item.postImage,
                                    priority: FastImage.priority.high,
                                    cache: FastImage.cacheControl.immutable
                                }} fallback={optionsState.isImageLoadError} onLoadEnd={() =>
                                    scrollWhenPostIdFromNotification(posts, postIdFromNotification, viewPagerRef, postDetailsRef, isFromNotification, viewSharedPost, navigation)} />
                            </Animated.View>
                        </PinchGestureHandler>
                    </Animated.View>
                </TapGestureHandler>
            </TapGestureHandler>
        </Animated.View>)
}