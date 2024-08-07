import React from 'react';
import { View } from 'react-native';
import { clipboardToast, extractUrlVizer } from '../../utils/Fuctions';
import { useNavigation } from '@react-navigation/native';
import ShowModalFade from '../../components/ShowModalFade';
import Styles from '../../utils/Styles';
import {
    Text,
    Button,
    Divider
} from 'react-native-paper';

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
                <Text variant='titleMedium' style={{ marginBottom: 10 }}>
                    {`Assistir`}
                </Text>
                <View style={Styles.CardIn}>
                    <Button
                        mode='contained'
                        onLongPress={() => clipboardToast(`${extractedUrl}&sv=mixdrop`)}
                        onPress={() => handleNavigate('mixdrop')}
                    >
                        {`Mixdrop`}
                    </Button>
                    <Divider style={{ marginVertical: 5 }} />
                    <Button
                        mode='contained'
                        onLongPress={() => clipboardToast(`${extractedUrl}&sv=filemoon`)}
                        onPress={() => handleNavigate('filemoon')}
                    >
                        {`Filemoon`}
                    </Button>
                    <Divider style={{ marginVertical: 5 }} />
                    <Button
                        mode='contained'
                        onLongPress={() => clipboardToast(`${extractedUrl}&sv=streamtape`)}
                        onPress={() => handleNavigate('streamtape')}
                    >
                        {`Streamtape`}
                    </Button>
                </View>
            </View>
        </ShowModalFade>
    );
};

// Export
export default OptionsPlayer;