import React from `react`;
import { View } from 'react-native';
import { PlusIcon } from '../../components/icons/PlusIcon';
import { SDGenericStyles } from '../../styles/Styles';

export const AddPostView = () => {
    return (
        <View style={[SDGenericStyles.fill, SDGenericStyles.justifyContentCenter, SDGenericStyles.alignItemsCenter]}>
            <View style={{ borderWidth: 1, borderStyle: 'dashed' }}>
                <PlusIcon width={SDGenericStyles.ft42} height={SDGenericStyles.ft42} />
            </View>
        </View>
    )
}