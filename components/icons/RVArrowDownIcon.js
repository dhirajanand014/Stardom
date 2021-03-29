
import React from 'react';
import Svg, { Path } from "react-native-svg";
import { miscMessage, numericConstants } from '../../constants/Constants';
export const RVArrowDownIcon = (props) => {
    return (<Svg width={props.width} height={props.height} fill={props.color} stroke={miscMessage.NONE} strokeLinecap="round" strokeLinejoin="round"
        strokeWidth={numericConstants.TWO} className="feather feather-clock" viewBox="0 0 24 24">
        <Path d="M0 7.33L2.829 4.5l9.175 9.339L21.171 4.5 24 7.33 12.004 19.5z" />
    </Svg>)
}