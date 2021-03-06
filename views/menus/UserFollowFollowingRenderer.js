import React from 'react';
import { Text, TouchableOpacity, View } from "react-native"
import FastImage from 'react-native-fast-image';
import Animated from 'react-native-reanimated';
import { actionButtonTextConstants, miscMessage, screens, stringConstants } from '../../constants/Constants';
import { SDGenericStyles, userMenuStyles } from '../../styles/Styles';

export const UserFollowFollowingRenderer = (props) => {
    return (
        <TouchableOpacity activeOpacity={.7} onPress={() => props.isSearchUser && props.actionCallBack(screens.USERS_TAB, props.index, props.item) ||
            props.viewFollowerFollowingProfile(props.item)}>
            <Animated.View key={`1_${props.index}`} style={[props.animationStyle, SDGenericStyles.rowFlexDirection, SDGenericStyles.paddingVertical12,
            SDGenericStyles.marginBottom15, SDGenericStyles.borderRadius5]}>
                <FastImage source={{
                    uri: props.item.profile_picture, priority: FastImage.priority.normal, cache: FastImage.cacheControl.immutable
                }} style={[userMenuStyles.followerFollowingImageStyle, SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter,
                SDGenericStyles.marginRight15]}>
                </FastImage>
                <View style={[SDGenericStyles.fill, SDGenericStyles.justifyItemsStart]}>
                    <Text style={[SDGenericStyles.ft20, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium]}>{props.item.name}</Text>
                    <Text style={[SDGenericStyles.ft14, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.paddingBottom3]}>{props.item.user_id}</Text>
                    <Text style={[SDGenericStyles.ft12, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium]}>{props.item.profiles && props.item.profiles.profile_name
                        || stringConstants.EMPTY}</Text>
                </View>
                {
                    props.listFor == miscMessage.PRIVATE_REQUEST_ACCESS &&
                    <View style={SDGenericStyles.justifyItemsEnd}>
                        <View style={SDGenericStyles.paddingBottom10}>
                            <TouchableOpacity style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.backGroundColorGreen, SDGenericStyles.paddingVertical5,
                            SDGenericStyles.paddingHorizontal10, SDGenericStyles.borderRadius5, SDGenericStyles.elevation8]} activeOpacity={.7}
                                onPress={async () => await props.actionCallBack(props.item.id, props.index, actionButtonTextConstants.APPROVE)}>
                                <Text style={[SDGenericStyles.ft14, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.textBlackColor, SDGenericStyles.textCenterAlign]}>
                                    {actionButtonTextConstants.APPROVE}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.backGroundColorRed, SDGenericStyles.paddingVertical5,
                            SDGenericStyles.paddingHorizontal10, SDGenericStyles.borderRadius5, SDGenericStyles.marginBottom10, , SDGenericStyles.elevation8]}
                                activeOpacity={.7} onPress={async () => await props.actionCallBack(props.item.id, props.index, actionButtonTextConstants.REJECT)}>
                                <Text style={[SDGenericStyles.ft14, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.textColorWhite, SDGenericStyles.textCenterAlign]}>
                                    {actionButtonTextConstants.REJECT}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                {
                    props.listFor == miscMessage.FOLLOWERS_TEXT &&
                    <View style={SDGenericStyles.justifyContentCenter}>
                        <TouchableOpacity style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.backGroundColorRed, SDGenericStyles.justifyContentCenter,
                        SDGenericStyles.paddingHorizontal10, SDGenericStyles.paddingVertical5, SDGenericStyles.borderRadius5, SDGenericStyles.elevation8]}
                            activeOpacity={.7} onPress={async () => await props.actionCallBack(props.item.id, props.index, actionButtonTextConstants.REMOVE)}>
                            <Text style={[SDGenericStyles.ft14, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textColorWhite, SDGenericStyles.textCenterAlign]}>
                                {actionButtonTextConstants.REMOVE}
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
            </Animated.View>
        </TouchableOpacity>
    )
}