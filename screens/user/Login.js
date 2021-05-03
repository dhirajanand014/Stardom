import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PhoneIcon } from '../../components/icons/PhoneIcon';
import { LoginSecretIcon } from '../../components/icons/LoginSecretIcon';
import { useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import {
    fieldControllerName, formRequiredRules,
    stringConstants, numericConstants, keyBoardTypeConst,
    placeHolderText, isAndroid, miscMessage, actionButtonTextConstants
} from '../../constants/Constants';
import { colors, SDGenericStyles, userAuthStyles } from '../../styles/Styles';
import { LoginIcon } from '../../components/icons/LogInIcon';
import { focusOnInputIfFormInvalid, handleUserLogin } from '../../helper/Helper';
import { SDImageFormInput } from '../../views/fromInputView/SDImageFormInput';
export const Login = props => {

    const { handleSubmit, control, formState } = useForm();

    const navigation = useNavigation();

    let secretRef = useRef(null);

    const refCallback = node => {
        secretRef.current = node;
    };

    const onSubmit = async data => {
        const respons = await handleUserLogin(data, messaging);
    }

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack, SDGenericStyles.paddingHorizontal25]}>
            <View style={[SDGenericStyles.justifyContentCenter, SDGenericStyles.paddingVertical20,
            SDGenericStyles.alignItemsCenter]}>
                <LoginIcon stroke={colors.SDOM_WHITE} />
            </View>
            <SDImageFormInput inputName={fieldControllerName.PHONE_NUMBER} control={control} rules={formRequiredRules.mobileInputFormRule}
                defaultValue={stringConstants.EMPTY} isPhoneNumberEntry={true} maxLength={numericConstants.TEN} placeHolderText={placeHolderText.PHONE_NUMBER}
                keyboardType={isAndroid && keyBoardTypeConst.ANDROID_NUMERIC || keyBoardTypeConst.IOS_NUMERIC} icon={<PhoneIcon stroke={colors.SDOM_WHITE} />}
                textContentType={keyBoardTypeConst.TELPHONETYPE} formState={formState} autofocus={true} extraStyles={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRoman,
                SDGenericStyles.textColorWhite]} onSubmitEditing={() => focusOnInputIfFormInvalid(formState, secretRef)} />

            <SDImageFormInput inputName={fieldControllerName.SECRET} control={control} rules={formRequiredRules.passwordFormRule}
                defaultValue={stringConstants.EMPTY} maxLength={numericConstants.FOUR} placeHolderText={placeHolderText.SECRET} refCallback={refCallback}
                keyboardType={isAndroid && keyBoardTypeConst.ANDROID_NUMERIC || keyBoardTypeConst.IOS_NUMERIC} isSecureTextEntry={true} icon={<LoginSecretIcon stroke={colors.SDOM_WHITE} />}
                textContentType={keyBoardTypeConst.PASSWORD} formState={formState} extraStyles={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRoman, SDGenericStyles.textColorWhite]} />

            <View activeOpacity={.7} style={userAuthStyles.signInCreateAccount}>
                <Text style={[SDGenericStyles.textCenterAlign, SDGenericStyles.ft14, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyBold]}>
                    {miscMessage.DONT_HAVE_ACCOUNT}{stringConstants.SPACE}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate(actionButtonTextConstants.REGISTER)}>
                    <Text style={[SDGenericStyles.textCenterAlign, SDGenericStyles.ft14, SDGenericStyles.colorYellow, SDGenericStyles.fontFamilyBold]}>{actionButtonTextConstants.REGISTER}</Text>
                </TouchableOpacity>
            </View>
            <View style={userAuthStyles.registerButtonView}>
                <TouchableOpacity activeOpacity={.7} style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.backgroundColorYellow]} onPress={handleSubmit(onSubmit)}>
                    <Text style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.fontFamilyRoman]}>
                        {actionButtonTextConstants.LOGIN}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}