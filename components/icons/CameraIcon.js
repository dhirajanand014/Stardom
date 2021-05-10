
import React from 'react';
import Svg, { Circle, Path } from "react-native-svg";
import { miscMessage, numericConstants } from '../../constants/Constants';
import { colors } from '../../styles/Styles';
export const CameraIcon = props => {
    return (<Svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={miscMessage.NONE} stroke={colors.WHITE}
        strokeWidth={numericConstants.TWO} strokeLinecap="round" strokeLinejoin="round" className="prefix__feather prefix__feather-camera" >
        <Path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
        <Circle cx={numericConstants.TWELVE} cy={numericConstants.THIRTEEN} r={numericConstants.FOUR} />
    </Svg>)
}