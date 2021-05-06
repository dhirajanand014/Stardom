import { useNavigation, useRoute } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
    ImageBackground, KeyboardAvoidingView,
    Text, TouchableOpacity, View
} from 'react-native'
import Animated from 'react-native-reanimated'
import {
    fieldControllerName, formRequiredRules, stringConstants,
    height, modalTextConstants, numericConstants,
    width, placeHolderText, keyBoardTypeConst,
    actionButtonTextConstants, miscMessage, jsonConstants, defaultProfilesValue, alertTextMessages, screens
} from '../../constants/Constants'
import { fetchCategoryData, getAllProfiles, handleAddPostDetails, showSnackBar } from '../../helper/Helper'
import { glancePostStyles, SDGenericStyles, userAuthStyles } from '../../styles/Styles'
import { SDDropDownView } from '../../views/dropDownView/SDDropDownView'
import { SDImageFormInput } from '../../views/fromInputView/SDImageFormInput'
import { SDPostTypeOptionsView } from '../../views/fromInputView/SDPostTypeOptionView'
import { SDPostCategorySelector } from '../../views/imagePost/SDPostCategorySelector'

export const AddPostDetails = () => {

    const [postDetails, setPostDetails] = useState({
        title: stringConstants.EMPTY,
        description: stringConstants.EMPTY,
        showDetailsPanel: false,
    });

    const [categories, setCategories] = useState(jsonConstants.EMPTY);
    const [profiles, setProfiles] = useState(jsonConstants.EMPTY);

    const route = useRoute();
    const addPost = route.params?.addPost;

    const { control, formState, handleSubmit, setError, watch, register, setValue } = useForm();

    const navigation = useNavigation();
    useEffect(() => {
        (async () => {
            const postCategories = await fetchCategoryData();
            postCategories && setCategories(postCategories);
            setValue(fieldControllerName.CATEGORIES, jsonConstants.EMPTY);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const allProfiles = await getAllProfiles();
            allProfiles && setProfiles(allProfiles);
        })();
        register(fieldControllerName.CATEGORIES, formRequiredRules.postCategoryRule);
    }, []);

    const navigateUser = (responseData) => {
        navigation.navigate(screens.GLANCE);
        showSnackBar(responseData.message, true);
    }

    const onSubmit = async (data) => {
        const responseData = await handleAddPostDetails(data, addPost.capturedImage);
        if (responseData) {
            responseData.message == alertTextMessages.POST_ADDED_SUCCESSFULLY ||
                responseData.message == alertTextMessages.POST_UPDATED_SUCCESSFULLY &&
                navigateUser(responseData);
        }
    }

    const postValueType = watch(fieldControllerName.POST_TYPE);
    const postCategories = watch(fieldControllerName.CATEGORIES);

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack]}>
            <View style={[glancePostStyles.addPostDetailsStyle, SDGenericStyles.alignItemsCenter]}>
                <ImageBackground source={{ uri: addPost.capturedImage }}
                    style={{ width: width, height: height / numericConstants.THREE }} resizeMode={miscMessage.COVER}
                    blurRadius={postDetails.showDetailsPanel && numericConstants.ZERO || numericConstants.TEN} />
                <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.paddingVertical20]}>
                    <Text style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.fontFamilyBold, SDGenericStyles.textColorWhite, SDGenericStyles.ft20,
                    SDGenericStyles.paddingBottom5]}>
                        {modalTextConstants.ADD_POST_DETAILS}</Text>
                    <View style={[glancePostStyles.addPostDetailsTitleDivider, SDGenericStyles.backgroundColorWhite]} />
                </View>
                <KeyboardAvoidingView style={[SDGenericStyles.mt20, SDGenericStyles.mb40]}>
                    <Animated.ScrollView contentContainerStyle={[SDGenericStyles.alignItemsCenter]}
                        style={{ maxHeight: height / 2.15 }}>
                        <SDImageFormInput inputName={fieldControllerName.ADD_POST_TITLE} control={control} rules={formRequiredRules.addPostTitleRule}
                            defaultValue={stringConstants.EMPTY} maxLength={numericConstants.TEN} placeHolderText={placeHolderText.ADD_POST_TITLE}
                            keyboardType={keyBoardTypeConst.DEFAULT} formState={formState} isAddPostDetails={true}
                            extraStyles={[SDGenericStyles.textBoxGray, SDGenericStyles.fontFamilyRoman, SDGenericStyles.borderRadius20,
                            SDGenericStyles.textColorWhite, SDGenericStyles.ft16]} />

                        <SDImageFormInput inputName={fieldControllerName.ADD_POST_DESCRIPTION} control={control} rules={formRequiredRules.addPostDescription}
                            defaultValue={stringConstants.EMPTY} maxLength={numericConstants.TEN} placeHolderText={placeHolderText.ADD_POST_DESCRIPTION}
                            keyboardType={keyBoardTypeConst.DEFAULT} formState={formState} isMultiline={true} numberOfLines={numericConstants.TWO}
                            extraStyles={[SDGenericStyles.textBoxGray, SDGenericStyles.fontFamilyRoman, SDGenericStyles.height100,
                            SDGenericStyles.borderRadius20, SDGenericStyles.textColorWhite, SDGenericStyles.ft16]}
                            isAddPostDetails={true} />

                        <SDDropDownView inputName={fieldControllerName.PROFILE} control={control} rules={formRequiredRules.profileRule} selectedLabelStyle={SDGenericStyles.textColorWhite}
                            containerStyle={userAuthStyles.dropDownPickerStyle} dropDownPickerStyle={glancePostStyles.addPostDropDownStyle}
                            defaultValue={stringConstants.EMPTY} formState={formState} list={profiles.length && profiles.filter(role => role.value != numericConstants.MINUS_ONE) || jsonConstants.EMPTY}
                            dropDownDefaultValue={profiles.length && profiles.find(role => role.value == numericConstants.ZERO).value || defaultProfilesValue.value} placeHolderText={placeHolderText.SELECT_A_PROFILE}
                            extraStyles={[SDGenericStyles.textBoxGray, SDGenericStyles.paddingVertical10]} globalTextStyle={[SDGenericStyles.fontFamilyRoman, SDGenericStyles.ft16, SDGenericStyles.textColorWhite]} />

                        <SDPostCategorySelector inputName={fieldControllerName.CATEGORIES} formState={formState} maxLength={numericConstants.THREE} setError={setError}
                            categories={categories} setCategories={setCategories} postCategories={postCategories} setValue={setValue} />

                        <SDPostTypeOptionsView inputName={fieldControllerName.POST_TYPE} control={control} rules={formRequiredRules.postTypeRule} formState={formState}
                            defaultValue={stringConstants.EMPTY} checkValue={postValueType} />

                    </Animated.ScrollView>
                    <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentSpaceBetween,
                    SDGenericStyles.paddingHorizontal30, { marginTop: 5 }]}>
                        <TouchableOpacity activeOpacity={.7} style={glancePostStyles.cancelAddPostButton}>
                            <Text style={[SDGenericStyles.fontFamilyRoman, glancePostStyles.addPostButtonText, SDGenericStyles.colorWhite]} onPress={() => navigation.goBack()}>
                                {actionButtonTextConstants.CANCEL_POST}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.7} style={glancePostStyles.addPostButton} onPress={handleSubmit(onSubmit)}>
                            <Text style={[SDGenericStyles.fontFamilyRoman, glancePostStyles.addPostButtonText]}>{actionButtonTextConstants.ADD_POST}</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </View>
    )
}