import React from 'react';
import { KeyboardAvoidingView, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { colors, SDGenericStyles, userAuthStyles } from '../../styles/Styles';
import { SDFormInput } from '../../components/input/SDFormInput';
import { actionButtonTextConstants } from '../../constants/Constants';
import { ShowSecretIcon } from '../../components/icons/ShowSecretIcon';
import { HideSecretIcon } from '../../components/icons/HideSecretIcon';
export const SDImageFormInput = props => {

    return (
        <KeyboardAvoidingView messagestyle={userAuthStyles.signInUserInputView}>
            <View style={[userAuthStyles.userInput, !props.isFeedbackInput && SDGenericStyles.marginVertical2, !props.isFeedbackInput && SDGenericStyles.paddingStart10,
            !props.isFeedbackInput && SDGenericStyles.paddingEnd10, props.formState.errors[props.inputName]?.message && userAuthStyles.errorInputBorder ||
            userAuthStyles.normalInputBorder, props.isUserId && props.isUserIdAvailable?.current && userAuthStyles.noErrorInputBorder]}>
                <SDFormInput {...props} />

                {props.isPasswordInput && <Pressable onPressIn={() => props.setIsSecureTextEntry(false)} onPressOut={() => props.setIsSecureTextEntry(true)}
                    style={SDGenericStyles.paddingRight10}>
                    {!props.isSecureTextEntry && <ShowSecretIcon stroke={colors.SDOM_YELLOW} /> || <HideSecretIcon stroke={colors.SDOM_YELLOW} />}
                </Pressable>}

                {props.icon && props.icon}
            </View>
            {
                props.isUserId &&
                <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.mv5]}>
                    {
                        props.isUserIdAvailable.current &&
                        <View style={[SDGenericStyles.fill, SDGenericStyles.alignItemsStart]}>
                            <Text style={[userAuthStyles.formInputNoError, SDGenericStyles.fontFamilyBold]}>{`User id ${props.userIdValue} is available`}</Text>
                        </View> || <View style={[SDGenericStyles.fill, SDGenericStyles.alignItemsStart]}>
                            <Text style={[userAuthStyles.formInputError, SDGenericStyles.fontFamilyBold]}>{props.formState.errors[props.inputName]?.message}</Text>
                        </View>
                    }
                    <TouchableOpacity activeOpacity={.7} onPress={async () => await props.validateUserId()}>
                        <Text style={[SDGenericStyles.colorWhite, SDGenericStyles.fontFamilyBold]}>{actionButtonTextConstants.CHECK_AVAILABILITY}</Text>
                    </TouchableOpacity>
                </View> ||
                <Text style={[userAuthStyles.formInputError, SDGenericStyles.fontFamilyBold]}>{props.formState.errors[props.inputName]?.message}</Text>
            }
        </KeyboardAvoidingView >
    );
}