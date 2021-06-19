import React, { useCallback, useContext, useRef } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Animated, { Transition } from 'react-native-reanimated';
import { CategoryContext } from '../../App';
import { SDBottomSheet } from '../../components/bottomsheet/SDBottomSheet';
import { LockIcon } from '../../components/icons/LockIcon';
import { UnlockIcon } from '../../components/icons/UnlockIcon';
import { SDProfileBottomTextView } from '../../components/texts/SDProfileBottomTextView';
import {
    actionButtonTextConstants, alertTextMessages, height, miscMessage,
    numericConstants, PRIVATE_FOLLOW_UNFOLLOW, stringConstants, width
} from '../../constants/Constants';
import { fetchPostsOfUserProfile, shareImage, showProgressSnackbar } from '../../helper/Helper';
import { ProfilePosts } from '../../screens/user/ProfilePosts';
import { colors, glancePostStyles, SDGenericStyles } from '../../styles/Styles';

export const SDProfileBottomSheet = props => {
    const post_share = require(`../../assets/post_share_icon.png`);
    const { downloadProgressState, setDownloadProgressState } = useContext(CategoryContext);




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
        props.setLoaderCallback(false, alertTextMessages.LOADING_USERS_POSTS);
    }

    const hideUserPosts = async () => {
    }

    const renderHeader = () => {
        return (
            <View style={[glancePostStyles.bottomSheetHeader, SDGenericStyles.backgroundColorWhite]}>
                <View style={SDGenericStyles.alignItemsCenter}>
                    <View style={[glancePostStyles.panelHandle, SDGenericStyles.backGroundColorGray]} />
                </View>
            </View>
        )
    }

    const renderContent = () => {
        return (
            <React.Fragment>
                <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.paddingBottom10, SDGenericStyles.backgroundColorWhite,
                SDGenericStyles.justifyContentSpaceBetween, { width: width }]}>
                    <SDProfileBottomTextView label={miscMessage.FOLLOWERS} count={props.profileDetail.count.followersCount} />
                    <SDProfileBottomTextView label={miscMessage.FOLLOWING} count={props.profileDetail.count.followingCount} />
                    <SDProfileBottomTextView label={miscMessage.WALLS} count={props.profileDetail.count.wallsCount} />
                    <SDProfileBottomTextView label={miscMessage.UPLOADS} count={props.profileDetail.count.uploadCount} />
                    <SDProfileBottomTextView label={miscMessage.DOWNLOADS} count={props.profileDetail.count.downloadCount} />
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
            <View style={[SDGenericStyles.positionAbsolute, SDGenericStyles.right0, SDGenericStyles.padding10, SDGenericStyles.paddingTop40]}>
                <TouchableOpacity style={glancePostStyles.backgroundRoundColor} onPress={async () => await shareImage({ postImage: props.profile.profile_image, postTitle: props.profile.name },
                    downloadCallback, resetFlashMessage)} activeOpacity={.7}>
                    <Image style={glancePostStyles.icon_post_share} source={post_share} />
                </TouchableOpacity>
            </View>

            <RenderProfileDetails profile={props.profile} profileDetail={props.profileDetail} isDisabled={props.isDisabled} setLoaderCallback={props.setLoaderCallback}
                sdomDatastate={props.sdomDatastate} setSdomDatastate={props.setSdomDatastate} loggedInUser={props.loggedInUser} setProfileDetail={props.setProfileDetail}
                navigation={props.navigation} />

            <SDBottomSheet refCallback={props.refCallback} snapPoints={props.snapPoints} initialSnap={numericConstants.ZERO}
                callbackMode={props.fall} renderHeader={renderHeader} renderContent={renderContent} onOpenEnd={() => viewUserPosts()}
                onCloseEnd={() => hideUserPosts()} />
        </React.Fragment>
    );
}

