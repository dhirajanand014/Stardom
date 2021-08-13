
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
    const isFrom = route.params?.isFrom

    const saveEULAAcceptance = async (acceptedEULA, isFrom) => {
        isFrom == miscMessage.ADD_POST && await saveEULA(acceptedEULA);
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
            <ScrollView style={[glancePostStyles.EULAContainer, SDGenericStyles.marginHorizontal10, SDGenericStyles.backGroundColorBlack,
            SDGenericStyles.padding8]} bounces
                onScroll={({ nativeEvent }) => isCloseToBottom(nativeEvent) && setAcceptedEULA(true)}>
                <Text style={[SDGenericStyles.mv10, SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoBold, SDGenericStyles.textColorWhite]}>{EULATexts.H1}</Text>
                <Text style={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textColorWhite]}><Text style={SDGenericStyles.fontFamilyRobotoBold}>{EULATexts.P1_H}</Text>{EULATexts.P1_T}</Text>
                <Text style={[SDGenericStyles.mv10, SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textColorWhite]}><Text style={SDGenericStyles.fontFamilyRobotoBold}>{EULATexts.P2_H}</Text>{EULATexts.P2_T}</Text>
                <Text style={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textColorWhite]}><Text style={SDGenericStyles.fontFamilyRobotoBold}>{EULATexts.P3_H}</Text>{EULATexts.P3_T}</Text>
                <Text style={[SDGenericStyles.mv10, SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textColorWhite]}><Text style={SDGenericStyles.fontFamilyRobotoBold}>{EULATexts.P4_H}</Text>{EULATexts.P4_T}</Text>
                <Text style={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textColorWhite]}><Text style={SDGenericStyles.fontFamilyRobotoBold}>{EULATexts.P5_H}</Text>{EULATexts.P5_T}</Text>
                <Text style={[SDGenericStyles.mv10, SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textColorWhite]}><Text style={SDGenericStyles.fontFamilyRobotoBold}>{EULATexts.P6_H}</Text>{EULATexts.P6_T}</Text>
                <Text style={[SDGenericStyles.mt20, SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoBold, SDGenericStyles.textColorWhite]}>{EULATexts.H2}</Text>
                <Text style={[SDGenericStyles.mv10, SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textColorWhite]}><Text style={SDGenericStyles.fontFamilyRobotoBold}>{EULATexts.P7_H}</Text>{EULATexts.P7_T}</Text>
                <Text style={[SDGenericStyles.mb5, SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textColorWhite]}><Text style={SDGenericStyles.fontFamilyRobotoBold}>{EULATexts.P8_H}</Text>{EULATexts.P8_T}</Text>
                <Text style={[SDGenericStyles.mt20, SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoBold, SDGenericStyles.textColorWhite]}>{EULATexts.H3}</Text>
                <Text style={[SDGenericStyles.mv10, SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textColorWhite]}><Text style={SDGenericStyles.fontFamilyRobotoBold}>{EULATexts.P9_H}</Text>{EULATexts.P9_T}</Text>
                <Text style={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textColorWhite]}><Text style={SDGenericStyles.fontFamilyRobotoBold}>{EULATexts.P10_H}</Text>{EULATexts.P10_T}</Text>
                <Text style={[SDGenericStyles.mv10, SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textColorWhite]}><Text style={SDGenericStyles.fontFamilyRobotoBold}>{EULATexts.P11_H}</Text>{EULATexts.P11_T1}<Text style={SDGenericStyles.fontFamilyRobotoBold}>{EULATexts.P11_T2}</Text></Text>
                <Text style={[SDGenericStyles.mb5, SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textColorWhite]}><Text>{EULATexts.P12_T1}</Text><Text style={SDGenericStyles.fontFamilyRobotoBold}>{EULATexts.STARDOM_TEXT}</Text>{EULATexts.P12_T2}<Text style={SDGenericStyles.fontFamilyRobotoBold}>{EULATexts.STARDOM_TEXT}</Text>{EULATexts.P12_T3}<Text style={SDGenericStyles.fontFamilyRobotoBold}>{EULATexts.STARDOM_TEXT}</Text>{EULATexts.P12_T4}</Text>
                <Text style={[SDGenericStyles.mt20, SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoBold, SDGenericStyles.textColorWhite]}>{EULATexts.H4}</Text>
                <Text style={[SDGenericStyles.mv10, SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textColorWhite]}><Text style={SDGenericStyles.fontFamilyRobotoBold}>{EULATexts.P13_H}</Text>{EULATexts.P13_T1}<Text style={SDGenericStyles.fontFamilyRobotoBold}>{EULATexts.STARDOM_TEXT_COMMA}</Text>{EULATexts.P13_T2}<Text style={SDGenericStyles.fontFamilyRobotoBold}>{EULATexts.STARDOM_TEXT_COMMA}</Text>{EULATexts.P13_T3}<Text style={SDGenericStyles.fontFamilyRobotoBold}>{EULATexts.STARDOM_TEXT}</Text>{EULATexts.P13_T4}</Text>
                <Text style={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textColorWhite]}>{EULATexts.P14_T1}<Text style={SDGenericStyles.fontFamilyRobotoBold}>{EULATexts.STARDOM_TEXT_COMMA}</Text>{EULATexts.P14_T2}<Text style={SDGenericStyles.fontFamilyRobotoBold}>{EULATexts.STARDOM_TEXT}</Text>{EULATexts.P14_T3}<Text style={SDGenericStyles.fontFamilyRobotoBold}>{EULATexts.STARDOM_TEXT}</Text>{EULATexts.P14_T4}</Text>
                <Text style={[SDGenericStyles.mv10, SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textColorWhite]}><Text style={SDGenericStyles.fontFamilyRobotoBold}>{EULATexts.P15_H}</Text>{EULATexts.P15_T1}<Text style={SDGenericStyles.fontFamilyRobotoBold}>{EULATexts.STARDOM_TEXT}</Text>{EULATexts.P15_T2}<Text style={SDGenericStyles.fontFamilyRobotoBold}>{EULATexts.STARDOMS_TEXT}</Text>{EULATexts.P15_T3}<Text style={SDGenericStyles.fontFamilyRobotoBold}>{EULATexts.STARDOM_TEXT}</Text>{EULATexts.P15_T4}<Text style={SDGenericStyles.fontFamilyRobotoBold}>{EULATexts.STARDOM_TEXT}</Text>{EULATexts.P15_T5}</Text>
                <Text style={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textColorWhite]}><Text style={SDGenericStyles.fontFamilyRobotoBold}>{EULATexts.P16_H}</Text>{EULATexts.P16_T}</Text>
                <Text style={[SDGenericStyles.mv10, SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textColorWhite]}>{EULATexts.P17_T}</Text>
                <Text style={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textColorWhite]}>{EULATexts.P18_T1}<Text style={SDGenericStyles.fontFamilyRobotoBold}>{EULATexts.STARDOM_TEXT}</Text>{EULATexts.P18_T2}<Text style={SDGenericStyles.fontFamilyRobotoBold}>{EULATexts.STARDOM_TEXT}</Text>{EULATexts.P18_T3}<Text style={SDGenericStyles.fontFamilyRobotoBold}>{EULATexts.STARDOM_TEXT}</Text>{EULATexts.P18_T4}<Text style={SDGenericStyles.fontFamilyRobotoBold}>{EULATexts.STARDOM_TEXT}</Text>{EULATexts.P18_T5}<Text style={SDGenericStyles.fontFamilyRobotoBold}>{EULATexts.STARDOM_TEXT}</Text>{EULATexts.P18_T6}</Text>
                <Text style={[SDGenericStyles.mt20, SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textColorWhite]}>{EULATexts.P19_T1}</Text>
                <Text style={[SDGenericStyles.mb25, SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoBold]}>{EULATexts.P19_T2}</Text>
            </ScrollView>
            <View style={SDGenericStyles.paddingBottom10}>
                <TouchableOpacity activeOpacity={.7} disabled={!acceptedEULA} onPress={async () => await saveEULAAcceptance(acceptedEULA, isFrom)}
                    style={acceptedEULA ? glancePostStyles.eulaButton : glancePostStyles.eulaButtonDisabled}>
                    <Text style={[SDGenericStyles.ft18, SDGenericStyles.colorWhite]}>{actionButtonTextConstants.PROCEED}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}