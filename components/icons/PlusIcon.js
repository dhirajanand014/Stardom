
import React from 'react';
import Svg, { Path } from "react-native-svg";
import { numericConstants } from '../../constants/Constants';
export const PlusIcon = (props) => {
    return (<Svg width={props.width} height={props.height} viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth={numericConstants.TWO} strokeLinecap="round" strokeLinejoin="round" className="prefix__feather prefix__feather-plus">
        <Path d="M12 5v14M5 12h14" />
    </Svg>)
}