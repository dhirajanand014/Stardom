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
            <View style={[SDGenericStyles.textBoxGray, SDGenericStyles.paddingVertical20, SDGenericStyles.alignItemsCenter]}>
                <View style={SDGenericStyles.alignItemsCenter}>
                    <Text style={[SDGenericStyles.ft24, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyBold]}>
                        {modalTextConstants.UPLOAD_PHOTO}
                    </Text>
                    <Text style={[SDGenericStyles.ft18, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRoman,
                    SDGenericStyles.paddingVertical5]}>
                        {modalTextConstants.CHOOSE_BELOW_OPTIONS}
                    </Text>
                </View>
                <TouchableOpacity activeOpacity={.7} style={[glancePostStyles.bottomSheetPanelButton, SDGenericStyles.alignItemsCenter,
                SDGenericStyles.backgroundColorYellow]}
                    onPress={async () => {
                        await showSelectedImage(miscMessage.CAMERA, props.bottomSheetRef, props.state, props.setState, props.isFrom);
                        props.detailsCallback();
                    }}>
                    <Text style={[SDGenericStyles.ft18, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyBold]}>{modalTextConstants.TAKE_PHOTO}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.7} style={[glancePostStyles.bottomSheetPanelButton, SDGenericStyles.alignItemsCenter,
                SDGenericStyles.backgroundColorYellow]}
                    onPress={async () => {
                        await showSelectedImage(miscMessage.GALLERY, props.bottomSheetRef, props.state, props.setState, props.isFrom);
                        props.detailsCallback();
                    }}>
                    <Text style={[SDGenericStyles.ft18, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyBold]}>{modalTextConstants.CHOOSE_FROM_LIBRARY}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.7} style={[glancePostStyles.bottomSheetPanelButton, SDGenericStyles.alignItemsCenter,
                SDGenericStyles.backgroundColorYellow]}
                    onPress={() => props.bottomSheetRef?.current?.snapTo(numericConstants.ONE)}>
                    <Text style={[SDGenericStyles.ft18, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyBold]}>{actionButtonTextConstants.CANCEL}</Text>
                </TouchableOpacity>
            </View >
        )
    }
    return (
        <SDBottomSheet refCallback={props.refCallback} snapPoints={props.snapPoints} initialSnap={numericConstants.ONE}
            callbackMode={props.fall} renderHeader={renderHeader} renderContent={renderContent} onCloseEnd={props.onCloseEnd} />
    );
}