import React from "react";
import { useForm } from "react-hook-form";
import { Modal, Text, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import {
    stringConstants, actionButtonTextConstants, fieldControllerName, formRequiredRules,
    placeHolderText, miscMessage, numericConstants, responseStringData, alertTextMessages,
    errorMessages, requestConstants, keyBoardTypeConst, width
} from "../../constants/Constants";
import { showSnackBar, userPostAction } from "../../helper/Helper";
import { SDGenericStyles, userMenuStyles } from "../../styles/Styles";
import { SDImageFormInput } from "../../views/fromInputView/SDImageFormInput";
import { SDMultiTextInputLengthText } from "../texts/SDMultiTextInputLengthText";

export const UserVerifyModal = props => {
    const { handleSubmit, control, formState, watch } = useForm();

    const verifyInputValue = watch(fieldControllerName.VERIFY_USER);
    const { profileMenu, setProfileMenu, loggedInUser, setLoggedInUser, fetchUpdateLoggedInUserProfile } = props

    return (
        <Modal animationType="slide" transparent visible={profileMenu.showSubmitVerifyModal} onRequestClose={() =>
            setProfileMenu({ ...profileMenu, showSubmitVerifyModal: false })}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={SDGenericStyles.alignItemsCenter}>
                    <View style={[userMenuStyles.userVerifyModalView, SDGenericStyles.alignItemsCenter, SDGenericStyles.textBoxGray]}>

                        <SDMultiTextInputLengthText value={verifyInputValue} maxLength={numericConstants.TWO_HUNDRED} />

                        <SDImageFormInput inputName={fieldControllerName.VERIFY_USER} control={control} rules={formRequiredRules.verifyUserInputRule}
                            defaultValue={stringConstants.EMPTY} placeHolderText={placeHolderText.VERIFY_USER_DETAILS} isFeedbackInput={true}
                            formState={formState} isMultiline={true} autofocus={true} underlineColorAndroid={miscMessage.TRANSPARENT} numberOfLines={numericConstants.TWO}
                            extraStyles={[SDGenericStyles.height150, SDGenericStyles.fontFamilyRoman, SDGenericStyles.ft16, SDGenericStyles.borderRadius5,
                            SDGenericStyles.justifyContentCenter, SDGenericStyles.backGroundColorGray, SDGenericStyles.textColorWhite, userMenuStyles.verifyUserTextHeight,
                            SDGenericStyles.textALignVerticalTop, SDGenericStyles.paddingLeft5]} maxLength={numericConstants.TWO_HUNDRED} keyboardType={keyBoardTypeConst.DEFAULT} />

                        <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.justifyContentSpaceBetween]}>
                            <View>
                                <TouchableOpacity activeOpacity={.2} style={[{ width: width / 2 }, SDGenericStyles.mv10]}
                                    onPress={() => setProfileMenu({ ...profileMenu, showSubmitVerifyModal: false })}>
                                    <Text style={[userMenuStyles.verifyUserCancelText, SDGenericStyles.fontFamilyBold, SDGenericStyles.ft16,
                                    SDGenericStyles.placeHolderTextColor]}>
                                        {actionButtonTextConstants.CANCEL_POST}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity activeOpacity={.7} style={userMenuStyles.verifyUserSubmitButton}
                                    onPress={handleSubmit(async data => {
                                        //setLoader(true);
                                        const verifyResponse = await userPostAction(requestConstants.USER_VERIFY, data, loggedInUser.loginDetails.token);
                                        verifyResponse.message == responseStringData.SUCCESS &&
                                            setTimeout(() => showSnackBar(alertTextMessages.SUBMITTED_FOR_VERIFICATION, true), numericConstants.THREE_HUNDRED);
                                        verifyResponse.message == responseStringData.ERROR &&
                                            setTimeout(() => showSnackBar(errorMessages.COULD_NOT_SUBMIT_VERIFICATION, false), numericConstants.THREE_HUNDRED);
                                        setProfileMenu({ ...profileMenu, showSubmitVerifyModal: false });
                                        await fetchUpdateLoggedInUserProfile(loggedInUser, setLoggedInUser, true);
                                        //setLoader(false);
                                    })}>
                                    <Text style={[SDGenericStyles.colorWhite, SDGenericStyles.centerAlignedText, SDGenericStyles.fontFamilyBold, SDGenericStyles.ft16,
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