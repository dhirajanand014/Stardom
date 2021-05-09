import { StyleSheet } from 'react-native'
import { colorConstants, isAndroid, isIOS, width, height } from '../constants/Constants';

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
    bold: {
        fontWeight: 'bold'
    },
    fontFamilyNormal: {
        fontFamily: isAndroid && `normal` || `System`
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
    mt12: {
        marginTop: 12,
    },
    mt20: {
        marginTop: 20,
    },
    mt24: {
        marginTop: 24,
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
    ft9: {
        fontSize: 9
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
    marginRight4: {
        marginRight: 4
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
    borderRightColor: {
        borderRightColor: `#f4f4f4`
    },
    placeHolderTextColor: {
        color: `#969696`
    },
    borderBottomWidth1: {
        borderBottomWidth: 1
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
    padding5: {
        padding: 5
    },
    padding12: {
        padding: 12
    },
    width38: {
        width: 38
    },
    marginHorizontal10: {
        marginHorizontal: 10
    },
    padding10: {
        padding: 10
    },
    paddingTop20: {
        paddingTop: 20
    },
    paddingTop40: {
        paddingTop: 40
    },
    paddingTop80: {
        paddingTop: 80
    },
    paddingTop100: {
        paddingTop: 100
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
    bottom8: {
        bottom: 8
    },
    paddingBottom5: {
        paddingBottom: 5
    },
    paddingBottom20: {
        paddingBottom: 20
    },
    paddingBottom50: {
        paddingBottom: 50
    },
    paddingBottom60: {
        paddingBottom: 60
    },
    paddingVertical2: {
        paddingVertical: 2
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
    backGroundColorGreen: {
        backgroundColor: `green`
    },
    backGroundColorBlack: {
        backgroundColor: `#1b1f2b`
    },
    backGroundColorGray: {
        backgroundColor: `#969696`
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
    colorRed: {
        color: `red`
    },
    paddingHorizontal12: {
        paddingHorizontal: 12
    },
    padding4: {
        padding: 4
    },
    paddingLeft5: {
        paddingLeft: 5
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
        color: 'green'
    },
    dropDownBackGround: {
        backgroundColor: `#1b1f2b`,
        zIndex: 10
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
    opacitypt7: {
        opacity: .7
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
    height100: {
        height: 100
    },
    height63: {
        height: 63
    },
    bottom160: {
        bottom: 160
    },
    bottom180: {
        bottom: 180
    },
    bottom200: {
        bottom: 200
    },
    paddingRight5: {
        paddingRight: 5
    }
});

export const glancePostStyles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        position: 'absolute',
        paddingLeft: 15,
        bottom: 0,
        justifyContent: 'flex-end',
    },
    titleName: {
        fontSize: 18,
        fontFamily: 'wallpiper_roman_font',
        display: 'flex',
        color: 'white',
    },
    backgroundRoundColor_description: {
        paddingRight: 1,
        paddingTop: 3,
        alignItems: 'center',
        width: 29,
        height: 29,
        backgroundColor: 'rgba(0,0,0,0.25)',
        borderRadius: 16,
    },
    backgroundRoundColor: {
        paddingRight: 1,
        paddingTop: 3,
        alignItems: 'center',
        width: 27,
        height: 27,
        backgroundColor: 'rgba(0,0,0,0.25)',
        borderRadius: 16,
    },
    postProfileName: {
        marginRight: 4,
        display: 'flex',
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
    icon_post_like: {
        borderColor: 'red',
        width: 22,
        height: 22
    },
    icon_post_search: {
        width: 22,
        height: 22
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
        flexDirection: 'row',
        paddingVertical: 18,
        paddingRight: 50,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e6e4eb',
        borderBottomStartRadius: 16,
        borderBottomEndRadius: 16
    },
    search_content_post_title: {
        fontFamily: 'wallpiper_roman_font'
    },
    search_content_post_index: {
        fontFamily: 'wallpiper_bold_font',
        marginLeft: 16
    },
    search_content_activity_indicator: {
        alignItems: 'center',
        paddingTop: 120,
        justifyContent: 'center'
    },
    search_input_text: {
        flex: 1,
        height: 40,
        backgroundColor: '#e4e6eb',
        borderRadius: 20,
        paddingHorizontal: 20,
        fontFamily: 'wallpiper_roman_font',
        fontSize: 15
    },
    icon_post_description: {
        width: 25,
        height: 25
    },
    icon_post_details: {
        width: 22,
        height: 22,
    },
    icon_post_share: {
        width: 20,
        height: 20
    },
    icon_external_link: {
        width: 23,
        height: 23
    },
    icon_post_report_abuse: {
        width: 22,
        height: 22
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
        borderRadius: 20,
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
    radioButtonModalView: {
        marginRight: 20,
        backgroundColor: "white",
        borderRadius: 20,
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
    modalHideText: {
        color: "white",
        fontFamily: 'wallpiper_roman_font',
        textAlign: "center",
        fontSize: 15
    },
    reportAbuseCancelText: {
        fontSize: 14,
        textDecorationLine: 'underline',
        fontFamily: 'wallpiper_roman_font'
    },
    reportAbuseModalTitle: {
        fontFamily: 'wallpiper_bold_font',
        fontSize: 20,
        padding: 10
    },
    reportAbuseModalTitleDivider: {
        width: 230,
        height: 1,
        backgroundColor: "lightgray"
    },
    icon_count_text: {
        color: "white",
        fontFamily: 'wallpiper_roman_font',
        textAlign: "center",
        fontSize: 10,
        top: 1
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
    glanceTopIcons: {
        paddingTop: 4,
        paddingLeft: 2,
        paddingBottom: 1,
        paddingRight: 2
    },
    postDescriptionModalButton: {
        top: 0,
        right: 0,
        marginHorizontal: 12,
        marginVertical: 10,
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
    postReportAbuse: {
        left: 12,
        marginTop: 10,
        elevation: 3,
    },
    cancelReportAbuse: {
        position: 'absolute',
        right: 100,
        bottom: 25,
        marginTop: 15,
        elevation: 3,
    },
    reportAbuseModalContainer: {
        marginBottom: 30,
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
    reportAbuseAlreadySelected: {
        alignItems: 'center',
        marginBottom: 25,
        justifyContent: 'center',
        padding: 8,
        fontFamily: 'wallpiper_bold_font'
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
        width: 120,
        height: 130
    },
    preloaderStyle: {
        width: 30,
        height: 30
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
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
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
    cancelAddPostButton: {
        padding: 10
    },
    addPostButton: {
        borderWidth: 1,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: colorConstants.YELLOW,
        padding: 15
    },
    addPostDetailsTitleDivider: {
        width: width / 1.2,
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
        color: 'red',
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
    profileNameTextStyle: {
        position: 'absolute',
        marginLeft: 8,
        bottom: 150,
        justifyContent: 'flex-start'
    },
    profileViewActionsStyle: {
        position: 'absolute',
        bottom: 150,
        right: 0,
        padding: 20,
        justifyContent: 'flex-end'
    },
    profileBioTextStyle: {
        borderWidth: 1,
        borderRadius: 20
    }
});

export const categoryViewStyles = StyleSheet.create({
    saveButtonContainer: {
        marginVertical: 8,
        paddingVertical: 8,
        borderRadius: 20,
        width: width / 2.2,
    },
    bottomButtonLayout: {
        height: 63
    },
    textSave: {
        color: "#000000",
        fontSize: 18,
        fontFamily: 'wallpiper_bold_font',
    }
})

export const flatListItemStyles = StyleSheet.create({
    headerText: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        fontWeight: "bold"
    },
    GridViewContainer: {
        flex: 1 / 3,
        justifyContent: 'space-between',
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
    cardSurface: {
        height: 122,
        width: 122,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        left: 5,
        right: 100,
        marginVertical: 5,
        borderRadius: 8,
    },
    userProfileCardSurface: {
        height: 150,
        width: 120,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        left: 5,
        right: 100,
        marginVertical: 5,
        borderRadius: 8,
    },
    textsView: {
        flex: 1,
        flexDirection: 'column',
        top: 2,
        paddingTop: 2,
        left: 4
    },
    textCategoryTitle: {
        fontFamily: 'wallpiper_bold_font',
        color: "#ffffff",
        fontSize: 14,
        justifyContent: 'center',
        alignItems: "center"
    },
    textCategoryCity: {
        fontFamily: 'wallpiper_roman_font',
        color: "#ffffff",
        padding: 1,
        fontSize: 12,
        justifyContent: 'center',
        alignItems: "center"
    }
});

export const headerStyles = StyleSheet.create({
    headerText: {
        fontWeight: 'bold',
    }
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
        paddingVertical: 15,
        width: width / 1.8,
        elevation: 3,
        paddingBottom: 20
    },
    menuRegisterButton: {
        alignSelf: 'center',
        width: width / 1.8,
        elevation: 3,
        paddingBottom: 40
    },
    menuRightCountView: {
        padding: 10,
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0
    },
    registrationConfirmationView: {
        alignSelf: 'center',
        paddingVertical: 20,
        width: width / 2,
        paddingBottom: 50
    },
    registerationDetailsView: {
        alignSelf: 'center',
        paddingVertical: 20,
        width: width / 2,
        paddingBottom: 20
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
        paddingStart: 10,
        paddingEnd: 15,
        backgroundColor: `#343642`,
        marginVertical: 8,
        borderRadius: 8,
        width: width / 1.15,
    },
    errorInputBorder: {
        borderWidth: 2,
        borderColor: '#ff4e4e',
    },
    normalInputBorder: {
        borderWidth: 2,
        borderColor: `#343642`
    },
    formInputError: {
        color: '#ff4e4e',
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
    container: {
        flex: 1,
        backgroundColor: colorConstants.YELLOW
    },
    content: {
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 15
    },
    infoIconStyle: {
        alignSelf: 'center',
        width: 60,
        height: 60
    },
    textMessage1Style: {
        fontSize: 32,
        textAlign: 'center',
        fontFamily: 'wallpiper_roman_font',
    },
    textMessage2Style: {
        marginVertical: 10,
        lineHeight: 23,
        textAlign: 'center',
        fontWeight: '500',
        fontFamily: 'wallpiper_roman_font'
    },
    resetToCategorySelectionButton: {
        borderRadius: 25,
        marginTop: 25,
        padding: 15,
        elevation: 3,
        backgroundColor: "#3d3d3d"
    },
    redirectButtonText: {
        color: "white",
        fontFamily: 'wallpiper_roman_font',
        textAlign: "center",
        fontSize: 20
    },
    modalErrorImage: {
        width: 35,
        height: 35,
        tintColor: 'red'
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
    RED: '#ff4e4e',
    BLACK: '#0b0b0b',
    SILVER: '#efefef',
    WHITE: '#fff',
    GREY: '#7e7e7e',
    WHITE_GREY: '#d4d4d4',
    DARK_GREY: '#555555',
    LIGHT_BLACK: '#212121',
    DARK_RED: '#c04d47',
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
        paddingTop: 20,
        paddingLeft: 20
    },
    profileImageStyle: {
        width: 100,
        height: 100,
        borderRadius: 58,
        borderWidth: 3,
        borderColor: `#f4f4f4`
    }
}