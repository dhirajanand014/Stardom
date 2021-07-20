import React from 'react';
import { Image, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { PinchGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle, useSharedValue, withTiming
} from 'react-native-reanimated';
import { numericConstants } from '../../constants/Constants';
import { scrollWhenPostIdFromNotification, setImageLoadError } from '../../helper/Helper';
import { SDGenericStyles } from '../../styles/Styles';

export const SwipeItem = (props) => {

    const { width, height, item, index, posts, postIdFromNotification, viewPagerRef,
        postDetailsRef, optionsState, setOptionsState, isFromNotification } = props;

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
                                <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.mt5]}>
                                    <FastImage source={{
                                        uri: Image.resolveAssetSource(require(`../../assets/stardom_loader.gif`)).uri,
                                        priority: FastImage.priority.normal
                                    }} style={{ width: numericConstants.FIFTY, height: numericConstants.FIFTY }} resizeMode={FastImage.resizeMode.contain} />
                                </View>)
                        }

                        <FastImage style={[{ width: width, height: height }]} source={{
                            uri: item.postImage,
                            priority: FastImage.priority.high,
                            cache: FastImage.cacheControl.immutable
                        }} fallback={optionsState.isImageLoadError} onLoadEnd={() =>
                            scrollWhenPostIdFromNotification(posts, postIdFromNotification, viewPagerRef,
                                postDetailsRef, isFromNotification)} onError={() => setImageLoadError(optionsState, setOptionsState, true)} />
                    </Animated.View>
                </PinchGestureHandler>
            </Animated.View>
        </TapGestureHandler >)
}