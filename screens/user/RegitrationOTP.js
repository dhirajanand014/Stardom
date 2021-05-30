import React, { useState, useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {
    onOtpKeyPress, onResendOtpButtonPress,
    identifyOtpError, verifyOtpRequest,
    onOtpChange
} from '../../helper/Helper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useForm } from 'react-hook-form';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
    numericConstants, AUTO_SUBMIT_OTP_TIME_LIMIT, keyBoardTypeConst,
    isAndroid, RESEND_OTP_TIME_LIMIT, stringConstants, OTP_INPUTS,
    actionButtonTextConstants, miscMessage, screens, modalTextConstants
} from '../../constants/Constants';
import { colors, SDGenericStyles, userAuthStyles } from '../../styles/Styles';
import { OTPTimeText } from '../../components/texts/OTPTimeText';
import { OTPResendButton } from '../../components/button/OTPResendButton';
import { OTPTextView } from '../../components/texts/OTPTextView';
import { OTPInputText } from '../../components/input/OTPInputText';
import { CategoryContext } from '../../App';
import { AuthHeaderText } from '../../views/fromInputView/AuthHeaderText';

let resendOtpTimerInterval;
let autoSubmitOtpTimerInterval;

let otpInputs = Array(OTP_INPUTS).fill(stringConstants.EMPTY);

