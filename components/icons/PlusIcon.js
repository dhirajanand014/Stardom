
import React from 'react';
import Svg, { Path } from "react-native-svg";
import { numericConstants } from '../../constants/Constants';
import { colors } from '../../styles/Styles';
export const PlusIcon = (props) => {
    return (<Svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={colors.SDOM_PLACEHOLDER} stroke={colors.SDOM_PLACEHOLDER}
        strokeWidth={numericConstants.TWO} strokeLinecap="round" strokeLinejoin="round" className="prefix__feather prefix__feather-plus">
        <Path d="M12 5v14M5 12h14" />
    </Svg>)
}