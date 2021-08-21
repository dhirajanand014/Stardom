
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { BackButton } from '../components/button/BackButton';
import { isIOS, miscMessage, numericConstants, AboutStardomTexts } from '../constants/Constants';
import { isCloseToBottom } from '../helper/Helper';
import { glancePostStyles, SDGenericStyles } from '../styles/Styles';
import { SDLoaderLogo } from '../views/absoluteView/SDLoaderLogo';

export const AboutStardom = () => {

    const navigation = useNavigation();

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.alignItemsCenter, SDGenericStyles.backGroundColorBlack, SDGenericStyles.paddingTop20]}>
            <BackButton goBack leftStyle={numericConstants.TEN} extraStyles={SDGenericStyles.marginTop20} />
            <TouchableOpacity activeOpacity={.7} style={[SDGenericStyles.positionAbsolute, SDGenericStyles.right8, SDGenericStyles.padding8, SDGenericStyles.paddingTop30]}
                onPress={() => navigation.goBack()} >
                <Image style={[glancePostStyles.icon_modal_close, SDGenericStyles.tintColorWhite]} source={require('../assets/post_modal_close_icon.png')} />
            </TouchableOpacity>
            <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.marginTop20, {
                paddingTop: isIOS && numericConstants.TWENTY || numericConstants.ZERO
            }]}>
                <Text style={[SDGenericStyles.ft20, SDGenericStyles.textColorPink, SDGenericStyles.fontFamilyRobotoMedium]}>{miscMessage.ABOUT_STARDOM}</Text>
                <View style={[glancePostStyles.EULAModalTitleDivider, SDGenericStyles.backgroundColorWhite]} />
            </View>
            <ScrollView style={[glancePostStyles.EULAContainer, SDGenericStyles.marginHorizontal10, SDGenericStyles.backGroundColorBlack, SDGenericStyles.padding8]} bounces
                onScroll={({ nativeEvent }) => isCloseToBottom(nativeEvent) && setAcceptedEULA(true)}>
                <Text style={[SDGenericStyles.mt10, SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.textColorWhite]}>{AboutStardomTexts.P1}</Text>
                <Text style={[SDGenericStyles.mv10, SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.textColorWhite]}>{AboutStardomTexts.P2}</Text>
                <Text style={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.textColorWhite]}>{AboutStardomTexts.P3}</Text>
                <Text style={[SDGenericStyles.mv10, SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.textColorWhite]}>{AboutStardomTexts.P4}</Text>
                <Text style={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.textColorWhite]}>{AboutStardomTexts.P5}</Text>
                <Text style={[SDGenericStyles.mv10, SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.textColorWhite]}>{AboutStardomTexts.P6}</Text>
                <Text style={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.textColorWhite]}>{AboutStardomTexts.P7}</Text>
                <Text style={[SDGenericStyles.mv10, SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.textColorWhite]}>{AboutStardomTexts.P8}</Text>
            </ScrollView>
            <SDLoaderLogo />
        </View>
    );
}