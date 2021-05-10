import React, { useContext, useMemo, useRef, useState } from 'react';
import { useEffect } from 'react';
import { Text, TouchableOpacity, View } from "react-native"
import { sortDevices, useCameraDevices } from "react-native-vision-camera"
import { Camera } from 'react-native-vision-camera';
import { RNCamera } from 'react-native-camera';
import { SDGenericStyles } from '../../styles/Styles';
import { CameraIcon } from '../../components/icons/CameraIcon';
import { useNavigation } from '@react-navigation/core';
import { numericConstants, screens } from '../../constants/Constants';
import { CategoryContext } from '../../App';

export const SDCameraView = props => {

    const { userPosts, setUserPosts } = useContext(CategoryContext);

    const navigation = useNavigation();

    const [devices, setDevices] = useState();
    // const device = useMemo(() => devices && devices.find((d) => d.position === 'back'), [devices]);
    const [permissons, setPermissons] = useState(false)
    const getPermissons = async () => {
        const cameraPermission = await Camera.getCameraPermissionStatus();
        const microphonePermission = await Camera.getMicrophonePermissionStatus()

        if (microphonePermission === 'authorized' && cameraPermission === 'authorized') {
            setPermissons(true)
        }
    }
    useEffect(() => {
        const loadDevices = async () => {
            try {
                const availableCameraDevices = await Camera.getAvailableCameraDevices();
                const sortedDevices = availableCameraDevices.sort(sortDevices)
                setDevices(sortedDevices)
            } catch (e) {
                console.error('Failed to get available devices!', e)
            }
        }
        loadDevices()
        getPermissons()
    }, [])

    // if (!device || !device.id) {
    //     console.log(JSON.stringify(device))
    //     return <></>
    // }

    let camera = useRef(null);

    const capturePicture = async () => {
        if (camera) {
            const picture = await camera.takePictureAsync();
            userPosts.details.capturedImage = picture.uri;
            userPosts.details.showBottomOptions = false;
            setUserPosts({ ...userPosts });
            navigation.navigate(screens.ADD_POST_DETAILS);
        }
    }

    return (
        <View style={SDGenericStyles.fill}>
            <RNCamera ref={ref => { camera = ref; }} autoFocus={true} type={RNCamera.Constants.Type.back} flashMode={RNCamera.Constants.FlashMode.on}
                style={[SDGenericStyles.fill, SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyItemsEnd]}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }} androidRecordAudioPermissionOptions={{
                    title: 'Permission to use audio recording',
                    message: 'We need your permission to use your audio',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }} onGoogleVisionBarcodesDetected={({ barcodes }) => {
                    console.log(barcodes);
                }}  >
                <View style={[SDGenericStyles.alignItemsEnd, SDGenericStyles.justifyContentCenter, SDGenericStyles.paddingBottom20]}>
                    <TouchableOpacity onPress={async () => await capturePicture()}>
                        <CameraIcon width={numericConstants.FIFTY} height={numericConstants.FIFTY} />
                    </TouchableOpacity>
                </View>
            </RNCamera>
        </View>
    )
}