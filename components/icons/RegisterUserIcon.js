
import React from 'react';
import Svg, { Circle, Path } from "react-native-svg";
import { miscMessage, numericConstants } from '../../constants/Constants';
export const RegisterUserIcon = props => {
    return (<Svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={miscMessage.NONE} stroke={props.stroke} strokeWidth={numericConstants.TWO}
        strokeLinecap="round" strokeLinejoin="round" className="prefix__feather prefix__feather-user">
        <Path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <Circle cx={numericConstants.TWELVE} cy={numericConstants.SEVEN} r={numericConstants.FOUR} />
    </Svg>)
}