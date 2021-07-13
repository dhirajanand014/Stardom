import React from 'react'
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { glancePostStyles, SDGenericStyles } from '../../styles/Styles';
import FastImage from 'react-native-fast-image';
import { alertTextMessages, miscMessage, numericConstants } from '../../constants/Constants';
import { categoryHeader } from '../../helper/Helper';

export const PostCategoryRenderer = React.memo(({ item, index, inputName, postCategories, categories,
    setCategories, setValue, setError, formState }) => {
    const { categoryCover } = item;

    const handleCategorySelection = () => {
        const selectedCategory = categories[index];
        const count = categories.filter(category => category.isSelected).length ||
            numericConstants.ZERO;
        const containsId = postCategories.map(categoryId => parseInt(categoryId))
            .some(selectedCategoryId => selectedCategoryId == selectedCategory.categoryId) || false;
        if (count < numericConstants.THREE && !containsId) {
            selectedCategory.isSelected = !selectedCategory.isSelected;
            postCategories.push(selectedCategory.categoryId);
            setValue(inputName, postCategories);
            setCategories(categories);
        } else if (count <= numericConstants.THREE && containsId) {
            selectedCategory.isSelected = !selectedCategory.isSelected;
            const postCats = postCategories.map(categoryId => parseInt(categoryId))
            postCats.splice(postCats.indexOf(selectedCategory.categoryId), numericConstants.ONE);
            setValue(inputName, postCats);
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
                item.isSelected && SDGenericStyles.backgroundColorYellow || SDGenericStyles.textBoxGray]}>
                <View style={SDGenericStyles.rowFlexDirection}>
                    {
                        item.isSelected && <Image style={[glancePostStyles.selectedPostDetailsCategoryImageStyle]}
                            source={require(`../../assets/category_selected.png`)} /> ||
                        <FastImage source={{ uri: categoryCover, priority: FastImage.priority.normal, cache: FastImage.cacheControl.immutable }}
                            style={glancePostStyles.addPostDetailsCategoryImageStyle} />
                    }
                    <View style={[SDGenericStyles.padding12, SDGenericStyles.alignItemsCenter]}>
                        <Text style={[SDGenericStyles.ft12, item.isSelected && SDGenericStyles.textBlackColor || SDGenericStyles.textColorWhite,
                        SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.textCenterAlign]}>
                            {item.categoryTitle}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
});