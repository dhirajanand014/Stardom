import React from 'react';
import { View, Text } from 'react-native'
import { numericConstants, stringConstants } from '../../constants/Constants';
import { SDGenericStyles } from '../../styles/Styles';

export const SDMultiTextInputLengthText = props => {
    return (
        <View style={[SDGenericStyles.alignSelfEnd, SDGenericStyles.paddingRight10]}>
            <Text style={[SDGenericStyles.ft12, SDGenericStyles.placeHolderTextColor, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textRightAlign,
            SDGenericStyles.paddingRight15]}>
                {
                    props.value && `${props.value.length}${stringConstants.SLASH}${props.maxLength}`
                    || `${numericConstants.ZERO}${stringConstants.SLASH}${props.maxLength}`
                }
            </Text>
        </View>
    )
}