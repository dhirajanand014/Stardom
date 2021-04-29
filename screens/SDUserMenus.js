import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { screens } from '../constants/Constants';
import { SDGenericStyles } from '../styles/Styles';

export const SDUserMenus = props => {

    const navigation = useNavigation();

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.alignItemsCenter]}>
            <TouchableOpacity>
                <Text>Glance</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Category</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate(screens.ADD_POST)}>
                <Text>Posts</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate(screens.REGISTER)}>
                <Text>Register</Text>
            </TouchableOpacity>

        </View>
    )
}