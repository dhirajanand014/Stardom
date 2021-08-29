import React, { useContext } from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { numericConstants, screens } from '../../constants/Constants';
import { glancePostStyles } from '../../styles/Styles'
import { useNavigation } from '@react-navigation/native';
import { CategoryContext } from '../../App';

const post_search = require('../../assets/post_search_icon.png');

export function PostSearch(props) {

    const { viewPagerPostsRef } = useContext(CategoryContext);
    const { sdomDatastate, viewPagerRef, postDetailsRef } = props;
    const navigation = useNavigation();

    return (
        <TouchableOpacity activeOpacity={.7} style={glancePostStyles.glanceTopIcons} onPress={() => {
            viewPagerPostsRef.current = viewPagerRef.current;
            navigation.navigate(screens.POSTS_USERS_SEARCH,
                { toIndex: numericConstants.ZERO, userPosts: sdomDatastate.posts, postDetailsRef: postDetailsRef });
        }}>
            <Image style={glancePostStyles.icon_post_search} source={post_search} />
        </TouchableOpacity>
    )
}