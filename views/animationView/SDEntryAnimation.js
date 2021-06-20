import React, { useEffect } from "react";
import Animated, {
    interpolate, useAnimatedStyle, useDerivedValue,
    useSharedValue, withDelay, withTiming
} from "react-native-reanimated";
import { jsonConstants, numericConstants } from "../../constants/Constants";

export const SDEntryAnimation = ({ children, index }) => {
    const play = useSharedValue(false);
    const progress = useDerivedValue(() => {
        return play.value
            && withDelay(numericConstants.FIFTY * (index ?? numericConstants.ZERO),
                withTiming(numericConstants.ONE, { duration: numericConstants.THREE_HUNDRED_FIFTY }))
            || numericConstants.ZERO;
    });

    useEffect(() => {
        play.value = true;
    }, jsonConstants.EMPTY);

    const animatedStyle = useAnimatedStyle(() => {
        const opacity = interpolate(progress.value, [numericConstants.ZERO, numericConstants.ONE],
            [numericConstants.ZERO, numericConstants.ONE]);
        const translateY = interpolate(progress.value, [numericConstants.ZERO, numericConstants.ONE],
            [numericConstants.ONE_HUNDRED, numericConstants.ZERO]);

        return {
            opacity,
            transform: [{ translateY }],
        };
    });

    return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};