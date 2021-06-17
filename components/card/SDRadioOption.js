import React from 'react';
import { Controller } from 'react-hook-form';
import { Text, TouchableOpacity, View } from "react-native"
import { onChangeByValueType } from '../../helper/Helper';
import { glancePostStyles, SDGenericStyles } from "../../styles/Styles"

export const SDRadioOption = props => {
    return (
        <Controller name={props.inputName} control={props.control} defaultValue={props.defaultValue} rules={props.rules}
            render={inputProps => {
                return (
                    <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.paddingHorizontal7]}>
                        <TouchableOpacity activeOpacity={.7} style={glancePostStyles.radioCircle}
                            onPress={() => onChangeByValueType(inputProps, props.value, props)}>
                            {
                                props.checkValue && (props.checkValue == props.value) &&
                                <View style={glancePostStyles.selectedRb} /> || <View />
                            }
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.7} onPress={() => onChangeByValueType(inputProps, props.value, props)}>
                            <Text style={[SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.alignItemsCenter,
                            SDGenericStyles.paddingVertical2]}>
                                {props.text}
                            </Text>
                        </TouchableOpacity>
                    </View >
                )
            }} />
    )
}