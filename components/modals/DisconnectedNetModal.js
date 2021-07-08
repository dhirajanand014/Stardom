
import React from 'react';
import { Image, Modal, Text, View } from 'react-native';
import { errorBoundaryStyles, SDGenericStyles } from '../../styles/Styles';
import { miscMessage } from '../../constants/Constants';
import FastImage from 'react-native-fast-image';

export const DisconnectedNetModal = (props) => {
    return (
        <Modal animationType={`slide`} visible={!props.isConnected}>
            <View style={[errorBoundaryStyles.container, SDGenericStyles.justifyContentCenter]}>
                <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.paddingHorizontal10]}>
                    <View animation={`fadeIn`} iterationCount={miscMessage.INFINITE}
                        style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.mv15]}>
                        <Image resizeMode={FastImage.resizeMode.contain} style={errorBoundaryStyles.errorImageStyle}
                            source={require(`../../assets/error_warning_image.png`)} />
                    </View>
                    <Text style={[SDGenericStyles.ft24, SDGenericStyles.textCenterAlign, SDGenericStyles.mv15,
                    SDGenericStyles.fontFamilyRobotoMedium]}>
                        {miscMessage.CHECK_CONNECTION_DETAILS}
                    </Text>
                </View>
            </View>
        </Modal>);
}