import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useForm } from "react-hook-form";
import { Modal, Text, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard, Image } from "react-native";
import { useCallback } from "react/cjs/react.development";
import {
    stringConstants, actionButtonTextConstants, fieldControllerName, formRequiredRules,
    placeHolderText, miscMessage, numericConstants, responseStringData, alertTextMessages,
    errorMessages, requestConstants, keyBoardTypeConst, isAndroid, screens
} from "../../constants/Constants";
import { showSnackBar, userPostAction } from "../../helper/Helper";
import { SDGenericStyles, userMenuStyles } from "../../styles/Styles";
import { SDImageFormInput } from "../../views/fromInputView/SDImageFormInput";
import { SDMultiTextInputLengthText } from "../texts/SDMultiTextInputLengthText";

export const UserVerifyModal = props => {
    const { handleSubmit, control, formState, watch } = useForm();
    const navigation = useNavigation();

    const verifyInputValue = watch(fieldControllerName.VERIFY_USER);
    const { profileMenu, setProfileMenu, menuLoggedInUser } = props

    const handleVerifySubmit = useCallback(async (data) => {
        const verifyResponse = await userPostAction(requestConstants.USER_VERIFY, data, menuLoggedInUser.loginDetails.token);
        verifyResponse.message == responseStringData.SUCCESS &&
            setTimeout(() => showSnackBar(alertTextMessages.SUBMITTED_FOR_VERIFICATION, true), numericConstants.THREE_HUNDRED);
        verifyResponse.message == responseStringData.ERROR &&
            setTimeout(() => showSnackBar(errorMessages.COULD_NOT_SUBMIT_VERIFICATION, false), numericConstants.THREE_HUNDRED);
        navigation.navigate(screens.GLANCE);
    });

    const verifyEULA = data => {
        setProfileMenu({ ...profileMenu, showSubmitVerifyModal: false });
        navigation.navigate(screens.EULA_ACCEPTANCE, { onSubmit: handleVerifySubmit, data: data, isFrom: miscMessage.USER_VERIFY });
    };

    return (
        <Modal animationType="slide" transparent visible={profileMenu.showSubmitVerifyModal} onRequestClose={() =>
            setProfileMenu({ ...profileMenu, showSubmitVerifyModal: false })}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={[SDGenericStyles.fill, SDGenericStyles.alignItemsCenter]}>
                    <View style={[userMenuStyles.userVerifyModalView, SDGenericStyles.alignItemsCenter, SDGenericStyles.textBoxGray]}>

                        <SDImageFormInput inputName={fieldControllerName.FACEBOOK_LINK} control={control} defaultValue={stringConstants.EMPTY} placeHolderText={placeHolderText.FACEBOOK_LINK}
                            keyboardType={isAndroid && keyBoardTypeConst.DEFAULT || keyBoardTypeConst.IOS_URL} textContentType={keyBoardTypeConst.URL} formState={formState} autofocus={true}
                            extraStyles={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textColorWhite, SDGenericStyles.backGroundColorGray,
                            SDGenericStyles.borderRadius5, SDGenericStyles.justifyContentCenter, SDGenericStyles.paddingLeft10]} icon={<Image source={require(`../../assets/facebook_social_media_icon.png`)}
                                style={[SDGenericStyles.iconSocialMedia, SDGenericStyles.alignItemsCenter, SDGenericStyles.ml_6]} />} />

                        <SDImageFormInput inputName={fieldControllerName.INSTAGRAM_LINK} control={control} defaultValue={stringConstants.EMPTY} placeHolderText={placeHolderText.INSTAGRAM_LINK}
                            keyboardType={isAndroid && keyBoardTypeConst.DEFAULT || keyBoardTypeConst.IOS_URL} textContentType={keyBoardTypeConst.URL} formState={formState}
                            extraStyles={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textColorWhite, SDGenericStyles.backGroundColorGray,
                            SDGenericStyles.borderRadius5, SDGenericStyles.justifyContentCenter, SDGenericStyles.paddingLeft10]} icon={<Image source={require(`../../assets/instagram_social_media_icon.png`)}
                                style={[SDGenericStyles.iconSocialMedia, SDGenericStyles.alignItemsCenter, SDGenericStyles.ml_6]} />} />

                        <SDMultiTextInputLengthText value={verifyInputValue} maxLength={numericConstants.TWO_HUNDRED} />

                        <SDImageFormInput inputName={fieldControllerName.VERIFY_USER} control={control} rules={formRequiredRules.verifyUserInputRule}
                            defaultValue={stringConstants.EMPTY} placeHolderText={placeHolderText.VERIFY_USER_DETAILS} isFeedbackInput={true}
                            formState={formState} isMultiline={true} underlineColorAndroid={miscMessage.TRANSPARENT} numberOfLines={numericConstants.TWO}
                            extraStyles={[SDGenericStyles.height150, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.ft16, SDGenericStyles.borderRadius5,
                            SDGenericStyles.justifyContentCenter, SDGenericStyles.backGroundColorGray, SDGenericStyles.textColorWhite, userMenuStyles.verifyUserTextHeight,
                            SDGenericStyles.textALignVerticalTop, SDGenericStyles.paddingLeft10]} maxLength={numericConstants.TWO_HUNDRED} keyboardType={keyBoardTypeConst.DEFAULT} />

                        <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.justifyContentCenter]}>
                            <View style={SDGenericStyles.paddingRight60}>
                                <TouchableOpacity activeOpacity={.7} style={userMenuStyles.verifyUserCancelButton}
                                    onPress={() => setProfileMenu({ ...profileMenu, showSubmitVerifyModal: false })}>
                                    <Text style={[SDGenericStyles.colorWhite, SDGenericStyles.centerAlignedText, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.ft16,
                                    SDGenericStyles.colorBlack]}>
                                        {actionButtonTextConstants.CANCEL_POST}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity activeOpacity={.7} style={userMenuStyles.verifyUserSubmitButton}
                                    onPress={handleSubmit(verifyEULA)}>
                                    <Text style={[SDGenericStyles.colorWhite, SDGenericStyles.centerAlignedText, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.ft16,
                                    SDGenericStyles.colorBlack]}>
                                        {actionButtonTextConstants.SUBMIT}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};