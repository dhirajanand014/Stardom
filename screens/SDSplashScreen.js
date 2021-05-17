import React, { useContext, useEffect } from 'react'
import { ActivityIndicator, Image, SafeAreaView, Text, View } from 'react-native';
import { colors, glancePostStyles, SDGenericStyles } from '../styles/Styles';
import { CategoryContext } from '../App';
import { getCategoryButtonType, getSelectedCategoryIdsFromStorage } from '../helper/Helper';
import { jsonConstants, miscMessage, numericConstants, screens } from '../constants/Constants';
import { useNavigation } from '@react-navigation/native';
import { StardomIcon } from '../components/icons/StardomIcon';
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
        SDGenericStyles.backgroundColorWhite]}>
            <StardomIcon height={numericConstants.ONE_HUNDRED_FIFTY} width={numericConstants.ONE_HUNDRED_FIFTY}
                stroke={colors.SEMI_TRANSPARENT} fill={colors.SDOM_YELLOW} />
            <Text style={[SDGenericStyles.ft18, SDGenericStyles.textCenterAlign, SDGenericStyles.fontFamilyRoman,
            SDGenericStyles.placeHolderTextColor, SDGenericStyles.paddingVertical14]}>{miscMessage.LOADING}</Text>
            <Image source={require('../assets/stardom_loader.gif')} autoPlay loop
                hardwareAccelerationAndroid style={[SDGenericStyles.mt20, glancePostStyles.preloaderStyle]} />
        </SafeAreaView>
    )
}