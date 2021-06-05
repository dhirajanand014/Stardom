import React, { forwardRef, useCallback, useContext, useImperativeHandle, useState } from 'react';
import { Text, View, Image, Linking, TouchableOpacity, Switch } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { PostSearch } from '../../views/imagePost/PostSearch';
import {
    stringConstants, postCountTypes, numericConstants, postitionStringConstants, colorConstants, permissionsButtons, miscMessage
} from '../../constants/Constants';
import {
    postWallPaperAlert, increaseAndSetPostCounts,
    downloadImageFromURL, setOptionsStateForDescription, shareImage, showProgressSnackbar
} from '../../helper/Helper';
import { colors, glancePostStyles, SDGenericStyles } from '../../styles/Styles';
import ActionButton from '@logvinme/react-native-action-button';
import LinearGradient from 'react-native-linear-gradient';
import { VerifiedAuthorBadgeIcon } from '../../components/icons/VerifiedAuthorBadgeIcon';
import { CategoryContext } from '../../App';

const post_like = require(`../../assets/post_likes_heart_arrow_icon.png`);
const post_like_selected = require(`../../assets/post_likes_heart_arrow_icon_selected.png`);
const post_description = require(`../../assets/post_description_icon.png`);
const post_wallpaper = require(`../../assets/post_set_wallpaper_icon.png`);
const post_download = require(`../../assets/post_download_icon.png`);
const post_share = require(`../../assets/post_share.png`);

