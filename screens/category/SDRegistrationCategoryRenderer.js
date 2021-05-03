import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native';
import Shimmer from 'react-native-shimmer';
import { flatListItemStyles } from '../../styles/Styles';
import FastImage from 'react-native-fast-image';
import { miscMessage, numericConstants } from '../../constants/Constants';

export const SDRegistrationCategoryRenderer = (item, index, categories, setCategories) => {
    return (
        <TouchableOpacity activeOpacity={.7} style={flatListItemStyles.GridViewContainer}
            onPress={() => {
                categories[index].isSelected = !categories[index].isSelected;
                setCategories({ ...categories });
            }}>
            <View style={flatListItemStyles.cardSurface}>
                <FastImage source={{
                    uri: item.categoryCover, priority: FastImage.priority.normal,
                    cache: FastImage.cacheControl.immutable
                }}
                    style={categories[index].isSelected && flatListItemStyles.checkBoxSelected ||
                        flatListItemStyles.imageBackGround}>
                    <View style={flatListItemStyles.textsView}>
                        <Shimmer direction={miscMessage.RIGHT} duration={numericConstants.FIVE_THOUSAND}>
                            <Text style={flatListItemStyles.textCategoryTitle}>{item.categoryTitle}</Text>
                        </Shimmer>
                        <Shimmer direction={miscMessage.RIGHT} duration={numericConstants.FIVE_THOUSAND}>
                            <Text style={flatListItemStyles.textCategoryCity}>{item.categoryOrigin}</Text>
                        </Shimmer>
                    </View>
                </FastImage>
            </View>
        </TouchableOpacity>
    )
}