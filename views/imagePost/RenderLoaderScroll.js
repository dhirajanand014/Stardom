
import React from 'react';
import { Image, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { height, numericConstants, width } from '../../constants/Constants';
import { SDGenericStyles } from '../../styles/Styles';
export const RenderLoaderScroll = props => {
    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.positionAbsolute, SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter,
        SDGenericStyles.loaderCentre]}>
            <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter, SDGenericStyles.backGroundAppBlack,
            SDGenericStyles.paddingHorizontal10, { width: width, height: height }]}>
                <FastImage source={{
                    uri: Image.resolveAssetSource(require(`../../assets/stardom_loader.gif`)).uri,
                    priority: FastImage.priority.normal
                }} style={{ width: numericConstants.ONE_HUNDRED, height: numericConstants.ONE_HUNDRED }} resizeMode={FastImage.resizeMode.contain} />
            </View>
        </View>
    );
}

