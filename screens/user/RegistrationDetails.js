
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SDImageFormInput } from '../../views/fromInputView/SDImageFormInput';
import {
    fieldControllerName, formRequiredRules, stringConstants, keyBoardTypeConst,
    placeHolderText, actionButtonTextConstants, miscMessage, numericConstants,
    modalTextConstants, defaultProfilesValue, alertTextMessages, screens
} from '../../constants/Constants';
import { SDGenericStyles, userAuthStyles, colors, glancePostStyles } from '../../styles/Styles';
import { SDDatePickerView } from '../../views/datePickerView/SDDatePickerView';
import { SDGenderRadioOptionView } from '../../views/fromInputView/SDGenderRadioOptionView';
import { AuthHeaderText } from '../../views/fromInputView/AuthHeaderText';
import { CalenderIcon } from '../../components/icons/CalenderIcon';
import { RegisterUserIcon } from '../../components/icons/RegisterUserIcon';
import Animated from 'react-native-reanimated';
import { SDDropDownView } from '../../views/dropDownView/SDDropDownView';
import { showSnackBar, handleUserRegistration, saveRegistrationStatus } from '../../helper/Helper';
import { useNavigation } from '@react-navigation/core';
import { CategoryContext } from '../../App';
import { useRoute } from '@react-navigation/native';

export const RegistrationDetails = () => {

    const { control, formState, handleSubmit, watch } = useForm();
    const { signUpDetails, profiles, loader, setLoaderCallback, loggedInUser, setLoggedInUser } = useContext(CategoryContext);

    const navigation = useNavigation();

    const route = useRoute();
    const isFrom = route.params?.isFrom || stringConstants.EMPTY;
    const intermediateLogin = route.params?.intermediateLogin;

    const phoneNumber = signUpDetails.phoneNumber || route.params?.phoneNumber;

    const genderValue = watch(fieldControllerName.GENDER);

    const onSubmit = async (data) => {
        setLoaderCallback(true);
        const registrationUpdated = await handleUserRegistration(phoneNumber, data, miscMessage.UPDATE);
        if (registrationUpdated) {
            showSnackBar(alertTextMessages.USER_DETAILS_ADDED_SUCCESSFULLY, true);

            loggedInUser.loginDetails.details = JSON.stringify(registrationUpdated.user);
            setLoggedInUser({ ...loggedInUser });
            if (isFrom == screens.LOGIN) {
                if (intermediateLogin == miscMessage.CREATE || intermediateLogin == miscMessage.UPDATE) {
                    navigation.navigate(screens.ADD_POST_DETAILS, { toAction: intermediateLogin });
                } else {
                    navigation.navigate(intermediateLogin && intermediateLogin || screens.LOGIN);
                }
            } else {
                navigation.navigate(screens.LOGIN);
            }
        } else {
            await saveRegistrationStatus(phoneNumber, miscMessage.VERIFIED);
        }
        setLoaderCallback(false);
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack, SDGenericStyles.paddingHorizontal25]}
                pointerEvents={loader.isLoading && miscMessage.NONE || miscMessage.AUTO}>
                <AuthHeaderText titleText={modalTextConstants.ACCOUNT_DETAILS} paddingTopNeeded showBackIcon extraStyles={SDGenericStyles.marginTop20} />
                <Animated.ScrollView>
                    <SDImageFormInput inputName={fieldControllerName.NAME} control={control} rules={formRequiredRules.nameFormRule}
                        defaultValue={stringConstants.EMPTY} placeHolderText={placeHolderText.FULL_NAME} autofocus={true}
                        keyboardType={keyBoardTypeConst.DEFAULT} textContentType={keyBoardTypeConst.NAME} formState={formState}
                        extraStyles={[SDGenericStyles.ft16, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoRegular]}
                        icon={<RegisterUserIcon width={numericConstants.EIGHTEEN} height={numericConstants.EIGHTEEN}
                            stroke={formState.errors[fieldControllerName.USER_ID]?.message && colors.RED || colors.SDOM_PLACEHOLDER} />} />

                    <SDImageFormInput inputName={fieldControllerName.EMAIL} control={control} rules={formRequiredRules.emailRule}
                        defaultValue={stringConstants.EMPTY} placeHolderText={placeHolderText.EMAIL}
                        keyboardType={keyBoardTypeConst.EMAIL} textContentType={keyBoardTypeConst.NONE} formState={formState}
                        extraStyles={[SDGenericStyles.ft16, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoRegular]}
                        icon={<RegisterUserIcon width={numericConstants.EIGHTEEN} height={numericConstants.EIGHTEEN}
                            stroke={formState.errors[fieldControllerName.USER_ID]?.message && colors.RED || colors.SDOM_PLACEHOLDER} />} />

                    <SDDatePickerView inputName={fieldControllerName.DOB} control={control} rules={formRequiredRules.datePickerFormRule} maximumDate={Date.now()}
                        defaultValue={stringConstants.EMPTY} formState={formState} mode={miscMessage.DATE} dateFormat={miscMessage.DOB_DATE_FORMAT}
                        display={keyBoardTypeConst.DEFAULT} placeHolderText={placeHolderText.DOB} icon={<CalenderIcon width={numericConstants.EIGHTEEN}
                            height={numericConstants.EIGHTEEN} stroke={formState.errors[fieldControllerName.USER_ID]?.message && colors.RED || colors.SDOM_PLACEHOLDER} />} />

                    <SDDropDownView inputName={fieldControllerName.PROFILE} control={control} rules={formRequiredRules.profileRule} selectedLabelStyle={SDGenericStyles.textColorWhite}
                        containerStyle={userAuthStyles.dropDownPickerStyle} dropDownPickerStyle={glancePostStyles.addPostDropDownStyle} placeHolderText={placeHolderText.SELECT_A_PROFILE}
                        defaultValue={stringConstants.EMPTY} formState={formState} list={profiles.filter(role => role.value != numericConstants.MINUS_ONE)}
                        dropDownDefaultValue={profiles.length && profiles.find(role => role.value == numericConstants.ZERO).value || defaultProfilesValue.value}
                        extraStyles={[SDGenericStyles.textBoxGray]} globalTextStyle={[SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.ft16, SDGenericStyles.textColorWhite]} />

                    <SDGenderRadioOptionView inputName={fieldControllerName.GENDER} control={control} rules={formRequiredRules.genderRule} formState={formState}
                        defaultValue={stringConstants.EMPTY} checkValue={genderValue} />

                </Animated.ScrollView>

                <View style={userAuthStyles.registerationDetailsView}>
                    <TouchableOpacity activeOpacity={.7} style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.backgroundColorYellow]} onPress={handleSubmit(onSubmit)}>
                        <Text style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.fontFamilyRobotoRegular]}>{actionButtonTextConstants.REGISTER.toUpperCase()}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}