import React from 'react';
import { Controller } from 'react-hook-form';
import DropDownPicker from 'react-native-dropdown-picker';
import { miscMessage, placeHolderText } from '../../constants/Constants';
import { onChangeByValueType } from '../../helper/Helper';
import { SDGenericStyles, userAuthStyles } from '../../styles/Styles';
import { ArrowDownIcon } from '../icons/ArrowDownIcon';
import { ArrowUpIcon } from '../icons/ArrowUpIcon';

export const SDDropDownPicker = props => {
    return (
        <Controller name={props.inputName} control={props.control} defaultValue={props.defaultValue} rules={props.rules}
            render={inputProps => {
                return (
                    <DropDownPicker items={props.list} containerStyle={userAuthStyles.dropDownPickerStyle} globalTextStyle={SDGenericStyles.ft16}
                        selectedLabelStyle={[SDGenericStyles.bold, SDGenericStyles.fontFamilyNormal, SDGenericStyles.selectedDropDownColor]}
                        dropDownStyle={SDGenericStyles.dropDownBackGround} itemStyle={SDGenericStyles.justifyItemsStart} customArrowUp={(size, color) =>
                            <ArrowUpIcon width={size} height={size} color={color} />} customArrowDown={(size, color) =>
                                <ArrowDownIcon width={size} height={size} color={color} />} controller={props.bloodGroupControllerCallback}
                        onChangeItem={item => onChangeByValueType(inputProps, item.value, props)} defaultValue={props.dropDownDefaultValue}
                        placeholder={placeHolderText.SELECT_A_GENDER} placeholderStyle={[SDGenericStyles.bold, SDGenericStyles.fontFamilyNormal,
                        SDGenericStyles.selectedDropDownColor]}
                    />
                )
            }} />
    )
}