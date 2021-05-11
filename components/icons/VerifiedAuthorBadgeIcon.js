
import React from 'react';
import Svg, { Circle, Path } from "react-native-svg";
import { miscMessage, numericConstants } from '../../constants/Constants';
export const VerifiedAuthorBadgeIcon = props => {
    return (<Svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={miscMessage.NONE} stroke={props.stroke}
        strokeWidth={numericConstants.TWO} strokeLinecap="round" strokeLinejoin="round" className="prefix__feather prefix__feather-award">
        <Circle cx={numericConstants.TWELVE} cy={numericConstants.EIGHT} r={numericConstants.SEVEN} />
        <Path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
    </Svg>)
}