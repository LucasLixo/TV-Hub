import React from 'react';
import { Pressable, View } from 'react-native';
import { clipboardToast, extractUrlVizer } from '../../hooks/Fuctions';
import ShowModalFade from '../../components/ShowModalFade';
import Styles from '../../hooks/Styles';
import MyText from '../../components/MyText';
import Colors from '../../hooks/Colors';
import IconsStyle from '../../hooks/IconsStyle';
import { useNavigation } from '@react-navigation/native';

const OptionsDownload = ({ isModalVisible, setModalVisible, url, title }) => {
    const extractedUrl = extractUrlVizer(url);
    const navigation = useNavigation();

    const handleDownload = (service) => {
        setModalVisible(!isModalVisible);
        navigation.navigate('Download', { 
            title: title,
            url: `${extractedUrl}&sv=${service}`, 
            service: service,
        });
    }

    return (
        <ShowModalFade isModalVisible={isModalVisible} setModalVisible={setModalVisible}>
            <View style={Styles.CardOut}>
                <MyText type='topic' style={{ marginBottom: 10, fontSize: 16, color: Colors.text.b }}>
                    {`Baixar`}
                </MyText>
                <View style={Styles.CardIn}>
                    <Pressable
                        style={Styles.CardContainer}
                        onPress={() => handleDownload('mixdrop')}
                    >
                        <MyText type='description' style={{ fontSize: 18, color: Colors.text.a }}>{`Mixdrop`}</MyText>
                        <IconsStyle name='download' size={28} color={Colors.text.a} />
                    </Pressable>
                    <View style={[Styles.Hr, { borderBottomColor: Colors.gray.c }]} />
                    <Pressable
                        style={Styles.CardContainer}
                        onPress={() => handleDownload('filemoon')}
                    >
                        <MyText type='description' style={{ fontSize: 18, color: Colors.text.a }}>{`Filemoon`}</MyText>
                        <IconsStyle name='download' size={28} color={Colors.text.a} />
                    </Pressable>
                    <View style={[Styles.Hr, { borderBottomColor: Colors.gray.c }]} />
                    <Pressable
                        style={Styles.CardContainer}
                        onPress={() => handleDownload('streamtape')}
                    >
                        <MyText type='description' style={{ fontSize: 18, color: Colors.text.a }}>{`Streamtape`}</MyText>
                        <IconsStyle name='download' size={28} color={Colors.text.a} />
                    </Pressable>
                </View>
            </View>
        </ShowModalFade>
    );
};

// Export
export default OptionsDownload;