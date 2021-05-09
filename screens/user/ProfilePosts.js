import React from 'react';
import { useNavigation, useRoute } from "@react-navigation/core";
import { useContext, useEffect } from "react";
import { CategoryContext } from "../../App";
import { jsonConstants, numericConstants } from "../../constants/Constants";
import { fetchPostsOfUserProfile } from "../../helper/Helper";
import { ProfileUserPosts } from "../../views/profileView/ProfileUserPosts"
import { FlatList, View } from 'react-native';

export const ProfilePosts = props => {

    const navigation = useNavigation();

    const route = useRoute();
    const profile = route.params?.profile;

    const { sdomDatastate, loggedInUser, setLoggedInUser, profileDetail, setProfileDetail } = useContext(CategoryContext);

    useEffect(() => {
        (async () => {
            await fetchPostsOfUserProfile(profile, profileDetail, setProfileDetail, sdomDatastate);
        })();
    }, jsonConstants.EMPTY);

    return (
        <View>
            <FlatList data={profileDetail.userPosts} numColumns={numericConstants.THREE} key={numericConstants.THREE}
                keyExtractor={(item) => item.key} renderItem={({ item, index }) => ProfileUserPosts(item, index, profile, profileDetail, setProfileDetail, navigation)} />
        </View>
    )
}