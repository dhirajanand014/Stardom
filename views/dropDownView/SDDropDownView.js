import React from 'react';
import { Text, View } from 'react-native';
import { SDDropDownPicker } from '../../components/dropdown/SDDropDownPicker';
import { isIOS } from '../../constants/Constants';
import { SDGenericStyles, userAuthStyles } from '../../styles/Styles';
export const SDDropDownView = props => {
    return (
        <React.Fragment>
            <View style={[userAuthStyles.registrationUserDropDownView, SDGenericStyles.marginBottom10,
            isIOS && SDGenericStyles.zIndex10]}>
                <SDDropDownPicker {...props} />
            </View>
            <Text style={[userAuthStyles.formInputError, SDGenericStyles.fontFamilyBold]}>{props.formState.errors[props.inputName]?.message}</Text>
        </React.Fragment>
    );
}