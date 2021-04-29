import React from 'react';
import { Controller } from 'react-hook-form';
import { Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { colors, userAuthStyles, SDGenericStyles } from '../../styles/Styles';
import { countryCodesConstants, miscMessage, stringConstants } from '../../constants/Constants';
import { onChangeByValueType } from '../../helper/Helper';

export const SDFormInput = props => {
    return (
        <Controller name={props.inputName} control={props.control} defaultValue={props.defaultValue} rules={props.rules}
            render={inputProps => {
                return (
                    <React.Fragment>
                        {
                            props.isPhoneNumberEntry &&
                            <Text style={[userAuthStyles.mobileCountryCode, SDGenericStyles.fontFamilyRoman, SDGenericStyles.borderRightWidth1]}>
                                {countryCodesConstants.INDIA}
                            </Text>
                        }
                        <TextInput {...inputProps} maxLength={props.maxLength} value={inputProps.value} textContentType={props.textContentType}
                            autoCapitalize={miscMessage.NONE} placeholder={props.placeHolderText} secureTextEntry={props.isSecureTextEntry}
                            keyboardType={props.keyboardType} placeholderTextColor={colors.DARK_GREY} autoFocus={props.autofocus}
                            style={[userAuthStyles.textInputStyle, props.extraStyles]} onSubmitEditing={props.onSubmitEditing}
                            onChangeText={value => onChangeByValueType(inputProps, value, props)} ref={props.refCallback} multiline={props.isMultiline}
                            numberOfLines={props.numberOfLines} />
                    </React.Fragment>
                )
            }} />
    )
}