import React from "react";
import { Image, Modal, View } from "react-native";
import FastImage from "react-native-fast-image";
import { glancePostStyles, SDGenericStyles } from "../../styles/Styles";

export const SDLoaderView = props => {
    return (
        <Modal animationType="slide" transparent visible={props.loader} onRequestClose={() =>
            setProfileMenu({ ...profileMenu, showSubmitVerifyModal: false })}>
            <View style={SDGenericStyles.alignItemsCenter}>
                <View style={[glancePostStyles.loaderModalView, SDGenericStyles.alignItemsCenter, SDGenericStyles.textBoxGray]}>
                    <FastImage source={{
                        uri: Image.resolveAssetSource(require(`../../assets/stardom_loader.gif`)).uri,
                        priority: FastImage.priority.normal
                    }} style={{ width: width, height: height }} resizeMode={FastImage.resizeMode.center} />
                </View>
            </View>
        </Modal>
    );
};