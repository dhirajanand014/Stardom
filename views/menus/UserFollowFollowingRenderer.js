import React from 'react';
import { Text, View } from "react-native"
import FastImage from 'react-native-fast-image';
import { glancePostStyles, SDGenericStyles, userMenuStyles } from '../../styles/Styles';

export const UserFollowFollowingRenderer = (item, index) => {
    return (
        <View key={index} style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.padding20, SDGenericStyles.marginBottom15, SDGenericStyles.textBoxGray,
        SDGenericStyles.borderRadius5, glancePostStyles.userFollowerFollowingList]}>
            <FastImage source={{
                uri: item.profile_picture, priority: FastImage.priority.normal, cache: FastImage.cacheControl.immutable
            }} style={[userMenuStyles.followerFollowingImageStyle, SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter,
            SDGenericStyles.marginRight15]}>
            </FastImage>
            <View>
                <Text style={[SDGenericStyles.ft20, SDGenericStyles.placeHolderTextColor, SDGenericStyles.fontFamilyBold,
                SDGenericStyles.paddingBottom5]}>{item.name}</Text>
                <Text style={[SDGenericStyles.ft16, SDGenericStyles.placeHolderTextColor, SDGenericStyles.fontFamilyRoman]}>{item.user_id}</Text>
            </View>
        </View>
    )
}