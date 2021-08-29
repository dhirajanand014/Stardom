import { useIsFocused } from '@react-navigation/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, InteractionManager } from 'react-native';
import Animated from 'react-native-reanimated';
import { CategoryContext } from '../../App';
import { SDBottomSheet } from '../../components/bottomsheet/SDBottomSheet';
import { SDScaleAnimation } from '../../components/button/SDScaleAnimation';
import { DeleteIcon } from '../../components/icons/DeleteIcon';
import { UserSelectionOptionModal } from '../../components/modals/UserSelectionOptionModal';
import { SDProfileBottomTextView } from '../../components/texts/SDProfileBottomTextView';
import {
    actionButtonTextConstants, alertTextMessages, height, jsonConstants, miscMessage,
    numericConstants, PRIVATE_FOLLOW_UNFOLLOW, stringConstants, urlConstants, width
} from '../../constants/Constants';
import {
    checkLoggedInUserMappedWithUserProfile, fetchPostsOfUserProfile, handleProfileImageDelete, handleUserPostAction,
    shareImage, showProgressSnackbar
} from '../../helper/Helper';
import { ProfilePosts } from '../../screens/user/ProfilePosts';
import { colors, glancePostStyles, SDGenericStyles } from '../../styles/Styles';
import { SDEntryAnimation } from '../animationView/SDEntryAnimation';

