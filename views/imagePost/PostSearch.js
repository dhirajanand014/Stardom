import React, { useRef, useState, useContext } from 'react'
import { TextInput, Image, TouchableOpacity, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { onChangeByValueType, togglePostSearchBox } from '../../helper/Helper'
import { keyBoardTypeConst, miscMessage, numericConstants, placeHolderText, screens, stringConstants } from '../../constants/Constants';
import { colors, glancePostStyles } from '../../styles/Styles'
import { PostSearchContent } from './PostSearchContent';
import { useNavigation } from '@react-navigation/native';
import { CategoryContext } from '../../App';

const post_search_input_close = require('../../assets/post_search_input_close_icon.png');
const post_search = require('../../assets/post_search_icon.png');

export function PostSearch(props) {

    const { viewPagerPostsRef } = useContext(CategoryContext);
    const { sdomDatastate, screenWidth, screenHeight, post, viewPagerRef, postDetailsRef } = props;
    const { posts } = sdomDatastate;
    const [searchValues, setSearchValues] = useState({
        searchText: stringConstants.EMPTY,
        searchForPostId: stringConstants.EMPTY,
        posts: posts
    });
    const navigation = useNavigation();
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
                <TouchableOpacity onPress={() => {
                    viewPagerPostsRef.current = viewPagerRef.current;
                    navigation.navigate(screens.POSTS_USERS_SEARCH,
                        { toIndex: numericConstants.ZERO, userPosts: sdomDatastate.posts, postDetailsRef: postDetailsRef });
                }/*togglePostSearchBox(searchValues, setSearchValues, post,
                    input_search_box_translate_x_shared, content_translate_y_shared, content_opacity_shared, screenWidth, screenHeight,
                true, inputTextRef, viewPagerRef)*/}>
                    <Image style={glancePostStyles.icon_post_search} source={post_search} />
                </TouchableOpacity>
            </View>
            <React.Fragment>
                <Animated.View style={[glancePostStyles.searchInputBox, translateSearchInputBox]}>
                    <TextInput ref={inputTextRef} placeholder={placeHolderText.SEARCH_POSTS} clearButtonMode={miscMessage.ALWAYS} selectionColor={colors.SDOM_YELLOW}
                        placeholderTextColor={colors.SDOM_PLACEHOLDER} textAlignVertical={miscMessage.CENTER} value={searchValues.searchText} keyboardType={keyBoardTypeConst.DEFAULT}
                        style={glancePostStyles.search_input_text} onChangeText={value => onChangeByValueType(stringConstants.EMPTY, value, {
                            ...props, state: searchValues, setState: setSearchValues, posts: posts
                        })}>
                    </TextInput>
                    <TouchableOpacity style={glancePostStyles.close_button_search_input} onPress={() => togglePostSearchBox(searchValues, setSearchValues, post,
                        input_search_box_translate_x_shared, content_translate_y_shared, content_opacity_shared, screenWidth, screenWidth, false, inputTextRef, viewPagerRef, posts)}>
                        <Image style={glancePostStyles.search_input_close_input_icon} source={post_search_input_close} />
                    </TouchableOpacity>
                </Animated.View>
                <PostSearchContent postItem={post} screenWidth={screenWidth} searchValues={searchValues} setSearchValues={setSearchValues} posts={posts}
                    contentOpacity={content_opacity_shared} contentTranslateY={content_translate_y_shared} screenHeight={screenHeight} inputTextRef={inputTextRef}
                    inputBoxTranslateX={input_search_box_translate_x_shared} postDetailsRef={postDetailsRef} viewPagerRef={viewPagerRef} />
            </React.Fragment>
        </View>
    )
}