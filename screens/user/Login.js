import React, { useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PhoneIcon } from '../../components/icons/PhoneIcon';
import { LoginSecretIcon } from '../../components/icons/LoginSecretIcon';
import { TabActions, useNavigation, useRoute } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import {
    fieldControllerName, formRequiredRules,
    stringConstants, numericConstants, keyBoardTypeConst,
    placeHolderText, isAndroid, miscMessage, actionButtonTextConstants,
    screens, alertTextMessages, errorMessages, modalTextConstants
} from '../../constants/Constants';
import { colors, SDGenericStyles, userAuthStyles } from '../../styles/Styles';
import {
    focusOnInputIfFormInvalid, handleForgotPassword, handleUserLogin,
    redirectUserToGlance, showSnackBar
} from '../../helper/Helper';
import { SDImageFormInput } from '../../views/fromInputView/SDImageFormInput';
import { AuthHeaderText } from '../../views/fromInputView/AuthHeaderText';
import { CategoryContext } from '../../App';
export const Login = () => {

    const { handleSubmit, control, formState, trigger, watch, setError, clearErrors } = useForm();

    const { loggedInUser, setLoggedInUser, loader, setLoaderCallback, signUpDetails, setSignUpDetails } = useContext(CategoryContext);
    const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);

    const route = useRoute();
    const intermediateLogin = route.params?.intermediateLogin || false;

    const watchMobileNumber = watch(fieldControllerName.PHONE_NUMBER);

    const navigation = useNavigation();

    let secretRef = useRef(null);

    const refCallback = node => {
        secretRef.current = node;
    };

    const onSubmit = async data => {
        setLoaderCallback(true);
        const responseData = await handleUserLogin(data, loggedInUser, setLoggedInUser, messaging);
        if (responseData && responseData.user) {
            if (responseData.user.block == numericConstants.ONE) {
                showSnackBar(errorMessages.BLOCKED_BY_ADMIN, false, true);
            } else if (responseData.user.status == miscMessage.REGISTERED) {
                showSnackBar(alertTextMessages.SUCCESSFULLY_LOGGED_IN, true);
                navigation.navigate(screens.REGISTRATION_DETAILS, {
                    isFrom: screens.LOGIN,
                    phoneNumber: data.phoneNumber,
                    intermediateLogin: !intermediateLogin && screens.CATEGORY
                        || intermediateLogin
                });
            } else if (responseData.user.status == miscMessage.VERIFIED) {
                showSnackBar(alertTextMessages.SUCCESSFULLY_LOGGED_IN, true);
                if (intermediateLogin) {
                    navigation.goBack();
                } else {
                    const categoriesViewed = await redirectUserToGlance();
                    categoriesViewed && navigation.dispatch(TabActions.jumpTo(screens.GLANCE))
                        || navigation.navigate(screens.CATEGORY);
                }
            }
        } else {
            showSnackBar(errorMessages.COULD_NOT_LOGIN_USER, false);
        }

        setLoaderCallback(false);
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack, SDGenericStyles.paddingHorizontal25]} pointerEvents={loader.isLoading && miscMessage.NONE ||
                miscMessage.AUTO}>
                <AuthHeaderText titleTextHeader={modalTextConstants.LOGIN_TITLE_HEADER} titleText={modalTextConstants.LOGIN_TITLE_TEXT} paddingTopNeeded showBackIcon />
                <SDImageFormInput inputName={fieldControllerName.PHONE_NUMBER} control={control} rules={formRequiredRules.mobileInputFormRule}
                    defaultValue={stringConstants.EMPTY} isPhoneNumberEntry={true} maxLength={numericConstants.TEN} placeHolderText={placeHolderText.PHONE_NUMBER}
                    keyboardType={isAndroid && keyBoardTypeConst.ANDROID_NUMERIC || keyBoardTypeConst.IOS_NUMERIC} icon={<PhoneIcon stroke={formState.errors[fieldControllerName.PHONE_NUMBER]?.message &&
                        colors.RED || colors.SDOM_PLACEHOLDER} />}
                    textContentType={keyBoardTypeConst.TELPHONETYPE} formState={formState} autofocus={true} extraStyles={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoRegular,
                    SDGenericStyles.textColorWhite]} onSubmitEditing={() => focusOnInputIfFormInvalid(formState, secretRef)} />

                <SDImageFormInput inputName={fieldControllerName.SECRET} control={control} rules={formRequiredRules.passwordFormRule} setIsSecureTextEntry={setIsSecureTextEntry}
                    defaultValue={stringConstants.EMPTY} minLength={numericConstants.SIX} placeHolderText={placeHolderText.SECRET} refCallback={refCallback} isPasswordInput={true}
                    keyboardType={keyBoardTypeConst.DEFAULT} isSecureTextEntry={isSecureTextEntry} icon={<LoginSecretIcon stroke={formState.errors[fieldControllerName.SECRET]?.message &&
                        colors.RED || colors.SDOM_PLACEHOLDER} />} textContentType={keyBoardTypeConst.PASSWORD} formState={formState}
                    extraStyles={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textColorWhite]} />

                <TouchableOpacity activeOpacity={.7} style={[SDGenericStyles.alignSelfEnd, SDGenericStyles.justifyContentCenter, SDGenericStyles.mtMinus10, SDGenericStyles.mb15]}
                    onPress={async () => await handleForgotPassword(watchMobileNumber, navigation, trigger, setError, clearErrors, signUpDetails, setSignUpDetails)}>
                    <Text style={[SDGenericStyles.ft14, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.textColorPink]}>
                        {miscMessage.FORGOT_PASSWORD}
                    </Text>
                </TouchableOpacity>

                <View activeOpacity={.7} style={userAuthStyles.signInCreateAccount}>
                    <Text style={[SDGenericStyles.textCenterAlign, SDGenericStyles.ft14, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium]}>
                        {miscMessage.DONT_HAVE_ACCOUNT}{stringConstants.SPACE}
                    </Text>
                    <TouchableOpacity activeOpacity={.5} onPress={() => navigation.navigate(actionButtonTextConstants.REGISTER)}>
                        <Text style={[SDGenericStyles.textCenterAlign, SDGenericStyles.ft14, SDGenericStyles.colorYellow, SDGenericStyles.fontFamilyRobotoMedium]}>
                            {actionButtonTextConstants.REGISTER.toUpperCase()}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={userAuthStyles.registerButtonView}>
                    <TouchableOpacity activeOpacity={.7} style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.backgroundColorYellow]} onPress={handleSubmit(onSubmit)}>
                        <Text style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.fontFamilyRobotoRegular]}>
                            {actionButtonTextConstants.LOGIN.toUpperCase()}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}