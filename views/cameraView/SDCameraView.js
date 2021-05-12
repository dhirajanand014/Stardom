import React, { useContext, useRef, useState } from 'react';
import { TouchableOpacity, View } from "react-native"
import { RNCamera } from 'react-native-camera';
import { SDGenericStyles } from '../../styles/Styles';
import { CameraIcon } from '../../components/icons/CameraIcon';
import { useNavigation } from '@react-navigation/core';
import { numericConstants, screens } from '../../constants/Constants';
import { CategoryContext } from '../../App';

export const SDCameraView = props => {

    const { userPosts, setUserPosts } = useContext(CategoryContext);

    const navigation = useNavigation();
    const [permissons, setPermissons] = useState(false)

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