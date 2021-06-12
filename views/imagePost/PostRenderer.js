import React from 'react';
import { Text, View, TouchableOpacity } from "react-native";
import FastImage from 'react-native-fast-image';
import Shimmer from 'react-native-shimmer';
import { PlusIcon } from '../../components/icons/PlusIcon';
import { miscMessage, numericConstants } from '../../constants/Constants';
import { flatListItemStyles, glancePostStyles, SDGenericStyles } from '../../styles/Styles';

export const PostRenderer = React.memo(({ item, postCallback }) => {
    return (
        <TouchableOpacity activeOpacity={.7} style={SDGenericStyles.mv5}
            onPress={async () => {
                const action = item.id == numericConstants.MINUS_ONE && item.type == miscMessage.CREATE &&
                    miscMessage.CREATE || miscMessage.UPDATE;
                postCallback(action, item);
            }}>

            <View style={[flatListItemStyles.addPostCardSurface]}>
                {
                    item.id == numericConstants.MINUS_ONE && item.type == miscMessage.CREATE &&
                    <View style={glancePostStyles.addPostView}>
                        <PlusIcon width={numericConstants.ONE_HUNDRED_TWENTY} height={numericConstants.ONE_HUNDRED_TWENTY} />
                    </View> || <FastImage source={{ uri: item.postImage, priority: FastImage.priority.normal }}
                        style={flatListItemStyles.imageBackGround}>
                        <View style={flatListItemStyles.textsView}>
                            <Shimmer direction={miscMessage.RIGHT} duration={numericConstants.FIVE_THOUSAND}>
                                <Text style={flatListItemStyles.textCategoryTitle}>{item.postTitle}</Text>
                            </Shimmer>
                            <Shimmer direction={miscMessage.RIGHT} duration={numericConstants.FIVE_THOUSAND}>
                                <Text style={flatListItemStyles.textCategoryCity}>{item.postType}</Text>
                            </Shimmer>
                        </View>
                    </FastImage>
                }
            </View>
        </TouchableOpacity>
    )
})