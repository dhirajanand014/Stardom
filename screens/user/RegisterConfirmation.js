
import React, { useCallback, useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SDImageFormInput } from '../../views/fromInputView/SDImageFormInput';
import {
    fieldControllerName, formRequiredRules,
    stringConstants, numericConstants, keyBoardTypeConst,
    placeHolderText, actionButtonTextConstants, screens,
    miscMessage, alertTextMessages, modalTextConstants
} from '../../constants/Constants';
import { colors, SDGenericStyles, userAuthStyles } from '../../styles/Styles';
import { RegisterUserIcon } from '../../components/icons/RegisterUserIcon';
import { LoginSecretIcon } from '../../components/icons/LoginSecretIcon';
import { useNavigation } from '@react-navigation/core';
import {
    focusOnInputIfFormInvalid, handleUserRegistration,
    showSnackBar, saveRegistrationStatus,
    validateUserAction,
    processSaveRegistrationStatus
} from '../../helper/Helper';
import { AuthHeaderText } from '../../views/fromInputView/AuthHeaderText';
import { CategoryContext } from '../../App';

export const RegistrationConfirmation = () => {

    const { control, formState, setError, handleSubmit, watch, clearErrors } = useForm();
    const { signUpDetails, setSignUpDetails, loader, setLoaderCallback } = useContext(CategoryContext);
    const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);

    let confirmSecretRef = useRef(null);
    let isUserIdAvailable = useRef(null);

    const phoneNumber = signUpDetails.phoneNumber || stringConstants.EMPTY;
    const userIdValue = watch(fieldControllerName.USER_ID);

    const refCallback = node => {
        confirmSecretRef.current = node;
    };
    const navigation = useNavigation();

    const validateUserId = useCallback(async () => {
        if (userIdValue && !/\s/g.test(userIdValue)) {
            setLoaderCallback(true);
            const responseData = await validateUserAction(fieldControllerName.USER_ID, userIdValue);
            if (responseData.availability) {
                isUserIdAvailable.current = true;
                clearErrors(fieldControllerName.USER_ID);
            } else {
                isUserIdAvailable.current = false;
                setError(fieldControllerName.USER_ID, formRequiredRules.userIdAvailability);
            }
            setLoaderCallback(false);
        } else {
            setError(fieldControllerName.USER_ID, formRequiredRules.userIdInvalidSpace);
        }
    });

    const clearError = useCallback(() => {
        isUserIdAvailable.current = null;
        clearErrors(fieldControllerName.USER_ID);
    });

    const navigateUser = async (data, isFromForgotPassword) => {
        if (!isFromForgotPassword) {
            setSignUpDetails({ ...signUpDetails, secret: data.password, registrationSuccessful: true });
            showSnackBar(alertTextMessages.SUCCESSFULLY_REGISTERED, true);
            await saveRegistrationStatus(phoneNumber, miscMessage.VERIFIED);
            navigation.reset({ index: numericConstants.ZERO, routes: [{ name: screens.REGISTRATION_DETAILS }] });
        } else {
            showSnackBar(alertTextMessages.SUCCESSFULLY_REGISTERED, true);
            navigation.reset({ index: numericConstants.ZERO, routes: [{ name: routeConsts.HOME }] });
        }
        setLoaderCallback(false);
    }

    const onSubmit = async data => {
        if (data.confirmSecret !== data.secret) {
            setError(fieldControllerName.CONFIRM_SECRET, formRequiredRules.confirmPasswordRule);
        } else if (data.confirmSecret === data.secret) {
            setLoaderCallback(true);
            const responseData = await validateUserAction(fieldControllerName.USER_ID, data.userId);
            if (responseData.availability) {
                isUserIdAvailable.current = true;
                clearErrors(fieldControllerName.USER_ID);
                const registrationResponse = await handleUserRegistration(phoneNumber, data, miscMessage.CREATE);
                if (registrationResponse) {
                    await processSaveRegistrationStatus(isUserIdAvailable, registrationResponse, phoneNumber, navigateUser, data);
                }
            } else {
                isUserIdAvailable.current = false;
                setError(fieldControllerName.USER_ID, formRequiredRules.userIdAvailability);
                setLoaderCallback(false);
            }
        };
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack, SDGenericStyles.paddingHorizontal25]}
                pointerEvents={loader.isLoading && miscMessage.NONE || miscMessage.AUTO}>
                <AuthHeaderText titleText={modalTextConstants.CONFIRM_REGISTRATION} paddingTopNeeded />
                <ScrollView>
                    <SDImageFormInput inputName={fieldControllerName.USER_ID} control={control} rules={formRequiredRules.usedIdFormRule} clearErrors={clearError} isUserIdEntry
                        defaultValue={stringConstants.EMPTY} placeHolderText={placeHolderText.USER_ID} autofocus={true} icon={<RegisterUserIcon width={numericConstants.EIGHTEEN}
                            height={numericConstants.EIGHTEEN} stroke={formState.errors[fieldControllerName.USER_ID]?.message && colors.RED || isUserIdAvailable?.current && colors.LIGHT_GREEN ||
                                colors.SDOM_PLACEHOLDER} />} userIdValue={userIdValue} formState={formState} keyboardType={keyBoardTypeConst.DEFAULT} validateUserId={validateUserId}
                        isUserIdAvailable={isUserIdAvailable} isUserId={true} extraStyles={[SDGenericStyles.ft16, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoRegular]} />

                    <SDImageFormInput inputName={fieldControllerName.SECRET} control={control} rules={formRequiredRules.passwordFormRule} setIsSecureTextEntry={setIsSecureTextEntry}
                        defaultValue={stringConstants.EMPTY} placeHolderText={placeHolderText.SECRET} textContentType={keyBoardTypeConst.PASSWORD} minLength={numericConstants.SIX}
                        keyboardType={keyBoardTypeConst.DEFAULT} icon={<LoginSecretIcon stroke={formState.errors[fieldControllerName.SECRET]?.message &&
                            colors.RED || colors.SDOM_PLACEHOLDER} />} formState={formState} onSubmitEditing={() => focusOnInputIfFormInvalid(formState, confirmSecretRef)}
                        isSecureTextEntry={isSecureTextEntry} extraStyles={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textColorWhite]} isPasswordInput={true} />

                    <SDImageFormInput inputName={fieldControllerName.CONFIRM_SECRET} control={control} rules={formRequiredRules.passwordFormRule} isPasswordInput={true}
                        defaultValue={stringConstants.EMPTY} placeHolderText={placeHolderText.CONFIRM_PASSWORD} textContentType={keyBoardTypeConst.NEW_PASSWORD}
                        keyboardType={keyBoardTypeConst.DEFAULT} icon={<LoginSecretIcon stroke={formState.errors[fieldControllerName.CONFIRM_SECRET]?.message &&
                            colors.RED || colors.SDOM_PLACEHOLDER} />} formState={formState} refCallback={refCallback} minLength={numericConstants.SIX}
                        extraStyles={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textColorWhite]} isSecureTextEntry={isSecureTextEntry}
                        setIsSecureTextEntry={setIsSecureTextEntry} />
                </ScrollView>

                <View style={userAuthStyles.registrationConfirmationView}>
                    <TouchableOpacity activeOpacity={.7} style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.backgroundColorYellow]}
                        onPress={handleSubmit(onSubmit)}>
                        <Text style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.fontFamilyRobotoRegular]}>{actionButtonTextConstants.PROCEED.toUpperCase()}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}


