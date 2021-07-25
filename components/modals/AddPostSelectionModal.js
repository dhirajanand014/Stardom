import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { glancePostStyles, SDGenericStyles } from '../../styles/Styles';
import { actionButtonTextConstants, miscMessage, modalTextConstants } from '../../constants/Constants';
import { showSelectedImage } from '../../helper/Helper';

export const AddPostSelectionModal = (props) => {
    return (
        <Modal animationType={`slide`} transparent visible={props.showSelection} onRequestClose={() => props.setShowSelection(false)}>
            <View style={[SDGenericStyles.height100pcnt, SDGenericStyles.justifyItemsEnd]}>
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
                            props.setShowSelection(false);
                            await showSelectedImage(miscMessage.CAMERA, props.isFrom, props.navigation);
                        }}>
                        <Text style={[SDGenericStyles.ft18, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium]}>{modalTextConstants.TAKE_PHOTO}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.7} style={[glancePostStyles.bottomSheetPanelButton, SDGenericStyles.alignItemsCenter,
                    SDGenericStyles.backgroundColorYellow]}
                        onPress={async () => {
                            props.setShowSelection(false);
                            await showSelectedImage(miscMessage.GALLERY, props.isFrom, props.navigation);
                        }}>
                        <Text style={[SDGenericStyles.ft18, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium]}>{modalTextConstants.CHOOSE_FROM_LIBRARY}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.7} style={[glancePostStyles.bottomSheetPanelButton, SDGenericStyles.alignItemsCenter,
                    SDGenericStyles.backgroundColorYellow]}
                        onPress={() => props.setShowSelection(false)}>
                        <Text style={[SDGenericStyles.ft18, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium]}>{actionButtonTextConstants.CANCEL}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal >);
}