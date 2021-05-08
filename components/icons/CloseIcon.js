
import React from 'react';
import Svg, { Path } from "react-native-svg";
import { miscMessage, numericConstants } from '../../constants/Constants';
import { colors } from '../../styles/Styles';
export const CloseIcon = props => {
    return (<Svg width={numericConstants.TWENTY_FOUR} height={numericConstants.TWENTY_FOUR} viewBox="0 0 24 24" fill={miscMessage.NONE} stroke={colors.WHITE}
        strokeWidth={numericConstants.TWO} strokeLinecap="round" strokeLinejoin="round" className="prefix__feather prefix__feather-x" >
        <Path d="M18 6L6 18M6 6l12 12" />
    </Svg>)
}