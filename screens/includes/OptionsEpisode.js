import React from 'react';
import { Pressable, View } from 'react-native';
import { clipboardToast, extractUrlVizer } from '../../hooks/Fuctions';
import { useNavigation } from '@react-navigation/native';
import ShowModalFade from '../../components/ShowModalFade';
import Styles from '../../hooks/Styles';
import MyText from '../../components/MyText';
import Colors from '../../hooks/Colors';
import IconsStyle from '../../hooks/IconsStyle';

const OptionsEpisode = ({ isModalVisible, setModalVisible, url, title }) => {
    const navigation = useNavigation();

    const extractedUrl = extractUrlVizer(url);

    const handleNavigate = (service) => {
        setModalVisible(!isModalVisible);
        navigation.navigate('PlayerVideo', {
            url: `${extractedUrl}&sv=${service}`,
            service: service
        })
    }

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
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <MyText type='topic' style={{ marginBottom: 10, fontSize: 16, color: Colors.text.b }}>
                        {`Players`}
                    </MyText>
                    <MyText type='topic' style={{ marginBottom: 10, fontSize: 16, color: Colors.text.b }}>
                        {`Baixar`}
                    </MyText>
                </View>
                <View style={[Styles.CardIn, { backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'space-between' }]}>
                    <View style={{ flexDirection: 'column', width: '70%', backgroundColor: Colors.gray.a, borderRadius: 5 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Pressable
                                style={[Styles.CardContainer, { width: '80%' }]}
                                onLongPress={() => clipboardToast(`${extractedUrl}&sv=mixdrop`)}
                                onPress={() => handleNavigate('mixdrop')}
                            >
                                <MyText type='description' style={{ fontSize: 18, color: Colors.text.a }}>{`Mixdrop`}</MyText>
                            </Pressable>
                            <Pressable style={{ width: '20%' }} onPress={() => clipboardToast(`${extractedUrl}&sv=mixdrop`)}>
                                <IconsStyle name='link' size={28} color={Colors.text.a} />
                            </Pressable>
                        </View>
                        <View style={[Styles.Hr, { borderBottomColor: Colors.gray.c }]} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Pressable
                                style={[Styles.CardContainer, { width: '80%' }]}
                                onLongPress={() => clipboardToast(`${extractedUrl}&sv=filemoon`)}
                                onPress={() => handleNavigate('filemoon')}
                            >
                                <MyText type='description' style={{ fontSize: 18, color: Colors.text.a }}>{`Filemoon`}</MyText>
                            </Pressable>
                            <Pressable style={{ width: '20%' }} onPress={() => clipboardToast(`${extractedUrl}&sv=filemoon`)}>
                                <IconsStyle name='link' size={28} color={Colors.text.a} />
                            </Pressable>
                        </View>
                        <View style={[Styles.Hr, { borderBottomColor: Colors.gray.c }]} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Pressable
                                style={[Styles.CardContainer, { width: '80%' }]}
                                onLongPress={() => clipboardToast(`${extractedUrl}&sv=streamtape`)}
                                onPress={() => handleNavigate('streamtape')}
                            >
                                <MyText type='description' style={{ fontSize: 18, color: Colors.text.a }}>{`Streamtape`}</MyText>
                            </Pressable>
                            <Pressable style={{ width: '20%' }} onPress={() => clipboardToast(`${extractedUrl}&sv=streamtape`)}>
                                <IconsStyle name='link' size={28} color={Colors.text.a} />
                            </Pressable>
                        </View>
                    </View>
                    <View style={{ width: '25%', justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.gray.a, borderRadius: 5 }}>
                        <Pressable onPress={() => handleDownload(`mixdrop`)}>
                            <IconsStyle name='download' size={28} color={Colors.text.a} />
                        </Pressable>
                        <View style={[Styles.Hr, { borderBottomColor: Colors.gray.c }]} />
                        <Pressable onPress={() => handleDownload(`filemoon`)}>
                            <IconsStyle name='download' size={28} color={Colors.text.a} />
                        </Pressable>
                        <View style={[Styles.Hr, { borderBottomColor: Colors.gray.c }]} />
                        <Pressable onPress={() => handleDownload(`streamtape`)}>
                            <IconsStyle name='download' size={28} color={Colors.text.a} />
                        </Pressable>
                    </View>
                </View>
            </View>
        </ShowModalFade>
    );
};

// Export
export default OptionsEpisode;