import React from 'react';
import { Text, View, TouchableNativeFeedback, Image } from "react-native";
import { fieldControllerName, miscMessage, screens } from '../../constants/Constants';
import { colors, SDGenericStyles, userAuthStyles } from '../../styles/Styles';

export const MenuRenderer = React.memo(({ item, index, profileMenu, handleMenuClickAction, animatedStyle }) => {
    return (
        <View key={index}>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(colors.WHITE, false)} useForeground={true}
                onPress={async () => await handleMenuClickAction(item)}>
                <View key={`1-${index}`} style={SDGenericStyles.rowFlexDirection}>
                    <View style={[SDGenericStyles.paddingStart10, SDGenericStyles.justifyContentCenter, SDGenericStyles.alignItemsCenter]}>
                        <Image style={SDGenericStyles.menuIconStyle} source={item.icon} />
                    </View>
                    {
                        item.label &&
                        <View style={[SDGenericStyles.paddingHorizontal20, SDGenericStyles.paddingVertical10, SDGenericStyles.alignItemsStart]}>
                            <Text style={[SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.ft16]}>
                                {item.label.toUpperCase()}
                            </Text>
                        </View>
                    }
                    <View style={[userAuthStyles.menuRightImageIconView, SDGenericStyles.justifyContentCenter, SDGenericStyles.alignItemsCenter]}>
                        <Image style={SDGenericStyles.menuIconStyle} source={item.actionIcon} />
                    </View>
                    {
                        item.key == screens.USER_FOLLOWERS_FOLLOWING &&
                        <View style={[item.label != fieldControllerName.SEARCH_USERS && userAuthStyles.menuRightCountView, SDGenericStyles.alignItemsCenter,
                        SDGenericStyles.justifyContentCenter]}>
                            {
                                item.label == miscMessage.FOLLOWERS_TEXT &&
                                <Text style={[SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.ft16]}>
                                    {profileMenu.followingCount}
                                </Text> || item.label == miscMessage.FOLLOWING_TEXT &&
                                <Text style={[SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.ft16]}>
                                    {profileMenu.followersCount}
                                </Text> || item.label == miscMessage.PRIVATE_REQUEST_ACCESS &&
                                <Text style={[SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.ft16]}>
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