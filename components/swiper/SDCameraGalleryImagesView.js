import React from 'react';
import { TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { numericConstants } from '../../constants/Constants';
import { SDGenericStyles } from '../../styles/Styles';

export const SDCameraGalleryImagesView = React.memo(({ item, index, selectImageCallback }) => {
    return (
        <TouchableOpacity key={index} activeOpacity={.7} onPress={async () => await selectImageCallback(item, index)}>
            <FastImage resizeMode={FastImage.resizeMode.center} source={{
                uri: item.image.uri,
                priority: FastImage.priority.normal
            }} style={[{ width: numericConstants.EIGHTY, height: numericConstants.EIGHTY }, SDGenericStyles.borderRadius10,
            SDGenericStyles.backGroundColorBlack, SDGenericStyles.marginRight15]} />
        </TouchableOpacity>
    )
});
