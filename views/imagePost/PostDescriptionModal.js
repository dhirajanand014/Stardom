import React from 'react';
import { View, TouchableOpacity, Text, ScrollView, Modal, Image } from 'react-native';
import { miscMessage } from '../../constants/Constants';
import { resetOptionsState, setOptionsStateRadioOptions } from '../../helper/Helper';
import { glancePostStyles, SDGenericStyles } from '../../styles/Styles';

const post_modal_close_icon = require('../../assets/post_modal_close_icon.png');

export const PostDescriptionModal = (props) => {
    const { optionsState, setOptionsState, reportAbuseIcon } = props;
    return (
        <Modal animationType={`fade`} transparent={true} visible={optionsState.descriptionModal}
            onRequestClose={() => resetOptionsState(optionsState, setOptionsState)}>
            <View style={glancePostStyles.modalContainer}>
                <View style={glancePostStyles.modalView}>
                    <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.justifyContentSpaceBetween,
                    SDGenericStyles.width100pct]}>
                        <TouchableOpacity style={glancePostStyles.postReportAbuse} onPress={() =>
                            setOptionsStateRadioOptions(optionsState, setOptionsState)}>
                            <Image style={glancePostStyles.icon_post_report_abuse} source={reportAbuseIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={glancePostStyles.postDescriptionModalButton}
                            onPress={() => resetOptionsState(optionsState, setOptionsState)} >
                            <Image style={glancePostStyles.icon_modal_close} source={post_modal_close_icon} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={[SDGenericStyles.paddingHorizontal30, SDGenericStyles.width100pct, SDGenericStyles.marginBottom15]}
                        persistentScrollbar={true} bounces={true}>
                        <Text style={optionsState.selectedPost &&
                            optionsState.selectedPost.postDescription && glancePostStyles.descriptionText ||
                            glancePostStyles.descriptionTextNACenter}>{optionsState.selectedPost &&
                                optionsState.selectedPost.postDescription || miscMessage.NOT_AVAILABLE}</Text>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}