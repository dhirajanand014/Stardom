import React from 'react';
import { KeyboardAvoidingView, Text, TouchableOpacity, View } from 'react-native';
import { SDGenericStyles, userAuthStyles } from '../../styles/Styles';
import { SDFormInput } from '../../components/input/SDFormInput';
import { actionButtonTextConstants } from '../../constants/Constants';
export const SDImageFormInput = props => {

    return (
        <KeyboardAvoidingView messagestyle={userAuthStyles.signInUserInputView}>
            <View style={[userAuthStyles.userInput, !props.isFeedbackInput && SDGenericStyles.marginVertical2, !props.isFeedbackInput && SDGenericStyles.paddingStart10,
            !props.isFeedbackInput && SDGenericStyles.paddingEnd10, props.formState.errors[props.inputName]?.message && userAuthStyles.errorInputBorder ||
            userAuthStyles.normalInputBorder, props.isUserId && props.isUserIdAvailable?.current && userAuthStyles.noErrorInputBorder]}>
                <SDFormInput {...props} />
                {props.icon && props.icon}
            </View>
            {
                props.isUserId &&
                <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.mv5]}>
                    {
                        props.isUserIdAvailable.current &&
                        <View style={[SDGenericStyles.fill, SDGenericStyles.alignItemsStart]}>
                            <Text style={[userAuthStyles.formInputNoError, SDGenericStyles.fontFamilyBold]}>{`User id ${props.userIdValue} is available`}</Text>
                        </View> || <View style={[SDGenericStyles.fill, SDGenericStyles.alignItemsStart]}>
                            <Text style={[userAuthStyles.formInputError, SDGenericStyles.fontFamilyBold]}>{props.formState.errors[props.inputName]?.message}</Text>
                        </View>
                    }
                    <TouchableOpacity activeOpacity={.7} onPress={async () => await props.validateUserId()}>
                        <Text style={[SDGenericStyles.colorWhite, SDGenericStyles.fontFamilyBold]}>{actionButtonTextConstants.CHECK_AVAILABILITY}</Text>
                    </TouchableOpacity>
                </View> ||
                <Text style={[userAuthStyles.formInputError, SDGenericStyles.fontFamilyBold]}>{props.formState.errors[props.inputName]?.message}</Text>
            }
        </KeyboardAvoidingView >
    );
}