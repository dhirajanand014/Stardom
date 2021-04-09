import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SDBottomSheet } from '../../components/bottomsheet/SDBottomSheet';
import { miscMessage, numericConstants } from '../../constants/Constants';
import { glancePostStyles, SDGenericStyles } from '../../styles/Styles';
import { showSelectedImage } from '../../helper/Helper';
export const BottomSheetView = props => {
    const renderHeader = () => {
        return (
            <View style={glancePostStyles.bottomSheetHeader}>
                <View style={SDGenericStyles.alignItemsCenter}>
                    <View style={glancePostStyles.panelHandle} />
                </View>
            </View>
        )
    }

    const renderContent = () => {
        return (
            <View style={glancePostStyles.bottomSheetPanel}>
                <View style={SDGenericStyles.alignItemsCenter}>
                    <Text style={glancePostStyles.bottomSheetPanelTitle}>Upload Photo</Text>
                    <Text style={glancePostStyles.bottomSheetPanelSubTitle}>Choose Your Profile Picture</Text>
                </View>
                <TouchableOpacity activeOpacity={.7} style={glancePostStyles.bottomSheetPanelButton}
                    onPress={async () => await showSelectedImage(miscMessage.CAMERA, props.bottomSheetRef, props.addPost, props.setAddPost)}>
                    <Text style={glancePostStyles.bottomSheetPanelButtonTitle}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.7} style={glancePostStyles.bottomSheetPanelButton}
                    onPress={async () => await showSelectedImage(miscMessage.GALLERY, props.bottomSheetRef, props.addPost, props.setAddPost)}>
                    <Text style={glancePostStyles.bottomSheetPanelButtonTitle}>Choose from gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.7} style={glancePostStyles.bottomSheetPanelButton}
                    onPress={() => props.bottomSheetRef?.current?.snapTo(numericConstants.ONE)}>
                    <Text style={glancePostStyles.bottomSheetPanelButtonTitle}>Cancel</Text>
                </TouchableOpacity>
            </View >
        )
    }
    return (
        <SDBottomSheet refCallback={props.refCallback} snapPoints={props.snapPoints} initialSnap={numericConstants.ONE}
            callbackMode={props.fall} renderHeader={renderHeader} renderContent={renderContent} />
    );
}