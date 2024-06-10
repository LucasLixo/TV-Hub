import React from "react";
import {
    Modal,
    Pressable,
    View,
} from "react-native";
import {
    MD3DarkTheme,
} from 'react-native-paper';

const theme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        background: '#000000'
    }
};

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
                        backgroundColor: theme.colors.elevation.level3,
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
                    backgroundColor: theme.colors.background,
                }}>
                    {children}
                </View>
            </View>
        </Modal>
    );
};

export default ShowModalBottom;
