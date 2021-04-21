import React from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import { SDGenericStyles, userAuthStyles } from '../../styles/Styles';
import { SDFormInput } from '../../components/input/SDFormInput';
export const SDPostDetailsInput = props => {
    return (
        <KeyboardAvoidingView messagestyle={[userAuthStyles.signInUserInputView]}>
            <View style={[userAuthStyles.userInputPostDetails, props.formState.errors[props.inputName]?.message && userAuthStyles.errorInputBorder ||
                userAuthStyles.normalInputBorder, props.isAddPostDetails && SDGenericStyles.borderRadius20]}>
                {props.icon && props.icon}
                <SDFormInput {...props} />
            </View>
            <Text style={userAuthStyles.formInputError}>{props.formState.errors[props.inputName]?.message}</Text>
        </KeyboardAvoidingView>
    );
}