import React from 'react';
import { Pressable, View } from 'react-native';
import { extractUrlVizer } from '../../utils/Fuctions';
import ShowModalFade from '../../components/ShowModalFade';
import Styles from '../../utils/Styles';
import {
    MD3DarkTheme as theme,
    Text,
    Icon
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
                    <Pressable
                        style={Styles.CardContainer}
                        onPress={() => handleDownload('mixdrop')}
                    >
                        <Text variant='titleSmall'>{`Mixdrop`}</Text>
                        <Icon source='download' size={28} />
                    </Pressable>
                    <View style={[Styles.Hr, { borderBottomColor: theme.colors.elevation.level4 }]} />
                    <Pressable
                        style={Styles.CardContainer}
                        onPress={() => handleDownload('filemoon')}
                    >
                        <Text variant='titleSmall'>{`Filemoon`}</Text>
                        <Icon source='download' size={28} />
                    </Pressable>
                    <View style={[Styles.Hr, { borderBottomColor: theme.colors.elevation.level4 }]} />
                    <Pressable
                        style={Styles.CardContainer}
                        onPress={() => handleDownload('streamtape')}
                    >
                        <Text variant='titleSmall'>{`Streamtape`}</Text>
                        <Icon source='download' size={28} />
                    </Pressable>
                </View>
            </View>
        </ShowModalFade>
    );
};

// Export
export default OptionsDownload;