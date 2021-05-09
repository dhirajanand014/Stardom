import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from "react-native"
import FastImage from 'react-native-fast-image';
import Animated from 'react-native-reanimated';
import { useEffect } from 'react/cjs/react.development';
import { CategoryContext } from '../../App';
import { LockIcon } from '../../components/icons/LockIcon';
import { SDProfileBottomTextView } from '../../components/texts/SDProfileBottomTextView';
import {
    actionButtonTextConstants, height,
    jsonConstants, miscMessage, numericConstants, screens, width
} from '../../constants/Constants';
import { checkLoggedInUserMappedWithUserProfile, fetchUpdateLoggedInUserProfile, handleUserPostAction } from '../../helper/Helper';
import { colors, glancePostStyles, SDGenericStyles } from "../../styles/Styles"

export const Profile = () => {
    const navigation = useNavigation();

    const route = useRoute();
    const profile = route.params?.profile;

    const { sdomDatastate, setSdomDatastate, loggedInUser, setLoggedInUser,
        profileDetail, setProfileDetail } = useContext(CategoryContext);

    useEffect(() => {
        (async () => {
            await fetchUpdateLoggedInUserProfile(loggedInUser, setLoggedInUser, true);
            await checkLoggedInUserMappedWithUserProfile(profile, loggedInUser, profileDetail, setProfileDetail);
        })();
    }, jsonConstants.EMPTY);

    return (
        <View style={[SDGenericStyles.fill]}>
            <View>
                <FastImage source={{ uri: profile.profile_image, priority: FastImage.priority.normal }}
                    style={{ width: width, height: height }} resizeMode={FastImage.resizeMode.center} />
            </View>
            <View>
                <View style={[SDGenericStyles.justifyItemsStart, SDGenericStyles.paddingLeft5, SDGenericStyles.bottom220]}>
                    <Animated.View style={[SDGenericStyles.alignItemsStart, SDGenericStyles.bottom8]}>
                        <Text style={[SDGenericStyles.ft25, SDGenericStyles.fontFamilyBold, SDGenericStyles.justifyContentCenter,
                        SDGenericStyles.textCenterAlign]}>{profile.name}</Text>
                        <Text style={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyBold, SDGenericStyles.justifyContentCenter,
                        SDGenericStyles.textCenterAlign, SDGenericStyles.mt12]}>{`@`}{profile.user_id}</Text>
                    </Animated.View>
                    <Animated.View style={SDGenericStyles.alignItemsStart}>
                        {
                            profile.bio && <Text style={[SDGenericStyles.textLeftAlign, SDGenericStyles.justifyContentCenter,
                            SDGenericStyles.fontFamilyRoman, SDGenericStyles.ft16, { width: width / numericConstants.ONE_PT_NINE }]}>{profile.bio}</Text> ||
                            <TouchableOpacity activeOpacity={.7} style={[SDGenericStyles.paddingHorizontal15, SDGenericStyles.paddingVertical2,
                            SDGenericStyles.alignItemsCenter, glancePostStyles.profileBioTextStyle]}>
                                <Text style={[SDGenericStyles.textCenterAlign, SDGenericStyles.justifyContentCenter,
                                SDGenericStyles.fontFamilyRoman, SDGenericStyles.ft12]}>{actionButtonTextConstants.ADD_BIO}</Text>
                            </TouchableOpacity>
                        }
                    </Animated.View>
                </View>
                <View style={[SDGenericStyles.alignSelfEnd, SDGenericStyles.bottom200, SDGenericStyles.paddingRight5]}>
                    <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.justifyContentSpaceBetween]}>
                        <TouchableOpacity activeOpacity={.7} style={[SDGenericStyles.paddingHorizontal15, SDGenericStyles.paddingVertical2,
                        SDGenericStyles.alignItemsCenter, glancePostStyles.profileBioTextStyle, SDGenericStyles.backgroundColorYellow]} onPress={async () =>
                            await handleUserPostAction(profileDetail.isFollowing && actionButtonTextConstants.UNFOLLOW || actionButtonTextConstants.FOLLOW,
                                profile, sdomDatastate, setSdomDatastate, loggedInUser, profileDetail, setProfileDetail, navigation)}>
                            <Text style={[SDGenericStyles.textCenterAlign, SDGenericStyles.justifyContentCenter,
                            SDGenericStyles.fontFamilyRoman, SDGenericStyles.ft16]}>
                                {profileDetail.isFollowing && actionButtonTextConstants.UNFOLLOW || actionButtonTextConstants.FOLLOW}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.7} style={SDGenericStyles.paddingLeft5}>
                            <View style={[SDGenericStyles.textBoxGray, SDGenericStyles.padding5, SDGenericStyles.borderRadius20]}>
                                <LockIcon width={numericConstants.SIXTEEN} height={numericConstants.SIXTEEN} stroke={colors.WHITE} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={[SDGenericStyles.backgroundColorWhite, glancePostStyles.profilePostBottomView,
            SDGenericStyles.height100, SDGenericStyles.bottom180]}>
                <TouchableOpacity activeOpacity={.3} style={[SDGenericStyles.height100], { width: width }} onPress={async () =>
                    navigation.navigate(screens.PROFILE_POSTS, { profile: profile })}>
                    <View style={[SDGenericStyles.rowFlexDirection]}>
                        <SDProfileBottomTextView label={miscMessage.FOLLOWERS} count={profileDetail.count.followersCount} />
                        <SDProfileBottomTextView label={miscMessage.FOLLOWING} count={profileDetail.count.followingCount} />
                        <SDProfileBottomTextView label={miscMessage.WALLS} count={profileDetail.count.wallsCount} />
                        <SDProfileBottomTextView label={miscMessage.UPLOADS} count={profileDetail.count.uploadCount} />
                        <SDProfileBottomTextView label={miscMessage.DOWNLOADS} count={profileDetail.count.downloadCount} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}