import React, { useCallback, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SDImageFormInput } from '../../views/fromInputView/SDImageFormInput';
import {
    fieldControllerName, formRequiredRules,
    stringConstants, numericConstants, keyBoardTypeConst,
    placeHolderText, isAndroid, actionButtonTextConstants,
    miscMessage, modalTextConstants, screens, errorMessages
} from '../../constants/Constants';
import { colors, SDGenericStyles, userAuthStyles } from '../../styles/Styles';
import { useNavigation } from '@react-navigation/core';
import { handleUserSignUpOtp, showSnackBar, validateUserAction } from '../../helper/Helper';
import { PhoneIcon } from '../../components/icons/PhoneIcon';
import { AuthHeaderText } from '../../views/fromInputView/AuthHeaderText';
import { CategoryContext } from '../../App';
export const Register = () => {

    const { signUpDetails, setSignUpDetails, loader, setLoader } = useContext(CategoryContext);

    const { control, formState, handleSubmit, getValues } = useForm();
    const navigation = useNavigation();


    const validateUserRegistered = useCallback(async () => {
        setLoader({ ...loader, isLoading: true });
        const phoneNumber = getValues(fieldControllerName.PHONE_NUMBER);
        const response = await validateUserAction(fieldControllerName.PHONE_NUMBER, phoneNumber);
        if (response) {
            showSnackBar(errorMessages.NUMBER_ALREADY_REGISTERED_LOGIN, false);
            navigation.navigate(screens.LOGIN);
        } else {
            await handleUserSignUpOtp(miscMessage.SIGN_UP, navigation, false);
        }
        setLoader({ ...loader, isLoading: false });
    });

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack, SDGenericStyles.paddingHorizontal25]} pointerEvents={loader.isLoading && miscMessage.NONE ||
                miscMessage.AUTO}>
                <AuthHeaderText titleTextHeader={modalTextConstants.REGISTER_TITLE_HEADER} titleText={modalTextConstants.REGISTER_TITLE_TEXT} isFrom={screens.REGISTER} />
                <SDImageFormInput inputName={fieldControllerName.PHONE_NUMBER} control={control} rules={formRequiredRules.mobileInputFormRule}
                    defaultValue={stringConstants.EMPTY} isPhoneNumberEntry={true} maxLength={numericConstants.TEN} placeHolderText={placeHolderText.PHONE_NUMBER}
                    keyboardType={isAndroid && keyBoardTypeConst.ANDROID_NUMERIC || keyBoardTypeConst.IOS_NUMERIC} textContentType={keyBoardTypeConst.TELPHONETYPE}
                    formState={formState} autofocus={true} extraStyles={[SDGenericStyles.ft16, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRoman]}
                    signUpDetails={signUpDetails} setSignUpDetails={setSignUpDetails} isSignUp={true} icon={<PhoneIcon stroke={formState.errors[fieldControllerName.PHONE_NUMBER]?.message &&
                        colors.RED || colors.SDOM_PLACEHOLDER} />} />
                <Text style={[userAuthStyles.registerDescription, SDGenericStyles.fontFamilyBold]}>{placeHolderText.REGISTER_DESCRIPTION}</Text>
                <View style={userAuthStyles.registerButtonView}>
                    <TouchableOpacity activeOpacity={.7} style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.backgroundColorYellow]}
                        onPress={handleSubmit(() => validateUserRegistered())}>
                        <Text style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.fontFamilyRoman]}>{actionButtonTextConstants.PROCEED}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}