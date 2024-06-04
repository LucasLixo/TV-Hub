import React from 'react';
import { Pressable, View } from 'react-native';
import { clipboardToast, extractUrlVizer } from '../../hooks/Fuctions';
import { useNavigation } from '@react-navigation/native';
import ShowModalFade from '../../components/ShowModalFade';
import Styles from '../../hooks/Styles';
import MyText from '../../components/MyText';
import Colors from '../../hooks/Colors';
import IconsStyle from '../../hooks/IconsStyle';

const OptionsPlayer = ({ isModalVisible, setModalVisible, url }) => {
    const navigation = useNavigation();

    const extractedUrl = extractUrlVizer(url);

    const handleNavigate = (service) => {
        setModalVisible(!isModalVisible);
        navigation.navigate('PlayerVideo', {
            url: `${extractedUrl}&sv=${service}`,
            service: service
        })
    }

    return (
        <ShowModalFade isModalVisible={isModalVisible} setModalVisible={setModalVisible}>
            <View style={Styles.CardOut}>
                <MyText type='topic' style={{ marginBottom: 10, fontSize: 16, color: Colors.text.b }}>
                    {`Assistir`}
                </MyText>
                <View style={Styles.CardIn}>
                    <Pressable
                        style={Styles.CardContainer}
                        onLongPress={() => clipboardToast(`${extractedUrl}&sv=mixdrop`)}
                        onPress={() => handleNavigate('mixdrop')}
                    >
                        <MyText type='description' style={{ fontSize: 18, color: Colors.text.a }}>{`Mixdrop`}</MyText>
                        <Pressable onPress={() => clipboardToast(`${extractedUrl}&sv=mixdrop`)}>
                            <IconsStyle name='link' size={28} color={Colors.text.a} />
                        </Pressable>
                    </Pressable>
                    <View style={[Styles.Hr, { borderBottomColor: Colors.gray.c }]} />
                    <Pressable
                        style={Styles.CardContainer}
                        onPress={() => handleNavigate('filemoon')}
                    >
                        <MyText type='description' style={{ fontSize: 18, color: Colors.text.a }}>{`Filemoon`}</MyText>
                        <Pressable onPress={() => clipboardToast(`${extractedUrl}&sv=filemoon`)}>
                            <IconsStyle name='link' size={28} color={Colors.text.a} />
                        </Pressable>
                    </Pressable>
                    <View style={[Styles.Hr, { borderBottomColor: Colors.gray.c }]} />
                    <Pressable
                        style={Styles.CardContainer}
                        onPress={() => handleNavigate('streamtape')}
                    >
                        <MyText type='description' style={{ fontSize: 18, color: Colors.text.a }}>{`Streamtape`}</MyText>
                        <Pressable onPress={() => clipboardToast(`${extractedUrl}&sv=streamtape`)}>
                            <IconsStyle name='link' size={28} color={Colors.text.a} />
                        </Pressable>
                    </Pressable>
                </View>
            </View>
        </ShowModalFade>
    );
};

// Export
export default OptionsPlayer;