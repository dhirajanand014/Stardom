import React from 'react';
import FastImage from "react-native-fast-image";
import { Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { LockIcon } from '../../components/icons/LockIcon';
import { actionButtonTextConstants, height, numericConstants } from "../../constants/Constants";
import { colors, glancePostStyles, SDGenericStyles } from "../../styles/Styles";

export const ProfileTopLayout = props => {

    return (
        <View>
            <FastImage source={{ uri: props.profile.profile_image, priority: FastImage.priority.normal }}
                style={{ width: props.width, height: props.height }} resizeMode={FastImage.resizeMode.center} />

            <View style={[SDGenericStyles.justifyItemsStart, { bottom: 250 }]}>
                <View style={SDGenericStyles.paddingLeft5}>
                    <Animated.View style={[SDGenericStyles.alignItemsStart, SDGenericStyles.paddingBottom5]}>
                        <Text style={[SDGenericStyles.ft25, SDGenericStyles.fontFamilyRoman, SDGenericStyles.textCenterAlign,
                        SDGenericStyles.justifyContentCenter]}>{props.profile.name}</Text>
                    </Animated.View>
                    <Animated.View style={[SDGenericStyles.alignItemsStart, SDGenericStyles.paddingVertical10]}>
                        {
                            props.profile.bio && <Text style={[SDGenericStyles.ft25, SDGenericStyles.fontFamilyRoman]}>{props.profile.bio}</Text> ||
                            <TouchableOpacity activeOpacity={.7} style={[SDGenericStyles.paddingHorizontal15, SDGenericStyles.paddingVertical2,
                            SDGenericStyles.alignItemsCenter, glancePostStyles.profileBioTextStyle]}>
                                <Text style={[SDGenericStyles.textCenterAlign, SDGenericStyles.justifyContentCenter,
                                SDGenericStyles.fontFamilyRoman, SDGenericStyles.ft14]}>{actionButtonTextConstants.ADD_BIO}</Text>
                            </TouchableOpacity>
                        }
                    </Animated.View>
                </View>
            </View>
            <View style={[SDGenericStyles.justifyItemsStart, SDGenericStyles.marginRight4, { bottom: 220 }]}>
                <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.justifyContentSpaceBetween, SDGenericStyles.justifyItemsEnd]}>
                    <View style={[SDGenericStyles.paddingHorizontal15, , SDGenericStyles.backgroundColorYellow,
                    SDGenericStyles.alignItemsCenter, glancePostStyles.profileBioTextStyle]}>
                        <TouchableOpacity activeOpacity={.7} style={SDGenericStyles.paddingVertical2} onPress={async () =>
                            props.handleUserAction(props.profileDetail.isFollowing && actionButtonTextConstants.UNFOLLOW || actionButtonTextConstants.FOLLOW)}>
                            <Text style={[SDGenericStyles.textCenterAlign, SDGenericStyles.justifyContentCenter,
                            SDGenericStyles.fontFamilyRoman, SDGenericStyles.ft16]}>
                                {props.profileDetail.isFollowing && actionButtonTextConstants.UNFOLLOW || actionButtonTextConstants.FOLLOW}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {
                        props.profileDetail.isFollowing &&
                        <TouchableOpacity activeOpacity={.7} style={SDGenericStyles.paddingLeft5} onPress={async () => await props.handleUserAction(actionButtonTextConstants.PRIVATE_ACCESS)}>
                            <View style={[SDGenericStyles.textBoxGray, SDGenericStyles.padding5, SDGenericStyles.borderRadius20]}>
                                <LockIcon width={numericConstants.SIXTEEN} height={numericConstants.SIXTEEN} stroke={colors.WHITE} />
                            </View>
                        </TouchableOpacity>
                    }
                </View>
            </View>
            <View style={[SDGenericStyles.backgroundColorWhite, { bottom: 210, height: 70 }]}>
                <TouchableOpacity activeOpacity={.7} style={SDGenericStyles.paddingVertical2} onPress={async () =>
                    props.handleUserAction(props.profileDetail.isFollowing && actionButtonTextConstants.UNFOLLOW || actionButtonTextConstants.FOLLOW)}>
                    <Text style={[SDGenericStyles.textCenterAlign, SDGenericStyles.justifyContentCenter,
                    SDGenericStyles.fontFamilyRoman, SDGenericStyles.ft16]}>
                        {props.profileDetail.isFollowing && actionButtonTextConstants.UNFOLLOW || actionButtonTextConstants.FOLLOW}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}