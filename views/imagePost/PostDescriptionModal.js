import moment from 'moment';
import React from 'react';
import { View, TouchableOpacity, Text, ScrollView, Modal, Image } from 'react-native';
import { miscMessage } from '../../constants/Constants';
import { resetModalState, setPostDetailsStateForModal } from '../../helper/Helper';
import { glancePostStyles, SDGenericStyles } from '../../styles/Styles';

const post_modal_close_icon = require('../../assets/post_modal_close_icon.png');
const reportAbuseIcon = require('../../assets/post_report_abuse_icon.png');

export const PostDescriptionModal = React.memo(({ postDetailsState, setPostDetailsState }) => {

    return (
        <Modal animationType={`fade`} transparent={true} visible={postDetailsState.descriptionModal}
            onRequestClose={() => resetModalState(postDetailsState, setPostDetailsState,
                miscMessage.POST_DESCRIPTION_MODAL_NAME)}>
            <View style={glancePostStyles.modalContainer}>
                <View style={glancePostStyles.modalView}>
                    <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.justifyContentSpaceBetween,
                    SDGenericStyles.width100pct]}>
                        {/* <TouchableOpacity style={glancePostStyles.postReportAbuse} onPress={() =>
                            setPostDetailsStateForModal(postDetailsState, setPostDetailsState, miscMessage.POST_REPORT_ABUSE_MODAL_NAME)}>
                            <Image style={glancePostStyles.icon_post_report_abuse} source={reportAbuseIcon} />
                        </TouchableOpacity> */}
                        {
                            postDetailsState.currentPost.postTitle &&
                            <View style={[SDGenericStyles.padding20, SDGenericStyles.paddingHorizontal30]}>
                                <Text style={[SDGenericStyles.ft18, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.colorBlack]}>
                                    {postDetailsState.currentPost.postTitle.toUpperCase()}
                                </Text>
                                <Text style={[SDGenericStyles.ft12, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.placeHolderTextColor]}>
                                    {moment(postDetailsState.currentPost.created_at).format(miscMessage.POST_DESCRIPTION_DATE_FORMAT)}
                                </Text>
                                <View style={SDGenericStyles.paddingTop5}>
                                    <View style={[glancePostStyles.reportAbuseModalTitleDivider, SDGenericStyles.backGroundColorBlack]} />
                                </View>
                            </View>
                        }
                        <TouchableOpacity style={glancePostStyles.postDescriptionModalButton}
                            onPress={() => resetModalState(postDetailsState, setPostDetailsState, miscMessage.POST_DESCRIPTION_MODAL_NAME)} >
                            <Image style={glancePostStyles.icon_modal_close} source={post_modal_close_icon} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={[SDGenericStyles.paddingHorizontal30, SDGenericStyles.width100pct, SDGenericStyles.marginBottom15]}
                        persistentScrollbar={true} bounces={true}>
                        <Text style={postDetailsState.currentPost &&
                            postDetailsState.currentPost.postDescription && glancePostStyles.descriptionText ||
                            glancePostStyles.descriptionTextNACenter}>{postDetailsState.currentPost &&
                                postDetailsState.currentPost.postDescription || miscMessage.NOT_AVAILABLE}</Text>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
});