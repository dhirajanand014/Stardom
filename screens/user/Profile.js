import React from 'react';
import { Text, View } from "react-native"
import { SDGenericStyles } from "../../styles/Styles"

export const Profile = props => {
    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.alignItemsCenter]}>
            <Text>Profile</Text>
        </View>
    )
}