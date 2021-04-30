import React from 'react';
import { Text, TouchableOpacity, View, Modal, ScrollView, ActivityIndicator, Image } from 'react-native';
import { alertTextMessages, miscMessage, modalTextConstants, reportAbuseRequestPayloadKeys } from '../../constants/Constants';
import { setReportAbuseSelectedOption, setReportIdForPost, fetchReportAbuseValues, closeReportAbuseModal } from '../../helper/Helper';
import { glancePostStyles, SDGenericStyles } from '../../styles/Styles';

const post_modal_close_icon = require('../../assets/post_modal_close_icon.png');

export const PostReportAbuseModal = (props) => {
    const { optionsState, setOptionsState } = props;
    const { reportAbuses, selectedReportAbuse } = optionsState;
    return (
        <Modal animationType="fade" transparent={true} visible={optionsState.reportAbuseModal}
            onRequestClose={() => closeReportAbuseModal(optionsState, setOptionsState)}
            onShow={async () => await fetchReportAbuseValues(optionsState, setOptionsState)}>
            <View style={glancePostStyles.modalContainer}>
                <View style={glancePostStyles.radioButtonModalView}>
                    <View style={SDGenericStyles.alignItemsCenter}>
                        <Text style={glancePostStyles.reportAbuseModalTitle}>{modalTextConstants.REPORT_ABUSE_TITLE}</Text>
                        <View style={glancePostStyles.reportAbuseModalTitleDivider}></View>
                    </View>
                    <TouchableOpacity style={glancePostStyles.closeReportAbuseModal}
                        onPress={() => closeReportAbuseModal(optionsState, setOptionsState)}>
                        <Image style={glancePostStyles.icon_modal_close} source={post_modal_close_icon} />
                    </TouchableOpacity>
                    <ScrollView style={{ top: 25 }} persistentScrollbar={true} bounces={true}>
                        {
                            !selectedReportAbuse[reportAbuseRequestPayloadKeys.POST_REPORT_ABUSE_SUBMITTED] &&
                            reportAbuses.length && reportAbuses.map((item, index) => {
                                return (
                                    <View key={`${item.reportId}_${index}`} style={glancePostStyles.reportAbuseModalContainer}>
                                        <Text style={[glancePostStyles.reportAbuseRadioText, SDGenericStyles.fontFamilyRoman]}>{item.reportTitle}</Text>
                                        <TouchableOpacity style={glancePostStyles.reportAbuseRadioCircle}
                                            onPress={() => setReportAbuseSelectedOption(optionsState, setOptionsState, item.reportId)}>
                                            {item.reportId == selectedReportAbuse[reportAbuseRequestPayloadKeys.POST_REPORT_ABUSE_ID] &&
                                                <View style={glancePostStyles.reportAbuseSelectedRb} />}
                                        </TouchableOpacity>
                                    </View>
                                )
                            }) || selectedReportAbuse[reportAbuseRequestPayloadKeys.POST_REPORT_ABUSE_SUBMITTED] &&
                            <Text style={glancePostStyles.reportAbuseAlreadySelected}>{alertTextMessages.POST_REPORT_ABUSED}</Text> ||
                            <ActivityIndicator hidesWhenStopped={reportAbuses.length}
                                style={glancePostStyles.reportAbusesFetchLoading} size={miscMessage.LARGE} color={SDGenericStyles.colorBlack} />
                        }
                    </ScrollView>
                    {
                        Object.keys(selectedReportAbuse).length &&
                        (!selectedReportAbuse[reportAbuseRequestPayloadKeys.POST_REPORT_ABUSE_SUBMITTED] &&
                            <React.Fragment>
                                <TouchableOpacity style={glancePostStyles.cancelReportAbuse} onPress={() =>
                                    closeReportAbuseModal(optionsState, setOptionsState)}>
                                    <Text style={glancePostStyles.reportAbuseCancelText}>{modalTextConstants.CANCEL_BUTTON}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity disabled={optionsState.reportAbuseSubmitDisabled}
                                    style={!selectedReportAbuse[reportAbuseRequestPayloadKeys.POST_REPORT_ABUSE_ID] && glancePostStyles.reportAbuseSubmitButtonDisabled ||
                                        glancePostStyles.reportAbuseSubmitButton}
                                    onPress={async () => setReportIdForPost(optionsState, setOptionsState)} >
                                    <Text style={glancePostStyles.modalHideText}>{modalTextConstants.SUBMIT_BUTTON}</Text>
                                </TouchableOpacity>
                            </React.Fragment>) ||
                        (selectedReportAbuse[reportAbuseRequestPayloadKeys.POST_REPORT_ABUSE_SUBMITTED] &&
                            <TouchableOpacity style={glancePostStyles.reportAbuseSubmitButton}
                                onPress={async () => closeReportAbuseModal(optionsState, setOptionsState)} >
                                <Text style={glancePostStyles.modalHideText}>{modalTextConstants.CLOSE_BUTTON}</Text>
                            </TouchableOpacity>) || <View />
                    }
                </View>
            </View>
        </Modal>
    )
}