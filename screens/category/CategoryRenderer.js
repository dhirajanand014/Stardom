import React from 'react'
import { TouchableOpacity, View, Text, Image } from 'react-native';
import Shimmer from 'react-native-shimmer';
import { categoryViewStyles, flatListItemStyles, glancePostStyles, SDGenericStyles } from '../../styles/Styles';
import { TourGuideZone } from 'rn-tourguide';
import FastImage from 'react-native-fast-image';
import { actionButtonTextConstants, miscMessage, numericConstants, placeHolderText } from '../../constants/Constants';

export const CategoryRenderer = React.memo(({ item, index, category, toggleSelectAllCallback }) => {
    const { categoryCover } = item;
    return (
        <View style={[SDGenericStyles.fill_half, SDGenericStyles.justifyContentSpaceBetween, SDGenericStyles.paddingStart10]}>
            <TouchableOpacity activeOpacity={.7} onPress={async () => await toggleSelectAllCallback(miscMessage.SINGLE_SELECT, index)}>
                {
                    index == numericConstants.ZERO && category.initialCategory == actionButtonTextConstants.SKIP_BUTTON &&
                    <TourGuideZone zone={numericConstants.ONE} borderRadius={numericConstants.EIGHT} shape={miscMessage.RECTANGLE}
                        style={glancePostStyles.tourGuideStyle} text={placeHolderText.SELECT_A_CATEGORY}>
                        <View style={flatListItemStyles.cardSurface}>
                            <FastImage source={{
                                uri: categoryCover || `https://reactnative.dev/img/tiny_logo.png`,
                                priority: FastImage.priority.normal,
                                cache: FastImage.cacheControl.immutable
                            }}
                                style={category.categories[index].isSelected && flatListItemStyles.checkBoxSelected ||
                                    flatListItemStyles.imageBackGround}>
                                <View style={flatListItemStyles.textsView}>
                                    <Shimmer direction={miscMessage.RIGHT} duration={numericConstants.FIVE_THOUSAND}>
                                        <Text style={[SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.alignItemsCenter,
                                        SDGenericStyles.justifyContentCenter, SDGenericStyles.textColorWhite, SDGenericStyles.ft14]}>
                                            {item.categoryTitle && item.categoryTitle.toUpperCase()}
                                        </Text>
                                    </Shimmer>
                                    <Shimmer direction={miscMessage.RIGHT} duration={numericConstants.FIVE_THOUSAND}>
                                        <Text style={[SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.alignItemsCenter, SDGenericStyles.padding1,
                                        SDGenericStyles.justifyContentCenter, SDGenericStyles.textColorWhite, SDGenericStyles.ft12]}>
                                            {item.categoryOrigin && item.categoryOrigin.toUpperCase()}
                                        </Text>
                                    </Shimmer>
                                </View>
                                {
                                    category.categories[index].isSelected &&
                                    <View style={SDGenericStyles.padding10}>
                                        <Image style={[categoryViewStyles.category_selected_check]} source={require(`../../assets/category_selected.png`)} />
                                    </View>
                                }
                            </FastImage>
                        </View>
                    </TourGuideZone> || <View style={flatListItemStyles.cardSurface}>
                        <FastImage source={{
                            uri: categoryCover || `https://reactnative.dev/img/tiny_logo.png`,
                            priority: FastImage.priority.normal,
                            cache: FastImage.cacheControl.immutable,
                        }}
                            style={category.categories[index].isSelected && flatListItemStyles.checkBoxSelected ||
                                flatListItemStyles.imageBackGround}>
                            <View style={flatListItemStyles.textsView}>
                                <Shimmer direction={miscMessage.RIGHT} duration={numericConstants.FIVE_THOUSAND}>
                                    <Text style={[SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.alignItemsCenter,
                                    SDGenericStyles.justifyContentCenter, SDGenericStyles.textColorWhite, SDGenericStyles.ft14]}>
                                        {item.categoryTitle && item.categoryTitle.toUpperCase()}
                                    </Text>
                                </Shimmer>
                                <Shimmer direction={miscMessage.RIGHT} duration={numericConstants.FIVE_THOUSAND}>
                                    <Text style={[SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.alignItemsCenter, SDGenericStyles.padding1,
                                    SDGenericStyles.justifyContentCenter, SDGenericStyles.textColorWhite, SDGenericStyles.ft12]}>{item.categoryOrigin &&
                                        item.categoryOrigin.toUpperCase()}
                                    </Text>
                                </Shimmer>
                            </View>
                            {
                                category.categories[index].isSelected &&
                                <View style={SDGenericStyles.padding10}>
                                    <Image style={[categoryViewStyles.category_selected_check]} source={require(`../../assets/category_selected.png`)} />
                                </View>
                            }
                        </FastImage>
                    </View>
                }
            </TouchableOpacity>
        </View>
    )
})