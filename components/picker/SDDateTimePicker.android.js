import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { convertDate, convertTime } from '../../helper/Helper';
import { Controller } from 'react-hook-form';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SDGenericStyles } from '../../styles/Styles';
import { miscMessage } from '../../constants/Constants';
import moment from 'moment';

export const SDDateTimePicker = props => {
    const [show, setShow] = useState(false);
    return (
        <Controller name={props.inputName} control={props.control} defaultValue={props.defaultValue} rules={props.rules} render={(datePickerProps) => (
            <React.Fragment>
                <View style={SDGenericStyles.fill}>
                    <TouchableOpacity activeOpacity={.4} onPress={() => setShow(true)}>
                        <Text style={[SDGenericStyles.leftAlignedText, SDGenericStyles.fontFamilyRobotoRegular, !datePickerProps.value && SDGenericStyles.placeHolderTextColor ||
                            SDGenericStyles.textColorWhite, SDGenericStyles.ft16]}>
                            {
                                props.mode == miscMessage.DATE && (datePickerProps.value && moment(datePickerProps.value).format(miscMessage.DOB_DATE_FORMAT) || props.placeHolderText)
                            }
                            {
                                props.mode == miscMessage.TIME && (datePickerProps.value && moment(datePickerProps.value).format(`hh:mm A`) || props.placeHolderText)
                            }
                        </Text>
                    </TouchableOpacity>
                </View>
                {
                    show &&
                    <DateTimePicker minimumDate={props.minimumDate} display={props.display} mode={props.mode} value={datePickerProps.value || new Date()} is24Hour={false}
                        maximumDate={props.maximumDate} ref={props.refCallback} onChange={(event, dateTime) => {
                            setShow(false);
                            props.mode == miscMessage.DATE && convertDate(event, datePickerProps, props, dateTime) ||
                                convertTime(event, datePickerProps, props);
                        }} />
                }
            </React.Fragment>
        )} />
    );
}