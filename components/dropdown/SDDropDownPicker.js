import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import DropDownPicker from 'react-native-dropdown-picker';
import { jsonConstants, numericConstants } from '../../constants/Constants';
import { onChangeByValueType } from '../../helper/Helper';
import { SDGenericStyles } from '../../styles/Styles';
import { ArrowDownIcon } from '../icons/ArrowDownIcon';
import { ArrowUpIcon } from '../icons/ArrowUpIcon';

export const SDDropDownPicker = props => {

    const [dropDownList, setDropDownList] = useState(jsonConstants.EMPTY);

    return (
        <Controller name={props.inputName} control={props.control} defaultValue={props.defaultValue} rules={props.rules}
            render={inputProps => {
                return (
                    <DropDownPicker items={props.isFromAddPostDetails && dropDownList || props.list} containerStyle={props.containerStyle} globalTextStyle={SDGenericStyles.ft16}
                        selectedLabelStyle={[SDGenericStyles.bold, SDGenericStyles.fontFamilyNormal, SDGenericStyles.selectedDropDownColor]} selectedLabelStyle={props.selectedLabelStyle}
                        dropDownStyle={SDGenericStyles.dropDownBackGround} itemStyle={SDGenericStyles.justifyItemsStart} customArrowUp={(size, color) =>
                            <ArrowUpIcon width={size} height={size} color={color} />} customArrowDown={(size, color) =>
                                <ArrowDownIcon width={size} height={size} color={color} />} controller={instance => props.callback.current = props.callback && instance || null}
                        onChangeItem={item => onChangeByValueType(inputProps, item.value, props)} defaultValue={props.dropDownDefaultValue} dropDownMaxHeight={numericConstants.ONE_HUNDER_EIGHTY}
                        placeholder={props.placeHolderText} placeholderStyle={[SDGenericStyles.bold, SDGenericStyles.fontFamilyNormal,
                        SDGenericStyles.selectedDropDownColor]} multiple={props.multiple} searchable={props.searchable} onChangeList={(items, callback) =>
                            props.isFromAddPostDetails && Promise.resolve(setDropDownList(items)).then(() => callback())} dropDownStyle={props.dropDownPickerStyle}
                        style={props.extraStyles} globalTextStyle={props.globalTextStyle} activeItemStyle={SDGenericStyles.colorGreen} />)
            }} />
    )
}