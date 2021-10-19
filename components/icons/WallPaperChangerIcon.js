
import React from 'react';
import Svg, { Path, Rect } from "react-native-svg";
import { miscMessage, numericConstants } from '../../constants/Constants';
export const WallPaperChangerIcon = props => {
    return (<Svg width={numericConstants.TWENTY_EIGHT} height={numericConstants.TWENTY_EIGHT} fill={miscMessage.NONE} stroke={props.stroke} viewBox="0 0 24 24"
        strokeWidth={numericConstants.ONEPTONE} strokeLinecap="round" strokeLinejoin="round" className="prefix__feather prefix__feather-film" >
        <Rect x={numericConstants.TWO} y={numericConstants.TWO} width={numericConstants.TWENTY} height={numericConstants.TWENTY}
            rx={numericConstants.TWOPTONEEIGHT} ry={numericConstants.TWOPTONEEIGHT} />
        <Path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5" />
    </Svg>)
}