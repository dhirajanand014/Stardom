
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import { SDImageFormInput } from '../../views/fromInputView/SDImageFormInput';
import {
    fieldControllerName, stringConstants, keyBoardTypeConst,
    placeHolderText, actionButtonTextConstants, miscMessage, numericConstants,
    modalTextConstants, alertTextMessages, screens, jsonConstants, requestConstants
} from '../../constants/Constants';
import { SDGenericStyles, userAuthStyles, colors, glancePostStyles, userMenuStyles } from '../../styles/Styles';
import { AuthHeaderText } from '../../views/fromInputView/AuthHeaderText';
import { RegisterUserIcon } from '../../components/icons/RegisterUserIcon';
import Animated from 'react-native-reanimated';
import { showSnackBar, redirectUserToGlance, saveRegistrationStatus, userPostAction, fetchUpdateLoggedInUserProfile, getLoggedInUserDetails } from '../../helper/Helper';
import { useNavigation, useRoute } from '@react-navigation/core';
import { CategoryContext } from '../../App';
import { LoginSecretIcon } from '../../components/icons/LoginSecretIcon';
import FastImage from 'react-native-fast-image';
import { BackButton } from '../../components/button/BackButton';
import { SDMultiTextInputLengthText } from '../../components/texts/SDMultiTextInputLengthText';
import { AddPostSelectionModal } from '../../components/modals/AddPostSelectionModal';
import { useIsFocused } from '@react-navigation/native';

export const EditUserProfile = () => {
    const { control, formState, handleSubmit, reset, watch } = useForm();

    const { loader, setLoaderCallback } = useContext(CategoryContext);
    const isFocused = useIsFocused();
    const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);

    const [editProfileLoggedInUser, setEditProfileLoggedInUser] = useState({
        loginDetails: stringConstants.EMPTY,
        isLoggedIn: false
    })

    const [showSelection, setShowSelection] = useState(false);
    const route = useRoute();
    const imageValue = route.params?.imageValue;

    const [profileDetails, setProfileDetails] = useState({
        profile_picture: imageValue || stringConstants.EMPTY,
        name: stringConstants.EMPTY,
        email: stringConstants.EMPTY,
        secret: stringConstants.EMPTY,
        bio: stringConstants.EMPTY
    });
    /**
     * Notify progress upload to loader.
     */
    const uploadCallback = useCallback((progressEvent) => {
        setLoaderCallback(true, alertTextMessages.UPDATING_DETAILS,
            Math.round((progressEvent.loaded * numericConstants.ONE_HUNDRED) / progressEvent.total));
    })

    const navigation = useNavigation();

    const onSubmit = async (data) => {
        setLoaderCallback(true, alertTextMessages.UPDATING_DETAILS);
        data.imagePath = profileDetails.profile_picture;
        const registrationUpdated = await userPostAction(requestConstants.EDIT, data, editProfileLoggedInUser.loginDetails.token,
            uploadCallback);
        if (registrationUpdated) {
            await fetchUpdateLoggedInUserProfile(editProfileLoggedInUser, setEditProfileLoggedInUser, true);
            const initialCategories = await redirectUserToGlance();
            showSnackBar(alertTextMessages.USER_DETAILS_ADDED_SUCCESSFULLY, true);
            setLoaderCallback(true, alertTextMessages.DETAILS_UPDATED_SUCCESSFULLY);
            navigation.navigate(initialCategories && screens.GLANCE || screens.CATEGORY);
        } else {
            await saveRegistrationStatus(phoneNumber, miscMessage.VERIFIED);
        }
        setLoaderCallback(false);
    }

    useEffect(() => {
        (async () => {
            setLoaderCallback(true);
            const user = await getLoggedInUserDetails();
            if (user.details || editProfileLoggedInUser.isLoggedIn) {
                editProfileLoggedInUser.loginDetails = { ...user };
                editProfileLoggedInUser.isLoggedIn = true
                const details = JSON.parse(editProfileLoggedInUser.loginDetails.details);
                if (imageValue) {
                    details.profile_picture = imageValue;
                }
                setProfileDetails(details);
                setEditProfileLoggedInUser({ ...editProfileLoggedInUser });
                reset({ ...details });
            }
            setLoaderCallback(false);
        })();
    }, [isFocused, imageValue]);

    const bioInput = watch(fieldControllerName.ADD_USER_BIO);

    return (
        <EditProfile loader={loader} profileDetails={profileDetails} control={control} formState={formState} setShowSelection={setShowSelection}
            setIsSecureTextEntry={setIsSecureTextEntry} isSecureTextEntry={isSecureTextEntry} bioInput={bioInput} showSelection={showSelection}
            onSubmit={onSubmit} navigation={navigation} handleSubmit={handleSubmit} />
    )
}

