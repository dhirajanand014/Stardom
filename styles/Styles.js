import { StyleSheet } from 'react-native'
import { colorConstants, isAndroid, isIOS, width, height, numericConstants } from '../constants/Constants';

export const SDGenericStyles = StyleSheet.create({
    fill: {
        flex: 1,
    },
    fill_half: {
        flex: 0.5,
    },
    fill_75: {
        flex: 0.75
    },
    elevation3: {
        elevation: 3
    },
    elevation8: {
        elevation: 8
    },
    iconStyle: {
        width: numericConstants.TWENTY_EIGHT,
        height: numericConstants.TWENTY_EIGHT
    },
    lockUnlockIconStyle: {
        width: numericConstants.TWENTY,
        height: numericConstants.TWENTY
    },
    privateLockUnlockIconStyle: {
        width: numericConstants.FIFTY,
        height: numericConstants.FIFTY
    },
    tintColorWhite: {
        tintColor: `#f4f4f4`
    },
    tintColorYellow: {
        tintColor: `#eabe05`
    },
    tintColorGreen: {
        tintColor: `#7FFF00`
    },
    cameraIconStyle: {
        width: 50,
        height: 50
    },
    menuIconStyle: {
        width: numericConstants.EIGHTEEN,
        height: numericConstants.EIGHTEEN
    },
    right0: {
        right: 0
    },
    top1: {
        top: 1
    },
    top8: {
        top: 8
    },
    right8: {
        right: 8
    },
    bottom0: {
        bottom: 0
    },
    bottom80: {
        bottom: 80
    },
    positionAbsolute: {
        position: 'absolute'
    },
    fontFamilyNormal: {
        fontFamily: isAndroid && `normal` || `System`
    },
    fontFamilyRobotoRegular: {
        fontFamily: `stardom_roboto_regular`
    },
    fontFamilyRobotoMedium: {
        fontFamily: `stardom_roboto_medium`
    },
    fontFamilyRobotoBold: {
        fontFamily: `stardom_roboto_bold`
    },
    fontFamilyRoman: {
        fontFamily: `wallpiper_roman_font`
    },
    fontFamilyBold: {
        fontFamily: `wallpiper_bold_font`
    },
    mr12: {
        marginRight: 12,
    },
    mt3: {
        marginTop: 3,
    },
    mt5: {
        marginTop: 5
    },
    mtMinus10: {
        marginTop: -10
    },
    mt12: {
        marginTop: 12,
    },
    mt20: {
        marginTop: 20,
    },
    mt24: {
        marginTop: 24,
    },
    textALignVerticalTop: {
        textAlignVertical: `top`
    },
    mt36: {
        marginTop: 36,
    },
    ht36: {
        height: 36,
    },
    mv30: {
        marginVertical: 30,
    },
    mb15: {
        marginBottom: 15,
    },
    mb5: {
        marginBottom: 5,
    },
    mb20: {
        marginBottom: 20,
    },
    mb25: {
        marginBottom: 25,
    },
    mb30: {
        marginBottom: 30,
    },
    mb40: {
        marginBottom: 40,
    },
    width100: {
        width: 100
    },
    width100pct: {
        width: `100%`
    },
    width120: {
        width: 120
    },
    width130: {
        width: 130
    },
    ft7: {
        fontSize: 7
    },
    ft9: {
        fontSize: 9
    },
    ft10: {
        fontSize: 10
    },
    ft12: {
        fontSize: 12
    },
    ft14: {
        fontSize: 14
    },
    ft16: {
        fontSize: 16
    },
    ft18: {
        fontSize: 18
    },
    ft20: {
        fontSize: 20
    },
    ft24: {
        fontSize: 24
    },
    ft25: {
        fontSize: 25
    },
    ft30: {
        fontSize: 30
    },
    ft42: {
        fontSize: 42
    },
    ftWeight700: {
        fontWeight: '700'
    },
    ftWeight100: {
        fontWeight: '100'
    },
    marginBottom4: {
        marginBottom: 4
    },
    marginBottom8: {
        marginBottom: 8
    },
    marginRight4: {
        marginRight: 4
    },
    marginRight10: {
        marginRight: 10
    },
    marginRight15: {
        marginRight: 15
    },
    marginBottom10: {
        marginBottom: 10
    },
    marginBottom15: {
        marginBottom: 15
    },
    marginVertical2: {
        marginVertical: 2
    },
    marginVertical10: {
        marginVertical: 10
    },
    zIndex10: {
        zIndex: 10
    },
    mv5: {
        marginVertical: 5
    },
    mv8: {
        marginVertical: 8
    },
    mv10: {
        marginVertical: 10
    },
    mv15: {
        marginVertical: 15
    },
    mv20: {
        marginVertical: 20
    },
    borderRightWidth1: {
        borderRightWidth: 1
    },
    borderColorBlack: {
        borderColor: `#fff`
    },
    placeHolderTextColor: {
        color: `#969696`
    },
    borderWidth2: {
        borderWidth: 2
    },
    borderWidth3: {
        borderWidth: 3
    },
    borderBottomWidthpt5: {
        borderBottomWidth: 0.5
    },
    justifyContentSpaceBetween: {
        justifyContent: 'space-between'
    },
    negativeText: {
        color: '#f06159',
    },
    centerAlignedText: {
        textAlign: 'center',
    },
    textItalic: {
        fontStyle: 'italic'
    },
    leftAlignedText: {
        textAlign: 'left',
    },
    alignItemsEnd: {
        alignItems: 'flex-end'
    },
    alignSelfEnd: {
        alignSelf: 'flex-end'
    },
    textBlackColor: {
        color: '#0b0b0b'
    },
    rowFlexDirection: {
        flexDirection: `row`
    },
    justifyContentCenter: {
        justifyContent: 'center'
    },
    alignSelfStart: {
        alignSelf: `flex-start`
    },
    marginTop8: {
        marginTop: 8
    },
    borderRadius5: {
        borderRadius: 5
    },
    borderRadius10: {
        borderRadius: 10
    },
    paddingStart10: {
        paddingStart: 10
    },
    paddingEnd10: {
        paddingEnd: 10
    },
    padding4: {
        padding: 4
    },
    padding5: {
        padding: 5
    },
    padding8: {
        padding: 8
    },
    padding20: {
        padding: 20
    },
    padding12: {
        padding: 12
    },
    opacitypt6: {
        opacity: 0.6
    },
    opacitypt7: {
        opacity: 0.7
    },
    marginHorizontal10: {
        marginHorizontal: 10
    },
    padding10: {
        padding: 10
    },
    paddingTop5: {
        paddingTop: 5
    },
    paddingTop10: {
        paddingTop: 10
    },
    paddingTop16: {
        paddingTop: 16
    },
    paddingTop20: {
        paddingTop: 20
    },
    paddingTop30: {
        paddingTop: 30
    },
    paddingTop40: {
        paddingTop: 40
    },
    paddingTop50: {
        paddingTop: 50
    },
    paddingTop80: {
        paddingTop: 80
    },
    paddingTop100: {
        paddingTop: 100
    },
    marginHorizontalNeg2: {
        marginHorizontal: -2
    },
    paddingHorizontal2: {
        paddingHorizontal: 2
    },
    paddingHorizontal5: {
        paddingHorizontal: 5
    },
    paddingHorizontal7: {
        paddingHorizontal: 7
    },
    paddingHorizontal10: {
        paddingHorizontal: 10
    },
    paddingHorizontal15: {
        paddingHorizontal: 15
    },
    paddingHorizontal20: {
        paddingHorizontal: 20
    },
    paddingHorizontal25: {
        paddingHorizontal: 25
    },
    paddingHorizontal30: {
        paddingHorizontal: 30
    },
    paddingHorizontal65: {
        paddingHorizontal: 65
    },
    bottom6: {
        bottom: 6
    },
    bottom8: {
        bottom: 8
    },
    bottom15: {
        bottom: 15
    },
    bottom18: {
        bottom: 18
    },
    bottom30: {
        bottom: 30
    },
    padding1: {
        padding: 1
    },
    marginTop1: {
        marginTop: 1
    },
    paddingBottom3: {
        paddingBottom: 3
    },
    paddingBottom5: {
        paddingBottom: 5
    },
    paddingBottom10: {
        paddingBottom: 10
    },
    paddingBottom20: {
        paddingBottom: 20
    },
    paddingBottom30: {
        paddingBottom: 30
    },
    paddingBottom50: {
        paddingBottom: 50
    },
    paddingBottom60: {
        paddingBottom: 60
    },
    paddingBottom150: {
        paddingBottom: 150
    },
    paddingVertical2: {
        paddingVertical: 2
    },
    paddingVertical3: {
        paddingVertical: 3
    },
    paddingVertical5: {
        paddingVertical: 5
    },
    paddingVertical10: {
        paddingVertical: 10
    },
    paddingVertical20: {
        paddingVertical: 20
    },
    paddingVertical12: {
        paddingVertical: 12
    },
    paddingVertical14: {
        paddingVertical: 14
    },
    paddingVertical50: {
        paddingVertical: 50
    },
    textLeftAlign: {
        textAlign: 'left'
    },
    ml_95: {
        marginLeft: 95
    },
    textCenterAlign: {
        textAlign: 'center'
    },
    textRightAlign: {
        textAlign: 'right'
    },
    alignItemsCenter: {
        alignItems: 'center'
    },
    colorBlue: {
        color: '#3543bf'
    },
    colorGrey: {
        color: '#555555'
    },
    colorBlack: {
        color: `#3d3d3d`
    },
    textColorSDOMBlack: {
        color: `#1b1f2b`
    },
    backGroundColorGreen: {
        backgroundColor: `#7FFF00`
    },
    backGroundColorRed: {
        backgroundColor: `#ff4e4e`
    },
    backGroundColorBlack: {
        backgroundColor: `#1b1f2b`
    },
    backGroundTextBoxGrey: {
        backgroundColor: `#969696`
    },
    backGroundColorGray: {
        backgroundColor: `#484a55`
    },
    backGroundColorLightGrey: {
        backgroundColor: `lightgrey`
    },
    colorYellow: {
        color: '#eabe05'
    },
    textBoxGray: {
        backgroundColor: `#343642`
    },
    textColorWhite: {
        color: `#f4f4f4`
    },
    textColorPink: {
        color: `#dd5f93`
    },
    paddingHorizontal12: {
        paddingHorizontal: 12
    },
    paddingVertical16: {
        paddingVertical: 16
    },
    padding4: {
        padding: 4
    },
    paddingLeft5: {
        paddingLeft: 5
    },
    paddingLeft10: {
        paddingLeft: 10
    },
    alignItemsStart: {
        alignItems: 'flex-start'
    },
    justifyItemsStart: {
        justifyContent: 'flex-start'
    },
    justifyItemsEnd: {
        justifyContent: 'flex-end'
    },
    colorGreen: {
        color: '#7FFF00'
    },
    dropDownBackGround: {
        backgroundColor: `#1b1f2b`,
        zIndex: 10
    },
    ml_3: {
        marginLeft: 3
    },
    ml_8: {
        marginLeft: 8
    },
    ml_24: {
        marginLeft: 24
    },
    ml_40: {
        marginLeft: 40
    },
    marginHorizontal4: {
        marginHorizontal: 4
    },
    opacitypt2: {
        opacity: .2
    },
    width1pt08: {
        width: width / 1.08
    },
    backgroundColorWhite: {
        backgroundColor: 'white'
    },
    backgroundColorYellow: {
        backgroundColor: `#eabe05`
    },
    colorWhite: {
        color: '#fafafa'
    },
    borderRadius20: {
        borderRadius: 20
    },
    borderRadius28: {
        borderRadius: 28
    },
    height63: {
        height: 63
    },
    height100: {
        height: 100
    },
    height150: {
        height: 150
    },
    bottom150: {
        bottom: 150
    },
    bottom180: {
        bottom: 180
    },
    bottom200: {
        bottom: 200
    },
    bottom210: {
        bottom: 210
    },
    bottom220: {
        bottom: 220
    },
    paddingRight5: {
        paddingRight: 5
    },
    paddingRight10: {
        paddingRight: 10
    },
    paddingRight15: {
        paddingRight: 15
    }
});

