import { useNavigation } from '@react-navigation/core'
import React, { useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { ImageBackground, KeyboardAvoidingView, Text, TouchableOpacity, View } from 'react-native'
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated'
import {
    fieldControllerName, formRequiredRules, stringConstants,
    height, modalTextConstants, numericConstants,
    width, placeHolderText, keyBoardTypeConst, defaultPickerValue, actionButtonTextConstants
} from '../../constants/Constants'
import { toggleAddPostDetailsPanel } from '../../helper/Helper'
import { glancePostStyles, SDGenericStyles, userAuthStyles } from '../../styles/Styles'
import { SDDropDownView } from '../../views/dropDownView/SDDropDownView'
import { SDPostDetailsInput } from '../../views/fromInputView/SDPostDetailsInput'

export const AddPostDetails = props => {

    const { addPost } = props;

    const { handleSubmit, control, formState, clearErrors } = useForm();

    const navigation = useNavigation();

    const dropDownController = useRef(null);

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
                <TouchableOpacity activeOpacity={.2} style={glancePostStyles.addPostDetailsButton}
                    onPress={async () => await toggleAddPostDetailsPanel(add_post_translate_y, content_opacity, dropDownController, actionButtonTextConstants.ADD_DETAILS)}>
                    <Text style={[SDGenericStyles.bold, SDGenericStyles.fontFamilyBold, glancePostStyles.addPostButtonText, SDGenericStyles.ft18]}>
                        {actionButtonTextConstants.ADD_DETAILS}
                    </Text>
                </TouchableOpacity>
            </View>
            <Animated.View style={[glancePostStyles.addPostDetailsView, translatePostDetailsView]}>
                <View style={[SDGenericStyles.alignItemsCenter]}>
                    <Text style={glancePostStyles.addPostDetailsHeaderTitle}>{modalTextConstants.ADD_POST_DETAILS}</Text>
                    <View style={glancePostStyles.addPostDetailsTitleDivider} />
                </View>
                <KeyboardAvoidingView style={SDGenericStyles.mt36}>
                    <SDPostDetailsInput inputName={fieldControllerName.ADD_POST_TITLE} control={control} rules={formRequiredRules.addPostTitleRule}
                        defaultValue={stringConstants.EMPTY} maxLength={numericConstants.TEN} placeHolderText={placeHolderText.ADD_POST_TITLE}
                        keyboardType={keyBoardTypeConst.DEFAULT} formState={formState} isAddPostDetails={true}
                        extraStyles={[SDGenericStyles.backgroundColorYellow, SDGenericStyles.fontFamilyRoman, SDGenericStyles.borderRadius20]} />

                    <SDPostDetailsInput inputName={fieldControllerName.ADD_POST_DESCRIPTION} control={control} rules={formRequiredRules.addPostDescription}
                        defaultValue={stringConstants.EMPTY} maxLength={numericConstants.TEN} placeHolderText={placeHolderText.ADD_POST_DESCRIPTION}
                        keyboardType={keyBoardTypeConst.DEFAULT} formState={formState} isMultiline={true} numberOfLines={numericConstants.TWO}
                        extraStyles={[SDGenericStyles.backgroundColorYellow, SDGenericStyles.fontFamilyRoman, SDGenericStyles.height100,
                        SDGenericStyles.borderRadius20]}
                        isAddPostDetails={true} />

                    <SDDropDownView inputName={fieldControllerName.CATEGORIES} control={control} rules={formRequiredRules.categoryRule} globalTextStyle={SDGenericStyles.fontFamilyRoman}
                        defaultValue={stringConstants.EMPTY} formState={formState} multiple={true} searchable={true} isFromAddPostDetails={true}
                        dropDownDefaultValue={defaultPickerValue.value} placeHolderText={placeHolderText.SELECT_CATEGORIES} extraStyles={SDGenericStyles.backgroundColorYellow}
                        callback={dropDownController} containerStyle={userAuthStyles.dropDownPickerStyle} dropDownPickerStyle={glancePostStyles.addPostDropDownStyle} />

                    <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter, SDGenericStyles.paddingHorizontal10,
                    glancePostStyles.addPostDetailsBottomButtonStyle]}>
                        <TouchableOpacity activeOpacity={.2} style={glancePostStyles.cancelAddPostButton}
                            onPress={async () => await toggleAddPostDetailsPanel(add_post_translate_y, content_opacity, dropDownController, actionButtonTextConstants.CANCEL)}>
                            <Text style={[SDGenericStyles.fontFamilyBold, glancePostStyles.addPostButtonText, SDGenericStyles.colorWhite]}>
                                {actionButtonTextConstants.CANCEL_POST}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.2} style={glancePostStyles.addPostButton}
                            onPress={async () => await toggleAddPostDetailsPanel(add_post_translate_y, content_opacity, dropDownController, actionButtonTextConstants.ADD_POST, navigation)}>
                            <Text style={[SDGenericStyles.fontFamilyBold, glancePostStyles.addPostButtonText]}>{actionButtonTextConstants.ADD_POST}</Text>
                        </TouchableOpacity>
                    </View>

                </KeyboardAvoidingView>
            </Animated.View>
        </View>
    )
}