import React from 'react';
import { Text, TouchableOpacity, View, Modal, NativeModules } from 'react-native';
import { actionButtonTextConstants, alertTextMessages, miscMessage, stringConstants } from '../../constants/Constants';
import { addWallPaperStartdomApi, fetchReportAbuseValues, resetModalState } from '../../helper/Helper';
import { SDGenericStyles, userMenuStyles } from '../../styles/Styles';

export const WallPaperAddRemoveListModal = React.memo(({ postDetailsState, setPostDetailsState }) => {
    const { postAddWallPaperListModal, postRemoveWallPaperListModal, currentPost } = postDetailsState;

    const resetModal = () => {
        postAddWallPaperListModal && resetModalState(postDetailsState, setPostDetailsState, miscMessage.POST_ADD_WALLPAPER_MODAL_NAME);
        postRemoveWallPaperListModal && resetModalState(postDetailsState, setPostDetailsState, miscMessage.POST_REMOVE_WALLPAPER_MODAL_NAME);
    }

    return (
        <Modal animationType="fade" transparent={true} visible={postAddWallPaperListModal || postRemoveWallPaperListModal}
            onRequestClose={() => resetModal(postDetailsState, setPostDetailsState)} onShow={async () => await fetchReportAbuseValues(postDetailsState, setPostDetailsState)}>
            <View style={[SDGenericStyles.fill, SDGenericStyles.alignItemsCenter]}>
                <View style={[userMenuStyles.userSelectionOptionModalView, SDGenericStyles.alignItemsCenter, SDGenericStyles.textBoxGray]}>
                    <Text style={[SDGenericStyles.ft20, SDGenericStyles.textCenterAlign, SDGenericStyles.mv15, SDGenericStyles.colorWhite, SDGenericStyles.fontFamilyRobotoMedium]}>
                        {
                            postAddWallPaperListModal && `${alertTextMessages.DO_YOU_WANT_TO_ADD}${stringConstants.SPACE}${currentPost.postTitle}${stringConstants.SPACE}${alertTextMessages.TO_WALLPAPER_LIST}`
                        }
                        {
                            postRemoveWallPaperListModal && `${alertTextMessages.DO_YOU_WANT_TO_REMOVE}${stringConstants.SPACE}${currentPost.postTitle}${stringConstants.SPACE}${alertTextMessages.FROM_WALLPAPER_LIST}`
                        }
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
                            <TouchableOpacity activeOpacity={.7} style={postAddWallPaperListModal && userMenuStyles.userYesButton || userMenuStyles.userRemoveButton}
                                onPress={async () => {
                                    await addWallPaperStartdomApi(postAddWallPaperListModal && miscMessage.ADD_WALLPAPER || miscMessage.REMOVE_WALLPAPER, currentPost);
                                    resetModal();
                                }}>
                                <Text style={[SDGenericStyles.colorWhite, SDGenericStyles.centerAlignedText, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.ft16, SDGenericStyles.colorBlack]}>
                                    {postAddWallPaperListModal && actionButtonTextConstants.ADD.toUpperCase() || actionButtonTextConstants.REMOVE.toUpperCase()}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
});