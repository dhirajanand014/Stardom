import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from "react-native"
import FastImage from 'react-native-fast-image';
import Animated from 'react-native-reanimated';
import { useEffect } from 'react/cjs/react.development';
import { CategoryContext } from '../../App';
import { LockIcon } from '../../components/icons/LockIcon';
import {
    actionButtonTextConstants, alertTextMessages, errorMessages, height,
    jsonConstants,
    numericConstants, responseStringData, screens, width
} from '../../constants/Constants';
import {
    checkLoggedInUserMappedWithUserProfile, fetchUpdateLoggedInUserProfile, handleUserFollowUnfollowAction,
    showSnackBar, updateProfileActionValueToState
} from '../../helper/Helper';
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
            checkLoggedInUserMappedWithUserProfile(profile, loggedInUser, profileDetail, setProfileDetail);
        })();
    }, jsonConstants.EMPTY);

    const navigateUser = (action, responseData) => {
        if (responseData == responseStringData.TOKEN_EXPIRED || responseData == responseStringData.TOKEN_INVALID
            || responseData == responseStringData.REDIRECT_USER_LOGIN) {
            showSnackBar(errorMessages.PLEASE_LOGIN_TO_CONTINUE, false);
            navigation.navigate(screens.LOGIN);
        } else if (responseData && responseData.message == responseStringData.SUCCESS) {
            updateProfileActionValueToState(action, profile, sdomDatastate, setSdomDatastate, loggedInUser, setLoggedInUser);
            showSnackBar(alertTextMessages.SUCCESS_FOLLOW, true);
        }
    }

    const handleUserAction = async (action) => {
        const responseData = await handleUserFollowUnfollowAction(action, profile.id);
        navigateUser(action, responseData);
    }

    return (
        <View style={[SDGenericStyles.fill]}>
            <View>
                <FastImage source={{ uri: profile.profile_image, priority: FastImage.priority.normal }}
                    style={{ width: width, height: height }} resizeMode={FastImage.resizeMode.center} />
            </View>
            <View>
                <View style={[SDGenericStyles.justifyItemsStart, SDGenericStyles.paddingLeft5, SDGenericStyles.bottom200]}>
                    <Animated.View style={[SDGenericStyles.alignItemsStart, SDGenericStyles.bottom8]}>
                        <Text style={[SDGenericStyles.ft25, SDGenericStyles.fontFamilyRoman,
                        SDGenericStyles.textCenterAlign, SDGenericStyles.justifyContentCenter,]}>{profile.name}</Text>
                    </Animated.View>
                    <Animated.View style={SDGenericStyles.alignItemsStart}>
                        {
                            profile.bio && <Text style={[SDGenericStyles.ft25, SDGenericStyles.fontFamilyRoman]}>{profile.bio}</Text> ||
                            <TouchableOpacity activeOpacity={.7} style={[SDGenericStyles.paddingHorizontal15, SDGenericStyles.paddingVertical2,
                            SDGenericStyles.alignItemsCenter, glancePostStyles.profileBioTextStyle]}>
                                <Text style={[SDGenericStyles.textCenterAlign, SDGenericStyles.justifyContentCenter,
                                SDGenericStyles.fontFamilyRoman, SDGenericStyles.ft14]}>{actionButtonTextConstants.ADD_BIO}</Text>
                            </TouchableOpacity>
                        }
                    </Animated.View>
                </View>
                <View style={[SDGenericStyles.alignSelfEnd, SDGenericStyles.bottom180, SDGenericStyles.paddingRight5]}>
                    <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.justifyContentSpaceBetween]}>
                        <TouchableOpacity activeOpacity={.7} style={[SDGenericStyles.paddingHorizontal15, SDGenericStyles.paddingVertical2,
                        SDGenericStyles.alignItemsCenter, glancePostStyles.profileBioTextStyle, SDGenericStyles.backgroundColorYellow]} onPress={async () =>
                            await handleUserAction(profileDetail.isFollowing && actionButtonTextConstants.UNFOLLOW || actionButtonTextConstants.FOLLOW)}>
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
                <View style={[SDGenericStyles.backgroundColorWhite, {
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 10
                }, SDGenericStyles.height100, SDGenericStyles.bottom160]}>
                    <TouchableOpacity activeOpacity={.7} style={SDGenericStyles.padding12} onPress={async () =>
                        navigation.navigate(screens.PROFILE_POSTS, { profile: profile })}>
                        <Text style={[SDGenericStyles.textCenterAlign, SDGenericStyles.justifyContentCenter,
                        SDGenericStyles.fontFamilyRoman, SDGenericStyles.ft16]}>
                            {profileDetail.isFollowing && actionButtonTextConstants.UNFOLLOW || actionButtonTextConstants.FOLLOW}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}