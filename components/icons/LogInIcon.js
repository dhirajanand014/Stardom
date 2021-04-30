
import React from 'react';
import Svg, { Path } from "react-native-svg";
import { miscMessage, numericConstants } from '../../constants/Constants';
export const LoginIcon = props => {
    return (<Svg width={numericConstants.EIGHTY} height={numericConstants.EIGHTY} viewBox="0 0 24 24" fill={miscMessage.NONE}
        stroke={props.stroke} strokeWidth={numericConstants.TWO} strokeLinecap="round" strokeLinejoin="round" className="prefix__feather prefix__feather-log-in">
        <Path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" />
    </Svg>)
}