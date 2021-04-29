import React from 'react';
import { Text, View } from "react-native"
import { SDGenderInput } from "../../components/card/SDGenderInput"
import { FemaleIcon } from "../../components/icons/FemaleIcon"
import { MaleIcon } from "../../components/icons/MaleIcon"
import { colorConstants, miscMessage, placeHolderText } from "../../constants/Constants"
import { glancePostStyles, SDGenericStyles } from "../../styles/Styles"

export const SDGenderCardView = props => {
    return (
        <View style={SDGenericStyles.paddingTop20}>
            <Text style={[SDGenericStyles.fontFamilyBold, SDGenericStyles.colorWhite, SDGenericStyles.paddingHorizontal10]}>{placeHolderText.SELECT_GENDER}</Text>
            <View style={[SDGenericStyles.mv15, glancePostStyles.genderCardView]}>
                <View style={[SDGenericStyles.rowFlexDirection, SDGenericStyles.paddingHorizontal25, SDGenericStyles.paddingVertical10]}>
                    <SDGenderInput {...props} icon={<MaleIcon stroke={props.genderValue && props.genderValue == miscMessage.MALE && colorConstants.YELLOW || colorConstants.INPUT_GRAY}
                        fill={props.genderValue && props.genderValue == miscMessage.MALE && colorConstants.YELLOW || colorConstants.INPUT_GRAY} />} value={miscMessage.MALE} text={miscMessage.MALE_TEXT} />
                    <SDGenderInput {...props} icon={<FemaleIcon stroke={props.genderValue && props.genderValue == miscMessage.FEMALE && colorConstants.YELLOW || colorConstants.INPUT_GRAY}
                        fill={props.genderValue && props.genderValue == miscMessage.FEMALE && colorConstants.YELLOW || colorConstants.INPUT_GRAY} />} value={miscMessage.FEMALE} text={miscMessage.FEMALE_TEXT} />
                </View>
            </View>
        </View>
    )
}