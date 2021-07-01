import React from 'react';
import { Image, View, Text, TouchableOpacity } from "react-native";
import { componentErrorConsts, numericConstants, miscMessage, screens, errorMessages } from '../../constants/Constants';
import { errorBoundaryStyles, SDGenericStyles } from "../../styles/Styles";
import RNRestart from 'react-native-restart';
import FastImage from 'react-native-fast-image';

export const SDFallBackComponent = (props) => {

    const { width, height, descriptionText, componentErrorConst, navigation } = props;

    const error_image = require(`../../assets/error_warning_image.png`);

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backgroundColorWhite]}>
            <View style={[{ width: width, height: height }, errorBoundaryStyles.content]}>
                <View>
                    <Image resizeMode={FastImage.resizeMode.contain} style={errorBoundaryStyles.errorImageStyle} source={error_image} />
                    <Text style={[errorBoundaryStyles.textMessage2Style, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.ft16]}>
                        {descriptionText}
                    </Text>
                    {
                        descriptionText == errorMessages.ERROR_BOUNDARY || descriptionText == errorMessages.NO_USER_PROFILE_FOR_POST &&
                        <Text style={[errorBoundaryStyles.textMessage2Style, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.ft16]}>
                            {errorMessages.CONTACT_US_1}<Text style={[SDGenericStyles.fontFamilyRobotoBold, SDGenericStyles.ft16]}>{errorMessages.CONTACT_US_MAIL}</Text>{errorMessages.CONTACT_US_2}
                        </Text>
                    }
                </View>
                {
                    (componentErrorConsts.ERROR_BOUNDARY == componentErrorConst || componentErrorConsts.POSTS_WITHOUT_PROFILE == componentErrorConst) &&
                    <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.mt24]}>
                        <TouchableOpacity activeOpacity={.7} style={errorBoundaryStyles.resetStardomButton} onPress={() => RNRestart.Restart()}>
                            <Text style={[SDGenericStyles.ft18, SDGenericStyles.colorYellow, SDGenericStyles.textCenterAlign, SDGenericStyles.fontFamilyRobotoMedium]}>
                                {miscMessage.RELOAD.toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
                {
                    componentErrorConsts.CATEGORY_WITHOUT_POST == componentErrorConst &&
                    <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.mt24]}>
                        <TouchableOpacity activeOpacity={.7} style={errorBoundaryStyles.resetToCategorySelectionButton}
                            onPress={() => navigation.reset({ index: numericConstants.ZERO, routes: [{ name: screens.CATEGORY }] })}>
                            <Text style={[SDGenericStyles.ft18, SDGenericStyles.colorYellow, SDGenericStyles.textCenterAlign, SDGenericStyles.fontFamilyRobotoMedium]}>{
                                miscMessage.SELECT_CATEGORIES.toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </View >
    )
}