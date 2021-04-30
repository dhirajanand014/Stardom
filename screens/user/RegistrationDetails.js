
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SDImageFormInput } from '../../views/fromInputView/SDImageFormInput';
import {
    fieldControllerName, formRequiredRules, stringConstants, keyBoardTypeConst,
    placeHolderText, actionButtonTextConstants, miscMessage, numericConstants, modalTextConstants,
} from '../../constants/Constants';
import { SDGenericStyles, userAuthStyles, colors } from '../../styles/Styles';
import { SDDatePickerView } from '../../views/datePickerView/SDDatePickerView';
import { SDGenderRadioOptionView } from '../../views/fromInputView/SDGenderRadioOptionView';
import { AuthHeaderText } from '../../views/fromInputView/AuthHeaderText';
import { CalenderIcon } from '../../components/icons/CalenderIcon';
import { RegisterUserIcon } from '../../components/icons/RegisterUserIcon';
export const RegistrationDetails = () => {

    const { control, formState, setValue, register, watch } = useForm();
    const genderValue = watch(fieldControllerName.GENDER);

    useEffect(() => {
        register(formRequiredRules.genderRule);
    });

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack, SDGenericStyles.paddingHorizontal25]}>
            <AuthHeaderText titleText={modalTextConstants.ACCOUNT_DETAILS} />
            <ScrollView>
                <SDImageFormInput inputName={fieldControllerName.FULL_NAME} control={control} rules={formRequiredRules.nameFormRule}
                    defaultValue={stringConstants.EMPTY} placeHolderText={placeHolderText.FULL_NAME} autofocus={true}
                    keyboardType={keyBoardTypeConst.DEFAULT} textContentType={keyBoardTypeConst.NAME} formState={formState}
                    extraStyles={[SDGenericStyles.ft16, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRoman]}
                    icon={<RegisterUserIcon width={numericConstants.EIGHTEEN} height={numericConstants.EIGHTEEN}
                        stroke={formState.errors[fieldControllerName.USER_ID]?.message && colors.RED || colors.SDOM_PLACEHOLDER} />} />

                <SDImageFormInput inputName={fieldControllerName.EMAIL} control={control} rules={formRequiredRules.emailRule}
                    defaultValue={stringConstants.EMPTY} placeHolderText={placeHolderText.EMAIL}
                    keyboardType={keyBoardTypeConst.EMAIL} textContentType={keyBoardTypeConst.DEFAULT} formState={formState}
                    extraStyles={[SDGenericStyles.ft16, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRoman]}
                    icon={<RegisterUserIcon width={numericConstants.EIGHTEEN} height={numericConstants.EIGHTEEN}
                        stroke={formState.errors[fieldControllerName.USER_ID]?.message && colors.RED || colors.SDOM_PLACEHOLDER} />} />

                <SDDatePickerView inputName={fieldControllerName.DOB} control={control} rules={formRequiredRules.datePickerFormRule} maximumDate={Date.now()}
                    defaultValue={stringConstants.EMPTY} formState={formState} mode={miscMessage.DATE} dateFormat={miscMessage.DOB_DATE_FORMAT}
                    display={keyBoardTypeConst.DEFAULT} placeHolderText={placeHolderText.DOB} icon={<CalenderIcon width={numericConstants.EIGHTEEN}
                        height={numericConstants.EIGHTEEN} stroke={formState.errors[fieldControllerName.USER_ID]?.message && colors.RED || colors.SDOM_PLACEHOLDER} />} />

                {/* <SDDropDownView inputName={fieldControllerName.GENDER} control={control} rules={formRequiredRules.genderRule} containerStyle={glancePostStyles.addPostDropDownStyle}
                    defaultValue={stringConstants.EMPTY} formState={formState} list={genderList.filter(gender => gender.value != numericConstants.MINUS_ONE)}
                    dropDownDefaultValue={genderList.find(gender => gender.value == numericConstants.ZERO).value} placeHolderText={placeHolderText.SELECT_A_GENDER} /> */}

                <SDGenderRadioOptionView genderValue={genderValue} setValue={setValue} />

                <SDCategoryList />

            </ScrollView>

            <View style={userAuthStyles.registerationDetailsView}>
                <TouchableOpacity activeOpacity={.7} style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.backgroundColorYellow]}>
                    <Text style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.fontFamilyBold]}>{actionButtonTextConstants.REGISTER}</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}