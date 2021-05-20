import React, { useEffect, useMemo } from "react";
import { Image, Modal, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { alertTextMessages, jsonConstants, miscMessage, numericConstants } from "../../constants/Constants";
import { colors, glancePostStyles, SDGenericStyles } from "../../styles/Styles";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export const SDLoaderView = props => {

    const progressWidth = useSharedValue(numericConstants.ZERO);

    useEffect(() => {
        // Animate progressWidth to the selected progress value
        progressWidth.value = withSpring(props.loader.progressValue);
    }, [props.loader.progressValue, progressWidth]);

    const { backgroundColor, foregroundColor } = useMemo(() => {
        return { backgroundColor: colors.SDOM_PLACEHOLDER, foregroundColor: colors.SDOM_YELLOW };
    }, jsonConstants.EMPTY);

    const progressStyle = useAnimatedStyle(() => {
        'worklet'
        return { width: progressWidth.value, height: numericConstants.FIVE };
    });

    return (
        <Modal animationType={miscMessage.NONE} transparent visible={props.loader.isLoading}>
            <View style={[SDGenericStyles.fill, SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter, , SDGenericStyles.paddingVertical5
            ]} pointerEvents={miscMessage.NONE}>
                <View style={[glancePostStyles.loaderModalView, SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter,
                SDGenericStyles.backgroundColorWhite, SDGenericStyles.paddingHorizontal10]}>
                    <FastImage source={{
                        uri: Image.resolveAssetSource(require(`../../assets/stardom_loader.gif`)).uri,
                        priority: FastImage.priority.normal
                    }} style={{ width: numericConstants.THIRTY, height: numericConstants.THIRTY }} resizeMode={FastImage.resizeMode.contain} />
                    {
                        props.loader.loadingText && <View>
                            <Text style={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRoman, SDGenericStyles.textCenterAlign, SDGenericStyles.paddingTop10,
                            SDGenericStyles.placeHolderTextColor]}>
                                {props.loader.loadingText}
                            </Text>
                        </View> || <View />
                    }
                    {
                        props.loader.loadingText == alertTextMessages.UPDATING_DETAILS || props.loader.loadingText == alertTextMessages.ADDING_NEW_POST
                        || props.loader.loadingText == alertTextMessages.UPDATING_POST_DETAILS &&
                        <View style={[{ width: numericConstants.ONE_HUNDRED, height: numericConstants.FIVE }, { backgroundColor }, SDGenericStyles.marginVertical10]}>
                            <Animated.View style={[progressStyle, { backgroundColor: foregroundColor }]} />
                        </View>
                    }
                </View>
            </View>
        </Modal>
    );
};