import React from 'react';
import { Controller } from 'react-hook-form';
import { Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { colors, userAuthStyles, SDGenericStyles } from '../../styles/Styles';
import { countryCodesConstants, miscMessage, placeHolderText } from '../../constants/Constants';
import { onChangeByValueType } from '../../helper/Helper';

export const SDFormInput = props => {
    return (
        <Controller name={props.inputName} control={props.control} defaultValue={props.defaultValue} rules={props.rules}
            render={inputProps => {
                return (
                    <React.Fragment>
                        {
                            props.isPhoneNumberEntry &&
                            <Text style={[userAuthStyles.mobileCountryCode, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.borderRightWidth1,
                            SDGenericStyles.colorWhite, SDGenericStyles.borderRightColor]}>
                                {countryCodesConstants.INDIA}
                            </Text>
                        }
                        {
                            props.isUserIdEntry &&
                            <Text style={[SDGenericStyles.ft16, SDGenericStyles.paddingLeft5, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.borderRightColor,
                            SDGenericStyles.placeHolderTextColor, SDGenericStyles.paddingBottom3, SDGenericStyles.justifyContentCenter, SDGenericStyles.alignItemsCenter,
                            SDGenericStyles.marginTop1]}>
                                {placeHolderText.AMPERSAND}
                            </Text>
                        }
                        <TextInput {...inputProps} maxLength={props.maxLength} value={inputProps.value} textContentType={props.textContentType}
                            autoCapitalize={miscMessage.NONE} placeholder={props.placeHolderText} secureTextEntry={props.isSecureTextEntry}
                            keyboardType={props.keyboardType} placeholderTextColor={colors.SDOM_PLACEHOLDER} autoFocus={props.autofocus} caretHidden={props.caretHidden}
                            style={[userAuthStyles.textInputStyle, props.extraStyles]} onSubmitEditing={props.onSubmitEditing} editable={props.editable}
                            onChangeText={value => onChangeByValueType(inputProps, value, props)} ref={props.refCallback} multiline={props.isMultiline}
                            numberOfLines={props.numberOfLines} selectionColor={colors.SDOM_YELLOW} onBlur={() => props.isUserId && props.validateUserId()} />
                    </React.Fragment >
                )
            }} />
    )
}