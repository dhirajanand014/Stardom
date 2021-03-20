import React from 'react';
import { useForm } from 'react-hook-form';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SDImageFormInput } from '../../components/input/SDImageFormInput';
import {
    fieldTextName, fieldControllerName, formRequiredRules,
    stringConstants, numericConstants, keyBoardTypeConst,
    placeHolderText, isAndroid, actionButtonTextConstants
} from '../../constants/Constants';
import { colors, SDGenericStyles, userAuthStyles } from '../../styles/Styles';
import { LoginIcon } from '../../components/icons/LogInIcon';
import { PhoneIcon } from '../../components/icons/PhoneIcon';
export const Register = (params) => {

    const { handleSubmit, control, formState, clearErrors } = useForm();

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backgroundColorWhite, SDGenericStyles.paddingHorizontal25]}>
            <View style={[SDGenericStyles.justifyContentCenter, SDGenericStyles.paddingBottom50, SDGenericStyles.paddingTop80,
            SDGenericStyles.alignItemsCenter]}>
                <LoginIcon />
            </View>
            <SDImageFormInput inputTextName={fieldTextName.MOBILE_NUMBER} inputName={fieldControllerName.PHONE_NUMBER} control={control} rules={formRequiredRules.mobileInputFormRule}
                defaultValue={stringConstants.EMPTY} isPhoneNumberEntry={true} maxLength={numericConstants.TEN} placeHolderText={placeHolderText.PHONE_NUMBER} isSignUp={true}
                keyboardType={isAndroid && keyBoardTypeConst.ANDROID_NUMERIC || keyBoardTypeConst.IOS_NUMERIC} icon={<PhoneIcon stroke={colors.BLACK} />} textContentType={keyBoardTypeConst.TELPHONETYPE} f
                formState={formState} autofocus={true} style={[SDGenericStyles.colorWhite, SDGenericStyles.ft16]} />
            <Text style={userAuthStyles.registerDescription}>{placeHolderText.REGISTER_DESCRIPTION}</Text>
            <View style={userAuthStyles.registerButtonView}>
                <TouchableOpacity activeOpacity={.7} style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.backgroundColorYellow]}>
                    <Text style={[userAuthStyles.primaryActionButtonButtonText]}>{actionButtonTextConstants.REGISTER}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}