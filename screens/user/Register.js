import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SDImageFormInput } from '../../views/fromInputView/SDImageFormInput';
import {
    fieldControllerName, formRequiredRules,
    stringConstants, numericConstants, keyBoardTypeConst,
    placeHolderText, isAndroid, actionButtonTextConstants, miscMessage, colorConstants
} from '../../constants/Constants';
import { SDGenericStyles, userAuthStyles } from '../../styles/Styles';
import { RegisterUserIcon } from '../../components/icons/RegisterUserIcon';
import { useNavigation, useRoute } from '@react-navigation/core';
import { handleUserSignUpOtp } from '../../helper/Helper';
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

    const route = useRoute();
    const errorMod = route?.params?.errorMod;
    const setErrorMod = route?.params?.setErrorMod;

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack, SDGenericStyles.paddingHorizontal25]}>
            <View style={[SDGenericStyles.justifyContentCenter, SDGenericStyles.paddingBottom20, SDGenericStyles.paddingTop40,
            SDGenericStyles.alignItemsCenter]}>
                <RegisterUserIcon width={numericConstants.ONE_HUNDRED} height={numericConstants.ONE_HUNDRED} stroke={colorConstants.WHITE} />
            </View>
            <ScrollView>
                <SDImageFormInput inputName={fieldControllerName.PHONE_NUMBER} control={control} rules={formRequiredRules.mobileInputFormRule}
                    defaultValue={stringConstants.EMPTY} isPhoneNumberEntry={true} maxLength={numericConstants.TEN} placeHolderText={placeHolderText.PHONE_NUMBER}
                    keyboardType={isAndroid && keyBoardTypeConst.ANDROID_NUMERIC || keyBoardTypeConst.IOS_NUMERIC} textContentType={keyBoardTypeConst.TELPHONETYPE}
                    formState={formState} autofocus={true} extraStyles={[SDGenericStyles.ft16, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRoman]}
                    signUpDetails={signUpDetails} setSignUpDetails={setSignUpDetails} isSignUp={true} />
            </ScrollView>

            <Text style={[userAuthStyles.registerDescription, SDGenericStyles.fontFamilyBold]}>{placeHolderText.REGISTER_DESCRIPTION}</Text>
            <View style={userAuthStyles.registerButtonView}>
                <TouchableOpacity activeOpacity={.7} style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.backgroundColorYellow]}
                    onPress={handleSubmit(() => handleUserSignUpOtp(signUpDetails, miscMessage.SIGN_UP, navigation, false, setSignUpDetails, errorMod,
                        setErrorMod))}>
                    <Text style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.fontFamilyBold]}>{actionButtonTextConstants.PROCEED}</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}