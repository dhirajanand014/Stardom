import { useIsFocused, useNavigation } from '@react-navigation/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import { CategoryContext } from '../App';
import { RegisterUserIcon } from '../components/icons/RegisterUserIcon';
import { ErrorModal } from '../components/modals/ErrorModal';
import { UserVerifyModal } from '../components/modals/UserVerifyModal';
import {
    actionButtonTextConstants, fieldControllerName, height, jsonConstants, miscMessage, modalTextConstants,
    numericConstants, PRIVATE_FOLLOW_UNFOLLOW, requestConstants, screens, stringConstants, width
} from '../constants/Constants';
import { prepareSDOMMenu, fetchProfilePostsCounts, logoutUser, fetchUpdateLoggedInUserProfile } from '../helper/Helper';
import { colors, glancePostStyles, SDGenericStyles, userAuthStyles, userMenuStyles } from '../styles/Styles';
import { MenuRenderer } from '../views/menus/MenuRenderer';
import { Extrapolate, interpolate, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated';
import Shimmer from 'react-native-shimmer';

export const SDUserMenus = (drawerProps) => {

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const { loggedInUser, setLoggedInUser, setLoaderCallback, currentPostIndexForProfileRef } = useContext(CategoryContext);

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
            case actionButtonTextConstants.LOGOUT:
                await logoutUser(loggedInUser.loginDetails.token, loggedInUser, setLoggedInUser);
                navigation.reset({ index: numericConstants.ZERO, routes: [{ name: screens.GLANCE }] });
                currentPostIndexForProfileRef.current = numericConstants.ZERO;
                break;
            case screens.POSTS:
                navigation.navigate(screens.POSTS);
                break;
            case actionButtonTextConstants.VERIFY_USER:
                setProfileMenu({ ...profileMenu, showSubmitVerifyModal: true });
                break;
            default: navigation.reset({ index: numericConstants.ZERO, routes: [{ name: screens.GLANCE }] });
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

const SDMenuRenderer = React.memo(({ loggedInUser, profileMenu, navigation, handleMenuClickAction, setLoggedInUser, errorMod, setErrorMod, setProfileMenu, setLoaderCallback, drawerProps, animatedStyle }) => {
    return <SafeAreaView style={SDGenericStyles.fill}>
        <View style={[SDGenericStyles.alignSelfEnd, SDGenericStyles.justifyContentCenter]}>
            <TouchableOpacity activeOpacity={.7} onPress={() => drawerProps.navigation.closeDrawer()}
                style={[SDGenericStyles.paddingRight10, SDGenericStyles.paddingBottom5, SDGenericStyles.paddingTop16, SDGenericStyles.justifyContentCenter]}>
                <Image style={userAuthStyles.menu_close_icon_style} source={require(`../assets/menu/close_icon.png`)} />
            </TouchableOpacity>
        </View>
        {
            loggedInUser.isLoggedIn &&
            <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.mb15]}>
                <View style={userMenuStyles.profileImageView}>
                    <TouchableOpacity activeOpacity={.7}>
                        {profileMenu.profileImage && <FastImage source={{ uri: profileMenu.profileImage, priority: FastImage.priority.normal }}
                            style={[userMenuStyles.profileImageStyle, SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter,
                            SDGenericStyles.elevation8]} /> ||
                            <RegisterUserIcon width={numericConstants.EIGHTY} height={numericConstants.EIGHTY} stroke={colors.SDOM_PLACEHOLDER} />}
                    </TouchableOpacity>
                </View>
                <View style={[SDGenericStyles.alignItemsStart, SDGenericStyles.justifyContentCenter]}>
                    <Text style={[SDGenericStyles.paddingHorizontal15, SDGenericStyles.ft18, SDGenericStyles.textColorWhite,
                    SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.alignItemsStart]}>
                        {profileMenu.profileName}
                    </Text>
                    <Text style={[SDGenericStyles.paddingHorizontal15, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.ft14,
                    SDGenericStyles.placeHolderTextColor, SDGenericStyles.alignItemsStart]}>
                        {profileMenu.profileUserId}
                    </Text>
                </View>
                <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.positionAbsolute, glancePostStyles.editProfileAbsolute, SDGenericStyles.justifyContentCenter]}>
                    <Shimmer direction={miscMessage.RIGHT} duration={numericConstants.FIVE_THOUSAND}>
                        <TouchableOpacity style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.paddingVertical5, SDGenericStyles.paddingHorizontal10]}
                            onPress={() => handleMenuClickAction({ key: modalTextConstants.VIEW_PROFILE })}>
                            <RegisterUserIcon style={SDGenericStyles.justifyContentCenter} height={numericConstants.THIRTY}
                                width={numericConstants.THIRTY} stroke={colors.WHITE} />
                            <Text style={[SDGenericStyles.ft10, SDGenericStyles.textCenterAlign, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium]}>
                                {miscMessage.VIEW.toUpperCase()}
                            </Text>
                            <Text style={[SDGenericStyles.ft10, SDGenericStyles.textCenterAlign, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium]}>
                                {fieldControllerName.PROFILE.toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                    </Shimmer>
                    <Shimmer direction={miscMessage.RIGHT} duration={numericConstants.FIVE_THOUSAND}>
                        <TouchableOpacity style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.padding9]} onPress={() => handleMenuClickAction({ key: screens.EDIT_USER_PROFILE })}>
                            <Image style={[SDGenericStyles.menuEditIcon, SDGenericStyles.justifyContentCenter]} source={require(`../assets/menu/edit_icon.png`)} />
                            <Text style={[SDGenericStyles.ft10, SDGenericStyles.textCenterAlign, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium]}>
                                {requestConstants.EDIT.toUpperCase()}
                            </Text>
                            <Text style={[SDGenericStyles.ft10, SDGenericStyles.textCenterAlign, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium]}>
                                {fieldControllerName.PROFILE.toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                    </Shimmer>
                </View>
            </View> || <View style={[userMenuStyles.profileImageView, SDGenericStyles.rowFlexDirection, SDGenericStyles.mb40]} />
        }

        <FlatList data={profileMenu.userMenus} numColumns={numericConstants.ONE} keyExtractor={(item) => item.label}
            renderItem={({ item, index }) => <MenuRenderer item={item} index={index} profileMenu={profileMenu} handleMenuClickAction={handleMenuClickAction}
                animatedStyle={animatedStyle} />}
            ItemSeparatorComponent={() => { return (<View style={SDGenericStyles.paddingVertical2} />); }} />

        {
            !loggedInUser.isLoggedIn &&
            <View>
                <View style={userAuthStyles.menuLoginButton}>
                    <TouchableOpacity activeOpacity={.7} style={[SDGenericStyles.paddingVertical12, SDGenericStyles.borderRadius28, SDGenericStyles.backgroundColorYellow]}
                        onPress={() => navigation.navigate(screens.LOGIN)}>
                        <Text style={[SDGenericStyles.ft16, SDGenericStyles.textCenterAlign, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.textColorSDOMBlack]}>
                            {actionButtonTextConstants.LOGIN.toUpperCase()}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={userAuthStyles.menuRegisterButton}>
                    <TouchableOpacity activeOpacity={.7} onPress={() => navigation.navigate(screens.REGISTER)}>
                        <Text style={[SDGenericStyles.ft16, SDGenericStyles.textCenterAlign, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.borderRadius28,
                        SDGenericStyles.colorYellow, SDGenericStyles.textBoxGray, SDGenericStyles.paddingVertical12]}>
                            {actionButtonTextConstants.REGISTER.toUpperCase()}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        }
        <ErrorModal error={errorMod} setError={setErrorMod} />
        <UserVerifyModal profileMenu={profileMenu} setProfileMenu={setProfileMenu} loggedInUser={loggedInUser} setLoaderCallback={setLoaderCallback}
            setLoggedInUser={setLoggedInUser} fetchUpdateLoggedInUserProfile={fetchUpdateLoggedInUserProfile} />
    </SafeAreaView >;
});
