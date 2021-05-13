
import React from 'react';
import Svg, { Path } from "react-native-svg";
import { numericConstants } from '../../constants/Constants';
import { colors } from '../../styles/Styles';
export const FlashCameraIcon = props => {
    return (<Svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={props.fill} stroke={colors.WHITE}
        strokeWidth={numericConstants.ONE} strokeLinecap="round" strokeLinejoin="round" className="prefix__feather prefix__feather-moon" >
        <Path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </Svg>)
}