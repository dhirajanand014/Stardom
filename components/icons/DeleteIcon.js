
import React from 'react';
import Svg, { Path } from "react-native-svg";
import { miscMessage, numericConstants } from '../../constants/Constants';
import { colors } from '../../styles/Styles';
export const DeleteIcon = props => {
    return (<Svg width={numericConstants.TWENTY_FOUR} height={numericConstants.TWENTY_FOUR} viewBox="0 0 24 24" fill={miscMessage.NONE} stroke={colors.RED}
        strokeWidth={numericConstants.TWO} strokeLinecap="round" strokeLinejoin="round" className="prefix__feather prefix__feather-trash-2" >
        <Path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
    </Svg>)
}