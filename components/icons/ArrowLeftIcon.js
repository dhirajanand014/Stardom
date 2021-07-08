
import React from 'react';
import Svg, { Path } from "react-native-svg";
import { miscMessage, numericConstants } from '../../constants/Constants';
export const ArrowLeftIcon = props => {
    return (<Svg width={numericConstants.TWENTY_FOUR} height={numericConstants.TWENTY_FOUR} viewBox="0 0 24 24" fill={miscMessage.NONE}
        stroke={props.stroke} strokeWidth={numericConstants.TWO} strokeLinecap="round" strokeLinejoin="round" className="prefix__feather prefix__feather-arrow-left">
        <Path d="M19 12H5M12 19l-7-7 7-7" />
    </Svg>)
}