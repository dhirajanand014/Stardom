import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { Text, View, Image, Linking, TouchableOpacity, Switch } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { PostSearch } from '../../views/imagePost/PostSearch';
import {
    stringConstants, postCountTypes, numericConstants, screens,
    postitionStringConstants, colorConstants, permissionsButtons, alertTextMessages, miscMessage
} from '../../constants/Constants';
import {
    postWallPaperAlert, increaseAndSetPostCounts,
    downloadImageFromURL, setOptionsStateForDescription, shareImage
} from '../../helper/Helper';
import { colors, glancePostStyles, SDGenericStyles } from '../../styles/Styles';
import ActionButton from '@logvinme/react-native-action-button';
import LinearGradient from 'react-native-linear-gradient';
import { VerifiedAuthorBadgeIcon } from '../../components/icons/VerifiedAuthorBadgeIcon';

const post_like = require(`../../assets/post_likes_heart_arrow_icon.png`);
const post_like_selected = require(`../../assets/post_likes_heart_arrow_icon_selected.png`);
const post_description = require(`../../assets/post_description_icon.png`);
const post_wallpaper = require(`../../assets/post_set_wallpaper_icon.png`);
const post_download = require(`../../assets/post_download_icon.png`);
const post_share = require(`../../assets/post_share.png`);

