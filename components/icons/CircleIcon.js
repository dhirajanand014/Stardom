
import React from 'react';
import Svg, { Circle } from "react-native-svg";
import { miscMessage, numericConstants } from '../../constants/Constants';
import { colors } from '../../styles/Styles';
export const CircleIcon = props => {
    return (<Svg width={numericConstants.TWENTY_FOUR} height={numericConstants.TWENTY_FOUR} viewBox="0 0 24 24" fill={miscMessage.NONE} stroke={colors.WHITE}
        strokeWidth={numericConstants.TWO} strokeLinecap="round" strokeLinejoin="round" className="prefix__feather prefix__feather-circle" >
        <Circle cx={numericConstants.TWELVE} cy={numericConstants.THIRTEEN} r={numericConstants.TEN} />
    </Svg>)
}