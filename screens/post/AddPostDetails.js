import { useNavigation, useRoute } from '@react-navigation/core'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
    Keyboard, KeyboardAvoidingView, Text,
    TouchableOpacity, TouchableWithoutFeedback, View,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import Animated from 'react-native-reanimated'
import { CategoryContext } from '../../App'
import { DeleteIcon } from '../../components/icons/DeleteIcon'
import { EditIcon } from '../../components/icons/EditIcon'
import {
    fieldControllerName, formRequiredRules, height,
    modalTextConstants, numericConstants, errorMessages,
    width, placeHolderText, keyBoardTypeConst,
    actionButtonTextConstants, miscMessage, isAndroid,
    alertTextMessages, screens, stringConstants, jsonConstants
} from '../../constants/Constants'
import { checkTokenStatus, handlePostDelete, showSnackBar } from '../../helper/Helper'
import { colors, glancePostStyles, SDGenericStyles } from '../../styles/Styles'
import { SDImageFormInput } from '../../views/fromInputView/SDImageFormInput'
import { BackButton } from '../../components/button/BackButton';
import { SDPostTypeOptionsView } from '../../views/fromInputView/SDPostTypeOptionView'
import { SDMultiTextInputLengthText } from '../../components/texts/SDMultiTextInputLengthText'
import { AddPostSelectionModal } from '../../components/modals/AddPostSelectionModal'
import { UserSelectionOptionModal } from '../../components/modals/UserSelectionOptionModal'

export const AddPostDetails = () => {

    const { userPosts, loggedInUser, loader, setLoaderCallback } = useContext(CategoryContext);

    const [showSelection, setShowSelection] = useState(false);
    const [bottomSheetState, setBottomSheetState] = useState({
        showUserOptionModal: false
    });

    const route = useRoute();
    const toAction = route.params?.toAction;
    const selectedItem = route.params?.selectedItem;

    const { control, formState, handleSubmit, watch, setValue } = useForm();

    const navigation = useNavigation();

    const navigateUser = (responseData) => {
        navigation.reset({ index: numericConstants.ZERO, routes: [{ name: screens.GLANCE }] });
        setLoaderCallback(false);
        showSnackBar(responseData.message, true);
    }

    const loginCallback = useCallback(() => navigation.navigate(screens.LOGIN, { intermediateLogin: toAction }));

    const onSubmit = async (data) => {
        navigation.navigate(screens.SELECT_POST_CATEGORIES, {
            postDetails: data,
            loginCallback: loginCallback,
            toAction: toAction,
            navigateUser: navigateUser,
            selectedItem: selectedItem
        });
    }

    const handleDelete = useCallback(async () => {
        setBottomSheetState({ ...bottomSheetState, showUserOptionModal: false });
        setLoaderCallback(true, alertTextMessages.DELETING_POST);
        const responseData = await handlePostDelete(selectedItem.id, loggedInUser.loginDetails.token);
        if (responseData && responseData.message == alertTextMessages.POST_DELETED_SUCCESSFULLY) {
            navigateUser(responseData);
        } else if (checkTokenStatus(responseData)) {
            loginCallback();
            showSnackBar(errorMessages.YOUR_SESSION_IS_EXPIRED_PLEASE_LOGIN, false, true, loginCallback);
        }
        setLoaderCallback(false);
    });

    const postDescriptionValue = watch(fieldControllerName.POST_DESCRIPTION);
    const postValueType = watch(fieldControllerName.POST_TYPE,
        toAction == miscMessage.UPDATE && userPosts.details.postType || stringConstants.EMPTY);

    useEffect(() => toAction == miscMessage.CREATE && setValue(fieldControllerName.POST_TYPE, fieldControllerName.POST_TYPE_PUBLIC), jsonConstants.EMPTY);

    return (
        <NewPost loader={loader} userPosts={userPosts} toAction={toAction} handleDelete={handleDelete} showSelection={showSelection} setShowSelection={setShowSelection}
            control={control} formState={formState} postValueType={postValueType} postDescriptionValue={postDescriptionValue} navigation={navigation}
            handleSubmit={handleSubmit} onSubmit={onSubmit} bottomSheetState={bottomSheetState} setBottomSheetState={setBottomSheetState} />
    )
}

