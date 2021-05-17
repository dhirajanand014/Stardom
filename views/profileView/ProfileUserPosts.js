import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import Shimmer from "react-native-shimmer";
import { LockIcon } from '../../components/icons/LockIcon';
import { fieldControllerName, miscMessage, numericConstants } from "../../constants/Constants"
import { flatListItemStyles, SDGenericStyles, colors } from "../../styles/Styles";

export const ProfileUserPosts = (item, index, hasPrivateAccess) => {
    return (
        <TouchableOpacity activeOpacity={.7} style={flatListItemStyles.GridViewContainer}>
            <View key={index} style={[flatListItemStyles.userProfileCardSurface, SDGenericStyles.padding20]}>
                {
                    item.postType == fieldControllerName.POST_TYPE_PUBLIC &&
                    (
                        <FastImage source={{
                            uri: item.postImage, priority: FastImage.priority.normal, cache: FastImage.cacheControl.immutable
                        }} style={flatListItemStyles.imageBackGround}>
                            <View style={flatListItemStyles.textsView}>
                                <Shimmer direction={miscMessage.RIGHT} duration={numericConstants.FIVE_THOUSAND}>
                                    <Text style={flatListItemStyles.textCategoryTitle}>{item.postTitle}</Text>
                                </Shimmer>
                            </View>
                        </FastImage>
                    )
                    ||
                    item.postType == fieldControllerName.POST_TYPE_PRIVATE &&
                    (
                        <ImageBackground resizeMode={FastImage.resizeMode.cover} source={{ uri: item.postImage }}
                            style={flatListItemStyles.imageBackGround} blurRadius={numericConstants.TEN}>
                            {
                                !hasPrivateAccess &&
                                <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorGray, SDGenericStyles.paddingTop10, SDGenericStyles.opacitypt6]}>
                                    <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter]}>
                                        <Shimmer direction={miscMessage.RIGHT} duration={numericConstants.FIVE_THOUSAND}>
                                            <LockIcon width={numericConstants.THIRTY} height={numericConstants.THIRTY} stroke={colors.WHITE} />
                                        </Shimmer>
                                    </View>
                                    <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter, SDGenericStyles.paddingHorizontal10]}>
                                        <Shimmer direction={miscMessage.RIGHT} duration={numericConstants.FIVE_THOUSAND}>
                                            <Text style={[SDGenericStyles.ft14, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRoman,
                                            SDGenericStyles.textCenterAlign, SDGenericStyles.paddingTop10]}>
                                                {miscMessage.REQUEST_FOR_PRIVATE_ACCESS}
                                            </Text>
                                        </Shimmer>
                                    </View>
                                </View>
                            }
                        </ImageBackground>
                    )
                }
            </View>
        </TouchableOpacity>
    )
}