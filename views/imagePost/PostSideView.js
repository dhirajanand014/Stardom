import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import { Text, ScrollView, TouchableOpacity, Linking, ImageBackground, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RegisteredUsersIcon } from '../../components/icons/RegisteredUsersIcon';
import { RegisterUserIcon } from '../../components/icons/RegisterUserIcon';
import { numericConstants } from '../../constants/Constants';
import { SDGenericStyles } from '../../styles/Styles';

export const PostSideView = (props) => {
    return (
        <View style={{ flex: 1 }}>
            <LinearGradient style={{ width: undefined, padding: 16, paddingTop: 48 }} colors={[`#f57795`, `#fa9382`]}>
                <TouchableOpacity activeOpacity={.7} style={{
                    alignItems: 'center',
                    width: 80, height: 88, borderRadius: 40, borderWidth: 3, borderColor: '#fff'
                }}>
                    <RegisterUserIcon />
                </TouchableOpacity>
                <Text style={[SDGenericStyles.ft24, {
                    color: `#fff`, marginVertical: 8, fontWeight: "700"
                }]}>Profile Name
                </Text>
                <View style={{ flexDirection: `row`, alignItems: 'center' }}>
                    <Text style={SDGenericStyles.ft14,
                        { color: `rgba(255, 255, 255, 0.8)`, marginRight: 4, }}>700 Followers</Text>
                    <RegisteredUsersIcon width={numericConstants.SIXTEEN} height={numericConstants.SIXTEEN} />
                </View>
            </LinearGradient>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        </View>
    );
}
