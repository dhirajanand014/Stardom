import { useNavigation, useRoute } from '@react-navigation/core'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
    ImageBackground, KeyboardAvoidingView,
    Text, TouchableOpacity, View
} from 'react-native'
import Animated from 'react-native-reanimated'
import { CategoryContext } from '../../App'
import {
    fieldControllerName, formRequiredRules, height,
    modalTextConstants, numericConstants,
    width, placeHolderText, keyBoardTypeConst,
    actionButtonTextConstants, miscMessage,
    jsonConstants, alertTextMessages, screens, errorMessages
} from '../../constants/Constants'
import { checkTokenStatus, fetchCategoryData, handleAddPostDetails, handlePostDelete, showSnackBar } from '../../helper/Helper'
import { colors, glancePostStyles, SDGenericStyles, userAuthStyles } from '../../styles/Styles'
import { SDDropDownView } from '../../views/dropDownView/SDDropDownView'
import { SDImageFormInput } from '../../views/fromInputView/SDImageFormInput'
import { SDPostTypeOptionsView } from '../../views/fromInputView/SDPostTypeOptionView'
import { SDPostCategorySelector } from '../../views/imagePost/SDPostCategorySelector'

export const AddPostDetails = () => {

    const { userPosts, profiles } = useContext(CategoryContext);

    const [categories, setCategories] = useState(jsonConstants.EMPTY);

    const route = useRoute();
    const toAction = route.params?.toAction;
    const selectedItem = route.params?.selectedItem;

    const { control, formState, handleSubmit, setError, watch, register, setValue } = useForm();

    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const postCategories = await fetchCategoryData();
            postCategories && setCategories(postCategories);
            postCategories.map(category => category.isSelected = userPosts.details.postCategories.some(selectedCategory =>
                selectedCategory == category.categoryId));
            setValue(fieldControllerName.POST_CATEGORIES, userPosts.details.postCategories);
        })();
        register(fieldControllerName.POST_CATEGORIES, formRequiredRules.postCategoryRule);
    }, jsonConstants.EMPTY);

    const navigateUser = (responseData) => {
        navigation.reset({ index: numericConstants.ZERO, routes: [{ name: screens.GLANCE }] });
        showSnackBar(responseData.message, true);
    }

    const loginCallback = useCallback(() => {
        navigation.navigate(screens.LOGIN);
    })

    const onSubmit = async (data) => {
        const responseData = await handleAddPostDetails(data, userPosts.details.capturedImage, toAction, selectedItem);
        if (responseData) {
            if (responseData.message == alertTextMessages.POST_ADDED_SUCCESSFULLY ||
                responseData.message == alertTextMessages.POST_UPDATED_SUCCESSFULLY) {
                navigateUser(responseData);
            } else if (checkTokenStatus(responseData)) {
                showSnackBar(errorMessages.PLEASE_LOGIN_TO_CONTINUE, false, true, actionButtonTextConstants.LOGIN,
                    colors.SDOM_YELLOW, loginCallback);
            }
        }
    }

    const handleDelete = async () => {
        const responseData = await handlePostDelete(selectedItem.id);
        if (responseData && responseData.message == alertTextMessages.POST_DELETED_SUCCESSFULLY) {
            navigateUser(responseData);
        } else if (checkTokenStatus(responseData)) {

        }
    }

    const postValueType = watch(fieldControllerName.POST_TYPE);
    const postCategories = watch(fieldControllerName.POST_CATEGORIES);

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack]}>
            <View style={[glancePostStyles.addPostDetailsStyle, SDGenericStyles.alignItemsCenter]}>
                <ImageBackground source={{ uri: userPosts.details.capturedImage }}
                    style={{ width: width, height: height / numericConstants.THREE }} resizeMode={miscMessage.COVER} />
                <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.paddingVertical20]}>
                    <Text style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.fontFamilyBold, SDGenericStyles.textColorWhite, SDGenericStyles.ft20,
                    SDGenericStyles.paddingBottom5]}>
                        {modalTextConstants.ADD_POST_DETAILS}</Text>
                    <View style={[glancePostStyles.addPostDetailsTitleDivider, SDGenericStyles.backgroundColorWhite]} />
                </View>
                <KeyboardAvoidingView style={[SDGenericStyles.mt20, SDGenericStyles.mb40]}>
                    <Animated.ScrollView contentContainerStyle={[SDGenericStyles.alignItemsCenter]}
                        style={{ maxHeight: height / 2.15 }}>
                        <SDImageFormInput inputName={fieldControllerName.POST_TITLE} control={control} rules={formRequiredRules.addPostTitleRule}
                            defaultValue={userPosts.details.postTitle} maxLength={numericConstants.TEN} placeHolderText={placeHolderText.ADD_POST_TITLE}
                            keyboardType={keyBoardTypeConst.DEFAULT} formState={formState} autoFocus={true}
                            extraStyles={[SDGenericStyles.textBoxGray, SDGenericStyles.fontFamilyRoman, SDGenericStyles.borderRadius20,
                            SDGenericStyles.textColorWhite, SDGenericStyles.ft16]} />

                        <SDImageFormInput inputName={fieldControllerName.POST_DESCRIPTION} control={control} rules={formRequiredRules.addPostDescription}
                            defaultValue={userPosts.details.postDescription} maxLength={numericConstants.TEN} placeHolderText={placeHolderText.ADD_POST_DESCRIPTION}
                            keyboardType={keyBoardTypeConst.DEFAULT} formState={formState} isMultiline={true} numberOfLines={numericConstants.TWO}
                            extraStyles={[SDGenericStyles.textBoxGray, SDGenericStyles.fontFamilyRoman, SDGenericStyles.height100,
                            SDGenericStyles.borderRadius20, SDGenericStyles.textColorWhite, SDGenericStyles.ft16]} />

                        <SDDropDownView inputName={fieldControllerName.POST_PROFILE} control={control} rules={formRequiredRules.profileRule} selectedLabelStyle={SDGenericStyles.textColorWhite}
                            containerStyle={userAuthStyles.dropDownPickerStyle} dropDownPickerStyle={glancePostStyles.addPostDropDownStyle}
                            defaultValue={userPosts.details.postProfile} formState={formState} list={profiles.length && profiles.filter(role => role.value != numericConstants.MINUS_ONE) || jsonConstants.EMPTY}
                            dropDownDefaultValue={profiles.length && profiles.find(role => role.value == numericConstants.ZERO).value || userPosts.details.postProfile} placeHolderText={placeHolderText.SELECT_A_PROFILE}
                            extraStyles={[SDGenericStyles.textBoxGray, SDGenericStyles.paddingVertical10]} globalTextStyle={[SDGenericStyles.fontFamilyRoman, SDGenericStyles.ft16, SDGenericStyles.textColorWhite]} />

                        <SDPostCategorySelector inputName={fieldControllerName.POST_CATEGORIES} formState={formState} maxLength={numericConstants.THREE} setError={setError}
                            categories={categories} setCategories={setCategories} postCategories={postCategories} setValue={setValue} />

                        <SDPostTypeOptionsView inputName={fieldControllerName.POST_TYPE} control={control} rules={formRequiredRules.postTypeRule} formState={formState}
                            defaultValue={userPosts.details.postType} checkValue={postValueType} />

                    </Animated.ScrollView>
                    <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentSpaceBetween,
                    SDGenericStyles.paddingHorizontal30, SDGenericStyles.mt5]}>
                        <TouchableOpacity activeOpacity={.7} style={glancePostStyles.cancelAddPostButton}>
                            <Text style={[SDGenericStyles.fontFamilyRoman, glancePostStyles.addPostButtonText, SDGenericStyles.colorWhite]} onPress={() => navigation.goBack()}>
                                {actionButtonTextConstants.CANCEL_POST}
                            </Text>
                        </TouchableOpacity>
                        {
                            toAction == miscMessage.UPDATE &&
                            <TouchableOpacity activeOpacity={.7} style={glancePostStyles.addPostButton} onPress={handleDelete}>
                                <Text style={[SDGenericStyles.fontFamilyRoman, glancePostStyles.addPostButtonText]}>
                                    {actionButtonTextConstants.DELETE_POST}</Text>
                            </TouchableOpacity>
                        }
                        <TouchableOpacity activeOpacity={.7} style={glancePostStyles.addPostButton} onPress={handleSubmit(onSubmit)}>
                            <Text style={[SDGenericStyles.fontFamilyRoman, glancePostStyles.addPostButtonText]}>
                                {toAction == miscMessage.UPDATE && actionButtonTextConstants.UPDATE_POST || actionButtonTextConstants.ADD_POST}</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </View>
    )
}