
import React from 'react';
import Svg, { Circle, Path } from "react-native-svg";
import { colorConstants, numericConstants } from '../../constants/Constants';
export const RegisteredUsersIcon = props => {
    return (<Svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={colorConstants.WHITE}
        stroke={colorConstants.WHITE} strokeWidth={numericConstants.TWO} strokeLinecap="round" strokeLinejoin="round"
        className="prefix__feather prefix__feather-users">
        <Path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <Circle cx={numericConstants.NINE} cy={numericConstants.SEVEN} r={numericConstants.FOUR} />
        <Path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </Svg>)
}