import React, { useRef, useState } from 'react';
import { TouchableOpacity, View } from "react-native"
import { RNCamera } from 'react-native-camera';
import { colors, SDGenericStyles } from '../../styles/Styles';
import { CameraIcon } from '../../components/icons/CameraIcon';
import { useNavigation, useRoute } from '@react-navigation/core';
import {
    numericConstants, screens, miscMessage,
    cameraConstants, stringConstants
} from '../../constants/Constants';
import { RotateCameraIcon } from '../../components/icons/RotateCameraIcon';
import { FlashCameraIcon } from '../../components/icons/FlashCameraIcon';

export const SDCameraView = props => {

    const navigation = useNavigation();

    const route = useRoute();
    const isFrom = route.params?.isFrom || stringConstants.EMPTY;

    const [cameraState, setCameraState] = useState({
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.off
    })

    let camera = useRef(null);

    const capturePicture = async () => {
        if (camera) {
            const picture = await camera.takePictureAsync();
            navigation.navigate(screens.IMAGE_PREVIEW_FILTERS, {
                isFrom: isFrom,
                imageValue: picture.uri
            });
        }
    }

    const setCameraActions = (option) => {
        if (option == miscMessage.TYPE) {
            cameraState.type = cameraState.type == RNCamera.Constants.Type.back &&
                RNCamera.Constants.Type.front || RNCamera.Constants.Type.back
        } else if (option == miscMessage.FLASH_MODE) {
            if (cameraState.flashMode == RNCamera.Constants.FlashMode.off) {
                cameraState.flashMode = RNCamera.Constants.FlashMode.on;
            } else if (cameraState.flashMode == RNCamera.Constants.FlashMode.on) {
                cameraState.flashMode = RNCamera.Constants.FlashMode.off
            } else {
                cameraState.flashMode = RNCamera.Constants.FlashMode.auto
            }
        }
        setCameraState({ ...cameraState });
    }

    return (
        <View style={SDGenericStyles.fill}>
            <RNCamera ref={ref => { camera = ref; }} autoFocus={true} type={cameraState.type} flashMode={cameraState.flashMode}
                style={[SDGenericStyles.fill, SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyItemsEnd]} shouldRasterizeIOS
                androidCameraPermissionOptions={cameraConstants.CAMERA_PERMISSIONS} androidRecordAudioPermissionOptions={cameraConstants.ADD_POST_DETAILS}>
                <View style={[SDGenericStyles.positionAbsolute, SDGenericStyles.right8, { top: 10 }]}>
                    <View style={[SDGenericStyles.alignItemsEnd, SDGenericStyles.marginVertical10]} autoFocus={RNCamera.Constants.AutoFocus.on}>
                        <TouchableOpacity activeOpacity={.7} onPress={() => setCameraActions(miscMessage.TYPE)}>
                            <RotateCameraIcon width={numericConstants.THIRTY} height={numericConstants.THIRTY} />
                        </TouchableOpacity>
                    </View>
                    <View style={[SDGenericStyles.alignItemsEnd, SDGenericStyles.marginVertical10]}>
                        <TouchableOpacity activeOpacity={.7} onPress={() => setCameraActions(miscMessage.FLASH_MODE)}>
                            <FlashCameraIcon width={numericConstants.THIRTY} height={numericConstants.THIRTY}
                                fill={cameraState.flashMode == RNCamera.Constants.FlashMode.on && colors.WHITE || miscMessage.NONE} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.paddingBottom10]}>
                    <TouchableOpacity activeOpacity={.7} onPress={async () => await capturePicture()}>
                        <CameraIcon width={numericConstants.FIFTY} height={numericConstants.FIFTY} />
                    </TouchableOpacity>
                </View>
            </RNCamera>
        </View >
    )
}