import React from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import Shimmer from "react-native-shimmer";
import { LockIcon } from '../../components/icons/LockIcon';
import { fieldControllerName, miscMessage, numericConstants } from "../../constants/Constants"
import { flatListItemStyles, SDGenericStyles, colors } from "../../styles/Styles";

export const ProfileUserPosts = (item, index, profile, profileDetail, setProfileDetail, navigation) => {
    return (
        <TouchableOpacity activeOpacity={.7} style={flatListItemStyles.GridViewContainer}>
            <View key={index} style={[flatListItemStyles.userProfileCardSurface, SDGenericStyles.padding10]}>
                {
                    item.postType == fieldControllerName.POST_TYPE_PUBLIC &&
                    <FastImage source={{
                        uri: item.postImage, priority: FastImage.priority.normal, ache: FastImage.cacheControl.immutable
                    }} style={flatListItemStyles.imageBackGround}>
                        <View style={flatListItemStyles.textsView}>
                            <Shimmer direction={miscMessage.RIGHT} duration={numericConstants.FIVE_THOUSAND}>
                                <Text style={flatListItemStyles.textCategoryTitle}>{item.postTitle}</Text>
                            </Shimmer>
                        </View>
                    </FastImage> ||
                    item.postType == fieldControllerName.POST_TYPE_PRIVATE &&
                    (
                        <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorGray]}>
                            <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter,
                            SDGenericStyles.paddingVertical10]}>
                                <Shimmer direction={miscMessage.RIGHT} duration={numericConstants.FIVE_THOUSAND}>
                                    <LockIcon width={numericConstants.FIFTY} height={numericConstants.FIFTY} stroke={colors.WHITE} />
                                </Shimmer>
                            </View>
                            <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter, SDGenericStyles.paddingHorizontal10]}>
                                <Shimmer direction={miscMessage.RIGHT} duration={numericConstants.FIVE_THOUSAND}>
                                    <Text style={[SDGenericStyles.ft16, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyBold,
                                    SDGenericStyles.textCenterAlign]}>
                                        {miscMessage.REQUEST_FOR_PRIVATE_ACCESS}
                                    </Text>
                                </Shimmer>
                            </View>
                        </View>
                    )
                }
            </View>
        </TouchableOpacity>
    )
}