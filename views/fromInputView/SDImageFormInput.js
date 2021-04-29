import React from 'react';
import { KeyboardAvoidingView, Text, TouchableOpacity, View } from 'react-native';
import { SDGenericStyles, userAuthStyles } from '../../styles/Styles';
import { SDFormInput } from '../../components/input/SDFormInput';
import { actionButtonTextConstants } from '../../constants/Constants';
export const SDImageFormInput = props => {
    return (
        <KeyboardAvoidingView messagestyle={userAuthStyles.signInUserInputView}>
            <View style={[userAuthStyles.userInput, props.formState.errors[props.inputName]?.message &&
                userAuthStyles.errorInputBorder || userAuthStyles.normalInputBorder]}>
                {props.icon && props.icon}
                <SDFormInput {...props} />
            </View>
            {
                props.isUserId &&
                <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.mv5]}>
                    <View style={[SDGenericStyles.fill, SDGenericStyles.alignItemsStart]}>
                        <Text style={[userAuthStyles.formInputError, SDGenericStyles.fontFamilyBold]}>{props.formState.errors[props.inputName]?.message}</Text>
                    </View>
                    <TouchableOpacity>
                        <Text style={[SDGenericStyles.colorWhite, SDGenericStyles.fontFamilyBold]}>{actionButtonTextConstants.CHECK_AVAILABILITY}</Text>
                    </TouchableOpacity>
                </View> ||
                <Text style={[userAuthStyles.formInputError, SDGenericStyles.fontFamilyBold]}>{props.formState.errors[props.inputName]?.message}</Text>
            }
        </KeyboardAvoidingView>
    );
}