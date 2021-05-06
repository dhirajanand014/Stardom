import React from 'react';
import { Controller } from 'react-hook-form';
import DropDownPicker from 'react-native-dropdown-picker';
import { numericConstants } from '../../constants/Constants';
import { onChangeByValueType } from '../../helper/Helper';
import { SDGenericStyles, userAuthStyles } from '../../styles/Styles';
import { ArrowDownIcon } from '../icons/ArrowDownIcon';
import { ArrowUpIcon } from '../icons/ArrowUpIcon';

export const SDDropDownPicker = props => {
    return (
        <Controller name={props.inputName} control={props.control} defaultValue={props.defaultValue} rules={props.rules}
            render={inputProps => {
                return (
                    <DropDownPicker items={props.list} containerStyle={props.containerStyle} dropDownStyle={SDGenericStyles.dropDownBackGround}
                        selectedLabelStyle={props.selectedLabelStyle} dropDownMaxHeight={numericConstants.ONE_HUNDER_EIGHTY}
                        itemStyle={SDGenericStyles.justifyItemsStart} customArrowUp={(size, color) =>
                            <ArrowUpIcon width={size} height={size} color={color} />} customArrowDown={(size, color) =>
                                <ArrowDownIcon width={size} height={size} color={color} />}
                        onChangeItem={item => onChangeByValueType(inputProps, item.value, props)} defaultValue={props.dropDownDefaultValue} activeItemStyle={SDGenericStyles.colorGreen}
                        placeholder={props.placeHolderText} placeholderStyle={[SDGenericStyles.placeHolderTextColor]} multiple={props.multiple} searchable={props.searchable}
                        style={[props.formState.errors[props.inputName]?.message && userAuthStyles.errorInputBorder || userAuthStyles.normalInputBorder, props.extraStyles]}
                        globalTextStyle={props.globalTextStyle} />)
            }} />
    )
}