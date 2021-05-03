import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, TouchableOpacity } from 'react-native';
import { SDImageFormInput } from '../../views/fromInputView/SDImageFormInput';
import {
    fieldControllerName, formRequiredRules,
    stringConstants, numericConstants, keyBoardTypeConst,
    placeHolderText, isAndroid, actionButtonTextConstants, miscMessage, modalTextConstants
} from '../../constants/Constants';
import { colors, SDGenericStyles, userAuthStyles } from '../../styles/Styles';
import { useNavigation } from '@react-navigation/core';
import { handleUserSignUpOtp } from '../../helper/Helper';
import { PhoneIcon } from '../../components/icons/PhoneIcon';
import { AuthHeaderText } from '../../views/fromInputView/AuthHeaderText';
export const Register = () => {

    const [signUpDetails, setSignUpDetails] = useState({
        phoneNumber: stringConstants.EMPTY,
        userId: stringConstants.EMPTY,
        secret: stringConstants.EMPTY,
        registrationSuccessful: false,
        tokenValidation: false
    });

    const { control, formState, handleSubmit } = useForm();
    const navigation = useNavigation();

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack, SDGenericStyles.paddingHorizontal25]}>
            <AuthHeaderText titleText={modalTextConstants.REGISTER_TITLE_TEXT} />
            <SDImageFormInput inputName={fieldControllerName.PHONE_NUMBER} control={control} rules={formRequiredRules.mobileInputFormRule}
                defaultValue={stringConstants.EMPTY} isPhoneNumberEntry={true} maxLength={numericConstants.TEN} placeHolderText={placeHolderText.PHONE_NUMBER}
                keyboardType={isAndroid && keyBoardTypeConst.ANDROID_NUMERIC || keyBoardTypeConst.IOS_NUMERIC} textContentType={keyBoardTypeConst.TELPHONETYPE}
                formState={formState} autofocus={true} extraStyles={[SDGenericStyles.ft16, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRoman]}
                signUpDetails={signUpDetails} setSignUpDetails={setSignUpDetails} isSignUp={true} icon={<PhoneIcon stroke={formState.errors[fieldControllerName.PHONE_NUMBER]?.message &&
                    colors.RED || colors.SDOM_PLACEHOLDER} />} />
            <Text style={[userAuthStyles.registerDescription, SDGenericStyles.fontFamilyBold]}>{placeHolderText.REGISTER_DESCRIPTION}</Text>
            <View style={userAuthStyles.registerButtonView}>
                <TouchableOpacity activeOpacity={.7} style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.backgroundColorYellow]}
                    onPress={handleSubmit(() => handleUserSignUpOtp(signUpDetails, miscMessage.SIGN_UP, navigation, false, setSignUpDetails))}>
                    <Text style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.fontFamilyRoman]}>{actionButtonTextConstants.PROCEED}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}