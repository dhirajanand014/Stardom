import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SDBottomSheet } from '../../components/bottomsheet/SDBottomSheet';
import {
    actionButtonTextConstants, miscMessage,
    modalTextConstants, numericConstants
} from '../../constants/Constants';
import { glancePostStyles, SDGenericStyles } from '../../styles/Styles';
import { showSelectedImage } from '../../helper/Helper';

export const BottomSheetView = props => {
    const renderHeader = () => {
        return (
            <View style={[glancePostStyles.bottomSheetHeader, SDGenericStyles.textBoxGray]}>
                <View style={SDGenericStyles.alignItemsCenter}>
                    <View style={[glancePostStyles.panelHandle, SDGenericStyles.backGroundColorGray]} />
                </View>
            </View>
        )
    }

    const renderContent = () => {
        return (
            <View style={[SDGenericStyles.textBoxGray, SDGenericStyles.paddingVertical10, SDGenericStyles.alignItemsCenter]}>
                <View style={SDGenericStyles.alignItemsCenter}>
                    <Text style={[SDGenericStyles.ft20, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium]}>
                        {modalTextConstants.UPLOAD_PHOTO}
                    </Text>
                    <Text style={[SDGenericStyles.ft16, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoRegular,
                    SDGenericStyles.paddingVertical5]}>
                        {modalTextConstants.CHOOSE_BELOW_OPTIONS}
                    </Text>
                </View>
                <TouchableOpacity activeOpacity={.7} style={[glancePostStyles.bottomSheetPanelButton, SDGenericStyles.alignItemsCenter,
                SDGenericStyles.backgroundColorYellow]}
                    onPress={async () => {
                        await showSelectedImage(miscMessage.CAMERA, props.isFrom, props.navigation);
                        props.detailsCallback();
                    }}>
                    <Text style={[SDGenericStyles.ft18, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium]}>{modalTextConstants.TAKE_PHOTO}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.7} style={[glancePostStyles.bottomSheetPanelButton, SDGenericStyles.alignItemsCenter,
                SDGenericStyles.backgroundColorYellow]}
                    onPress={async () => {
                        await showSelectedImage(miscMessage.GALLERY, props.isFrom, props.navigation);
                        props.detailsCallback();
                    }}>
                    <Text style={[SDGenericStyles.ft18, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium]}>{modalTextConstants.CHOOSE_FROM_LIBRARY}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.7} style={[glancePostStyles.bottomSheetPanelButton, SDGenericStyles.alignItemsCenter,
                SDGenericStyles.backgroundColorYellow]}
                    onPress={() => props.bottomSheetRef?.current?.snapTo(numericConstants.ONE)}>
                    <Text style={[SDGenericStyles.ft18, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium]}>{actionButtonTextConstants.CANCEL}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <SDBottomSheet refCallback={props.bottomSheetRef} snapPoints={props.snapPoints} initialSnap={numericConstants.ONE}
            fall={props.fall} renderHeader={renderHeader} renderContent={renderContent} onCloseEnd={props.onCloseEnd} />
    );
}