import React, { forwardRef, useCallback, useContext, useImperativeHandle, useState } from 'react';
import { Text, View, Image, Linking, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import {
    stringConstants, postCountTypes, numericConstants, errorMessages, screens,
    miscMessage, jsonConstants, alertTextMessages, actionButtonTextConstants, requestConstants
} from '../../constants/Constants';
import {
    checkTokenStatus, handlePostDelete, increaseAndSetPostCounts,
    setPostDetailsStateForModal, shareImage, showSnackBar
} from '../../helper/Helper';
import { colors, glancePostStyles, SDGenericStyles } from '../../styles/Styles';
import { RenderLoaderScroll } from '../../views/imagePost/RenderLoaderScroll';
import { PostDescriptionModal } from '../../views/imagePost/PostDescriptionModal';
import { PostReportAbuseModal } from '../../views/imagePost/PostReportAbuseModal';
import { SDWallpaperModal } from '../../views/imagePost/SDWallpaperModal';
import { DeleteIcon } from '../../components/icons/DeleteIcon';
import { UserSelectionOptionModal } from '../../components/modals/UserSelectionOptionModal';
import { CategoryContext } from '../../App';
import { TabActions } from '@react-navigation/native';

const post_like = require(`../../assets/post_likes_icon.png`);
const post_like_selected = require(`../../assets/post_likes_selected_icon.png`);
const scrollToTopIcon = require(`../../assets/scroll_to_top_icon.png`);
const post_description = require(`../../assets/post_description_icon.png`);
const reportAbuseIcon = require('../../assets/post_report_abuse_icon.png');
const post_wallpaper = require(`../../assets/menu/add_wallpaper_icon.png`);
const post_share = require(`../../assets/post_share_icon.png`);

export const ViewUserPostDetails = forwardRef((props, ref) => {

    const { setLoaderCallback } = useContext(CategoryContext);

    const { textPostTypeAnimationValue, textPostDescriptionAnimationValue, viewPagerRef } = props;

    const [postDetailsState, setPostDetailsState] = useState({
        currentPostIndex: numericConstants.ZERO,
        currentPost: props.posts[numericConstants.ZERO],
        animationVisible: false,
        newPostViewed: false,
        wallpaperModal: false,
        switchEnabled: true,
        descriptionModal: false,
        scrollOffset: numericConstants.ZERO,
        renderLoaderScroll: false,
        reportAbuseModal: false,
        selectedReportAbuse: {},
        showUserOptionModal: false,
        tapVisible: true,
        reportAbuses: jsonConstants.EMPTY,
        reportAbuseSubmitDisabled: false
    });

    const post_report_abuse = require('../../assets/post_report_abuse_icon.png');
    const post_external_link = require('../../assets/post_external_link_icon.png');
    const userDetails = props.loggedInUser.isLoggedIn && JSON.parse(props.loggedInUser.loginDetails.details) || stringConstants.EMPTY;

    useImperativeHandle(ref,
        () => ({
            postIndex: postDetailsState.currentPostIndex,
            newPostViewed: postDetailsState.newPostViewed,
            currentPost: postDetailsState.currentPost,
            scrollOffset: postDetailsState.scrollOffset,
            renderLoaderScroll: postDetailsState.renderLoaderScroll,
            tapVisible: postDetailsState.tapVisible,

            setTapVisible(bool) {
                setPostDetailsState({ ...postDetailsState, tapVisible: bool });
            },

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

            setWallPaper() {
                setWallPaperModal(postDetailsState, setPostDetailsState);
            },

            setRenderLoaderScroll(bool) {
                postDetailsState.renderLoaderScroll = bool;
                setPostDetailsState({ ...postDetailsState });
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


    const resetFlashMessage = useCallback(() => {
        if (downloadProgressState) {
            downloadProgressState.isDownloading.value = false;
            downloadProgressState.progressValue.value = numericConstants.ZERO;
            setDownloadProgressState({ ...downloadProgressState });
        }
    })

    const postDescriptionSpringStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: textPostDescriptionAnimationValue.value
            }]
        };
    });

    const animationFadeStyle = useAnimatedStyle(() => {
        return {
            opacity: postDetailsState.tapVisible && withTiming(numericConstants.ONE, {
                duration: numericConstants.FIVE_HUNDRED
            }) || withTiming(numericConstants.ZERO, {
                duration: numericConstants.FIVE_HUNDRED
            })
        };
    });

    const loginCallback = useCallback(() => props.navigation.reset({ index: numericConstants.ZERO, routes: [{ name: screens.GLANCE }] }));

    const handleDelete = useCallback(async () => {
        setPostDetailsState({ ...postDetailsState, showUserOptionModal: false });
        setLoaderCallback(true, alertTextMessages.DELETING_POST);
        const responseData = await handlePostDelete(postDetailsState.currentPost.id, props.loggedInUser.loginDetails.token);
        if (responseData && responseData.message == alertTextMessages.POST_DELETED_SUCCESSFULLY) {
            props.navigation.dispatch(TabActions.jumpTo(screens.GLANCE))
        } else if (checkTokenStatus(responseData)) {
            loginCallback();
            showSnackBar(errorMessages.YOUR_SESSION_IS_EXPIRED_PLEASE_LOGIN, false, true, loginCallback);
        }
        setLoaderCallback(false);
    });

    return (
        <React.Fragment>

            <View key={`1_${postDetailsState.currentPostIndex}_post_details`}>

                <View style={glancePostStyles.innerContainer} colors={[colors.TRANSPARENT, colors.BLACK]}>
                    <Animated.View style={[glancePostStyles.smallButtonsContainer, postDetailsState.animationVisible && postTypeSpringStyle, animationFadeStyle]}>
                        {
                            postDetailsState.tapVisible &&
                            <Text style={glancePostStyles.titleName}>{postDetailsState.currentPost && postDetailsState.currentPost.postTitle}</Text>
                        }
                        {
                            postDetailsState.currentPost && postDetailsState.currentPost.postLink && postDetailsState.tapVisible &&
                            <TouchableOpacity activeOpacity={.5} onPress={() => Linking.openURL(postDetailsState.currentPost.postLink)}>
                                <Animated.Image style={[glancePostStyles.icon_external_link]} source={post_external_link} />
                            </TouchableOpacity>
                        }
                    </Animated.View>
                    <Animated.View style={[SDGenericStyles.alignItemsStart, SDGenericStyles.rowFlexDirection, SDGenericStyles.marginBottom8, animationFadeStyle,
                    postDetailsState.animationVisible && postDescriptionSpringStyle]}>
                        {
                            postDetailsState.tapVisible &&
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
                        }
                    </Animated.View>
                </View>
            </View>
            {
                postDetailsState.tapVisible &&
                <View style={[SDGenericStyles.positionAbsolute, SDGenericStyles.right0, SDGenericStyles.padding10]}>
                    <View style={SDGenericStyles.paddingTop30}>
                        <TouchableOpacity style={glancePostStyles.backgroundRoundColor} activeOpacity={.7}
                            onPress={() => {
                                ref?.current?.setPostAnimationVisible(false);
                                viewPagerRef.current.scrollTo(numericConstants.ONE);
                            }}>
                            <Image style={glancePostStyles.icon_scroll_to_top} source={scrollToTopIcon} />
                        </TouchableOpacity>
                    </View>
                    <View style={SDGenericStyles.paddingTop25}>
                        <TouchableOpacity style={glancePostStyles.backgroundRoundColor} activeOpacity={.7}
                            onPress={() => setPostDetailsStateForModal(postDetailsState, setPostDetailsState, miscMessage.POST_DESCRIPTION_MODAL_NAME)}>
                            <Image style={glancePostStyles.icon_post_description} source={post_description} />
                        </TouchableOpacity>
                    </View>
                    <View style={SDGenericStyles.paddingTop25}>
                        <TouchableOpacity style={glancePostStyles.likesBackgroundRoundColor} activeOpacity={.7}
                            onPress={async () => await increaseAndSetPostCounts(postCountTypes.POST_LIKE_KEY, postDetailsState, setPostDetailsState, postCountTypes.POST_LIKES)}>
                            <Image style={glancePostStyles.icon_post_like} source={postDetailsState.currentPost.likeAdded && post_like_selected || post_like} />
                        </TouchableOpacity>
                        <Text style={[SDGenericStyles.ft14, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.textCenterAlign, SDGenericStyles.top6]}>
                            {postDetailsState.currentPost && postDetailsState.currentPost.postLikes}
                        </Text>
                    </View>
                    <View style={SDGenericStyles.paddingTop25}>
                        <TouchableOpacity style={glancePostStyles.setWallPaperBackgroundRoundColor} activeOpacity={.7} onPress={() => setPostDetailsState({ ...postDetailsState, wallpaperModal: true })}>
                            <Image style={glancePostStyles.icon_post_details} source={post_wallpaper} />
                        </TouchableOpacity>
                        <Text style={[SDGenericStyles.ft14, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.textCenterAlign, SDGenericStyles.top8, SDGenericStyles.marginRight4]}>
                            {postDetailsState.currentPost && postDetailsState.currentPost.postWallpapers}
                        </Text>
                    </View>
                    {/* <View style={SDGenericStyles.paddingTop25}>
                        <TouchableOpacity style={glancePostStyles.backgroundRoundColor} activeOpacity={.7} onPress={async () =>
                            await downloadImageFromURL(postCountTypes.POST_DOWNLOADS_KEY, postDetailsState, setPostDetailsState, downloadCallback, resetFlashMessage)}>
                            <Image style={glancePostStyles.icon_post_details} source={post_download} />
                        </TouchableOpacity>
                        <Text style={[SDGenericStyles.ft10, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.textCenterAlign, SDGenericStyles.top1]}>
                            {postDetailsState.currentPost.postDownloads}
                        </Text>
                    </View> */}
                    <View style={SDGenericStyles.paddingTop25}>
                        <TouchableOpacity style={glancePostStyles.backgroundRoundColor} activeOpacity={.7} onPress={async () => await shareImage(postDetailsState.currentPost, resetFlashMessage, requestConstants.POST)}>
                            <Image style={glancePostStyles.icon_post_share} source={post_share} />
                        </TouchableOpacity>
                    </View>
                    <View style={SDGenericStyles.paddingTop25}>
                        <TouchableOpacity style={glancePostStyles.backgroundRoundColor_report_abuse} activeOpacity={.7}
                            onPress={() => setPostDetailsStateForModal(postDetailsState, setPostDetailsState, miscMessage.POST_REPORT_ABUSE_MODAL_NAME)}>
                            <Image style={glancePostStyles.icon_post_report_abuse} source={reportAbuseIcon} />
                        </TouchableOpacity>
                        <Text style={[SDGenericStyles.ft7, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.textCenterAlign, SDGenericStyles.top1]}>
                            {miscMessage.REPORT_ABUSE_TEXT}
                        </Text>
                    </View>
                    {
                        userDetails.id == postDetailsState.currentPost.user.id &&
                        <View style={SDGenericStyles.paddingTop25}>
                            <TouchableOpacity style={glancePostStyles.backgroundRoundColor} activeOpacity={.7} onPress={() => setPostDetailsState({ ...postDetailsState, showUserOptionModal: true })}>
                                <DeleteIcon width={numericConstants.TWENTY_EIGHT} height={numericConstants.TWENTY_EIGHT} stroke={colors.WHITE} />
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            }
            <PostDescriptionModal postDetailsState={postDetailsState} reportAbuseIcon={post_report_abuse}
                setPostDetailsState={setPostDetailsState} />
            <PostReportAbuseModal postDetailsState={postDetailsState} setPostDetailsState={setPostDetailsState} />
            <SDWallpaperModal postDetailsState={postDetailsState} reportAbuseIcon={post_report_abuse}
                setPostDetailsState={setPostDetailsState} />
            <UserSelectionOptionModal bottomSheetState={postDetailsState} setBottomSheetState={setPostDetailsState} textMessage={alertTextMessages.DELETE_USER_POST_IMAGE}
                successButton={actionButtonTextConstants.YES.toUpperCase()} handleSubmit={handleDelete} />
            {
                postDetailsState.renderLoaderScroll && <RenderLoaderScroll />
            }
        </React.Fragment>
    )
});