import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FlatList, StatusBar, View } from "react-native"
import { CategoryContext } from '../../App';
import {
    actionButtonTextConstants, alertTextMessages, jsonConstants,
    miscMessage, numericConstants, PRIVATE_FOLLOW_UNFOLLOW,
    requestConstants, responseStringData, stringConstants
} from '../../constants/Constants';
import { fetchUserFollowersFollowing, showSnackBar, userPostAction } from '../../helper/Helper';
import { SDGenericStyles } from '../../styles/Styles';
import { UserFollowFollowingRenderer } from '../../views/menus/UserFollowFollowingRenderer';

export const UserFollowFollowing = () => {

    const [userFollowerFollowing, setUserFollowerFollowing] = useState({
        users: jsonConstants.EMPTY
    });

    const navigation = useNavigation();

    const { loggedInUser, setLoggedInUser } = useContext(CategoryContext);

    const route = useRoute();
    const listFor = route.params?.listFor || stringConstants.EMPTY;

    const filterPrivateAccessUsers = (responseData) => {
        const user = JSON.parse(loggedInUser.loginDetails.details);
        const followerIds = user.followers.filter(follower => follower.pvtaccess == PRIVATE_FOLLOW_UNFOLLOW.REQUESTED)
            .map(follower => follower.follower_id);
        responseData.users && responseData.users.filter(user => followerIds.some(followerId => followerId == user.id));
    }

    useEffect(async () => {
        const responseData = await fetchUserFollowersFollowing(listFor, loggedInUser);
        if (listFor == miscMessage.PRIVATE_REQUEST_ACCESS) {
            filterPrivateAccessUsers(responseData);
        }
        setUserFollowerFollowing(responseData);
    }, jsonConstants.EMPTY);

    const actionCallBack = useCallback(async (id, action) => {
        const requestData = { [requestConstants.FOLLOWER_ID]: id, [requestConstants.APPROVAL_ACTION]: action };
        const requestJSON = JSON.stringify(requestData);
        const responseData = await userPostAction(requestConstants.PRIVATE_ACCESS_ACTION, requestJSON,
            loggedInUser.loginDetails.token);

        if (responseData.message == responseStringData.SUCCESSFULLY_UPDATED) {
            const userDetails = JSON.parse(loggedInUser.loginDetails.details);
            userDetails.followers.filter(follower => follower.follower_id == id)
                .map(follower => follower.pvtaccess = action == actionButtonTextConstants.APPROVE && PRIVATE_FOLLOW_UNFOLLOW.APPROVED ||
                    PRIVATE_FOLLOW_UNFOLLOW.REJECTED);
            loggedInUser.loginDetails.details = JSON.stringify(userDetails);
            showSnackBar(action == actionButtonTextConstants.APPROVE && alertTextMessages.YOU_HAVE_SUCCESSFULLY_APPROVED ||
                alertTextMessages.YOU_HAVE_SUCCESSFULLY_REJECTED, true);
            setLoggedInUser({ ...loggedInUser });
        }
        navigation.goBack();
    })

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack]}>
            <FlatList data={userFollowerFollowing.users} keyExtractor={(item) => item.key} key={`1_${numericConstants.ONE}`}
                renderItem={({ item, index }) => UserFollowFollowingRenderer(item, index, actionCallBack)}
                contentContainerStyle={[SDGenericStyles.padding20, { paddingTop: StatusBar.currentHeight || numericConstants.FORTY_TWO }]} />
        </View>
    )
}