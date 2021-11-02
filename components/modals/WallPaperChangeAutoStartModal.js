import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View, Modal, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { actionButtonTextConstants, alertTextMessages, height, numericConstants, width } from '../../constants/Constants';
import { enableAutoStartPermission } from '../../helper/Helper';
import { SDGenericStyles, userMenuStyles } from '../../styles/Styles';

export const WallPaperChangeAutoStartModal = React.memo(({ wallPaperChangeSettings, setWallPaperChangeSettings }) => {

    const resetModal = useCallback(() => setWallPaperChangeSettings({ ...wallPaperChangeSettings, showAutoStartEnableModal: false }));

    return (
        <Modal animationType="fade" transparent={true} visible={wallPaperChangeSettings.showAutoStartEnableModal} onRequestClose={() => resetModal()}>
            <View style={[SDGenericStyles.fill, SDGenericStyles.alignItemsCenter]}>
                <View style={[userMenuStyles.autoStartModalView, SDGenericStyles.alignItemsCenter, SDGenericStyles.textBoxGray]}>
                    <Text style={[SDGenericStyles.ft20, SDGenericStyles.textCenterAlign, SDGenericStyles.paddingTop16, SDGenericStyles.colorWhite, SDGenericStyles.fontFamilyRobotoMedium]}>
                        {alertTextMessages.ENABLE_AUTOSTART_OPTION}
                    </Text>
                    <Image style={{ width: width / numericConstants.ONEPTFOURFIVE, height: height / numericConstants.EIGHT }} source={require('../../assets/auto_start_sample.jpg')} resizeMode={FastImage.resizeMode.center} />
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
                            <TouchableOpacity activeOpacity={.7} style={userMenuStyles.userRemoveButton} onPress={async () => await enableAutoStartPermission(resetModal)}>
                                <Text style={[SDGenericStyles.colorWhite, SDGenericStyles.centerAlignedText, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.ft16, SDGenericStyles.colorBlack]}>
                                    {actionButtonTextConstants.ENABLE.toUpperCase()}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
});