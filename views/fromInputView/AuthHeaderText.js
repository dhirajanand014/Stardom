import React from 'react';
import { Text, View } from "react-native"
import { SDGenericStyles } from "../../styles/Styles"

export const AuthHeaderText = props => {
    return (
        <View style={[SDGenericStyles.justifyContentCenter, props.isFrom && SDGenericStyles.paddingTop80,
        SDGenericStyles.paddingBottom30, SDGenericStyles.alignItemsCenter]}>
            <Text style={[SDGenericStyles.ft24, SDGenericStyles.placeHolderTextColor, SDGenericStyles.fontFamilyRobotoMedium,
            SDGenericStyles.paddingBottom5]}>
                {props.titleTextHeader}
            </Text>
            <Text style={[SDGenericStyles.ft20, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium]}>
                {props.titleText}
            </Text>
        </View>
    )
}