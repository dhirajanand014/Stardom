import React from 'react';
import { Text, TouchableOpacity, View, Modal } from 'react-native';
import { actionButtonTextConstants } from '../../constants/Constants';
import { SDGenericStyles, userMenuStyles } from '../../styles/Styles';

export const ConfirmationModal = React.memo(({ state, confirmationMessage, confirmationButtonText, confirmationCallback, resetModal }) => {
    return (
        <Modal animationType="fade" transparent={true} visible={state.showConfirmationModal} onRequestClose={() => resetModal()}>
            <View style={[SDGenericStyles.fill, SDGenericStyles.alignItemsCenter]}>
                <View style={[userMenuStyles.userSelectionOptionModalView, SDGenericStyles.alignItemsCenter, SDGenericStyles.textBoxGray]}>
                    <Text style={[SDGenericStyles.ft20, SDGenericStyles.textCenterAlign, SDGenericStyles.paddingTop16, SDGenericStyles.colorWhite, SDGenericStyles.fontFamilyRobotoMedium]}>
                        {confirmationMessage}
                    </Text>
                    <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.justifyContentCenter, SDGenericStyles.mt5]}>
                        <View style={SDGenericStyles.paddingRight15}>
                            <TouchableOpacity activeOpacity={.7} style={userMenuStyles.userNoButton}
                                onPress={async () => resetModal()}>
                                <Text style={[SDGenericStyles.colorWhite, SDGenericStyles.centerAlignedText, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.ft16, SDGenericStyles.colorBlack]}>
                                    {actionButtonTextConstants.NO.toUpperCase()}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity activeOpacity={.7} style={userMenuStyles.userYesButton} onPress={async () => await confirmationCallback()}>
                                <Text style={[SDGenericStyles.colorWhite, SDGenericStyles.centerAlignedText, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.ft16, SDGenericStyles.colorBlack]}>
                                    {confirmationButtonText.toUpperCase()}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
});