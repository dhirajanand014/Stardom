import React from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import { userAuthStyles } from '../../styles/Styles';
import { SDFormInput } from './SDFormInput';
export const SDImageFormInput = props => {
    return (
        <KeyboardAvoidingView messagestyle={userAuthStyles.signInUserInputView}>
            <View style={[userAuthStyles.userInput, props.formState.errors[props.inputName]?.message && userAuthStyles.errorInputBorder ||
                userAuthStyles.normalInputBorder]}>
                {props.icon && props.icon}
                <SDFormInput {...props} />
            </View>
            <Text style={userAuthStyles.formInputError}>{props.formState.errors[props.inputName]?.message}</Text>
        </KeyboardAvoidingView>
    );
}