import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native';
import Shimmer from 'react-native-shimmer';
import { stringConstants } from '../constants/Constants';
import { getCategoryButtonType } from '../../helper/Helper';
import { flatListItemStyles, glancePostStyles } from '../../styles/Styles';
import { TourGuideZone } from 'rn-tourguide';
import FastImage from 'react-native-fast-image';
import { actionButtonTextConstants, miscMessage, numericConstants, placeHolderText } from '../../constants/Constants';

export const CategoryRenderer = (item, index, category, setCategory) => {
    const { categoryCover } = item;
    return (
        <TouchableOpacity activeOpacity={.7} style={flatListItemStyles.GridViewContainer}
            onPress={async () => {
                category.categories[index].isSelected = !category.categories[index].isSelected;
                const initialCategoryFromStorage = await getCategoryButtonType();
                const initialCategory = ((!initialCategoryFromStorage == stringConstants.EMPTY && initialCategoryFromStorage == actionButtonTextConstants.SAVE_BUTTON)
                    || category.categories.some((item) => { return true == item.isSelected })) && actionButtonTextConstants.SAVE_BUTTON || actionButtonTextConstants.SKIP_BUTTON;
                setCategory({ ...category, initialCategory: initialCategory });
            }}>
            {
                index == numericConstants.ZERO && category.initialCategory == actionButtonTextConstants.SKIP_BUTTON &&
                <TourGuideZone zone={numericConstants.ONE} borderRadius={numericConstants.EIGHT} shape={miscMessage.RECTANGLE}
                    style={glancePostStyles.tourGuideStyle} text={placeHolderText.SELECT_A_CATEGORY}>
                    <View style={flatListItemStyles.cardSurface}>
                        <FastImage source={{
                            uri: categoryCover,
                            priority: FastImage.priority.normal,
                            cache: FastImage.cacheControl.immutable
                        }}
                            style={category.categories[index].isSelected && flatListItemStyles.checkBoxSelected ||
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
                </TourGuideZone> || <View style={flatListItemStyles.cardSurface}>
                    <FastImage source={{
                        uri: categoryCover,
                        priority: FastImage.priority.normal,
                        cache: FastImage.cacheControl.immutable,
                    }}
                        style={category.categories[index].isSelected && flatListItemStyles.checkBoxSelected ||
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
            }
        </TouchableOpacity>
    )
}