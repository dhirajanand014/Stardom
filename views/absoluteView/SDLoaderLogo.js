
import React from "react"
import { Image, Text, View } from "react-native"
import { miscMessage } from "../../constants/Constants"
import { SDGenericStyles } from "../../styles/Styles"

export const SDLoaderLogo = props => {
    return (
        <View style={[SDGenericStyles.alignItemsCenter, SDGenericStyles.justifyContentCenter, SDGenericStyles.rowFlexDirection, SDGenericStyles.positionAbsolute,
        SDGenericStyles.left0, SDGenericStyles.right0, SDGenericStyles.bottom30]}>
            <Image style={[SDGenericStyles.loaderIcon, SDGenericStyles.tintColorGrey]} source={require(`../../assets/menu/about_stardom_icon.png`)} />
            <Text style={[SDGenericStyles.colorWhite, SDGenericStyles.ft14, SDGenericStyles.fontFamilyRobotoMedium, SDGenericStyles.paddingLeft5, SDGenericStyles.colorLogoGrey]}>
                {miscMessage.STARDOM_LOGO_TEXT}
            </Text>
        </View>
    )
}