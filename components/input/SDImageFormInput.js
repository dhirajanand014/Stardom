import React from 'react';
import { Text, View } from 'react-native';
import { SDGenericStyles, userAuthStyles } from '../../styles/Styles';
import { SDFormInput } from './SDFormInput';
export const SDImageFormInput = props => {
    return (
        <View messagestyle={userAuthStyles.signInUserInputView}>
            <Text style={[userAuthStyles.userInputTextView, SDGenericStyles.colorWhite]}>{props.inputTextName}</Text>
            <View style={[userAuthStyles.userInput, props.formState.errors[props.inputName]?.message && userAuthStyles.errorInputBorder ||
                userAuthStyles.normalInputBorder]}>
                {props.icon && props.icon}
                <SDFormInput {...props} />
            </View>
            <Text style={userAuthStyles.formInputError}>{props.formState.errors[props.inputName]?.message}</Text>
        </View>
    );
}