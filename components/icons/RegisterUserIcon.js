
import React from 'react';
import Svg, { Circle, Path } from "react-native-svg";
import { miscMessage, numericConstants } from '../../constants/Constants';
export const RegisterUserIcon = () => {
    return (<Svg width={numericConstants.ONE_HUNDRED} height={numericConstants.ONE_HUNDRED} viewBox="0 0 24 24" fill={miscMessage.NONE} stroke="#000000" strokeWidth={numericConstants.TWO}
        strokeLinecap="round" strokeLinejoin="round" className="prefix__feather prefix__feather-user" >
        <Path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <Circle cx={12} cy={7} r={4} />
    </Svg>)
}