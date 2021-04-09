import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { useForm } from 'react-hook-form'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated'
import {
    fieldControllerName, formRequiredRules, stringConstants,
    height, modalTextConstants, numericConstants,
    width, placeHolderText, keyBoardTypeConst
} from '../../constants/Constants'
import { toggleAddPostDetailsPanel } from '../../helper/Helper'
import { glancePostStyles, SDGenericStyles } from '../../styles/Styles'
import { SDImageFormInput } from '../../views/fromInputView/SDImageFormInput'

export const AddPostDetails = props => {

    const { addPost } = props;

    const { handleSubmit, control, formState, clearErrors } = useForm();

    const navigation = useNavigation();

    const add_post_details_y = useSharedValue(height);
    const add_post_details_opacity = useSharedValue(numericConstants.ZERO);

    const add_post_translate_y = useDerivedValue(() => {
        return add_post_details_y.value * numericConstants.ONE_HUNDRED;
    });

    const content_opacity = useDerivedValue(() => {
        return add_post_details_opacity.value * numericConstants.ONE_HUNDRED;
    })

    const translatePostDetailsView = useAnimatedStyle(() => {
        return {
            transform: [{
                translateY: add_post_translate_y.value
            }],
            opacity: content_opacity.value
        }
    })

    return (
        <View>
            <View>
                <ImageBackground source={{ uri: addPost.capturedImage }}
                    style={{ width: width, height: height }} resizeMode={'cover'} blurRadius={10} />
            </View>
            <View style={glancePostStyles.addPostDetailsButtonView}>
                <TouchableOpacity activeOpacity={.7} style={{
                    padding: 10, backgroundColor: `transparent`,
                    borderRadius: 28, elevation: 5
                }} onPress={() => toggleAddPostDetailsPanel(add_post_translate_y, content_opacity)}>
                    <Text style={[SDGenericStyles.bold, SDGenericStyles.fontFamilyNormal, glancePostStyles.addPostDetailsButtonText]}>{`Details >>`}</Text>
                </TouchableOpacity>
            </View>
            <Animated.View style={[glancePostStyles.addPostDetailsView, translatePostDetailsView]}>
                <View style={[SDGenericStyles.alignItemsCenter]}>
                    <Text style={glancePostStyles.addPostDetailsHeaderTitle}>{modalTextConstants.ADD_POST_DETAILS}</Text>
                    <View style={glancePostStyles.addPostDetailsTitleDivider} />
                </View>
                <View>
                    <SDImageFormInput inputName={fieldControllerName.ADD_POST_TITLE} control={control} rules={formRequiredRules.addPostTitleRule}
                        defaultValue={stringConstants.EMPTY} maxLength={numericConstants.TEN} placeHolderText={placeHolderText.ADD_POST_TITLE}
                        keyboardType={keyBoardTypeConst.DEFAULT} textContentType={keyBoardTypeConst.DEFAULT} formState={formState}
                        style={[SDGenericStyles.colorWhite, SDGenericStyles.ft16]} />

                    <SDImageFormInput inputName={fieldControllerName.ADD_POST_DESCRIPTION} control={control} rules={formRequiredRules.addPostDescription}
                        defaultValue={stringConstants.EMPTY} maxLength={numericConstants.TEN} placeHolderText={placeHolderText.ADD_POST_DESCRIPTION}
                        keyboardType={keyBoardTypeConst.DEFAULT} textContentType={keyBoardTypeConst.DEFAULT} formState={formState}
                        style={[SDGenericStyles.colorWhite, SDGenericStyles.ft16]} />
                </View>
            </Animated.View>
        </View>
    )
}