const RenderProfileDetails = ({ profile, profileDetail, isDisabled, setLoaderCallback, sdomDatastate, setSdomDatastate, loggedInUser,
    setProfileDetail, navigation }) => {
    return <View style={{ bottom: height - (height / 1.4) }}>
        <View style={[SDGenericStyles.justifyItemsStart, SDGenericStyles.paddingLeft10]}>
            <Animated.View style={[SDGenericStyles.alignItemsStart]}>
                <View style={SDGenericStyles.rowFlexDirection}>
                    <Text style={[SDGenericStyles.ft20, SDGenericStyles.fontFamilyBold,
                    SDGenericStyles.textCenterAlign, SDGenericStyles.textColorWhite]}>
                        {profile.name || stringConstants.EMPTY}
                    </Text>
                    {profile.user_type == miscMessage.VERIFIED_AUTHOR &&
                        <View style={SDGenericStyles.ml_3}>
                            <Image style={glancePostStyles.verifiedIconStyle} source={require(`../../assets/verified_icon.gif`)} />
                        </View> || <View />}
                </View>
                <Text style={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyBold, SDGenericStyles.justifyContentCenter,
                SDGenericStyles.textCenterAlign, SDGenericStyles.textColorWhite]}>{`@`}{profile.user_id || stringConstants.EMPTY}
                </Text>
            </Animated.View>
            <Animated.View style={SDGenericStyles.alignItemsStart}>
                <Text style={[SDGenericStyles.textLeftAlign, SDGenericStyles.justifyContentCenter, SDGenericStyles.mt12,
                SDGenericStyles.fontFamilyRoman, SDGenericStyles.ft16, { width: width / numericConstants.ONE_PT_NINE },
                SDGenericStyles.textColorWhite]}>{profile.bio || stringConstants.EMPTY}</Text>
            </Animated.View>
        </View>
        {!profileDetail.isSameUser &&
            <View style={[SDGenericStyles.alignSelfEnd, SDGenericStyles.bottom18, SDGenericStyles.paddingRight5]}>
                <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.justifyContentSpaceBetween]}>
                    <TouchableOpacity activeOpacity={.7} style={[SDGenericStyles.paddingHorizontal15, SDGenericStyles.paddingVertical2,
                    SDGenericStyles.alignItemsCenter, glancePostStyles.profileBioTextStyle, !isDisabled && SDGenericStyles.backgroundColorYellow ||
                    SDGenericStyles.backGroundColorLightGrey]} onPress={async () => {
                        setLoaderCallback(true, profileDetail.isFollowing && alertTextMessages.UNFOLLOWING_USER || alertTextMessages.FOLLOWING_USER);
                        await handleUserPostAction(profileDetail.isFollowing && actionButtonTextConstants.UNFOLLOW || actionButtonTextConstants.FOLLOW,
                            profile, sdomDatastate, setSdomDatastate, loggedInUser, profileDetail, setProfileDetail, navigation, false);
                        await checkLoggedInUserMappedWithUserProfile(profile, loggedInUser, profileDetail, setProfileDetail);
                        setLoaderCallback(false);
                    }} disabled={isDisabled}>
                        <Text style={[SDGenericStyles.textCenterAlign, SDGenericStyles.justifyContentCenter,
                        SDGenericStyles.fontFamilyRoman, SDGenericStyles.ft16]}>
                            {profileDetail.isFollowing && actionButtonTextConstants.UNFOLLOW || actionButtonTextConstants.FOLLOW}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.7} style={SDGenericStyles.paddingLeft5} onPress={async () => {
                        setLoaderCallback(true, profileDetail.privateRequestAccessStatus == PRIVATE_FOLLOW_UNFOLLOW.NOT_REQUESTED
                            && alertTextMessages.PRIVATE_FOLLOWING_USER || alertTextMessages.PRIVATE_UNFOLLOWING_USER);
                        await handleUserPostAction(profileDetail.privateRequestAccessStatus == PRIVATE_FOLLOW_UNFOLLOW.NOT_REQUESTED &&
                            actionButtonTextConstants.FOLLOW || actionButtonTextConstants.UNFOLLOW, profile, sdomDatastate, setSdomDatastate,
                            loggedInUser, profileDetail, setProfileDetail, navigation, true);
                        await checkLoggedInUserMappedWithUserProfile(profile, loggedInUser, profileDetail, setProfileDetail);
                        setLoaderCallback(false, stringConstants.EMPTY);
                    }}>
                        {profileDetail.isFollowing && profileDetail.privateRequestAccessStatus == PRIVATE_FOLLOW_UNFOLLOW.NOT_REQUESTED &&
                            (<View style={[SDGenericStyles.textBoxGray, SDGenericStyles.padding5, SDGenericStyles.borderRadius20]}>
                                <LockIcon width={numericConstants.SIXTEEN} height={numericConstants.SIXTEEN} fill={colors.WHITE} />
                            </View>) ||
                            profileDetail.isFollowing && profileDetail.privateRequestAccessStatus == PRIVATE_FOLLOW_UNFOLLOW.REQUESTED &&
                            (<View style={[SDGenericStyles.textBoxGray, SDGenericStyles.padding5, SDGenericStyles.borderRadius20]}>
                                <LockIcon width={numericConstants.SIXTEEN} height={numericConstants.SIXTEEN} fill={colors.SDOM_YELLOW} />
                            </View>) ||
                            profileDetail.isFollowing && profileDetail.privateRequestAccessStatus == PRIVATE_FOLLOW_UNFOLLOW.APPROVED &&
                            (<View style={[SDGenericStyles.textBoxGray, SDGenericStyles.padding5, SDGenericStyles.borderRadius20]}>
                                <UnlockIcon width={numericConstants.SIXTEEN} height={numericConstants.SIXTEEN} fill={colors.GREEN} />
                            </View>)}
                    </TouchableOpacity>
                </View>
            </View>
        }
    </View>;
}