import React, { useMemo, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import { PlusIcon } from '../../components/icons/PlusIcon';
import { numericConstants, miscMessage, stringConstants } from '../../constants/Constants';
import { glancePostStyles, SDGenericStyles } from '../../styles/Styles';
import { BottomSheetView } from '../../views/bottomSheet/BottomSheetView';
import { AddPostDetails } from './AddPostDetails';

export const AddPost = () => {

    const [addPost, setAddPost] = useState({
        capturedImage: stringConstants.EMPTY,
        showDetails: false,
        showBottomOptions: true
    });

    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => [330, 0], []);

    const bottomSheetRefCallback = node => {
        bottomSheetRef.current = node;
    };

    const fallValue = useSharedValue(numericConstants.ONE);

    return (
        <React.Fragment>
            <View style={[SDGenericStyles.fill, SDGenericStyles.justifyContentCenter, SDGenericStyles.alignItemsCenter]}>
                {
                    addPost.capturedImage &&
                    <AddPostDetails addPost={addPost} setAddPost={setAddPost} /> || <View>
                        <TouchableOpacity activeOpacity={.7} onPress={() => bottomSheetRef?.current?.snapTo(numericConstants.ZERO)}>
                            <View style={glancePostStyles.addPostView}>
                                <PlusIcon width={numericConstants.TWO_HUNDRED} height={numericConstants.TWO_HUNDRED} />
                            </View>
                        </TouchableOpacity>
                        <View activeOpacity={.7} style={SDGenericStyles.mv15}>
                            <Text style={[glancePostStyles.addPostSelectText, SDGenericStyles.ft16]}>{miscMessage.CLICK_TO_ADD_IMAGE}{stringConstants.SPACE}</Text>
                        </View>
                    </View>
                }
            </View>
            {
                addPost.showBottomOptions && <BottomSheetView refCallback={bottomSheetRefCallback} bottomSheetRef={bottomSheetRef} snapPoints={snapPoints}
                    fall={fallValue} addPost={addPost} setAddPost={setAddPost} />
            }
        </React.Fragment>
    )
}