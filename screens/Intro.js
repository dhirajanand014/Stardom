import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AppIntro from 'rn-falcon-app-intro';
import { View, Image } from 'react-native';
import { introStyles } from '../styles/Styles';
import { colorConstants } from '../constants/Constants';
import FastImage from 'react-native-fast-image';
import { height, numericConstants, screens, width } from '../constants/Constants';
export const Intro = () => {

    const navigation = useNavigation();

    const doneBtnHandle = () => {
        navigation.navigate(screens.CATEGORY, { fromIntro: true });
    }

    const preLoadIntroImages = [require(`../assets/intro/wallpiper_intro_page_1.jpg`),
    require(`../assets/intro/wallpiper_intro_page_2.jpg`), require(`../assets/intro/wallpiper_intro_page_3.jpg`),
    require(`../assets/intro/wallpiper_intro_page_4.jpg`), require(`../assets/intro/wallpiper_intro_page_5.jpg`),
    require(`../assets/intro/wallpiper_intro_page_6.jpg`)];

    const uris = preLoadIntroImages.map(image => ({
        uri: Image.resolveAssetSource(image).uri
    }));

    FastImage.preload(uris);

    return (
        <AppIntro onSkipBtnClick={doneBtnHandle} onDoneBtnClick={doneBtnHandle} activeDotColor={colorConstants.YELLOW}>
            <View level={numericConstants.TWENTY} style={[introStyles.slide, { width: width, height: height }]}>
                <FastImage source={{
                    uri: Image.resolveAssetSource(require(`../assets/intro/wallpiper_intro_page_1.jpg`)).uri,
                    priority: FastImage.priority.normal
                }} style={{ width: width, height: height }} resizeMode={FastImage.resizeMode.stretch} />
            </View>
            <View level={numericConstants.FIFTEEN} style={[introStyles.slide, { width: width, height: height }]}>
                <FastImage source={{
                    uri: Image.resolveAssetSource(require(`../assets/intro/wallpiper_intro_page_2.jpg`)).uri,
                    priority: FastImage.priority.normal
                }} style={{ width: width, height: height }} resizeMode={FastImage.resizeMode.stretch} />
            </View>
            <View level={numericConstants.TWENTY} style={[introStyles.slide, { width: width, height: height }]}>
                <FastImage source={{
                    uri: Image.resolveAssetSource(require(`../assets/intro/wallpiper_intro_page_3.jpg`)).uri,
                    priority: FastImage.priority.normal
                }} style={{ width: width, height: height }} resizeMode={FastImage.resizeMode.stretch} />
            </View>
            <View level={numericConstants.FIFTEEN} style={[introStyles.slide, { width: width, height: height }]}>
                <FastImage source={{
                    uri: Image.resolveAssetSource(require(`../assets/intro/wallpiper_intro_page_4.jpg`)).uri,
                    priority: FastImage.priority.normal
                }} style={{ width: width, height: height }} resizeMode={FastImage.resizeMode.stretch} />
            </View>
            <View level={numericConstants.TWENTY} style={[introStyles.slide, { width: width, height: height }]}>
                <FastImage source={{
                    uri: Image.resolveAssetSource(require(`../assets/intro/wallpiper_intro_page_5.jpg`)).uri,
                    priority: FastImage.priority.normal
                }} style={{ width: width, height: height }} resizeMode={FastImage.resizeMode.stretch} />
            </View>
            <View level={numericConstants.FIFTEEN} style={[introStyles.slide, { width: width, height: height }]}>
                <FastImage source={{
                    uri: Image.resolveAssetSource(require(`../assets/intro/wallpiper_intro_page_6.jpg`)).uri,
                    priority: FastImage.priority.normal
                }} style={{ width: width, height: height }} resizeMode={FastImage.resizeMode.stretch} />
            </View>
        </AppIntro>
    )
}