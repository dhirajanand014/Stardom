import React, { forwardRef, useCallback, useContext, useImperativeHandle, useState } from 'react';
import { Text, View, Image, Linking, TouchableOpacity, Switch } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { PostSearch } from '../../views/imagePost/PostSearch';
import {
    stringConstants, postCountTypes, numericConstants, miscMessage, jsonConstants,
    postitionStringConstants, colorConstants, fieldControllerName, width, height
} from '../../constants/Constants';
import {
    increaseAndSetPostCounts, setPostDetailsStateForModal,
    downloadImageFromURL, shareImage, showProgressSnackbar
} from '../../helper/Helper';
import { glancePostStyles, SDGenericStyles } from '../../styles/Styles';
import ActionButton from '@logvinme/react-native-action-button';
import { PostDescriptionModal } from '../../views/imagePost/PostDescriptionModal';
import { PostReportAbuseModal } from '../../views/imagePost/PostReportAbuseModal';
import { SDWallpaperModal } from '../../views/imagePost/SDWallpaperModal';
import { CategoryContext } from '../../App';
import { RenderLoaderScroll } from '../../views/imagePost/RenderLoaderScroll';

const post_like = require(`../../assets/post_likes_icon.png`);
const post_like_selected = require(`../../assets/post_likes_selected_icon.png`);
const post_description = require(`../../assets/post_description_icon.png`);
const reportAbuseIcon = require('../../assets/post_report_abuse_icon.png');
const post_wallpaper = require(`../../assets/menu/add_wallpaper_icon.png`);
const post_download = require(`../../assets/post_download_icon.png`);
const post_share = require(`../../assets/post_share_icon.png`);

