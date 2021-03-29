
import React from 'react';
import Svg, { Path } from "react-native-svg";
import { miscMessage, numericConstants } from '../../constants/Constants';
export const RVArrowUpIcon = (props) => {
    return (<Svg width={props.width} height={props.height} fill={props.color} stroke={miscMessage.NONE} strokeLinecap="round" strokeLinejoin="round"
        strokeWidth={numericConstants.TWO} className="feather feather-clock" viewBox="0 0 24 24">
        <Path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339L24 16.67 12.004 4.5z" />
    </Svg>)
}