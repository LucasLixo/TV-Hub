import React from "react";
import {
    Modal,
    Pressable,
    View,
} from "react-native";
import Colors from "../hooks/Colors";

const ShowModalBottom = ({ isModalVisible, setModalVisible, children }) => {
    const handleClose = () => {
        setModalVisible(false);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={handleClose}
        >
            <View style={{ flex: 1 }}>
                <Pressable
                    style={{
                        backgroundColor: Colors.background.c,
                        width: '100%',
                        height: '14%',
                        position: 'relative',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                    }}
                    onPress={() => handleClose()}
                />
                <View style={{
                    width: '100%',
                    height: '80%',
                    position: 'relative',
                    padding: 10,
                    backgroundColor: Colors.background.a
                }}>
                    {children}
                </View>
            </View>
        </Modal>
    );
};

export default ShowModalBottom;
