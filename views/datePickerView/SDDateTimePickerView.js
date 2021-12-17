import React from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import { SDGenericStyles, userAuthStyles } from '../../styles/Styles';
import { SDDateTimePicker } from '../../components/picker/SDDateTimePicker';
export const SDDateTimePickerView = props => {
    return (
        <KeyboardAvoidingView messagestyle={userAuthStyles.signInUserInputView}>
            <View style={[userAuthStyles.userInput, SDGenericStyles.paddingVertical14, SDGenericStyles.paddingHorizontal10, SDGenericStyles.backGroundColorSDOMGray,
            props.formState.errors[props.inputName]?.message && userAuthStyles.errorInputBorder || userAuthStyles.normalInputBorder]}>
                <SDDateTimePicker {...props} />
                {props.icon && props.icon}
            </View>
            <Text style={[userAuthStyles.formInputError, SDGenericStyles.fontFamilyRobotoRegular]}>{props.formState.errors[props.inputName]?.message}</Text>
        </KeyboardAvoidingView>
    );
}