export const glancePostStyles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        position: 'absolute',
        width: width,
        paddingLeft: 15,
        bottom: 0,
        justifyContent: 'flex-end',
    },
    titleName: {
        fontSize: 18,
        fontFamily: 'stardom_roboto_regular',
        display: 'flex',
        color: 'white',
    },
    backgroundRoundColor_description: {
        paddingRight: 1,
        paddingTop: 6,
        alignItems: 'center',
        width: 29,
        height: 29,
        backgroundColor: 'rgba(0,0,0,0.25)',
        borderRadius: 16,
    },
    backgroundRoundColor_report_abuse: {
        paddingRight: 1,
        paddingTop: 3,
        alignItems: 'center',
        width: 29,
        height: 29,
        backgroundColor: 'rgba(0,0,0,0.25)',
        borderRadius: 16,
    },
    likesBackgroundRoundColor: {
        paddingTop: 4,
        alignItems: 'center',
        width: 27,
        height: 27,
        backgroundColor: 'rgba(0,0,0,0.25)',
        borderRadius: 16,
    },
    setWallPaperBackgroundRoundColor: {
        paddingTop: 6,
        alignItems: 'center',
        width: 29,
        height: 29,
        backgroundColor: 'rgba(0,0,0,0.25)',
        borderRadius: 16,
    },
    backgroundRoundColor: {
        paddingRight: 1,
        paddingTop: 5,
        alignItems: 'center',
        width: 27,
        height: 27,
        backgroundColor: 'rgba(0,0,0,0.25)',
        borderRadius: 16,
    },
    postProfileName: {
        marginRight: 1,
        display: 'flex',
        textShadowOffset: {
            width: 2,
            height: 2
        },
        textShadowColor: `#fafafa`
    },
    postProfileNameBy: {
        marginRight: 4,
        display: 'flex',
        textShadowOffset: {
            width: 2,
            height: 2
        },
        textShadowColor: `#fafafa`
    },
    postUserName: {
        marginRight: 4,
        display: 'flex',
    },
    postCategoriesIn: {
        display: 'flex',
    },
    descriptionText: {
        fontSize: 14,
        textAlign: 'auto',
        color: 'black',
    },
    descriptionTextNACenter: {
        fontSize: 14,
        textAlign: 'center',
        color: 'black',
    },
    icon_post_like: {
        width: 18,
        height: 18
    },
    icon_post_search: {
        width: 18,
        height: 18
    },
    searchInputBox: {
        flex: 1,
        flexDirection: 'row',
        height: height / 25,
        alignItems: 'center',
        position: 'absolute',
        justifyContent: 'center',
        top: 0,
        width: width - 80,
        right: width - 410,
        bottom: -20,
    },
    close_button_search_input: {
        justifyContent: 'center',
        backgroundColor: '#e4e6eb',
        alignItems: 'center',
        flexDirection: 'row',
        right: 30,
    },
    search_input_close_input_icon: {
        width: 20,
        height: 20
    },
    search_content: {
        height: height / 3.4,
        position: 'absolute',
        width: width / 2,
        top: 25,
        right: 0,
        zIndex: 999,
        elevation: 4
    },
    search_content_view: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 16
    },
    search_content_post_selection: {
        paddingRight: 50,
        borderBottomStartRadius: 16,
        borderBottomEndRadius: 16
    },
    search_content_post_title: {
        fontFamily: 'stardom_roboto_regular'
    },
    search_input_text: {
        flex: 1,
        height: 40,
        backgroundColor: '#e4e6eb',
        borderRadius: 20,
        paddingHorizontal: 20,
        fontFamily: 'stardom_roboto_regular',
        fontSize: 15
    },
    icon_post_description: {
        width: 16,
        height: 16
    },
    icon_post_report_abuse: {
        width: 18,
        height: 18
    },
    icon_post_details: {
        width: 18,
        height: 18,
    },
    icon_post_share: {
        width: 18,
        height: 18
    },
    icon_external_link: {
        width: 23,
        height: 23
    },
    smallButtonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 6,
    },
    postTitleAndProfileStyle: {
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    searchIconContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'absolute',
        top: 10,
        width: 32,
        right: 50,
        height: 32
    },
    modalContainer: {
        flex: 1,
        alignItems: 'flex-end',
        margin: 45
    },
    modalView: {
        marginRight: 20,
        backgroundColor: "white",
        top: 30,
        maxHeight: 250,
        width: 300,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    wallpaperModalView: {
        marginRight: 20,
        backgroundColor: "white",
        maxHeight: 180,
        width: 260,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    dropDownStyle: {
        backgroundColor: colorConstants.GREY,
        justifyContent: 'center',
        width: width / 1.15,
        height: 50
    },
    addPostDropDownStyle: {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: 'center',
        width: width / 1.15
    },
    verifiedIconStyle: {
        width: 16,
        height: 16
    },
    radioButtonModalView: {
        marginRight: 20,
        backgroundColor: "white",
        padding: 15,
        maxHeight: 700,
        width: 300,
        display: 'flex',
        top: 30,
        flexDirection: 'column',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    category_selection: {
        alignItems: "flex-end",
        position: "absolute",
        zIndex: 100,
        top: 10,
        left: 5,
        padding: 10
    },
    category_selection_image: {
        width: 25,
        height: 25
    },
    editProfileAbsolute: {
        top: 0,
        bottom: 0,
        right: 5
    },
    modalHideText: {
        color: "white",
        fontFamily: 'stardom_roboto_regular',
        textAlign: "center",
        fontSize: 15
    },
    reportAbuseCancelText: {
        fontSize: 14,
        textDecorationLine: 'underline',
        fontFamily: 'stardom_roboto_regular'
    },
    reportAbuseModalTitleDivider: {
        width: width / 1.66,
        height: 1.5,
    },
    shimmerViewInit: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white"
    },
    closeReportAbuseModal: {
        position: 'absolute',
        top: 0,
        right: 0,
        marginHorizontal: 12,
        marginVertical: 10,
        elevation: 3,
    },
    icon_modal_close: {
        height: 22,
        width: 22
    },
    icon_wallpaper_modal_close: {
        height: 20,
        width: 20
    },
    icon_wallpaper_modal: {
        height: 25,
        width: 25
    },
    glanceTopIcons: {
        paddingTop: 4,
        paddingLeft: 2,
        paddingBottom: 1,
        paddingRight: 2
    },
    postDescriptionModalButton: {
        top: 20,
        right: 40,
        elevation: 3,
    },
    postWallpaperModalButton: {
        top: 10,
        right: 30,
        elevation: 3,
    },
    reportAbuseSubmitButton: {
        borderRadius: 18,
        marginTop: 15,
        padding: 8,
        alignSelf: 'flex-end',
        elevation: 3,
        backgroundColor: "#fcc200"
    },
    reportAbuseSubmitButtonDisabled: {
        opacity: .4,
        borderRadius: 18,
        marginTop: 15,
        padding: 8,
        alignSelf: 'flex-end',
        elevation: 3,
        backgroundColor: "#fcc200"
    },
    bottomPostSubmitButton: {
        right: 0,
        left: 0
    },
    cancelReportAbuse: {
        position: 'absolute',
        right: 100,
        bottom: 25,
        marginTop: 15,
        elevation: 3,
    },
    reportAbuseModalContainer: {
        paddingBottom: 25,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    reportAbusesFetchLoading: {
        alignItems: 'center',
        marginBottom: 25,
        justifyContent: 'center',
        padding: 8
    },
    reportAbuseRadioCircle: {
        height: 20,
        width: 20,
        padding: 8,
        borderRadius: 20,
        marginRight: 10,
        borderWidth: 2,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    radioCircle: {
        height: 20,
        width: 20,
        padding: 8,
        borderRadius: 20,
        marginRight: 10,
        borderWidth: 2,
        borderColor: '#fafafa',
        alignItems: 'center',
        justifyContent: 'center'
    },
    reportAbuseSelectedRb: {
        width: 10,
        height: 10,
        borderRadius: 40,
        backgroundColor: 'black',
    },
    selectedRb: {
        width: 10,
        height: 10,
        borderRadius: 40,
        backgroundColor: '#fafafa',
    },
    tourGuideStyle: {
        height: 130,
        width: 180,
    },
    preloaderStyle: {
        width: 50,
        height: 50
    },
    addPostSelectText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#abb4bd'
    },
    addPostView: {
        borderWidth: 1,
        borderRadius: 1,
        borderStyle: 'dashed',
        borderColor: `#969696`
    },
    bottomSheetHeader: {
        shadowColor: `#969696`,
        shadowOffset: { width: - 1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 10
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        marginBottom: 10
    },
    bottomSheetPanelButton: {
        padding: 13,
        width: width / 1.1,
        borderRadius: 10,
        marginVertical: 7,
    },
    postButtonStyle: {
        borderRadius: 20,
        backgroundColor: colorConstants.YELLOW,
        paddingVertical: 10
    },
    addPostDetailsTitleDivider: {
        width: width / 1.15,
        height: 1,
    },
    addPostDetailInputView: {
        paddingVertical: isIOS && 5 || 2,
        justifyContent: 'center',
        width: width / 1.10
    },
    addPostDetailInputViewStyle: {
        marginTop: 16
    },
    addPostDetailsInputError: {
        color: '#ff4e4e',
        marginVertical: isIOS && 5 || 2,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    addPostDetailUnderlineTextInput: {
        flex: 1,
        paddingLeft: 3,
        justifyContent: 'center',
        marginTop: isIOS && 0 || -25,
        paddingVertical: isIOS && 1 || 1,
        borderBottomWidth: 1,
        borderBottomColor: `#fcc200`,
        fontSize: 16,
        color: '#05375a'
    },
    addPostDetailsStyle: {
        borderWidth: 0.5,
        borderColor: '#969696'
    },
    addPostCategoriesStyle: {
        borderWidth: 1,
        borderColor: '#fafafa',
        borderRadius: 30,
    },
    addPostDetailsCategoryImageStyle: {
        width: 40,
        height: 40,
        borderRadius: 58,
        alignItems: 'flex-start',
        marginLeft: 1
    },
    selectedPostDetailsCategoryImageStyle: {
        width: 40,
        height: 40,
        borderRadius: 58,
        alignItems: 'flex-start',
        tintColor: `black`,
        marginLeft: 1
    },
    profileBioTextStyle: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: `#fafafa`
    },
    addPostEditIconsStyle: {
        top: height / 4.4,
        right: 18
    },
    loaderModalView: {
        height: 120,
        width: 100,
        borderRadius: 10,
        width: width / 3,
        elevation: 5
    },
    overlayImage: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgb(0,0,0)',
        opacity: 0.7
    },
    overlayImageProfile: {
        backgroundColor: 'rgb(0,0,0)',
        opacity: 0.7
    },
    postSearchDivider: {
        height: 1,
        backgroundColor: '#e6e4eb'
    }
});

export const categoryViewStyles = StyleSheet.create({
    saveButtonContainer: {
        paddingVertical: 8,
        borderRadius: 20,
        width: width / 3,
    },
    bottomButtonLayout: {
        height: 63
    },
    select_all_categories: {
        height: 18,
        width: 18,
    },
    category_selected_check: {
        height: 24,
        width: 24,
        tintColor: `rgba(0,0,0,255)`
    },
    buttonBottom: {
        top: 0,
        right: 0,
        left: 0
    }
})

export const flatListItemStyles = StyleSheet.create({
    headerText: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        fontFamily: "stardom_roboto_regular"
    },
    checkBoxSelected: {
        width: '100%',
        height: '100%',
        borderColor: '#fcc200',
        borderWidth: 3,
        overflow: 'hidden',
        shadowColor: '#fcc200',
        shadowRadius: 18,
        borderRadius: 8,
        shadowOpacity: .7
    },
    postImageSelected: {
        width: '100%',
        height: '100%',
        borderWidth: 3,
        overflow: 'hidden',
        shadowColor: '#969696',
        shadowRadius: 18,
        borderRadius: 8,
        shadowOpacity: .7
    },
    imageBackGround: {
        width: '100%',
        height: '100%',
        overflow: 'hidden'
    },
    addPostCardSurface: {
        height: 122,
        width: 130,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        left: 5,
        right: 100,
        paddingHorizontal: 2,
        borderRadius: 8,
    },
    cardSurface: {
        height: 115,
        width: 170,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        left: 5,
        right: 100,
        marginVertical: 10,
        borderRadius: 8,
    },
    userProfileCardSurface: {
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 2,
        marginVertical: 2,
    },
    textsView: {
        flex: 1,
        flexDirection: 'column',
        top: 2,
        paddingTop: 2,
        left: 10
    },
});

