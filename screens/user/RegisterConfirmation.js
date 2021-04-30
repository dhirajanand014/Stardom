
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SDImageFormInput } from '../../views/fromInputView/SDImageFormInput';
import {
    fieldControllerName, formRequiredRules,
    stringConstants, numericConstants, keyBoardTypeConst,
    placeHolderText, actionButtonTextConstants, isAndroid,
    screens, miscMessage, alertTextMessages, modalTextConstants
} from '../../constants/Constants';
import { colors, SDGenericStyles, userAuthStyles } from '../../styles/Styles';
import { RegisterUserIcon } from '../../components/icons/RegisterUserIcon';
import { LoginSecretIcon } from '../../components/icons/LoginSecretIcon';
import { useNavigation, useRoute } from '@react-navigation/core';
import {
    focusOnInputIfFormInvalid, handleUserRegistration,
    resetTokens, showSnackBar, saveRegistrationStatus
} from '../../helper/Helper';
import { AuthHeaderText } from '../../views/fromInputView/AuthHeaderText';

export const RegistrationConfirmation = () => {

    const { control, formState, setError, handleSubmit } = useForm();

    let confirmSecretRef = useRef(null);
    const route = useRoute();
    const isFrom = route?.params?.isFrom;

    const errorMod = route?.params?.errorMod;
    const setErrorMod = route?.params?.setErrorMod;

    const signUpDetails = route?.params?.signUpDetails;
    const setSignUpDetails = route?.params?.setSignUpDetails;

    const phoneNumber = signUpDetails.phoneNumber || stringConstants.EMPTY;

    const refCallback = node => {
        confirmSecretRef.current = node;
    };
    const navigation = useNavigation();

    const navigateUser = async (data, isFromForgotPassword) => {
        if (!isFromForgotPassword) {
            setSignUpDetails({ ...signUpDetails, secret: data.password, registrationSuccessful: true });
            showSnackBar(alertTextMessages.SUCCESSFULLY_REGISTERED, true);
            await saveRegistrationStatus(phoneNumber, miscMessage.VERIFIED);
            navigation.reset({
                index: numericConstants.ZERO, routes: [{
                    name: screens.REGISTRATION_DETAILS, params: {
                        signUpDetails: signUpDetails,
                        setSignUpDetails: setSignUpDetails
                    }
                }]
            });
        } else {
            showSnackBar(successFulMessages.SUCCESSFULLY_RESET_PASSWORD, true);
            navigation.reset({
                index: numericConstants.ZERO, routes: [{ name: routeConsts.HOME }]
            });
        }
    }

    const onSubmit = async data => {
        if (data.confirmSecret !== data.secret) {
            setError(fieldControllerName.CONFIRM_SECRET, formRequiredRules.confirmPasswordRule);
        } else if (data.confirmSecret === data.secret) {
            const registrationResponse = await handleUserRegistration(phoneNumber, data, isFrom,
                errorMod, setErrorMod);
            if (registrationResponse) {
                let isFromForgotPassword = false;
                if (registrationResponse == `${miscMessage.RESET}_${miscMessage.SUCCESSFUL}`) {
                    await resetTokens(error, setError);
                    isFromForgotPassword = true;
                }
                await navigateUser(data, isFromForgotPassword);
            }
        };
    }

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack, SDGenericStyles.paddingHorizontal25]}>
            <AuthHeaderText titleText={modalTextConstants.CONFIRM_REGISTRATION} />
            <ScrollView>
                <SDImageFormInput inputName={fieldControllerName.USER_ID} control={control} rules={formRequiredRules.usedIdFormRule}
                    defaultValue={stringConstants.EMPTY} placeHolderText={placeHolderText.USER_ID} autofocus={true} icon={<RegisterUserIcon width={numericConstants.EIGHTEEN}
                        height={numericConstants.EIGHTEEN} stroke={formState.errors[fieldControllerName.USER_ID]?.message &&
                            colors.RED || colors.SDOM_PLACEHOLDER} />}
                    keyboardType={keyBoardTypeConst.DEFAULT} textContentType={keyBoardTypeConst.USERNAME} formState={formState}
                    isUserId={true} extraStyles={[SDGenericStyles.ft16, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRoman]} />

                <SDImageFormInput inputName={fieldControllerName.SECRET} control={control} rules={formRequiredRules.passwordFormRule}
                    defaultValue={stringConstants.EMPTY} placeHolderText={placeHolderText.SECRET} textContentType={keyBoardTypeConst.NEW_PASSWORD} maxLength={numericConstants.FOUR}
                    keyboardType={isAndroid && keyBoardTypeConst.ANDROID_NUMERIC || keyBoardTypeConst.IOS_NUMERIC} icon={<LoginSecretIcon stroke={formState.errors[fieldControllerName.SECRET]?.message &&
                        colors.RED || colors.SDOM_PLACEHOLDER} />} formState={formState}
                    isSecureTextEntry={true} onSubmitEditing={() => focusOnInputIfFormInvalid(formState, confirmSecretRef)} extraStyles={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRoman,
                    SDGenericStyles.textColorWhite]} />

                <SDImageFormInput inputName={fieldControllerName.CONFIRM_SECRET} control={control} rules={formRequiredRules.passwordFormRule}
                    defaultValue={stringConstants.EMPTY} placeHolderText={placeHolderText.CONFIRM_PASSWORD} textContentType={keyBoardTypeConst.NEW_PASSWORD} isSecureTextEntry={true}
                    keyboardType={isAndroid && keyBoardTypeConst.ANDROID_NUMERIC || keyBoardTypeConst.IOS_NUMERIC} icon={<LoginSecretIcon stroke={formState.errors[fieldControllerName.CONFIRM_SECRET]?.message &&
                        colors.RED || colors.SDOM_PLACEHOLDER} />} formState={formState}
                    maxLength={numericConstants.THOUSAND} refCallback={refCallback} maxLength={numericConstants.FOUR} extraStyles={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRoman, SDGenericStyles.textColorWhite]} />
            </ScrollView>

            <View style={userAuthStyles.registrationConfirmationView}>
                <TouchableOpacity activeOpacity={.7} style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.backgroundColorYellow]}
                    onPress={handleSubmit(onSubmit)}>
                    <Text style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.fontFamilyBold]}>{actionButtonTextConstants.PROCEED}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
