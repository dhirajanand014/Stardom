import React from 'react';
import FastImage from 'react-native-fast-image';
import Animated, { } from 'react-native-reanimated';
import { componentErrorConsts, errorMessages } from '../../constants/Constants';
import { scrollWhenPostIdFromNotification, setImageLoadError } from '../../helper/Helper';
import { SDFallBackComponent } from '../../views/errorHandleView/SDFallBackComponent';

export const SwipeItem = (props) => {

    const { width, height, item, index, posts, postIdFromNotification, viewPagerRef, postDetailsRef, optionsState, setOptionsState } = props;

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
                scrollWhenPostIdFromNotification(posts, postIdFromNotification, viewPagerRef,
                    postDetailsRef)} onError={() => setImageLoadError(optionsState, setOptionsState, true)} />
        </Animated.View>)
}