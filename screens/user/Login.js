import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text } from 'react-native';
import { PhoneIcon } from '../../components/icons/PhoneIcon';
import { LoginSecretIcon } from '../../components/icons/LoginSecretIcon';
import { SDImageFormInput } from '../../components/input/SDImageFormInput';
import {
    fieldTextName, fieldControllerName, formRequiredRules,
    stringConstants, numericConstants, keyBoardTypeConst,
    placeHolderText, isAndroid
} from '../../constants/Constants';
import { colors, SDGenericStyles, userAuthStyles } from '../../styles/Styles';
import { LoginIcon } from '../../components/icons/LogInIcon';
export const Login = (params) => {

    const { handleSubmit, control, formState, clearErrors } = useForm();

    let secretRef = useRef(null);

    const refCallback = node => {
        secretRef.current = node;
    };

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backgroundColorWhite, SDGenericStyles.paddingHorizontal25]}>
            <View style={[SDGenericStyles.justifyContentCenter, SDGenericStyles.paddingVertical50, SDGenericStyles.alignItemsCenter]}>
                <LoginIcon />
            </View>
            <SDImageFormInput inputTextName={fieldTextName.MOBILE_NUMBER} inputName={fieldControllerName.PHONE_NUMBER} control={control} rules={formRequiredRules.mobileInputFormRule}
                defaultValue={stringConstants.EMPTY} isPhoneNumberEntry={true} maxLength={numericConstants.TEN} placeHolderText={placeHolderText.PHONE_NUMBER} style={{ flex: 1, padding: 15, }}
                keyboardType={isAndroid && keyBoardTypeConst.ANDROID_NUMERIC || keyBoardTypeConst.IOS_NUMERIC} icon={<PhoneIcon stroke={colors.BLACK} />}
                textContentType={keyBoardTypeConst.TELPHONETYPE} formState={formState} autofocus={true} style={[SDGenericStyles.colorWhite, SDGenericStyles.ft16]} />

            <SDImageFormInput inputTextName={fieldTextName.PASSWORD} inputName={fieldControllerName.SECRET} control={control} rules={formRequiredRules.passwordFormRule}
                defaultValue={stringConstants.EMPTY} maxLength={numericConstants.FOUR} placeHolderText={placeHolderText.SECRET} refCallback={refCallback}
                keyboardType={isAndroid && keyBoardTypeConst.ANDROID_NUMERIC || keyBoardTypeConst.IOS_NUMERIC} isSecureTextEntry={true} icon={<LoginSecretIcon />}
                textContentType={keyBoardTypeConst.PASSWORD} formState={formState} style={[SDGenericStyles.colorWhite, SDGenericStyles.ft16]} />

            <View style={userAuthStyles.signInCreateAccount}>
                <Text style={userAuthStyles.signInCreateAccountText}>
                    Don't have an account?{' '}
                </Text>
            </View>
        </View>
    )
}