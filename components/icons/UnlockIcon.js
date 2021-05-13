
import React from 'react';
import Svg, { Path, Rect } from "react-native-svg";
import { numericConstants } from '../../constants/Constants';
import { colors } from '../../styles/Styles';
export const UnlockIcon = props => {
    return (<Svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={props.fill} stroke={colors.WHITE}
        strokeWidth={numericConstants.TWO} strokeLinecap="round" strokeLinejoin="round" className="prefix__feather prefix__feather-unlock" >
        <Rect x={numericConstants.THREE} y={numericConstants.ELEVEN} width={numericConstants.EIGHTEEN} height={numericConstants.ELEVEN}
            rx={numericConstants.TWO} ry={numericConstants.TWO} />
        <Path d="M7 11V7a5 5 0 019.9-1" />
    </Svg>)
}