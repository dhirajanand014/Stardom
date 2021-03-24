import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { convertDate } from '../../helper/Helper';
import { Controller } from 'react-hook-form';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SDGenericStyles } from '../../styles/Styles';
import { miscMessage } from '../../constants/Constants';
import moment from 'moment';

export const SDDatePicker = props => {
    const [show, setShow] = useState(false);
    return (
        <Controller name={props.inputName} control={props.control} defaultValue={props.defaultValue} rules={props.rules} render={(datePickerProps) => (
            <React.Fragment>
                <View style={SDGenericStyles.fill}>
                    <TouchableOpacity activeOpacity={.4} onPress={() => setShow(true)}>
                        <Text style={[SDGenericStyles.leftAlignedText, datePickerProps.value && SDGenericStyles.inputTextColor || SDGenericStyles.colorGrey, SDGenericStyles.ft16]}>
                            {datePickerProps.value && moment(datePickerProps.value).format(miscMessage.DOB_DATE_FORMAT) || miscMessage.SELECT_DATE}</Text>
                    </TouchableOpacity>
                </View>
                {
                    show &&
                    <DateTimePicker minimumDate={props.minimumDate} display={props.display} mode={props.mode} value={datePickerProps.value || new Date()} is24Hour={false}
                        maximumDate={props.maximumDate} ref={props.refCallback} onChange={(event, date) => {
                            setShow(false);
                            convertDate(event, datePickerProps, props, date);
                        }} />
                }
            </React.Fragment>
        )} />
    );
}