export const introStyles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export const userAuthStyles = StyleSheet.create({
    mobileCountryCode: {
        marginHorizontal: 3,
        paddingHorizontal: 5,
        color: '#05375a',
        fontSize: 16,
        paddingLeft: 5
    },
    otpInputStyle: {
        fontSize: 18,
        width: '100%'
    },
    otpFieldRows: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    otpFieldRows: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    otpContainerStyle: {
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 5,
        marginHorizontal: 6,
        padding: 8,
    },
    otpErrorMessageStyle: {
        marginVertical: 20,
        color: '#ff4e4e',
        alignSelf: 'center',
        marginBottom: 6,
        marginHorizontal: 15
    },
    otpInputStyle: {
        padding: 0,
    },
    otpResendTimerText: {
        fontSize: 12,
    },
    otpResendLinkStyle: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
        borderWidth: 1,
        borderRadius: 3,
        alignSelf: 'flex-start',
    },
    otpResendTextStyle: {
        textTransform: 'uppercase',
        fontSize: 12,
        color: '#3543bf',
    },
    otpResendButton: {
        alignItems: 'center',
        width: '100%',
        marginTop: 16,
    },
    otpResendButtonText: {
        color: '#fe7d32',
        textTransform: 'none',
        textDecorationLine: 'underline',
    },
    otpResendDisabled: {
        opacity: 0.5,
    },
    otpVerifyButton: {
        alignItems: 'center',
        elevation: 8,
        marginTop: 20,
    },
    registerButtonView: {
        alignSelf: 'center',
        paddingVertical: 20,
        width: width / 2,
        elevation: 3,
        paddingBottom: 50
    },
    menuLoginButton: {
        alignSelf: 'center',
        paddingVertical: 10,
        width: width / 1.8,
        elevation: 3,
        paddingBottom: 15
    },
    menuRegisterButton: {
        alignSelf: 'center',
        width: width / 1.8,
        elevation: 3,
        paddingBottom: 18
    },
    menuRightCountView: {
        padding: 10,
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0
    },
    menu_close_icon_style: {
        width: 22,
        height: 22,
        tintColor: `white`
    },
    registrationConfirmationView: {
        alignSelf: 'center',
        paddingVertical: 20,
        width: width / 2,
        paddingBottom: 50
    },
    registerationDetailsView: {
        alignSelf: 'center',
        paddingVertical: 8,
        width: width / 2,
        paddingBottom: 8
    },
    primaryActionButtonButtonText: {
        fontSize: 18,
        textAlign: 'center',
        borderRadius: 10,
        paddingVertical: 8,
        color: '#1b1f2b'
    },
    signUpFooter: {
        flex: 3,
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    signInUserInputView: {
        paddingVertical: 1,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    userInput: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: `#343642`,
        borderRadius: 8,
        width: width / 1.15,
    },
    searchUserInput: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: `#343642`,
        borderRadius: 8,
    },
    errorInputBorder: {
        borderWidth: 2,
        borderColor: '#ff4e4e',
    },
    noErrorInputBorder: {
        borderWidth: 2,
        borderColor: '#7FFF00',
    },
    normalInputBorder: {
        borderWidth: 2,
        borderColor: `#343642`
    },
    formInputError: {
        color: '#ff4e4e',
        marginBottom: 5,
        marginHorizontal: 15
    },
    formInputNoError: {
        color: '#7FFF00',
        marginBottom: 6,
        marginHorizontal: 15
    },
    textInputStyle: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 12,
        paddingLeft: 3,
        textAlign: 'left'
    },
    signInCreateAccount: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    registerLink: {
        paddingHorizontal: 1
    },
    registerDescription: {
        color: '#969696',
        textAlign: 'center',
        fontSize: 16,
        width: width / 1.15,
        textAlign: 'center',
    },
    registrationUserDropDownView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    dropDownPickerStyle: {
        justifyContent: 'center',
        width: width / 1.15,
        height: 50
    },
    listingDetailsView: {
        flex: 1,
        width: width / 1.06,
        height: height / 1.15,
        marginBottom: 15,
        marginTop: 15,
        marginRight: 10,
        marginLeft: 10,
        elevation: 3,
        borderRadius: 8,
        shadowRadius: 18,
        shadowOpacity: .7,
        alignItems: 'center',
        backgroundColor: 'rgba(61,61,61,.7)',
        opacity: .7,
        position: 'absolute',
        top: 0,
    },
});

