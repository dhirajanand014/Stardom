import React from 'react';
import BottomSheet from 'reanimated-bottom-sheet';

export const SDBottomSheet = props => {
    return (
        <BottomSheet ref={props.refCallback} snapPoints={props.snapPoints} callbackNode={props.fall} initialSnap={props.initialSnap}
            renderContent={props.renderContent} renderHeader={props.renderHeader} onCloseEnd={props.onCloseEnd} />
    )
}