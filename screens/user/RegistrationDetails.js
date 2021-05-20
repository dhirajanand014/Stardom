
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

export const RegistrationDetails = () => {

    const { control, formState, handleSubmit, watch } = useForm();
    const { signUpDetails, profiles, loader, setLoader } = useContext(CategoryContext);

    const navigation = useNavigation();

    const genderValue = watch(fieldControllerName.GENDER);

    const onSubmit = async (data) => {
        setLoader({ ...loader, isLoading: true });
        const registrationUpdated = await handleUserRegistration(signUpDetails.phoneNumber, data,
            miscMessage.UPDATE);
        if (registrationUpdated) {
            showSnackBar(alertTextMessages.USER_DETAILS_ADDED_SUCCESSFULLY, true);
            navigation.navigate(screens.LOGIN);
        } else {
            await saveRegistrationStatus(phoneNumber, miscMessage.VERIFIED);
        }
        setLoader({ ...loader, isLoading: false });
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack, SDGenericStyles.paddingHorizontal25]}
                pointerEvents={loader.isLoading && miscMessage.NONE || miscMessage.AUTO}>
                <AuthHeaderText titleText={modalTextConstants.ACCOUNT_DETAILS} />
                <Animated.ScrollView>
                    <SDImageFormInput inputName={fieldControllerName.NAME} control={control} rules={formRequiredRules.nameFormRule}
                        defaultValue={stringConstants.EMPTY} placeHolderText={placeHolderText.FULL_NAME} autofocus={true}
                        keyboardType={keyBoardTypeConst.DEFAULT} textContentType={keyBoardTypeConst.NAME} formState={formState}
                        extraStyles={[SDGenericStyles.ft16, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRoman]}
                        icon={<RegisterUserIcon width={numericConstants.EIGHTEEN} height={numericConstants.EIGHTEEN}
                            stroke={formState.errors[fieldControllerName.USER_ID]?.message && colors.RED || colors.SDOM_PLACEHOLDER} />} />

                    <SDImageFormInput inputName={fieldControllerName.EMAIL} control={control} rules={formRequiredRules.emailRule}
                        defaultValue={stringConstants.EMPTY} placeHolderText={placeHolderText.EMAIL}
                        keyboardType={keyBoardTypeConst.EMAIL} textContentType={keyBoardTypeConst.NONE} formState={formState}
                        extraStyles={[SDGenericStyles.ft16, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRoman]}
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
                        extraStyles={[SDGenericStyles.textBoxGray]} globalTextStyle={[SDGenericStyles.fontFamilyRoman, SDGenericStyles.ft16, SDGenericStyles.textColorWhite]} />

                    <SDGenderRadioOptionView inputName={fieldControllerName.GENDER} control={control} rules={formRequiredRules.genderRule} formState={formState}
                        defaultValue={stringConstants.EMPTY} checkValue={genderValue} />

                </Animated.ScrollView>

                <View style={userAuthStyles.registerationDetailsView}>
                    <TouchableOpacity activeOpacity={.7} style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.backgroundColorYellow]} onPress={handleSubmit(onSubmit)}>
                        <Text style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.fontFamilyRoman]}>{actionButtonTextConstants.REGISTER}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}