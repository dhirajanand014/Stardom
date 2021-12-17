import React from 'react';
import { View, Modal, Image, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { actionButtonTextConstants, height, keyChainConstansts, stringConstants, width } from '../../constants/Constants';
import { saveDetailsToKeyChain } from '../../helper/Helper';
import { glancePostStyles, SDGenericStyles, userMenuStyles } from '../../styles/Styles';

export const AnnouncementModal = React.memo(({ postDetailsState, setPostDetailsState }) => {

    const resetModal = async () => {
        setPostDetailsState({ ...postDetailsState, announcementModal: false, announcement: stringConstants.EMPTY });
        const announcementId = JSON.stringify(postDetailsState.announcement.id);
        await saveDetailsToKeyChain(keyChainConstansts.ANNOUNCEMENT_ID, keyChainConstansts.ANNOUNCEMENT_ID, announcementId);
    }

    return (
        <Modal animationType="fade" transparent={true} visible={postDetailsState.announcementModal} onRequestClose={() => resetModal(postDetailsState, setPostDetailsState)}>
            <View style={[SDGenericStyles.fill, SDGenericStyles.alignItemsCenter]}>
                <View style={[userMenuStyles.announcementModalView, SDGenericStyles.alignItemsCenter, SDGenericStyles.textBoxGray]}>
                    <TouchableOpacity activeOpacity={.7} style={[SDGenericStyles.positionAbsolute, SDGenericStyles.right8, SDGenericStyles.padding8, SDGenericStyles.top6]}
                        onPress={() => resetModal()} >
                        <Image style={[glancePostStyles.icon_modal_close, SDGenericStyles.tintColorWhite]} source={require('../../assets/post_modal_close_icon.png')} />
                    </TouchableOpacity>
                    {
                        postDetailsState.announcement && postDetailsState.announcement.image &&
                        <Image source={{ uri: postDetailsState.announcement.image }} style={{ width: width / 1.35, height: height / 1.35 }}
                            resizeMode={FastImage.resizeMode.center} />
                    }
                    <View style={[SDGenericStyles.bottom15]}>
                        <View>
                            <TouchableOpacity activeOpacity={.7} style={userMenuStyles.userNoButton} onPress={async () => resetModal()}>
                                <Text style={[SDGenericStyles.colorWhite, SDGenericStyles.centerAlignedText, SDGenericStyles.fontFamilyRobotoMedium,
                                SDGenericStyles.ft16, SDGenericStyles.colorBlack]}>
                                    {actionButtonTextConstants.CLOSE.toUpperCase()}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
});