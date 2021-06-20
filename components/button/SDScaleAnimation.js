import React from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, {
    Easing, Extrapolate, interpolate, useAnimatedStyle,
    useDerivedValue, useSharedValue, withTiming
} from 'react-native-reanimated';
import { numericConstants } from '../../constants/Constants';

const TimeConfigurations = { duration: numericConstants.FIFTY, easing: Easing.linear };
export const SDScaleAnimation = ({ children, scaleTo, disabled }) => {

    const pressed = useSharedValue(false);
    const progress = useDerivedValue(() => {
        return pressed.value && withTiming(numericConstants.ONE, TimeConfigurations) ||
            withTiming(numericConstants.ZERO, TimeConfigurations);
    })

    const animatedStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            progress.value, [numericConstants.ZERO, numericConstants.ONE],
            [numericConstants.ONE, scaleTo], Extrapolate.CLAMP
        );
        return {
            transform: [{ scale }]
        };
    });
    return (
        <TouchableWithoutFeedback onPressIn={() => pressed.value = true} onPressOut={() => pressed.value = false}
            disabled={disabled}>
            <Animated.View style={animatedStyle}>{children}</Animated.View>
        </TouchableWithoutFeedback>

    )
};
