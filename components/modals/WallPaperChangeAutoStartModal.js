import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View, Modal, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { actionButtonTextConstants, alertTextMessages, height, numericConstants, width } from '../../constants/Constants';
import { enableAutoStartPermission } from '../../helper/Helper';
import { SDGenericStyles, userMenuStyles } from '../../styles/Styles';

export const WallPaperChangeAutoStartModal = React.memo(({ wallPaperChangeSettings, setWallPaperChangeSettings }) => {

    const resetModal = useCallback(() => setWallPaperChangeSettings({ ...wallPaperChangeSettings, otherOEM: false, showAutoStartEnableModal: false }));

    return (
        <Modal animationType="fade" transparent={true} visible={wallPaperChangeSettings.showAutoStartEnableModal} onRequestClose={() => resetModal()}>
            <View style={[SDGenericStyles.fill, SDGenericStyles.alignItemsCenter]}>
                <View style={[!wallPaperChangeSettings.otherOEM && userMenuStyles.autoStartModalView || userMenuStyles.autoBatteryOptimizeModalView, SDGenericStyles.alignItemsCenter,
                SDGenericStyles.textBoxGray]}>
                    <Text style={[SDGenericStyles.ft20, SDGenericStyles.textCenterAlign, SDGenericStyles.paddingTop16, SDGenericStyles.colorWhite, SDGenericStyles.fontFamilyRobotoRegular]}>
                        {
                            wallPaperChangeSettings.otherOEM &&
                            <Text style={SDGenericStyles.ft16}>
                                {alertTextMessages.ENABLE_APP_NO_BATTERY_OPTIMIZATION_1}
                                <Text style={SDGenericStyles.fontFamilyRobotoBold}>{alertTextMessages.ENABLE_APP_NO_BATTERY_OPTIMIZATION_2}</Text>
                                {alertTextMessages.ENABLE_APP_NO_BATTERY_OPTIMIZATION_3}
                                <Text style={SDGenericStyles.fontFamilyRobotoBold}>{alertTextMessages.ENABLE_APP_NO_BATTERY_OPTIMIZATION_4}</Text>
                                {alertTextMessages.ENABLE_APP_NO_BATTERY_OPTIMIZATION_5}
                                <Text style={SDGenericStyles.fontFamilyRobotoBold}>{actionButtonTextConstants.DONE}</Text>
                            </Text>
                        }
                        {
                            !wallPaperChangeSettings.otherOEM && alertTextMessages.ENABLE_AUTOSTART_OPTION
                        }
                    </Text>
                    {
                        wallPaperChangeSettings.otherOEM && <Image style={{ width: width / numericConstants.ONEPTFOURFIVE, height: height / numericConstants.EIGHT }}
                            source={require('../../assets/disable_battery_optimization_image.png')} resizeMode={FastImage.resizeMode.center} />
                    }
                    {
                        !wallPaperChangeSettings.otherOEM && <Image style={{ width: width / numericConstants.ONEPTFOURFIVE, height: height / numericConstants.EIGHT }}
                            source={require('../../assets/auto_start_sample_image.jpg')} resizeMode={FastImage.resizeMode.center} />
                    }
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