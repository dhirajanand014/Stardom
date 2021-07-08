import { useNavigation, useRoute } from '@react-navigation/core'
import React, { useCallback, useContext, useMemo, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Keyboard, KeyboardAvoidingView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
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
    jsonConstants, alertTextMessages, screens, stringConstants
} from '../../constants/Constants'
import { checkTokenStatus, handlePostDelete, showSnackBar } from '../../helper/Helper'
import { colors, glancePostStyles, SDGenericStyles } from '../../styles/Styles'
import { BottomSheetView } from '../../views/bottomSheet/BottomSheetView'
import { SDImageFormInput } from '../../views/fromInputView/SDImageFormInput'
import { BackButton } from '../../components/button/BackButton';
import { SDPostTypeOptionsView } from '../../views/fromInputView/SDPostTypeOptionView'
import { SDMultiTextInputLengthText } from '../../components/texts/SDMultiTextInputLengthText'

export const AddPostDetails = () => {

    const { userPosts, loggedInUser, loader, setLoaderCallback } = useContext(CategoryContext);

    const bottomSheetRef = useRef(null);

    const snapPoints = useMemo(() => [numericConstants.TWO_HUNDRED_NINETY, numericConstants.ZERO],
        jsonConstants.EMPTY);

    const fallValue = new Animated.Value(numericConstants.ONE);

    const route = useRoute();
    const toAction = route.params?.toAction;
    const selectedItem = route.params?.selectedItem;

    const { control, formState, handleSubmit, watch } = useForm();

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

    const handleDelete = async () => {
        setLoaderCallback(true, alertTextMessages.DELETING_POST);
        const responseData = await handlePostDelete(selectedItem.id, loggedInUser.loginDetails.token);
        if (responseData && responseData.message == alertTextMessages.POST_DELETED_SUCCESSFULLY) {
            navigateUser(responseData);
        } else if (checkTokenStatus(responseData)) {
            loginCallback();
            showSnackBar(errorMessages.YOUR_SESSION_IS_EXPIRED_PLEASE_LOGIN, false, true, loginCallback);
        }
        setLoaderCallback(false);
    }

    const postDescriptionValue = watch(fieldControllerName.POST_DESCRIPTION);
    const postValueType = watch(fieldControllerName.POST_TYPE,
        toAction == miscMessage.UPDATE && userPosts.details.postType || stringConstants.EMPTY);

    const detailsCallback = useCallback(() => {
        bottomSheetRef?.current?.snapTo(numericConstants.ONE)
    });

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack]} pointerEvents={loader.isLoading && miscMessage.NONE || miscMessage.AUTO}>
                <BackButton goBack leftStyle={numericConstants.TEN} />
                <View style={[glancePostStyles.addPostDetailsStyle, SDGenericStyles.alignItemsCenter, SDGenericStyles.paddingTop10]}>
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
                        <Text style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.placeHolderTextColor, SDGenericStyles.ft18,
                        SDGenericStyles.paddingBottom5]}>
                            {modalTextConstants.ADD_WALLPAPER_DETAILS}</Text>
                        <View style={[glancePostStyles.addPostDetailsTitleDivider, SDGenericStyles.backgroundColorWhite]} />
                    </View>
                    <KeyboardAvoidingView style={SDGenericStyles.marginVertical2}>
                        <View style={SDGenericStyles.alignItemsCenter}>

                            <SDPostTypeOptionsView inputName={fieldControllerName.POST_TYPE} control={control} rules={formRequiredRules.postTypeRule} formState={formState}
                                defaultValue={userPosts.details.postType} checkValue={postValueType} />

                            <SDImageFormInput inputName={fieldControllerName.POST_TITLE} control={control} rules={formRequiredRules.addPostTitleRule}
                                defaultValue={userPosts.details.postTitle} maxLength={numericConstants.FIFTEEN} placeHolderText={placeHolderText.ADD_TITLE}
                                keyboardType={keyBoardTypeConst.DEFAULT} formState={formState} autoFocus={true} textContentType={keyBoardTypeConst.TITLE}
                                extraStyles={[SDGenericStyles.textBoxGray, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.borderRadius20,
                                SDGenericStyles.textColorWhite, SDGenericStyles.ft16]} />

                            <SDImageFormInput inputName={fieldControllerName.POST_LINK} control={control} formState={formState} keyboardType={isAndroid && keyBoardTypeConst.DEFAULT || keyBoardTypeConst.IOS_URL}
                                defaultValue={userPosts.details.postLink} placeHolderText={placeHolderText.ADD_URL} textContentType={keyBoardTypeConst.URL} rules={formRequiredRules.addPostLinkRule}
                                extraStyles={[SDGenericStyles.textBoxGray, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.borderRadius20, SDGenericStyles.textColorWhite, SDGenericStyles.ft16]} />

                            <SDMultiTextInputLengthText value={postDescriptionValue} maxLength={numericConstants.TWO_HUNDRED} />

                            <SDImageFormInput inputName={fieldControllerName.POST_DESCRIPTION} control={control} rules={formRequiredRules.addPostDescription}
                                defaultValue={userPosts.details.postDescription} maxLength={numericConstants.TWO_HUNDRED} placeHolderText={placeHolderText.ADD_DESCRIPTION}
                                keyboardType={keyBoardTypeConst.DEFAULT} formState={formState} isMultiline={true} numberOfLines={numericConstants.THREE} textContentType={keyBoardTypeConst.NONE}
                                extraStyles={[SDGenericStyles.textBoxGray, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.height100, SDGenericStyles.borderRadius20, SDGenericStyles.textColorWhite,
                                SDGenericStyles.ft16, SDGenericStyles.textALignVerticalTop]} maxLength={numericConstants.TWO_HUNDRED} />

                        </View>
                        <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentSpaceBetween,
                        SDGenericStyles.paddingHorizontal65, SDGenericStyles.mb5]}>
                            <TouchableOpacity activeOpacity={.7} style={[glancePostStyles.postButtonStyle, SDGenericStyles.elevation8, { width: width / numericConstants.FOUR }]}>
                                <Text style={[SDGenericStyles.fontFamilyRobotoMedium, glancePostStyles.addPostButtonText, SDGenericStyles.colorBlack,
                                SDGenericStyles.textCenterAlign]} onPress={() => navigation.goBack()}>
                                    {actionButtonTextConstants.CANCEL_POST.toUpperCase()}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={.7} style={[glancePostStyles.postButtonStyle, SDGenericStyles.elevation8, { width: width / numericConstants.FOUR }]} onPress={handleSubmit(onSubmit)}>
                                <Text style={[SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.ft14, SDGenericStyles.colorBlack, SDGenericStyles.textCenterAlign]}>
                                    {actionButtonTextConstants.NEXT.toUpperCase()}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </View>
                <BottomSheetView bottomSheetRef={bottomSheetRef} detailsCallback={detailsCallback}
                    snapPoints={snapPoints} fall={fallValue} navigation={navigation} isFrom={screens.EDIT_POST_DETAILS} />
            </View>
        </TouchableWithoutFeedback>
    )
}