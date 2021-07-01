import React, { useEffect } from 'react'
import { ActivityIndicator, SafeAreaView, Text, ImageBackground } from 'react-native';
import { colors, SDGenericStyles } from '../styles/Styles';
import { getCategoryButtonType, getSelectedCategoryIdsFromStorage } from '../helper/Helper';
import { height, jsonConstants, miscMessage, numericConstants, screens, width } from '../constants/Constants';
import { useNavigation } from '@react-navigation/native';
//import messaging from '@react-native-firebase/messaging';

export const SDSplashScreen = () => {

    const navigation = useNavigation();

    const navigateUser = async (savedCategoryIds, categoryButtonType) => {
        const route = savedCategoryIds && categoryButtonType && screens.GLANCE || screens.INTRO;
        navigation.reset({ index: numericConstants.ZERO, routes: [{ name: route }], key: screens.GLANCE });
    }

    const fetchNavigationDetails = async () => {
        const savedCategoryIds = await getSelectedCategoryIdsFromStorage();
        const categoryButtonType = await getCategoryButtonType();
        await navigateUser(savedCategoryIds, categoryButtonType);
    }

    useEffect(() => {
        (async () => {
            await fetchNavigationDetails();
        })();
    }, jsonConstants.EMPTY);

    useEffect(() => {
        // messaging().onTokenRefresh(async tokenRefresh =>
        //     console.log('Token refresh!', tokenRefresh)
        // );
        // messaging().onNotificationOpenedApp(async () => {
        //     console.log('Token refresh!', tokenRefresh)
        // });
        // messaging().getInitialNotification(async () => {
        //     console.log('Token refresh!', tokenRefresh)
        // });
    }, [])
    return (
        <SafeAreaView style={[SDGenericStyles.fill, SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter, SDGenericStyles.alignItemsCenter,
        SDGenericStyles.backGroundColorBlack]}>
            <ImageBackground style={[SDGenericStyles.justifyItemsEnd, SDGenericStyles.paddingBottom150,
            { height: height, width: width }]} source={require(`../assets/splash_screen_image.gif`)} >
                <Text style={[SDGenericStyles.ft18, SDGenericStyles.textCenterAlign, SDGenericStyles.fontFamilyRobotoRegular,
                SDGenericStyles.textColorWhite, SDGenericStyles.paddingVertical10]}>{miscMessage.LOADING}</Text>
                <ActivityIndicator color={colors.SDOM_YELLOW} shouldRasterizeIOS hidesWhenStopped style={SDGenericStyles.mt5} />
            </ImageBackground>
        </SafeAreaView>
    )
}