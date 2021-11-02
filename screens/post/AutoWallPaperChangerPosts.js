import React, { useEffect, useState } from 'react';
import { FlatList, View } from "react-native";
import { useCallback } from 'react/cjs/react.development';
import { ConfirmationModal } from '../../components/modals/ConfirmationModal';
import { actionButtonTextConstants, alertTextMessages, jsonConstants, numericConstants, stringConstants } from '../../constants/Constants';
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
    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack]}>
            <FlatList data={autoWallPaperChangerPosts.posts} numColumns={numericConstants.THREE} keyExtractor={(item) => item.postId}
                renderItem={({ item }) => <WallPaperChangerPostRenderer item={item} postCallback={postCallback} />} />
            <ConfirmationModal state={autoWallPaperChangerPosts} setState={setAutoWallPaperChangerPosts} confirmationMessage={alertTextMessages.DELETING_WALLPAPER_CHANGER_POST}
                confirmationButtonText={actionButtonTextConstants.YES} confirmationCallback={confrimationCallback} resetModal={resetModal} />
        </View>
    )
}