import React, { useState, useEffect, useContext } from 'react';
import { FlatList, View, StatusBar, Text, TouchableOpacity, BackHandler } from 'react-native';
import { CategoryContext } from '../../App';
import { categoryViewStyles } from '../../styles/Styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { saveCategoryButtonType, saveCategoryIdsToStorage } from '../../helper/Helper'
import { CategoryRenderer } from './CategoryRenderer.js';
import { TourGuideZone, useTourGuideController } from 'rn-tourguide';
import {
    backHandlerConstants, jsonConstants, stringConstants,
    height, actionButtonTextConstants, numericConstants,
    miscMessage, alertTextMessages
} from '../../constants/Constants';

export function Category() {

    const { fetchCategories, initialCategorySelection } = useContext(CategoryContext);

    const navigation = useNavigation();
    const route = useRoute();

    const { canStart, start, stop } = useTourGuideController();

    const [category, setCategory] = useState({ categories: jsonConstants.EMPTY, initialCategory: stringConstants.EMPTY });

    useEffect(() => {
        fetchCategories(category, setCategory, initialCategorySelection);
        const backHandler = BackHandler.addEventListener(backHandlerConstants.HARDWAREBACKPRESS, () => {
            if (route.params && route.params.fromIntro) {
                BackHandler.exitApp();
                return true;
            }
            return false;
        });
        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        if (canStart) {
            start();
        }
    }, [canStart]);

    height += StatusBar.currentHeight;

    return (
        <View style={categoryViewStyles.categoryView} >
            <FlatList data={category.categories}
                renderItem={({ item, index }) => CategoryRenderer(item, index, category, setCategory)} numColumns={3}
                keyExtractor={(item) => item.categoryId} />
            {
                category.initialCategory == actionButtonTextConstants.SKIP_BUTTON &&
                <View style={categoryViewStyles.bottomButtonLayout}>
                    <TouchableOpacity activeOpacity={.7} onPress={async () => {
                        await saveCategoryButtonType(actionButtonTextConstants.SAVE_BUTTON);
                        navigation.reset({ index: numericConstants, routes: [{ name: "Glance" }], });
                        stop();
                    }} style={categoryViewStyles.saveButtonContainer}>
                        <TourGuideZone zone={numericConstants.THREE} borderRadius={numericConstants.THIRTY} shape={miscMessage.RECTANGLE}
                            style={categoryViewStyles.skipTourZoneStyle} text={alertTextMessages.SKIP_SAVE_CATEGORIES}>
                            <Text style={categoryViewStyles.textSave}>{actionButtonTextConstants.SKIP_BUTTON_TEXT}</Text>
                        </TourGuideZone>
                    </TouchableOpacity>
                </View>
            }
            {
                category.initialCategory == actionButtonTextConstants.SAVE_BUTTON &&
                <View style={categoryViewStyles.bottomButtonLayout}>
                    <TouchableOpacity activeOpacity={.7} onPress={async () => {
                        const categoryIds = category.categories.filter(item => item.isSelected).map(selectedCategory => {
                            const categoryJson = {
                                selectedCategoryId: selectedCategory.categoryId,
                                selectedCategoryTitle: selectedCategory.categoryTitle
                            }
                            return categoryJson;
                        });
                        const jsonCategoryIds = JSON.stringify(categoryIds);
                        await saveCategoryIdsToStorage(jsonCategoryIds);
                        await saveCategoryButtonType(actionButtonTextConstants.SAVE_BUTTON);
                        navigation.reset({ index: numericConstants.ZERO, routes: [{ name: "Glance" }], });
                        stop();
                    }} style={categoryViewStyles.saveButtonContainer}>
                        <Text style={categoryViewStyles.textSave}>Save</Text>
                    </TouchableOpacity>
                </View>
            }

        </View >
    )
}