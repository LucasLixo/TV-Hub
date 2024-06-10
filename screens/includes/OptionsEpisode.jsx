import React from 'react';
import { Pressable, View } from 'react-native';
import { clipboardToast, extractUrlVizer } from '../../utils/Fuctions';
import { useNavigation } from '@react-navigation/native';
import {
    MD3DarkTheme as theme,
    Text,
    Icon
} from 'react-native-paper';
import ShowModalFade from '../../components/ShowModalFade';
import Styles from '../../utils/Styles';

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
                    <Text variant="titleSmall" style={{ marginBottom: 10 }}>
                        {`Players`}
                    </Text>
                    <Text variant="titleSmall" style={{ marginBottom: 10 }}>
                        {`Baixar`}
                    </Text>
                </View>
                <View style={[Styles.CardIn, { backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'space-between' }]}>
                    <View style={{ flexDirection: 'column', width: '70%', backgroundColor: Colors.gray.a, borderRadius: 5 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Pressable
                                style={[Styles.CardContainer, { width: '80%' }]}
                                onLongPress={() => clipboardToast(`${extractedUrl}&sv=mixdrop`)}
                                onPress={() => handleNavigate('mixdrop')}
                            >
                                <Text variant='titleSmall'>{`Mixdrop`}</Text>
                            </Pressable>
                            <Pressable style={{ width: '20%' }} onPress={() => clipboardToast(`${extractedUrl}&sv=mixdrop`)}>
                                <Icon name='link' size={28}/>
                            </Pressable>
                        </View>
                        <View style={[Styles.Hr, { borderBottomColor: Colors.gray.c }]} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Pressable
                                style={[Styles.CardContainer, { width: '80%' }]}
                                onLongPress={() => clipboardToast(`${extractedUrl}&sv=filemoon`)}
                                onPress={() => handleNavigate('filemoon')}
                            >
                                <Text variant='titleSmall'>{`Filemoon`}</Text>
                            </Pressable>
                            <Pressable style={{ width: '20%' }} onPress={() => clipboardToast(`${extractedUrl}&sv=filemoon`)}>
                                <Icon name='link' size={28}/>
                            </Pressable>
                        </View>
                        <View style={[Styles.Hr, { borderBottomColor: Colors.gray.c }]} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Pressable
                                style={[Styles.CardContainer, { width: '80%' }]}
                                onLongPress={() => clipboardToast(`${extractedUrl}&sv=streamtape`)}
                                onPress={() => handleNavigate('streamtape')}
                            >
                                <Text variant='titleSmall'>{`Streamtape`}</Text>
                            </Pressable>
                            <Pressable style={{ width: '20%' }} onPress={() => clipboardToast(`${extractedUrl}&sv=streamtape`)}>
                                <Icon name='link' size={28}/>
                            </Pressable>
                        </View>
                    </View>
                    <View style={{ width: '25%', justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.gray.a, borderRadius: 5 }}>
                        <Pressable onPress={() => handleDownload(`mixdrop`)}>
                            <Icon name='download' size={28}/>
                        </Pressable>
                        <View style={[Styles.Hr, { borderBottomColor: Colors.gray.c }]} />
                        <Pressable onPress={() => handleDownload(`filemoon`)}>
                            <Icon name='download' size={28}/>
                        </Pressable>
                        <View style={[Styles.Hr, { borderBottomColor: Colors.gray.c }]} />
                        <Pressable onPress={() => handleDownload(`streamtape`)}>
                            <Icon name='download' size={28}/>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ShowModalFade>
    );
};

// Export
export default OptionsEpisode;