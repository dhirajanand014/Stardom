import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Image, InteractionManager, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { FlatList } from 'react-native-gesture-handler';
import { CategoryContext } from '../App';
import { RegisterUserIcon } from '../components/icons/RegisterUserIcon';
import { UserSelectionOptionModal } from '../components/modals/UserSelectionOptionModal';
import { UserVerifyModal } from '../components/modals/UserVerifyModal';
import {
    actionButtonTextConstants, alertTextMessages, fieldControllerName, jsonConstants, miscMessage, modalTextConstants,
    numericConstants, PRIVATE_FOLLOW_UNFOLLOW, requestConstants, screens, stringConstants
} from '../constants/Constants';
import { fetchUpdateLoggedInUserProfile, getLoggedInUserDetails, logoutUser, prepareLoggedInMenu, prepareSDOMMenu } from '../helper/Helper';
import { colors, glancePostStyles, SDGenericStyles, userAuthStyles, userMenuStyles } from '../styles/Styles';
import { MenuRenderer } from '../views/menus/MenuRenderer';

export const SDUserMenus = (drawerProps) => {

    const navigation = useNavigation();
    const { setLoaderCallback, currentPostIndexForProfileRef, drawerOpenStatus } = useContext(CategoryContext);

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
    const [bottomSheetState, setBottomSheetState] = useState({ showUserOptionModal: false });
    const [menuLoggedInUser, setMenuLoggedInUser] = useState({
        loginDetails: stringConstants.EMPTY,
        isLoggedIn: false
    });
    const handleMenuClickAction = useCallback(async (item) => {
        setLoaderCallback(true);
        switch (item.key) {
            case screens.EDIT_USER_PROFILE:
                navigation.navigate(screens.EDIT_USER_PROFILE);
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
                setBottomSheetState({ ...bottomSheetState, showUserOptionModal: true });
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

    const injectMenuOptions = (index, allMenuOptions, numberOfDeletes, label, key, isLoggedIn, icon) => {
        index += numericConstants.ONE;
        allMenuOptions.splice(index, numberOfDeletes, { label: label, key: key, loggedIn: isLoggedIn, icon: icon });
    }

    const logoutAction = useCallback(async () => {
        setBottomSheetState({ ...bottomSheetState, showUserOptionModal: false });
        await logoutUser(menuLoggedInUser.loginDetails.token, menuLoggedInUser, setMenuLoggedInUser);
        navigation.reset({ index: numericConstants.ZERO, routes: [{ name: screens.GLANCE }] });
        currentPostIndexForProfileRef.current = numericConstants.ZERO;
    });

    const filterOutLoginMenus = useCallback((allMenuOptions, details) => {
        let index = allMenuOptions.findIndex(menu => menu.label == miscMessage.FOLLOWING_TEXT)
        if (details) {
            const followers = details.followers;
            profileMenu.privateRequestCount = followers.filter(follower => follower.pvtaccess == PRIVATE_FOLLOW_UNFOLLOW.REQUESTED).length;
            if (!allMenuOptions.some(menu => menu.label == miscMessage.PRIVATE_REQUEST_ACCESS) && profileMenu.privateRequestCount > numericConstants.ZERO) {
                injectMenuOptions(index, allMenuOptions, numericConstants.ZERO, miscMessage.PRIVATE_REQUEST_ACCESS, screens.USER_FOLLOWERS_FOLLOWING,
                    true, require(`../assets/menu/get_verified_icon.gif`));
            }
            if (!profileMenu.showSubmitVerifyModal) {
                if ((details.verification && details.id == details.verification.user) && allMenuOptions.some(menu => menu.label == miscMessage.GET_VERIFIED)) {
                    const index = allMenuOptions.findIndex(menu => menu.label == miscMessage.GET_VERIFIED);
                    allMenuOptions.splice(index, numericConstants.ONE)
                } else if (!allMenuOptions.some(menu => menu.label == miscMessage.GET_VERIFIED) && (details.user_type !== miscMessage.VERIFIED_AUTHOR
                    || details.user_type !== miscMessage.AUTHOR_UNAPPROVED) && (!details.verification)) {
                    injectMenuOptions(index, allMenuOptions, numericConstants.ZERO, miscMessage.GET_VERIFIED, actionButtonTextConstants.VERIFY_USER,
                        true, require(`../assets/menu/get_verified_icon.gif`));
                }
            }
        }
    });

    const makeInIndia = () => {
        return <View style={[SDGenericStyles.fill, SDGenericStyles.rowFlexDirection, SDGenericStyles.paddingVertical10, SDGenericStyles.mt20]}>
            <View style={[SDGenericStyles.paddingHorizontal12, SDGenericStyles.alignItemsStart,
            SDGenericStyles.justifyContentCenter]}>
                <Text style={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.colorYellow]}>
                    {miscMessage.MAKE_IN_INDIA.toUpperCase()}
                </Text>
                <Text style={[SDGenericStyles.ft14, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.colorWhite]}>
                    {miscMessage.INITIATIVE}
                </Text>
            </View>
            <View style={[userAuthStyles.makeInIndiaRightImageIconView, SDGenericStyles.justifyContentCenter,
            SDGenericStyles.alignItemsCenter]}>
                <Image style={[SDGenericStyles.fill, userMenuStyles.makeInIndiaImage]}
                    source={require(`../assets/menu/make_in_india.png`)} />
            </View>
        </View>;
    }

    useEffect(() => {
        (async () => {
            const user = await getLoggedInUserDetails();
            if (user.details || menuLoggedInUser.isLoggedIn) {
                menuLoggedInUser.loginDetails = { ...user };
                menuLoggedInUser.isLoggedIn = true
                await prepareLoggedInMenu(profileMenu, menuLoggedInUser, setMenuLoggedInUser, drawerOpenStatus, filterOutLoginMenus);
            } else {
                profileMenu.userMenus = prepareSDOMMenu().filter(menu => !menu.loggedIn);
                profileMenu.followersCount = profileMenu.followingCount = numericConstants.ZERO;
            }
            drawerOpenStatus.current = false;
            InteractionManager.runAfterInteractions(() => setProfileMenu({ ...profileMenu }));
        })();
    }, [drawerOpenStatus.current]);

    return (
        <SDMenuRenderer menuLoggedInUser={menuLoggedInUser} profileMenu={profileMenu} navigation={navigation} handleMenuClickAction={handleMenuClickAction} setLoaderCallback={setLoaderCallback}
            drawerProps={drawerProps} setMenuLoggedInUser={setMenuLoggedInUser} setProfileMenu={setProfileMenu} makeInIndia={makeInIndia} drawerOpenStatus={drawerOpenStatus} bottomSheetState={bottomSheetState}
            setBottomSheetState={setBottomSheetState} logoutAction={logoutAction} />
    )
}

const SDMenuRenderer = React.memo(({ menuLoggedInUser, profileMenu, navigation, handleMenuClickAction, setMenuLoggedInUser, setProfileMenu, setLoaderCallback, drawerProps, makeInIndia, drawerOpenStatus,
    bottomSheetState, setBottomSheetState, logoutAction }) => {
    return <SafeAreaView style={SDGenericStyles.fill}>
        <View style={[SDGenericStyles.alignSelfEnd, SDGenericStyles.justifyContentCenter]}>
            <TouchableOpacity activeOpacity={.7} onPress={() => { drawerOpenStatus.current = false; drawerProps.navigation.closeDrawer(); }}
                style={[SDGenericStyles.paddingRight10, SDGenericStyles.paddingTop40, SDGenericStyles.justifyContentCenter]}>
                <Image style={userAuthStyles.menu_close_icon_style} source={require(`../assets/menu/close_icon.png`)} />
            </TouchableOpacity>
        </View>
        {
            menuLoggedInUser.isLoggedIn &&
            <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.mb25]}>
                <View style={userMenuStyles.profileImageView}>
                    <TouchableOpacity activeOpacity={.7}>
                        {profileMenu.profileImage && <FastImage source={{ uri: profileMenu.profileImage, priority: FastImage.priority.normal }}
                            style={[userMenuStyles.profileImageStyle, SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter,
                            SDGenericStyles.elevation8]} /> ||
                            <RegisterUserIcon width={numericConstants.SIXTY} height={numericConstants.SIXTY} stroke={colors.SDOM_PLACEHOLDER} />}
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
                    <TouchableOpacity activeOpacity={.7} style={[SDGenericStyles.paddingHorizontal15, SDGenericStyles.alignItemsCenter, SDGenericStyles.paddingVertical5]}
                        onPress={() => handleMenuClickAction({ key: modalTextConstants.VIEW_PROFILE })} activeOpacity={.7}>
                        <Text style={[SDGenericStyles.ft12, SDGenericStyles.textCenterAlign, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium]}>
                            {miscMessage.VIEW.toUpperCase()}{stringConstants.SPACE}{fieldControllerName.PROFILE.toUpperCase()}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.positionAbsolute, glancePostStyles.editProfileAbsolute, SDGenericStyles.justifyContentCenter]}>
                    <TouchableOpacity style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.paddingVertical23, SDGenericStyles.paddingHorizontal12]}
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
            renderItem={({ item, index }) => <MenuRenderer item={item} index={index} profileMenu={profileMenu} handleMenuClickAction={handleMenuClickAction} />}
            ListFooterComponent={makeInIndia} />

        {
            !menuLoggedInUser.isLoggedIn &&
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
        <UserVerifyModal profileMenu={profileMenu} setProfileMenu={setProfileMenu} menuLoggedInUser={menuLoggedInUser} setLoaderCallback={setLoaderCallback}
            setMenuLoggedInUser={setMenuLoggedInUser} fetchUpdateLoggedInUserProfile={fetchUpdateLoggedInUserProfile} />
        <UserSelectionOptionModal bottomSheetState={bottomSheetState} setBottomSheetState={setBottomSheetState} textMessage={alertTextMessages.CONFIRM_LOGOUT}
            successButton={actionButtonTextConstants.YES.toUpperCase()} handleSubmit={logoutAction} />
    </SafeAreaView>;
});