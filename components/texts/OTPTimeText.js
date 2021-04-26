import React from 'react';
import { stringConstants } from '../../constants/Constants';
import { SDGenericStyles, userAuthStyles } from '../../styles/Styles';
import { OTPTextView } from './OTPTextView';

export const OTPTimeText = props => {
    const { text, time } = props;
    return (
        <OTPTextView style={[SDGenericStyles.centerAlignedText, userAuthStyles.otpResendTimerText, SDGenericStyles.mt24]}>
            {text}
            <OTPTextView style={[SDGenericStyles.fontFamilyRoman, SDGenericStyles.colorWhite]}>{stringConstants.SPACE + time}s</OTPTextView>
        </OTPTextView>
    );
};