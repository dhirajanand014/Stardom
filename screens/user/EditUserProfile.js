
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
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
import { showSnackBar, redirectUserToGlance, saveRegistrationStatus, userPostAction, fetchUpdateLoggedInUserProfile } from '../../helper/Helper';
import { useNavigation, useRoute } from '@react-navigation/core';
import { CategoryContext } from '../../App';
import { LoginSecretIcon } from '../../components/icons/LoginSecretIcon';
import FastImage from 'react-native-fast-image';
import { BottomSheetView } from '../../views/bottomSheet/BottomSheetView';
import { SDMultiTextInputLengthText } from '../../components/texts/SDMultiTextInputLengthText';

export const EditUserProfile = () => {
    const { control, formState, handleSubmit, reset, watch } = useForm();

    const { loggedInUser, setLoggedInUser, loader, setLoaderCallback } = useContext(CategoryContext);
    const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);
    const route = useRoute();
    const imageValue = route.params?.imageValue;

    const [profileDetails, setProfileDetails] = useState({
        profile_picture: imageValue || stringConstants.EMPTY,
        name: stringConstants.EMPTY,
        email: stringConstants.EMPTY,
        secret: stringConstants.EMPTY,
        bio: stringConstants.EMPTY
    });

    const snapPoints = useMemo(() => [numericConstants.TWO_HUNDRED_NINETY, numericConstants.ZERO],
        jsonConstants.EMPTY);

    const bottomSheetRef = useRef(null);

    const fallValue = new Animated.Value(numericConstants.ONE);
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
        const registrationUpdated = await userPostAction(requestConstants.EDIT, data, loggedInUser.loginDetails.token,
            uploadCallback);
        if (registrationUpdated) {
            await fetchUpdateLoggedInUserProfile(loggedInUser, setLoggedInUser, true);
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
        setLoaderCallback(true);
        const details = JSON.parse(loggedInUser.loginDetails.details);
        if (imageValue) {
            details.profile_picture = imageValue;
        }
        setProfileDetails(details);
        reset({ ...details });

        setLoaderCallback(false);
    }, [jsonConstants.EMPTY, imageValue]);

    const bioInput = watch(fieldControllerName.ADD_USER_BIO);
    const detailsCallback = useCallback(() => bottomSheetRef?.current?.snapTo(numericConstants.ONE));

    return (
        <EditProfile loader={loader} profileDetails={profileDetails} bottomSheetRef={bottomSheetRef} control={control} formState={formState}
            setIsSecureTextEntry={setIsSecureTextEntry} isSecureTextEntry={isSecureTextEntry} bioInput={bioInput} handleSubmit={handleSubmit}
            onSubmit={onSubmit} detailsCallback={detailsCallback} snapPoints={snapPoints} fallValue={fallValue} navigation={navigation} />
    )
}

const EditProfile = React.memo(({ loader, profileDetails, bottomSheetRef, control, formState, setIsSecureTextEntry, isSecureTextEntry, bioInput,
    handleSubmit, onSubmit, detailsCallback, snapPoints, fallValue, navigation }) => {
    return <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack, SDGenericStyles.alignItemsCenter]}
            pointerEvents={loader.isLoading && miscMessage.NONE || miscMessage.AUTO}>
            <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter, SDGenericStyles.paddingTop10]}>
                <TouchableOpacity activeOpacity={.7} style={SDGenericStyles.elevation8} onPress={() => { Keyboard.dismiss(); bottomSheetRef?.current?.snapTo(numericConstants.ZERO) }}>
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
            <AuthHeaderText titleText={modalTextConstants.EDIT_PROFILE} />
            <Animated.ScrollView>
                <SDImageFormInput inputName={fieldControllerName.NAME} control={control}
                    defaultValue={profileDetails.name} placeHolderText={placeHolderText.FULL_NAME} autofocus={true}
                    keyboardType={keyBoardTypeConst.DEFAULT} textContentType={keyBoardTypeConst.NAME} formState={formState}
                    extraStyles={[SDGenericStyles.ft16, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium]}
                    icon={<RegisterUserIcon width={numericConstants.EIGHTEEN} height={numericConstants.EIGHTEEN}
                        stroke={formState.errors[fieldControllerName.USER_ID]?.message && colors.RED || colors.SDOM_PLACEHOLDER} />} />

                <SDImageFormInput inputName={fieldControllerName.EMAIL} control={control}
                    defaultValue={profileDetails.email} placeHolderText={placeHolderText.EMAIL}
                    keyboardType={keyBoardTypeConst.EMAIL} textContentType={keyBoardTypeConst.NONE} formState={formState}
                    extraStyles={[SDGenericStyles.ft16, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium]}
                    icon={<RegisterUserIcon width={numericConstants.EIGHTEEN} height={numericConstants.EIGHTEEN}
                        stroke={formState.errors[fieldControllerName.USER_ID]?.message && colors.RED || colors.SDOM_PLACEHOLDER} />} />

                <SDImageFormInput inputName={fieldControllerName.SECRET} control={control} isPasswordInput={true}
                    defaultValue={stringConstants.EMPTY} placeHolderText={placeHolderText.SECRET} textContentType={keyBoardTypeConst.NEW_PASSWORD}
                    keyboardType={keyBoardTypeConst.DEFAULT} icon={<LoginSecretIcon stroke={formState.errors[fieldControllerName.SECRET]?.message &&
                        colors.RED || colors.SDOM_PLACEHOLDER} />} formState={formState} minLength={numericConstants.SIX} setIsSecureTextEntry={setIsSecureTextEntry}
                    isSecureTextEntry={isSecureTextEntry} extraStyles={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.textColorWhite]} />

                <SDMultiTextInputLengthText value={bioInput} maxLength={numericConstants.TWO_HUNDRED} />

                <SDImageFormInput inputName={fieldControllerName.ADD_USER_BIO} control={control} maxLength={numericConstants.TWO_HUNDRED}
                    defaultValue={profileDetails.bio} placeHolderText={placeHolderText.VERIFY_USER_DETAILS} isFeedbackInput={true}
                    formState={formState} isMultiline={true} underlineColorAndroid={miscMessage.TRANSPARENT} numberOfLines={numericConstants.FIVE}
                    extraStyles={[SDGenericStyles.height150, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.ft16, SDGenericStyles.borderRadius5,
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
            <BottomSheetView bottomSheetRef={bottomSheetRef} detailsCallback={detailsCallback}
                snapPoints={snapPoints} fall={fallValue} navigation={navigation} isFrom={screens.EDIT_USER_PROFILE} />
        </View>
    </TouchableWithoutFeedback >;
});
