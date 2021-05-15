import React, { useContext, useEffect } from 'react'
import { ActivityIndicator, SafeAreaView, Text, Image } from 'react-native';
import { colors, SDGenericStyles, userAuthStyles } from '../styles/Styles';
import { CategoryContext } from '../App';
import { getCategoryButtonType, getSelectedCategoryIdsFromStorage } from '../helper/Helper';
import { jsonConstants, miscMessage, numericConstants, screens } from '../constants/Constants';
import { useNavigation } from '@react-navigation/native';
//import messaging from '@react-native-firebase/messaging';

export const SDSplashScreen = () => {

    const navigation = useNavigation();
    const { error, setError, signUpDetails } = useContext(CategoryContext);

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
        <SafeAreaView style={[SDGenericStyles.fill, SDGenericStyles.justifyContentCenter, SDGenericStyles.alignItemsCenter,
        SDGenericStyles.backGroundColorBlack]}>
            <Image source={require('../assets/stardom_icon.png')} autoPlay loop
                hardwareAccelerationAndroid style={userAuthStyles.splashScreenAnimatedImage} />
            <Text style={[SDGenericStyles.ft18, SDGenericStyles.textCenterAlign, SDGenericStyles.fontFamilyRoman,
            SDGenericStyles.placeHolderTextColor, SDGenericStyles.paddingVertical14]}>{miscMessage.LOADING}</Text>
            <ActivityIndicator color={colors.SDOM_YELLOW} shouldRasterizeIOS hidesWhenStopped style={SDGenericStyles.mt20} />
        </SafeAreaView>
    )
}