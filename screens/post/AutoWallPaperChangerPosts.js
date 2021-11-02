import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, Text, View } from "react-native";
import { ConfirmationModal } from '../../components/modals/ConfirmationModal';
import {
    actionButtonTextConstants, alertTextMessages,
    jsonConstants, miscMessage, numericConstants, stringConstants
} from '../../constants/Constants';
import { getWallPapersList, updateWallPaperPosts } from '../../helper/Helper';
import { SDGenericStyles } from '../../styles/Styles';
import { WallPaperChangerPostRenderer } from '../../views/imagePost/WallPaperChangerPostRenderer';

export const AutoWallPaperChangerPosts = props => {
    const [autoWallPaperChangerPosts, setAutoWallPaperChangerPosts] = useState({
        posts: jsonConstants.EMPTY,
        selectedPost: stringConstants.EMPTY,
        showConfirmationModal: false
    });

    useEffect(() => {
        (async () => {
            await getWallPapersList(autoWallPaperChangerPosts, setAutoWallPaperChangerPosts);
        })();
    }, jsonConstants.EMPTY);

    const resetModal = useCallback(() => setAutoWallPaperChangerPosts({ ...autoWallPaperChangerPosts, selectedPost: stringConstants.EMPTY, showConfirmationModal: false }));
    const postCallback = useCallback((item) => setAutoWallPaperChangerPosts({ ...autoWallPaperChangerPosts, selectedPost: item, showConfirmationModal: true }));
    const confrimationCallback = useCallback(async () => updateWallPaperPosts(autoWallPaperChangerPosts, setAutoWallPaperChangerPosts));

    const emptyListMessage = () => {
        return (
            <View style={[SDGenericStyles.fill, SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter]}>
                <Text style={[SDGenericStyles.ft18, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.placeHolderTextColor,
                SDGenericStyles.textCenterAlign, SDGenericStyles.paddingTop80]}>
                    {alertTextMessages.NO_POSTS}
                </Text>
            </View>
        )
    }

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack]}>
            {
                autoWallPaperChangerPosts.posts.length > numericConstants.ZERO &&
                <Text style={[SDGenericStyles.ft16, SDGenericStyles.alignSelfEnd, SDGenericStyles.padding10, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.textColorWhite]}>
                    {miscMessage.WALLPAPER_POSTS_COUNT}{stringConstants.SEMI_COLON}{stringConstants.SPACE}{autoWallPaperChangerPosts.posts.length}
                </Text>
            }
            <FlatList data={autoWallPaperChangerPosts.posts} numColumns={numericConstants.THREE} keyExtractor={(item) => item.postId} ListEmptyComponent={emptyListMessage}
                renderItem={({ item }) => <WallPaperChangerPostRenderer item={item} postCallback={postCallback} />} />
            <ConfirmationModal state={autoWallPaperChangerPosts} setState={setAutoWallPaperChangerPosts} confirmationMessage={alertTextMessages.DELETING_WALLPAPER_CHANGER_POST}
                confirmationButtonText={actionButtonTextConstants.YES} confirmationCallback={confrimationCallback} resetModal={resetModal} />
        </View>
    )
}