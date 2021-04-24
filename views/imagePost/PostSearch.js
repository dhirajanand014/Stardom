import React, { useRef, useState } from 'react'
import { TextInput, Image, TouchableOpacity, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { togglePostSearchBox } from '../../helper/Helper'
import { colorConstants, miscMessage, numericConstants, placeHolderText, stringConstants } from '../../constants/Constants';
import { glancePostStyles } from '../../styles/Styles'
import { PostSearchContent } from './PostSearchContent';

const post_search_input_close = require('../../assets/post_search_input_close_icon.png');
const post_search = require('../../assets/post_search_icon.png');

export function PostSearch(props) {

    const { sdomDatastate, screenWidth, screenHeight, post, viewPagerRef, postDetailsRef } = props;
    const { posts } = sdomDatastate;
    const [searchValues, setSearchValues] = useState({
        searchText: stringConstants.EMPTY,
        searchForPostId: stringConstants.EMPTY
    });

    const inputTextRef = useRef(null);

    const input_search_box_translate_x_shared = useSharedValue(screenWidth * numericConstants.ONE_HUNDRED);
    const content_translate_y_shared = useSharedValue(screenHeight * numericConstants.ONE_HUNDRED);
    const content_opacity_shared = useSharedValue(numericConstants.ZERO * numericConstants.ONE_HUNDRED);

    const translateSearchInputBox = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: input_search_box_translate_x_shared.value
            }]
        }
    })
    return (
        <View>
            <View style={glancePostStyles.glanceTopIcons}>
                <TouchableOpacity onPress={() => togglePostSearchBox(searchValues, setSearchValues, post,
                    input_search_box_translate_x_shared, content_translate_y_shared, content_opacity_shared, screenWidth, screenHeight,
                    true, inputTextRef, viewPagerRef)}>
                    <Image style={glancePostStyles.icon_post_search} source={post_search} />
                </TouchableOpacity>
            </View>
            <React.Fragment>
                <Animated.View style={[glancePostStyles.searchInputBox, translateSearchInputBox, { width: screenWidth - 110 }]}>
                    <TextInput ref={inputTextRef} placeholder={placeHolderText.SEARCH_POSTS} clearButtonMode={miscMessage.ALWAYS}
                        placeholderTextColor={colorConstants.BLACK} textAlignVertical={miscMessage.CENTER} value={searchValues.searchText}
                        onChangeText={(value) => setSearchValues({ ...searchValues, searchText: value })} style={glancePostStyles.search_input_text}>
                    </TextInput>
                    <TouchableOpacity style={glancePostStyles.close_button_search_input} onPress={() => togglePostSearchBox(searchValues, setSearchValues, post,
                        input_search_box_translate_x_shared, content_translate_y_shared, content_opacity_shared, screenWidth, screenWidth, false, inputTextRef, viewPagerRef)}>
                        <Image style={glancePostStyles.search_input_close_input_icon} source={post_search_input_close} />
                    </TouchableOpacity>
                </Animated.View>
                <PostSearchContent postItem={post} screenWidth={screenWidth} searchValues={searchValues}
                    contentOpacity={content_opacity_shared} contentTranslateY={content_translate_y_shared} setSearchValues={setSearchValues}
                    searchValues={searchValues} posts={posts} inputBoxTranslateX={input_search_box_translate_x_shared} screenHeight={screenHeight}
                    inputTextRef={inputTextRef} viewPagerRef={viewPagerRef} postDetailsRef={postDetailsRef} />
            </React.Fragment>
        </View>
    )
}