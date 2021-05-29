import { useIsFocused, useNavigation } from '@react-navigation/core';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View, BackHandler } from "react-native"
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import { CategoryContext } from '../../App';
import { LockIcon } from '../../components/icons/LockIcon';
import { UnlockIcon } from '../../components/icons/UnlockIcon';
import { VerifiedAuthorBadgeIcon } from '../../components/icons/VerifiedAuthorBadgeIcon';
import {
    actionButtonTextConstants, alertTextMessages, backHandlerConstants, height, jsonConstants,
    miscMessage, numericConstants, PRIVATE_FOLLOW_UNFOLLOW, requestConstants, stringConstants, width
} from '../../constants/Constants';
import DefaultUserProfile from '../../constants/DefaultUserProfile.json';
import {
    checkLoggedInUserMappedWithUserProfile, fetchUpdateLoggedInUserProfile,
    getCurrentPostUser, handleUserPostAction
} from '../../helper/Helper';
import { colors, glancePostStyles, SDGenericStyles } from "../../styles/Styles"
import { SDProfileBottomSheet } from '../../views/bottomSheet/SDProfileBottomSheet';

export const Profile = () => {

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const { sdomDatastate, setSdomDatastate, loggedInUser, setLoggedInUser, profileDetail, setProfileDetail, loader, setLoader,
        currentPostIndexForProfileRef } = useContext(CategoryContext);

    const [loggedInUserHasPrivateAccess, setLoggedInUserHasPrivateAccess] = useState(false);

    const postIndex = currentPostIndexForProfileRef.current || numericConstants.ZERO;
    const profile = sdomDatastate.posts && sdomDatastate.posts[postIndex].user || DefaultUserProfile;

    // variables
    const snapPoints = useMemo(() => [numericConstants.TWELVE_PCNT, numericConstants.HUNDRED_PCNT], jsonConstants.EMPTY);

    useEffect(() => {
        (async () => {
            if (isFocused) {
                // setLoader({ ...loader, isLoading: true, loadingText: alertTextMessages.FETCHING_USER_PROFILE_DETAILS });
                await fetchUpdateLoggedInUserProfile(loggedInUser, setLoggedInUser, true);
                //await checkLoggedInUserMappedWithUserProfile(profile, loggedInUser, profileDetail, setProfileDetail);
                //setLoader({ ...loader, isLoading: false, loadingText: stringConstants.EMPTY });
            }
        })();
        BackHandler.addEventListener(backHandlerConstants.HARDWAREBACKPRESS, resetProfileState);
        return () => {
            BackHandler.removeEventListener(backHandlerConstants.HARDWAREBACKPRESS, resetProfileState);
        };
    }, [isFocused]);

    const resetProfileState = () => {
        profileDetail.userPosts = jsonConstants.EMPTY;
        profileDetail.count = {
            [requestConstants.FOLLOWERS_COUNT]: numericConstants.ZERO,
            [requestConstants.FOLLOWING_COUNT]: numericConstants.ZERO,
            [requestConstants.WALLPAPERS_COUNT]: numericConstants.ZERO,
            [requestConstants.UPLOAD_COUNT]: numericConstants.ZERO,
            [requestConstants.DOWNLOAD_COUNT]: numericConstants.ZERO,
        };
        profileDetail.isFollowing = false;
        profileDetail.privateRequestAccessStatus = PRIVATE_FOLLOW_UNFOLLOW.NOT_REQUESTED;
        profile.isSameUser = false;
        setLoggedInUserHasPrivateAccess(false);
        setProfileDetail({ ...profileDetail });
    }

    const isDisabled = profileDetail.isFollowing && (profileDetail.privateRequestAccessStatus == PRIVATE_FOLLOW_UNFOLLOW.REQUESTED ||
        profileDetail.privateRequestAccessStatus == PRIVATE_FOLLOW_UNFOLLOW.APPROVED);

    return (
        <View style={[SDGenericStyles.fill]}>
            {
                profile && profile.profile_image && <FastImage source={{ uri: profile.profile_image, priority: FastImage.priority.high }}
                    style={{ width: width, height: height }} fallback /> || <FastImage source={{
                        uri: Image.resolveAssetSource(require(`../../assets/no_image_available.png`)).uri,
                        priority: FastImage.priority.high
                    }} style={{ width: width, height: height }} resizeMode={FastImage.resizeMode.center} />
            }
            <LinearGradient colors={[colors.TRANSPARENT, colors.BLACK]} style={profileDetail.isSameUser && SDGenericStyles.bottom150
                || SDGenericStyles.bottom200}>
                <View style={[SDGenericStyles.justifyItemsStart, SDGenericStyles.paddingLeft10]}>
                    <Animated.View style={[SDGenericStyles.alignItemsStart]}>
                        <View style={SDGenericStyles.rowFlexDirection}>
                            <Text style={[SDGenericStyles.ft20, SDGenericStyles.fontFamilyBold,
                            SDGenericStyles.textCenterAlign, SDGenericStyles.textColorWhite]}>
                                {profile && profile.name || "test"}
                            </Text>
                            {
                                profile && profile.user_type == miscMessage.VERIFIED_AUTHOR &&
                                <View>
                                    <VerifiedAuthorBadgeIcon width={numericConstants.FIFTEEN} height={numericConstants.FIFTEEN} />
                                </View> || <View />
                            }
                        </View>
                        <Text style={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyBold, SDGenericStyles.justifyContentCenter,
                        SDGenericStyles.textCenterAlign, SDGenericStyles.textColorWhite]}>{`@`}{profile && profile.user_id || "htht"}
                        </Text>
                    </Animated.View>
                    <Animated.View style={SDGenericStyles.alignItemsStart}>
                        <Text style={[SDGenericStyles.textLeftAlign, SDGenericStyles.justifyContentCenter, SDGenericStyles.mt12,
                        SDGenericStyles.fontFamilyRoman, SDGenericStyles.ft16, { width: width / numericConstants.ONE_PT_NINE },
                        SDGenericStyles.textColorWhite]}>{profile && profile.bio || "fdfdf"}</Text>
                    </Animated.View>
                </View>
                {
                    !profileDetail.isSameUser &&
                    <View style={[SDGenericStyles.alignSelfEnd, SDGenericStyles.bottom18, SDGenericStyles.paddingRight5]}>
                        <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.justifyContentSpaceBetween]}>
                            <TouchableOpacity activeOpacity={.7} style={[SDGenericStyles.paddingHorizontal15, SDGenericStyles.paddingVertical2,
                            SDGenericStyles.alignItemsCenter, glancePostStyles.profileBioTextStyle, !isDisabled && SDGenericStyles.backgroundColorYellow ||
                            SDGenericStyles.backGroundColorLightGrey]} onPress={async () => {
                                setLoader({
                                    ...loader, isLoading: true, loadingText: profileDetail.isFollowing && alertTextMessages.UNFOLLOWING_USER ||
                                        alertTextMessages.FOLLOWING_USER
                                });
                                await handleUserPostAction(profileDetail.isFollowing && actionButtonTextConstants.UNFOLLOW || actionButtonTextConstants.FOLLOW,
                                    profile, sdomDatastate, setSdomDatastate, loggedInUser, profileDetail, setProfileDetail, navigation, false);
                                await checkLoggedInUserMappedWithUserProfile(profile, loggedInUser, profileDetail, setProfileDetail);
                                setLoader({ ...loader, isLoading: false, loadingText: stringConstants.EMPTY });
                            }} disabled={isDisabled}>
                                <Text style={[SDGenericStyles.textCenterAlign, SDGenericStyles.justifyContentCenter,
                                SDGenericStyles.fontFamilyRoman, SDGenericStyles.ft16]}>
                                    {profileDetail.isFollowing && actionButtonTextConstants.UNFOLLOW || actionButtonTextConstants.FOLLOW}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={.7} style={SDGenericStyles.paddingLeft5} onPress={async () => {
                                setLoader({
                                    ...loader, isLoading: true, loadingText: profileDetail.privateRequestAccessStatus == PRIVATE_FOLLOW_UNFOLLOW.NOT_REQUESTED
                                        && alertTextMessages.PRIVATE_FOLLOWING_USER || alertTextMessages.PRIVATE_UNFOLLOWING_USER
                                });
                                await handleUserPostAction(profileDetail.privateRequestAccessStatus == PRIVATE_FOLLOW_UNFOLLOW.NOT_REQUESTED &&
                                    actionButtonTextConstants.FOLLOW || actionButtonTextConstants.UNFOLLOW, profile, sdomDatastate, setSdomDatastate,
                                    loggedInUser, profileDetail, setProfileDetail, navigation, true);
                                await checkLoggedInUserMappedWithUserProfile(profile, loggedInUser, profileDetail, setProfileDetail);
                                setLoader({ ...loader, isLoading: false, loadingText: stringConstants.EMPTY });
                            }}>
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
                }
            </LinearGradient>
            <SDProfileBottomSheet profile={profile} profileDetail={profileDetail} navigation={navigation} snapPoints={snapPoints} setLoggedInUser={setLoggedInUser}
                setProfileDetail={setProfileDetail} sdomDatastate={sdomDatastate} setSdomDatastate={sdomDatastate} loggedInUser={loggedInUser} loader={loader}
                loggedInUserHasPrivateAccess={loggedInUserHasPrivateAccess} setLoggedInUserHasPrivateAccess={setLoggedInUserHasPrivateAccess} setLoader={setLoader} />
        </View >
    )
}