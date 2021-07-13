import { useIsFocused, useNavigation } from '@react-navigation/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import { CategoryContext } from '../App';
import { RegisterUserIcon } from '../components/icons/RegisterUserIcon';
import { UserVerifyModal } from '../components/modals/UserVerifyModal';
import {
    actionButtonTextConstants, fieldControllerName, jsonConstants, miscMessage, modalTextConstants,
    numericConstants, PRIVATE_FOLLOW_UNFOLLOW, requestConstants, screens, stringConstants
} from '../constants/Constants';
import { prepareSDOMMenu, fetchProfilePostsCounts, logoutUser, fetchUpdateLoggedInUserProfile } from '../helper/Helper';
import { colors, glancePostStyles, SDGenericStyles, userAuthStyles, userMenuStyles } from '../styles/Styles';
import { MenuRenderer } from '../views/menus/MenuRenderer';

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
                if (details.user_type == miscMessage.VERIFIED_AUTHOR || details.user_type == miscMessage.AUTHOR_UNAPPROVED) {
                    return false;
                }
                return true;
            case screens.USER_FOLLOWERS_FOLLOWING:
                if (menu.label == miscMessage.PRIVATE_REQUEST_ACCESS) {
                    const followers = details.followers;
                    profileMenu.privateRequestCount = followers.filter(follower => follower.pvtaccess == PRIVATE_FOLLOW_UNFOLLOW.REQUESTED).length;
                    return profileMenu.privateRequestCount > numericConstants.ZERO;
                }
                return true;
            default: return true;
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
            setProfileMenu({ ...profileMenu });
        })();
    }, [loggedInUser.loginDetails, isFocused]);

    return (
        <SDMenuRenderer loggedInUser={loggedInUser} profileMenu={profileMenu} navigation={navigation} handleMenuClickAction={handleMenuClickAction} setLoaderCallback={setLoaderCallback}
            drawerProps={drawerProps} setLoggedInUser={setLoggedInUser} setProfileMenu={setProfileMenu} />
    )
}

const SDMenuRenderer = React.memo(({ loggedInUser, profileMenu, navigation, handleMenuClickAction, setLoggedInUser, setProfileMenu, setLoaderCallback, drawerProps }) => {
    return <SafeAreaView style={SDGenericStyles.fill}>
        <View style={[SDGenericStyles.alignSelfEnd, SDGenericStyles.justifyContentCenter]}>
            <TouchableOpacity activeOpacity={.7} onPress={() => drawerProps.navigation.closeDrawer()}
                style={[SDGenericStyles.paddingRight10, SDGenericStyles.paddingTop40, SDGenericStyles.justifyContentCenter]}>
                <Image style={userAuthStyles.menu_close_icon_style} source={require(`../assets/menu/close_icon.png`)} />
            </TouchableOpacity>
        </View>
        {
            loggedInUser.isLoggedIn &&
            <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.mb25]}>
                <View style={userMenuStyles.profileImageView}>
                    <TouchableOpacity activeOpacity={.7}>
                        {profileMenu.profileImage && <FastImage source={{ uri: profileMenu.profileImage, priority: FastImage.priority.normal }}
                            style={[userMenuStyles.profileImageStyle, SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter,
                            SDGenericStyles.elevation8]} /> ||
                            <RegisterUserIcon width={numericConstants.EIGHTY} height={numericConstants.EIGHTY} stroke={colors.SDOM_PLACEHOLDER} />}
                    </TouchableOpacity>
                </View>
                <View style={[SDGenericStyles.alignItemsStart, SDGenericStyles.justifyContentCenter]}>
                    <Text style={[SDGenericStyles.paddingHorizontal15, SDGenericStyles.ft20, SDGenericStyles.textColorWhite,
                    SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.alignItemsStart]}>
                        {profileMenu.profileName}
                    </Text>
                    <Text style={[SDGenericStyles.paddingHorizontal15, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.ft14,
                    SDGenericStyles.placeHolderTextColor, SDGenericStyles.alignItemsStart]}>
                        {profileMenu.profileUserId}
                    </Text>
                </View>
                <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.positionAbsolute, glancePostStyles.editProfileAbsolute, SDGenericStyles.justifyContentCenter]}>
                    <TouchableOpacity style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.paddingVertical20, SDGenericStyles.paddingHorizontal10]}
                        onPress={() => handleMenuClickAction({ key: modalTextConstants.VIEW_PROFILE })} activeOpacity={.7}>
                        <RegisterUserIcon style={SDGenericStyles.justifyContentCenter} height={numericConstants.TWENTY_FIVE}
                            width={numericConstants.TWENTY_FIVE} stroke={colors.WHITE} />
                        <Text style={[SDGenericStyles.ft10, SDGenericStyles.textCenterAlign, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium]}>
                            {miscMessage.VIEW.toUpperCase()}
                        </Text>
                        <Text style={[SDGenericStyles.ft10, SDGenericStyles.textCenterAlign, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium]}>
                            {fieldControllerName.PROFILE.toUpperCase()}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.paddingVertical23, SDGenericStyles.paddingHorizontal10]}
                        onPress={() => handleMenuClickAction({ key: screens.EDIT_USER_PROFILE })} activeOpacity={.7}>
                        <Image style={[SDGenericStyles.menuEditIcon, SDGenericStyles.justifyContentCenter, SDGenericStyles.ml_3, SDGenericStyles.marginBottom1]}
                            source={require(`../assets/menu/edit_icon.png`)} />
                        <Text style={[SDGenericStyles.ft10, SDGenericStyles.textCenterAlign, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium]}>
                            {requestConstants.EDIT.toUpperCase()}
                        </Text>
                        <Text style={[SDGenericStyles.ft10, SDGenericStyles.textCenterAlign, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium]}>
                            {fieldControllerName.PROFILE.toUpperCase()}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View> || <View style={[userMenuStyles.profileImageView, SDGenericStyles.rowFlexDirection, SDGenericStyles.m30]} />
        }

        <FlatList data={profileMenu.userMenus} numColumns={numericConstants.ONE} keyExtractor={(item) => item.label}
            renderItem={({ item, index }) => <MenuRenderer item={item} index={index} profileMenu={profileMenu} handleMenuClickAction={handleMenuClickAction} />} />

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
        <UserVerifyModal profileMenu={profileMenu} setProfileMenu={setProfileMenu} loggedInUser={loggedInUser} setLoaderCallback={setLoaderCallback}
            setLoggedInUser={setLoggedInUser} fetchUpdateLoggedInUserProfile={fetchUpdateLoggedInUserProfile} />
    </SafeAreaView >;
});
