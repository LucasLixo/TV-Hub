import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Styles from '../utils/Styles';
import WebScraping from '../components/web/WebScraping';
import { SCRIPT_DETAILS_MOVIES, SCRIPT_EPISODES } from '../utils/Scripts';
import ActivityTemp from '../components/ActivityTemp';
import ShowModalData from '../components/ShowModalData';
import {
    Text,
    Button,
    Divider,
} from 'react-native-paper';
import OptionsPlayer from './includes/OptionsPlayer';

const DetailsMovie = () => {
    const route = useRoute();

    const [isDetails, setDetails] = useState(() => { return null });
    const [isShowMessage, setShowMessage] = useState(() => { return false });
    const [isShowImage, setShowImage] = useState(() => { return false });

    const [isSelectedIndex, setSelectedIndex] = useState(() => { return 0 });

    const [isModalEpisode, setModalEpisode] = useState(() => { return false });
    const [isUrlPD, setUrlPD] = useState(() => { return '' });

    const [isEpsisodes, setEpsisodes] = useState([]);
    const [isLoadEpsisodes, setLoadEpsisodes] = useState(() => { return false });

    const [isSeasonLink, setSeasonLink] = useState(() => { return '?temporada=1' });

    const [isShowPlayer, setShowPlayer] = useState(() => { return false });

    const navigation = useNavigation();
    const data = route.params?.data;

    useEffect(() => {
        navigation.setOptions({ title: data.title });
    }, [data]);

    return (
        <>
            {data && (
                <>
                    {isDetails ? (
                        <ScrollView style={{ width: '100%', paddingLeft: 10 }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                            <View style={{ alignItems: 'center' }}>
                                <Pressable onPress={() => setShowImage(!isShowImage)}>
                                    <Image
                                        style={Styles.Item}
                                        source={{ uri: data.img }}
                                    />
                                    <Text
                                        style={[Styles.ItemTopText, Styles.TextTitle, { left: 15, top: 15, fontWeight: 'bold' }]}
                                        type='titleSmall'
                                    >
                                        {data.language == 'DUB' ? `Dublado` : `Legendado`}
                                    </Text>
                                </Pressable>
                            </View>
                            {isDetails.season && isDetails.season.length > 0 ? (
                                <>
                                    <Divider style={{ marginVertical: 5 }} />
                                    <Text variant="titleMedium">
                                        {'Temporadas'}
                                    </Text>
                                    <View style={[Styles.ContainerServices, { paddingRight: 0 }]}>
                                        <FlatList
                                            data={isDetails.season}
                                            style={{
                                                height: '100%',
                                            }}
                                            keyExtractor={(item, index) => `season-${index}-${item.title}`}
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={false}
                                            showsVerticalScrollIndicator={false}
                                            renderItem={({ item, index }) => {
                                                const modeButton = isSelectedIndex === index ? 'contained' : 'outlined';

                                                return (
                                                    <Button
                                                        mode={modeButton}
                                                        onPress={() => {
                                                            setSelectedIndex(index);
                                                            setLoadEpsisodes(true);
                                                            setSeasonLink(`?temporada=${index + 1}`);
                                                        }}
                                                        style={{
                                                            marginRight: 10
                                                        }}
                                                    >
                                                        {item.title}
                                                    </Button>
                                                )
                                            }}
                                        />
                                    </View>
                                    <WebScraping
                                        isUrl={`${data.url}${isSeasonLink}`}
                                        isInjectedJavaScript={SCRIPT_EPISODES}
                                        setHandleMessage={(results) => {
                                            const { episodes } = JSON.parse(results);
                                            if (episodes && episodes.length > 0) {
                                                setEpsisodes(episodes);
                                                setLoadEpsisodes(false);
                                            }
                                        }}
                                    />
                                    {isEpsisodes && isEpsisodes.length > 0 && (
                                        <>
                                            {!isLoadEpsisodes && (
                                                <>
                                                    <Divider style={{ marginVertical: 5 }} />
                                                    <Text variant="titleMedium">
                                                        {'Episódios'}
                                                    </Text>
                                                    <View style={[Styles.ContainerServices, { paddingRight: 0 }]}>
                                                        <FlatList
                                                            data={isEpsisodes}
                                                            keyExtractor={(item, index) => `episode-${index}-${item.title}`}
                                                            horizontal={true}
                                                            showsHorizontalScrollIndicator={false}
                                                            showsVerticalScrollIndicator={false}
                                                            renderItem={({ item, index }) => (
                                                                <Button
                                                                    mode='contained'
                                                                    onPress={() => {
                                                                        setUrlPD(item.link.replace(/\s+/g, '').replace(/.*:\/\//, 'https://'))
                                                                        setShowPlayer(!isShowPlayer)
                                                                    }}
                                                                    style={{ marginRight: 10 }}
                                                                >
                                                                    {`Episódio ${index + 1} `}
                                                                </Button>
                                                            )}
                                                        />
                                                    </View>
                                                </>
                                            )}
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    <Divider style={{ marginVertical: 5 }} />
                                    <Button
                                        mode='contained'
                                        onPress={() => setShowPlayer(!isShowPlayer)}
                                        icon='play'
                                        
                                    >
                                        {`Assistir`}
                                    </Button>
                                </>
                            )}
                            {isDetails.genres && isDetails.genres.length > 0 && (
                                <>
                                    <Divider style={{ marginVertical: 5 }} />
                                    <Text variant="titleMedium">
                                        {'Generos'}
                                    </Text>
                                    <View style={[Styles.ContainerServices, { paddingRight: 0 }]}>
                                        <FlatList
                                            data={isDetails.genres}
                                            keyExtractor={(item, index) => `genre-${index}-${item.title}`}
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={false}
                                            showsVerticalScrollIndicator={false}
                                            renderItem={({ item }) => (
                                                <Button
                                                    mode='contained-tonal'
                                                    style={{ marginRight: 10 }}
                                                >
                                                    {item.title}
                                                </Button>
                                            )}
                                        />
                                    </View>
                                </>
                            )}
                            {isDetails.title && (
                                <>
                                    <Divider style={{ marginVertical: 5 }} />
                                    <Text variant="titleMedium">
                                        {'Titulo original'}
                                    </Text>
                                    <Text variant='titleSmall'>
                                        {isDetails.title}
                                    </Text>
                                </>
                            )}
                            <Pressable
                                onPress={() => setShowMessage(!isShowMessage)}
                                style={{ flexDirection: 'column' }}
                            >
                                <Divider style={{ marginVertical: 5 }} />
                                <Text variant="titleMedium">
                                    {`Sinopse`}
                                </Text>
                                <Text
                                    variant='titleSmall'
                                    numberOfLines={5}
                                    ellipsizeMode='tail'
                                >
                                    {isDetails.sinopse.replace('Ler mais...', '')}
                                </Text>
                            </Pressable>
                            <Divider style={{ marginVertical: 5 }} />
                            <Text variant="titleMedium">
                                {`Duração`}
                            </Text>
                            <Text variant='titleSmall'>
                                {data.time}
                            </Text>
                            <Divider style={{ marginVertical: 5 }} />
                            <Text variant="titleMedium">
                                {`Diretor`}
                            </Text>
                            <Text variant='titleSmall'>
                                {isDetails.diretor.replace(/<b>.*?<\/b> /g, '')}
                            </Text>
                            <Divider style={{ marginVertical: 5 }} />
                            <Text variant="titleMedium">
                                {`Elenco`}
                            </Text>
                            <Text
                                variant='titleSmall'
                                numberOfLines={3}
                                ellipsizeMode='tail'
                            >
                                {isDetails.elenco.replace(/<b>.*?<\/b> /g, '')}
                            </Text>
                            <Divider style={{ marginVertical: 5 }} />
                            <Text variant="titleMedium">
                                {`Produtor`}
                            </Text>
                            <Text variant='titleSmall'>
                                {isDetails.produtor.replace(/<b>.*?<\/b> /g, '')}
                            </Text>
                            <Divider style={{ marginVertical: 5 }} />
                            <Button
                                mode='contained'
                                onPress={() => navigation.navigate('Comments', { url: isDetails.comments })}
                                icon='chat-processing'
                            >
                                {`Comentários`}
                            </Button>
                            <Divider style={{ marginVertical: 5 }} />
                            <ShowModalData
                                isModalVisible={isShowMessage}
                                setModalVisible={() => setShowMessage(!isShowMessage)}
                                Data={`Sinopse: ${isDetails.sinopse.replace('Ler mais...', '')}`}
                            />
                            <ShowModalData
                                isModalVisible={isShowImage}
                                setModalVisible={() => setShowImage(!isShowImage)}
                                Data={data.img}
                            />
                            {isEpsisodes && isEpsisodes.length > 0 ? (
                                <OptionsPlayer
                                    isModalVisible={isShowPlayer}
                                    setModalVisible={() => setShowPlayer(!isShowPlayer)}
                                    url={isUrlPD}
                                />
                            ) : (
                                <OptionsPlayer
                                    isModalVisible={isShowPlayer}
                                    setModalVisible={() => setShowPlayer(!isShowPlayer)}
                                    url={data.url}
                                />
                            )}
                        </ScrollView>
                    ) : (
                        <View style={{ flex: 1, width: '100%', height: '100%', position: 'absolute' }}>
                            <ActivityTemp />
                        </View>
                    )}
                    {isLoadEpsisodes && (
                        <View style={{ flex: 1, width: '100%', height: '100%', position: 'absolute', backgroundColor: '#00000080' }}>
                            <ActivityTemp />
                        </View>
                    )}
                    <WebScraping
                        isUrl={data.url}
                        isInjectedJavaScript={SCRIPT_DETAILS_MOVIES}
                        setHandleMessage={(results) => {
                            setDetails(JSON.parse(results))
                        }}
                    />
                </>
            )}
        </>
    );
};

// Export
export default DetailsMovie;
