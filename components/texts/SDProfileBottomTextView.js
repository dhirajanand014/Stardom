import React from 'react';
import { View, Text } from 'react-native';
import { SDGenericStyles } from '../../styles/Styles';
export const SDProfileBottomTextView = props => {
    return (
        <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.paddingLeft5, SDGenericStyles.paddingRight5,
        SDGenericStyles.paddingTop10]}>
            <Text style={[SDGenericStyles.textCenterAlign, SDGenericStyles.textCenterAlign, SDGenericStyles.justifyContentCenter,
            SDGenericStyles.fontFamilyBold, SDGenericStyles.ft25]}>
                {props.count}
            </Text>
            <Text style={[SDGenericStyles.centerAlignedText, SDGenericStyles.textCenterAlign, SDGenericStyles.justifyContentCenter,
            SDGenericStyles.fontFamilyRoman, SDGenericStyles.ft12]}>
                {props.label}
            </Text>
        </View>
    )
}