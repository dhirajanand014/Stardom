import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, TouchableNativeFeedback } from 'react-native';
import { isIOS, numericConstants, screens } from '../../constants/Constants';
import { ArrowLeftIcon } from '../../components/icons/ArrowLeftIcon';
import { colors, glancePostStyles } from '../../styles/Styles';

export const BackButton = props => {

    const navigation = useNavigation();
    const navigateToPreviousScreen = () => {
        if (props.goBack)
            navigation.goBack();
        else
            navigation.navigate(screens.GLANCE);
    }

    return (
        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(colors.WHITE, true, numericConstants.TWENTY)}
            onPress={() => navigateToPreviousScreen(props.isFromDashBoard, navigation)}>
            <View style={[glancePostStyles.headerBackButton, {
                top: isIOS && numericConstants.FIFTY_FIVE || (props.isWithSearch && numericConstants.TWENTY_SIX || numericConstants.FIFTEEN),
                left: isIOS && numericConstants.TWENTY_FIVE || (props.leftStyle && props.leftStyle || -numericConstants.TWELVE)
            }, props.extraStyles]}>
                <ArrowLeftIcon stroke={colors.WHITE} />
            </View>
        </TouchableNativeFeedback >
    )
}