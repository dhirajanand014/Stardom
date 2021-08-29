
import React from 'react';
import Svg, { Path } from "react-native-svg";
import { numericConstants } from '../../constants/Constants';
import { colors } from '../../styles/Styles';
export const NotificationDisabledIcon = props => {
    return (<Svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={props.fill} stroke={colors.SDOM_YELLOW} strokeWidth={numericConstants.ONE}
        strokeLinecap="round" strokeLinejoin="round" className="prefix__feather prefix__feather-bell-off">
        <Path d="M13.73 21a2 2 0 01-3.46 0M18.63 13A17.89 17.89 0 0118 8M6.26 6.26A5.86 5.86 0 006 8c0 7-3 9-3 9h14M18 8a6 6 0 00-9.33-5M1 1l22 22" />
    </Svg>)
}