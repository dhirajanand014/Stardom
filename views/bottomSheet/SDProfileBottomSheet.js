import React, { useRef } from 'react';
import { View } from 'react-native';
import { Transition } from 'react-native-reanimated';
import { SDBottomSheet } from '../../components/bottomsheet/SDBottomSheet';
import { SDProfileBottomTextView } from '../../components/texts/SDProfileBottomTextView';
import { alertTextMessages, height, miscMessage, numericConstants, PRIVATE_FOLLOW_UNFOLLOW, width } from '../../constants/Constants';
import { fetchPostsOfUserProfile } from '../../helper/Helper';
import { ProfilePosts } from '../../screens/user/ProfilePosts';
import { glancePostStyles, SDGenericStyles } from '../../styles/Styles';

export const SDProfileBottomSheet = props => {


    const onFadeInTransitionRef = useRef();
    const onFadeOutTransitionRef = useRef();

    const onFadeInTransition = (
        <Transition.Sequence>
            <Transition.In type="fade" durationMs={10000} />
            <Transition.Change interpolation="easeInOut" />
            <Transition.Out type="fade" durationMs={10000} />
        </Transition.Sequence>
    );

    const onFadeOutTransition = (
        <Transition.Sequence>
            <Transition.In type="fade" durationMs={10000} />
            <Transition.Change interpolation="easeInOut" />
            <Transition.Out type="fade" durationMs={10000} />
        </Transition.Sequence>
    );

    const checkHasPrivateAccess = () => {
        if (props.loggedInUser.loginDetails.details) {
            const details = JSON.parse(props.loggedInUser.loginDetails.details);
            const privateAccess = details.following.some(following => following.following_id == props.profile.id
                && following.pvtaccess == PRIVATE_FOLLOW_UNFOLLOW.APPROVED);
            props.setLoggedInUserHasPrivateAccess(privateAccess)
        }
    }

    const viewUserPosts = async () => {
        props.setLoader({ ...props.loader, isLoading: true, loadingText: alertTextMessages.LOADING_USERS_POSTS });
        await fetchPostsOfUserProfile(props.profile, props.profileDetail, props.setProfileDetail, props.loggedInUser);
        props.profileDetail.userPosts && checkHasPrivateAccess();
        props.setLoader({ ...props.loader, isLoading: false, loadingText: alertTextMessages.LOADING_USERS_POSTS });
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
                <View>
                    <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.paddingBottom10, SDGenericStyles.backgroundColorWhite,
                    { width: width }]}>
                        <SDProfileBottomTextView label={miscMessage.FOLLOWERS} count={props.profileDetail.count.followersCount} />
                        <SDProfileBottomTextView label={miscMessage.FOLLOWING} count={props.profileDetail.count.followingCount} />
                        <SDProfileBottomTextView label={miscMessage.WALLS} count={props.profileDetail.count.wallsCount} />
                        <SDProfileBottomTextView label={miscMessage.UPLOADS} count={props.profileDetail.count.uploadCount} />
                        <SDProfileBottomTextView label={miscMessage.DOWNLOADS} count={props.profileDetail.count.downloadCount} />
                    </View>
                </View>
                <View style={[{ height: height - numericConstants.NINETY }, SDGenericStyles.backgroundColorWhite]}>
                    <ProfilePosts profileDetail={props.profileDetail} profile={props.profile} setProfileDetail={props.setProfileDetail}
                        sdomDatastate={props.sdomDatastate} setSdomDatastate={props.setSdomDatastate} loggedInUser={props.loggedInUser}
                        loggedInUserHasPrivateAccess={props.loggedInUserHasPrivateAccess} />
                </View>
            </React.Fragment>
        )
    }
    return (
        <SDBottomSheet refCallback={props.refCallback} snapPoints={props.snapPoints} initialSnap={numericConstants.ZERO}
            callbackMode={props.fall} renderHeader={renderHeader} renderContent={renderContent} onOpenEnd={() => viewUserPosts()}
            onCloseEnd={() => hideUserPosts()} />
    );
}