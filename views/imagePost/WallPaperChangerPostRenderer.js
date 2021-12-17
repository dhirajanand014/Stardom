import React from 'react';
import { View, TouchableOpacity } from "react-native";
import FastImage from 'react-native-fast-image';
import { DeleteIcon } from '../../components/icons/DeleteIcon';
import { numericConstants } from '../../constants/Constants';
import { colors, flatListItemStyles, SDGenericStyles } from '../../styles/Styles';

export const WallPaperChangerPostRenderer = React.memo(({ item, postCallback }) => {
    return (
        <TouchableOpacity activeOpacity={.7} style={SDGenericStyles.mv5} onPress={async () => postCallback(item)}>
            <View style={[flatListItemStyles.addPostCardSurface]}>
                <FastImage source={{ uri: item.postWallPaperURL, priority: FastImage.priority.high, cache: FastImage.cacheControl.immutable }}
                    style={flatListItemStyles.imageBackGround}>
                    <View style={[SDGenericStyles.padding1, SDGenericStyles.alignItemsEnd]}>
                        <DeleteIcon height={numericConstants.TWENTY_FOUR} width={numericConstants.TWENTY_FOUR} stroke={colors.RED} />
                    </View>
                </FastImage>
            </View>
        </TouchableOpacity>
    )
})