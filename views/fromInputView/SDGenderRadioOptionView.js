import React from 'react';
import { Text, View } from "react-native"
import { SDRadioOption } from "../../components/card/SDRadioOption"
import { fieldControllerName, miscMessage, placeHolderText } from "../../constants/Constants"
import { SDGenericStyles, userAuthStyles } from "../../styles/Styles"

export const SDGenderRadioOptionView = props => {
    return (
        <View style={SDGenericStyles.paddingTop5}>
            <Text style={[SDGenericStyles.fontFamilyBold, SDGenericStyles.placeHolderTextColor, SDGenericStyles.paddingHorizontal5, SDGenericStyles.ft18]}>
                {placeHolderText.SELECT_GENDER}
            </Text>
            <View style={[SDGenericStyles.mv15]}>
                <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.paddingHorizontal5, SDGenericStyles.paddingTop5, SDGenericStyles.paddingBottom5]}>
                    <SDRadioOption {...props} value={fieldControllerName.GENDER_MALE} text={miscMessage.MALE_TEXT} />
                    <SDRadioOption {...props} value={fieldControllerName.GENDER_FEMALE} text={miscMessage.FEMALE_TEXT} />
                    <SDRadioOption {...props} value={fieldControllerName.RATHER_NOT_SAY} text={miscMessage.RATHER_NOT_SAY_TEXT} />
                </View>
                <Text style={[userAuthStyles.formInputError, SDGenericStyles.fontFamilyBold]}>{props.formState.errors[props.inputName]?.message}</Text>
            </View>
        </View>
    )
}