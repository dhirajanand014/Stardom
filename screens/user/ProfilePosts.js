import React, { useRef } from 'react';
import { useNavigation, useRoute } from "@react-navigation/core";
import { useContext, useEffect } from "react";
import { CategoryContext } from "../../App";
import { actionButtonTextConstants, jsonConstants, numericConstants, PRIVATE_FOLLOW_UNFOLLOW } from "../../constants/Constants";
import { fetchPostsOfUserProfile, handleUserPostAction } from "../../helper/Helper";
import { ProfileUserPosts } from "../../views/profileView/ProfileUserPosts"
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { glancePostStyles, SDGenericStyles } from '../../styles/Styles';

export const ProfilePosts = props => {

    const navigation = useNavigation();

    const loggedInUserHasPrivateAccess = useRef(false);

    const route = useRoute();
    const profile = route.params?.profile;

    const { sdomDatastate, loggedInUser, profileDetail, setProfileDetail, setSdomDatastate } = useContext(CategoryContext);

    const checkHasPrivateAccess = () => {
        if (loggedInUser.loginDetails.details) {
            const details = JSON.parse(loggedInUser.loginDetails.details);
            loggedInUserHasPrivateAccess.current = details.following.some(following => following.following_id == profile.id
                && following.pvtaccess == PRIVATE_FOLLOW_UNFOLLOW.APPROVED);
        }
    }


    useEffect(() => {
        (async () => {
            await fetchPostsOfUserProfile(profile, profileDetail, setProfileDetail, sdomDatastate);
            checkHasPrivateAccess();
        })();
    }, jsonConstants.EMPTY);


    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack]}>
            <FlatList data={profileDetail.userPosts} numColumns={numericConstants.THREE} key={numericConstants.THREE}
                keyExtractor={(item) => item.key} renderItem={({ item, index }) => ProfileUserPosts(item, index, loggedInUserHasPrivateAccess.current)} />
            <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter, SDGenericStyles.paddingBottom30]}>
                <TouchableOpacity activeOpacity={.7} style={[SDGenericStyles.paddingHorizontal20, SDGenericStyles.padding10, SDGenericStyles.borderWidth3, SDGenericStyles.borderColorBlack,
                SDGenericStyles.alignItemsCenter, glancePostStyles.profileBioTextStyle, SDGenericStyles.backgroundColorYellow]} onPress={async () =>
                    await handleUserPostAction(profileDetail.isFollowing && actionButtonTextConstants.UNFOLLOW || actionButtonTextConstants.FOLLOW,
                        profile, sdomDatastate, setSdomDatastate, loggedInUser, profileDetail, setProfileDetail, navigation)}>
                    <Text style={[SDGenericStyles.textCenterAlign, SDGenericStyles.justifyContentCenter, SDGenericStyles.fontFamilyRoman, SDGenericStyles.ft16]}>
                        {profileDetail.isFollowing && actionButtonTextConstants.UNFOLLOW || actionButtonTextConstants.FOLLOW}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}