import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { colors, userAuthStyles } from '../../styles/Styles';
import { keyBoardTypeConst, miscMessage, placeHolderText, stringConstants } from '../../constants/Constants';
import { onChangeByValueType } from '../../helper/Helper';

export const SDSearchInput = props => {
    return (
        <TextInput value={props.searchValue} textContentType={keyBoardTypeConst.NONE} placeholder={props.placeHolderText} clearButtonMode={miscMessage.ALWAYS}
            placeholderTextColor={colors.SDOM_PLACEHOLDER} keyboardType={keyBoardTypeConst.DEFAULT} ref={props.refCallback} selectionColor={colors.SDOM_YELLOW}
            style={[userAuthStyles.textInputStyle, props.extraStyles]} onChangeText={value => onChangeByValueType(stringConstants.EMPTY, value, props)} />
    )
}