import React from 'react';
import { Text, View } from "react-native"
import { SDRadioOption } from "../../components/card/SDRadioOption"
import { errorMessages, fieldControllerName, miscMessage } from "../../constants/Constants"
import { SDGenericStyles, userAuthStyles } from "../../styles/Styles"

export const SDPostTypeOptionsView = props => {
    return (
        <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.paddingHorizontal25]}>
            <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.paddingHorizontal5, SDGenericStyles.mb5]}>
                <SDRadioOption {...props} value={fieldControllerName.POST_TYPE_PRIVATE} text={miscMessage.POST_TYPE_PRIVATE_TEXT} />
                <SDRadioOption {...props} value={fieldControllerName.POST_TYPE_PUBLIC} text={miscMessage.POST_TYPE_PUBLIC_TEXT} />
            </View>
            <Text style={[SDGenericStyles.ft13, userAuthStyles.formInputError, SDGenericStyles.fontFamilyRobotoMedium]}>{
                props.checkValue == fieldControllerName.POST_TYPE_PRIVATE && errorMessages.PRIVATE_IMAGE_NOT_APPEAR_ON_PUBLIC_FEED
                || props.formState.errors[props.inputName]?.message
            }</Text>
        </View>
    )
}