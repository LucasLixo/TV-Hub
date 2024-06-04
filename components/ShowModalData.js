import React from "react";
import {
    Image,
    Modal,
    Pressable,
} from "react-native";
import Styles from "../hooks/Styles";
import { clipboardToast } from "../hooks/Fuctions";
import MyText from "./MyText";
import Colors from "../hooks/Colors";

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
                    <MyText style={{ flexWrap: 'wrap', textAlign: 'center', color: Colors.text.a }} type="description">
                        {Data || ''}
                    </MyText>
                )}
            </Pressable>
        </Modal>
    );
};

export default ShowModalData;