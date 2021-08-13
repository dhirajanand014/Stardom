import React, { forwardRef, useCallback, useContext, useImperativeHandle, useState } from 'react';
import { Text, View, Image, Linking, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import {
    stringConstants, postCountTypes, numericConstants
} from '../../constants/Constants';
import { downloadImageFromURL, shareImage, showProgressSnackbar } from '../../helper/Helper';
import { colors, glancePostStyles, SDGenericStyles } from '../../styles/Styles';
import { CategoryContext } from '../../App';
import { RenderLoaderScroll } from '../../views/imagePost/RenderLoaderScroll';

const post_download = require(`../../assets/post_download_icon.png`);
const post_share = require(`../../assets/post_share_icon.png`);

export const ViewUserPostDetails = forwardRef((props, ref) => {

    const { downloadProgressState, setDownloadProgressState } = useContext(CategoryContext);

    const { textPostTypeAnimationValue, textPostDescriptionAnimationValue } = props;

    const [postDetailsState, setPostDetailsState] = useState({
        currentPostIndex: numericConstants.ZERO,
        currentPost: props.posts[numericConstants.ZERO],
        animationVisible: false,
        newPostViewed: false,
        switchEnabled: true,
        scrollOffset: numericConstants.ZERO,
        renderLoaderScroll: false
    });

    useImperativeHandle(ref,
        () => ({
            postIndex: postDetailsState.currentPostIndex,
            newPostViewed: postDetailsState.newPostViewed,
            currentPost: postDetailsState.currentPost,
            scrollOffset: postDetailsState.scrollOffset,
            renderLoaderScroll: postDetailsState.renderLoaderScroll,

            setCurrentPost(index) {
                postDetailsState.currentPostIndex = index;
                postDetailsState.currentPost = props.posts[index];
                setPostDetailsState({ ...postDetailsState });
            },

            setNewPostViewed(bool) {
                setPostDetailsState({ ...postDetailsState, newPostViewed: bool });
            },

            setPostIndex(index) {
                setPostDetailsState({ ...postDetailsState, currentPostIndex: index });
            },

            setScrollOffset(value) {
                postDetailsState.scrollOffset = value;
                setPostDetailsState({ ...postDetailsState });
            },

            setRenderLoaderScroll(bool) {
                postDetailsState.renderLoaderScroll = bool;
                setPostDetailsState({ ...postDetailsState });
            },

            setPostAnimationVisible(isVisible) {
                setPostDetailsState({ ...postDetailsState, animationVisible: isVisible });
            }
        }));

    const postTypeSpringStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: textPostTypeAnimationValue.value
            }]
        };
    });

    const downloadCallback = useCallback((received, total) => {
        const value = received / total;
        if (!downloadProgressState.isDownloading.value) {
            downloadProgressState.isDownloading.value = true;
            showProgressSnackbar(value);
        }
        downloadProgressState.progressValue.value = value;
        setDownloadProgressState({ ...downloadProgressState });
    });

    const resetFlashMessage = useCallback(() => {
        downloadProgressState.isDownloading.value = false;
        downloadProgressState.progressValue.value = numericConstants.ZERO;
        setDownloadProgressState({ ...downloadProgressState });
    })

    const postDescriptionSpringStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: textPostDescriptionAnimationValue.value
            }]
        };
    });

    return (
        <React.Fragment>
            <View key={`1_${postDetailsState.currentPostIndex}_post_details`}>
                <View style={glancePostStyles.innerContainer} colors={[colors.TRANSPARENT, colors.BLACK]}>
                    <Animated.View style={[glancePostStyles.smallButtonsContainer, postDetailsState.animationVisible && postTypeSpringStyle]}>
                        <Text style={glancePostStyles.titleName}>{postDetailsState.currentPost && postDetailsState.currentPost.postTitle}</Text>
                        {
                            postDetailsState.currentPost && postDetailsState.currentPost.postLink &&
                            <TouchableOpacity activeOpacity={.5} onPress={() => Linking.openURL(postDetailsState.currentPost.postLink)}>
                                <Animated.Image style={[glancePostStyles.icon_external_link]} source={post_external_link} />
                            </TouchableOpacity>
                        }
                    </Animated.View>
                    <Animated.View style={[SDGenericStyles.alignItemsStart, SDGenericStyles.rowFlexDirection, SDGenericStyles.marginBottom8,
                    postDetailsState.animationVisible && postDescriptionSpringStyle]}>
                        <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.mt2]}>
                            <Text style={[postDetailsState.currentPost && postDetailsState.currentPost.profile.profile_name && glancePostStyles.postProfileName, SDGenericStyles.textColorWhite,
                            SDGenericStyles.fontFamilyBold, SDGenericStyles.justifyContentCenter, SDGenericStyles.ft10]}>
                                {postDetailsState.currentPost && postDetailsState.currentPost.profile && postDetailsState.currentPost.profile.profile_name.toUpperCase()}
                            </Text>
                            <Text style={[glancePostStyles.postCategoriesIn, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRoman, SDGenericStyles.justifyContentCenter, SDGenericStyles.ft10]}>{
                                postDetailsState.currentPost && postDetailsState.currentPost.profile && postDetailsState.currentPost.postCategoriesIn &&
                                stringConstants.PIPELINE_JOIN.concat(postDetailsState.currentPost && postDetailsState.currentPost.postCategoriesIn) ||
                                postDetailsState.currentPost && postDetailsState.currentPost.postCategoriesIn}
                            </Text>
                        </View>
                    </Animated.View>
                </View>
            </View>

            <View style={[SDGenericStyles.positionAbsolute, SDGenericStyles.right0, SDGenericStyles.padding10, SDGenericStyles.marginTop20]}>
                {/* <TouchableOpacity style={[glancePostStyles.backgroundRoundColor, SDGenericStyles.mv15]} activeOpacity={.7} onPress={async () =>
                    await downloadImageFromURL(postCountTypes.POST_DOWNLOADS_KEY, postDetailsState, setPostDetailsState, downloadCallback,
                        resetFlashMessage)}>
                    <Image style={glancePostStyles.icon_post_details} source={post_download} />
                </TouchableOpacity> */}
                <TouchableOpacity style={glancePostStyles.backgroundRoundColor} onPress={async () => await shareImage(postDetailsState.currentPost, resetFlashMessage)}
                    activeOpacity={.7}>
                    <Image style={glancePostStyles.icon_post_share} source={post_share} />
                </TouchableOpacity>
            </View>
            {
                postDetailsState.renderLoaderScroll && <RenderLoaderScroll />
            }
        </React.Fragment>
    )
});