import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useContext, useRef, useState } from 'react';
import { FlatList, Text, TouchableOpacity, SafeAreaView, View, InteractionManager } from 'react-native';
import FastImage from 'react-native-fast-image';
import { CategoryContext } from '../../App';
import {
    actionButtonTextConstants, alertTextMessages, CAMERA_IMAGE_FILTERS,
    miscMessage, numericConstants, screens, stringConstants, width
} from '../../constants/Constants';
import { cropImage } from '../../helper/Helper';
import { BackButton } from '../../components/button/BackButton';
import { SDGenericStyles, cameraStyles, userAuthStyles } from '../../styles/Styles';
export const SDCameraImagePreview = () => {

    const route = useRoute();
    const navigation = useNavigation();
    const imageFilterURI = route.params?.imageValue;
    const isFrom = route.params?.isFrom;
    const extractedUri = useRef(imageFilterURI);
    const { userPosts, setUserPosts, loader, setLoaderCallback } = useContext(CategoryContext);

    const proceedAction = async () => {
        const croppedImage = await cropImage(extractedUri.current, setLoaderCallback);
        switch (isFrom) {
            case screens.EDIT_USER_PROFILE:
                navigation.navigate(isFrom, { imageValue: croppedImage.path });
                break;
            case stringConstants.EMPTY:
            case screens.EDIT_POST_DETAILS:
            case screens.POSTS:
            default:
                userPosts.details.capturedImage = croppedImage.path;
                userPosts.details.showBottomOptions = false;
                setUserPosts({ ...userPosts });
                if (isFrom == screens.EDIT_POST_DETAILS) {
                    navigation.navigate(screens.ADD_POST_DETAILS, { toAction: miscMessage.UPDATE });
                } else if (isFrom == screens.POSTS) {
                    navigation.navigate(screens.ADD_POST_DETAILS, { toAction: miscMessage.CREATE });
                } else if (isFrom == screens.CAMERA) {
                    navigation.navigate(screens.ADD_POST_DETAILS, { toAction: miscMessage.CREATE });
                } else {
                    navigation.navigate(screens.ADD_POST_DETAILS);
                }
                break;
        }
    }

    const [selectedFilterIndex, setSelectedFilterIndex] = useState(numericConstants.ZERO);

    const SelectedFilterComponent = CAMERA_IMAGE_FILTERS[selectedFilterIndex].filterComponent;

    const onExtractImage = ({ nativeEvent }) => {
        extractedUri.current = nativeEvent.uri;
        InteractionManager.runAfterInteractions(() => setLoaderCallback(false));
    };
    const onSelectFilter = selectedIndex => {
        if (selectedIndex == numericConstants.ZERO) {
            extractedUri.current = imageFilterURI;
        } else {
            selectedFilterIndex != selectedIndex &&
                setLoaderCallback(true, alertTextMessages.LOADING_IMAGE);
        }
        setSelectedFilterIndex(selectedIndex);
    };

    const SDFilterComponent = React.memo(({ item, index }) => {
        const FilterComponent = item.filterComponent;
        const image = (
            <FastImage style={[cameraStyles.filterSelector, SDGenericStyles.alignItemsEnd, SDGenericStyles.borderRadius5, SDGenericStyles.marginHorizontal10]}
                resizeMode={FastImage.resizeMode.cover} source={{ uri: imageFilterURI }} fallback />
        );
        return (
            <View style={[SDGenericStyles.textBoxGray, SDGenericStyles.paddingVertical10]}>
                <Text style={[SDGenericStyles.textCenterAlign, SDGenericStyles.ft14, SDGenericStyles.paddingTop5, SDGenericStyles.paddingBottom10,
                SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium]}>
                    {item.title}
                </Text>
                <TouchableOpacity activeOpacity={.7} onPress={() => onSelectFilter(index)}>
                    <FilterComponent image={image} />
                </TouchableOpacity>
            </View>
        );
    });
    return (
        <ImagePreview loader={loader} selectedFilterIndex={selectedFilterIndex} imageFilterURI={imageFilterURI} SelectedFilterComponent={SelectedFilterComponent}
            onExtractImage={onExtractImage} SDFilterComponent={SDFilterComponent} proceedAction={proceedAction} />
    );
};

const ImagePreview = React.memo(({ loader, selectedFilterIndex, imageFilterURI, SelectedFilterComponent, onExtractImage, SDFilterComponent, proceedAction }) => {
    return <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack]} pointerEvents={loader.isLoading && miscMessage.NONE || miscMessage.AUTO}>
        <SafeAreaView />
        <BackButton goBack leftStyle={numericConstants.TEN} extraStyles={SDGenericStyles.marginTop20} />
        <View style={SDGenericStyles.marginTop33}>
            {selectedFilterIndex === numericConstants.ZERO &&
                <FastImage style={[cameraStyles.imageStyles, SDGenericStyles.alignItemsCenter]} resizeMode={FastImage.resizeMode.contain}
                    source={{ uri: imageFilterURI }} fallback /> ||
                <SelectedFilterComponent onExtractImage={onExtractImage} extractImageEnabled={true}
                    image={<FastImage resizeMode={FastImage.resizeMode.contain} style={[cameraStyles.imageStyles, SDGenericStyles.alignSelfStart]}
                        source={{ uri: imageFilterURI }} fallback />} />}
        </View>
        <View style={SDGenericStyles.elevation3}>
            <FlatList data={CAMERA_IMAGE_FILTERS} keyExtractor={item => item.title} horizontal renderItem={({ item, index }) => <SDFilterComponent item={item} index={index} />}
                contentContainerStyle={SDGenericStyles.elevation8} />
        </View>
        <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.marginVertical2, SDGenericStyles.justifyContentCenter,
        SDGenericStyles.alignItemsCenter, SDGenericStyles.paddingTop20]}>
            <TouchableOpacity activeOpacity={.7} style={[userAuthStyles.primaryActionButtonImagePreviewText, SDGenericStyles.backgroundColorYellow, { width: width / 1.8 }]}
                onPress={() => proceedAction()}>
                <Text style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.fontFamilyRobotoMedium]}>
                    {actionButtonTextConstants.PROCEED}</Text>
            </TouchableOpacity>
        </View>
    </View>;
});
