import React from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { SDDatePicker } from '../components/picker/SDDatePicker';
import { SDGenericStyles, userAuthStyles } from '../styles/Styles';
export const SDDatePickerView = props => {
    return (
        <KeyboardAvoidingView messagestyle={userAuthStyles.signInUserInputView}>
            <View style={[userAuthStyles.userInput, SDGenericStyles.paddingVertical10,
            props.formState.errors[props.inputName]?.message && userAuthStyles.errorInputBorder || userAuthStyles.normalInputBorder]}>
                <SDDatePicker {...props} />
            </View>
        </KeyboardAvoidingView>
    );
}