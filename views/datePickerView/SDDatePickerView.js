import React from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { SDGenericStyles, userAuthStyles } from '../../styles/Styles';
import { SDDatePicker } from '../../components/picker/SDDatePicker';
export const SDDatePickerView = props => {
    return (
        <KeyboardAvoidingView messagestyle={userAuthStyles.signInUserInputView}>
            <View style={[userAuthStyles.userInput, SDGenericStyles.paddingVertical14, SDGenericStyles.backGroundColorSDOMGray,
            props.formState.errors[props.inputName]?.message && userAuthStyles.errorInputBorder || userAuthStyles.normalInputBorder]}>
                <SDDatePicker {...props} />
            </View>
        </KeyboardAvoidingView>
    );
}