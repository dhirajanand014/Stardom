
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SDImageFormInput } from '../../views/fromInputView/SDImageFormInput';
import {
    fieldControllerName, formRequiredRules,
    stringConstants, numericConstants, keyBoardTypeConst,
    placeHolderText, actionButtonTextConstants, isAndroid, colorConstants, screens
} from '../../constants/Constants';
import { SDGenericStyles, userAuthStyles } from '../../styles/Styles';
import { RegisterUserIcon } from '../../components/icons/RegisterUserIcon';
import { LoginSecretIcon } from '../../components/icons/LoginSecretIcon';
import { useNavigation, useRoute } from '@react-navigation/core';
import { focusOnInputIfFormInvalid } from '../../helper/Helper';
export const RegistrationConfirmation = () => {

    const { control, formState, setError, handleSubmit } = useForm();

    let confirmSecretRef = useRef(null);
    const route = useRoute();

    const refCallback = node => {
        confirmSecretRef.current = node;
    };
    const navigation = useNavigation();

    const onSubmit = async (data) => {
        if (data.confirmSecret !== data.secret) {
            setError(fieldControllerName.CONFIRM_SECRET, formRequiredRules.confirmPasswordRule)
        } else if (data.confirmSecret === data.secret) {
            navigation.reset({
                index: numericConstants.ZERO, routes: [{
                    name: screens.REGISTRATION_DETAILS, params: {
                        phoneNumber: route?.params?.phoneNumber
                    }
                }]
            });
        }
    };

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack, SDGenericStyles.paddingHorizontal25]}>
            <View style={[SDGenericStyles.justifyContentCenter, SDGenericStyles.paddingBottom50, SDGenericStyles.paddingTop40,
            SDGenericStyles.alignItemsCenter]}>
                <RegisterUserIcon width={numericConstants.ONE_HUNDRED} height={numericConstants.ONE_HUNDRED} stroke={colorConstants.WHITE} />
            </View>
            <ScrollView>
                <SDImageFormInput inputName={fieldControllerName.USER_ID} control={control} rules={formRequiredRules.usedIdFormRule}
                    defaultValue={stringConstants.EMPTY} placeHolderText={placeHolderText.USER_ID} autofocus={true} icon={<RegisterUserIcon width={numericConstants.EIGHTEEN}
                        height={numericConstants.EIGHTEEN} stroke={colorConstants.BLACK} />}
                    keyboardType={keyBoardTypeConst.DEFAULT} textContentType={keyBoardTypeConst.USERNAME} formState={formState}
                    isUserId={true} extraStyles={[SDGenericStyles.fontFamilyRoman, SDGenericStyles.ft16]} />

                <SDImageFormInput inputName={fieldControllerName.SECRET} control={control} rules={formRequiredRules.passwordFormRule}
                    defaultValue={stringConstants.EMPTY} placeHolderText={placeHolderText.SECRET} textContentType={keyBoardTypeConst.NEW_PASSWORD} maxLength={numericConstants.FOUR}
                    keyboardType={isAndroid && keyBoardTypeConst.ANDROID_NUMERIC || keyBoardTypeConst.IOS_NUMERIC} icon={<LoginSecretIcon />} formState={formState}
                    isSecureTextEntry={true} onSubmitEditing={() => focusOnInputIfFormInvalid(formState, confirmSecretRef)} extraStyles={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRoman]} />

                <SDImageFormInput inputName={fieldControllerName.CONFIRM_SECRET} control={control} rules={formRequiredRules.passwordFormRule}
                    defaultValue={stringConstants.EMPTY} placeHolderText={placeHolderText.CONFIRM_PASSWORD} textContentType={keyBoardTypeConst.NEW_PASSWORD} isSecureTextEntry={true}
                    keyboardType={isAndroid && keyBoardTypeConst.ANDROID_NUMERIC || keyBoardTypeConst.IOS_NUMERIC} icon={<LoginSecretIcon />} formState={formState} maxLength={numericConstants.THOUSAND}
                    refCallback={refCallback} maxLength={numericConstants.FOUR} extraStyles={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRoman]} />
            </ScrollView>

            <View style={userAuthStyles.registrationConfirmationView}>
                <TouchableOpacity activeOpacity={.7} style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.backgroundColorYellow]}
                    onPress={handleSubmit(onSubmit)}>
                    <Text style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.fontFamilyBold]}>{actionButtonTextConstants.SUBMIT}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}