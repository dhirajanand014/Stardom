import React from 'react';
import FastImage from 'react-native-fast-image';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';
import { componentErrorConsts, errorMessages, numericConstants } from '../../constants/Constants';
import { scrollWhenPostIdFromNotification, setImageLoadError } from '../../helper/Helper';
import { SDFallBackComponent } from '../../views/errorHandleView/SDFallBackComponent';

export const SwipeItem = (props) => {

    const { width, height, item, index, postImageParallax, sdomDatastate, postIdFromNotification, viewPagerRef,
        postDetailsRef, optionsState, setOptionsState } = props;
    const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

    const verticalSpeed = Math.abs(height * 0.5 - height)

    const postImageParallax_translate_y = useDerivedValue(() => {
        return interpolate(postImageParallax.value, [(index - numericConstants.ONE) * height, index * height, (index + numericConstants.ONE) * height],
            [-verticalSpeed, numericConstants.ZERO, verticalSpeed], Extrapolate.CLAMP)
    });

    const postTransformParallax = useAnimatedStyle(() => ({ transform: [{ translateY: postImageParallax_translate_y.value }] }));

    return (
        <Animated.View key={`${index}_${item.categoryId}`}>
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
                scrollWhenPostIdFromNotification(sdomDatastate, postIdFromNotification, viewPagerRef,
                    postDetailsRef)} onError={() => setImageLoadError(optionsState, setOptionsState, true)} />
        </Animated.View>)
}