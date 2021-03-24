import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PhoneIcon } from '../../components/icons/PhoneIcon';
import { LoginSecretIcon } from '../../components/icons/LoginSecretIcon';
import { SDImageFormInput } from '../../components/input/SDImageFormInput'
import { useNavigation } from '@react-navigation/native';;
import {
    fieldTextName, fieldControllerName, formRequiredRules,
    stringConstants, numericConstants, keyBoardTypeConst,
    placeHolderText, isAndroid, miscMessage, actionButtonTextConstants
} from '../../constants/Constants';
import { colors, SDGenericStyles, userAuthStyles } from '../../styles/Styles';
import { LoginIcon } from '../../components/icons/LogInIcon';
import { focusOnInputIfFormInvalid } from '../../helper/Helper';
export const Login = (params) => {

    const { handleSubmit, control, formState, clearErrors } = useForm();

    const navigation = useNavigation();

    let secretRef = useRef(null);

    const refCallback = node => {
        secretRef.current = node;
    };

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backgroundColorWhite, SDGenericStyles.paddingHorizontal25]}>
            <View style={[SDGenericStyles.justifyContentCenter, SDGenericStyles.paddingBottom50, SDGenericStyles.paddingTop80,
            SDGenericStyles.alignItemsCenter]}>
                <LoginIcon />
            </View>
            <SDImageFormInput inputName={fieldControllerName.PHONE_NUMBER} control={control} rules={formRequiredRules.mobileInputFormRule}
                defaultValue={stringConstants.EMPTY} isPhoneNumberEntry={true} maxLength={numericConstants.TEN} placeHolderText={placeHolderText.PHONE_NUMBER}
                keyboardType={isAndroid && keyBoardTypeConst.ANDROID_NUMERIC || keyBoardTypeConst.IOS_NUMERIC} icon={<PhoneIcon stroke={colors.BLACK} />}
                textContentType={keyBoardTypeConst.TELPHONETYPE} formState={formState} autofocus={true} style={[SDGenericStyles.colorWhite, SDGenericStyles.ft16]}
                onSubmitEditing={() => focusOnInputIfFormInvalid(formState, secretRef)} />

            <SDImageFormInput inputName={fieldControllerName.SECRET} control={control} rules={formRequiredRules.passwordFormRule}
                defaultValue={stringConstants.EMPTY} maxLength={numericConstants.FOUR} placeHolderText={placeHolderText.SECRET} refCallback={refCallback}
                keyboardType={isAndroid && keyBoardTypeConst.ANDROID_NUMERIC || keyBoardTypeConst.IOS_NUMERIC} isSecureTextEntry={true} icon={<LoginSecretIcon />}
                textContentType={keyBoardTypeConst.PASSWORD} formState={formState} style={[SDGenericStyles.colorWhite, SDGenericStyles.ft16]} />

            <View activeOpacity={.7} style={userAuthStyles.signInCreateAccount}>
                <Text style={[userAuthStyles.signInCreateAccountText, SDGenericStyles.ft16]}>{miscMessage.DONT_HAVE_ACCOUNT}{stringConstants.SPACE}</Text>
                <TouchableOpacity onPress={() => navigation.navigate(actionButtonTextConstants.REGISTER)}>
                    <Text style={[userAuthStyles.registerLink, SDGenericStyles.ft16]}>{actionButtonTextConstants.REGISTER}</Text>
                </TouchableOpacity>
            </View>
            <View style={userAuthStyles.signInSecondaryButtonView}>
                <TouchableOpacity activeOpacity={.7} style={userAuthStyles.actionButtonStyle}>
                    <Text style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.bold, SDGenericStyles.fontFamilyNormal]}>
                        {actionButtonTextConstants.SIGN_IN}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}