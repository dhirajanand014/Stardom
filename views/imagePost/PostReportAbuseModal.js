import React from 'react';
import { Text, TouchableOpacity, View, Modal, ScrollView, ActivityIndicator, Image } from 'react-native';
import { alertTextMessages, miscMessage, modalTextConstants, requestConstants } from '../../constants/Constants';
import { setReportAbuseSelectedOption, setReportIdForPost, fetchReportAbuseValues, resetModalState } from '../../helper/Helper';
import { glancePostStyles, SDGenericStyles } from '../../styles/Styles';

const post_modal_close_icon = require('../../assets/post_modal_close_icon.png');

export const PostReportAbuseModal = React.memo(({ postDetailsState, setPostDetailsState }) => {
    const { reportAbuses, selectedReportAbuse } = postDetailsState;
    return (
        <Modal animationType="fade" transparent={true} visible={postDetailsState.reportAbuseModal}
            onRequestClose={() => resetModalState(postDetailsState, setPostDetailsState,
                miscMessage.POST_REPORT_ABUSE_MODAL_NAME)}
            onShow={async () => await fetchReportAbuseValues(postDetailsState, setPostDetailsState)}>
            <View style={glancePostStyles.modalContainer}>
                <View style={glancePostStyles.radioButtonModalView}>
                    <View style={SDGenericStyles.alignItemsCenter}>
                        <Text style={[SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.ft20, SDGenericStyles.padding10]}>
                            {modalTextConstants.REPORT_ABUSE_TITLE}
                        </Text>
                        <View style={glancePostStyles.reportAbuseModalTitleDivider} />
                    </View>
                    <TouchableOpacity style={glancePostStyles.closeReportAbuseModal}
                        onPress={() => resetModalState(postDetailsState, setPostDetailsState, miscMessage.POST_REPORT_ABUSE_MODAL_NAME)}>
                        <Image style={glancePostStyles.icon_modal_close} source={post_modal_close_icon} />
                    </TouchableOpacity>
                    <ScrollView style={{ top: 25 }} persistentScrollbar={true} bounces={true}>
                        {
                            !selectedReportAbuse[requestConstants.POST_REPORT_ABUSE_SUBMITTED] &&
                            reportAbuses.length && reportAbuses.map((item, index) => {
                                return (
                                    <View key={`${item.reportId}_${index}`} style={glancePostStyles.reportAbuseModalContainer}>
                                        <Text style={[SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.paddingHorizontal25]}>{item.reportTitle}</Text>
                                        <TouchableOpacity style={glancePostStyles.reportAbuseRadioCircle}
                                            onPress={() => setReportAbuseSelectedOption(postDetailsState, setPostDetailsState, item.reportId)}>
                                            {item.reportId == selectedReportAbuse[requestConstants.POST_REPORT_ABUSE_ID] &&
                                                <View style={glancePostStyles.reportAbuseSelectedRb} />}
                                        </TouchableOpacity>
                                    </View>
                                )
                            }) || selectedReportAbuse[requestConstants.POST_REPORT_ABUSE_SUBMITTED] &&
                            <Text style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.mb25, SDGenericStyles.justifyContentCenter,
                            SDGenericStyles.padding8, SDGenericStyles.fontFamilyRobotoMedium]}>
                                {alertTextMessages.POST_REPORT_ABUSED}
                            </Text> || <ActivityIndicator hidesWhenStopped={reportAbuses.length}
                                style={glancePostStyles.reportAbusesFetchLoading} size={miscMessage.LARGE} color={SDGenericStyles.colorBlack} />
                        }
                    </ScrollView>
                    {
                        Object.keys(selectedReportAbuse).length &&
                        (!selectedReportAbuse[requestConstants.POST_REPORT_ABUSE_SUBMITTED] &&
                            <React.Fragment>
                                <TouchableOpacity style={glancePostStyles.cancelReportAbuse} onPress={() =>
                                    resetModalState(postDetailsState, setPostDetailsState, miscMessage.POST_REPORT_ABUSE_MODAL_NAME)}>
                                    <Text style={glancePostStyles.reportAbuseCancelText}>{modalTextConstants.CANCEL_BUTTON}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity disabled={postDetailsState.reportAbuseSubmitDisabled}
                                    style={!selectedReportAbuse[requestConstants.POST_REPORT_ABUSE_ID] && glancePostStyles.reportAbuseSubmitButtonDisabled ||
                                        glancePostStyles.reportAbuseSubmitButton}
                                    onPress={async () => setReportIdForPost(postDetailsState, setPostDetailsState)} >
                                    <Text style={glancePostStyles.modalHideText}>{modalTextConstants.SUBMIT_BUTTON}</Text>
                                </TouchableOpacity>
                            </React.Fragment>) ||
                        (selectedReportAbuse[requestConstants.POST_REPORT_ABUSE_SUBMITTED] &&
                            <TouchableOpacity style={glancePostStyles.reportAbuseSubmitButton}
                                onPress={async () => resetModalState(postDetailsState, setPostDetailsState, miscMessage.POST_REPORT_ABUSE_MODAL_NAME)} >
                                <Text style={glancePostStyles.modalHideText}>{modalTextConstants.CLOSE_BUTTON}</Text>
                            </TouchableOpacity>) || <View />
                    }
                </View>
            </View>
        </Modal>
    )
});