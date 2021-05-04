import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native';
import { glancePostStyles, SDGenericStyles } from '../../styles/Styles';
import FastImage from 'react-native-fast-image';

export const PostCategoryRenderer = (item, index, postDetails, setPostDetails) => {
    const { categoryCover } = item;

    return (
        <View style={SDGenericStyles.padding5}>
            <TouchableOpacity activeOpacity={.7} onPress={async () => {
                postDetails.categories[index].isSelected = !postDetails.categories[index].isSelected;
                setPostDetails({ ...postDetails });
            }} style={[SDGenericStyles.borderRadius20, SDGenericStyles.paddingVertical2, glancePostStyles.addPostCategoriesStyle,
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
        </View>
    )
}