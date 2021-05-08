import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useContext, useState } from 'react';
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
    checkLoggedInUserMappedWithUserProfile, handleUserFollowUnfollowAction,
    showSnackBar, updateProfileActionValueToState
} from '../../helper/Helper';
import { colors, glancePostStyles, SDGenericStyles } from "../../styles/Styles"

export const Profile = () => {
    const navigation = useNavigation();

    const route = useRoute();
    const profile = route.params?.profile;

    const { sdomDatastate, setSdomDatastate, loggedInUser, setLoggedInUser } = useContext(CategoryContext);

    const [profileDetail, setProfileDetail] = useState({
        isFollowing: false,
        hasPublicAccess: false
    })

    useEffect(() => {
        checkLoggedInUserMappedWithUserProfile(profile, loggedInUser, profileDetail, setProfileDetail);
    }, jsonConstants.EMPTY)

    const navigateUser = (action, responseData) => {
        debugger
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
            <FastImage source={{ uri: profile.profile_image, priority: FastImage.priority.normal }}
                style={{ width: width, height: height }} resizeMode={FastImage.resizeMode.center} />
            <View style={glancePostStyles.profileNameTextStyle}>
                <Animated.View style={[SDGenericStyles.alignItemsStart, SDGenericStyles.bottom8]}>
                    <Text style={[SDGenericStyles.ft25, SDGenericStyles.fontFamilyRoman,
                    SDGenericStyles.textCenterAlign, SDGenericStyles.justifyContentCenter,]}>{profile.name}</Text>
                </Animated.View>
                <Animated.View style={SDGenericStyles.alignItemsStart}>
                    {
                        profile.bio && <Text style={[SDGenericStyles.ft25, SDGenericStyles.fontFamilyRoman]}>{profile.bio}</Text> ||
                        <TouchableOpacity activeOpacity={.7} style={[SDGenericStyles.paddingHorizontal15, SDGenericStyles.paddingVertical5,
                        SDGenericStyles.alignItemsCenter, glancePostStyles.profileBioTextStyle]}>
                            <Text style={[SDGenericStyles.textCenterAlign, SDGenericStyles.justifyContentCenter,
                            SDGenericStyles.fontFamilyRoman, SDGenericStyles.ft14]}>{actionButtonTextConstants.ADD_BIO}</Text>
                        </TouchableOpacity>
                    }
                </Animated.View>
            </View>
            <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.justifyContentSpaceBetween, glancePostStyles.profileViewActionsStyle]}>
                <TouchableOpacity activeOpacity={.7} style={[SDGenericStyles.paddingHorizontal15, SDGenericStyles.paddingVertical5,
                SDGenericStyles.alignItemsCenter, glancePostStyles.profileBioTextStyle, SDGenericStyles.backgroundColorYellow]} onPress={async () =>
                    await handleUserAction(profileDetail.isFollowing && actionButtonTextConstants.FOLLOW || actionButtonTextConstants.UNFOLLOW)}>
                    <Text style={[SDGenericStyles.textCenterAlign, SDGenericStyles.justifyContentCenter,
                    SDGenericStyles.fontFamilyRoman, SDGenericStyles.ft16]}>
                        {profileDetail.isFollowing && actionButtonTextConstants.FOLLOW || actionButtonTextConstants.UNFOLLOW}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.7} style={SDGenericStyles.paddingLeft5}>
                    <View style={[SDGenericStyles.textBoxGray, SDGenericStyles.padding5, SDGenericStyles.borderRadius5]}>
                        <LockIcon width={numericConstants.TWENTY} height={numericConstants.TWENTY} stroke={colors.WHITE} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}