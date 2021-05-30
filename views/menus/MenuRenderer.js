import React from 'react';
import { Text, View, TouchableNativeFeedback } from "react-native";
import { fieldControllerName, miscMessage, screens } from '../../constants/Constants';
import { colors, SDGenericStyles, userAuthStyles } from '../../styles/Styles';

export const MenuRenderer = React.memo(({ item, index, profileMenu, handleMenuClickAction }) => {
    return (
        <View key={index}>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(colors.SDOM_PLACEHOLDER, false)} useForeground={true}
                onPress={async () => await handleMenuClickAction(item)}>
                <View style={SDGenericStyles.rowFlexDirection}>
                    <View style={[SDGenericStyles.paddingHorizontal20, SDGenericStyles.paddingVertical10, SDGenericStyles.alignItemsStart]}>
                        <Text style={[SDGenericStyles.placeHolderTextColor, SDGenericStyles.fontFamilyRoman, SDGenericStyles.ft18]}>
                            {item.label}
                        </Text>
                    </View>
                    {
                        item.key == screens.USER_FOLLOWERS_FOLLOWING &&
                        <View style={[item.label != fieldControllerName.SEARCH_USERS && userAuthStyles.menuRightCountView, SDGenericStyles.textBoxGray,
                        SDGenericStyles.alignItemsEnd]}>
                            {
                                item.label == miscMessage.FOLLOWERS_TEXT &&
                                <Text style={[SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyBold, SDGenericStyles.ft16]}>
                                    {profileMenu.followingCount}
                                </Text> || item.label == miscMessage.FOLLOWING_TEXT &&
                                <Text style={[SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyBold, SDGenericStyles.ft16]}>
                                    {profileMenu.followersCount}
                                </Text> || item.label == miscMessage.PRIVATE_REQUEST_ACCESS &&
                                <Text style={[SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyBold, SDGenericStyles.ft16]}>
                                    {profileMenu.privateRequestCount}
                                </Text>
                            }
                        </View>
                    }
                </View>
            </TouchableNativeFeedback>
        </View>
    )
});