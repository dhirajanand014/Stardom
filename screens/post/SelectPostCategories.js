import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TouchableOpacity, View, Text } from 'react-native';
import { CategoryContext } from '../../App';
import {
    actionButtonTextConstants, alertTextMessages, errorMessages, fieldControllerName,
    formRequiredRules, jsonConstants, miscMessage, numericConstants, screens, width
} from '../../constants/Constants';
import { fetchCategoryData, handleAddPostDetails, showSnackBar, checkTokenStatus, getAcceptedEULA } from '../../helper/Helper';
import { glancePostStyles, SDGenericStyles } from '../../styles/Styles';
import { BackButton } from '../../components/button/BackButton';
import { SDPostCategorySelector } from '../../views/imagePost/SDPostCategorySelector';

export const SelectPostCategories = () => {
    const { userPosts, setLoaderCallback } = useContext(CategoryContext);

    const route = useRoute();
    const postDetails = route.params?.postDetails;
    const loginCallback = route.params?.loginCallback;
    const toAction = route.params?.toAction;
    const navigateUser = route.params?.navigateUser;
    const selectedItem = route.params?.selectedItem;

    const navigation = useNavigation();

    const { formState, handleSubmit, setError, watch, register, setValue } = useForm();

    const uploadCallback = useCallback((progressEvent) => {
        setLoaderCallback(true, toAction == miscMessage.UPDATE && alertTextMessages.UPDATING_POST_DETAILS ||
            alertTextMessages.ADDING_NEW_POST, Math.round((progressEvent.loaded * numericConstants.ONE_HUNDRED) / progressEvent.total));
    });

    const postCategories = watch(fieldControllerName.POST_CATEGORIES);

    const [categories, setCategories] = useState(jsonConstants.EMPTY);

    const onSubmit = useCallback(async (data) => {
        if (await getAcceptedEULA()) {
            await submitPost(setLoaderCallback, toAction, data, postDetails, userPosts, selectedItem,
                uploadCallback, navigateUser, loginCallback);
        } else {
            navigation.navigate(screens.EULA_ACCEPTANCE, { onSubmit: onSubmit, data: data })
        }
    })

    const submitPost = useCallback(async (setLoaderCallback, toAction, data, postDetails, userPosts, selectedItem, uploadCallback, navigateUser, loginCallback) => {
        setLoaderCallback(true, toAction == miscMessage.UPDATE && alertTextMessages.UPDATING_POST_DETAILS ||
            alertTextMessages.ADDING_NEW_POST);
        const requestData = { ...data, ...postDetails };

        const responseData = await handleAddPostDetails(requestData, userPosts.details.capturedImage, toAction, selectedItem, setLoaderCallback, uploadCallback);
        if (responseData) {
            if (responseData.message == alertTextMessages.POST_ADDED_SUCCESSFULLY || responseData.message == alertTextMessages.POST_UPDATED_SUCCESSFULLY) {
                navigateUser(responseData);
            } else if (checkTokenStatus(responseData)) {
                setTimeout(() => showSnackBar(errorMessages.PLEASE_LOGIN_TO_CONTINUE, false, true, loginCallback),
                    numericConstants.THREE_HUNDRED);
                setLoaderCallback(false);
            }
        }
    });

    useEffect(() => {
        (async () => {
            setLoaderCallback(true, alertTextMessages.LOADING_CATEGORIES);
            const postCategories = await fetchCategoryData();
            postCategories && setCategories(postCategories);
            postCategories.map(category => category.isSelected = userPosts.details.postCategories.some(selectedCategory =>
                selectedCategory == category.categoryId));
            setValue(fieldControllerName.POST_CATEGORIES, userPosts.details.postCategories);
            setLoaderCallback(false);
        })();
        register(fieldControllerName.POST_CATEGORIES, formRequiredRules.postCategoryRule);
    }, jsonConstants.EMPTY);

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack]}>

            <BackButton goBack leftStyle={numericConstants.TEN} extraStyles={SDGenericStyles.marginTop20} />
            <SDPostCategorySelector inputName={fieldControllerName.POST_CATEGORIES} formState={formState} maxLength={numericConstants.THREE} setError={setError}
                categories={categories} setCategories={setCategories} postCategories={postCategories} setValue={setValue} />

            <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentSpaceBetween, SDGenericStyles.positionAbsolute, SDGenericStyles.bottom30,
            SDGenericStyles.paddingHorizontal65, glancePostStyles.bottomPostSubmitButton]}>
                <TouchableOpacity activeOpacity={.7} style={[glancePostStyles.postButtonStyle, SDGenericStyles.elevation8, { width: width / numericConstants.FOUR }]}>
                    <Text style={[SDGenericStyles.fontFamilyRobotoMedium, glancePostStyles.addPostButtonText, SDGenericStyles.colorBlack,
                    SDGenericStyles.textCenterAlign]} onPress={() => navigation.goBack()}>
                        {actionButtonTextConstants.CANCEL_POST.toUpperCase()}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={.7} style={[glancePostStyles.postButtonStyle, SDGenericStyles.elevation8, { width: width / numericConstants.FOUR }]} onPress={handleSubmit(onSubmit)}>
                    <Text style={[SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.ft14, SDGenericStyles.colorBlack, SDGenericStyles.textCenterAlign]}>
                        {toAction == miscMessage.UPDATE && actionButtonTextConstants.UPDATE.toUpperCase() || actionButtonTextConstants.SUBMIT.toUpperCase()}</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
};