import React from 'react';
import { View } from 'react-native';
import { clipboardToast, extractUrlVizer } from '../../utils/Fuctions';
import { useNavigation } from '@react-navigation/native';
import {
    MD3DarkTheme as theme,
    Text,
    Button
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
                    <View style={{ flexDirection: 'column', width: '70%' }}>
                        <Button
                            mode='contained'
                            onLongPress={() => clipboardToast(`${extractedUrl}&sv=mixdrop`)}
                            onPress={() => handleNavigate('mixdrop')}
                        >
                            {`Mixdrop`}
                        </Button>
                        <View style={[Styles.Hr, { borderBottomColor: theme.colors.elevation.level3 }]} />
                        <Button
                            mode='contained'
                            onLongPress={() => clipboardToast(`${extractedUrl}&sv=filemoon`)}
                            onPress={() => handleNavigate('filemoon')}
                        >
                            {`Filemoon`}
                        </Button>
                        <View style={[Styles.Hr, { borderBottomColor: theme.colors.elevation.level3 }]} />
                        <Button
                            mode='contained'
                            onLongPress={() => clipboardToast(`${extractedUrl}&sv=streamtape`)}
                            onPress={() => handleNavigate('streamtape')}
                        >
                            {`Streamtape`}
                        </Button>
                    </View>
                    <View style={{ width: '25%', justifyContent: 'space-between', alignItems: 'center', borderRadius: 5 }}>
                        <Button
                            mode='contained'
                            onPress={() => handleDownload('mixdrop')}
                            icon='download'
                        />
                        <View style={[Styles.Hr, { borderBottomColor: theme.colors.elevation.level3 }]} />
                        <Button
                            mode='contained'
                            onPress={() => handleDownload('filemoon')}
                            icon='download'
                        />
                        <View style={[Styles.Hr, { borderBottomColor: theme.colors.elevation.level3 }]} />
                        <Button
                            mode='contained'
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