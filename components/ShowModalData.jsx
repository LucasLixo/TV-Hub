import React from "react";
import {
    Image,
    Modal,
    Pressable,
} from "react-native";
import Styles from "../utils/Styles";
import {
    Text
} from 'react-native-paper';
import { clipboardToast } from "../utils/Fuctions";

const ShowModalData = ({ isModalVisible, setModalVisible, Data, CopyToast = false }) => {
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
                onLongPress={() => {
                    CopyToast && (
                        clipboardToast(Data || '')
                    )
                }
                }
            >
                {Data.startsWith("https://") ? (
                    <Pressable onPress={() => clipboardToast(Data)}>
                        <Image
                            source={{ uri: Data }}
                            style={{ width: 220, height: 330, borderRadius: 10 }}
                            resizeMode='cover'
                        />
                    </Pressable>
                ) : (
                    <Text style={{ flexWrap: 'wrap', textAlign: 'center' }} variant='titleSmall'>
                        {Data || ''}
                    </Text>
                )}
            </Pressable>
        </Modal>
    );
};

export default ShowModalData;