export const RegistrationOTP = props => {
    const { attempts } = props;
    let [attemptsRemaining, setAttemptsRemaining] = useState(attempts);

    const { signUpDetails, setLoaderCallback, loader } = useContext(CategoryContext);

    const navigation = useNavigation();
    const [otpArray, setOtpArray] = useState(otpInputs);
    const [autoSubmittingOtp, setAutoSubmittingOtp] = useState(false);

    const route = useRoute();
    const isFrom = route?.params?.isFrom;

    const phoneNumber = signUpDetails.phoneNumber || stringConstants.EMPTY;

    const { handleSubmit, control, setError, formState, clearErrors } = useForm();

    // in secs, if value is greater than 0 then button will be disabled
    const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(RESEND_OTP_TIME_LIMIT);
    const [autoSubmitOtpTime, setAutoSubmitOtpTime] = useState(AUTO_SUBMIT_OTP_TIME_LIMIT);
    // TextInput refs to focus programmatically while entering OTP
    const firstTextInputRef = useRef(null);
    const secondTextInputRef = useRef(null);
    const thirdTextInputRef = useRef(null);
    const fourthTextInputRef = useRef(null);
    const fifthTextInputRef = useRef(null);
    const sixththTextInputRef = useRef(null);


    const autoSubmitOtpTimerIntervalCallbackReference = useRef();

    useEffect(() => {
        // autoSubmitOtpTime value will be set after otp is detected,
        // in that case we have to start auto submit timer
        autoSubmitOtpTimerIntervalCallbackReference.current = autoSubmitOtpTimerIntervalCallback;
    });
    useEffect(() => {
        startResendOtpTimer()
        return () => resendOtpTimerInterval && clearInterval(resendOtpTimerInterval);
    }, [resendButtonDisabledTime]);

    useEffect(() => {
        // (async () => {
        //     await verifyOtpReceived(setOtpArray, setAutoSubmitOtpTime, startAutoSubmitOtpTimer, setAutoSubmittingOtp);
        //     if (isIOS) {
        //         isIOSOtpAutoFilled = await checkPinCodeFromClipBoardIOS(setOtpArray, setAutoSubmitOtpTime, startAutoSubmitOtpTimer, setAutoSubmittingOtp);
        //         if (!isIOSOtpAutoFilled) {
        //             iosOtpAutoFillInterval = setInterval(async () => {
        //                 isIOSOtpAutoFilled = await checkPinCodeFromClipBoardIOS(setOtpArray, setAutoSubmitOtpTime, startAutoSubmitOtpTimer, setAutoSubmittingOtp);
        //             }, numericConstants.TWO_HUNDRED);
        //         }
        //         iosOtpAutoFillInterval && isIOSOtpAutoFilled && clearInterval(iosOtpAutoFillInterval);
        //     }
        // })();
    }, []);

    const startResendOtpTimer = () => {
        resendOtpTimerInterval && clearInterval(resendOtpTimerInterval);
        resendOtpTimerInterval = setInterval(() => {
            if (resendButtonDisabledTime <= numericConstants.ZERO) {
                clearInterval(resendOtpTimerInterval);
            } else {
                setResendButtonDisabledTime(resendButtonDisabledTime - numericConstants.ONE);
            }
        }, numericConstants.THOUSAND);
    };

    // this callback is being invoked from startAutoSubmitOtpTimer which itself is being invoked from useEffect
    // since useEffect use closure to cache variables data, we will not be able to get updated autoSubmitOtpTime value
    // as a solution we are using useRef by keeping its value always updated inside useEffect(componentDidUpdate)
    const autoSubmitOtpTimerIntervalCallback = async () => {
        setLoaderCallback(true);
        if (autoSubmitOtpTime <= numericConstants.ZERO) {
            clearInterval(autoSubmitOtpTimerInterval);
            await onSubmit();
            setLoaderCallback(true);
            setAutoSubmittingOtp(false);
        }
        setAutoSubmitOtpTime(autoSubmitOtpTime - numericConstants.ONE);
    };


    const refCallback = textInputRef => node => {
        textInputRef.current = node;
    };

    const onSubmit = async () => {
        setLoaderCallback(true);
        const otpString = otpArray.reduce((result, item) => { return `${result}${item}` }, stringConstants.EMPTY);
        const isValid = identifyOtpError(otpString, otpArray, setError, clearErrors);
        if (isValid) {
            const randomNumber = route.params?.rand_number || false;
            const navigationResponse = await verifyOtpRequest(otpString, randomNumber);
            if (miscMessage.CONFIRM_SECRET == navigationResponse) {
                clearInterval(resendOtpTimerInterval);
                navigation.navigate(screens.REGISTRATION_CONFIRMATION, { isFrom: isFrom });
            }
        } else {

        }
        setLoaderCallback(false);
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack]} pointerEvents={loader.isLoading && miscMessage.NONE ||
                miscMessage.AUTO}>
                <AuthHeaderText titleText={modalTextConstants.OTP_VERIFICATION} />
                <View style={[userAuthStyles.otpFieldRows, SDGenericStyles.mt12]}>
                    {
                        [firstTextInputRef, secondTextInputRef, thirdTextInputRef, fourthTextInputRef, fifthTextInputRef,
                            sixththTextInputRef].map((textInputRef, index) => (
                                <OTPInputText control={control} containerStyle={[SDGenericStyles.fill, SDGenericStyles.mr12,
                                { borderColor: otpArray[index] && colors.GREEN || textInputRef?.current?.isFocused() && !otpArray[index] && colors.BLUE || colors.SDOM_YELLOW }]} value={otpArray[index].toString()}
                                    onKeyPress={onOtpKeyPress(index, otpArray, firstTextInputRef, secondTextInputRef, thirdTextInputRef, fourthTextInputRef,
                                        fifthTextInputRef, setOtpArray, setError, clearErrors, setAutoSubmittingOtp)}
                                    onChangeText={onOtpChange(index, otpArray, setOtpArray, secondTextInputRef, thirdTextInputRef, fourthTextInputRef,
                                        fifthTextInputRef, sixththTextInputRef, setError, clearErrors)} textContentType={keyBoardTypeConst.ONETIMECODE} maxLength={numericConstants.ONE}
                                    keyboardType={isAndroid && keyBoardTypeConst.ANDROID_NUMERIC || keyBoardTypeConst.IOS_NUMERIC} refCallback={refCallback(textInputRef)}
                                    key={index} autoFocus={index === numericConstants.ZERO && true || false} />
                            ))}
                </View>
                <Text style={[userAuthStyles.otpErrorMessageStyle, SDGenericStyles.fontFamilyBold]}>{formState.errors.otpInput?.message}</Text>
                {
                    resendButtonDisabledTime > numericConstants.ZERO && <OTPTimeText text={miscMessage.RESEND_OTP_IN} time={resendButtonDisabledTime} />
                    || <OTPResendButton text={miscMessage.RESEND_OTP} buttonStyle={userAuthStyles.otpResendButton} textStyle={[SDGenericStyles.colorWhite,
                    SDGenericStyles.fontFamilyRoman, SDGenericStyles.ft16]}
                        onPress={async () => await onResendOtpButtonPress(firstTextInputRef, setOtpArray, setResendButtonDisabledTime, setAttemptsRemaining,
                            attemptsRemaining, startResendOtpTimer, phoneNumber, isFrom, navigation, clearErrors, setLoaderCallback)} />
                }
                <View style={userAuthStyles.registerButtonView}>
                    <Text style={SDGenericStyles.colorWhite}>OTP IS - {route.params.rand_number}</Text>
                    <OTPTextView style={[SDGenericStyles.centerAlignedText, SDGenericStyles.colorWhite, SDGenericStyles.fontFamilyBold, SDGenericStyles.mt36]}>
                        {attemptsRemaining || numericConstants.ZERO} {miscMessage.ATTEMPT_REMAINING}
                    </OTPTextView>
                    {
                        !autoSubmittingOtp &&
                        <View style={userAuthStyles.registerButtonView}>
                            <TouchableOpacity activeOpacity={.7} style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.backgroundColorYellow]}
                                onPress={handleSubmit(onSubmit)}>
                                <Text style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.fontFamilyRoman]}>{actionButtonTextConstants.VERIFY}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

RegistrationOTP.defaultProps = {
    attempts: numericConstants.THREE
};

RegistrationOTP.propTypes = {
    attempts: PropTypes.number.isRequired,
};
