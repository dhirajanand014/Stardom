import React from 'react';
import { View, ViewPropTypes, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { SDGenericStyles, userAuthStyles } from '../../styles/Styles';

export const OTPInputText = props => {
    const { containerStyle, LeftComponent, RightComponent, control, refCallback, ...remainingProps } = props;
    return (
        <View style={[userAuthStyles.otpContainerStyle, containerStyle, SDGenericStyles.backGroundColorGray]}>
            {LeftComponent}
            <TextInput {...remainingProps} style={[userAuthStyles.otpInputStyle, SDGenericStyles.fill, SDGenericStyles.fontFamilyBold,
            SDGenericStyles.centerAlignedText, SDGenericStyles.textColorWhite]} ref={refCallback} />
            {RightComponent}
        </View>
    );
}

OTPInputText.defaultProps = {
    LeftComponent: <></>,
    RightComponent: <></>,
};

OTPInputText.propTypes = {
    containerStyle: ViewPropTypes.style,
    style: ViewPropTypes.style,
    LeftComponent: PropTypes.object,
    RightComponent: PropTypes.object,
    refCallback: PropTypes.func,
};