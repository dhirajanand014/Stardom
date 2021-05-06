import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native';
import { glancePostStyles, SDGenericStyles } from '../../styles/Styles';
import FastImage from 'react-native-fast-image';
import { alertTextMessages, miscMessage, numericConstants } from '../../constants/Constants';

export const PostCategoryRenderer = (item, index, inputName, postCategories, categories,
    setCategories, setValue, setError, formState) => {
    const { categoryCover } = item;

    const handleCategorySelection = () => {
        const selectedCategory = categories[index];
        const count = categories.filter(category => category.isSelected).length ||
            numericConstants.ZERO;
        const containsId = postCategories.some(selectedCategoryId =>
            selectedCategoryId == selectedCategory.categoryId) || false;
        if (count < numericConstants.THREE && !containsId) {
            selectedCategory.isSelected = !selectedCategory.isSelected;
            postCategories.push(selectedCategory.categoryId);
            setValue(inputName, postCategories);
            setCategories(categories);
        } else if (count <= numericConstants.THREE && containsId) {
            selectedCategory.isSelected = !selectedCategory.isSelected;
            postCategories.splice(postCategories.indexOf(selectedCategory.categoryId),
                numericConstants.ONE);
            setValue(inputName, postCategories);
            setCategories(categories);
            formState.errors[inputName] && setError(inputName, null);
        } else {
            setError(inputName, {
                type: miscMessage.MAX_LENGTH,
                message: alertTextMessages.ONLY_THREE_CATEGORIES
            });
        }
    }

    return (
        <View style={SDGenericStyles.padding5}>
            <TouchableOpacity activeOpacity={.7} onPress={async () => handleCategorySelection()}
                style={[SDGenericStyles.borderRadius20, SDGenericStyles.paddingVertical2, glancePostStyles.addPostCategoriesStyle,
                item.isSelected && SDGenericStyles.backGroundColorGreen || SDGenericStyles.textBoxGray]}>
                <View style={SDGenericStyles.rowFlexDirection}>
                    <FastImage source={{ uri: categoryCover, priority: FastImage.priority.normal, cache: FastImage.cacheControl.immutable }}
                        style={glancePostStyles.addPostDetailsCategoryImageStyle}>
                    </FastImage>
                    <View style={[SDGenericStyles.padding12, SDGenericStyles.alignItemsCenter]}>
                        <Text style={[SDGenericStyles.ft12, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRoman,
                        SDGenericStyles.textCenterAlign]}>
                            {item.categoryTitle}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View >
    )
}