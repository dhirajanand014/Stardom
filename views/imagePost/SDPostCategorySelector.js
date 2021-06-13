import React, { } from 'react';
import { FlatList, View, Text } from "react-native"
import { alertTextMessages, headerStrings, height, numericConstants } from '../../constants/Constants';
import { SDGenericStyles, userAuthStyles } from '../../styles/Styles';
import { PostCategoryRenderer } from './PostCategoryRenderer';
import Animated from 'react-native-reanimated'

export const SDPostCategorySelector = props => {
    return (
        <View style={[{ maxHeight: height / numericConstants.ONEPTONE }, SDGenericStyles.alignItemsCenter]}>
            <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.paddingTop40]}>
                <Text style={[SDGenericStyles.ft20, SDGenericStyles.textColorWhite, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.alignItemsStart,
                SDGenericStyles.paddingBottom5]}>
                    {headerStrings.SELECT_CATEGORY}
                </Text>
                <Text style={[SDGenericStyles.ft14, SDGenericStyles.placeHolderTextColor, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.paddingBottom30]}>
                    {alertTextMessages.MAX_THREE_CATEGORIES_1}
                    <Text style={SDGenericStyles.fontFamilyRobotoBold}>{alertTextMessages.MAX_THREE_CATEGORIES_2}</Text>
                    {alertTextMessages.MAX_THREE_CATEGORIES_3}
                </Text>
            </View>
            <Animated.ScrollView horizontal nestedScrollEnabled={true}>
                <FlatList data={props.categories} numColumns={numericConstants.THREE}
                    renderItem={({ item, index }) => <PostCategoryRenderer item={item} index={index} inputName={props.inputName} postCategories={props.postCategories}
                        categories={props.categories} setCategories={props.setCategories} setValue={props.setValue} setError={props.setError} formState={props.formState} />}
                    keyExtractor={(item) => item.categoryId} key={numericConstants.THREE} nestedScrollEnabled={true}
                    ListFooterComponent={<Text style={[SDGenericStyles.ft16, userAuthStyles.formInputError, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.mt5]}>{props.formState.errors[props.inputName]?.message}</Text>} />
            </Animated.ScrollView>
        </View>
    )
}