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

export const Category = () => {

    const { fetchCategories, initialCategorySelection, loader, setLoaderCallback } = useContext(CategoryContext);

    const navigation = useNavigation();
    const route = useRoute();

    const { canStart, start, stop } = useTourGuideController();

    const [category, setCategory] = useState({
        categories: jsonConstants.EMPTY,
        initialCategory: stringConstants.EMPTY
    });

    useEffect(() => {
        setLoaderCallback(true);
        fetchCategories(category, setCategory, initialCategorySelection);
        setLoaderCallback(false);
        const backHandler = BackHandler.addEventListener(backHandlerConstants.HARDWAREBACKPRESS, () => {
            if (route.params && route.params.fromIntro) {
                BackHandler.exitApp();
                return true;
            }
            return false;
        });
        return () => backHandler.remove();
    }, jsonConstants.EMPTY);

    useEffect(() => {
        if (canStart) {
            start();
        }
    }, [canStart]);

    let { height } = Dimensions.get(miscMessage.WINDOW);
    height += StatusBar.currentHeight;

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack]} pointerEvents={loader && miscMessage.NONE || miscMessage.AUTO}>
            <FlatList data={category.categories} numColumns={numericConstants.THREE}
                renderItem={({ item, index }) => CategoryRenderer(item, index, category, setCategory, miscMessage.SELECT_CATEGORIES)}
                keyExtractor={(item) => item.categoryId} />
            {
                category.initialCategory == actionButtonTextConstants.SKIP_BUTTON &&
                <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.backGroundColorBlack, SDGenericStyles.paddingVertical10]}>
                    <TourGuideZone zone={numericConstants.THREE} borderRadius={numericConstants.TWENTY}
                        text={alertTextMessages.SKIP_SAVE_CATEGORIES} shape={miscMessage.RECTANGLE}>
                        <TouchableOpacity activeOpacity={.7} onPress={async () => {
                            setLoaderCallback(true);
                            await saveCategoryDetailsToKeyChain(keyChainConstansts.SAVE_CATEGORY_BUTTON_TYPE,
                                actionButtonTextConstants.SAVE_BUTTON);
                            navigation.reset({ index: numericConstants.ZERO, routes: [{ name: screens.GLANCE }] });
                            stop();
                            setLoaderCallback(false);
                        }} style={[categoryViewStyles.saveButtonContainer, SDGenericStyles.justifyContentCenter,
                        SDGenericStyles.backgroundColorYellow]}>
                            <Text style={[SDGenericStyles.ft18, SDGenericStyles.textBlackColor, SDGenericStyles.fontFamilyBold,
                            SDGenericStyles.textCenterAlign]}>
                                {actionButtonTextConstants.SKIP_BUTTON_TEXT}
                            </Text>
                        </TouchableOpacity>
                    </TourGuideZone>
                </View>
            }
            {
                category.initialCategory == actionButtonTextConstants.SAVE_BUTTON &&
                <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.backGroundColorBlack, SDGenericStyles.paddingVertical10]}>
                    <TouchableOpacity activeOpacity={.7} onPress={async () => {
                        setLoaderCallback(true);
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
                        setLoaderCallback(false);
                    }} style={[categoryViewStyles.saveButtonContainer, SDGenericStyles.justifyContentCenter,
                    SDGenericStyles.backgroundColorYellow]}>
                        <Text style={[SDGenericStyles.ft18, SDGenericStyles.textBlackColor, SDGenericStyles.fontFamilyBold,
                        SDGenericStyles.textCenterAlign]}>
                            {actionButtonTextConstants.SAVE}
                        </Text>
                    </TouchableOpacity>
                </View>
            }

        </View >
    )
}