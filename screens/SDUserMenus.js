import { useNavigation } from '@react-navigation/core';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { CategoryContext } from '../App';
import { RegisterUserIcon } from '../components/icons/RegisterUserIcon';
import { ErrorModal } from '../components/modals/ErrorModal';
import {
    actionButtonTextConstants, jsonConstants, numericConstants, screens, stringConstants
} from '../constants/Constants';
import { prepareSDOMMenu, fetchProfilePostsCounts } from '../helper/Helper';
import { colors, SDGenericStyles, userAuthStyles, userMenuStyles } from '../styles/Styles';
import { MenuRenderer } from '../views/menus/MenuRenderer';

export const SDUserMenus = () => {

    const navigation = useNavigation();

    const { loggedInUser } = useContext(CategoryContext);

    const [profileMenu, setProfileMenu] = useState({
        userMenus: jsonConstants.EMPTY,
        profileImage: stringConstants.EMPTY,
        profileName: stringConstants.EMPTY,
        followersCount: numericConstants.ZERO,
        followingCount: numericConstants.ZERO
    })

    const [errorMod, setErrorMod] = useState({
        title: stringConstants.EMPTY,
        message: stringConstants.EMPTY,
        showModal: false
    });

    useEffect(async () => {
        if (loggedInUser.loginDetails.details) {
            profileMenu.userMenus = prepareSDOMMenu();
            const counts = await fetchProfilePostsCounts(loggedInUser);
            const details = JSON.parse(loggedInUser.loginDetails.details);
            profileMenu.profileImage = details.profile_picture;
            profileMenu.profileName = details.name;
            profileMenu.followersCount = counts.followersCount;
            profileMenu.followingCount = counts.followingCount;
        } else {
            profileMenu.userMenus = prepareSDOMMenu().filter(menu => !menu.loggedIn);
        }
        setProfileMenu({ ...profileMenu });
    }, [loggedInUser.loginDetails]);

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack]}>
            <View style={[userMenuStyles.profileImageView, SDGenericStyles.mb40]}>
                <TouchableOpacity activeOpacity={.7}>
                    {
                        !profileMenu.profileImage &&
                        <FastImage resizeMode={FastImage.resizeMode.contain} source={{
                            uri: profileMenu.profileImage, priority: FastImage.priority.normal, cache: FastImage.cacheControl.immutable
                        }} style={[userMenuStyles.profileImageStyle, SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter]} /> ||
                        <View style={[userMenuStyles.profileImageStyle, SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter]}>
                            <RegisterUserIcon width={numericConstants.EIGHTY} height={numericConstants.EIGHTY} stroke={colors.SDOM_PLACEHOLDER} />
                        </View>
                    }
                </TouchableOpacity>
                <Text style={[SDGenericStyles.paddingVertical5, SDGenericStyles.paddingHorizontal10, SDGenericStyles.placeHolderTextColor,
                SDGenericStyles.fontFamilyNormal]}>
                    {profileMenu.profileName}
                </Text>
            </View>
            <FlatList data={profileMenu.userMenus} numColumns={numericConstants.ONE} keyExtractor={(item) => `1_${item.label}`}
                renderItem={({ item, index }) => MenuRenderer(item, index, profileMenu, navigation)}
                ItemSeparatorComponent={() => { return (<View style={SDGenericStyles.paddingVertical2} />) }} />
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
                            <Text style={[SDGenericStyles.ft18, SDGenericStyles.textCenterAlign, SDGenericStyles.fontFamilyRoman,
                            SDGenericStyles.colorYellow]}>{actionButtonTextConstants.REGISTER}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            <ErrorModal error={errorMod} setError={setErrorMod} />
        </View>
    )
}