import React, { useEffect } from 'react';
import { FlatList, View, Text, ScrollView } from "react-native"
import { headerStrings, height, numericConstants } from '../../constants/Constants';
import { fetchCategoryData } from '../../helper/Helper';
import { SDGenericStyles } from '../../styles/Styles';
import { PostCategoryRenderer } from './PostCategoryRenderer';
import Animated from 'react-native-reanimated'

export const SDPostCategorySelector = props => {

    useEffect(() => {
        (async () => {
            const postCategories = await fetchCategoryData();
            props.postDetails.categories = postCategories
            postCategories && props.setPostDetails({ ...props.postDetails });
        })();
    }, [])

    return (
        <View style={[SDGenericStyles.paddingHorizontal20, { maxHeight: height / numericConstants.THREE }]}>
            <Text style={[SDGenericStyles.ft18, SDGenericStyles.placeHolderTextColor, SDGenericStyles.fontFamilyBold, SDGenericStyles.alignItemsStart,
            SDGenericStyles.paddingBottom20]}>
                {headerStrings.SELECT_CATEGORY}
            </Text>
            <Animated.ScrollView horizontal nestedScrollEnabled={true}>
                <FlatList data={props.postDetails.categories} numColumns={numericConstants.THREE}
                    renderItem={({ item, index }) => PostCategoryRenderer(item, index, props.postDetails, props.setPostDetails)}
                    keyExtractor={(item) => item.categoryId} key={numericConstants.THREE} nestedScrollEnabled={true} />
            </Animated.ScrollView>
        </View>
    )
}