import React, { useCallback } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { alertTextMessages, colorConstants, miscMessage, numericConstants } from '../../constants/Constants';
import { togglePostSearchBox } from '../../helper/Helper'
import { glancePostStyles, SDGenericStyles } from '../../styles/Styles'

export const PostSearchContent = (props) => {
    const { screenWidth, contentOpacity, contentTranslateY, searchValues, inputBoxTranslateX, screenHeight,
        inputTextRef, viewPagerRef, setSearchValues, postItem, postDetailsRef, posts } = props;

    const translateSearchContent = useAnimatedStyle(() => {
        return {
            transform: [{
                translateY: contentTranslateY.value
            }],
            opacity: contentOpacity.value
        }
    });

    const loadingComponent = () => {
        return <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter, SDGenericStyles.paddingTop80]}>
            <Text style={[SDGenericStyles.ft14, SDGenericStyles.fontFamilyRoman, SDGenericStyles.placeHolderTextColor,
            SDGenericStyles.textCenterAlign]}>
                {alertTextMessages.NO_POSTS}
            </Text>
        </View>
    }

    const actionCallBack = useCallback((viewPagerRef, postDetailsRef, searchValues, setSearchValues, postItem, inputBoxTranslateX,
        contentTranslateY, contentOpacity, screenWidth, screenHeight, inputTextRef, index, posts) => {
        viewPagerRef.current.scrollBy(index - postDetailsRef?.current?.postIndex);
        togglePostSearchBox(searchValues, setSearchValues, postItem, inputBoxTranslateX,
            contentTranslateY, contentOpacity, screenWidth, screenHeight, false,
            inputTextRef, viewPagerRef, posts);
        postDetailsRef?.current?.setPostAnimationVisible(false);
    });

    const RenderPostSearchContent = props => {
        return <TouchableOpacity style={[glancePostStyles.search_content_post_selection, SDGenericStyles.rowFlexDirection,
        SDGenericStyles.paddingVertical16, SDGenericStyles.alignItemsCenter]}
            onPress={() => {
                props.actionCallBack(props.viewPagerRef, props.postDetailsRef, props.searchValues, props.setSearchValues, props.postItem,
                    props.inputBoxTranslateX, props.contentTranslateY, props.contentOpacity, props.screenWidth, props.screenHeight,
                    props.inputTextRef, props.index, props.posts);
            }}>
            <Text style={glancePostStyles.search_content_post_title}>{props.item.postTitle}</Text>
        </TouchableOpacity>
    }
    return (
        <RenderPostSearch searchValues={searchValues} translateSearchContent={translateSearchContent} screenWidth={screenWidth} postItem={postItem} screenHeight={screenHeight}
            RenderPostSearchContent={RenderPostSearchContent} postDetailsRef={postDetailsRef} actionCallBack={actionCallBack} contentOpacity={contentOpacity}
            viewPagerRef={viewPagerRef} setSearchValues={setSearchValues} inputBoxTranslateX={inputBoxTranslateX} contentTranslateY={contentTranslateY} inputTextRef={inputTextRef}
            loadingComponent={loadingComponent} posts={posts} />
    )
}

const RenderPostSearch = React.memo(({ searchValues, translateSearchContent, screenWidth, postItem, RenderPostSearchContent,
    postDetailsRef, actionCallBack, viewPagerRef, setSearchValues, inputBoxTranslateX, contentTranslateY, contentOpacity,
    screenHeight, inputTextRef, loadingComponent, posts }) => {
    return searchValues !== undefined &&
        <Animated.View style={[glancePostStyles.search_content, translateSearchContent]}>
            <View style={[glancePostStyles.search_content, { width: screenWidth - numericConstants.ONE_HUNDRED }]}>
                <View style={glancePostStyles.search_content_view}>
                    {searchValues !== undefined && searchValues.searchForPostId == postItem.id && searchValues.posts &&
                        <FlatList data={searchValues.posts} keyExtractor={(item) => item.id} renderItem={({ item, index }) => {
                            return <RenderPostSearchContent item={item} index={index} postDetailsRef={postDetailsRef} actionCallBack={actionCallBack}
                                viewPagerRef={viewPagerRef} searchValues={searchValues} setSearchValues={setSearchValues} postItem={postItem} screenWidth={screenWidth}
                                inputBoxTranslateX={inputBoxTranslateX} contentTranslateY={contentTranslateY} contentOpacity={contentOpacity} screenHeight={screenHeight}
                                inputTextRef={inputTextRef} posts={posts} />;
                        }} contentContainerStyle={[SDGenericStyles.padding20]} ItemSeparatorComponent={() => <View style={glancePostStyles.postSearchDivider} />} ListEmptyComponent={loadingComponent} scrollEventThrottle={numericConstants.SIXTEEN} />
                        || <ActivityIndicator style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter,
                        SDGenericStyles.paddingTop100]} color={colorConstants.BLACK} size={miscMessage.SMALL} hidesWhenStopped />}
                    {/* <ScrollView keyboardShouldPersistTaps={miscMessage.ALWAYS} bounces={true} decelerationRate="fast" scrollEnabled={true}
                alwaysBounceVertical={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                {
                    searchValues !== undefined && searchValues.searchForPostId == postItem.id && posts && posts
                        .filter((postFilter) => postFilter.postTitle.toLowerCase().includes(searchValues.searchText.toLowerCase()))
                        .map((post) => {
                            const postIndex = posts.indexOf(post);
                            return (
                                <TouchableOpacity key={`0_${post.id}`} style={[glancePostStyles.search_content_post_selection]}
                                    onPress={() => {
                                        viewPagerRef.current.scrollBy(postIndex - postDetailsRef?.current?.postIndex);
                                        togglePostSearchBox(searchValues, setSearchValues, postItem, inputBoxTranslateX,
                                            contentTranslateY, contentOpacity, screenWidth, screenHeight, false,
                                            inputTextRef, viewPagerRef);
                                        postDetailsRef?.current?.setPostAnimationVisible(false);
                                    }}>
                                    <Text style={glancePostStyles.search_content_post_title}>{post.postTitle}</Text>
                                </TouchableOpacity>
                            )
                        }) || <ActivityIndicator style={glancePostStyles.search_content_activity_indicator}
                            color={colorConstants.BLACK} size={miscMessage.SMALL} />
                }
            </ScrollView> */}
                </View>
            </View>
        </Animated.View>;
});
