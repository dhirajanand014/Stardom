
import React from 'react';
import Svg, { Circle, Path } from "react-native-svg";
import { miscMessage, numericConstants } from '../../constants/Constants';
export const ShowSecretIcon = props => {
    return (<Svg width={numericConstants.EIGHTEEN} height={numericConstants.EIGHTEEN} viewBox="0 0 24 24" fill={miscMessage.NONE}
        stroke={props.stroke} strokeWidth={numericConstants.TWO} strokeLinecap="round" strokeLinejoin="round" className="prefix__feather prefix__feather-eye">
        <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <Circle cx={numericConstants.TWELVE} cy={numericConstants.TWELVE} r={numericConstants.THREE} />
    </Svg>)
}