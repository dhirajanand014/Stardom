import React from 'react';
import { Text } from 'react-native';
import { SDGenericStyles } from '../../styles/Styles';

// To handle one plus issue, we are adding two spaces at the end of text. This will cause center alignment issue
// so in such places use Text from react-native
export const OTPTextView = props => {
    return (
        <Text {...props} style={[SDGenericStyles.textBlackColor, props.style]}>
            {props.children}
            {`  `}
        </Text>
    );
};

OTPTextView.prototype = {
    style: Text.propTypes.style
};