import { useIsFocused, useNavigation } from '@react-navigation/core';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import { CategoryContext } from '../App';
import { RegisterUserIcon } from '../components/icons/RegisterUserIcon';
import { CloseIcon } from '../components/icons/CloseIcon';
import { ErrorModal } from '../components/modals/ErrorModal';
import { UserVerifyModal } from '../components/modals/UserVerifyModal';
import {
    actionButtonTextConstants, fieldControllerName, height, jsonConstants, miscMessage, modalTextConstants,
    numericConstants, PRIVATE_FOLLOW_UNFOLLOW, screens, stringConstants, width
} from '../constants/Constants';
import { prepareSDOMMenu, fetchProfilePostsCounts, logoutUser, fetchUpdateLoggedInUserProfile } from '../helper/Helper';
import { colors, SDGenericStyles, userAuthStyles, userMenuStyles } from '../styles/Styles';
import { MenuRenderer } from '../views/menus/MenuRenderer';
import { Extrapolate, interpolate, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated';

export const SDUserMenus = (drawerProps) => {

    const bottomSheetRef = useRef(null);
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const { loggedInUser, setLoggedInUser, setLoaderCallback } = useContext(CategoryContext);

    const [profileMenu, setProfileMenu] = useState({
        userMenus: jsonConstants.EMPTY,
        profileImage: stringConstants.EMPTY,
        profileName: stringConstants.EMPTY,
        profileUserId: stringConstants.EMPTY,
        followersCount: numericConstants.ZERO,
        followingCount: numericConstants.ZERO,
        privateRequestCount: numericConstants.ZERO,
        showSubmitVerifyModal: false
    })

    const [errorMod, setErrorMod] = useState({
        title: stringConstants.EMPTY,
        message: stringConstants.EMPTY,
        showModal: false
    });

    const fromCoords = { x: numericConstants.ZERO, y: height };
    const toCoords = { x: width, y: numericConstants.ZERO };

    const play = useSharedValue(false);
    const progress = useDerivedValue(() => {
        return play.value ? withSpring(numericConstants.ONE) : numericConstants.ZERO
    })
    const animatedStyle = useAnimatedStyle(() => {
        const opacity = interpolate(progress.value, [numericConstants.ZERO, numericConstants.ONE],
            [numericConstants.ZERO, numericConstants.ONE], Extrapolate.CLAMP);
        const translateY = interpolate(progress.value, [numericConstants.ZERO, numericConstants.ONE],
            [numericConstants.ONE_HUNDRED, numericConstants.ZERO], Extrapolate.CLAMP);
        return {
            transform: [{ translateY }],
            opacity
        };
    });

    const bottomSheetRefCallback = useCallback((node) => {
        bottomSheetRef.current = node;
    });

    const handleMenuClickAction = useCallback(async (item) => {
        setLoaderCallback(true);
        switch (item.key) {
            case screens.EDIT_USER_PROFILE:
                navigation.navigate(screens.EDIT_USER_PROFILE, { loggedInUser: loggedInUser });
                break;
            case modalTextConstants.VIEW_PROFILE:
                navigation.navigate(screens.PROFILE, { isFrom: modalTextConstants.VIEW_PROFILE });
                break;
            case screens.USER_FOLLOWERS_FOLLOWING:
                navigation.navigate(screens.USER_FOLLOWERS_FOLLOWING, { listFor: item.label });
                break;
            case screens.CATEGORY:
                navigation.navigate(screens.CATEGORY);
                break;
            case screens.POSTS:
                navigation.navigate(screens.POSTS, { bottomSheetRefCallback: bottomSheetRefCallback, bottomSheetRef: bottomSheetRef });
                break;
            case actionButtonTextConstants.VERIFY_USER:
                setProfileMenu({ ...profileMenu, showSubmitVerifyModal: true });
                break;
            default:
                break;
        }
        drawerProps.navigation.closeDrawer();
        setLoaderCallback(false);
    });

    const filterOutLoginMenus = (menu, details) => {
        switch (menu.key) {
            case actionButtonTextConstants.VERIFY_USER:
                if ((details.user_type == miscMessage.AUTHOR && details.verification && details.verification.user == details.id) ||
                    (details.user_type == miscMessage.VERIFIED_AUTHOR)) {
                    return false;
                }
                return true;
            case screens.USER_FOLLOWERS_FOLLOWING:
                if (menu.label == miscMessage.FOLLOWERS_TEXT) {
                } else if (menu.label == miscMessage.FOLLOWING_TEXT) {
                } else if (menu.label === fieldControllerName.SEARCH_USERS) {
                }
                else if (menu.label == miscMessage.PRIVATE_REQUEST_ACCESS) {
                    const followers = details.followers;
                    profileMenu.privateRequestCount = followers.filter(follower => follower.pvtaccess == PRIVATE_FOLLOW_UNFOLLOW.REQUESTED).length;
                    return profileMenu.privateRequestCount > numericConstants.ZERO;
                }
                return true;
            default:
                return true;
        }
    }

    useEffect(() => {
        (async () => {
            if (loggedInUser.loginDetails.details && loggedInUser.isLoggedIn) {
                profileMenu.userMenus = prepareSDOMMenu();
                const details = JSON.parse(loggedInUser.loginDetails.details);
                const counts = await fetchProfilePostsCounts(details.id);
                profileMenu.userMenus = profileMenu.userMenus.filter(menu => filterOutLoginMenus(menu, details));
                profileMenu.profileImage = details.profile_picture;
                profileMenu.profileName = details.name;
                profileMenu.profileUserId = details.user_id;
                profileMenu.followersCount = counts.followingCount;
                profileMenu.followingCount = counts.followersCount;
            } else {
                profileMenu.userMenus = prepareSDOMMenu().filter(menu => !menu.loggedIn);
                profileMenu.followersCount = numericConstants.ZERO;
                profileMenu.followingCount = numericConstants.ZERO;
            }
            play.value = true;
            setProfileMenu({ ...profileMenu });
        })();
    }, [loggedInUser.loginDetails, isFocused]);

    return (
        <SDMenuRenderer loggedInUser={loggedInUser} profileMenu={profileMenu} navigation={navigation} handleMenuClickAction={handleMenuClickAction} drawerProps={drawerProps} animatedStyle={animatedStyle}
            setLoggedInUser={setLoggedInUser} errorMod={errorMod} setErrorMod={setErrorMod} setProfileMenu={setProfileMenu} setLoaderCallback={setLoaderCallback} fromCoords={fromCoords} toCoords={toCoords} />
    )
}

const SDMenuRenderer = React.memo(({ loggedInUser, profileMenu, navigation, handleMenuClickAction, setLoggedInUser, errorMod, setErrorMod, setProfileMenu, setLoaderCallback, drawerProps, animatedStyle,
    fromCoords, toCoords }) => {
    return <SafeAreaView style={SDGenericStyles.fill}>
        <View style={[SDGenericStyles.positionAbsolute, SDGenericStyles.alignSelfEnd, SDGenericStyles.padding8]}>
            <TouchableOpacity activeOpacity={.7} onPress={() => drawerProps.navigation.closeDrawer()} po>
                <CloseIcon />
            </TouchableOpacity>
        </View>
        {
            loggedInUser.isLoggedIn &&
            <View style={[userMenuStyles.profileImageView, SDGenericStyles.rowFlexDirection, SDGenericStyles.mb40]}>
                <TouchableOpacity activeOpacity={.7}>
                    <View style={[userMenuStyles.profileImageStyle, SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter]}>
                        {profileMenu.profileImage &&
                            <FastImage source={{
                                uri: profileMenu.profileImage, priority: FastImage.priority.normal,
                            }} style={[userMenuStyles.profileImageStyle, SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter]} /> ||
                            <RegisterUserIcon width={numericConstants.EIGHTY} height={numericConstants.EIGHTY} stroke={colors.SDOM_PLACEHOLDER} />}
                    </View>
                </TouchableOpacity>
                <View style={SDGenericStyles.fill}>
                    <Text style={[SDGenericStyles.paddingVertical3, SDGenericStyles.paddingHorizontal15, SDGenericStyles.ft16,
                    SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyBold]}>
                        {profileMenu.profileName}
                    </Text>
                    <Text style={[SDGenericStyles.paddingVertical3, SDGenericStyles.paddingHorizontal15, SDGenericStyles.fontFamilyBold,
                    SDGenericStyles.ft14, SDGenericStyles.placeHolderTextColor]}>
                        @{profileMenu.profileUserId}
                    </Text>
                    <View style={SDGenericStyles.rowFlexDirection}>
                        <View>
                            <TouchableOpacity activeOpacity={.7} style={[SDGenericStyles.paddingVertical3, SDGenericStyles.paddingHorizontal15]}
                                onPress={() => handleMenuClickAction({ key: screens.EDIT_USER_PROFILE })}>
                                <Text style={[SDGenericStyles.fontFamilyBold, SDGenericStyles.ft14, SDGenericStyles.colorYellow]}>
                                    {modalTextConstants.EDIT_PROFILE}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity activeOpacity={.7} style={[SDGenericStyles.paddingVertical3, SDGenericStyles.paddingHorizontal15]}
                                onPress={() => handleMenuClickAction({ key: modalTextConstants.VIEW_PROFILE })}>
                                <Text style={[SDGenericStyles.fontFamilyBold, SDGenericStyles.ft14, SDGenericStyles.colorYellow]}>
                                    {modalTextConstants.VIEW_PROFILE}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View> || <View style={[userMenuStyles.profileImageView, SDGenericStyles.rowFlexDirection, SDGenericStyles.mb40]} />
        }

        <FlatList data={profileMenu.userMenus} numColumns={numericConstants.ONE} keyExtractor={(item) => `1_${item.label}`}
            renderItem={({ item, index }) => <MenuRenderer item={item} index={index} profileMenu={profileMenu} handleMenuClickAction={handleMenuClickAction}
                animatedStyle={animatedStyle} />}
            ItemSeparatorComponent={() => { return (<View style={SDGenericStyles.paddingVertical2} />); }} />

        {
            !loggedInUser.isLoggedIn &&
            <View>
                <View style={userAuthStyles.menuLoginButton}>
                    <TouchableOpacity activeOpacity={.7} style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.backgroundColorYellow]}
                        onPress={() => navigation.navigate(screens.LOGIN)}>
                        <Text style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.fontFamilyBold]}>{actionButtonTextConstants.LOGIN}</Text>
                    </TouchableOpacity>
                </View>
                <View style={userAuthStyles.menuRegisterButton}>
                    <TouchableOpacity activeOpacity={.7} onPress={() => navigation.navigate(screens.REGISTER)}>
                        <Text style={[SDGenericStyles.ft18, SDGenericStyles.textCenterAlign, SDGenericStyles.fontFamilyRoman, SDGenericStyles.elevation3,
                        SDGenericStyles.colorYellow, SDGenericStyles.textBoxGray, SDGenericStyles.paddingVertical16, SDGenericStyles.borderRadius10]}>
                            {actionButtonTextConstants.REGISTER}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View> || <View style={userAuthStyles.menuLoginButton}>
                <TouchableOpacity activeOpacity={.7} style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.backgroundColorYellow]}
                    onPress={async () => await logoutUser(loggedInUser.loginDetails.token, loggedInUser, setLoggedInUser)}>
                    <Text style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.fontFamilyBold]}>{actionButtonTextConstants.LOGOUT}</Text>
                </TouchableOpacity>
            </View>
        }
        <ErrorModal error={errorMod} setError={setErrorMod} />
        <UserVerifyModal profileMenu={profileMenu} setProfileMenu={setProfileMenu} loggedInUser={loggedInUser} setLoaderCallback={setLoaderCallback}
            setLoggedInUser={setLoggedInUser} fetchUpdateLoggedInUserProfile={fetchUpdateLoggedInUserProfile} />
    </SafeAreaView>;
});
