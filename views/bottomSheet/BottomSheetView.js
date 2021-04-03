import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SDBottomSheet } from '../../components/bottomsheet/SDBottomSheet';
import { numericConstants, stringConstants } from '../../constants/Constants';
import ImagePicker from 'react-native-image-crop-picker';
import { glancePostStyles, SDGenericStyles } from '../../styles/Styles';
export const BottomSheetView = props => {

    const [addPost, setAddPost] = useState({
        capturedImage: stringConstants.EMPTY,
        showDetails: false
    })

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
                    onPress={async () => {
                        props.bottomSheetRef?.current?.snapTo(numericConstants.ONE)
                        const value = await ImagePicker.openCamera({
                            width: 300, height: 400, cropping: true, mediaType: `photo`
                        })
                        console.log(value)
                    }}>
                    <Text style={glancePostStyles.bottomSheetPanelButtonTitle}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.7} style={glancePostStyles.bottomSheetPanelButton}>
                    <Text style={glancePostStyles.bottomSheetPanelButtonTitle}>Choose from gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.7} style={glancePostStyles.bottomSheetPanelButton}
                    onPress={() => props.bottomSheetRef?.current?.snapTo(numericConstants.ONE)}>
                    <Text style={glancePostStyles.bottomSheetPanelButtonTitle}>Cancel</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <SDBottomSheet refCallback={props.refCallback} snapPoints={props.snapPoints} initialSnap={numericConstants.ONE}
            callbackMode={props.fall} renderHeader={renderHeader} renderContent={renderContent} />
    );
}