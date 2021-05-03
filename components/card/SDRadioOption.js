import React from 'react';
import { Controller } from 'react-hook-form';
import { Text, TouchableOpacity, View } from "react-native"
import { fieldControllerName } from '../../constants/Constants';
import { onChangeByValueType } from '../../helper/Helper';
import { glancePostStyles, SDGenericStyles } from "../../styles/Styles"

export const SDRadioOption = props => {
    return (
        <Controller name={props.inputName} control={props.control} defaultValue={props.defaultValue} rules={props.rules}
            render={inputProps => {
                return (
                    <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.paddingHorizontal7]}>
                        <TouchableOpacity activeOpacity={.7} style={glancePostStyles.genderRadioCircle}
                            onPress={() => onChangeByValueType(inputProps, props.value, props)}>
                            {
                                props.genderValue && (props.genderValue == props.value) &&
                                <View style={glancePostStyles.genderSelectedRb} /> || <View />
                            }
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.7} onPress={() => onChangeByValueType(inputProps, props.value, props)}>
                            <Text style={[SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyBold, SDGenericStyles.alignItemsCenter,
                            SDGenericStyles.paddingVertical2]}>
                                {props.text}
                            </Text>
                        </TouchableOpacity>
                    </View >
                )
            }} />
    )
}