
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { actionButtonTextConstants, isIOS, miscMessage, numericConstants, EULATexts } from '../constants/Constants';
import { isCloseToBottom, saveEULA } from '../helper/Helper';
import { glancePostStyles, SDGenericStyles } from '../styles/Styles';

export const EULAAcceptance = () => {

    const [acceptedEULA, setAcceptedEULA] = useState(false);

    const navigation = useNavigation();

    const route = useRoute();
    const onSubmit = route.params?.onSubmit;
    const data = route.params?.data;

    const saveEULAAcceptance = async (acceptedEULA) => {
        await saveEULA(acceptedEULA);
        await onSubmit(data);
    }

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.alignItemsCenter, SDGenericStyles.backGroundColorBlack, SDGenericStyles.paddingTop20]}>
            <TouchableOpacity activeOpacity={.7} style={[SDGenericStyles.positionAbsolute, SDGenericStyles.right8, SDGenericStyles.padding8, SDGenericStyles.paddingTop30]}
                onPress={() => navigation.goBack()} >
                <Image style={[glancePostStyles.icon_modal_close, SDGenericStyles.tintColorWhite]} source={require('../assets/post_modal_close_icon.png')} />
            </TouchableOpacity>
            <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.marginTop20, {
                paddingTop: isIOS && numericConstants.TWENTY || numericConstants.ZERO
            }]}>
                <Text style={[SDGenericStyles.ft20, SDGenericStyles.textColorPink, SDGenericStyles.fontFamilyRobotoMedium]}>{miscMessage.DISCLAIMER_PRIVACY_POLICY}</Text>
                <View style={[glancePostStyles.EULAModalTitleDivider, SDGenericStyles.backgroundColorWhite]} />
            </View>
            <ScrollView style={[glancePostStyles.EULAContainer, SDGenericStyles.marginHorizontal10, SDGenericStyles.backGroundColorGray,
            SDGenericStyles.padding8]} bounces
                onScroll={({ nativeEvent }) => isCloseToBottom(nativeEvent) && setAcceptedEULA(true)}>
                <Text style={[SDGenericStyles.mv10, SDGenericStyles.ft14, SDGenericStyles.textColorWhite]}>{EULATexts.LN1}</Text>
                <Text style={[SDGenericStyles.ft14, SDGenericStyles.bold, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textColorWhite]}>{EULATexts.H1}</Text>
                <Text style={[SDGenericStyles.ft14, SDGenericStyles.textColorWhite]}>{EULATexts.LN2}</Text>
                <Text style={[SDGenericStyles.ft14, SDGenericStyles.marginBottom10, SDGenericStyles.textColorWhite]}>{EULATexts.LN3}</Text>
                <Text style={[SDGenericStyles.ft14, SDGenericStyles.fontFamilyRobotoBold, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textColorWhite]}>{EULATexts.H2}</Text>
                <Text style={[SDGenericStyles.ft14, SDGenericStyles.textColorWhite]}>{EULATexts.LN4}</Text>
                <Text style={[SDGenericStyles.ml_8, SDGenericStyles.mv5, SDGenericStyles.textColorWhite]}>{miscMessage.BULLET} {EULATexts.PT1}</Text>
                <Text style={[SDGenericStyles.ml_8, SDGenericStyles.marginVertical2, SDGenericStyles.textColorWhite]}>{miscMessage.BULLET} {EULATexts.PT2}</Text>
                <Text style={[SDGenericStyles.ml_8, SDGenericStyles.marginVertical2, SDGenericStyles.textColorWhite]}>{miscMessage.BULLET} {EULATexts.PT3}</Text>
                <Text style={[SDGenericStyles.ml_8, SDGenericStyles.marginVertical2, SDGenericStyles.textColorWhite]}>{miscMessage.BULLET} {EULATexts.PT4}</Text>
                <Text style={[SDGenericStyles.ml_8, SDGenericStyles.marginBottom10, SDGenericStyles.textColorWhite]}>{miscMessage.BULLET} {EULATexts.PT5}</Text>
                <Text style={[SDGenericStyles.ft14, SDGenericStyles.bold, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textColorWhite]}>{EULATexts.H3}</Text>
                <Text style={[SDGenericStyles.ft14, SDGenericStyles.marginBottom10, SDGenericStyles.textColorWhite]}>{EULATexts.LN5}</Text>
                <Text style={[SDGenericStyles.ft14, SDGenericStyles.fontFamilyRobotoBold, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textColorWhite]}>{EULATexts.H4}</Text>
                <Text style={[SDGenericStyles.ft14, SDGenericStyles.marginBottom10, SDGenericStyles.textColorWhite]}>{EULATexts.LN6}</Text>
                <Text style={[SDGenericStyles.ft14, SDGenericStyles.fontFamilyRobotoBold, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textColorWhite]}>{EULATexts.H5}</Text>
                <Text style={[SDGenericStyles.ft14, SDGenericStyles.marginBottom10, SDGenericStyles.textColorWhite]}>{EULATexts.LN7}</Text>
                <Text style={[SDGenericStyles.ft14, SDGenericStyles.fontFamilyRobotoBold, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textColorWhite]}>{EULATexts.H6}</Text>
                <Text style={[SDGenericStyles.ft14, SDGenericStyles.marginBottom10, SDGenericStyles.textColorWhite]}>{EULATexts.LN8}</Text>
                <Text style={[SDGenericStyles.mv10, SDGenericStyles.ft14, SDGenericStyles.fontFamilyRobotoBold, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textColorWhite]}>{EULATexts.FOOTER}</Text>
            </ScrollView>
            <View style={SDGenericStyles.paddingBottom10}>
                <TouchableOpacity activeOpacity={.7} disabled={!acceptedEULA} onPress={async () => await saveEULAAcceptance(acceptedEULA)}
                    style={acceptedEULA ? glancePostStyles.eulaButton : glancePostStyles.eulaButtonDisabled}>
                    <Text style={[SDGenericStyles.ft18, SDGenericStyles.colorWhite]}>{actionButtonTextConstants.PROCEED}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}