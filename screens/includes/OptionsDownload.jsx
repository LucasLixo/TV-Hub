import React from 'react';
import { Pressable, View } from 'react-native';
import { extractUrlVizer } from '../../utils/Fuctions';
import ShowModalFade from '../../components/ShowModalFade';
import Styles from '../../utils/Styles';
import {
    MD3DarkTheme as theme,
    Text,
    Button
} from 'react-native-paper';
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
                <Text variant="titleSmall" style={{ marginBottom: 10 }}>
                    {`Baixar`}
                </Text>
                <View style={Styles.CardIn}>
                    <Button
                        mode='contained'
                        onPress={() => handleDownload('mixdrop')}
                    >
                        {`Mixdrop`}
                    </Button>
                    <View style={[Styles.Hr, { borderBottomColor: theme.colors.elevation.level3 }]} />
                    <Button
                        mode='contained'
                        onPress={() => handleDownload('filemoon')}
                    >
                        {`Filemoon`}
                    </Button>
                    <View style={[Styles.Hr, { borderBottomColor: theme.colors.elevation.level3 }]} />
                    <Button
                        mode='contained'
                        onPress={() => handleDownload('streamtape')}
                    >
                        {`Streamtape`}
                    </Button>
                </View>
            </View>
        </ShowModalFade>
    );
};

// Export
export default OptionsDownload;