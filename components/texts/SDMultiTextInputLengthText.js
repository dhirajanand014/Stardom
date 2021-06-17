import React from 'react';
import { View, Text } from 'react-native'
import { numericConstants, stringConstants } from '../../constants/Constants';
import { SDGenericStyles } from '../../styles/Styles';

export const SDMultiTextInputLengthText = props => {
    return (
        <View style={[SDGenericStyles.alignSelfEnd, SDGenericStyles.paddingRight5]}>
            <Text style={[SDGenericStyles.ft12, SDGenericStyles.placeHolderTextColor, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textRightAlign]}>
                {
                    props.value && `${props.value.length}${stringConstants.SLASH}${props.maxLength}`
                    || `${numericConstants.ZERO}${stringConstants.SLASH}${props.maxLength}`
                }
            </Text>
        </View>
    )
}