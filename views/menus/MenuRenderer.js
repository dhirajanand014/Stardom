import React from 'react';
import { Text, View, TouchableNativeFeedback } from "react-native";
import { colors, SDGenericStyles, userAuthStyles } from '../../styles/Styles';

export const MenuRenderer = (item, index, navigation) => {
    return (
        <View key={index}>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(colors.SDOM_PLACEHOLDER, false)} useForeground={true}
                onPress={() => navigation.navigate(item.key)}>
                <View style={SDGenericStyles.rowFlexDirection}>
                    <View style={[SDGenericStyles.paddingHorizontal20, SDGenericStyles.paddingVertical10, SDGenericStyles.alignItemsStart]}>
                        <Text style={[SDGenericStyles.placeHolderTextColor, SDGenericStyles.fontFamilyRoman, SDGenericStyles.ft18]}>
                            {item.label}
                        </Text>
                    </View>
                    {
                        item.value &&
                        <View style={[userAuthStyles.menuRightCountView, SDGenericStyles.textBoxGray, SDGenericStyles.alignItemsEnd]}>
                            <Text style={[SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyBold, SDGenericStyles.ft16]}>
                                {item.value}
                            </Text>
                        </View>
                    }
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}