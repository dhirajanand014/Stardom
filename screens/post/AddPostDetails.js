import { useNavigation, useRoute } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
    ImageBackground, KeyboardAvoidingView,
    Text, TouchableOpacity, View
} from 'react-native'
import Animated from 'react-native-reanimated'
import {
    fieldControllerName, formRequiredRules, stringConstants,
    height, modalTextConstants, numericConstants,
    width, placeHolderText, keyBoardTypeConst,
    actionButtonTextConstants, miscMessage, jsonConstants, defaultProfilesValue
} from '../../constants/Constants'
import { getAllProfiles } from '../../helper/Helper'
import { glancePostStyles, SDGenericStyles, userAuthStyles } from '../../styles/Styles'
import { SDDropDownView } from '../../views/dropDownView/SDDropDownView'
import { SDImageFormInput } from '../../views/fromInputView/SDImageFormInput'
import { SDPostCategorySelector } from '../../views/imagePost/SDPostCategorySelector'

export const AddPostDetails = () => {

    const [postDetails, setPostDetails] = useState({
        title: stringConstants.EMPTY,
        description: stringConstants.EMPTY,
        showDetailsPanel: false,
        categories: jsonConstants.EMPTY,
        profiles: stringConstants.EMPTY
    });

    const route = useRoute();
    const addPost = route.params?.addPost;

    useEffect(() => {
        (async () => {
            const allProfiles = await getAllProfiles();
            allProfiles && setPostDetails({ ...postDetails, profiles: allProfiles });
        })();
    }, []);

    const { control, formState } = useForm();


    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack]}>
            <View style={glancePostStyles.addPostDetailsStyle, SDGenericStyles.alignItemsCenter}>
                <ImageBackground source={{ uri: addPost.capturedImage }}
                    style={{ width: width, height: height / numericConstants.THREE }} resizeMode={miscMessage.COVER}
                    blurRadius={postDetails.showDetailsPanel && numericConstants.ZERO || numericConstants.TEN} />
                <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.paddingVertical20]}>
                    <Text style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.fontFamilyBold, SDGenericStyles.textColorWhite, SDGenericStyles.ft20,
                    SDGenericStyles.paddingBottom5]}>
                        {modalTextConstants.ADD_POST_DETAILS}</Text>
                    <View style={[glancePostStyles.addPostDetailsTitleDivider, SDGenericStyles.colorWhite]} />
                </View>
                <KeyboardAvoidingView style={[SDGenericStyles.mt20, SDGenericStyles.alignItemsCenter]}>
                    <Animated.ScrollView contentContainerStyle={[SDGenericStyles.alignItemsCenter]}
                        style={{ maxHeight: height / numericConstants.TWO }}>
                        <SDImageFormInput inputName={fieldControllerName.ADD_POST_TITLE} control={control} rules={formRequiredRules.addPostTitleRule}
                            defaultValue={stringConstants.EMPTY} maxLength={numericConstants.TEN} placeHolderText={placeHolderText.ADD_POST_TITLE}
                            keyboardType={keyBoardTypeConst.DEFAULT} formState={formState} isAddPostDetails={true}
                            extraStyles={[SDGenericStyles.textBoxGray, SDGenericStyles.fontFamilyRoman, SDGenericStyles.borderRadius20,
                            SDGenericStyles.textColorWhite, SDGenericStyles.ft16]} />

                        <SDImageFormInput inputName={fieldControllerName.ADD_POST_DESCRIPTION} control={control} rules={formRequiredRules.addPostDescription}
                            defaultValue={stringConstants.EMPTY} maxLength={numericConstants.TEN} placeHolderText={placeHolderText.ADD_POST_DESCRIPTION}
                            keyboardType={keyBoardTypeConst.DEFAULT} formState={formState} isMultiline={true} numberOfLines={numericConstants.TWO}
                            extraStyles={[SDGenericStyles.textBoxGray, SDGenericStyles.fontFamilyRoman, SDGenericStyles.height100,
                            SDGenericStyles.borderRadius20, SDGenericStyles.textColorWhite, SDGenericStyles.ft16]}
                            isAddPostDetails={true} />

                        <SDDropDownView inputName={fieldControllerName.PROFILE} control={control} rules={formRequiredRules.profileRule} selectedLabelStyle={SDGenericStyles.textColorWhite}
                            containerStyle={userAuthStyles.dropDownPickerStyle} dropDownPickerStyle={glancePostStyles.addPostDropDownStyle}
                            defaultValue={stringConstants.EMPTY} formState={formState} list={postDetails.profiles.length && postDetails.profiles.filter(role => role.value != numericConstants.MINUS_ONE) || jsonConstants.EMPTY}
                            dropDownDefaultValue={postDetails.profiles.length && postDetails.profiles.find(role => role.value == numericConstants.ZERO).value || defaultProfilesValue.value} placeHolderText={placeHolderText.SELECT_A_PROFILE}
                            extraStyles={[SDGenericStyles.textBoxGray, SDGenericStyles.paddingVertical10]} globalTextStyle={[SDGenericStyles.fontFamilyRoman, SDGenericStyles.ft16, SDGenericStyles.textColorWhite]} />

                        <SDPostCategorySelector postDetails={postDetails} setPostDetails={setPostDetails} />

                    </Animated.ScrollView>
                    <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter, SDGenericStyles.paddingHorizontal10,
                    glancePostStyles.addPostDetailsBottomButtonStyle]}>
                        <TouchableOpacity activeOpacity={.2} style={glancePostStyles.cancelAddPostButton}>
                            <Text style={[SDGenericStyles.fontFamilyBold, glancePostStyles.addPostButtonText, SDGenericStyles.colorWhite]}>
                                {actionButtonTextConstants.CANCEL_POST}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.2} style={glancePostStyles.addPostButton}>
                            <Text style={[SDGenericStyles.fontFamilyBold, glancePostStyles.addPostButtonText]}>{actionButtonTextConstants.ADD_POST}</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </View>
    )
}