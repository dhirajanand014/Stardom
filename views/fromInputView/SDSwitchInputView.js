import React from 'react';
import { Switch, Text, View } from "react-native"
import { stringConstants } from '../../constants/Constants';
import { onChangeByValueType } from '../../helper/Helper';
import { SDGenericStyles } from "../../styles/Styles"

export const SDSwitchInputView = props => {
    return (
        <View style={[SDGenericStyles.justifyContentSpaceBetween, SDGenericStyles.rowFlexDirection, SDGenericStyles.paddingVertical10]}>
            <Text style={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.textColorWhite]}>
                {props.textValue}
            </Text>
            <Switch trackColor={{ false: props.falseColor, true: props.trueColor }} thumbColor={props.thumbColor} ios_backgroundColor={props.iosThumbColor}
                value={props.value} onValueChange={value => onChangeByValueType(stringConstants.EMPTY, value, props)} />
        </View>
    )
}