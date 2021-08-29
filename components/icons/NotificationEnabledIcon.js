
import React from 'react';
import Svg, { Path } from "react-native-svg";
import { numericConstants } from '../../constants/Constants';
import { colors } from '../../styles/Styles';
export const NotificationEnabledIcon = props => {
    return (<Svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={props.fill} stroke={props.stroke} strokeWidth={numericConstants.ONE}
        strokeLinecap="round" strokeLinejoin="round" className="prefix__feather prefix__feather-bell">
        <Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
    </Svg>)
}