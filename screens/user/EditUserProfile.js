
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, TouchableOpacity } from 'react-native';
import { SDImageFormInput } from '../../views/fromInputView/SDImageFormInput';
import {
    fieldControllerName, formRequiredRules, stringConstants, keyBoardTypeConst,
    placeHolderText, actionButtonTextConstants, miscMessage, numericConstants,
    modalTextConstants, alertTextMessages, screens, jsonConstants, requestConstants
} from '../../constants/Constants';
import { SDGenericStyles, userAuthStyles, colors, glancePostStyles, userMenuStyles } from '../../styles/Styles';
import { AuthHeaderText } from '../../views/fromInputView/AuthHeaderText';
import { RegisterUserIcon } from '../../components/icons/RegisterUserIcon';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { showSnackBar, redirectUserToGlance, saveRegistrationStatus, userPostAction } from '../../helper/Helper';
import { useNavigation, useRoute } from '@react-navigation/core';
import { CategoryContext } from '../../App';
import { LoginSecretIcon } from '../../components/icons/LoginSecretIcon';
import FastImage from 'react-native-fast-image';
import { BottomSheetView } from '../../views/bottomSheet/BottomSheetView';

export const EditUserProfile = () => {
    const { control, formState, handleSubmit, reset } = useForm();

    const { loggedInUser } = useContext(CategoryContext);

    const route = useRoute();
    const imageValue = route.params?.imageValue;

    const [profileDetails, setProfileDetails] = useState({
        profile_picture: imageValue || stringConstants.EMPTY,
        name: stringConstants.EMPTY,
        email: stringConstants.EMPTY,
        secret: stringConstants.EMPTY,
        bio: stringConstants.EMPTY
    });

    const snapPoints = useMemo(() => [numericConstants.THREE_HUNDRED_THIRTY, numericConstants.ZERO],
        jsonConstants.EMPTY);

    const bottomSheetRef = useRef(null);
    const bottomSheetRefCallback = node => {
        bottomSheetRef.current = node;
    };

    const fallValue = useSharedValue(numericConstants.ONE);

    const navigation = useNavigation();

    const onSubmit = async (data) => {
        data.imagePath = profileDetails.profile_picture;
        const registrationUpdated = await userPostAction(requestConstants.EDIT, data, loggedInUser.loginDetails.token);
        if (registrationUpdated) {
            const initialCategories = await redirectUserToGlance();
            showSnackBar(alertTextMessages.USER_DETAILS_ADDED_SUCCESSFULLY, true);
            navigation.navigate(initialCategories && screens.GLANCE || screens.CATEGORY);
        } else {
            await saveRegistrationStatus(phoneNumber, miscMessage.VERIFIED);
        }
    }

    useEffect(() => {
        const details = JSON.parse(loggedInUser.loginDetails.details);
        if (imageValue) {
            details.profile_picture = imageValue;
        }
        setProfileDetails(details);
        reset({ ...details })
    }, imageValue || jsonConstants.EMPTY);


    const detailsCallback = useCallback(() => {
        bottomSheetRef?.current?.snapTo(numericConstants.ONE)
    });

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack, SDGenericStyles.alignItemsCenter]}>
            <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter, SDGenericStyles.paddingTop20]}>
                <FastImage source={{
                    uri: profileDetails.profile_picture, priority: FastImage.priority.normal, cache: FastImage.cacheControl.immutable
                }} style={[userMenuStyles.editProfileImageStyle, SDGenericStyles.paddingHorizontal25]} />
                <TouchableOpacity activeOpacity={.7} onPress={() => bottomSheetRef?.current?.snapTo(numericConstants.ZERO)}>
                    <Text style={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRoman, SDGenericStyles.colorYellow,
                    SDGenericStyles.textCenterAlign, SDGenericStyles.paddingVertical10]}>
                        {miscMessage.EDIT_PROFILE_IMAGE}
                    </Text>
                </TouchableOpacity>
            </View>
            <AuthHeaderText titleText={modalTextConstants.EDIT_PROFILE} />
            <Animated.ScrollView>
                <SDImageFormInput inputName={fieldControllerName.NAME} control={control} rules={formRequiredRules.nameFormRule}
                    defaultValue={profileDetails.name} placeHolderText={placeHolderText.FULL_NAME} autofocus={true}
                    keyboardType={keyBoardTypeConst.DEFAULT} textContentType={keyBoardTypeConst.NAME} formState={formState}
                    extraStyles={[SDGenericStyles.ft16, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRoman]}
                    icon={<RegisterUserIcon width={numericConstants.EIGHTEEN} height={numericConstants.EIGHTEEN}
                        stroke={formState.errors[fieldControllerName.USER_ID]?.message && colors.RED || colors.SDOM_PLACEHOLDER} />} />

                <SDImageFormInput inputName={fieldControllerName.EMAIL} control={control} rules={formRequiredRules.emailRule}
                    defaultValue={profileDetails.email} placeHolderText={placeHolderText.EMAIL}
                    keyboardType={keyBoardTypeConst.EMAIL} textContentType={keyBoardTypeConst.NONE} formState={formState}
                    extraStyles={[SDGenericStyles.ft16, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRoman]}
                    icon={<RegisterUserIcon width={numericConstants.EIGHTEEN} height={numericConstants.EIGHTEEN}
                        stroke={formState.errors[fieldControllerName.USER_ID]?.message && colors.RED || colors.SDOM_PLACEHOLDER} />} />

                <SDImageFormInput inputName={fieldControllerName.SECRET} control={control} rules={formRequiredRules.passwordFormRule}
                    defaultValue={stringConstants.EMPTY} placeHolderText={placeHolderText.SECRET} textContentType={keyBoardTypeConst.NEW_PASSWORD}
                    keyboardType={keyBoardTypeConst.DEFAULT} icon={<LoginSecretIcon stroke={formState.errors[fieldControllerName.SECRET]?.message &&
                        colors.RED || colors.SDOM_PLACEHOLDER} />} formState={formState} maxLength={numericConstants.TEN}
                    isSecureTextEntry={true} extraStyles={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRoman, SDGenericStyles.textColorWhite]} />

                <SDImageFormInput inputName={fieldControllerName.ADD_USER_BIO} control={control} rules={formRequiredRules.verifyUserInputRule}
                    defaultValue={profileDetails.bio} placeHolderText={placeHolderText.VERIFY_USER_DETAILS} isFeedbackInput={true}
                    formState={formState} multiline={true} underlineColorAndroid={miscMessage.TRANSPARENT} numberOfLines={numericConstants.TWO}
                    extraStyles={[SDGenericStyles.height150, SDGenericStyles.fontFamilyRoman, SDGenericStyles.ft16, SDGenericStyles.borderRadius5,
                    SDGenericStyles.justifyContentCenter, SDGenericStyles.textBoxGray, SDGenericStyles.textColorWhite, glancePostStyles.userBioTextHeight,
                    SDGenericStyles.textALignVerticalTop, SDGenericStyles.paddingLeft5]} />

            </Animated.ScrollView>

            <View style={userAuthStyles.registerationDetailsView}>
                <TouchableOpacity activeOpacity={.7} style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.backgroundColorYellow]} onPress={handleSubmit(onSubmit)}>
                    <Text style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.fontFamilyRoman]}>{actionButtonTextConstants.UPDATE}</Text>
                </TouchableOpacity>
            </View>
            <BottomSheetView refCallback={bottomSheetRefCallback} bottomSheetRef={bottomSheetRef} detailsCallback={detailsCallback}
                snapPoints={snapPoints} fall={fallValue} navigation={navigation} isFrom={screens.EDIT_USER_PROFILE} />
        </View>
    )
}