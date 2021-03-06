import { useIsFocused, useNavigation, useRoute } from '@react-navigation/core';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Image, View, BackHandler } from "react-native"
import FastImage from 'react-native-fast-image';
import { CategoryContext } from '../../App';
import {
    alertTextMessages, backHandlerConstants, height, jsonConstants,
    numericConstants, PRIVATE_FOLLOW_UNFOLLOW, requestConstants, stringConstants, urlConstants, width
} from '../../constants/Constants';
import {
    checkLoggedInUserMappedWithUserProfile, fetchUpdateLoggedInUserProfile
} from '../../helper/Helper';
import { glancePostStyles, SDGenericStyles } from "../../styles/Styles"
import { BackButton } from '../../components/button/BackButton';
import { SDProfileBottomSheet } from '../../views/bottomSheet/SDProfileBottomSheet';

export const FollowerFollowingProfile = () => {

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const { sdomDatastate, setSdomDatastate, loggedInUser, setLoggedInUser, profileDetail, setProfileDetail, setLoaderCallback } = useContext(CategoryContext);

    const [loggedInUserHasPrivateAccess, setLoggedInUserHasPrivateAccess] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const route = useRoute();
    const profile = route.params?.followerFollowingProfile;
    // variables
    const snapPoints = useMemo(() => [numericConstants.TWELVE_PCNT, numericConstants.HUNDRED_PCNT], jsonConstants.EMPTY);

    useEffect(() => {
        (async () => {
            if (!expanded && isFocused) {
                setLoaderCallback(true, alertTextMessages.FETCHING_USER_PROFILE_DETAILS);
                await fetchUpdateLoggedInUserProfile(loggedInUser, setLoggedInUser, true);
                await checkLoggedInUserMappedWithUserProfile(profile, loggedInUser, profileDetail, setProfileDetail);
                setLoaderCallback(false);
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
        <FollowerFollowingProfileRenderer profile={profile} profileDetail={profileDetail} isDisabled={isDisabled} setLoggedInUserHasPrivateAccess={setLoggedInUserHasPrivateAccess}
            sdomDatastate={sdomDatastate} setSdomDatastate={setSdomDatastate} loggedInUser={loggedInUser} setProfileDetail={setProfileDetail} setLoaderCallback={setLoaderCallback}
            navigation={navigation} snapPoints={snapPoints} setLoggedInUser={setLoggedInUser} loggedInUserHasPrivateAccess={loggedInUserHasPrivateAccess} expanded={expanded}
            setExpanded={setExpanded} />
    )
}

const FollowerFollowingProfileRenderer = React.memo(({ profile, profileDetail, isDisabled, sdomDatastate, loggedInUser, setLoaderCallback, expanded, setExpanded,
    setProfileDetail, navigation, snapPoints, setLoggedInUser, loggedInUserHasPrivateAccess, setLoggedInUserHasPrivateAccess, setSdomDatastate }) => {
    return <View style={SDGenericStyles.fill}>
        <BackButton leftStyle={numericConstants.ONE} isWithSearch extraStyles={SDGenericStyles.marginTop20} />
        {
            profile.profile_image && profile.profile_image !== urlConstants.profileStorageUrl &&
            <FastImage source={{ uri: profile.profile_image, priority: FastImage.priority.high }}
                style={[{ width: width, height: height }, glancePostStyles.overlayImageProfile]} fallback onError={() => profile.profile_image = stringConstants.EMPTY} />
            || <FastImage source={{
                uri: Image.resolveAssetSource(require(`../../assets/no_image_available.png`)).uri,
                priority: FastImage.priority.high
            }} style={[{ width: width, height: height }, glancePostStyles.overlayImageProfile]} resizeMode={FastImage.resizeMode.center} />
        }
        <SDProfileBottomSheet profile={profile} profileDetail={profileDetail} navigation={navigation} snapPoints={snapPoints} setLoggedInUser={setLoggedInUser} expanded={expanded}
            setProfileDetail={setProfileDetail} sdomDatastate={sdomDatastate} setSdomDatastate={setSdomDatastate} loggedInUser={loggedInUser} setLoaderCallback={setLoaderCallback}
            loggedInUserHasPrivateAccess={loggedInUserHasPrivateAccess} setLoggedInUserHasPrivateAccess={setLoggedInUserHasPrivateAccess} isDisabled={isDisabled} setExpanded={setExpanded} />
    </View>;
});