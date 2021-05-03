import React from 'react';
import { Text, View, TouchableNativeFeedback } from "react-native";
import { colors, SDGenericStyles, userAuthStyles } from '../../styles/Styles';

export const MenuRenderer = props => {
    return (
        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(colors.SDOM_PLACEHOLDER, false)} useForeground={true}>
            <View style={SDGenericStyles.rowFlexDirection}>
                <View style={[SDGenericStyles.paddingHorizontal20, SDGenericStyles.paddingVertical14, SDGenericStyles.alignItemsStart]}>
                    <Text style={[SDGenericStyles.placeHolderTextColor, SDGenericStyles.fontFamilyRoman, SDGenericStyles.ft18]}>
                        {props.label}
                    </Text>
                </View>
                {props.value &&
                    <View style={[userAuthStyles.menuRightCountView, SDGenericStyles.backgroundColorYellow, SDGenericStyles.alignItemsEnd]}>
                        <Text style={[SDGenericStyles.colorBlack, SDGenericStyles.fontFamilyBold, SDGenericStyles.ft18]}>
                            {props.value}
                        </Text>
                    </View>
                }
            </View>
        </TouchableNativeFeedback>
    )
}