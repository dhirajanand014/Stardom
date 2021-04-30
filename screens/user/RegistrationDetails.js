
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SDImageFormInput } from '../../views/fromInputView/SDImageFormInput';
import {
    fieldControllerName, formRequiredRules,
    stringConstants, numericConstants, keyBoardTypeConst,
    placeHolderText, actionButtonTextConstants,
    miscMessage, colorConstants
} from '../../constants/Constants';
import { SDGenericStyles, userAuthStyles } from '../../styles/Styles';
import { RegisterUserIcon } from '../../components/icons/RegisterUserIcon';
import { SDDatePickerView } from '../../views/datePickerView/SDDatePickerView';
import { SDGenderCardView } from '../../views/fromInputView/SDGenderCardView';
export const RegistrationDetails = () => {

    const { control, formState, setValue, register, watch } = useForm();
    const genderValue = watch(fieldControllerName.GENDER);

    useEffect(() => {
        register(formRequiredRules.genderRule);
    });


    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack, SDGenericStyles.paddingHorizontal25]}>
            <View style={[SDGenericStyles.justifyContentCenter, SDGenericStyles.paddingBottom20, SDGenericStyles.paddingTop40,
            SDGenericStyles.alignItemsCenter]}>
                <RegisterUserIcon width={numericConstants.ONE_HUNDRED} height={numericConstants.ONE_HUNDRED} stroke={colorConstants.WHITE} />
            </View>
            <ScrollView>
                <SDImageFormInput inputName={fieldControllerName.FULL_NAME} control={control} rules={formRequiredRules.nameFormRule}
                    defaultValue={stringConstants.EMPTY} placeHolderText={placeHolderText.FULL_NAME} autofocus={true}
                    keyboardType={keyBoardTypeConst.DEFAULT} textContentType={keyBoardTypeConst.NAME} formState={formState}
                    extraStyles={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRoman]} />

                <SDImageFormInput inputName={fieldControllerName.EMAIL} control={control} rules={formRequiredRules.emailRule}
                    defaultValue={stringConstants.EMPTY} placeHolderText={placeHolderText.EMAIL}
                    keyboardType={keyBoardTypeConst.EMAIL} textContentType={keyBoardTypeConst.EMAIL} formState={formState}
                    extraStyles={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRoman]} />

                <SDDatePickerView inputName={fieldControllerName.DOB} control={control} rules={formRequiredRules.datePickerFormRule} maximumDate={Date.now()}
                    defaultValue={stringConstants.EMPTY} formState={formState} mode={miscMessage.DATE} dateFormat={miscMessage.DOB_DATE_FORMAT}
                    display={keyBoardTypeConst.DEFAULT} placeHolderText={miscMessage.DOB} />

                {/* <SDDropDownView inputName={fieldControllerName.GENDER} control={control} rules={formRequiredRules.genderRule} containerStyle={glancePostStyles.addPostDropDownStyle}
                    defaultValue={stringConstants.EMPTY} formState={formState} list={genderList.filter(gender => gender.value != numericConstants.MINUS_ONE)}
                    dropDownDefaultValue={genderList.find(gender => gender.value == numericConstants.ZERO).value} placeHolderText={placeHolderText.SELECT_A_GENDER} /> */}

                <SDGenderCardView inputName={fieldControllerName.GENDER} formState={formState} genderValue={genderValue} setValue={setValue} />

            </ScrollView>

            <View style={userAuthStyles.registerationDetailsView}>
                <TouchableOpacity activeOpacity={.7} style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.backgroundColorYellow]}>
                    <Text style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.fontFamilyBold]}>{actionButtonTextConstants.REGISTER}</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}