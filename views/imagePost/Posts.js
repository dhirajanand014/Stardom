
import { useNavigation } from '@react-navigation/core';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, InteractionManager, View } from "react-native";
import {
    alertTextMessages, miscMessage,
    numericConstants, screens, stringConstants
} from '../../constants/Constants';

import { fetchUserPosts, setAddPostStateValues } from '../../helper/Helper';
import { SDGenericStyles } from '../../styles/Styles';
import { PostRenderer } from './PostRenderer';
import { useCallback } from 'react';
import { CategoryContext } from '../../App';
import { AddPostSelectionModal } from '../../components/modals/AddPostSelectionModal';

export const Posts = props => {

    const { userPosts, setUserPosts, setLoaderCallback } = useContext(CategoryContext);

    const navigation = useNavigation();

    const [showSelection, setShowSelection] = useState(false);

    useEffect(() => {
        setLoaderCallback(true, alertTextMessages.LOADING_USERS_POSTS);
        fetchUserPosts(userPosts, setUserPosts);
        setLoaderCallback(false);
    }, [!userPosts.length]);

    const postCallback = useCallback((action, item) => {
        if (action == miscMessage.CREATE) {
            setShowSelection(true);
            setAddPostStateValues(miscMessage.CREATE, userPosts, setUserPosts, stringConstants.EMPTY);
        } else if (action == miscMessage.UPDATE) {
            setLoaderCallback(true);
            setAddPostStateValues(miscMessage.UPDATE, userPosts, setUserPosts, item);
            InteractionManager.runAfterInteractions(() =>
                navigation.navigate(screens.ADD_POST_DETAILS, { toAction: miscMessage.UPDATE, selectedItem: item })
            );
        }
        setLoaderCallback(false);
    });

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack]}>
            <FlatList data={userPosts.posts} numColumns={numericConstants.THREE} keyExtractor={(item) => item.id}
                renderItem={({ item }) => <PostRenderer item={item} postCallback={postCallback} />} />
            <AddPostSelectionModal isFrom={screens.POSTS} navigation={navigation} setShowSelection={setShowSelection}
                showSelection={showSelection} />
        </View>
    )
}