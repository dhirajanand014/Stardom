
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, TouchableOpacity } from 'react-native';
import { SDImageFormInput } from '../../views/fromInputView/SDImageFormInput';
import {
    fieldControllerName, formRequiredRules, stringConstants, keyBoardTypeConst,
    placeHolderText, actionButtonTextConstants, miscMessage, numericConstants,
    modalTextConstants, jsonConstants, defaultProfilesValue, alertTextMessages, screens
} from '../../constants/Constants';
import { SDGenericStyles, userAuthStyles, colors, glancePostStyles } from '../../styles/Styles';
import { SDDatePickerView } from '../../views/datePickerView/SDDatePickerView';
import { SDGenderRadioOptionView } from '../../views/fromInputView/SDGenderRadioOptionView';
import { AuthHeaderText } from '../../views/fromInputView/AuthHeaderText';
import { CalenderIcon } from '../../components/icons/CalenderIcon';
import { RegisterUserIcon } from '../../components/icons/RegisterUserIcon';
import Animated from 'react-native-reanimated';
import { SDDropDownView } from '../../views/dropDownView/SDDropDownView';
import {
    getAllProfiles, showSnackBar,
    redirectUserToGlance, handleUserRegistration, saveRegistrationStatus
} from '../../helper/Helper';
import { useNavigation, useRoute } from '@react-navigation/core';

export const RegistrationDetails = () => {

    const { control, formState, handleSubmit, watch } = useForm();
    const [profiles, setProfiles] = useState(jsonConstants.EMPTY);

    const navigation = useNavigation();

    const route = useRoute();
    const signUpDetails = route?.params?.signUpDetails;

    const genderValue = watch(fieldControllerName.GENDER);

    useEffect(() => {
        (async () => {
            const allProfiles = await getAllProfiles();
            allProfiles && setProfiles(allProfiles);
        })();
    }, []);

    const onSubmit = async (data) => {
        const registrationUpdated = await handleUserRegistration(signUpDetails.phoneNumber, data,
            miscMessage.UPDATE);
        if (registrationUpdated) {
            const initialCategories = await redirectUserToGlance();
            debugger
            showSnackBar(alertTextMessages.USER_DETAILS_ADDED_SUCCESSFULLY, true);
            navigation.navigate(initialCategories && screens.GLANCE || screens.CATEGORY);
        } else {
            await saveRegistrationStatus(phoneNumber, miscMessage.VERIFIED);
        }
    }

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack, SDGenericStyles.paddingHorizontal25]}>
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

                <SDGenderRadioOptionView inputName={fieldControllerName.GENDER} control={control} rules={formRequiredRules.genderRule} formState={formState}
                    defaultValue={stringConstants.EMPTY} genderValue={genderValue} />

                <SDDropDownView inputName={fieldControllerName.PROFILE} control={control} rules={formRequiredRules.profileRule} selectedLabelStyle={SDGenericStyles.textColorWhite}
                    containerStyle={userAuthStyles.dropDownPickerStyle} dropDownPickerStyle={glancePostStyles.addPostDropDownStyle} placeHolderText={placeHolderText.SELECT_A_PROFILE}
                    defaultValue={stringConstants.EMPTY} formState={formState} list={profiles.filter(role => role.value != numericConstants.MINUS_ONE)}
                    dropDownDefaultValue={profiles.length && profiles.find(role => role.value == numericConstants.ZERO).value || defaultProfilesValue.value}
                    extraStyles={[SDGenericStyles.textBoxGray, SDGenericStyles.paddingVertical10]} globalTextStyle={[SDGenericStyles.fontFamilyRoman, SDGenericStyles.ft16, SDGenericStyles.textColorWhite]} />

            </Animated.ScrollView>

            <View style={userAuthStyles.registerationDetailsView}>
                <TouchableOpacity activeOpacity={.7} style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.backgroundColorYellow]} onPress={handleSubmit(onSubmit)}>
                    <Text style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.fontFamilyRoman]}>{actionButtonTextConstants.REGISTER}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}