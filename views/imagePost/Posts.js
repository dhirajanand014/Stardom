
import { useNavigation } from '@react-navigation/core';
import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { FlatList, View } from "react-native";
import {
    jsonConstants, miscMessage,
    numericConstants, screens, stringConstants
} from '../../constants/Constants';

import { fetchUserPosts, setAddPostStateValues } from '../../helper/Helper';
import { SDGenericStyles } from '../../styles/Styles';
import { PostRenderer } from './PostRenderer';
import { useCallback } from 'react';
import { BottomSheetView } from '../bottomSheet/BottomSheetView';
import { useSharedValue } from 'react-native-reanimated';
import { CategoryContext } from '../../App';

export const Posts = props => {

    const { userPosts, addPost, setAddPost, setUserPosts } = useContext(CategoryContext);

    const navigation = useNavigation();

    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => [numericConstants.THREE_HUNDRED_THIRTY, numericConstants.ZERO],
        jsonConstants.EMPTY);

    const bottomSheetRefCallback = node => {
        bottomSheetRef.current = node;
    };

    const fallValue = useSharedValue(numericConstants.ONE);

    useEffect(() => {
        fetchUserPosts(userPosts, setUserPosts);
    }, [!userPosts.length]);

    const postCallback = useCallback((action, item) => {
        if (action == miscMessage.CREATE) {
            bottomSheetRef?.current?.snapTo(numericConstants.ZERO);
            setAddPostStateValues(miscMessage.CREATE, addPost, setAddPost, stringConstants.EMPTY);
        } else if (action == miscMessage.UPDATE) {
            setAddPostStateValues(miscMessage.UPDATE, addPost, setAddPost, item);
            navigation.navigate(screens.ADD_POST_DETAILS, { toAction: miscMessage.UPDATE, selectedItem: item });
        }
    })

    const postDetailsCallback = useCallback((action) => {
        bottomSheetRef?.current?.snapTo(numericConstants.ONE);
        navigation.navigate(screens.ADD_POST_DETAILS);
    })

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack]}>
            <FlatList data={userPosts.posts} numColumns={numericConstants.THREE} keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => PostRenderer(item, postCallback)} />
            {
                addPost.showBottomOptions && <BottomSheetView refCallback={bottomSheetRefCallback} bottomSheetRef={bottomSheetRef}
                    snapPoints={snapPoints} fall={fallValue} addPost={addPost} setAddPost={setAddPost} postDetailsCallback={postDetailsCallback} />
            }
        </View>
    )
}