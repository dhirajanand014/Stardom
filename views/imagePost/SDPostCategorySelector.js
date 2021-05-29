import React, { } from 'react';
import { FlatList, View, Text } from "react-native"
import {
    alertTextMessages, headerStrings, height,
    numericConstants, stringConstants
} from '../../constants/Constants';
import { SDGenericStyles, userAuthStyles } from '../../styles/Styles';
import { PostCategoryRenderer } from './PostCategoryRenderer';
import Animated from 'react-native-reanimated'

export const SDPostCategorySelector = props => {
    return (
        <View style={[{ maxHeight: height / numericConstants.THREE }]}>
            <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.paddingHorizontal25]}>
                <Text style={[SDGenericStyles.ft18, SDGenericStyles.placeHolderTextColor, SDGenericStyles.fontFamilyBold, SDGenericStyles.alignItemsStart,
                SDGenericStyles.paddingBottom20]}>
                    {headerStrings.SELECT_CATEGORY}
                </Text>
                <Text style={[SDGenericStyles.ft14, SDGenericStyles.placeHolderTextColor, SDGenericStyles.fontFamilyRoman, SDGenericStyles.alignSelfEnd,
                SDGenericStyles.paddingBottom20]}>{stringConstants.SPACE}{alertTextMessages.MAX_THREE_CATEGORIES}</Text>
            </View>
            <Animated.ScrollView horizontal nestedScrollEnabled={true}>
                <FlatList data={props.categories} numColumns={numericConstants.THREE}
                    renderItem={({ item, index }) => PostCategoryRenderer(item, index, props.inputName, props.postCategories, props.categories,
                        props.setCategories, props.setValue, props.setError, props.formState)}
                    keyExtractor={(item) => item.categoryId} key={numericConstants.THREE} nestedScrollEnabled={true} />
            </Animated.ScrollView>
            <Text style={[userAuthStyles.formInputError, SDGenericStyles.fontFamilyBold, SDGenericStyles.mt3]}>{props.formState.errors[props.inputName]?.message}</Text>
        </View>
    )
}