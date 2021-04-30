import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ErrorModal } from '../components/modals/ErrorModal';
import { screens, stringConstants } from '../constants/Constants';
import { SDGenericStyles } from '../styles/Styles';

export const SDOMContext = React.createContext();

export const SDUserMenus = props => {


    const navigation = useNavigation();

    const [errorMod, setErrorMod] = useState({
        title: stringConstants.EMPTY,
        message: stringConstants.EMPTY,
        showModal: false
    });

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.alignItemsCenter]}>
            <TouchableOpacity>
                <Text>Glance</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Category</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate(screens.ADD_POST, {
                errorMod: errorMod,
                setErrorMod: setErrorMod
            })}>
                <Text>Posts</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate(screens.LOGIN, {
                errorMod: errorMod,
                setErrorMod: setErrorMod
            })}>
                <Text>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate(screens.REGISTER, {
                errorMod: errorMod,
                setErrorMod: setErrorMod
            })}>
                <Text>Register</Text>
            </TouchableOpacity>
            <ErrorModal error={errorMod} setError={setErrorMod} />
        </View>
    )
}