export const errorBoundaryStyles = StyleSheet.create({
    content: {
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 10
    },
    errorImageStyle: {
        alignSelf: 'center',
        width: 350,
        height: 380,
    },
    textMessage2Style: {
        marginVertical: 10,
        lineHeight: 23,
        textAlign: 'center',
    },
    resetStardomButton: {
        borderRadius: 25,
        padding: 8,
        width: width / 3.5,
        elevation: 3,
        backgroundColor: "#000"
    },
    resetToCategorySelectionButton: {
        borderRadius: 25,
        padding: 8,
        width: width / 1.37,
        elevation: 3,
        backgroundColor: "#000"
    },
    modalErrorImage: {
        width: 35,
        height: 35,
        tintColor: '#ff4e4e'
    },
    modalTitleDivider: {
        width: 290,
        height: 1,
        backgroundColor: "lightgray"
    },
    errorModalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 45
    },
    modalTitleTextStyle: {
        fontSize: 20,
        padding: 4
    },
    modalMessageViewStyle: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalMessageTextStyle: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10
    },
    modalOKButtonStyle: {
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginVertical: 15,
        width: 150,
        elevation: 3,
        borderColor: 'white',
        borderWidth: 1,
        backgroundColor: '#fec72e'
    },
    modalViewStyle: {
        margin: 200,
        backgroundColor: '#fafafa',
        borderRadius: 20,
        padding: 25,
        width: 300,
        height: 300,
        alignItems: "center",
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }
});

