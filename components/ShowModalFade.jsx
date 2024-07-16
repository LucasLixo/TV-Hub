import React from "react";
import {
    Modal,
    Pressable,
    View,
} from "react-native";
import Styles from "../utils/Styles";

const ShowModalFade = ({ isModalVisible, setModalVisible, children }) => {
    const handleClose = () => {
        setModalVisible();
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={handleClose}
        >
            <Pressable
                style={Styles.ModalContentShadow}
                onPress={() => handleClose()}
            >
                <View style={{ width: '80%', height: '60%', alignItems: 'center', justifyContent: 'center' }}>
                    {children}
                </View>
            </Pressable>
        </Modal>
    );
};

export default ShowModalFade;