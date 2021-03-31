import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { miscMessage } from '../../constants/Constants';
import { togglePostSearchBox } from '../../helper/Helper'
import { glancePostStyles } from '../../styles/Styles'

export function PostSearchContent(props) {
    const { screenWidth, contentOpacity, contentTranslateY, searchValues, posts, inputBoxTranslateX, screenHeight,
        inputTextRef, viewPagerRef, setSearchValues, postItem, postDetailsRef } = props;

    const translateSearchContent = useAnimatedStyle(() => {
        return {
            transform: [{
                translateY: contentTranslateY.value
            }],
            opacity: contentOpacity.value
        }
    })
    return (
        searchValues !== undefined &&
        <Animated.View style={[glancePostStyles.search_content, translateSearchContent]}>
            <View style={[glancePostStyles.search_content, {
                width: screenWidth - 100
            }]}>
                <View style={glancePostStyles.search_content_view}>
                    <ScrollView keyboardShouldPersistTaps={miscMessage.ALWAYS} bounces={true} decelerationRate="fast" scrollEnabled={true}
                        alwaysBounceVertical={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                        {
                            searchValues !== undefined && searchValues.searchForPostId == postItem.postId && posts && posts
                                .filter((postFilter) => postFilter.postTitle.toLowerCase().includes(searchValues.searchText.toLowerCase()))
                                .map((post) => {
                                    const postIndex = posts.indexOf(post);
                                    return (
                                        <TouchableOpacity key={`0_${post.postId}`} style={glancePostStyles.search_content_post_selection}
                                            onPress={() => {
                                                viewPagerRef.current.scrollBy(postIndex - postDetailsRef?.current?.postIndex);
                                                togglePostSearchBox(searchValues, setSearchValues, postItem, inputBoxTranslateX,
                                                    contentTranslateY, contentOpacity, screenWidth, screenHeight, false,
                                                    inputTextRef, viewPagerRef);
                                                postDetailsRef?.current?.setPostAnimationVisible(false);
                                            }}>
                                            <Text style={glancePostStyles.search_content_post_index}>{postIndex + 1}</Text>
                                            <Text style={glancePostStyles.search_content_post_title}>{` - ${post.postTitle}`}</Text>
                                        </TouchableOpacity>
                                    )
                                }) || <ActivityIndicator style={glancePostStyles.search_content_activity_indicator}
                                    color="#3d3d3d" size={miscMessage.SMALL} />
                        }
                    </ScrollView>
                </View>
            </View>
        </Animated.View>
    )
}