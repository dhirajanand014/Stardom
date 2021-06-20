import React from "react";
import { Modal, Text, TouchableOpacity, View, Image } from "react-native";
import { stringConstants, actionButtonTextConstants } from "../../constants/Constants";
import { setErrorModal } from "../../helper/Helper";
import { errorBoundaryStyles, SDGenericStyles } from "../../styles/Styles";

export const ErrorModal = props => {

    const { error, setError } = props;

    return (
        <Modal animationType="slide" transparent visible={error.showModal} onRequestClose={() =>
            setErrorModal(error, setError, stringConstants.EMPTY, stringConstants.EMPTY, false)}>
            <View style={errorBoundaryStyles.errorModalContainer}>
                <View style={errorBoundaryStyles.modalViewStyle}>
                    <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.marginBottom4]}>
                        <Text style={[errorBoundaryStyles.modalTitleTextStyle, SDGenericStyles.fontFamilyRobotoMedium,
                        SDGenericStyles.ft18]}>
                            {error.title}
                        </Text>
                        <View style={errorBoundaryStyles.modalTitleDivider} />
                    </View>
                    <View style={errorBoundaryStyles.modalMessageViewStyle}>
                        <Text style={[errorBoundaryStyles.modalMessageTextStyle, SDGenericStyles.fontFamilyRobotoRegular,
                        SDGenericStyles.ft18]}>{error.message}</Text>
                        <Image source={require(`../../assets/login_error_icon.png`)} style={errorBoundaryStyles.modalErrorImage} />
                    </View>
                    <TouchableOpacity activeOpacity={.3} style={errorBoundaryStyles.modalOKButtonStyle} onPress={() =>
                        setErrorModal(error, setError, stringConstants.EMPTY, stringConstants.EMPTY, false)}>
                        <Text style={[SDGenericStyles.colorWhite, SDGenericStyles.textCenterAlign, SDGenericStyles.ft18]}>
                            {actionButtonTextConstants.OK}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};