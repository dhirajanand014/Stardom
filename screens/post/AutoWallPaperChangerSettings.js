import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CalenderIcon } from '../../components/icons/CalenderIcon';
import {
    actionButtonTextConstants, numericConstants, placeHolderText,
    alertTextMessages, fieldControllerName, formRequiredRules,
    jsonConstants, keyBoardTypeConst, miscMessage,
    stringConstants, wallpaperChangerConditions, wallpaperChangerIntervals
} from '../../constants/Constants';
import { checkAlarmActive, getWallPaperSettingsFromKeyChain, resetWallpaperSettings, setupWallPaperChanger } from '../../helper/Helper';
import { colors, glancePostStyles, SDGenericStyles, userAuthStyles } from '../../styles/Styles';
import { SDDateTimePickerView } from '../../views/datePickerView/SDDateTimePickerView';
import { SDDropDownView } from '../../views/dropDownView/SDDropDownView';

export const AutoWallPaperChangerSettings = () => {
    const { control, formState, setValue, handleSubmit } = useForm();

    const [wallPaperChangeSettings, setWallPaperChangeSettings] = useState({
        changeCondition: stringConstants.EMPTY,
        changeInterval: stringConstants.EMPTY,
        changeSpecificTime: stringConstants.EMPTY,
        isAlarmActive: false
    });

    useEffect(() => {
        (async () => {
            const changeSettings = await getWallPaperSettingsFromKeyChain();
            await checkAlarmActive(wallPaperChangeSettings, setWallPaperChangeSettings, changeSettings, setValue);
        })();
    }, jsonConstants.EMPTY)

    const onSubmit = (data) => {
        if (data.changeWallPaperCondition == miscMessage.WALLPAPER_TIME_INTERVAL && data.changeWallPaperIntervals) {
            setupWallPaperChanger(miscMessage.SET_ALARM_MANAGER, data, stringConstants.EMPTY + data.changeWallPaperIntervals,
                wallPaperChangeSettings, setWallPaperChangeSettings);
        } else if (data.changeWallPaperCondition == miscMessage.WALLPAPER_TIME_SPECIFIC && data.changeWallPaperSpecificTime) {
            const millisValue = moment(data.changeWallPaperSpecificTime).valueOf();
            setupWallPaperChanger(miscMessage.SET_ALARM_MANAGER, data, stringConstants.EMPTY + millisValue, wallPaperChangeSettings,
                setWallPaperChangeSettings);
        }
    }

    const disableWallpaperSettings = async () => {
        await resetWallpaperSettings();
        wallPaperChangeSettings.changeCondition = stringConstants.EMPTY;
        wallPaperChangeSettings.changeInterval = stringConstants.EMPTY;
        wallPaperChangeSettings.changeSpecificTime = stringConstants.EMPTY;
        wallPaperChangeSettings.isAlarmActive = false;
        setWallPaperChangeSettings({ ...wallPaperChangeSettings });
    }

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack]}>
            <Text style={[SDGenericStyles.ft14, SDGenericStyles.placeHolderTextColor, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.padding20]}>
                {wallPaperChangeSettings.isAlarmActive && alertTextMessages.AUTO_WALLPAPER_ENABLED || alertTextMessages.AUTO_WALLPAPER_NOT_ENABLED}
            </Text>
            <View style={[SDGenericStyles.paddingHorizontal25, SDGenericStyles.paddingVertical5]}>
                <SDDropDownView inputName={fieldControllerName.CHANGE_WALLPAPER_CONDITION} control={control} rules={formRequiredRules.changeWallPaperConditionRule} selectedLabelStyle={SDGenericStyles.textColorWhite}
                    containerStyle={userAuthStyles.dropDownPickerStyle} dropDownPickerStyle={glancePostStyles.addPostDropDownStyle} placeHolderText={placeHolderText.WALLPAPER_CHANGER_CONDITION} formState={formState}
                    defaultValue={wallPaperChangeSettings.changeCondition && wallpaperChangerConditions.find(condition => condition.value == wallPaperChangeSettings.changeCondition).value ||
                        wallpaperChangerConditions.find(condition => condition.value == numericConstants.MINUS_ONE).value} setState={setWallPaperChangeSettings} state={wallPaperChangeSettings}
                    list={wallpaperChangerConditions} globalTextStyle={[SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.ft16, SDGenericStyles.textColorWhite]} extraStyles={SDGenericStyles.textBoxGray} />
                {
                    wallPaperChangeSettings.changeCondition == miscMessage.WALLPAPER_TIME_INTERVAL &&
                    <SDDropDownView inputName={fieldControllerName.CHANGE_WALLPAPER_INTERVALS} control={control} rules={formRequiredRules.changeWallPaperIntervalsRule} selectedLabelStyle={SDGenericStyles.textColorWhite}
                        containerStyle={userAuthStyles.dropDownPickerStyle} dropDownPickerStyle={glancePostStyles.addPostDropDownStyle} placeHolderText={placeHolderText.WALLPAPER_CHANGER_INTERVALS}
                        defaultValue={wallPaperChangeSettings.changeInterval && wallpaperChangerIntervals.find(interval => interval.value == wallPaperChangeSettings.changeInterval).value ||
                            wallpaperChangerIntervals.find(interval => interval.value == numericConstants.MINUS_ONE).value} list={wallpaperChangerIntervals} formState={formState} extraStyles={SDGenericStyles.textBoxGray}
                        globalTextStyle={[SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.ft16, SDGenericStyles.textColorWhite]} />
                }
                {
                    wallPaperChangeSettings.changeCondition == miscMessage.WALLPAPER_TIME_SPECIFIC &&
                    <SDDateTimePickerView inputName={fieldControllerName.CHANGE_WALLPAPER_SPECIFIC_TIME} control={control} rules={formRequiredRules.timePickerFormRule} display={keyBoardTypeConst.DEFAULT}
                        defaultValue={wallPaperChangeSettings.changeSpecificTime || stringConstants.EMPTY} formState={formState} mode={miscMessage.TIME} placeHolderText={placeHolderText.WALLPAPER_CHANGER_SPECIFIC_TIME}
                        icon={<CalenderIcon width={numericConstants.EIGHTEEN} height={numericConstants.EIGHTEEN} stroke={colors.SDOM_PLACEHOLDER} />} />
                }
                <View style={SDGenericStyles.paddingTop40}>
                    <TouchableOpacity activeOpacity={.7} style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.backgroundColorYellow]} onPress={handleSubmit(onSubmit)}>
                        <Text style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.fontFamilyRobotoRegular]}>
                            {wallPaperChangeSettings.isAlarmActive && actionButtonTextConstants.RESCHEDULE_WALLPAPER_CHANGE ||
                                actionButtonTextConstants.SCHEDULE_WALLPAPER_CHANGE}
                        </Text>
                    </TouchableOpacity>
                </View>
                {
                    wallPaperChangeSettings.isAlarmActive &&
                    <View style={SDGenericStyles.paddingVertical20}>
                        <TouchableOpacity activeOpacity={.7} style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.backgroundColorYellow]} onPress={() => disableWallpaperSettings()}>
                            <Text style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.fontFamilyRobotoRegular]}>
                                {actionButtonTextConstants.DISABLE_WALLPAPER_CHANGE}
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </View>
    );
}