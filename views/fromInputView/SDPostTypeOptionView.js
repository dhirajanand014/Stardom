import React from 'react';
import { Text, View } from "react-native"
import { SDRadioOption } from "../../components/card/SDRadioOption"
import { fieldControllerName, miscMessage, placeHolderText } from "../../constants/Constants"
import { SDGenericStyles, userAuthStyles } from "../../styles/Styles"

export const SDPostTypeOptionsView = props => {
    return (
        <View style={[SDGenericStyles.paddingTop20, SDGenericStyles.paddingHorizontal20, SDGenericStyles.alignSelfStart]}>
            <Text style={[SDGenericStyles.fontFamilyBold, SDGenericStyles.placeHolderTextColor, SDGenericStyles.paddingHorizontal5, SDGenericStyles.ft18]}>
                {placeHolderText.SELECT_POST_TYPE}
            </Text>
            <View style={[SDGenericStyles.mv15]}>
                <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.paddingHorizontal5, SDGenericStyles.paddingTop10, SDGenericStyles.paddingBottom5]}>
                    <SDRadioOption {...props} value={fieldControllerName.POST_TYPE_PRIVATE} text={miscMessage.POST_TYPE_PRIVATE_TEXT} />
                    <SDRadioOption {...props} value={fieldControllerName.POST_TYPE_PUBLIC} text={miscMessage.POST_TYPE_PUBLIC_TEXT} />
                </View>
                <Text style={[userAuthStyles.formInputError, SDGenericStyles.fontFamilyBold]}>{props.formState.errors[props.inputName]?.message}</Text>
            </View>
        </View>
    )
}