import React from 'react';
import { Text, TouchableOpacity, View } from "react-native"
import { glancePostStyles, SDGenericStyles } from "../../styles/Styles"

export const SDGenderInput = props => {
    return (
        <View style={SDGenericStyles.paddingHorizontal20}>
            <TouchableOpacity activeOpacity={.7} onPress={() => props.setValue(props.inputName, props.value, { shouldValidate: true })}>
                <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.paddingHorizontal15, SDGenericStyles.width100, glancePostStyles.genderSelectionPanel,
                SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter]}>
                    <Text style={[SDGenericStyles.textLeftAlign, SDGenericStyles.ft12, SDGenericStyles.fontFamilyBold,
                    SDGenericStyles.colorWhite, SDGenericStyles.fontFamilyBold]}>
                        {props.text}
                    </Text>
                    {props.icon}
                </View>
            </TouchableOpacity>
        </View>
    )
}