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
import { focusOnInputIfFormInvalid, handleUserLogin, redirectUserToGlance, showSnackBar } from '../../helper/Helper';
import { SDImageFormInput } from '../../views/fromInputView/SDImageFormInput';
import { AuthHeaderText } from '../../views/fromInputView/AuthHeaderText';
import { CategoryContext } from '../../App';
export const Login = () => {

    const { handleSubmit, control, formState } = useForm();

    const { loggedInUser, setLoggedInUser, loader, setLoader } = useContext(CategoryContext);
    const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);

    const route = useRoute();
    const isIntermediateLogin = route.params?.isIntermediateLogin || false;

    const navigation = useNavigation();

    let secretRef = useRef(null);

    const refCallback = node => {
        secretRef.current = node;
    };

    const onSubmit = async data => {
        setLoader(true);
        const responseData = await handleUserLogin(data, loggedInUser, setLoggedInUser, messaging);
        if (responseData) {
            showSnackBar(alertTextMessages.SUCCESSFULLY_LOGGED_IN, true);
            setLoader(false);
            if (isIntermediateLogin) {
                navigation.goBack();
            } else {
                const categoriesViewed = await redirectUserToGlance();
                categoriesViewed && navigation.dispatch(TabActions.jumpTo(screens.GLANCE))
                    || navigation.navigate(screens.CATEGORY);
            }
        } else {
            showSnackBar(errorMessages.COULD_NOT_LOGIN_USER, false);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack, SDGenericStyles.paddingHorizontal25]} pointerEvents={loader.isLoading && miscMessage.NONE ||
                miscMessage.AUTO}>
                <AuthHeaderText titleTextHeader={modalTextConstants.LOGIN_TITLE_HEADER} titleText={modalTextConstants.LOGIN_TITLE_TEXT} />
                <SDImageFormInput inputName={fieldControllerName.PHONE_NUMBER} control={control} rules={formRequiredRules.mobileInputFormRule}
                    defaultValue={stringConstants.EMPTY} isPhoneNumberEntry={true} maxLength={numericConstants.TEN} placeHolderText={placeHolderText.PHONE_NUMBER}
                    keyboardType={isAndroid && keyBoardTypeConst.ANDROID_NUMERIC || keyBoardTypeConst.IOS_NUMERIC} icon={<PhoneIcon stroke={colors.SDOM_PLACEHOLDER} />}
                    textContentType={keyBoardTypeConst.TELPHONETYPE} formState={formState} autofocus={true} extraStyles={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRoman,
                    SDGenericStyles.textColorWhite]} onSubmitEditing={() => focusOnInputIfFormInvalid(formState, secretRef)} />

                <SDImageFormInput inputName={fieldControllerName.SECRET} control={control} rules={formRequiredRules.passwordFormRule} setIsSecureTextEntry={setIsSecureTextEntry}
                    defaultValue={stringConstants.EMPTY} minLength={numericConstants.SIX} placeHolderText={placeHolderText.SECRET} refCallback={refCallback} isPasswordInput={true}
                    keyboardType={keyBoardTypeConst.DEFAULT} isSecureTextEntry={isSecureTextEntry} icon={<LoginSecretIcon stroke={colors.SDOM_PLACEHOLDER} />}
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
        </TouchableWithoutFeedback>
    )
}