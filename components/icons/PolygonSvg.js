
import React from 'react';
import Svg, { Polygon } from "react-native-svg";
import { numericConstants } from '../../constants/Constants';
import { colors } from '../../styles/Styles';
export const PolygonSvg = (props) => {
    return (<Svg width={props.width} height={props.height} viewBox={`0 0 ${props.width} ${props.height}`} fill={colors.SDOM_PLACEHOLDER} stroke={colors.SDOM_PLACEHOLDER}
        strokeWidth={numericConstants.TWO} strokeLinecap="round" strokeLinejoin="round" className="prefix__feather prefix__feather-plus">
        <Polygon fill={colors.SDOM_PLACEHOLDER} points={`0,0, ${props.fromCoords.x}, ${props.fromCoords.y} ${props.width}, ${props.height} 0 ,${props.height} `} />
    </Svg>)
}