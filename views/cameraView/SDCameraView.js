import React, { useRef, useState, useCallback } from 'react';
import { Image, TouchableOpacity, View, FlatList, Text } from "react-native"
import { RNCamera } from 'react-native-camera';
import { cameraStyles, SDGenericStyles } from '../../styles/Styles';
import { useNavigation, useRoute } from '@react-navigation/core';
import {
    numericConstants, screens, miscMessage,
    cameraConstants, stringConstants, jsonConstants, actionButtonTextConstants
} from '../../constants/Constants';
import { RotateCameraIcon } from '../../components/icons/RotateCameraIcon';
import { SDCameraGalleryImagesView } from '../../components/swiper/SDCameraGalleryImagesView';
import { fetchGalleryImages } from '../../helper/Helper';
export const SDCameraView = () => {

    const navigation = useNavigation();

    const route = useRoute();
    const isFrom = route.params?.isFrom || stringConstants.EMPTY;

    const [cameraState, setCameraState] = useState({
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.off,
        uploadFromGallery: false,
        galleryImages: jsonConstants.EMPTY
    })

    let camera = useRef(null);

    const capturePicture = async () => {
        if (camera) {
            const picture = await camera.takePictureAsync();
            navigateToFilter(navigation, isFrom, picture);
        }
    }

    const navigateToFilter = (navigation, isFrom, picture) => {
        navigation.navigate(screens.IMAGE_PREVIEW_FILTERS, {
            isFrom: isFrom,
            imageValue: picture.uri
        });
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

    const selectImageCallback = useCallback(async (item, index) => {
        const picture = item.image;
        setCameraState({ ...cameraState, selectedImageFromGalleryInde: index });
        navigateToFilter(navigation, isFrom, picture);
    });

    return (
        <View style={SDGenericStyles.fill}>
            <RNCamera ref={ref => { camera = ref; }} autoFocus={true} type={cameraState.type} flashMode={cameraState.flashMode}
                style={[SDGenericStyles.fill, SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyItemsEnd]} shouldRasterizeIOS
                androidCameraPermissionOptions={cameraConstants.CAMERA_PERMISSIONS} androidRecordAudioPermissionOptions={cameraConstants.ADD_POST_DETAILS}>
                <View style={[SDGenericStyles.positionAbsolute, SDGenericStyles.right8, { top: numericConstants.TEN }]}>
                    <View style={[SDGenericStyles.alignItemsEnd, SDGenericStyles.marginVertical10]} autoFocus={RNCamera.Constants.AutoFocus.on}>
                        <TouchableOpacity activeOpacity={.7} onPress={() => setCameraActions(miscMessage.TYPE)}>
                            <RotateCameraIcon width={numericConstants.THIRTY} height={numericConstants.THIRTY} />
                        </TouchableOpacity>
                    </View>
                    <View style={[SDGenericStyles.alignItemsEnd, SDGenericStyles.marginVertical10]}>
                        <TouchableOpacity activeOpacity={.7} onPress={() => setCameraActions(miscMessage.FLASH_MODE)}>
                            {
                                cameraState.flashMode == RNCamera.Constants.FlashMode.on &&
                                <Image style={SDGenericStyles.iconStyle} source={require(`../../assets/camera_flash_selected_icon.png`)} /> ||
                                <Image style={SDGenericStyles.iconStyle} source={require(`../../assets/camera_flash_no_selected_icon.png`)} />
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    cameraState.uploadFromGallery &&
                    <React.Fragment>
                        <FlatList data={cameraState.galleryImages} showsHorizontalScrollIndicator={false} horizontal keyExtractor={(item, index) => { item.timestamp.toString() + index }} nestedScrollEnabled
                            renderItem={({ item, index }) => <SDCameraGalleryImagesView item={item} index={index} setCameraState={setCameraState} cameraState={cameraState}
                                selectImageCallback={selectImageCallback} />} style={[SDGenericStyles.positionAbsolute, SDGenericStyles.bottom80]} contentContainerStyle={SDGenericStyles.paddingHorizontal10} />
                        <TouchableOpacity style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter, SDGenericStyles.right8,
                        SDGenericStyles.paddingVertical5, SDGenericStyles.paddingHorizontal10, SDGenericStyles.bottom15, SDGenericStyles.positionAbsolute, SDGenericStyles.borderRadius20,
                        SDGenericStyles.backgroundColorWhite]}
                            activeOpacity={.7} onPress={async () => setCameraState({ ...cameraState, uploadFromGallery: false, galleryImages: jsonConstants.EMPTY })}>
                            <Image style={[cameraStyles.addImageGalleryIconStyle, SDGenericStyles.borderRightWidth1, SDGenericStyles.marginRight4]}
                                source={require(`../../assets/menu/add_wallpaper_icon.png`)} />
                            <Text style={[SDGenericStyles.ft12, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textBlackColor]}>
                                {actionButtonTextConstants.CLOSE_IMAGE_GALLERY}
                            </Text>
                        </TouchableOpacity>
                    </React.Fragment>
                }
                {
                    !cameraState.uploadFromGallery &&
                    <TouchableOpacity style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter, SDGenericStyles.right8,
                    SDGenericStyles.paddingVertical5, SDGenericStyles.paddingHorizontal10, SDGenericStyles.bottom15, SDGenericStyles.positionAbsolute, SDGenericStyles.borderRadius20,
                    SDGenericStyles.backgroundColorWhite]}
                        activeOpacity={.7} onPress={async () => await fetchGalleryImages(cameraState, setCameraState)}>
                        <Image style={[cameraStyles.addImageGalleryIconStyle, SDGenericStyles.borderRightWidth1, SDGenericStyles.marginRight4]}
                            source={require(`../../assets/menu/add_wallpaper_icon.png`)} />
                        <Text style={[SDGenericStyles.ft12, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textBlackColor]}>
                            {actionButtonTextConstants.UPLOAD_IMAGE_GALLERY}
                        </Text>
                    </TouchableOpacity>
                }
                <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter, SDGenericStyles.paddingTop10, SDGenericStyles.paddingBottom10]}>
                    <TouchableOpacity activeOpacity={.7} onPress={async () => await capturePicture()}>
                        <Image style={SDGenericStyles.cameraIconStyle} source={require(`../../assets/camera_icon.png`)} />
                    </TouchableOpacity>
                </View>
            </RNCamera>
        </View >
    )
}