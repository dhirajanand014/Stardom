
import { useNavigation } from '@react-navigation/core';
import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { FlatList, View } from "react-native";
import {
    alertTextMessages,
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

    const { userPosts, setUserPosts, loader, setLoader } = useContext(CategoryContext);

    const navigation = useNavigation();

    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => [numericConstants.TWO_HUNDRED_NINETY, numericConstants.ZERO],
        jsonConstants.EMPTY);

    const bottomSheetRefCallback = node => {
        bottomSheetRef.current = node;
    };

    const fallValue = useSharedValue(numericConstants.ONE);

    useEffect(() => {
        setLoader({ ...loader, isLoading: true, loadingText: alertTextMessages.LOADING_USERS_POSTS });
        fetchUserPosts(userPosts, setUserPosts);
        setLoader({ ...loader, isLoading: false, loadingText: stringConstants.EMPTY });
    }, [!userPosts.length]);

    const postCallback = useCallback((action, item) => {
        if (action == miscMessage.CREATE) {
            bottomSheetRef?.current?.snapTo(numericConstants.ZERO);
            setAddPostStateValues(miscMessage.CREATE, userPosts, setUserPosts, stringConstants.EMPTY);
        } else if (action == miscMessage.UPDATE) {
            setLoader({ ...loader, isLoading: true });
            setAddPostStateValues(miscMessage.UPDATE, userPosts, setUserPosts, item);
            navigation.navigate(screens.ADD_POST_DETAILS, { toAction: miscMessage.UPDATE, selectedItem: item });
        }
        setLoader({ ...loader, isLoading: false, loadingText: stringConstants.EMPTY });
    })

    const postDetailsCallback = useCallback(() => {
        bottomSheetRef?.current?.snapTo(numericConstants.ONE);
    })

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack]}>
            <FlatList data={userPosts.posts} numColumns={numericConstants.THREE} keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => PostRenderer(item, postCallback)} />
            {
                userPosts.details.showBottomOptions && <BottomSheetView refCallback={bottomSheetRefCallback} bottomSheetRef={bottomSheetRef}
                    snapPoints={snapPoints} fall={fallValue} detailsCallback={postDetailsCallback} isFrom={screens.POSTS} navigation={navigation} />
            }
        </View>
    )
}