export const PostDetails = forwardRef((props, ref) => {

    const { textPostTypeAnimationValue, viewPagerRef, textPostDescriptionAnimationValue } = props;

    const { downloadProgressState, setDownloadProgressState, sdomDatastate, optionsState } = useContext(CategoryContext);

    const [postDetailsState, setPostDetailsState] = useState({
        currentPostIndex: numericConstants.ZERO,
        currentPost: sdomDatastate.posts[numericConstants.ZERO],
        animationVisible: false,
        switchEnabled: true,
        newPostViewed: false,
        wallpaperModal: false,
        descriptionModal: false,
        reportAbuseModal: false,
        selectedReportAbuse: {},
        reportAbuses: jsonConstants.EMPTY,
        reportAbuseSubmitDisabled: false,
        scrollOffset: numericConstants.ZERO,
        renderLoaderScroll: false
    });

    const post_report_abuse = require('../../assets/post_report_abuse_icon.png');
    const post_external_link = require('../../assets/post_external_link_icon.png');

    useImperativeHandle(ref,
        () => ({
            postIndex: postDetailsState.currentPostIndex,
            newPostViewed: postDetailsState.newPostViewed,
            currentPost: postDetailsState.currentPost,
            scrollOffset: postDetailsState.scrollOffset,
            renderLoaderScroll: postDetailsState.renderLoaderScroll,
            switchEnabled: postDetailsState.switchEnabled,

            setSwitchEnabled(bool) {
                setPostDetailsState({ ...postDetailsState, switchEnabled: bool });
            },

            setNewPostViewed(bool) {
                setPostDetailsState({ ...postDetailsState, newPostViewed: bool });
            },

            setCurrentPost(index) {
                postDetailsState.currentPostIndex = index;
                postDetailsState.currentPost = sdomDatastate.posts[index];
                setPostDetailsState({ ...postDetailsState });
            },

            setScrollOffset(value) {
                postDetailsState.scrollOffset = value;
                setPostDetailsState({ ...postDetailsState });
            },

            setRenderLoaderScroll(bool) {
                postDetailsState.renderLoaderScroll = bool;
                setPostDetailsState({ ...postDetailsState });
            },

            setPostIndex(index) {
                setPostDetailsState({ ...postDetailsState, currentPostIndex: index });
            },

            setWallPaper() {
                setWallPaperModal(postDetailsState, setPostDetailsState);
            },

            setPostAnimationVisible(isVisible) {
                setPostDetailsState({ ...postDetailsState, animationVisible: isVisible });
            }
        }));

    const setWallPaperModal = useCallback((postDetailsState, setPostDetailsState) => {
        setPostDetailsState({ ...postDetailsState, wallpaperModal: true });
    });

    const postTypeSpringStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: textPostTypeAnimationValue.value
            }]
        };
    });

    // const downloadCallback = useCallback((received, total) => {
    //     if (downloadProgressState) {
    //         const value = received / total;
    //         if (!downloadProgressState.isDownloading.value) {
    //             downloadProgressState.isDownloading.value = true;
    //             showProgressSnackbar(value);
    //         }
    //         downloadProgressState.progressValue.value = value;
    //         setDownloadProgressState({ ...downloadProgressState });
    //     }
    // });

    // const resetFlashMessage = useCallback(() => {
    //     if (downloadProgressState) {
    //         downloadProgressState.isDownloading.value = false;
    //         downloadProgressState.progressValue.value = numericConstants.ZERO;
    //         setDownloadProgressState({ ...downloadProgressState });
    //     }
    // });

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
                <View style={glancePostStyles.innerContainer}>
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
                        <View>
                            <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.alignItemsCenter]}>
                                <Text style={[postDetailsState.currentPost && postDetailsState.currentPost.user.name && glancePostStyles.postProfileNameBy, SDGenericStyles.textColorWhite,
                                SDGenericStyles.fontFamilyItalicRegular, SDGenericStyles.justifyContentCenter, SDGenericStyles.ft14]}>
                                    {miscMessage.BY_TEXT}
                                </Text>
                                <Text style={[postDetailsState.currentPost && postDetailsState.currentPost.user.name && glancePostStyles.postProfileName, SDGenericStyles.textColorWhite,
                                SDGenericStyles.fontFamilyRobotoBold, SDGenericStyles.justifyContentCenter, SDGenericStyles.ft12]}>
                                    {postDetailsState.currentPost && postDetailsState.currentPost.user.name && postDetailsState.currentPost.user.name}
                                </Text>
                                {
                                    postDetailsState.currentPost && postDetailsState.currentPost.user.user_type == miscMessage.VERIFIED_AUTHOR &&
                                    <View>
                                        <Image style={glancePostStyles.verifiedIconStyle} source={require(`../../assets/verified_icon.gif`)} />
                                    </View>
                                }
                            </View>
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
                        </View>
                    </Animated.View>
                </View>
            </View>
            <View style={glancePostStyles.searchIconContainer}>
                {
                    optionsState.showSearch &&
                    <PostSearch sdomDatastate={sdomDatastate} viewPagerRef={viewPagerRef} postDetailsRef={ref} />
                }
            </View>
            <ActionButton buttonColor={colorConstants.TRANSPARENT_BUTTON} backgroundTappable={true} size={numericConstants.TWENTY_EIGHT} useNativeFeedback={false} degrees={numericConstants.ZERO}
                verticalOrientation={postitionStringConstants.DOWN} position={postitionStringConstants.RIGHT} offsetX={numericConstants.TEN} offsetY={numericConstants.THIRTY_EIGHT} hideShadow={true}
                autoInactive={false} spacing={numericConstants.THIRTY_EIGHT} active={postDetailsState.switchEnabled} renderIcon={(isActive) =>
                    <Switch trackColor={{ false: colorConstants.GREY, true: colorConstants.YELLOW }}
                        thumbColor={isActive ? colorConstants.WHITE : colorConstants.WHITE}
                        style={{ transform: [{ scaleX: .85 }, { scaleY: .85 }] }} value={postDetailsState.switchEnabled}
                        onValueChange={() => setPostDetailsState({ ...postDetailsState, switchEnabled: !isActive })} />
                }>
                <ActionButton.Item buttonColor={colorConstants.TRANSPARENT_BUTTON} hideLabelShadow={true}
                    useNativeFeedback={false} onPress={() => setPostDetailsStateForModal(postDetailsState, setPostDetailsState, miscMessage.POST_DESCRIPTION_MODAL_NAME)}>
                    <View style={glancePostStyles.backgroundRoundColor_description}>
                        <Image style={glancePostStyles.icon_post_description} source={post_description} />
                    </View>
                </ActionButton.Item>
                <ActionButton.Item buttonColor={colorConstants.TRANSPARENT_BUTTON} hideLabelShadow={true} fixNativeFeedbackRadius={true}
                    onPress={async () => await increaseAndSetPostCounts(postCountTypes.POST_LIKE_KEY, postDetailsState, setPostDetailsState,
                        postCountTypes.POST_LIKES)}>
                    <View style={glancePostStyles.likesBackgroundRoundColor}>
                        <Image style={glancePostStyles.icon_post_like} source={postDetailsState.currentPost.likeAdded &&
                            post_like_selected || post_like} />
                    </View>
                    <Text style={[SDGenericStyles.ft14, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium,
                    SDGenericStyles.textCenterAlign, SDGenericStyles.top6]}>{postDetailsState.currentPost && postDetailsState.currentPost.postLikes}</Text>
                </ActionButton.Item>
                <ActionButton.Item buttonColor={colorConstants.TRANSPARENT_BUTTON} fixNativeFeedbackRadius={true} onPress={() =>
                    setPostDetailsState({ ...postDetailsState, wallpaperModal: true })}>
                    <View style={glancePostStyles.setWallPaperBackgroundRoundColor}>
                        <Image style={glancePostStyles.icon_post_details} source={post_wallpaper} />
                    </View>
                    <Text style={[SDGenericStyles.ft14, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium,
                    SDGenericStyles.textCenterAlign, SDGenericStyles.top8, SDGenericStyles.marginRight4]}>
                        {postDetailsState.currentPost && postDetailsState.currentPost.postWallpapers}</Text>
                </ActionButton.Item>
                {/* <ActionButton.Item buttonColor={colorConstants.TRANSPARENT_BUTTON} fixNativeFeedbackRadius={true} onPress={async () =>
                    await downloadImageFromURL(postCountTypes.POST_DOWNLOADS_KEY, postDetailsState, setPostDetailsState, downloadCallback,
                        resetFlashMessage)}>
                    <View style={glancePostStyles.backgroundRoundColor}>
                        <Image style={glancePostStyles.icon_post_details} source={post_download} />
                    </View>
                    <Text style={[SDGenericStyles.ft10, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium,
                    SDGenericStyles.textCenterAlign, SDGenericStyles.top1]}>{postDetailsState.currentPost.postDownloads}</Text>
                </ActionButton.Item> */}
                <ActionButton.Item buttonColor={colorConstants.TRANSPARENT_BUTTON} fixNativeFeedbackRadius={true}
                    onPress={async () => await shareImage(postDetailsState.currentPost, resetFlashMessage)}>
                    <View style={glancePostStyles.backgroundRoundColor}>
                        <Image style={glancePostStyles.icon_post_share} source={post_share} />
                    </View>
                </ActionButton.Item>
                <ActionButton.Item buttonColor={colorConstants.TRANSPARENT_BUTTON} hideLabelShadow={true}
                    useNativeFeedback={false} onPress={() => setPostDetailsStateForModal(postDetailsState, setPostDetailsState, miscMessage.POST_REPORT_ABUSE_MODAL_NAME)}>
                    <View style={glancePostStyles.backgroundRoundColor_report_abuse}>
                        <Image style={glancePostStyles.icon_post_report_abuse} source={reportAbuseIcon} />
                    </View>
                    <Text style={[SDGenericStyles.ft7, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium,
                    SDGenericStyles.textCenterAlign, SDGenericStyles.top1]}>{miscMessage.REPORT_ABUSE_TEXT}</Text>
                </ActionButton.Item>
            </ActionButton>
            <PostDescriptionModal postDetailsState={postDetailsState} reportAbuseIcon={post_report_abuse}
                setPostDetailsState={setPostDetailsState} />
            <PostReportAbuseModal postDetailsState={postDetailsState} setPostDetailsState={setPostDetailsState} />
            <SDWallpaperModal postDetailsState={postDetailsState} reportAbuseIcon={post_report_abuse}
                setPostDetailsState={setPostDetailsState} />
            {
                postDetailsState.renderLoaderScroll && <RenderLoaderScroll />
            }
        </React.Fragment>
    )
});