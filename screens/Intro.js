import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AppIntro from 'rn-falcon-app-intro';
import { View, Image, Dimensions, StatusBar } from 'react-native';
import { colors, introStyles } from '../styles/Styles';
import { colorConstants, miscMessage } from '../constants/Constants';
import FastImage from 'react-native-fast-image';
import { numericConstants, screens, width } from '../constants/Constants';
export const Intro = () => {

    const navigation = useNavigation();

    const doneBtnHandle = () => {
        navigation.navigate(screens.CATEGORY, { fromIntro: true });
    }

    const preLoadIntroImages = [require(`../assets/intro/stardom_intro_page_1.jpg`),
    require(`../assets/intro/stardom_intro_page_2.jpg`), require(`../assets/intro/stardom_intro_page_3.jpg`),
    require(`../assets/intro/stardom_intro_page_4.jpg`), require(`../assets/intro/stardom_intro_page_5.jpg`),
    require(`../assets/intro/stardom_intro_page_6.jpg`), require(`../assets/intro/stardom_intro_page_7.jpg`)];

    const uris = preLoadIntroImages.map(image => ({
        uri: Image.resolveAssetSource(image).uri
    }));

    let { height } = Dimensions.get(miscMessage.WINDOW);
    height += StatusBar.currentHeight - numericConstants.ONE_HUNDRED;

    FastImage.preload(uris);

    return (
        <AppIntro onSkipBtnClick={doneBtnHandle} onDoneBtnClick={doneBtnHandle} activeDotColor={colorConstants.YELLOW}>
            <View level={numericConstants.TWENTY} style={[introStyles.slide, {
                width: width, height: height, backgroundColor: colors.SDOM_INTRO_BACKGROUND
            }]}>
                <FastImage source={{
                    uri: Image.resolveAssetSource(require(`../assets/intro/stardom_intro_page_1.jpg`)).uri,
                    priority: FastImage.priority.normal
                }} style={{ width: width, height: height }} resizeMode={FastImage.resizeMode.stretch} />
            </View>
            <View level={numericConstants.FIFTEEN} style={[introStyles.slide, {
                width: width, height: height, backgroundColor: colors.SDOM_INTRO_BACKGROUND
            }]}>
                <FastImage source={{
                    uri: Image.resolveAssetSource(require(`../assets/intro/stardom_intro_page_2.jpg`)).uri,
                    priority: FastImage.priority.normal
                }} style={{ width: width, height: height }} resizeMode={FastImage.resizeMode.stretch} />
            </View>
            <View level={numericConstants.TWENTY} style={[introStyles.slide, {
                width: width, height: height, backgroundColor: colors.SDOM_INTRO_BACKGROUND
            }]}>
                <FastImage source={{
                    uri: Image.resolveAssetSource(require(`../assets/intro/stardom_intro_page_3.jpg`)).uri,
                    priority: FastImage.priority.normal
                }} style={{ width: width, height: height }} resizeMode={FastImage.resizeMode.stretch} />
            </View>
            <View level={numericConstants.FIFTEEN} style={[introStyles.slide, {
                width: width, height: height, backgroundColor: colors.SDOM_INTRO_BACKGROUND
            }]}>
                <FastImage source={{
                    uri: Image.resolveAssetSource(require(`../assets/intro/stardom_intro_page_4.jpg`)).uri,
                    priority: FastImage.priority.normal
                }} style={{ width: width, height: height }} resizeMode={FastImage.resizeMode.stretch} />
            </View>
            <View level={numericConstants.TWENTY} style={[introStyles.slide, {
                width: width, height: height, backgroundColor: colors.SDOM_INTRO_BACKGROUND
            }]}>
                <FastImage source={{
                    uri: Image.resolveAssetSource(require(`../assets/intro/stardom_intro_page_5.jpg`)).uri,
                    priority: FastImage.priority.normal
                }} style={{ width: width, height: height }} resizeMode={FastImage.resizeMode.stretch} />
            </View>
            <View level={numericConstants.FIFTEEN} style={[introStyles.slide, {
                width: width, height: height, backgroundColor: colors.SDOM_INTRO_BACKGROUND
            }]}>
                <FastImage source={{
                    uri: Image.resolveAssetSource(require(`../assets/intro/stardom_intro_page_6.jpg`)).uri,
                    priority: FastImage.priority.normal
                }} style={{ width: width, height: height }} resizeMode={FastImage.resizeMode.stretch} />
            </View>
            <View level={numericConstants.FIFTEEN} style={[introStyles.slide, {
                width: width, height: height, backgroundColor: colors.SDOM_INTRO_BACKGROUND
            }]}>
                <FastImage source={{
                    uri: Image.resolveAssetSource(require(`../assets/intro/stardom_intro_page_7.jpg`)).uri,
                    priority: FastImage.priority.normal
                }} style={{ width: width, height: height }} resizeMode={FastImage.resizeMode.stretch} />
            </View>
        </AppIntro>
    )
}