const NewPost = React.memo(({ loader, userPosts, toAction, handleDelete, control, formState, postValueType, postDescriptionValue, showSelection, setShowSelection,
    navigation, handleSubmit, onSubmit, bottomSheetState, setBottomSheetState }) => {
    return <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack]} pointerEvents={loader.isLoading && miscMessage.NONE || miscMessage.AUTO}>
            <BackButton goBack leftStyle={numericConstants.TEN} extraStyles={SDGenericStyles.marginTop20} />
            <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.mt36]}>
                <FastImage source={{ uri: userPosts.details.capturedImage, cache: FastImage.cacheControl.immutable }} resizeMode={FastImage.resizeMode.contain}
                    style={{ width: width, height: height / numericConstants.THREE }} />
                {toAction == miscMessage.UPDATE &&
                    <View style={[SDGenericStyles.positionAbsolute, SDGenericStyles.right8, glancePostStyles.addPostEditIconsStyle]}>
                        <View style={[SDGenericStyles.alignItemsEnd, SDGenericStyles.marginVertical10]}>
                            <TouchableOpacity activeOpacity={.7} onPress={() => setBottomSheetState({ ...bottomSheetState, showUserOptionModal: true })}>
                                <DeleteIcon width={numericConstants.TWENTY_EIGHT} height={numericConstants.TWENTY_EIGHT} stroke={colors.RED} />
                            </TouchableOpacity>
                        </View>
                        {/* <View style={[SDGenericStyles.alignItemsEnd, SDGenericStyles.marginVertical10]}>
                            <TouchableOpacity activeOpacity={.7} onPress={() => setShowSelection(true)}>
                                <EditIcon width={numericConstants.TWENTY_EIGHT} height={numericConstants.TWENTY_EIGHT} stroke={colors.WHITE} />
                            </TouchableOpacity>
                        </View> */}
                    </View>}
                <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.paddingVertical20]}>
                    <Text style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.placeHolderTextColor, SDGenericStyles.ft18,
                    SDGenericStyles.paddingBottom5]}>
                        {modalTextConstants.ADD_WALLPAPER_DETAILS}</Text>
                    <View style={[glancePostStyles.addPostDetailsTitleDivider, SDGenericStyles.backgroundColorWhite]} />
                </View>
                <KeyboardAvoidingView style={SDGenericStyles.marginVertical2} enabled>
                    <Animated.ScrollView contentContainerStyle={SDGenericStyles.alignItemsCenter}
                        style={{ maxHeight: height / numericConstants.TWO }}>

                        <SDPostTypeOptionsView inputName={fieldControllerName.POST_TYPE} control={control} rules={formRequiredRules.postTypeRule} formState={formState}
                            defaultValue={userPosts.details.postType} checkValue={postValueType} />

                        <SDImageFormInput inputName={fieldControllerName.POST_TITLE} control={control} rules={formRequiredRules.addPostTitleRule}
                            defaultValue={userPosts.details.postTitle} maxLength={numericConstants.TWENTY_FIVE} placeHolderText={placeHolderText.ADD_TITLE}
                            keyboardType={keyBoardTypeConst.DEFAULT} formState={formState} autoFocus={true} textContentType={keyBoardTypeConst.TITLE}
                            extraStyles={[SDGenericStyles.textBoxGray, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.borderRadius20,
                            SDGenericStyles.textColorWhite, SDGenericStyles.ft16]} autoCapitalize={miscMessage.WORDS} />

                        <SDImageFormInput inputName={fieldControllerName.POST_LINK} control={control} formState={formState} keyboardType={isAndroid && keyBoardTypeConst.DEFAULT || keyBoardTypeConst.IOS_URL}
                            defaultValue={userPosts.details.postLink} placeHolderText={placeHolderText.ADD_URL} textContentType={keyBoardTypeConst.URL} rules={formRequiredRules.addPostLinkRule}
                            extraStyles={[SDGenericStyles.textBoxGray, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.borderRadius20, SDGenericStyles.textColorWhite, SDGenericStyles.ft16]} />

                        <SDMultiTextInputLengthText value={postDescriptionValue} maxLength={numericConstants.TWO_HUNDRED} />

                        <SDImageFormInput inputName={fieldControllerName.POST_DESCRIPTION} control={control} rules={formRequiredRules.addPostDescription}
                            defaultValue={userPosts.details.postDescription} maxLength={numericConstants.TWO_HUNDRED} placeHolderText={placeHolderText.ADD_DESCRIPTION}
                            keyboardType={keyBoardTypeConst.DEFAULT} formState={formState} isMultiline={true} numberOfLines={numericConstants.THREE} textContentType={keyBoardTypeConst.NONE}
                            extraStyles={[SDGenericStyles.textBoxGray, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.height100, SDGenericStyles.borderRadius20, SDGenericStyles.textColorWhite,
                            SDGenericStyles.ft16, SDGenericStyles.textALignVerticalTop]} maxLength={numericConstants.TWO_HUNDRED} />
                    </Animated.ScrollView>

                </KeyboardAvoidingView>
                <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentSpaceBetween,
                SDGenericStyles.paddingHorizontal65, SDGenericStyles.bottom65]}>
                    <View>
                        <TouchableOpacity activeOpacity={.7} style={[glancePostStyles.postButtonStyle, SDGenericStyles.elevation8, { width: width / numericConstants.FOUR },
                        SDGenericStyles.paddingHorizontal10]}>
                            <Text style={[SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.colorBlack, SDGenericStyles.textCenterAlign]} onPress={() => navigation.goBack()}>
                                {actionButtonTextConstants.CANCEL_POST.toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={SDGenericStyles.paddingLeft20}>
                        <TouchableOpacity activeOpacity={.7} style={[glancePostStyles.postButtonStyle, SDGenericStyles.elevation8, { width: width / numericConstants.FOUR }]} onPress={handleSubmit(onSubmit)}>
                            <Text style={[SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.ft14, SDGenericStyles.colorBlack, SDGenericStyles.textCenterAlign]}>
                                {actionButtonTextConstants.NEXT.toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <AddPostSelectionModal isFrom={screens.EDIT_POST_DETAILS} navigation={navigation} setShowSelection={setShowSelection}
                showSelection={showSelection} />
            <UserSelectionOptionModal bottomSheetState={bottomSheetState} setBottomSheetState={setBottomSheetState} textMessage={alertTextMessages.DELETE_USER_POST_IMAGE}
                successButton={actionButtonTextConstants.YES.toUpperCase()} handleSubmit={handleDelete} />
        </View>
    </TouchableWithoutFeedback>
});
