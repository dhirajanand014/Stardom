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
        fontWeight: 'bold',
    },
    fontFamilyNormal: {
        fontFamily: isAndroid && `normal` || `System`,
    },
    mr12: {
        marginRight: 12,
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
    width100: {
        width: 100
    },
    width120: {
        width: 120
    },
    width130: {
        width: 130
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
    marginBottom10: {
        marginBottom: 10
    },
    marginVertical2: {
        marginVertical: 2
    },
    marginVertical5: {
        marginVertical: 5
    },
    zIndex10: {
        zIndex: 10
    },
    mv5: {
        marginVertical: 5
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
    inputTextColor: {
        color: '#05375a'
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
    padding5: {
        padding: 5
    },
    marginHorizontal10: {
        marginHorizontal: 10
    },
    padding10: {
        padding: 10
    },
    paddingTop80: {
        paddingTop: 80
    },
    paddingHorizontal5: {
        paddingHorizontal: 5
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
    paddingBottom50: {
        paddingBottom: 50
    },
    paddingVertical2: {
        paddingVertical: 2
    },
    paddingVertical10: {
        paddingVertical: 10
    },
    paddingVertical14: {
        paddingVertical: 14
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
        color: `black`
    },
    backGroundColorGreen: {
        backgroundColor: `green`
    },
    colorWhite: {
        color: `white`
    },
    colorRed: {
        color: `red`
    },
    paddingHorizontal12: {
        paddingHorizontal: 12
    },
    alignItemsStart: {
        alignItems: 'flex-start'
    },
    justifyItemsStart: {
        justifyContent: 'flex-start'
    },
    colorGreen: {
        color: 'green'
    },
    dropDownBackGround: {
        backgroundColor: '#fafafa',
        zIndex: 10
    },
    selectedDropDownColor: {
        color: '#39739d',
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
        backgroundColor: `#fcc200`
    },
    colorWhite: {
        color: '#FFFAFA'
    },
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
        justifyContent: 'center',
        fontSize: 9,
        fontFamily: 'wallpiper_bold_font',
        display: 'flex',
        color: 'white',
    },
    postCategoriesIn: {
        fontSize: 9,
        justifyContent: 'center',
        fontFamily: 'wallpiper_roman_font',
        display: 'flex',
        color: 'white',
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
        height: 40,
        alignItems: 'center',
        position: 'absolute',
        justifyContent: 'center',
        top: 0,
        right: -20,
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
        height: 280,
        position: 'absolute',
        width: 500,
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
        marginBottom: 8
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
    reportAbuseModalHeader: {
        alignItems: 'center'
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
    reportAbuseRadioText: {
        marginRight: 35,
        fontSize: 14,
        fontFamily: 'wallpiper_roman_font'
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
    tourGuideStyle: {
        width: 120,
        height: 130
    },
    preloaderStyle: {
        width: 30,
        height: 30
    }
});

export const categoryViewStyles = StyleSheet.create({
    categoryView: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#3d3d3d'
    },
    saveButtonContainer: {
        marginVertical: 10,
        height: 45,
        width: 140,
        position: 'absolute',
        right: 0,
        bottom: 0,
        left: 100,
        marginHorizontal: 30,
        justifyContent: 'center',
        backgroundColor: "#fcc200",
        borderColor: '#e3ddda',
        alignItems: 'center',
        elevation: 3,
        borderRadius: 30
    },
    bottomButtonLayout: {
        height: 63,
        backgroundColor: '#3d3d3d'
    },
    textSave: {
        color: "#000000",
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'wallpiper_bold_font',
    },
    skipTourZoneStyle: {
        width: 95,
        paddingVertical: 18
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
    signInSecondaryButtonView: {
        alignSelf: 'center',
        paddingVertical: 100,
        width: width / 2,
        marginBottom: 100
    },
    registerButtonView: {
        alignSelf: 'center',
        paddingVertical: 50,
        width: width / 2,
        marginBottom: 100
    },
    actionButtonStyle: {
        flexDirection: `column`,
        backgroundColor: '#0095f6',
        borderRadius: 3,
        paddingVertical: 8,
        elevation: 3
    },
    primaryActionButtonButtonText: {
        fontSize: 18,
        textAlign: 'center',
        elevation: 3,
        paddingVertical: 8,
        color: 'white',
        fontWeight: 'bold',
        fontFamily: isAndroid && `normal` || `System`
    },
    signInUserInputView: {
        paddingVertical: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    userInput: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        paddingStart: 15,
        backgroundColor: `#fafafa`,
        marginVertical: 3,
        borderColor: `#888888`,
        borderRadius: 3,
        width: width / 1.15,
    },
    errorInputBorder: {
        borderColor: 'red',
    },
    normalInputBorder: {
        borderColor: '#999999',
    },
    formInputError: {
        color: 'red',
        marginBottom: 6,
        marginHorizontal: 15
    },
    textInputStyle: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 10,
        paddingLeft: 3,
        marginLeft: 3,
        textAlign: 'left',
        color: '#05375a'
    },
    signInCreateAccount: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    signInCreateAccountText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#abb4bd'
    },
    registerLink: {
        paddingHorizontal: 1
    },
    registerDescription: {
        color: '#989898',
        textAlign: 'center',
        fontSize: 16,
        marginTop: 30,
        width: width / 1.15,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    registrationUserDropDownView: {
        paddingVertical: 15,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    dropDownPickerStyle: {
        justifyContent: 'center',
        width: width / 1.15,
        height: 50
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
    }
});

export const colors = {
    BLUE: '#3543bf',
    ORANGE: '#fe7d32',
    GREEN: '#30a960',
    RED: '#f06159',
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
    LIGHT_GREY: '#a9a9a9',
    PALE_YELLOW: '#fff6ef',
    DARK_BLUE: '#2e68b2',
    LIGHT_BLUE: '#EEEFF9',
};