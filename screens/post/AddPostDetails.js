import { useNavigation, useRoute } from '@react-navigation/core'
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Keyboard, KeyboardAvoidingView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Animated, { useSharedValue } from 'react-native-reanimated'
import { CategoryContext } from '../../App'
import { DeleteIcon } from '../../components/icons/DeleteIcon'
import { EditIcon } from '../../components/icons/EditIcon'
import {
    fieldControllerName, formRequiredRules, height,
    modalTextConstants, numericConstants,
    width, placeHolderText, keyBoardTypeConst,
    actionButtonTextConstants, miscMessage,
    jsonConstants, alertTextMessages, screens, errorMessages, stringConstants
} from '../../constants/Constants'
import { checkTokenStatus, fetchCategoryData, handleAddPostDetails, handlePostDelete, showSnackBar } from '../../helper/Helper'
import { colors, glancePostStyles, SDGenericStyles, userAuthStyles } from '../../styles/Styles'
import { BottomSheetView } from '../../views/bottomSheet/BottomSheetView'
import { SDDropDownView } from '../../views/dropDownView/SDDropDownView'
import { SDImageFormInput } from '../../views/fromInputView/SDImageFormInput'
import { SDPostTypeOptionsView } from '../../views/fromInputView/SDPostTypeOptionView'
import { SDPostCategorySelector } from '../../views/imagePost/SDPostCategorySelector'
import { SDMultiTextInputLengthText } from '../../components/texts/SDMultiTextInputLengthText'

