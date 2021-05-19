import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useContext, useEffect, useMemo } from 'react';
import { Text, TouchableOpacity, View } from "react-native"
import FastImage from 'react-native-fast-image';
import Animated from 'react-native-reanimated';
import { CategoryContext } from '../../App';
import { LockIcon } from '../../components/icons/LockIcon';
import { UnlockIcon } from '../../components/icons/UnlockIcon';
import { VerifiedAuthorBadgeIcon } from '../../components/icons/VerifiedAuthorBadgeIcon';
import {
    actionButtonTextConstants, height, jsonConstants,
    miscMessage, numericConstants, PRIVATE_FOLLOW_UNFOLLOW, width
} from '../../constants/Constants';
import { checkLoggedInUserMappedWithUserProfile, fetchUpdateLoggedInUserProfile, handleUserPostAction } from '../../helper/Helper';
import { colors, glancePostStyles, SDGenericStyles } from "../../styles/Styles"
import { SDProfileBottomSheet } from '../../views/bottomSheet/SDProfileBottomSheet';

export const Profile = () => {

    const navigation = useNavigation();

    const route = useRoute();
    const profile = route.params?.profile;

    // variables
    const snapPoints = useMemo(() => [numericConstants.TWELVE_PCNT, numericConstants.HUNDRED_PCNT], jsonConstants.EMPTY);

    const { sdomDatastate, setSdomDatastate, loggedInUser, setLoggedInUser, profileDetail, setProfileDetail } = useContext(CategoryContext);

    useEffect(() => {
        (async () => {
            await fetchUpdateLoggedInUserProfile(loggedInUser, setLoggedInUser, true);
            await checkLoggedInUserMappedWithUserProfile(profile, loggedInUser, profileDetail, setProfileDetail);
        })();
    }, jsonConstants.EMPTY);

    const isDisabled = profileDetail.isFollowing && (profileDetail.privateRequestAccessStatus == PRIVATE_FOLLOW_UNFOLLOW.REQUESTED ||
        profileDetail.privateRequestAccessStatus == PRIVATE_FOLLOW_UNFOLLOW.APPROVED);

    return (
        <View style={[SDGenericStyles.fill]}>
            <FastImage source={{ uri: profile.profile_image, priority: FastImage.priority.normal }}
                style={{ width: width, height: height }} />
            <View>
                <View style={[SDGenericStyles.justifyItemsStart, SDGenericStyles.paddingLeft10, SDGenericStyles.bottom220]}>
                    <Animated.View style={[SDGenericStyles.alignItemsStart, SDGenericStyles.bottom8]}>
                        <View style={SDGenericStyles.rowFlexDirection}>
                            <Text style={[SDGenericStyles.ft25, SDGenericStyles.fontFamilyBold,
                            SDGenericStyles.textCenterAlign, SDGenericStyles.textColorWhite]}>
                                {profile.name}
                            </Text>
                            {
                                profile.user_type == miscMessage.VERIFIED_AUTHOR &&
                                <View>
                                    <VerifiedAuthorBadgeIcon width={numericConstants.TWENTY_FOUR} height={numericConstants.TWENTY_FOUR}
                                        stroke={colors.GREEN} />
                                </View>
                            }
                        </View>
                        <Text style={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyBold, SDGenericStyles.justifyContentCenter,
                        SDGenericStyles.textCenterAlign, SDGenericStyles.mt12, SDGenericStyles.textColorWhite]}>{`@`}{profile.user_id}</Text>
                    </Animated.View>
                    <Animated.View style={SDGenericStyles.alignItemsStart}>
                        <Text style={[SDGenericStyles.textLeftAlign, SDGenericStyles.justifyContentCenter,
                        SDGenericStyles.fontFamilyRoman, SDGenericStyles.ft16, { width: width / numericConstants.ONE_PT_NINE },
                        SDGenericStyles.textColorWhite]}>{profile.bio}</Text>
                    </Animated.View>
                </View>
                <View style={[SDGenericStyles.alignSelfEnd, SDGenericStyles.bottom210, SDGenericStyles.paddingRight5]}>
                    <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.justifyContentSpaceBetween]}>
                        <TouchableOpacity activeOpacity={.7} style={[SDGenericStyles.paddingHorizontal15, SDGenericStyles.paddingVertical2,
                        SDGenericStyles.alignItemsCenter, glancePostStyles.profileBioTextStyle, !isDisabled && SDGenericStyles.backgroundColorYellow ||
                        SDGenericStyles.backGroundColorLightGrey]} onPress={async () =>
                            await handleUserPostAction(profileDetail.isFollowing && actionButtonTextConstants.UNFOLLOW || actionButtonTextConstants.FOLLOW,
                                profile, sdomDatastate, setSdomDatastate, loggedInUser, profileDetail, setProfileDetail, navigation, false)}
                            disabled={isDisabled}>
                            <Text style={[SDGenericStyles.textCenterAlign, SDGenericStyles.justifyContentCenter,
                            SDGenericStyles.fontFamilyRoman, SDGenericStyles.ft16]}>
                                {profileDetail.isFollowing && actionButtonTextConstants.UNFOLLOW || actionButtonTextConstants.FOLLOW}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.7} style={SDGenericStyles.paddingLeft5} onPress={async () =>
                            await handleUserPostAction(profileDetail.privateRequestAccessStatus == PRIVATE_FOLLOW_UNFOLLOW.NOT_REQUESTED &&
                                actionButtonTextConstants.FOLLOW || actionButtonTextConstants.UNFOLLOW, profile, sdomDatastate, setSdomDatastate,
                                loggedInUser, profileDetail, setProfileDetail, navigation, true)}>
                            {
                                profileDetail.isFollowing && profileDetail.privateRequestAccessStatus == PRIVATE_FOLLOW_UNFOLLOW.NOT_REQUESTED &&
                                (<View style={[SDGenericStyles.textBoxGray, SDGenericStyles.padding5, SDGenericStyles.borderRadius20]}>
                                    <LockIcon width={numericConstants.SIXTEEN} height={numericConstants.SIXTEEN} fill={colors.WHITE} />
                                </View>) ||
                                profileDetail.isFollowing && profileDetail.privateRequestAccessStatus == PRIVATE_FOLLOW_UNFOLLOW.REQUESTED &&
                                (<View style={[SDGenericStyles.textBoxGray, SDGenericStyles.padding5, SDGenericStyles.borderRadius20]}>
                                    <LockIcon width={numericConstants.SIXTEEN} height={numericConstants.SIXTEEN} fill={colors.SDOM_YELLOW} />
                                </View>) ||
                                profileDetail.isFollowing && profileDetail.privateRequestAccessStatus == PRIVATE_FOLLOW_UNFOLLOW.APPROVED &&
                                (<View style={[SDGenericStyles.textBoxGray, SDGenericStyles.padding5, SDGenericStyles.borderRadius20]}>
                                    <UnlockIcon width={numericConstants.SIXTEEN} height={numericConstants.SIXTEEN} fill={colors.GREEN} />
                                </View>)
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <SDProfileBottomSheet profile={profile} profileDetail={profileDetail} navigation={navigation} snapPoints={snapPoints} setLoggedInUser={setLoggedInUser}
                setProfileDetail={setProfileDetail} sdomDatastate={sdomDatastate} setSdomDatastate={sdomDatastate} loggedInUser={loggedInUser} />
        </View>
    )
}