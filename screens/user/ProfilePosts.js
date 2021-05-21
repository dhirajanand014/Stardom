import React, { } from 'react';
import { actionButtonTextConstants, numericConstants } from "../../constants/Constants";
import { handleUserPostAction } from "../../helper/Helper";
import { ProfileUserPosts } from "../../views/profileView/ProfileUserPosts"
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { glancePostStyles, SDGenericStyles } from '../../styles/Styles';

export const ProfilePosts = props => {
    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backgroundColorWhite]}>
            <FlatList data={props.profileDetail.userPosts} numColumns={numericConstants.THREE} key={numericConstants.THREE}
                keyExtractor={(item) => item.key} renderItem={({ item, index }) => ProfileUserPosts(item, index, props.loggedInUserHasPrivateAccess.current)} />
            {
                !props.profileDetail.isSameUser &&
                <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter, SDGenericStyles.paddingBottom30]}>
                    <TouchableOpacity activeOpacity={.7} style={[SDGenericStyles.paddingHorizontal20, SDGenericStyles.padding10, SDGenericStyles.borderWidth3, SDGenericStyles.borderColorBlack,
                    SDGenericStyles.alignItemsCenter, glancePostStyles.profileBioTextStyle, SDGenericStyles.backgroundColorYellow]} onPress={async () =>
                        await handleUserPostAction(props.profileDetail.isFollowing && actionButtonTextConstants.UNFOLLOW || actionButtonTextConstants.FOLLOW,
                            props.profile, props.sdomDatastate, props.setSdomDatastate, props.loggedInUser, props.profileDetail, props.setProfileDetail, props.navigation)}>
                        <Text style={[SDGenericStyles.textCenterAlign, SDGenericStyles.justifyContentCenter, SDGenericStyles.fontFamilyRoman, SDGenericStyles.ft16]}>
                            {props.profileDetail.isFollowing && actionButtonTextConstants.UNFOLLOW || actionButtonTextConstants.FOLLOW}
                        </Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}