export const AddPostDetails = () => {

    const { userPosts, profiles, loggedInUser, loader, setLoader } = useContext(CategoryContext);

    const bottomSheetRef = useRef(null);
    const bottomSheetRefCallback = node => {
        bottomSheetRef.current = node;
    };

    const snapPoints = useMemo(() => [numericConstants.THREE_HUNDRED_THIRTY, numericConstants.ZERO],
        jsonConstants.EMPTY);

    const fallValue = useSharedValue(numericConstants.ONE);

    const [categories, setCategories] = useState(jsonConstants.EMPTY);
    const route = useRoute();
    const toAction = route.params?.toAction;
    const selectedItem = route.params?.selectedItem;

    const { control, formState, handleSubmit, setError, watch, register, setValue } = useForm();

    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            setLoader({ ...loader, isLoading: true, loadingText: alertTextMessages.LOADING_CATEGORIES });
            const postCategories = await fetchCategoryData();
            postCategories && setCategories(postCategories);
            postCategories.map(category => category.isSelected = userPosts.details.postCategories.some(selectedCategory =>
                selectedCategory == category.categoryId));
            setValue(fieldControllerName.POST_CATEGORIES, userPosts.details.postCategories);
            setLoader({ ...loader, isLoading: false, loadingText: stringConstants.EMPTY });
        })();
        register(fieldControllerName.POST_CATEGORIES, formRequiredRules.postCategoryRule);
    }, jsonConstants.EMPTY);

    const navigateUser = (responseData) => {
        navigation.reset({ index: numericConstants.ZERO, routes: [{ name: screens.GLANCE }] });
        setLoader({ ...loader, isLoading: false, loadingText: stringConstants.EMPTY });
        showSnackBar(responseData.message, true);
    }

    const loginCallback = useCallback(() => {
        navigation.navigate(screens.LOGIN, { isIntermediateLogin: true });
    });

    const uploadCallback = useCallback((progressEvent) => {
        loader.isLoading = true;
        loader.loadingText = toAction == miscMessage.UPDATE && alertTextMessages.UPDATING_POST_DETAILS ||
            alertTextMessages.ADDING_NEW_POST;
        loader.progressValue = Math.round((progressEvent.loaded * numericConstants.ONE_HUNDRED) / progressEvent.total);
        setLoader({ ...loader });
    })

    const onSubmit = async (data) => {
        setLoader({
            ...loader, isLoading: true, loadingText: toAction == miscMessage.UPDATE && alertTextMessages.UPDATING_POST_DETAILS ||
                alertTextMessages.ADDING_NEW_POST
        });
        const responseData = await handleAddPostDetails(data, userPosts.details.capturedImage, toAction, selectedItem, loader, setLoader,
            uploadCallback);
        if (responseData) {
            if (responseData.message == alertTextMessages.POST_ADDED_SUCCESSFULLY ||
                responseData.message == alertTextMessages.POST_UPDATED_SUCCESSFULLY) {
                navigateUser(responseData);
            } else if (checkTokenStatus(responseData)) {
                setTimeout(() => showSnackBar(errorMessages.PLEASE_LOGIN_TO_CONTINUE, false, true, loginCallback),
                    numericConstants.THREE_HUNDRED);
                setLoader({ ...loader, isLoading: false, loadingText: stringConstants.EMPTY });
            }
        }
    }

    const handleDelete = async () => {
        setLoader({ ...loader, isLoading: true, loadingText: alertTextMessages.DELETING_POST });
        const responseData = await handlePostDelete(selectedItem.id, loggedInUser.loginDetails.token);
        if (responseData && responseData.message == alertTextMessages.POST_DELETED_SUCCESSFULLY) {
            navigateUser(responseData);
        } else if (checkTokenStatus(responseData)) {
            loginCallback();
            showSnackBar(errorMessages.YOUR_SESSION_IS_EXPIRED_PLEASE_LOGIN, false, true, loginCallback);
        }
        setLoader({ ...loader, isLoading: false, loadingText: stringConstants.EMPTY });
    }

    const postDescriptionValue = watch(fieldControllerName.POST_DESCRIPTION);
    const postValueType = watch(fieldControllerName.POST_TYPE);
    const postCategories = watch(fieldControllerName.POST_CATEGORIES);

    const detailsCallback = useCallback(() => {
        bottomSheetRef?.current?.snapTo(numericConstants.ONE)
    });

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack]} pointerEvents={loader.isLoading && miscMessage.NONE || miscMessage.AUTO}>
                <View style={[glancePostStyles.addPostDetailsStyle, SDGenericStyles.alignItemsCenter, SDGenericStyles.paddingTop5]}>
                    <FastImage source={{ uri: userPosts.details.capturedImage }} resizeMode={FastImage.resizeMode.contain}
                        style={{ width: width, height: height / numericConstants.THREE }} />
                    {
                        toAction == miscMessage.UPDATE &&
                        <View style={[SDGenericStyles.positionAbsolute, SDGenericStyles.right8, glancePostStyles.addPostEditIconsStyle]}>
                            <View style={[SDGenericStyles.alignItemsEnd, SDGenericStyles.marginVertical10]}>
                                <TouchableOpacity activeOpacity={.7} onPress={() => handleDelete()}>
                                    <DeleteIcon width={numericConstants.TWENTY_EIGHT} height={numericConstants.TWENTY_EIGHT} stroke={colors.RED} />
                                </TouchableOpacity>
                            </View>
                            <View style={[SDGenericStyles.alignItemsEnd, SDGenericStyles.marginVertical10]}>
                                <TouchableOpacity activeOpacity={.7} onPress={() => bottomSheetRef?.current?.snapTo(numericConstants.ZERO)}>
                                    <EditIcon width={numericConstants.TWENTY_EIGHT} height={numericConstants.TWENTY_EIGHT} stroke={colors.WHITE} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.paddingVertical20]}>
                        <Text style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.fontFamilyBold, SDGenericStyles.textColorWhite, SDGenericStyles.ft20,
                        SDGenericStyles.paddingBottom5]}>
                            {modalTextConstants.ADD_POST_DETAILS}</Text>
                        <View style={[glancePostStyles.addPostDetailsTitleDivider, SDGenericStyles.backgroundColorWhite]} />
                    </View>
                    <KeyboardAvoidingView style={SDGenericStyles.mv15}>
                        <Animated.ScrollView contentContainerStyle={[SDGenericStyles.alignItemsCenter]}
                            style={{ maxHeight: height / 2.15 }}>
                            <SDImageFormInput inputName={fieldControllerName.POST_TITLE} control={control} rules={formRequiredRules.addPostTitleRule}
                                defaultValue={userPosts.details.postTitle} maxLength={numericConstants.TEN} placeHolderText={placeHolderText.ADD_POST_TITLE}
                                keyboardType={keyBoardTypeConst.DEFAULT} formState={formState} autoFocus={true} textContentType={keyBoardTypeConst.TITLE}
                                extraStyles={[SDGenericStyles.textBoxGray, SDGenericStyles.fontFamilyRoman, SDGenericStyles.borderRadius20,
                                SDGenericStyles.textColorWhite, SDGenericStyles.ft16]} />

                            <SDMultiTextInputLengthText value={postDescriptionValue} maxLength={numericConstants.TWO_HUNDRED} />

                            <SDImageFormInput inputName={fieldControllerName.POST_DESCRIPTION} control={control} rules={formRequiredRules.addPostDescription}
                                defaultValue={userPosts.details.postDescription} maxLength={numericConstants.TWO_HUNDRED} placeHolderText={placeHolderText.ADD_POST_DESCRIPTION}
                                keyboardType={keyBoardTypeConst.DEFAULT} formState={formState} isMultiline={true} numberOfLines={numericConstants.FIVE} textContentType={keyBoardTypeConst.NONE}
                                extraStyles={[SDGenericStyles.textBoxGray, SDGenericStyles.fontFamilyRoman, SDGenericStyles.height100, SDGenericStyles.borderRadius20, SDGenericStyles.textColorWhite,
                                SDGenericStyles.ft16, SDGenericStyles.textALignVerticalTop]} maxLength={numericConstants.TWO_HUNDRED} />

                            <SDDropDownView inputName={fieldControllerName.POST_PROFILE} control={control} rules={formRequiredRules.profileRule} selectedLabelStyle={SDGenericStyles.textColorWhite}
                                containerStyle={userAuthStyles.dropDownPickerStyle} dropDownPickerStyle={glancePostStyles.addPostDropDownStyle} textContentType={keyBoardTypeConst.NONE}
                                defaultValue={userPosts.details.postProfile} formState={formState} list={profiles.length && profiles.filter(role => role.value != numericConstants.MINUS_ONE) || jsonConstants.EMPTY}
                                dropDownDefaultValue={profiles.length && profiles.find(role => role.value == numericConstants.ZERO).value || userPosts.details.postProfile} placeHolderText={placeHolderText.SELECT_A_PROFILE}
                                extraStyles={[SDGenericStyles.textBoxGray, SDGenericStyles.paddingVertical5]} globalTextStyle={[SDGenericStyles.fontFamilyRoman, SDGenericStyles.ft16, SDGenericStyles.textColorWhite]} />

                            <SDPostTypeOptionsView inputName={fieldControllerName.POST_TYPE} control={control} rules={formRequiredRules.postTypeRule} formState={formState}
                                defaultValue={userPosts.details.postType} checkValue={postValueType} />

                            <SDPostCategorySelector inputName={fieldControllerName.POST_CATEGORIES} formState={formState} maxLength={numericConstants.THREE} setError={setError}
                                categories={categories} setCategories={setCategories} postCategories={postCategories} setValue={setValue} />

                        </Animated.ScrollView>
                        <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentSpaceBetween,
                        SDGenericStyles.paddingHorizontal30, SDGenericStyles.mt5]}>
                            <TouchableOpacity activeOpacity={.7} style={glancePostStyles.cancelAddPostButton}>
                                <Text style={[SDGenericStyles.fontFamilyRoman, glancePostStyles.addPostButtonText, SDGenericStyles.colorWhite]} onPress={() => navigation.goBack()}>
                                    {actionButtonTextConstants.CANCEL_POST}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={.7} style={glancePostStyles.addPostButton} onPress={handleSubmit(onSubmit)}>
                                <Text style={[SDGenericStyles.fontFamilyRoman, SDGenericStyles.ft14]}>
                                    {toAction == miscMessage.UPDATE && actionButtonTextConstants.UPDATE_POST || actionButtonTextConstants.ADD_POST}</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </View>
                <BottomSheetView refCallback={bottomSheetRefCallback} bottomSheetRef={bottomSheetRef} detailsCallback={detailsCallback}
                    snapPoints={snapPoints} fall={fallValue} navigation={navigation} isFrom={screens.EDIT_POST_DETAILS} />
            </View>
        </TouchableWithoutFeedback>
    )
}