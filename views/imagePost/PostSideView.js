import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RegisteredUsersIcon } from '../../components/icons/RegisteredUsersIcon';
import { RegisterUserIcon } from '../../components/icons/RegisterUserIcon';
import { colorConstants, numericConstants } from '../../constants/Constants';
import { SDGenericStyles, drawerStyles } from '../../styles/Styles';

export const PostSideView = (props) => {
    return (
        <View style={SDGenericStyles.fill}>
            <LinearGradient style={{ padding: 16, paddingTop: 48 }} colors={[colorConstants.BLACK, colorConstants.YELLOW]}>
                <TouchableOpacity activeOpacity={.7} style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter,
                drawerStyles.drawerHeaderStyle]}>
                    <RegisterUserIcon width={numericConstants.FORTY_FIVE} height={numericConstants.FORTY_FIVE} />
                </TouchableOpacity>
                <Text style={[SDGenericStyles.ft24, SDGenericStyles.colorWhite, SDGenericStyles.mv8, SDGenericStyles.ftWeight700]}>
                    Profile Name
                </Text>
                <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.alig]}>
                    <Text style={[SDGenericStyles.ft14, SDGenericStyles.marginRight4, SDGenericStyles.colorBlack]}>700 Followers</Text>
                    <RegisteredUsersIcon width={numericConstants.SIXTEEN} height={numericConstants.SIXTEEN} />
                </View>
            </LinearGradient>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        </View>
    );
}
