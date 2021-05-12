import { useRoute } from '@react-navigation/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FlatList, StatusBar, View } from "react-native"
import { CategoryContext } from '../../App';
import { alertTextMessages, jsonConstants, numericConstants, requestConstants, responseStringData, stringConstants } from '../../constants/Constants';
import { fetchUserFollowersFollowing, showSnackBar, userPostAction } from '../../helper/Helper';
import { SDGenericStyles } from '../../styles/Styles';
import { UserFollowFollowingRenderer } from '../../views/menus/UserFollowFollowingRenderer';

export const UserFollowFollowing = () => {

    const [userFollowerFollowing, setUserFollowerFollowing] = useState({
        users: jsonConstants.EMPTY
    });

    const { loggedInUser } = useContext(CategoryContext);

    const route = useRoute();
    const listFor = route.params?.listFor || stringConstants.EMPTY;

    useEffect(async () => {
        const responseData = await fetchUserFollowersFollowing(listFor, loggedInUser);
        setUserFollowerFollowing(responseData);
    }, jsonConstants.EMPTY);

    const actionCallBack = useCallback(async (id, action) => {
        const requestData = { [requestConstants.FOLLOWER_ID]: id, [requestConstants.APPROVAL_ACTION]: action };
        const requestJSON = JSON.stringify(requestData);
        const responseData = await userPostAction(requestConstants.PRIVATE_ACCESS_ACTION, requestJSON,
            loggedInUser.loginDetails.token);

        if (responseData.message == responseStringData.SUCCESSFULLY_UPDATED) {
            showSnackBar(action == actionButtonTextConstants.APPROVE && alertTextMessages.YOU_HAVE_SUCCESSFULLY_APPROVED ||
                alertTextMessages.YOU_HAVE_SUCCESSFULLY_REJECT)
        }
    })

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack]}>
            <FlatList data={userFollowerFollowing.users} keyExtractor={(item) => item.key} key={`1_${numericConstants.ONE}`}
                renderItem={({ item, index }) => UserFollowFollowingRenderer(item, index, actionCallBack)}
                contentContainerStyle={[SDGenericStyles.padding20, { paddingTop: StatusBar.currentHeight || numericConstants.FORTY_TWO }]} />
        </View>
    )
}