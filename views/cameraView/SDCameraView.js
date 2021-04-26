import React, { useMemo, useRef, useState } from 'react';
import { useEffect } from 'react';
import { Text, TouchableOpacity, View } from "react-native"
import { sortDevices, useCameraDevices } from "react-native-vision-camera"
import { Camera } from 'react-native-vision-camera';
import { RNCamera } from 'react-native-camera';
import { SDGenericStyles } from '../../styles/Styles';

export const SDCameraView = props => {

    const [devices, setDevices] = useState();
    // const device = useMemo(() => devices && devices.find((d) => d.position === 'back'), [devices]);
    const [permissons, setPermissons] = useState(false)
    const getPermissons = async () => {

        const cameraPermission = await Camera.getCameraPermissionStatus()
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

    return (
        <View style={[SDGenericStyles.fill, {
            flexDirection: 'column',
            backgroundColor: 'black'
        }]}>
            <RNCamera
                ref={ref => {
                    camera = ref;
                }}
                style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                }}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.on}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                androidRecordAudioPermissionOptions={{
                    title: 'Permission to use audio recording',
                    message: 'We need your permission to use your audio',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                onGoogleVisionBarcodesDetected={({ barcodes }) => {
                    console.log(barcodes);
                }}
            />
        </View>
    )
}