export const PostDetails = forwardRef((props, ref) => {

    const { posts, textPostTypeAnimationValue, optionsState, setOptionsState, sdomDatastate, setSdomDatastate,
        viewPagerRef, width, height, textPostDescriptionAnimationValue, setLoaderCallback } = props;

    const post_external_link = require('../../assets/post_external_link_icon.png');

    const [postDetailsState, setPostDetailsState] = useState({
        currentPostIndex: numericConstants.ZERO,
        animationVisible: false,
        switchEnabled: true,
        newPostViewed: false,
    });

    useImperativeHandle(ref,
        () => ({
            postIndex: postDetailsState.currentPostIndex,
            newPostViewed: postDetailsState.newPostViewed,

            setNewPostViewed(bool) {
                setPostDetailsState({ ...postDetailsState, newPostViewed: bool });
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

    const downloadCallback = useCallback((progressEvent) => {
        setLoaderCallback(true, alertTextMessages.DOWNLOADING_IMAGE,
            Math.round((progressEvent.loaded * numericConstants.ONE_HUNDRED) / progressEvent.total));
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
            <View key={`1_${postDetailsState.currentPostIndex}_${posts[postDetailsState.currentPostIndex].categoryId}_post_details`}>
                <LinearGradient style={glancePostStyles.innerContainer} colors={[colors.TRANSPARENT, colors.BLACK]}>
                    <Animated.View style={[glancePostStyles.smallButtonsContainer, postDetailsState.animationVisible && postTypeSpringStyle]}>
                        <Text style={glancePostStyles.titleName}>{posts[postDetailsState.currentPostIndex].postTitle}</Text>
                        {
                            posts[postDetailsState.currentPostIndex].postLink &&
                            <TouchableOpacity style={SDGenericStyles.width38} onPress={() => Linking.openURL(posts[postDetailsState.currentPostIndex].postLink)}>
                                <Animated.Image style={[glancePostStyles.icon_external_link]} source={post_external_link} />
                            </TouchableOpacity>
                        }
                    </Animated.View>
                    <Animated.View style={[glancePostStyles.postTitleAndProfileStyle, SDGenericStyles.marginBottom8,
                    postDetailsState.animationVisible && postDescriptionSpringStyle]}>
                        <Text style={[posts[postDetailsState.currentPostIndex].profileName && glancePostStyles.postProfileName, SDGenericStyles.textColorWhite,
                        SDGenericStyles.fontFamilyBold, SDGenericStyles.justifyContentCenter, SDGenericStyles.ft9]}>
                            {posts[postDetailsState.currentPostIndex].profileName && posts[postDetailsState.currentPostIndex].profileName.toUpperCase()}
                        </Text>
                        <View>
                            <View style={SDGenericStyles.rowFlexDirection}>
                                <Text style={[posts[postDetailsState.currentPostIndex].user.name && glancePostStyles.postProfileName, SDGenericStyles.textColorWhite,
                                SDGenericStyles.fontFamilyRoman, SDGenericStyles.justifyContentCenter, SDGenericStyles.ft12]}>
                                    {`by`}
                                </Text>
                                <TouchableOpacity activeOpacity={.7} onPress={() => {
                                    props.navigation.navigate(screens.PROFILE, {
                                        profile: posts[postDetailsState.currentPostIndex].user
                                    })
                                }}>
                                    <Text style={[posts[postDetailsState.currentPostIndex].user.name && glancePostStyles.postProfileName, SDGenericStyles.textColorWhite,
                                    SDGenericStyles.fontFamilyRoman, SDGenericStyles.justifyContentCenter, SDGenericStyles.ft12]}>
                                        {posts[postDetailsState.currentPostIndex].user.name && posts[postDetailsState.currentPostIndex].user.name}
                                    </Text>
                                </TouchableOpacity>
                                {
                                    posts[postDetailsState.currentPostIndex].user.user_type == miscMessage.VERIFIED_AUTHOR &&
                                    <View>
                                        <VerifiedAuthorBadgeIcon width={numericConstants.TEN} height={numericConstants.TEN} />
                                    </View>
                                }
                            </View>
                            <View style={SDGenericStyles.marginTop8}>
                                <Text style={[glancePostStyles.postCategoriesIn, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRoman,
                                SDGenericStyles.justifyContentCenter, SDGenericStyles.ft12]}>{
                                        posts[postDetailsState.currentPostIndex].profileName && posts[postDetailsState.currentPostIndex].postCategoriesIn &&
                                        stringConstants.PIPELINE_JOIN.concat(posts[postDetailsState.currentPostIndex].postCategoriesIn) ||
                                        posts[postDetailsState.currentPostIndex].postCategoriesIn}
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
                        post={posts[postDetailsState.currentPostIndex]} postDetailsRef={ref} />
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
                        posts[postDetailsState.currentPostIndex], postDetailsState, setPostDetailsState)}>
                    <View style={glancePostStyles.backgroundRoundColor_description}>
                        <Image style={glancePostStyles.icon_post_description} source={post_description} />
                    </View>
                </ActionButton.Item>
                <ActionButton.Item buttonColor={colorConstants.TRANSPARENT_BUTTON} hideLabelShadow={true} fixNativeFeedbackRadius={true}
                    useNativeFeedback={!posts[postDetailsState.currentPostIndex].likeDisabled} onPress={async () => {
                        if (!posts[postDetailsState.currentPostIndex].likeDisabled) {
                            setLoaderCallback(true);
                            await increaseAndSetPostCounts(posts[postDetailsState.currentPostIndex], sdomDatastate, setSdomDatastate,
                                postCountTypes.POST_LIKES, postDetailsState, setPostDetailsState);
                            setLoaderCallback(false);
                        }
                    }}>
                    <View style={glancePostStyles.backgroundRoundColor} pointerEvents={posts[postDetailsState.currentPostIndex].likeDisabled &&
                        permissionsButtons.NONE || permissionsButtons.AUTO}>
                        <Image style={glancePostStyles.icon_post_like} source={posts[postDetailsState.currentPostIndex].likeDisabled &&
                            post_like_selected || post_like} />
                    </View>
                    <Text style={glancePostStyles.icon_count_text}>{posts[postDetailsState.currentPostIndex].postLikes}</Text>
                </ActionButton.Item>
                <ActionButton.Item buttonColor={colorConstants.TRANSPARENT_BUTTON} fixNativeFeedbackRadius={true} onPress={async () =>
                    await postWallPaperAlert(posts[postDetailsState.currentPostIndex], sdomDatastate, setSdomDatastate, setLoaderCallback)}>
                    <View style={glancePostStyles.backgroundRoundColor}>
                        <Image style={glancePostStyles.icon_post_details} source={post_wallpaper} />
                    </View>
                    <Text style={glancePostStyles.icon_count_text}>{posts[postDetailsState.currentPostIndex].postWallpapers}</Text>
                </ActionButton.Item>
                <ActionButton.Item buttonColor={colorConstants.TRANSPARENT_BUTTON} fixNativeFeedbackRadius={true} onPress={async () =>
                    await downloadImageFromURL(posts[postDetailsState.currentPostIndex], sdomDatastate, setSdomDatastate, setLoaderCallback, downloadCallback)}>
                    <View style={glancePostStyles.backgroundRoundColor}>
                        <Image style={glancePostStyles.icon_post_details} source={post_download} />
                    </View>
                    <Text style={glancePostStyles.icon_count_text}>{posts[postDetailsState.currentPostIndex].postDownloads}</Text>
                </ActionButton.Item>
                <ActionButton.Item buttonColor={colorConstants.TRANSPARENT_BUTTON} fixNativeFeedbackRadius={true}
                    onPress={async () => await shareImage(posts[postDetailsState.currentPostIndex], setLoaderCallback, downloadCallback)}>
                    <View style={glancePostStyles.backgroundRoundColor}>
                        <Image style={glancePostStyles.icon_post_share} source={post_share} />
                    </View>
                </ActionButton.Item>
            </ActionButton>
        </React.Fragment>
    )
});