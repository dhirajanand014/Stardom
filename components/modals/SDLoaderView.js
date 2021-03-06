import React, { useEffect, useMemo } from "react";
import { Image, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { alertTextMessages, height, jsonConstants, miscMessage, numericConstants, width } from "../../constants/Constants";
import { colors, SDGenericStyles } from "../../styles/Styles";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { SDLoaderLogo } from "../../views/absoluteView/SDLoaderLogo";

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
        props.loader.isLoading &&
        <View style={[SDGenericStyles.fill, SDGenericStyles.positionAbsolute, SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter,
        SDGenericStyles.loaderCentre]}
            pointerEvents={miscMessage.NONE}>
            <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter, SDGenericStyles.backGroundAppBlack,
            SDGenericStyles.paddingHorizontal10, { width: width, height: height }]}>
                <FastImage source={{
                    uri: Image.resolveAssetSource(require(`../../assets/stardom_loader.gif`)).uri,
                    priority: FastImage.priority.normal
                }} style={{ width: numericConstants.ONE_HUNDRED, height: numericConstants.ONE_HUNDRED }} resizeMode={FastImage.resizeMode.contain} />
                {
                    props.loader.loadingText && <View>
                        <Text style={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textCenterAlign, SDGenericStyles.paddingTop10,
                        SDGenericStyles.placeHolderTextColor]}>
                            {props.loader.loadingText}
                        </Text>
                    </View> || <View />
                }
                {
                    props.loader.loadingText == alertTextMessages.UPDATING_DETAILS || props.loader.loadingText == alertTextMessages.ADDING_NEW_POST
                    || props.loader.loadingText == alertTextMessages.UPDATING_POST_DETAILS || props.loader.loadingText == alertTextMessages.DOWNLOADING_IMAGE &&
                    <View style={[{ width: numericConstants.ONE_HUNDRED, height: numericConstants.FIVE }, { backgroundColor }, SDGenericStyles.marginVertical10]}>
                        <Animated.View style={[progressStyle, { backgroundColor: foregroundColor }]} />
                    </View>
                }
            </View>
            <SDLoaderLogo />
        </View>
    );
};