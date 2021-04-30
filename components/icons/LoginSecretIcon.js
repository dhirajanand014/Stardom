
import React from 'react';
import Svg, { Path, Rect } from "react-native-svg";
import { miscMessage, numericConstants } from '../../constants/Constants';
export const LoginSecretIcon = props => {
    return (<Svg width={numericConstants.EIGHTEEN} height={numericConstants.EIGHTEEN} viewBox="0 0 24 24" fill={miscMessage.NONE} strokeWidth={numericConstants.TWO} stroke={props.stroke} strokeLinecap="round"
        strokeLinejoin="round" className="prefix__feather prefix__feather-lock">
        <Rect x={numericConstants.THREE} y={numericConstants.ELEVEN} width={numericConstants.EIGHTEEN} height={numericConstants.ELEVEN} rx={numericConstants.TWO} ry={numericConstants.TWO} />
        <Path d="M7 11V7a5 5 0 0110 0v4" />
    </Svg>)
}