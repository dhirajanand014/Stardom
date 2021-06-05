import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { Text, View, Image, Linking, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import {
    stringConstants, postCountTypes, numericConstants
} from '../../constants/Constants';
import {
    downloadImageFromURL, setOptionsStateForDescription, shareImage, showProgressSnackbar
} from '../../helper/Helper';
import { colors, glancePostStyles, SDGenericStyles } from '../../styles/Styles';
import LinearGradient from 'react-native-linear-gradient';

const post_description = require(`../../assets/post_description_icon.png`);
const post_download = require(`../../assets/post_download_icon.png`);
const post_share = require(`../../assets/post_share.png`);

export const ViewUserPostDetails = forwardRef((props, ref) => {

    const { textPostTypeAnimationValue, textPostDescriptionAnimationValue } = props;

    const post_external_link = require('../../assets/post_external_link_icon.png');
    const [postDetailsState, setPostDetailsState] = useState({
        currentPostIndex: numericConstants.ZERO,
        currentPost: props.posts[numericConstants.ZERO],
        animationVisible: false,
        switchEnabled: true
    });

    useImperativeHandle(ref,
        () => ({
            postIndex: postDetailsState.currentPostIndex,
            currentPost: postDetailsState.currentPost,

            setCurrentPost(index) {
                postDetailsState.currentPostIndex = index;
                postDetailsState.currentPost = props.posts[index];
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

            <View style={[SDGenericStyles.positionAbsolute, SDGenericStyles.right0, SDGenericStyles.padding10, SDGenericStyles.paddingTop50]}>
                <TouchableOpacity style={glancePostStyles.backgroundRoundColor_description} onPress={() => setOptionsStateForDescription(optionsState, setOptionsState,
                    postDetailsState.currentPost, postDetailsState, setPostDetailsState)}>
                    <Image style={glancePostStyles.icon_post_description} source={post_description} />
                </TouchableOpacity>
                <TouchableOpacity style={[glancePostStyles.backgroundRoundColor, SDGenericStyles.mv15]} onPress={async () =>
                    await downloadImageFromURL(postCountTypes.POST_DOWNLOADS_KEY, postDetailsState, setPostDetailsState, downloadCallback,
                        resetFlashMessage)}>
                    <Image style={glancePostStyles.icon_post_details} source={post_download} />
                </TouchableOpacity>
                <TouchableOpacity style={glancePostStyles.backgroundRoundColor} onPress={async () => await shareImage(postDetailsState.currentPost, downloadCallback)}>
                    <Image style={glancePostStyles.icon_post_share} source={post_share} />
                </TouchableOpacity>
            </View>
        </React.Fragment >
    )
});