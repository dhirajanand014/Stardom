import moment from 'moment';
import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';
import { CalenderIcon } from '../../components/icons/CalenderIcon';
import {
    actionButtonTextConstants, numericConstants, placeHolderText,
    alertTextMessages, fieldControllerName, formRequiredRules,
    jsonConstants, keyBoardTypeConst, miscMessage,
    stringConstants, wallpaperChangerConditions, wallpaperChangerIntervals
} from '../../constants/Constants';
import {
    checkAlarmActive, checkAndOpenWallPaperChangeAutoStartModal, getWallPaperSettingsFromKeyChain,
    resetWallpaperSettings, setScreenUnLockWallpaperService, setupWallPaperChanger,
} from '../../helper/Helper';
import { colors, glancePostStyles, SDGenericStyles, userAuthStyles } from '../../styles/Styles';
import { SDDateTimePickerView } from '../../views/datePickerView/SDDateTimePickerView';
import { SDDropDownView } from '../../views/dropDownView/SDDropDownView';
import { SDSwitchInputView } from '../../views/fromInputView/SDSwitchInputView';
import { WallPaperChangeAutoStartModal } from '../../views/imagePost/WallPaperChangeAutoStartModal';

export const AutoWallPaperChangerSettings = () => {
    const { control, formState, setValue, handleSubmit } = useForm();

    const [wallPaperChangeSettings, setWallPaperChangeSettings] = useState({
        changeCondition: stringConstants.EMPTY,
        changeInterval: stringConstants.EMPTY,
        changeSpecificTime: stringConstants.EMPTY,
        scheduleWallPaperEnabled: false,
        showAutoStartEnableModal: false,
        isAlarmActive: false,
    });

    useEffect(() => {
        (async () => {
            const changeSettings = await getWallPaperSettingsFromKeyChain();
            await checkAlarmActive(wallPaperChangeSettings, setWallPaperChangeSettings, changeSettings, setValue);
        })();
    }, jsonConstants.EMPTY)

    const onSubmit = async (data) => {
        wallPaperChangeSettings.scheduleWallPaperEnabled = !wallPaperChangeSettings.scheduleWallPaperEnabled;
        data.scheduleWallPaperEnabled = wallPaperChangeSettings.scheduleWallPaperEnabled;
        await checkAndOpenWallPaperChangeAutoStartModal(wallPaperChangeSettings, setWallPaperChangeSettings);
        if (data.changeWallPaperCondition == miscMessage.WALLPAPER_TIME_INTERVAL) {
            await setupWallPaperChanger(miscMessage.SET_ALARM_MANAGER, data, stringConstants.EMPTY + data.changeWallPaperIntervals,
                wallPaperChangeSettings, setWallPaperChangeSettings);
            await setScreenUnLockWallpaperService(miscMessage.SET_WALLPAPER_CHANGE_ON_UNLOCK);
        } else if (data.changeWallPaperCondition == miscMessage.WALLPAPER_TIME_SPECIFIC) {
            const millisValue = moment(data.changeWallPaperSpecificTime).valueOf();
            await setupWallPaperChanger(miscMessage.SET_ALARM_MANAGER, data, stringConstants.EMPTY + millisValue, wallPaperChangeSettings,
                setWallPaperChangeSettings);
            await setScreenUnLockWallpaperService(miscMessage.SET_WALLPAPER_CHANGE_ON_UNLOCK);
        }
    };

    const disableWallPaperSettings = useCallback(async () => {
        await resetWallpaperSettings();
        wallPaperChangeSettings.changeCondition = stringConstants.EMPTY;
        wallPaperChangeSettings.changeInterval = stringConstants.EMPTY;
        wallPaperChangeSettings.changeSpecificTime = stringConstants.EMPTY;
        wallPaperChangeSettings.scheduleWallPaperEnabled = false;
        wallPaperChangeSettings.isAlarmActive = false;
        setValue(fieldControllerName.CHANGE_WALLPAPER_CONDITION, wallPaperChangeSettings.changeCondition);
        setValue(fieldControllerName.CHANGE_WALLPAPER_INTERVALS, wallPaperChangeSettings.changeInterval);
        setWallPaperChangeSettings({ ...wallPaperChangeSettings });
    });

    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.backGroundColorBlack]}>
            <Text style={[SDGenericStyles.ft14, SDGenericStyles.placeHolderTextColor, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.padding20]}>
                {wallPaperChangeSettings.isAlarmActive && alertTextMessages.AUTO_WALLPAPER_ENABLED || alertTextMessages.AUTO_WALLPAPER_NOT_ENABLED}
            </Text>
            <View style={[SDGenericStyles.paddingHorizontal25, SDGenericStyles.paddingVertical5]}>
                <SDSwitchInputView inputName={actionButtonTextConstants.SCHEDULE_WALLPAPER_CHANGE} falseColor={colors.SDOM_PLACEHOLDER} trueColor={colors.SDOM_YELLOW} thumbColor={colors.TEXT_WHITE} iosThumbColor={colors.TEXT_WHITE}
                    value={wallPaperChangeSettings.scheduleWallPaperEnabled} textValue={miscMessage.CHANGE_WALLPAPER_AUTOMATICALLY_TEXT} onSubmit={onSubmit} disableWallPaperSettings={disableWallPaperSettings} handleSubmit={handleSubmit} />

                <SDDropDownView inputName={fieldControllerName.CHANGE_WALLPAPER_CONDITION} control={control} selectedLabelStyle={SDGenericStyles.textColorWhite} extraStyles={SDGenericStyles.textBoxGray}
                    containerStyle={userAuthStyles.dropDownPickerStyle} dropDownPickerStyle={glancePostStyles.addPostDropDownStyle} placeHolderText={placeHolderText.WALLPAPER_CHANGER_CONDITION}
                    defaultValue={wallPaperChangeSettings.changeCondition && wallpaperChangerConditions.find(condition => condition.value == wallPaperChangeSettings.changeCondition).value ||
                        wallpaperChangerConditions.find(condition => condition.value == numericConstants.MINUS_ONE).value} setState={setWallPaperChangeSettings} state={wallPaperChangeSettings}
                    list={wallpaperChangerConditions} globalTextStyle={[SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.ft16, SDGenericStyles.textColorWhite]} formState={formState}
                    rules={formRequiredRules.changeWallPaperConditionRule} />
                {
                    wallPaperChangeSettings.changeCondition == miscMessage.WALLPAPER_TIME_INTERVAL &&
                    <SDDropDownView inputName={fieldControllerName.CHANGE_WALLPAPER_INTERVALS} control={control} selectedLabelStyle={SDGenericStyles.textColorWhite} formState={formState}
                        containerStyle={userAuthStyles.dropDownPickerStyle} dropDownPickerStyle={glancePostStyles.addPostDropDownStyle} placeHolderText={placeHolderText.WALLPAPER_CHANGER_INTERVALS}
                        defaultValue={wallPaperChangeSettings.changeInterval && wallpaperChangerIntervals.find(interval => interval.value == wallPaperChangeSettings.changeInterval).value ||
                            wallpaperChangerIntervals.find(interval => interval.value == numericConstants.MINUS_ONE).value} list={wallpaperChangerIntervals} extraStyles={SDGenericStyles.textBoxGray}
                        globalTextStyle={[SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.ft16, SDGenericStyles.textColorWhite]} rules={formRequiredRules.changeWallPaperIntervalsRule} />
                }
                {
                    wallPaperChangeSettings.changeCondition == miscMessage.WALLPAPER_TIME_SPECIFIC &&
                    <SDDateTimePickerView inputName={fieldControllerName.CHANGE_WALLPAPER_SPECIFIC_TIME} control={control} rules={formRequiredRules.timePickerFormRule} display={keyBoardTypeConst.DEFAULT}
                        defaultValue={wallPaperChangeSettings.changeSpecificTime || stringConstants.EMPTY} formState={formState} mode={miscMessage.TIME} placeHolderText={placeHolderText.WALLPAPER_CHANGER_SPECIFIC_TIME}
                        icon={<CalenderIcon width={numericConstants.EIGHTEEN} height={numericConstants.EIGHTEEN} stroke={colors.SDOM_PLACEHOLDER} />} />
                }
            </View>
            {
                wallPaperChangeSettings.scheduleWallPaperEnabled && wallPaperChangeSettings.changeCondition &&
                <View style={SDGenericStyles.paddingVertical20}>
                    <TouchableOpacity activeOpacity={.7} style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.backgroundColorYellow]} onPress={async () => await disableWallPaperSettings()}>
                        <Text style={[userAuthStyles.primaryActionButtonButtonText, SDGenericStyles.fontFamilyRobotoRegular]}>
                            {actionButtonTextConstants.CLEAR_ALL}
                        </Text>
                    </TouchableOpacity>
                </View>
            }
            <WallPaperChangeAutoStartModal wallPaperChangeSettings={wallPaperChangeSettings} setWallPaperChangeSettings={setWallPaperChangeSettings} />
        </View>
    );
}