const EditProfile = React.memo(({ loader, profileDetails, control, formState, setIsSecureTextEntry, isSecureTextEntry, bioInput, showSelection,
    handleSubmit, onSubmit, navigation, setShowSelection }) => {
    return <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack, SDGenericStyles.alignItemsCenter]}
            pointerEvents={loader.isLoading && miscMessage.NONE || miscMessage.AUTO}>
            <BackButton goBack leftStyle={numericConstants.TEN} extraStyles={SDGenericStyles.marginTop20} />
            <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter, SDGenericStyles.paddingTop80]}>
                <TouchableOpacity activeOpacity={.7} style={SDGenericStyles.elevation8} onPress={() => { Keyboard.dismiss(); setShowSelection(true); }}>
                    <FastImage source={{
                        uri: profileDetails.profile_picture, priority: FastImage.priority.normal, cache: FastImage.cacheControl.immutable
                    }} style={[userMenuStyles.editProfileImageStyle, SDGenericStyles.paddingHorizontal25]}>
                    </FastImage>
                    <View style={[SDGenericStyles.justifyItemsStart, SDGenericStyles.alignItemsStart, SDGenericStyles.elevation8]}>
                        <Image style={[userMenuStyles.editProfileCameraIconStyle, SDGenericStyles.bottom6, SDGenericStyles.positionAbsolute,
                        SDGenericStyles.right8]} source={require(`../../assets/camera_icon.png`)} />
                    </View>
                </TouchableOpacity>
            </View>
            <AuthHeaderText titleText={modalTextConstants.EDIT_PROFILE} goBack />
            <Animated.ScrollView>
                <SDImageFormInput inputName={fieldControllerName.NAME} control={control}
                    defaultValue={profileDetails.name} placeHolderText={placeHolderText.FULL_NAME} autofocus={true}
                    keyboardType={keyBoardTypeConst.DEFAULT} textContentType={keyBoardTypeConst.NAME} formState={formState}
                    extraStyles={[SDGenericStyles.ft16, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoRegular]}
                    icon={<RegisterUserIcon width={numericConstants.EIGHTEEN} height={numericConstants.EIGHTEEN}
                        stroke={formState.errors[fieldControllerName.USER_ID]?.message && colors.RED || colors.SDOM_PLACEHOLDER} />} />

                <SDImageFormInput inputName={fieldControllerName.EMAIL} control={control}
                    defaultValue={profileDetails.email} placeHolderText={placeHolderText.EMAIL}
                    keyboardType={keyBoardTypeConst.EMAIL} textContentType={keyBoardTypeConst.NONE} formState={formState}
                    extraStyles={[SDGenericStyles.ft16, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoRegular]}
                    icon={<RegisterUserIcon width={numericConstants.EIGHTEEN} height={numericConstants.EIGHTEEN}
                        stroke={formState.errors[fieldControllerName.USER_ID]?.message && colors.RED || colors.SDOM_PLACEHOLDER} />} />

                <SDImageFormInput inputName={fieldControllerName.SECRET} control={control} isPasswordInput={true}
                    defaultValue={stringConstants.EMPTY} placeHolderText={placeHolderText.SECRET} textContentType={keyBoardTypeConst.NEW_PASSWORD}
                    keyboardType={keyBoardTypeConst.DEFAULT} icon={<LoginSecretIcon stroke={formState.errors[fieldControllerName.SECRET]?.message &&
                        colors.RED || colors.SDOM_PLACEHOLDER} />} formState={formState} minLength={numericConstants.SIX} setIsSecureTextEntry={setIsSecureTextEntry}
                    isSecureTextEntry={isSecureTextEntry} extraStyles={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textColorWhite]} />

                <SDMultiTextInputLengthText value={bioInput} maxLength={numericConstants.TWO_HUNDRED} />

                <SDImageFormInput inputName={fieldControllerName.ADD_USER_BIO} control={control} maxLength={numericConstants.TWO_HUNDRED}
                    defaultValue={profileDetails.bio} placeHolderText={placeHolderText.VERIFY_USER_DETAILS} isFeedbackInput={true}
                    formState={formState} isMultiline={true} underlineColorAndroid={miscMessage.TRANSPARENT} numberOfLines={numericConstants.FIVE}
                    extraStyles={[SDGenericStyles.height150, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.ft16, SDGenericStyles.borderRadius5,
                    SDGenericStyles.justifyContentCenter, SDGenericStyles.textBoxGray, SDGenericStyles.textColorWhite, glancePostStyles.userBioTextHeight,
                    SDGenericStyles.textALignVerticalTop, SDGenericStyles.paddingLeft5]} textContentType={keyBoardTypeConst.NONE} keyboardType={keyBoardTypeConst.DEFAULT} />

            </Animated.ScrollView>

            <View style={userAuthStyles.registerationDetailsView}>
                <TouchableOpacity activeOpacity={.7} style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.backgroundColorYellow]}
                    onPress={handleSubmit(onSubmit)}>
                    <Text style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.fontFamilyRobotoMedium]}>
                        {actionButtonTextConstants.UPDATE}</Text>
                </TouchableOpacity>
            </View>
            <AddPostSelectionModal isFrom={screens.EDIT_USER_PROFILE} navigation={navigation} setShowSelection={setShowSelection}
                showSelection={showSelection} />
        </View>
    </TouchableWithoutFeedback >;
});
