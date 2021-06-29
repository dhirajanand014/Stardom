import React, { useCallback } from 'react';
import { View, Modal, Text, TouchableOpacity, Image, TouchableNativeFeedback } from 'react-native';
import { actionButtonTextConstants, alertTextMessages, miscMessage, postCountTypes, requestConstants } from '../../constants/Constants';
import { setWallpaperByOption, resetModalState } from '../../helper/Helper';
import { colors, glancePostStyles, SDGenericStyles } from '../../styles/Styles';

export const SDWallpaperModal = React.memo(({ postDetailsState, setPostDetailsState }) => {

    const post_modal_close_icon = require('../../assets/post_modal_close_icon.png');

    const setWallPaperCallback = useCallback(async (option) => {
        await setWallpaperByOption(postCountTypes.POST_WALLPAPERS_KEY, option, postDetailsState, setPostDetailsState);
        resetModalState(postDetailsState, setPostDetailsState, miscMessage.POST_WALLPAPER_MODAL);
    });

    return (
        <Modal style animationType={`fade`} transparent={true} visible={postDetailsState.wallpaperModal}
            onRequestClose={() => resetModalState(postDetailsState, setPostDetailsState,
                miscMessage.POST_WALLPAPER_MODAL)}>
            <View style={[SDGenericStyles.fill, SDGenericStyles.justifyContentCenter, SDGenericStyles.alignItemsCenter]}>
                <View style={[glancePostStyles.wallpaperModalView, SDGenericStyles.paddingBottom5]}>
                    <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.justifyContentSpaceBetween,
                    SDGenericStyles.width100pct]}>
                        <View style={[SDGenericStyles.paddingTop10, SDGenericStyles.paddingBottom5, SDGenericStyles.paddingHorizontal10]}>
                            <Text style={[SDGenericStyles.ft18, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.colorBlack,
                            SDGenericStyles.paddingLeft10]}>
                                {alertTextMessages.CONFIRM_TITLE.toUpperCase()}
                            </Text>
                            <View style={SDGenericStyles.paddingTop5}>
                                <View style={[glancePostStyles.reportAbuseModalTitleDivider, SDGenericStyles.backGroundColorBlack]} />
                            </View>
                        </View>
                        <TouchableOpacity style={glancePostStyles.postWallpaperModalButton}
                            onPress={() => resetModalState(postDetailsState, setPostDetailsState, miscMessage.POST_WALLPAPER_MODAL)} >
                            <Image style={glancePostStyles.icon_wallpaper_modal_close} source={post_modal_close_icon} />
                        </TouchableOpacity>
                    </View>
                    <View style={[SDGenericStyles.paddingHorizontal10, SDGenericStyles.width100pct, SDGenericStyles.justifyItemsStart]}>
                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(colors.SDOM_PLACEHOLDER, false)} useForeground={true}
                            onPress={async () => await setWallPaperCallback(requestConstants.WALLPAPER_HOME_SCREEN)}>
                            <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.alignItemsCenter, SDGenericStyles.paddingVertical5]}>
                                <Image source={require(`../../assets/wallpaper_home_screen_icon.png`)} style={[glancePostStyles.icon_wallpaper_modal, SDGenericStyles.alignItemsCenter]} />
                                <Text style={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.paddingHorizontal10]}>
                                    {actionButtonTextConstants.WALLPAPER_HOME_SCREEN}
                                </Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(colors.SDOM_PLACEHOLDER, false)} useForeground={true}
                            onPress={async () => await setWallPaperCallback(requestConstants.WALLPAPER_LOCK_SCREEN)}>
                            <View style={[SDGenericStyles.paddingHorizontal2, SDGenericStyles.rowFlexDirection, SDGenericStyles.alignItemsCenter, SDGenericStyles.paddingVertical5]}>
                                <Image source={require(`../../assets/wallpaper_lock_screen_icon.png`)} style={[glancePostStyles.icon_wallpaper_modal, SDGenericStyles.alignItemsCenter]} />
                                <Text style={[SDGenericStyles.marginHorizontalNeg2, SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.paddingHorizontal10]}>
                                    {actionButtonTextConstants.WALLPAPER_LOCK_SCREEN}
                                </Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(colors.SDOM_PLACEHOLDER, false)} useForeground={true}
                            onPress={async () => await setWallPaperCallback(requestConstants.WALLPAPER_BOTH_SCREENS)}>
                            <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.alignItemsCenter, SDGenericStyles.paddingVertical5]}>
                                <Image source={require(`../../assets/wallpaper_both_screen_icon.png`)} style={[glancePostStyles.icon_wallpaper_modal, SDGenericStyles.alignItemsCenter]} />
                                <Text style={[SDGenericStyles.ft16, SDGenericStyles.fontFamilyRobotoRegular, SDGenericStyles.paddingHorizontal10]}>
                                    {actionButtonTextConstants.WALLPAPER_BOTH_SCREENS}
                                </Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </View>
        </Modal>
    )
});