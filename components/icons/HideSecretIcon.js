import React from 'react';
import Svg, { Path } from "react-native-svg";
import { miscMessage, numericConstants } from '../../constants/Constants';
export const HideSecretIcon = props => {
    return (<Svg width={numericConstants.EIGHTEEN} height={numericConstants.EIGHTEEN} viewBox="0 0 24 24" fill={miscMessage.NONE}
        stroke={props.stroke} strokeWidth={numericConstants.TWO} strokeLinecap="round" strokeLinejoin="round" className="prefix__feather prefix__feather-eye-off">
        <Path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" />
    </Svg>)
}