export const colors = {
    BLUE: '#3543bf',
    ORANGE: '#fe7d32',
    GREEN: '#30a960',
    LIGHT_GREEN: '#7FFF00',
    RED: '#ff4e4e',
    BLACK: '#0b0b0b',
    SILVER: '#efefef',
    WHITE: '#fff',
    GREY: '#7e7e7e',
    SDOM_BLACK: `#1b1f2b`,
    SDOM_TEXT_BOX: `#343642`,
    WHITE_GREY: '#d4d4d4',
    DARK_GREY: '#555555',
    LIGHT_BLACK: '#212121',
    DARK_RED: '#c04d47',
    TRANSPARENT: `transparent`,
    SEMI_TRANSPARENT: 'rgba(0,0,0,0.5)',
    LIGHT_RED: '#fef3ec',
    YELLOW: '#fec72e',
    SDOM_YELLOW: `#eabe05`,
    SDOM_PLACEHOLDER: `#969696`,
    LIGHT_GREY: '#a9a9a9',
    PALE_YELLOW: '#fff6ef',
    DARK_BLUE: '#2e68b2',
    LIGHT_BLUE: '#EEEFF9',
};

export const userMenuStyles = {
    profileImageView: {
        alignItems: 'flex-start',
        paddingLeft: 20
    },
    profileImageStyle: {
        width: 80,
        height: 80,
        borderRadius: 58,
    },
    menuBackgroundColor: {
        backgroundColor: `rgba(27,31,43,.3)`
    },
    editProfileImageStyle: {
        width: 100,
        height: 100,
        borderRadius: 58,
    },
    editProfileCameraIconStyle: {
        width: 20,
        height: 20,
        tintColor: `#eabe05`
    },
    followerFollowingImageStyle: {
        width: 70,
        height: 70,
        borderRadius: 58
    },
    userVerifyModalView: {
        margin: 250,
        borderRadius: 20,
        paddingTop: 20,
        paddingEnd: 45,
        paddingBottom: 20,
        paddingStart: 45,
        width: width / 1.05,
        height: 285,
        elevation: 5
    },
    verifyUserTextHeight: {
        justifyContent: 'center',
        maxHeight: 150
    },
    verifyUserTextInput: {
        height: 150,
        fontSize: 16,
        color: '#05375a'
    },
    verifyUserCancelText: {
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    verifyUserSubmitButton: {
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 15,
        width: 120,
        elevation: 3,
        backgroundColor: '#eabe05'
    },
}

export const cameraStyles = StyleSheet.create({
    imageStyles: {
        width: width,
        height: height / 1.531,
    },
    filterSelector: {
        width: 120,
        height: 120
    },
    addImageGalleryIconStyle: {
        width: 20,
        height: 20,
        tintColor: `#000000`
    }
});