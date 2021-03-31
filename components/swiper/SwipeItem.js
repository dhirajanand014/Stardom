import React from 'react';
import FastImage from 'react-native-fast-image';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';
import { FallBackComponent } from '../components/FallBackComponent';
import { componentErrorConsts, errorMessages } from '../../constants/Constants';
import { scrollWhenPostIdFromNotification, setImageLoadError } from '../../helper/Helper';

export const SwipeItem = (props) => {

    const { width, height, item, index, postImageParallax, sdomDatastate, postIdFromNotification, viewPagerRef,
        postDetailsRef, optionsState, setOptionsState } = props;
    const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

    const verticalSpeed = Math.abs(height * 0.5 - height)

    const postImageParallax_translate_y = useDerivedValue(() => {
        return interpolate(postImageParallax.value, [(index - 1) * height, index * height, (index + 1) * height],
            [-verticalSpeed, 0, verticalSpeed], Extrapolate.CLAMP)
    });

    const postTransformParallax = useAnimatedStyle(() => ({ transform: [{ translateY: postImageParallax_translate_y.value }] }));

    return (
        <Animated.View key={`${index}_${item.categoryId}`}>
            {
                (optionsState.isImageLoadError &&
                    <FallBackComponent width={width} height={height} componentErrorConst={componentErrorConsts.POST_IMAGE_LOAD_ERROR}
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