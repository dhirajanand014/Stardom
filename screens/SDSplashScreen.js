import React, { useEffect } from 'react'
import { SafeAreaView, Text, ImageBackground, Dimensions, StatusBar, Image, View } from 'react-native';
import { SDGenericStyles } from '../styles/Styles';
import { getCategoryButtonType, getSelectedCategoryIdsFromStorage, notificationAction } from '../helper/Helper';
import { jsonConstants, miscMessage, numericConstants, screens, width } from '../constants/Constants';
import { useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import FastImage from 'react-native-fast-image';
import { SDLoaderLogo } from '../views/absoluteView/SDLoaderLogo';

export const SDSplashScreen = () => {

    const navigation = useNavigation();

    const navigateUser = async (savedCategoryIds, categoryButtonType) => {
        const route = savedCategoryIds && categoryButtonType && screens.GLANCE || screens.INTRO;
        navigation.reset({ index: numericConstants.ZERO, routes: [{ name: route }], key: screens.GLANCE });
    }

    const fetchNavigationDetails = async () => {
        const backgroundNotification = await messaging().getInitialNotification();
        if (backgroundNotification && backgroundNotification.notification) {
            await notificationAction(backgroundNotification, navigation);
        } else {
            const savedCategoryIds = await getSelectedCategoryIdsFromStorage();
            const categoryButtonType = await getCategoryButtonType();
            await navigateUser(savedCategoryIds, categoryButtonType);
        }
    }

    useEffect(() => {
        (async () => {
            await fetchNavigationDetails();
        })();
        messaging().onTokenRefresh(async tokenRefresh =>
            console.log('Token refresh!', tokenRefresh)
        );
        messaging().onNotificationOpenedApp(async remoteMessage => {
            (async () => {
                remoteMessage.foreground = true;
                await notificationAction(remoteMessage, navigation, miscMessage.FROM_ON_NOTIFICATION);
            })();
        });
    }, jsonConstants.EMPTY);

    let { height } = Dimensions.get(miscMessage.WINDOW);
    height += StatusBar.currentHeight;

    return (
        <SafeAreaView style={[SDGenericStyles.fill, SDGenericStyles.justifyContentCenter, SDGenericStyles.alignItemsCenter, SDGenericStyles.backGroundColorBlack]}>
            <ImageBackground style={[SDGenericStyles.justifyItemsEnd, SDGenericStyles.paddingBottom150,
            { height: height, width: width }]} source={require(`../assets/splash_screen_image.png`)} >
                <Text style={[SDGenericStyles.ft18, SDGenericStyles.textCenterAlign, SDGenericStyles.fontFamilyRobotoRegular,
                SDGenericStyles.textColorWhite, SDGenericStyles.paddingVertical10]}>{miscMessage.LOADING}</Text>
                <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.mt5]}>
                    <FastImage source={{
                        uri: Image.resolveAssetSource(require(`../assets/stardom_loader.gif`)).uri,
                        priority: FastImage.priority.normal
                    }} style={{ width: numericConstants.FIFTY, height: numericConstants.FIFTY }} resizeMode={FastImage.resizeMode.contain} />
                </View>
                <SDLoaderLogo />
            </ImageBackground>
        </SafeAreaView>
    )
}