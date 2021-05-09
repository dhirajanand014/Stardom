import React from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import Shimmer from "react-native-shimmer";
import { miscMessage, numericConstants } from "../../constants/Constants"
import { flatListItemStyles, SDGenericStyles } from "../../styles/Styles";

export const ProfileUserPosts = (item, index, profile, profileDetail, setProfileDetail, navigation) => {
    return (
        <TouchableOpacity activeOpacity={.7} style={flatListItemStyles.GridViewContainer}>
            {
                <View key={index} style={[flatListItemStyles.userProfileCardSurface, SDGenericStyles.padding12]}>
                    <FastImage source={{
                        uri: item.postImage,
                        priority: FastImage.priority.normal,
                        cache: FastImage.cacheControl.immutable
                    }} style={flatListItemStyles.imageBackGround}>
                        <View style={flatListItemStyles.textsView}>
                            <Shimmer direction={miscMessage.RIGHT} duration={numericConstants.FIVE_THOUSAND}>
                                <Text style={flatListItemStyles.textCategoryTitle}>{item.postTitle}</Text>
                            </Shimmer>
                        </View>
                    </FastImage>
                </View>
            }
        </TouchableOpacity>
    )
}