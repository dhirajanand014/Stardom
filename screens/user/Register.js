import React from 'react';
import { useForm } from 'react-hook-form';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SDImageFormInput } from '../../components/input/SDImageFormInput';
import {
    fieldTextName, fieldControllerName, formRequiredRules,
    stringConstants, numericConstants, keyBoardTypeConst,
    placeHolderText, isAndroid, actionButtonTextConstants, miscMessage
} from '../../constants/Constants';
import { colors, SDGenericStyles, userAuthStyles } from '../../styles/Styles';
import { PhoneIcon } from '../../components/icons/PhoneIcon';
import { RegisterUserIcon } from '../../components/icons/RegisterUserIcon';
import { SDDatePickerView } from '../../views/SDDatePickerView';
export const Register = (params) => {

    const { handleSubmit, control, formState, clearErrors } = useForm();

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backgroundColorWhite, SDGenericStyles.paddingHorizontal25]}>
            <View style={[SDGenericStyles.justifyContentCenter, SDGenericStyles.paddingBottom50, SDGenericStyles.paddingTop80,
            SDGenericStyles.alignItemsCenter]}>
                <RegisterUserIcon />
            </View>
            <SDImageFormInput inputName={fieldControllerName.FULL_NAME} control={control} rules={formRequiredRules.nameFormRule}
                defaultValue={stringConstants.EMPTY} placeHolderText={placeHolderText.FULL_NAME} isRegister={true} autofocus={true}
                keyboardType={keyBoardTypeConst.DEFAULT} textContentType={keyBoardTypeConst.NAME} formState={formState}
                style={[SDGenericStyles.colorWhite, SDGenericStyles.ft16]} />

            <SDImageFormInput inputName={fieldControllerName.EMAIL} control={control} rules={formRequiredRules.emailRule}
                defaultValue={stringConstants.EMPTY} placeHolderText={placeHolderText.EMAIL} isRegister={true} autofocus={true}
                keyboardType={keyBoardTypeConst.EMAIL} textContentType={keyBoardTypeConst.EMAIL} formState={formState}
                style={[SDGenericStyles.colorWhite, SDGenericStyles.ft16]} />

            <SDDatePickerView inputName={fieldControllerName.DOB} control={control} rules={formRequiredRules.datePickerFormRule} maximumDate={Date.now()}
                defaultValue={stringConstants.EMPTY} formState={formState} mode={miscMessage.DATE} dateFormat={miscMessage.DOB_DATE_FORMAT}
                display={keyBoardTypeConst.DEFAULT} />

            <SDImageFormInput inputName={fieldControllerName.PHONE_NUMBER} control={control} rules={formRequiredRules.mobileInputFormRule}
                defaultValue={stringConstants.EMPTY} isPhoneNumberEntry={true} maxLength={numericConstants.TEN} placeHolderText={placeHolderText.PHONE_NUMBER} isSignUp={true}
                keyboardType={isAndroid && keyBoardTypeConst.ANDROID_NUMERIC || keyBoardTypeConst.IOS_NUMERIC} textContentType={keyBoardTypeConst.TELPHONETYPE}
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