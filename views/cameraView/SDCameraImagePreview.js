import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useContext, useRef, useState } from 'react';
import { FlatList, Text, TouchableOpacity, Image, SafeAreaView, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { CategoryContext } from '../../App';
import { actionButtonTextConstants, CAMERA_IMAGE_FILTERS, numericConstants, screens, stringConstants, width } from '../../constants/Constants';
import { SDGenericStyles, cameraStyles, userAuthStyles } from '../../styles/Styles';
export const SDCameraImagePreview = props => {

    const route = useRoute();
    const navigation = useNavigation();
    const imageFilterURI = route.params?.imageValue;
    const isFrom = route.params?.isFrom;

    const extractedUri = useRef(imageFilterURI);
    const { userPosts, setUserPosts } = useContext(CategoryContext);

    const proceedAction = () => {
        switch (isFrom) {
            case screens.EDIT_USER_PROFILE:
                navigation.navigate(isFrom, { imageValue: extractedUri.current });
                break;
            case stringConstants.EMPTY:
            case screens.POSTS:
            default:
                userPosts.details.capturedImage = extractedUri.current;
                userPosts.details.showBottomOptions = false;
                setUserPosts({ ...userPosts });
                navigation.navigate(screens.ADD_POST_DETAILS);
                break;
        }
    }

    const [selectedFilterIndex, setSelectedFilterIndex] = useState(numericConstants.ZERO);

    const SelectedFilterComponent = CAMERA_IMAGE_FILTERS[selectedFilterIndex].filterComponent;

    const onExtractImage = ({ nativeEvent }) => { extractedUri.current = nativeEvent.uri; };
    const onSelectFilter = selectedIndex => { setSelectedFilterIndex(selectedIndex); };

    const renderFilterComponent = ({ item, index }) => {
        const FilterComponent = item.filterComponent;
        const image = (
            <Image style={[cameraStyles.filterSelector, SDGenericStyles.alignItemsEnd, SDGenericStyles.borderRadius5, SDGenericStyles.marginHorizontal10]}
                resizeMode={FastImage.resizeMode.cover} source={{ uri: imageFilterURI }} />
        );
        return (
            <View style={[SDGenericStyles.textBoxGray, SDGenericStyles.paddingVertical10]}>
                <Text style={[SDGenericStyles.textCenterAlign, SDGenericStyles.ft14, SDGenericStyles.paddingTop5, SDGenericStyles.paddingBottom10,
                SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyBold]}>
                    {item.title}
                </Text>
                <TouchableOpacity activeOpacity={.7} onPress={() => onSelectFilter(index)}>
                    <FilterComponent image={image} />
                </TouchableOpacity>
            </View>
        );
    };
    return (
        <View style={SDGenericStyles.backGroundColorBlack}>
            <SafeAreaView />
            <View>
                {
                    selectedFilterIndex === numericConstants.ZERO &&
                    <Image style={[cameraStyles.imageStyles, SDGenericStyles.alignItemsCenter]} resizeMode={FastImage.resizeMode.contain}
                        source={{ uri: imageFilterURI }} /> ||
                    <SelectedFilterComponent onExtractImage={onExtractImage} extractImageEnabled={true}
                        image={<Image resizeMode={FastImage.resizeMode.contain} style={[cameraStyles.imageStyles, SDGenericStyles.alignSelfStart]}
                            source={{ uri: imageFilterURI }} />} />
                }
            </View>
            <View style={SDGenericStyles.elevation3}>
                <FlatList data={CAMERA_IMAGE_FILTERS} keyExtractor={item => item.title} horizontal renderItem={renderFilterComponent}
                    contentContainerStyle={[SDGenericStyles.paddingVertical10, { elevation: 8 }]} />
            </View>
            <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.marginVertical2, SDGenericStyles.justifyContentCenter,
            SDGenericStyles.alignItemsCenter, SDGenericStyles.paddingBottom10]}>
                <TouchableOpacity activeOpacity={.7} style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.backgroundColorYellow, { width: width / 1.8 }]}
                    onPress={() => proceedAction()}>
                    <Text style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.fontFamilyBold]}>
                        {actionButtonTextConstants.PROCEED}</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
};