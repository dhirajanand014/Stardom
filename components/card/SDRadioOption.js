import React from 'react';
import { Text, TouchableOpacity, View } from "react-native"
import { fieldControllerName } from '../../constants/Constants';
import { glancePostStyles, SDGenericStyles } from "../../styles/Styles"

export const SDRadioOption = props => {
    return (
        <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.paddingHorizontal7]}>
            <TouchableOpacity activeOpacity={.7} style={glancePostStyles.genderRadioCircle} onPress={() =>
                props.setValue(fieldControllerName.GENDER, props.value)}>
                {
                    props.genderValue && (props.genderValue == props.value) &&
                    <View style={glancePostStyles.genderSelectedRb} />
                }
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.7} onPress={() => props.setValue(fieldControllerName.GENDER, props.value)}>
                <Text style={[SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyBold,
                SDGenericStyles.alignItemsCenter, SDGenericStyles.paddingVertical2]}>
                    {props.text}
                </Text>
            </TouchableOpacity>
        </View >
    )
}