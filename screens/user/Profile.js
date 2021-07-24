import { useIsFocused, useNavigation, useRoute } from '@react-navigation/core';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Image, View, BackHandler, InteractionManager } from "react-native"
import FastImage from 'react-native-fast-image';
import { CategoryContext } from '../../App';
import {
    alertTextMessages, backHandlerConstants, componentErrorConsts, errorMessages, height, jsonConstants,
    numericConstants, PRIVATE_FOLLOW_UNFOLLOW, requestConstants, stringConstants, width
} from '../../constants/Constants';
import { checkLoggedInUserMappedWithUserProfile, checkProfileFrom, fetchUpdateLoggedInUserProfile } from '../../helper/Helper';
import { glancePostStyles, SDGenericStyles } from "../../styles/Styles"
import { SDProfileBottomSheet } from '../../views/bottomSheet/SDProfileBottomSheet';
import { BackButton } from '../../components/button/BackButton';
import { SDFallBackComponent } from '../../views/errorHandleView/SDFallBackComponent';

export const Profile = () => {

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const { sdomDatastate, setSdomDatastate, loggedInUser, setLoggedInUser, profileDetail, setProfileDetail, currentPostIndexForProfileRef,
        setLoaderCallback, postDetailsRef } = useContext(CategoryContext);

    const [loggedInUserHasPrivateAccess, setLoggedInUserHasPrivateAccess] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const route = useRoute();
    const isFrom = route.params?.isFrom || stringConstants.EMPTY;
    const profile = checkProfileFrom(currentPostIndexForProfileRef, sdomDatastate, isFrom, loggedInUser);

    // variables
    const snapPoints = useMemo(() => [numericConstants.TWELVE_PCNT, numericConstants.HUNDRED_PCNT], jsonConstants.EMPTY);

    postDetailsRef && postDetailsRef?.current && postDetailsRef?.current?.setPostAnimationVisible(false);

    useEffect(() => {
        (async () => {
            if (!expanded && isFocused) {
                setLoaderCallback(true, alertTextMessages.FETCHING_USER_PROFILE_DETAILS);
                await fetchUpdateLoggedInUserProfile(loggedInUser, setLoggedInUser, true);
                await checkLoggedInUserMappedWithUserProfile(profile, loggedInUser, profileDetail, setProfileDetail);
                InteractionManager.runAfterInteractions(() => setLoaderCallback(false));
            }
        })();
        const backHandler = BackHandler.addEventListener(backHandlerConstants.HARDWAREBACKPRESS, resetProfileState);
        return () => backHandler.remove();
    }, [isFocused]);

    const resetProfileState = () => {
        profileDetail.userPosts = jsonConstants.EMPTY;
        profileDetail.count = {
            [requestConstants.FOLLOWERS_COUNT]: numericConstants.ZERO,
            [requestConstants.FOLLOWING_COUNT]: numericConstants.ZERO,
            [requestConstants.WALLPAPERS_COUNT]: numericConstants.ZERO,
            [requestConstants.UPLOAD_COUNT]: numericConstants.ZERO,
            [requestConstants.DOWNLOAD_COUNT]: numericConstants.ZERO,
        };
        profileDetail.isFollowing = false;
        profileDetail.privateRequestAccessStatus = PRIVATE_FOLLOW_UNFOLLOW.NOT_REQUESTED;
        profile.isSameUser = false;
        setLoggedInUserHasPrivateAccess(false);
        setProfileDetail({ ...profileDetail });
    }

    const isDisabled = profileDetail.isFollowing && (profileDetail.privateRequestAccessStatus == PRIVATE_FOLLOW_UNFOLLOW.REQUESTED ||
        profileDetail.privateRequestAccessStatus == PRIVATE_FOLLOW_UNFOLLOW.APPROVED);

    return (
        <ProfileRenderer profile={profile} profileDetail={profileDetail} isDisabled={isDisabled} setLoggedInUserHasPrivateAccess={setLoggedInUserHasPrivateAccess} expanded={expanded}
            sdomDatastate={sdomDatastate} setSdomDatastate={setSdomDatastate} loggedInUser={loggedInUser} setProfileDetail={setProfileDetail} setLoaderCallback={setLoaderCallback}
            navigation={navigation} snapPoints={snapPoints} setLoggedInUser={setLoggedInUser} loggedInUserHasPrivateAccess={loggedInUserHasPrivateAccess} setExpanded={setExpanded} />
    )
}

const ProfileRenderer = React.memo(({ profile, profileDetail, isDisabled, sdomDatastate, setSdomDatastate, loggedInUser, setLoaderCallback, expanded, setExpanded,
    setProfileDetail, navigation, snapPoints, setLoggedInUser, loggedInUserHasPrivateAccess, setLoggedInUserHasPrivateAccess }) => {
    return <View style={SDGenericStyles.fill}>
        {
            profile.id !== numericConstants.MINUS_ONE &&
            <React.Fragment>
                <BackButton goBack leftStyle={numericConstants.TEN} extraStyles={SDGenericStyles.marginTop20} />
                {
                    profile.profile_image && <FastImage source={{ uri: profile.profile_image, priority: FastImage.priority.high, cache: FastImage.cacheControl.immutable }}
                        style={[{ width: width, height: height }, glancePostStyles.overlayImageProfile]} fallback /> || <FastImage source={{
                            uri: Image.resolveAssetSource(require(`../../assets/no_image_available.png`)).uri,
                            priority: FastImage.priority.high
                        }} style={[{ width: width, height: height }, glancePostStyles.overlayImageProfile]} resizeMode={FastImage.resizeMode.center} />
                }
                <SDProfileBottomSheet profile={profile} profileDetail={profileDetail} navigation={navigation} snapPoints={snapPoints} setLoggedInUser={setLoggedInUser} expanded={expanded}
                    setProfileDetail={setProfileDetail} sdomDatastate={sdomDatastate} setSdomDatastate={setSdomDatastate} loggedInUser={loggedInUser} setLoaderCallback={setLoaderCallback}
                    loggedInUserHasPrivateAccess={loggedInUserHasPrivateAccess} setLoggedInUserHasPrivateAccess={setLoggedInUserHasPrivateAccess} isDisabled={isDisabled} setExpanded={setExpanded} />
            </React.Fragment> || <SDFallBackComponent width={width} height={height} componentErrorConst={componentErrorConsts.POSTS_WITHOUT_PROFILE}
                descriptionText={errorMessages.NO_USER_PROFILE_FOR_POST} navigation={navigation} />
        }
    </View>;
})

