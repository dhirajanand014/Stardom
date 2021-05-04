import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ErrorModal } from '../components/modals/ErrorModal';
import { actionButtonTextConstants, numericConstants, screens, stringConstants } from '../constants/Constants';
import { prepareSDOMMenu } from '../helper/Helper';
import { SDGenericStyles, userAuthStyles, userMenuStyles } from '../styles/Styles';
import { MenuRenderer } from '../views/menus/MenuRenderer';

export const SDOMContext = React.createContext();

export const SDUserMenus = props => {

    const navigation = useNavigation();

    const [errorMod, setErrorMod] = useState({
        title: stringConstants.EMPTY,
        message: stringConstants.EMPTY,
        showModal: false
    });

    const userMenus = prepareSDOMMenu();

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack]}>
            <View style={[userMenuStyles.profileImageView, SDGenericStyles.mb40]}>
                <TouchableOpacity activeOpacity={.7}>
                    <FastImage resizeMode={FastImage.resizeMode.contain} source={{
                        uri: `https://reactnative.dev/img/tiny_logo.png`,
                        priority: FastImage.priority.normal,
                        cache: FastImage.cacheControl.immutable
                    }} style={[userMenuStyles.profileImageStyle, SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter]} />
                </TouchableOpacity>

                <Text style={[SDGenericStyles.paddingVertical5, SDGenericStyles.paddingHorizontal10, SDGenericStyles.placeHolderTextColor]}>
                    Profile name
                    </Text>
            </View>
            <FlatList data={userMenus} numColumns={numericConstants.ONE} keyExtractor={(item) => item.key}
                renderItem={({ item, index }) => MenuRenderer(item, index, navigation)}
                ItemSeparatorComponent={() => { return (<View style={SDGenericStyles.paddingVertical2} />) }} />

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
            <ErrorModal error={errorMod} setError={setErrorMod} />
        </View>
    )
}