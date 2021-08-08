
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { actionButtonTextConstants } from '../../constants/Constants';
import { SDGenericStyles, userMenuStyles } from '../../styles/Styles';

export const UserSelectionOptionModal = (props) => {

    return (
        <Modal transparent animationType={`slide`} visible={props.bottomSheetState.showUserOptionModal}>
            <View style={[SDGenericStyles.fill, SDGenericStyles.alignItemsCenter]}>
                <View style={[userMenuStyles.userSelectionOptionModalView, SDGenericStyles.alignItemsCenter, SDGenericStyles.textBoxGray]}>
                    <Text style={[SDGenericStyles.ft20, SDGenericStyles.textCenterAlign, SDGenericStyles.mv15, SDGenericStyles.colorWhite, SDGenericStyles.fontFamilyRobotoMedium]}>
                        {props.textMessage}
                    </Text>
                    <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.justifyContentCenter, SDGenericStyles.mt5]}>
                        <View style={SDGenericStyles.paddingRight60}>
                            <TouchableOpacity activeOpacity={.7} style={userMenuStyles.userNoButton}
                                onPress={async () => props.setBottomSheetState({ ...props.bottomSheetState, showUserOptionModal: false })}>
                                <Text style={[SDGenericStyles.colorWhite, SDGenericStyles.centerAlignedText, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.ft16, SDGenericStyles.colorBlack]}>
                                    {actionButtonTextConstants.NO.toUpperCase()}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity activeOpacity={.7} style={userMenuStyles.userYesButton} onPress={async () => await props.handleSubmit()}>
                                <Text style={[SDGenericStyles.colorWhite, SDGenericStyles.centerAlignedText, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.ft16, SDGenericStyles.colorBlack]}>
                                    {props.successButton.toUpperCase()}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>);
}