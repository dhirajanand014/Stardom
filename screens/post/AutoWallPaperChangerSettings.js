import moment from 'moment';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useEffect } from 'react/cjs/react.development';
import { CalenderIcon } from '../../components/icons/CalenderIcon';
import {
    actionButtonTextConstants,
    alertTextMessages, fieldControllerName, formRequiredRules,
    jsonConstants, keyBoardTypeConst, miscMessage, numericConstants, placeHolderText,
    stringConstants, wallpaperChangerConditions, wallpaperChangerIntervals
} from '../../constants/Constants';
import { setupWallPaperChanger } from '../../helper/Helper';
import { colors, glancePostStyles, SDGenericStyles, userAuthStyles } from '../../styles/Styles';
import { SDDateTimePickerView } from '../../views/datePickerView/SDDateTimePickerView';
import { SDDropDownView } from '../../views/dropDownView/SDDropDownView';

export const AutoWallPaperChangerSettings = () => {
    const { control, formState, handleSubmit } = useForm();

    const [wallPaperChangeSettings, setWallPaperChangeSettings] = useState({
        changeCondition: stringConstants.EMPTY,
        changeInterval: stringConstants.EMPTY,
        changeSpecificTime: stringConstants.EMPTY
    });

    useEffect(() => {

    }, jsonConstants.EMPTY)

    const onSubmit = (data) => {
        if (data.changeWallPaperCondition == miscMessage.WALLPAPER_TIME_INTERVAL && data.changeWallPaperIntervals) {
            setupWallPaperChanger(miscMessage.SET_ALARM_MANAGER, data.changeWallPaperCondition, stringConstants.EMPTY + data.changeWallPaperIntervals);
        } else if (data.changeWallPaperCondition == miscMessage.WALLPAPER_TIME_SPECIFIC && data.changeWallPaperSpecificTime) {
            const millisValue = moment(data.changeWallPaperSpecificTime).valueOf();
            setupWallPaperChanger(miscMessage.SET_ALARM_MANAGER, data.changeWallPaperCondition, stringConstants.EMPTY + millisValue);
        }
    }

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack]}>
            <View style={SDGenericStyles.justifyContentCenter}>
                <Text style={[SDGenericStyles.ft14, SDGenericStyles.placeHolderTextColor, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.textCenterAlign, SDGenericStyles.padding20]}>
                    {alertTextMessages.AUTO_WALLPAPER_NOT_ENABLED}
                </Text>
                <View style={SDGenericStyles.alignItemsCenter}>
                    <SDDropDownView inputName={fieldControllerName.CHANGE_WALLPAPER_CONDITION} control={control} rules={formRequiredRules.changeWallPaperConditionRule} selectedLabelStyle={SDGenericStyles.textColorWhite}
                        containerStyle={userAuthStyles.dropDownPickerStyle} dropDownPickerStyle={glancePostStyles.addPostDropDownStyle} placeHolderText={placeHolderText.WALLPAPER_CHANGER_CONDITION}
                        defaultValue={stringConstants.EMPTY} formState={formState} list={wallpaperChangerConditions.filter(condition => condition.value != numericConstants.MINUS_ONE)} state={wallPaperChangeSettings}
                        dropDownDefaultValue={wallpaperChangerConditions.length && wallpaperChangerConditions.filter(condition => condition.value == numericConstants.ZERO).value
                            || wallpaperChangerConditions.find(condition => condition.value == numericConstants.MINUS_ONE)} extraStyles={[SDGenericStyles.textBoxGray]} setState={setWallPaperChangeSettings}
                        globalTextStyle={[SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.ft16, SDGenericStyles.textColorWhite]} />
                    {
                        wallPaperChangeSettings.changeCondition == miscMessage.WALLPAPER_TIME_INTERVAL &&
                        <SDDropDownView inputName={fieldControllerName.CHANGE_WALLPAPER_INTERVALS} control={control} rules={formRequiredRules.changeWallPaperIntervalsRule} selectedLabelStyle={SDGenericStyles.textColorWhite}
                            containerStyle={userAuthStyles.dropDownPickerStyle} dropDownPickerStyle={glancePostStyles.addPostDropDownStyle} placeHolderText={placeHolderText.WALLPAPER_CHANGER_INTERVALS}
                            defaultValue={stringConstants.EMPTY} formState={formState} list={wallpaperChangerIntervals.filter(condition => condition.value != numericConstants.MINUS_ONE)}
                            dropDownDefaultValue={wallpaperChangerIntervals.length && wallpaperChangerIntervals.filter(condition => condition.value == numericConstants.ZERO).value
                                || wallpaperChangerIntervals.find(condition => condition.value == numericConstants.MINUS_ONE)} extraStyles={[SDGenericStyles.textBoxGray]}
                            globalTextStyle={[SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.ft16, SDGenericStyles.textColorWhite]} />
                    }
                    {
                        wallPaperChangeSettings.changeCondition == miscMessage.WALLPAPER_TIME_SPECIFIC &&
                        <SDDateTimePickerView inputName={fieldControllerName.CHANGE_WALLPAPER_SPECIFIC_TIME} control={control} rules={formRequiredRules.timePickerFormRule} display={keyBoardTypeConst.DEFAULT}
                            defaultValue={stringConstants.EMPTY} formState={formState} mode={miscMessage.TIME} placeHolderText={placeHolderText.WALLPAPER_CHANGER_SPECIFIC_TIME}
                            icon={<CalenderIcon width={numericConstants.EIGHTEEN} height={numericConstants.EIGHTEEN} stroke={colors.SDOM_PLACEHOLDER} />} />
                    }
                </View>
                <View>
                    <TouchableOpacity activeOpacity={.7} style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.backgroundColorYellow]} onPress={handleSubmit(onSubmit)}>
                        <Text style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.fontFamilyRobotoRegular]}>
                            {actionButtonTextConstants.SCHEDULE_WALLPAPER_CHANGE}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}