import React from 'react';
import { Image, View, Text, TouchableOpacity } from "react-native";
import { componentErrorConsts, numericConstants, errorMessages, miscMessage, screens } from '../../constants/Constants';
import { errorBoundaryStyles, SDGenericStyles } from "../../styles/Styles";
import RNRestart from 'react-native-restart';

export const SDFallBackComponent = (props) => {

    const { width, height, descriptionText, componentErrorConst, navigation } = props;

    const error_icon = require(`../../assets/error_warning_icon.png`);

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backgroundColorYellow]}>
            <View style={[{ width: width, height: height }, errorBoundaryStyles.content]}>
                <View>
                    <Image style={errorBoundaryStyles.infoIconStyle} source={error_icon} />
                    <Text style={errorBoundaryStyles.textMessage1Style}>{errorMessages.SOMETHING_WENT_WRONG}</Text>
                    <Text style={errorBoundaryStyles.textMessage2Style}>{descriptionText}</Text>
                </View>
                {
                    componentErrorConsts.ERROR_BOUNDARY == componentErrorConst &&
                    <TouchableOpacity activeOpacity={.7} style={errorBoundaryStyles.resetToCategorySelectionButton} onPress={() => RNRestart.Restart()}>
                        <Text style={errorBoundaryStyles.redirectButtonText}>{miscMessage.RELOAD_STARDOM}</Text>
                    </TouchableOpacity>
                }
                {
                    componentErrorConsts.CATEGORY_WITHOUT_POST == componentErrorConst &&
                    <TouchableOpacity activeOpacity={.7} style={errorBoundaryStyles.resetToCategorySelectionButton}
                        onPress={() => navigation.reset({ index: numericConstants.ZERO, routes: [{ name: screens.CATEGORY }] })}>
                        <Text style={errorBoundaryStyles.redirectButtonText}>{miscMessage.SELECT_CATEGORIES}</Text>
                    </TouchableOpacity>
                }
            </View>
        </View >
    )
}