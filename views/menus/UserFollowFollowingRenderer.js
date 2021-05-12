import React from 'react';
import { Text, TouchableOpacity, View } from "react-native"
import FastImage from 'react-native-fast-image';
import { actionButtonTextConstants } from '../../constants/Constants';
import { glancePostStyles, SDGenericStyles, userMenuStyles } from '../../styles/Styles';

export const UserFollowFollowingRenderer = (item, index, actionCallBack) => {
    return (
        <View key={`1_${index}`} style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.padding20, SDGenericStyles.marginBottom15, SDGenericStyles.textBoxGray,
        SDGenericStyles.borderRadius5, glancePostStyles.userFollowerFollowingList]}>
            <FastImage source={{
                uri: item.profile_picture, priority: FastImage.priority.normal, cache: FastImage.cacheControl.immutable
            }} style={[userMenuStyles.followerFollowingImageStyle, SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter,
            SDGenericStyles.marginRight15]}>
            </FastImage>
            <View style={[SDGenericStyles.fill, SDGenericStyles.justifyItemsStart]}>
                <Text style={[SDGenericStyles.ft20, SDGenericStyles.placeHolderTextColor, SDGenericStyles.fontFamilyBold,
                SDGenericStyles.paddingBottom5]}>{item.name}</Text>
                <Text style={[SDGenericStyles.ft14, SDGenericStyles.placeHolderTextColor, SDGenericStyles.fontFamilyRoman]}>{item.user_id}</Text>
            </View>
            <View style={SDGenericStyles.justifyItemsEnd}>
                <View style={SDGenericStyles.paddingBottom10}>
                    <TouchableOpacity style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.backGroundColorGreen, SDGenericStyles.paddingVertical5,
                    SDGenericStyles.paddingHorizontal10, SDGenericStyles.borderRadius5]} activeOpacity={.7}
                        onPress={async () => await actionCallBack(item.id, actionButtonTextConstants.APPROVE)}>
                        <Text style={[SDGenericStyles.ft14, SDGenericStyles.fontFamilyRoman, SDGenericStyles.textColorWhite]}>
                            {actionButtonTextConstants.APPROVE}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.backgroundColorYellow, SDGenericStyles.paddingVertical5,
                    SDGenericStyles.paddingHorizontal10, SDGenericStyles.borderRadius5, SDGenericStyles.marginBottom10]} activeOpacity={.7}
                        onPress={async () => await actionCallBack(item.id, actionButtonTextConstants.REJECT)}>
                        <Text style={[SDGenericStyles.ft14, SDGenericStyles.fontFamilyRoman, SDGenericStyles.textColorWhite]}>
                            {actionButtonTextConstants.REJECT}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>)
}