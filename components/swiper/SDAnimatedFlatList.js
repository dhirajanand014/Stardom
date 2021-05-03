import React from 'react';
import { FlatList, Text, View } from "react-native"
import Animated from 'react-native-reanimated';
import { numericConstants } from "../../constants/Constants"
import { SDRegistrationCategoryRenderer } from "../../screens/category/SDRegistrationCategoryRenderer"
import { glancePostStyles, SDGenericStyles, userAuthStyles } from "../../styles/Styles"

export const SDAnimatedFlatList = props => {
    return (
        <Animated.View style={[userAuthStyles.listingDetailsView, props.translateDetailsView]}>
            <View style={[SDGenericStyles.alignItemsCenter]}>
                <Text style={glancePostStyles.addPostDetailsHeaderTitle}>{props.title}</Text>
                <View style={glancePostStyles.addPostDetailsTitleDivider} />
            </View>
            <FlatList data={props.categories} keyExtractor={(item) => item.categoryId} numColumns={numericConstants.THREE}
                renderItem={({ item, index }) => SDRegistrationCategoryRenderer(item, index, props.categories, props.setCategories)} />
        </Animated.View>
    )
}