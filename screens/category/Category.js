import React, { useState, useEffect, useContext } from 'react';
import { FlatList, View, StatusBar, Text, TouchableOpacity, BackHandler, Dimensions } from 'react-native';
import { CategoryContext } from '../../App';
import { categoryViewStyles, SDGenericStyles } from '../../styles/Styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { saveCategoryDetailsToKeyChain } from '../../helper/Helper'
import { CategoryRenderer } from './CategoryRenderer.js';
import { TourGuideZone, useTourGuideController } from 'rn-tourguide';
import {
    backHandlerConstants, jsonConstants, stringConstants,
    actionButtonTextConstants, numericConstants,
    miscMessage, alertTextMessages, screens, keyChainConstansts
} from '../../constants/Constants';

export const Category = props => {

    const { fetchCategories, initialCategorySelection } = useContext(CategoryContext);

    const navigation = useNavigation();
    const route = useRoute();

    const { canStart, start, stop } = useTourGuideController();

    const [category, setCategory] = useState({
        categories: jsonConstants.EMPTY,
        initialCategory: stringConstants.EMPTY
    });

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

    let { height } = Dimensions.get(miscMessage.WINDOW);
    height += StatusBar.currentHeight;

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack]}>
            <FlatList data={category.categories} numColumns={numericConstants.THREE}
                renderItem={({ item, index }) => CategoryRenderer(item, index, category, setCategory, miscMessage.SELECT_CATEGORIES)}
                keyExtractor={(item) => item.categoryId} />
            {
                category.initialCategory == actionButtonTextConstants.SKIP_BUTTON &&
                <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.backGroundColorBlack]}>
                    <TourGuideZone zone={numericConstants.THREE} borderRadius={numericConstants.TWENTY}
                        text={alertTextMessages.SKIP_SAVE_CATEGORIES} shape={miscMessage.RECTANGLE}>
                        <TouchableOpacity activeOpacity={.7} onPress={async () => {
                            await saveCategoryDetailsToKeyChain(keyChainConstansts.SAVE_CATEGORY_BUTTON_TYPE,
                                actionButtonTextConstants.SAVE_BUTTON);
                            navigation.reset({ index: numericConstants, routes: [{ name: screens.GLANCE }], });
                            stop();
                        }} style={[categoryViewStyles.saveButtonContainer, SDGenericStyles.justifyContentCenter,
                        SDGenericStyles.backgroundColorYellow]}>
                            <Text style={[categoryViewStyles.textSave, SDGenericStyles.textCenterAlign]}>
                                {actionButtonTextConstants.SKIP_BUTTON_TEXT}
                            </Text>
                        </TouchableOpacity>
                    </TourGuideZone>
                </View>
            }
            {
                category.initialCategory == actionButtonTextConstants.SAVE_BUTTON &&
                <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.backGroundColorBlack]}>
                    <TouchableOpacity activeOpacity={.7} onPress={async () => {
                        const categoryIds = category.categories.filter(item => item.isSelected).map(selectedCategory => {
                            return {
                                selectedCategoryId: selectedCategory.categoryId,
                                selectedCategoryTitle: selectedCategory.categoryTitle
                            }
                        });
                        const jsonCategoryIds = JSON.stringify(categoryIds);
                        await saveCategoryDetailsToKeyChain(keyChainConstansts.SAVE_CATEGORY_ID, jsonCategoryIds);
                        await saveCategoryDetailsToKeyChain(keyChainConstansts.SAVE_CATEGORY_BUTTON_TYPE,
                            actionButtonTextConstants.SAVE_BUTTON);
                        navigation.reset({ index: numericConstants.ZERO, routes: [{ name: screens.GLANCE }], });
                        stop();
                    }} style={[categoryViewStyles.saveButtonContainer, SDGenericStyles.justifyContentCenter,
                    SDGenericStyles.backgroundColorYellow]}>
                        <Text style={[categoryViewStyles.textSave, SDGenericStyles.textCenterAlign]}>
                            {actionButtonTextConstants.SAVE}
                        </Text>
                    </TouchableOpacity>
                </View>
            }

        </View >
    )
}