import React from 'react';
import { actionButtonTextConstants, numericConstants } from "../../constants/Constants";
import { handleUserPostAction } from "../../helper/Helper";
import { ProfileUserPosts } from "../../views/profileView/ProfileUserPosts"
import { Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler'
import { glancePostStyles, SDGenericStyles } from '../../styles/Styles';
import { useNavigation } from '@react-navigation/core';

export const ProfilePosts = props => {
    const navigation = useNavigation();
    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backgroundColorWhite]}>
            <FlatList contentContainerStyle={SDGenericStyles.bottom18} data={props.profileDetail.userPosts} numColumns={numericConstants.THREE} initialNumToRender={numericConstants.THIRTY}
                keyExtractor={(item) => item.id} renderItem={({ item, index }) => <ProfileUserPosts item={item} index={index} navigation={navigation}
                    loggedInUserHasPrivateAccess={props.loggedInUserHasPrivateAccess} isSameUser={props.profileDetail.isSameUser} />} />
            {
                !props.profileDetail.isSameUser &&
                <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter, SDGenericStyles.paddingBottom10, SDGenericStyles.paddingTop5, SDGenericStyles.elevation8]}>
                    <TouchableOpacity activeOpacity={.7} style={[SDGenericStyles.paddingHorizontal20, SDGenericStyles.padding5, SDGenericStyles.borderWidth3, SDGenericStyles.borderColorBlack,
                    SDGenericStyles.alignItemsCenter, glancePostStyles.profileBioTextStyle, SDGenericStyles.backgroundColorYellow]} onPress={async () =>
                        await handleUserPostAction(props.profileDetail.isFollowing && actionButtonTextConstants.UNFOLLOW || actionButtonTextConstants.FOLLOW,
                            props.profile, props.sdomDatastate, props.setSdomDatastate, props.loggedInUser, props.profileDetail, props.setProfileDetail, props.navigation)}>
                        <Text style={[SDGenericStyles.textCenterAlign, SDGenericStyles.justifyContentCenter, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.ft16]}>
                            {props.profileDetail.isFollowing && actionButtonTextConstants.UNFOLLOW || actionButtonTextConstants.FOLLOW}
                        </Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}