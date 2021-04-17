import React from 'react';
import { Controller } from 'react-hook-form';
import { TextInput } from 'react-native-gesture-handler';
import { miscMessage } from '../../constants/Constants';
import { onChangeByValueType } from '../../helper/Helper';
import { colors, glancePostStyles } from '../../styles/Styles';

export const SDPostDetailsInput = props => {
    return (
        <Controller name={props.inputName} control={props.control} defaultValue={props.defaultValue} rules={props.rules}
            render={inputProps => {
                return (
                    <TextInput {...inputProps} maxLength={props.maxLength} value={inputProps.value} textContentType={props.textContentType}
                        autoCapitalize={miscMessage.WORDS} placeholder={props.placeHolderText} secureTextEntry={props.isSecureTextEntry}
                        keyboardType={props.keyboardType} style={[glancePostStyles.addPostDetailUnderlineTextInput, props.formState.errors[props.inputName]?.message &&
                            glancePostStyles.errorInputBorder, props.extraStyles]} placeholderTextColor={colors.DARK_GREY} placeHolderText={props.placeHolderText}
                        onChangeText={value => onChangeByValueType(inputProps, value, props)} autoFocus={props.autofocus} underlineColorAndroid={props.underlineColorAndroid}
                        onSubmitEditing={props.onSubmitEditing} ref={props.refCallback} multiline={props.multiline} numberOfLines={props.numberOfLines} />
                )
            }} />
    )
}