export const SDProfileBottomSheet = props => {
    const post_share = require(`../../assets/post_share_icon.png`);
    const { downloadProgressState, setDownloadProgressState, setLoaderCallback } = useContext(CategoryContext);
    const isFocused = useIsFocused();
    const [bottomSheetState, setBottomSheetState] = useState({
        iconsSwitchEnabled: true,
        showUserOptionModal: false
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

    const checkHasPrivateAccess = () => {
        if (props.loggedInUser.loginDetails.details) {
            const details = JSON.parse(props.loggedInUser.loginDetails.details);
            const privateAccess = details.following.some(following => following.following_id == props.profile.id
                && following.pvtaccess == PRIVATE_FOLLOW_UNFOLLOW.APPROVED);
            props.setLoggedInUserHasPrivateAccess(privateAccess)
        }
    }

    const viewUserPosts = async () => {
        props.setLoaderCallback(true, alertTextMessages.LOADING_USERS_POSTS);
        await fetchPostsOfUserProfile(props.profile, props.profileDetail, props.setProfileDetail, props.loggedInUser);
        props.profileDetail.userPosts && checkHasPrivateAccess();
        props.setExpanded(true);
        InteractionManager.runAfterInteractions(() => props.setLoaderCallback(false, alertTextMessages.LOADING_USERS_POSTS));
    }

    const hideUserPosts = async () => {
        props.setExpanded(false);
        props.setProfileDetail({ ...props.profileDetail, userPosts: jsonConstants.EMPTY });
    }

    const renderHeader = () => {
        return (
            <View style={[glancePostStyles.bottomSheetHeader, SDGenericStyles.backgroundColorWhite]}>
                <View style={SDGenericStyles.alignItemsCenter}>
                    <Image source={props.expanded && require(`../../assets/profile_posts_arrow_down_icon.png`) ||
                        require(`../../assets/profile_posts_arrow_up_icon.png`)} style={SDGenericStyles.menuEditIcon} />
                </View>
            </View>
        )
    }

    useEffect(() => {
        if (props.expanded) {
            viewUserPosts();
            props.setExpanded(false);
        }
    }, [isFocused]);

    const handleDelete = useCallback(async () => {
        if (props.loggedInUser && props.loggedInUser.loginDetails) {
            setBottomSheetState({ ...bottomSheetState, showUserOptionModal: false });
            setLoaderCallback(true);
            await handleProfileImageDelete(props.profile, props.loggedInUser, props.setLoggedInUser);
            setLoaderCallback(false);
        }
    });

    const renderContent = () => {
        return (
            <React.Fragment>
                <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.paddingBottom10, SDGenericStyles.backgroundColorWhite,
                SDGenericStyles.justifyContentSpaceBetween, SDGenericStyles.paddingRight5, { width: width }]}>
                    <SDProfileBottomTextView label={miscMessage.FOLLOWERS} count={props.profileDetail.count.followersCount} />
                    <SDProfileBottomTextView label={miscMessage.FOLLOWING} count={props.profileDetail.count.followingCount} />
                    <SDProfileBottomTextView label={miscMessage.WALLS} count={props.profileDetail.count.wallsCount} />
                    <SDProfileBottomTextView label={miscMessage.UPLOADS} count={props.profileDetail.count.uploadCount} />
                    {/* <SDProfileBottomTextView label={miscMessage.DOWNLOADS} count={props.profileDetail.count.downloadCount} /> */}
                </View>
                <View style={[{ height: height - numericConstants.EIGHTY_FIVE }, SDGenericStyles.backgroundColorWhite]}>
                    <ProfilePosts profileDetail={props.profileDetail} profile={props.profile} setProfileDetail={props.setProfileDetail}
                        sdomDatastate={props.sdomDatastate} setSdomDatastate={props.setSdomDatastate} loggedInUser={props.loggedInUser}
                        loggedInUserHasPrivateAccess={props.loggedInUserHasPrivateAccess} />
                </View>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <View style={[SDGenericStyles.positionAbsolute, SDGenericStyles.right0, SDGenericStyles.padding10]}>
                <View style={SDGenericStyles.marginTop33}>
                    <TouchableOpacity style={glancePostStyles.backgroundRoundColor} onPress={async () => await shareImage({ postImage: props.profile.profile_image, postTitle: props.profile.name },
                        downloadCallback, resetFlashMessage)} activeOpacity={.7}>
                        <Image style={glancePostStyles.icon_post_share} source={post_share} />
                    </TouchableOpacity>
                </View>
                {
                    props.loggedInUser.loginDetails.details && props.profileDetail.isSameUser && props.profile.profile_image !== urlConstants.profileStorageUrl &&
                    <View style={SDGenericStyles.paddingTop25}>
                        <TouchableOpacity style={glancePostStyles.backgroundRoundColor} activeOpacity={.7} onPress={() => setBottomSheetState({ ...bottomSheetState, showUserOptionModal: true })}>
                            <DeleteIcon width={numericConstants.TWENTY_EIGHT} height={numericConstants.TWENTY_EIGHT} stroke={colors.WHITE} />
                        </TouchableOpacity>
                    </View>
                }
            </View>
            <RenderProfileDetails profile={props.profile} profileDetail={props.profileDetail} isDisabled={props.isDisabled} setLoaderCallback={props.setLoaderCallback}
                sdomDatastate={props.sdomDatastate} setSdomDatastate={props.setSdomDatastate} loggedInUser={props.loggedInUser} setProfileDetail={props.setProfileDetail}
                navigation={props.navigation} />

            <SDBottomSheet refCallback={props.refCallback} snapPoints={props.snapPoints} initialSnap={numericConstants.ZERO}
                callbackMode={props.fall} renderHeader={renderHeader} renderContent={renderContent} onOpenEnd={() => viewUserPosts()}
                onCloseEnd={() => hideUserPosts()} />

            <UserSelectionOptionModal bottomSheetState={bottomSheetState} setBottomSheetState={setBottomSheetState} textMessage={alertTextMessages.DELETE_USER_PROFILE_IMAGE}
                successButton={actionButtonTextConstants.YES.toUpperCase()} handleSubmit={handleDelete} />
        </React.Fragment>
    )
}

const RenderProfileDetails = React.memo(({ profile, profileDetail, isDisabled, setLoaderCallback, sdomDatastate, setSdomDatastate, loggedInUser,
    setProfileDetail, navigation }) => {
    return <View>
        <View style={[SDGenericStyles.justifyItemsStart, SDGenericStyles.paddingLeft10]}>
            <Animated.View style={[{ bottom: profile.bio && height - (height / 1.55) || height - (height / 1.35) }, SDGenericStyles.alignItemsStart]}>
                <View style={SDGenericStyles.rowFlexDirection}>
                    <Text style={[SDGenericStyles.ft20, SDGenericStyles.fontFamilyRobotoMedium,
                    SDGenericStyles.textCenterAlign, SDGenericStyles.textColorWhite]}>
                        {profile.name || stringConstants.EMPTY}
                    </Text>
                    {profile.user_type == miscMessage.VERIFIED_AUTHOR &&
                        <View style={SDGenericStyles.ml_3}>
                            <Image style={glancePostStyles.verifiedIconStyle} source={require(`../../assets/verified_icon.gif`)} />
                        </View> || <View />}
                </View>
                <Text style={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.justifyContentCenter,
                SDGenericStyles.textCenterAlign, SDGenericStyles.textColorWhite]}>{profile.user_id || stringConstants.EMPTY}
                </Text>
            </Animated.View>
            <Animated.View style={SDGenericStyles.alignItemsStart}>
                <Text style={[SDGenericStyles.textLeftAlign, SDGenericStyles.justifyContentCenter, SDGenericStyles.mt12,
                SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.ft16, { width: width / numericConstants.ONE_PT_NINE },
                SDGenericStyles.textColorWhite]}>{profile.bio || stringConstants.EMPTY}</Text>
            </Animated.View>
        </View>
        {
            !profileDetail.isSameUser &&
            <View style={[{ bottom: height - (height / 1.56) }, SDGenericStyles.alignSelfEnd, SDGenericStyles.paddingRight5, SDGenericStyles.mt24]}>
                <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.justifyContentSpaceBetween]}>
                    <SDEntryAnimation index={numericConstants.ONE}>
                        <SDScaleAnimation disabled={false} scaleTo={numericConstants.ZEROPTNINETY}>
                            <TouchableOpacity activeOpacity={.7} style={[SDGenericStyles.paddingHorizontal15, SDGenericStyles.paddingVertical2, , SDGenericStyles.elevation3,
                            SDGenericStyles.alignItemsCenter, glancePostStyles.profileBioTextStyle, !isDisabled && SDGenericStyles.backgroundColorYellow ||
                            SDGenericStyles.backGroundColorLightGrey]} onPress={async () => {
                                setLoaderCallback(true, profileDetail.isFollowing && alertTextMessages.UNFOLLOWING_USER || alertTextMessages.FOLLOWING_USER);
                                await handleUserPostAction(profileDetail.isFollowing && actionButtonTextConstants.UNFOLLOW || actionButtonTextConstants.FOLLOW,
                                    profile, sdomDatastate, setSdomDatastate, loggedInUser, profileDetail, setProfileDetail, navigation, false);
                                setTimeout(async () => await checkLoggedInUserMappedWithUserProfile(profile, loggedInUser, profileDetail, setProfileDetail), numericConstants.ONE_HUNDRED);
                                setLoaderCallback(false);
                            }} disabled={isDisabled}>
                                <Text style={[SDGenericStyles.textCenterAlign, SDGenericStyles.justifyContentCenter,
                                SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.ft16]}>
                                    {profileDetail.isFollowing && actionButtonTextConstants.UNFOLLOW || actionButtonTextConstants.FOLLOW}
                                </Text>
                            </TouchableOpacity>
                        </SDScaleAnimation>
                    </SDEntryAnimation>
                    <SDEntryAnimation index={numericConstants.TWO}>
                        <SDScaleAnimation disabled={false} scaleTo={numericConstants.ZEROPTNINETY}>
                            <TouchableOpacity activeOpacity={.7} style={[SDGenericStyles.paddingHorizontal5, SDGenericStyles.elevation3]} onPress={async () => {
                                setLoaderCallback(true, profileDetail.privateRequestAccessStatus == PRIVATE_FOLLOW_UNFOLLOW.NOT_REQUESTED
                                    && alertTextMessages.PRIVATE_FOLLOWING_USER || alertTextMessages.PRIVATE_UNFOLLOWING_USER);
                                await handleUserPostAction(profileDetail.privateRequestAccessStatus == PRIVATE_FOLLOW_UNFOLLOW.NOT_REQUESTED &&
                                    actionButtonTextConstants.FOLLOW || actionButtonTextConstants.UNFOLLOW, profile, sdomDatastate, setSdomDatastate,
                                    loggedInUser, profileDetail, setProfileDetail, navigation, true);
                                await checkLoggedInUserMappedWithUserProfile(profile, loggedInUser, profileDetail, setProfileDetail);
                                setLoaderCallback(false, stringConstants.EMPTY);
                            }}>
                                {
                                    profileDetail.isFollowing && profileDetail.privateRequestAccessStatus == PRIVATE_FOLLOW_UNFOLLOW.NOT_REQUESTED &&
                                    (<View style={[SDGenericStyles.textBoxGray, SDGenericStyles.padding4, SDGenericStyles.borderRadius20]}>
                                        <Image style={[SDGenericStyles.lockUnlockIconStyle, SDGenericStyles.tintColorWhite]}
                                            source={require(`../../assets/locked_icon.png`)} />
                                    </View>) ||
                                    profileDetail.isFollowing && profileDetail.privateRequestAccessStatus == PRIVATE_FOLLOW_UNFOLLOW.REQUESTED &&
                                    (<View style={[SDGenericStyles.textBoxGray, SDGenericStyles.padding4, SDGenericStyles.borderRadius20]}>
                                        <Image style={[SDGenericStyles.lockUnlockIconStyle, SDGenericStyles.tintColorYellow]}
                                            source={require(`../../assets/locked_icon.png`)} />
                                    </View>) ||
                                    profileDetail.isFollowing && profileDetail.privateRequestAccessStatus == PRIVATE_FOLLOW_UNFOLLOW.APPROVED &&
                                    (<View style={[SDGenericStyles.textBoxGray, SDGenericStyles.padding4, SDGenericStyles.borderRadius20]}>
                                        <Image style={[SDGenericStyles.lockUnlockIconStyle, SDGenericStyles.tintColorGreen]}
                                            source={require(`../../assets/unlocked_icon.png`)} />
                                    </View>)
                                }
                            </TouchableOpacity>
                        </SDScaleAnimation>
                    </SDEntryAnimation>
                    {
                        profileDetail.isFollowing &&
                        <SDEntryAnimation index={numericConstants.THREE}>
                            <SDScaleAnimation disabled={false} scaleTo={numericConstants.ZEROPTNINETY}>
                                <TouchableOpacity activeOpacity={.7} style={[SDGenericStyles.paddingRight5, SDGenericStyles.elevation3]} onPress={async () =>
                                    await handleUserPostAction(actionButtonTextConstants.UPDATE_NOTIFICATION, profile, sdomDatastate, setSdomDatastate,
                                        loggedInUser, profileDetail, setProfileDetail, navigation, false)}>
                                    {
                                        profileDetail.userPostNotificationsEnabled && <View style={[SDGenericStyles.textBoxGray, SDGenericStyles.padding4, SDGenericStyles.borderRadius20]}>
                                            <Image style={[SDGenericStyles.lockUnlockIconStyle, SDGenericStyles.tintColorYellow]} source={require(`../../assets/notification_enabled_icon.png`)} />
                                        </View> || <View style={[SDGenericStyles.textBoxGray, SDGenericStyles.padding4, SDGenericStyles.borderRadius20]}>
                                            <Image style={[SDGenericStyles.lockUnlockIconStyle, SDGenericStyles.tintColorWhite]} source={require(`../../assets/notification_disabled_icon.png`)} />
                                        </View>
                                    }
                                </TouchableOpacity>
                            </SDScaleAnimation>
                        </SDEntryAnimation>
                    }
                </View>
            </View>
        }
    </View>;
});