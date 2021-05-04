
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, View } from "react-native";
import { jsonConstants, miscMessage, numericConstants, stringConstants } from '../../constants/Constants';
import AddPostConstant from '../../constants/AddPostConstant.json';
import { fetchUserPosts } from '../../helper/Helper';
import { SDGenericStyles } from '../../styles/Styles';
import { PostRenderer } from './PostRenderer';
import { useCallback } from 'react';
import { BottomSheetView } from '../bottomSheet/BottomSheetView';
import { useSharedValue } from 'react-native-reanimated';

export const Posts = props => {

    const navigation = useNavigation();

    const [userPosts, setUserPosts] = useState({
        posts: [AddPostConstant] || jsonConstants.EMPTY
    })

    const [addPost, setAddPost] = useState({
        capturedImage: stringConstants.EMPTY,
        showDetails: false,
        showBottomOptions: true
    });

    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => [numericConstants.THREE_HUNDRED_THIRTY, numericConstants.ZERO],
        jsonConstants.EMPTY);

    const bottomSheetRefCallback = node => {
        bottomSheetRef.current = node;
    };

    const fallValue = useSharedValue(numericConstants.ONE);

    useEffect(() => {
        fetchUserPosts(userPosts, setUserPosts);
    }, []);

    const addPostCallBack = useCallback(() => {
        bottomSheetRef?.current?.snapTo(numericConstants.ZERO)
    })

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack]}>
            <FlatList data={userPosts.posts} numColumns={numericConstants.THREE} keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => PostRenderer(item, index, addPostCallBack, navigation)} />
            {
                addPost.showBottomOptions && <BottomSheetView refCallback={bottomSheetRefCallback} bottomSheetRef={bottomSheetRef} snapPoints={snapPoints}
                    fall={fallValue} addPost={addPost} setAddPost={setAddPost} isFrom={miscMessage.ADD_POST} navigation={navigation} />
            }
        </View>
    )
}