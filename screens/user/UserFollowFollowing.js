import { useRoute } from '@react-navigation/core';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StatusBar, View } from "react-native"
import { CategoryContext } from '../../App';
import { jsonConstants, numericConstants, stringConstants } from '../../constants/Constants';
import { fetchUserFollowersFollowing } from '../../helper/Helper';
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

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack]}>
            <FlatList data={userFollowerFollowing.users} keyExtractor={(item) => item.key} key={`1_${numericConstants.ONE}`}
                renderItem={({ item, index }) => UserFollowFollowingRenderer(item, index)}
                contentContainerStyle={[SDGenericStyles.padding20, { paddingTop: StatusBar.currentHeight || numericConstants.FORTY_TWO }]} />
        </View>
    )
}