export const PostDetails = forwardRef((props, ref) => {

    const { textPostTypeAnimationValue, viewPagerRef, width, height, textPostDescriptionAnimationValue } = props;

    const { downloadProgressState, setDownloadProgressState, sdomDatastate, optionsState, setOptionsState } = useContext(CategoryContext);

    const post_external_link = require('../../assets/post_external_link_icon.png');

    const [postDetailsState, setPostDetailsState] = useState({
        currentPostIndex: numericConstants.ZERO,
        currentPost: sdomDatastate.posts[numericConstants.ZERO],
        animationVisible: false,
        switchEnabled: true,
        newPostViewed: false,
    });

    useImperativeHandle(ref,
        () => ({
            postIndex: postDetailsState.currentPostIndex,
            newPostViewed: postDetailsState.newPostViewed,
            currentPost: postDetailsState.currentPost,

            setNewPostViewed(bool) {
                setPostDetailsState({ ...postDetailsState, newPostViewed: bool });
            },

            setCurrentPost(index) {
                postDetailsState.currentPostIndex = index;
                postDetailsState.currentPost = sdomDatastate.posts[index];
                setPostDetailsState({ ...postDetailsState });
            },

            setPostIndex(index) {
                setPostDetailsState({ ...postDetailsState, currentPostIndex: index });
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
            <View key={`1_${postDetailsState.currentPostIndex}_${postDetailsState.currentPost.categoryId}_post_details`}>
                <LinearGradient style={glancePostStyles.innerContainer} colors={[colors.TRANSPARENT, colors.BLACK]}>
                    <Animated.View style={[glancePostStyles.smallButtonsContainer, postDetailsState.animationVisible && postTypeSpringStyle]}>
                        <Text style={glancePostStyles.titleName}>{postDetailsState.currentPost.postTitle}</Text>
                        {
                            postDetailsState.currentPost.postLink &&
                            <TouchableOpacity style={SDGenericStyles.width38} onPress={() => Linking.openURL(postDetailsState.currentPost.postLink)}>
                                <Animated.Image style={[glancePostStyles.icon_external_link]} source={post_external_link} />
                            </TouchableOpacity>
                        }
                    </Animated.View>
                    <Animated.View style={[glancePostStyles.postTitleAndProfileStyle, SDGenericStyles.marginBottom8,
                    postDetailsState.animationVisible && postDescriptionSpringStyle]}>
                        <Text style={[postDetailsState.currentPost.profileName && glancePostStyles.postProfileName, SDGenericStyles.textColorWhite,
                        SDGenericStyles.fontFamilyBold, SDGenericStyles.justifyContentCenter, SDGenericStyles.ft9]}>
                            {postDetailsState.currentPost.profileName && postDetailsState.currentPost.profileName.toUpperCase()}
                        </Text>
                        <View>
                            <View style={SDGenericStyles.rowFlexDirection}>
                                <Text style={[postDetailsState.currentPost.user.name && glancePostStyles.postProfileName, SDGenericStyles.textColorWhite,
                                SDGenericStyles.fontFamilyRoman, SDGenericStyles.justifyContentCenter, SDGenericStyles.ft12]}>
                                    {`by`}
                                </Text>
                                <Text style={[postDetailsState.currentPost.user.name && glancePostStyles.postProfileName, SDGenericStyles.textColorWhite,
                                SDGenericStyles.fontFamilyRoman, SDGenericStyles.justifyContentCenter, SDGenericStyles.ft12]}>
                                    {postDetailsState.currentPost.user.name && postDetailsState.currentPost.user.name}
                                </Text>
                                {
                                    postDetailsState.currentPost.user.user_type == miscMessage.VERIFIED_AUTHOR &&
                                    <View>
                                        <VerifiedAuthorBadgeIcon width={numericConstants.TEN} height={numericConstants.TEN} />
                                    </View>
                                }
                            </View>
                            <View style={SDGenericStyles.marginTop8}>
                                <Text style={[glancePostStyles.postCategoriesIn, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRoman,
                                SDGenericStyles.justifyContentCenter, SDGenericStyles.ft12]}>{
                                        postDetailsState.currentPost.profileName && postDetailsState.currentPost.postCategoriesIn &&
                                        stringConstants.PIPELINE_JOIN.concat(postDetailsState.currentPost.postCategoriesIn) ||
                                        postDetailsState.currentPost.postCategoriesIn}
                                </Text>
                            </View>
                        </View>
                    </Animated.View>
                </LinearGradient>
            </View>
            <View style={glancePostStyles.searchIconContainer}>
                {
                    optionsState.showSearch &&
                    <PostSearch sdomDatastate={sdomDatastate} screenWidth={width} screenHeight={height}
                        optionsState={optionsState} setOptionsState={setOptionsState} viewPagerRef={viewPagerRef}
                        post={postDetailsState.currentPost} postDetailsRef={ref} />
                }
            </View>
            <ActionButton buttonColor={colorConstants.TRANSPARENT_BUTTON} backgroundTappable={true} size={numericConstants.TWENTY_EIGHT} useNativeFeedback={false} degrees={numericConstants.ZERO}
                verticalOrientation={postitionStringConstants.DOWN} position={postitionStringConstants.RIGHT} offsetX={numericConstants.TEN} offsetY={numericConstants.THIRTEEN} hideShadow={true}
                autoInactive={false} active={postDetailsState.switchEnabled} renderIcon={(isActive) =>
                    <Switch trackColor={{ false: colorConstants.GREY, true: colorConstants.YELLOW }}
                        thumbColor={isActive ? colorConstants.WHITE : colorConstants.WHITE}
                        style={{ transform: [{ scaleX: .85 }, { scaleY: .85 }] }} value={postDetailsState.switchEnabled}
                        onValueChange={() => setPostDetailsState({ ...postDetailsState, switchEnabled: !isActive })} />
                }>
                <ActionButton.Item buttonColor={colorConstants.TRANSPARENT_BUTTON} hideLabelShadow={true}
                    useNativeFeedback={false} onPress={() => setOptionsStateForDescription(optionsState, setOptionsState,
                        postDetailsState.currentPost, postDetailsState, setPostDetailsState)}>
                    <View style={glancePostStyles.backgroundRoundColor_description}>
                        <Image style={glancePostStyles.icon_post_description} source={post_description} />
                    </View>
                </ActionButton.Item>
                <ActionButton.Item buttonColor={colorConstants.TRANSPARENT_BUTTON} hideLabelShadow={true} fixNativeFeedbackRadius={true}
                    useNativeFeedback={!postDetailsState.currentPost.likeDisabled} onPress={async () => !postDetailsState.currentPost.likeDisabled &&
                        await increaseAndSetPostCounts(postCountTypes.POST_LIKE_KEY, postDetailsState, setPostDetailsState,
                            postCountTypes.POST_LIKES)}>
                    <View style={glancePostStyles.backgroundRoundColor} pointerEvents={postDetailsState.currentPost.likeDisabled &&
                        permissionsButtons.NONE || permissionsButtons.AUTO}>
                        <Image style={glancePostStyles.icon_post_like} source={postDetailsState.currentPost.likeDisabled &&
                            post_like_selected || post_like} />
                    </View>
                    <Text style={glancePostStyles.icon_count_text}>{postDetailsState.currentPost.postLikes}</Text>
                </ActionButton.Item>
                <ActionButton.Item buttonColor={colorConstants.TRANSPARENT_BUTTON} fixNativeFeedbackRadius={true} onPress={async () =>
                    await postWallPaperAlert(postCountTypes.POST_WALLPAPERS_KEY, postDetailsState, setPostDetailsState)}>
                    <View style={glancePostStyles.backgroundRoundColor}>
                        <Image style={glancePostStyles.icon_post_details} source={post_wallpaper} />
                    </View>
                    <Text style={glancePostStyles.icon_count_text}>{postDetailsState.currentPost.postWallpapers}</Text>
                </ActionButton.Item>
                <ActionButton.Item buttonColor={colorConstants.TRANSPARENT_BUTTON} fixNativeFeedbackRadius={true} onPress={async () =>
                    await downloadImageFromURL(postCountTypes.POST_DOWNLOADS_KEY, postDetailsState, setPostDetailsState, downloadCallback,
                        resetFlashMessage)}>
                    <View style={glancePostStyles.backgroundRoundColor}>
                        <Image style={glancePostStyles.icon_post_details} source={post_download} />
                    </View>
                    <Text style={glancePostStyles.icon_count_text}>{postDetailsState.currentPost.postDownloads}</Text>
                </ActionButton.Item>
                <ActionButton.Item buttonColor={colorConstants.TRANSPARENT_BUTTON} fixNativeFeedbackRadius={true}
                    onPress={async () => await shareImage(postDetailsState.currentPost, downloadCallback, resetFlashMessage)}>
                    <View style={glancePostStyles.backgroundRoundColor}>
                        <Image style={glancePostStyles.icon_post_share} source={post_share} />
                    </View>
                </ActionButton.Item>
            </ActionButton>
        </React.Fragment >
    )
});