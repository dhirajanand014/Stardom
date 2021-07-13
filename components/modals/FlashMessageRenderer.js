import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import FlashMessage from "react-native-flash-message"
import { CategoryContext } from '../../App';
import * as Progress from 'react-native-progress';
import { alertTextMessages, miscMessage, numericConstants, width } from "../../constants/Constants"
import { SDGenericStyles } from '../../styles/Styles';

export const FlashMessageRenderer = props => {
    const { downloadProgressState } = useContext(CategoryContext);
    return (
        <FlashMessage titleStyle={SDGenericStyles.fontFamilyRobotoRegular} textStyle={SDGenericStyles.fontFamilyRobotoRegular}
            position={miscMessage.TOP} style={SDGenericStyles.paddingTop40} renderCustomContent={() => {
                return downloadProgressState.isDownloading.value && <View style={[SDGenericStyles.alignItemsCenter,
                SDGenericStyles.padding10]}>
                    <Progress.Bar progress={downloadProgressState.progressValue.value * numericConstants.TWO} width={width - numericConstants.SIXTY}
                        height={numericConstants.TEN} indeterminate={downloadProgressState.progressValue.value == numericConstants.ZERO} />
                    <Text style={[SDGenericStyles.textCenterAlign, SDGenericStyles.ft14, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textColorWhite]}>
                        {
                            downloadProgressState.progressValue.value == numericConstants.ONE && alertTextMessages.DOWNLOAD_COMPLETE ||
                            alertTextMessages.DOWNLOADING_IMAGE
                        }
                    </Text>
                </View>
            }} />
    )
}