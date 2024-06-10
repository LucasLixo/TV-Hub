import React from 'react';
import { Pressable, View } from 'react-native';
import { clipboardToast, extractUrlVizer } from '../../utils/Fuctions';
import { useNavigation } from '@react-navigation/native';
import ShowModalFade from '../../components/ShowModalFade';
import Styles from '../../utils/Styles';
import {
    MD3DarkTheme as theme,
    Text,
    Icon
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
                <Text variant='titleSmall' style={{ marginBottom: 10 }}>
                    {`Assistir`}
                </Text>
                <View style={Styles.CardIn}>
                    <Pressable
                        style={Styles.CardContainer}
                        onLongPress={() => clipboardToast(`${extractedUrl}&sv=mixdrop`)}
                        onPress={() => handleNavigate('mixdrop')}
                    >
                        <Text  variant='titleSmall'>{`Mixdrop`}</Text>
                        <Pressable onPress={() => clipboardToast(`${extractedUrl}&sv=mixdrop`)}>
                            <Icon source='link' size={28} />
                        </Pressable>
                    </Pressable>
                    <View style={[Styles.Hr, { borderBottomColor: theme.colors.elevation.level4 }]} />
                    <Pressable
                        style={Styles.CardContainer}
                        onPress={() => handleNavigate('filemoon')}
                    >
                        <Text  variant='titleSmall'>{`Filemoon`}</Text>
                        <Pressable onPress={() => clipboardToast(`${extractedUrl}&sv=filemoon`)}>
                            <Icon source='link' size={28} />
                        </Pressable>
                    </Pressable>
                    <View style={[Styles.Hr, { borderBottomColor: theme.colors.elevation.level4 }]} />
                    <Pressable
                        style={Styles.CardContainer}
                        onPress={() => handleNavigate('streamtape')}
                    >
                        <Text  variant='titleSmall'>{`Streamtape`}</Text>
                        <Pressable onPress={() => clipboardToast(`${extractedUrl}&sv=streamtape`)}>
                            <Icon source='link' size={28} />
                        </Pressable>
                    </Pressable>
                </View>
            </View>
        </ShowModalFade>
    );
};

// Export
export default OptionsPlayer;