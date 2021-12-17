import React, { useState, useEffect, useContext, useCallback } from 'react';
import { FlatList, View, Text, TouchableOpacity, BackHandler, Image } from 'react-native';
import { CategoryContext } from '../../App';
import { categoryViewStyles, SDGenericStyles } from '../../styles/Styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getCategoryButtonType, saveCategoryDetailsToKeyChain } from '../../helper/Helper'
import { CategoryRenderer } from './CategoryRenderer.js';
import { useTourGuideController } from 'rn-tourguide';
import {
    backHandlerConstants, jsonConstants, stringConstants,
    actionButtonTextConstants, numericConstants,
    miscMessage, alertTextMessages, screens, keyChainConstansts
} from '../../constants/Constants';

export const Category = () => {

    const { fetchCategories, initialCategorySelection, loader, setLoaderCallback, loggedInUser } = useContext(CategoryContext);

    const navigation = useNavigation();
    const route = useRoute();

    const { canStart, start, stop } = useTourGuideController();

    const [category, setCategory] = useState({
        categories: jsonConstants.EMPTY,
        initialCategory: stringConstants.EMPTY,
        isSelectAll: false
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

    const toggleSelectAllCallback = useCallback(async (type, index) => {
        if (type == miscMessage.SINGLE_SELECT) {
            category.categories[index].isSelected = !category.categories[index].isSelected;
        } else if (type == miscMessage.SELECT_ALL) {
            category.categories.map((category) => { if (!category.isSelected) category.isSelected = !category.isSelected });
            category.isSelectAll = true;
        } else if (type == miscMessage.UNSELECT_ALL) {
            category.categories.map((category) => category.isSelected = !category.isSelected);
            category.isSelectAll = false;
        }
        const initialCategoryFromStorage = await getCategoryButtonType();
        const initialCategory = ((!initialCategoryFromStorage == stringConstants.EMPTY && initialCategoryFromStorage.password == actionButtonTextConstants.SAVE_BUTTON)
            || category.categories.some((item) => { return true == item.isSelected })) && actionButtonTextConstants.SAVE_BUTTON || actionButtonTextConstants.SKIP_BUTTON;
        setCategory({ ...category, initialCategory: initialCategory });
    })

    useEffect(() => {
        if (canStart) {
            start();
        }
    }, [canStart]);

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack]} pointerEvents={loader.isLoading && miscMessage.NONE || miscMessage.AUTO}>
            <View>
                <View style={SDGenericStyles.padding10}>
                    <View style={[SDGenericStyles.alignItemsStart, SDGenericStyles.justifyItemsStart, SDGenericStyles.paddingStart10]}>
                        {
                            loggedInUser.isLoggedIn && loggedInUser.loginDetails.details && JSON.parse(loggedInUser.loginDetails.details).name &&
                            <Text style={[SDGenericStyles.ft16, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium]}>
                                {miscMessage.HEY} {JSON.parse(loggedInUser.loginDetails.details).name.toUpperCase()}{stringConstants.COMMA}
                            </Text>
                        }
                        <Text style={[SDGenericStyles.ft18, SDGenericStyles.textColorPink, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.paddingTop5]}>
                            {alertTextMessages.WHAT_ARE_YOUR_INTERESTS}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity activeOpacity={.7} onPress={async () => await toggleSelectAllCallback(!category.isSelectAll && miscMessage.SELECT_ALL ||
                    miscMessage.UNSELECT_ALL)}
                    style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.alignSelfEnd, SDGenericStyles.paddingRight10]}>
                    {
                        category.isSelectAll &&
                        <View style={[SDGenericStyles.justifyContentCenter, SDGenericStyles.paddingRight5]}>
                            <Image style={categoryViewStyles.select_all_categories} source={require(`../../assets/category_selected.png`)} />
                        </View>
                    }
                    <Text style={[SDGenericStyles.ft16, SDGenericStyles.textColorPink, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.paddingVertical5]}>
                        {!category.isSelectAll && miscMessage.SELECT_ALL || miscMessage.UNSELECT_ALL}
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList data={category.categories} numColumns={numericConstants.TWO}
                renderItem={({ item, index }) => <CategoryRenderer item={item} index={index} category={category} toggleSelectAllCallback={toggleSelectAllCallback} />}
                keyExtractor={(item) => item.categoryId} />
            {
                category.initialCategory == actionButtonTextConstants.SKIP_BUTTON &&
                <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.positionAbsolute, categoryViewStyles.buttonBottom, SDGenericStyles.bottom18,
                SDGenericStyles.justifyItemsEnd]}>
                    {/* <TourGuideZone zone={numericConstants.THREE} borderRadius={numericConstants.TWENTY}
                        text={alertTextMessages.SKIP_SAVE_CATEGORIES} shape={miscMessage.RECTANGLE}> */}
                    <TouchableOpacity activeOpacity={.7} onPress={async () => {
                        setLoaderCallback(true);
                        await saveCategoryDetailsToKeyChain(keyChainConstansts.SAVE_CATEGORY_BUTTON_TYPE,
                            actionButtonTextConstants.SAVE_BUTTON);
                        navigation.reset({ index: numericConstants.ZERO, routes: [{ name: screens.GLANCE }] });
                        stop();
                        setLoaderCallback(false);
                    }} style={[categoryViewStyles.saveButtonContainer, SDGenericStyles.justifyContentCenter,
                    SDGenericStyles.backgroundColorYellow]}>
                        <Text style={[SDGenericStyles.ft18, SDGenericStyles.textBlackColor, SDGenericStyles.fontFamilyRobotoMedium,
                        SDGenericStyles.textCenterAlign]}>
                            {actionButtonTextConstants.SKIP_BUTTON_TEXT}
                        </Text>
                    </TouchableOpacity>
                    {/* </TourGuideZone> */}
                </View>
            }
            {
                category.initialCategory == actionButtonTextConstants.SAVE_BUTTON &&
                <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.positionAbsolute, categoryViewStyles.buttonBottom, SDGenericStyles.bottom18,
                SDGenericStyles.justifyItemsEnd]}>
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
                        <Text style={[SDGenericStyles.ft18, SDGenericStyles.textBlackColor, SDGenericStyles.fontFamilyRobotoMedium,
                        SDGenericStyles.textCenterAlign]}>
                            {actionButtonTextConstants.SAVE.toUpperCase()}
                        </Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}