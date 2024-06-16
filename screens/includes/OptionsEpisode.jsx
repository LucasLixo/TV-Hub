import React from 'react';
import { View } from 'react-native';
import { clipboardToast, extractUrlVizer } from '../../utils/Fuctions';
import { useNavigation } from '@react-navigation/native';
import {
    Text,
    Button,
    IconButton,
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
                    <Text variant="titleMedium" style={{ marginBottom: 10 }}>
                        {`Players`}
                    </Text>
                    <Text variant="titleMedium" style={{ marginBottom: 10 }}>
                        {`Baixar`}
                    </Text>
                </View>
                <View style={[Styles.CardIn, { backgroundColor: 'transparent', flexDirection: 'column' }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button
                            style={{ width: '65%' }}
                            mode='contained'
                            onLongPress={() => clipboardToast(`${extractedUrl}&sv=mixdrop`)}
                            onPress={() => handleNavigate('mixdrop')}
                        >
                            {`Mixdrop`}
                        </Button>
                        <IconButton
                            mode='contained'
                            size={34}
                            onPress={() => handleDownload('mixdrop')}
                            icon='download'
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button
                            style={{ width: '65%' }}
                            mode='contained'
                            onLongPress={() => clipboardToast(`${extractedUrl}&sv=filemoon`)}
                            onPress={() => handleNavigate('filemoon')}
                        >
                            {`Filemoon`}
                        </Button>
                        <IconButton
                            mode='contained'
                            size={34}
                            onPress={() => handleDownload('filemoon')}
                            icon='download'
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button
                            style={{ width: '65%' }}
                            mode='contained'
                            onLongPress={() => clipboardToast(`${extractedUrl}&sv=streamtape`)}
                            onPress={() => handleNavigate('streamtape')}
                        >
                            {`Streamtape`}
                        </Button>
                        <IconButton
                            mode='contained'
                            size={34}
                            onPress={() => handleDownload('streamtape')}
                            icon='download'
                        />
                    </View>
                </View>
            </View>
        </ShowModalFade>
    );
};

// Export
export default OptionsEpisode;