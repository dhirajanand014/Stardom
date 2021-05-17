import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SDBottomSheet } from '../../components/bottomsheet/SDBottomSheet';
import { SDProfileBottomTextView } from '../../components/texts/SDProfileBottomTextView';
import { miscMessage, numericConstants, screens, width } from '../../constants/Constants';
import { glancePostStyles, SDGenericStyles } from '../../styles/Styles';

export const SDProfileBottomSheet = props => {
    const renderHeader = () => {
        return (
            <View style={[glancePostStyles.bottomSheetHeader, SDGenericStyles.backgroundColorWhite]}>
                <View style={SDGenericStyles.alignItemsCenter}>
                    <View style={[glancePostStyles.panelHandle, SDGenericStyles.backGroundColorGray]} />
                </View>
            </View>
        )
    }

    const renderContent = () => {
        return (
            <TouchableOpacity activeOpacity={.3} style={[SDGenericStyles.paddingBottom10, SDGenericStyles.backgroundColorWhite,
            { width: width }]} onPress={async () =>
                props.navigation.navigate(screens.PROFILE_POSTS, { profile: props.profile })}>
                <View style={[SDGenericStyles.rowFlexDirection]}>
                    <SDProfileBottomTextView label={miscMessage.FOLLOWERS} count={props.profileDetail.count.followersCount} />
                    <SDProfileBottomTextView label={miscMessage.FOLLOWING} count={props.profileDetail.count.followingCount} />
                    <SDProfileBottomTextView label={miscMessage.WALLS} count={props.profileDetail.count.wallsCount} />
                    <SDProfileBottomTextView label={miscMessage.UPLOADS} count={props.profileDetail.count.uploadCount} />
                    <SDProfileBottomTextView label={miscMessage.DOWNLOADS} count={props.profileDetail.count.downloadCount} />
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <SDBottomSheet refCallback={props.refCallback} snapPoints={props.snapPoints} initialSnap={numericConstants.ZERO}
            callbackMode={props.fall} renderHeader={renderHeader} renderContent={renderContent} onCloseEnd={props.onCloseEnd}
        />
    );
}