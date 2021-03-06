import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View, Image } from "react-native";
import FastImage from "react-native-fast-image";
import Shimmer from "react-native-shimmer";
import { fieldControllerName, height, keyChainConstansts, miscMessage, numericConstants, screens, width } from "../../constants/Constants"
import { saveDetailsToKeyChain } from '../../helper/Helper';
import { flatListItemStyles, SDGenericStyles } from "../../styles/Styles";

export const ProfileUserPosts = React.memo(({ item, index, hasPrivateAccess, isSameUser, navigation }) => {

    const allowPrivate = hasPrivateAccess && item.postType == fieldControllerName.POST_TYPE_PRIVATE;
    return (
        <View key={index}>
            <TouchableOpacity activeOpacity={.7} onPress={async () => {
                if (item.postType == fieldControllerName.POST_TYPE_PUBLIC) {
                    await saveDetailsToKeyChain(keyChainConstansts.POST_ID_KEY, keyChainConstansts.POST_ID, JSON.stringify(item));
                    navigation.navigate(screens.VIEW_USER_POSTS, { userId: item.user.id });
                }
            }}>
                <View key={index} style={[{
                    height: height / numericConstants.FOUR, width: width / numericConstants.THREE
                }, flatListItemStyles.userProfileCardSurface]}>
                    {
                        (allowPrivate || item.postType == fieldControllerName.POST_TYPE_PUBLIC) &&
                        (
                            <FastImage source={{
                                uri: item.postImage, priority: FastImage.priority.normal, cache: FastImage.cacheControl.immutable
                            }}
                                style={flatListItemStyles.imageBackGround}>
                                <View style={flatListItemStyles.textsViewUserPosts}>
                                    <Shimmer direction={miscMessage.RIGHT} duration={numericConstants.FIVE_THOUSAND}>
                                        <Text style={[SDGenericStyles.ft14, SDGenericStyles.fontFamilyRobotoRegular,
                                        SDGenericStyles.colorWhite]}>
                                            {item.postTitle}
                                        </Text>
                                    </Shimmer>
                                </View>
                            </FastImage>
                        )
                        || (!allowPrivate && item.postType == fieldControllerName.POST_TYPE_PRIVATE) &&
                        (
                            <ImageBackground resizeMode={FastImage.resizeMode.cover} source={{ uri: item.postImage }}
                                style={flatListItemStyles.imageBackGround} blurRadius={hasPrivateAccess && numericConstants.ZERO ||
                                    numericConstants.TEN}>
                                {
                                    !hasPrivateAccess &&
                                    <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorGray, SDGenericStyles.paddingTop30, SDGenericStyles.opacitypt6]}>
                                        <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter]}>
                                            {
                                                !isSameUser &&
                                                <Shimmer direction={miscMessage.RIGHT} duration={numericConstants.FIVE_THOUSAND}>
                                                    <Image style={[SDGenericStyles.privateLockUnlockIconStyle, SDGenericStyles.tintColorWhite]}
                                                        source={require(`../../assets/locked_icon.png`)} />
                                                </Shimmer>
                                            }
                                        </View>
                                        <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter, SDGenericStyles.paddingHorizontal10]}>
                                            <Shimmer direction={miscMessage.RIGHT} duration={numericConstants.FIVE_THOUSAND}>
                                                {
                                                    !isSameUser &&
                                                    <Text style={[SDGenericStyles.ft14, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoRegular,
                                                    SDGenericStyles.textCenterAlign, SDGenericStyles.paddingTop10]}>
                                                        {miscMessage.REQUEST_FOR_PRIVATE_ACCESS}
                                                    </Text> || <Text style={[SDGenericStyles.ft14, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoRegular,
                                                    SDGenericStyles.textCenterAlign, !isSameUser && SDGenericStyles.paddingTop20 || SDGenericStyles.paddingTop50]}>
                                                        {miscMessage.PRIVATE_POST}
                                                    </Text>
                                                }
                                            </Shimmer>
                                        </View>
                                    </View>
                                }
                            </ImageBackground>
                        )
                    }
                </View>
            </TouchableOpacity>
        </View >
    )
})