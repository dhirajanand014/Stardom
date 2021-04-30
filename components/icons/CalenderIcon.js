
import React from 'react';
import Svg, { Line, Rect } from "react-native-svg";
import { miscMessage, numericConstants } from '../../constants/Constants';
export const CalenderIcon = props => {
    return (<Svg width={props.width} height={props.height} viewBox="0 0 24 24"
        fill={miscMessage.NONE} stroke={props.stroke} stroke-width={numericConstants.TWO}
        stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar">
        <Rect x={numericConstants.THREE} y={numericConstants.FOUR} width={numericConstants.EIGHTEEN} height={numericConstants.EIGHTEEN}
            rx={numericConstants.TWO} ry={numericConstants.TWO}></Rect>
        <Line x1={numericConstants.SIXTEEN} y1={numericConstants.TWO} x2={numericConstants.SIXTEEN} y2={numericConstants.SIX}></Line>
        <Line x1={numericConstants.EIGHT} y1={numericConstants.TWO} x2={numericConstants.EIGHT} y2={numericConstants.SIX}></Line>
        <Line x1={numericConstants.THREE} y1={numericConstants.TEN} x2={numericConstants.TWENTY_ONE} y2={numericConstants.TEN}></Line>
    </Svg>)
}