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
import OptionsDownload from './includes/OptionsDownload';
import OptionsEpisode from './includes/OptionsEpisode';
import Footer from './includes/Footer';

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
    const [isShowDownload, setShowDownload] = useState(() => { return false });

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
                                        style={Styles.FlatlistHorizontal}
                                        source={{ uri: data.img }}
                                    />
                                    {data.language == 'DUB' ? (
                                        <Text
                                            style={[Styles.FlatlistHorizontalLanguage, { fontWeight: 'bold' }]}
                                            type='subtitle'
                                        >
                                            {`Dublado`}
                                        </Text>
                                    ) : (
                                        <Text
                                            style={[Styles.FlatlistHorizontalLanguage, { fontWeight: 'bold' }]}
                                            type='subtitle'
                                        >
                                            {`Legendado`}
                                        </Text>
                                    )}
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
                                            <Divider style={{ marginVertical: 5 }} />
                                            <Text variant="titleMedium">
                                                {'Episódios'}
                                            </Text>
                                            {isLoadEpsisodes ? (
                                                <View style={[Styles.ContainerServices, { position: 'relative' }]}>
                                                    <ActivityTemp />
                                                </View>
                                            ) : (
                                                <>
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
                                                                        setModalEpisode(!isModalEpisode)
                                                                    }}
                                                                    style={{
                                                                        marginRight: 10
                                                                    }}
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
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10 }}>
                                        <Button
                                            mode='contained'
                                            onPress={() => setShowPlayer(!isShowPlayer)}
                                            icon='play'
                                        >
                                            {`Assistir`}
                                        </Button>
                                        <Button
                                            mode='contained'
                                            onPress={() => setShowDownload(!isShowDownload)}
                                            icon='download'
                                        >
                                            {`Baixar`}
                                        </Button>
                                    </View>
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
                                                    onPress={() => navigation.navigate('ResultsGenre', { title: item.title, url: item.link })}
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
                            {isDetails.comments && (
                                <>
                                    <Button
                                        mode='contained'
                                        onPress={() => navigation.navigate('Comments', { url: isDetails.comments })}
                                        icon='chat-processing'
                                    >
                                        {`Comentários`}
                                    </Button>
                                    <Divider style={{ marginVertical: 5 }} />
                                </>
                            )}
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
                                <OptionsEpisode
                                    isModalVisible={isModalEpisode}
                                    setModalVisible={() => setModalEpisode(!isModalEpisode)}
                                    url={isUrlPD}
                                    title={data.title}
                                />
                            ) : (
                                <>
                                    <OptionsPlayer
                                        isModalVisible={isShowPlayer}
                                        setModalVisible={() => setShowPlayer(!isShowPlayer)}
                                        url={data.url}
                                    />
                                    <OptionsDownload
                                        isModalVisible={isShowDownload}
                                        setModalVisible={() => setShowDownload(!isShowDownload)}
                                        url={data.url}
                                        title={data.title}
                                    />
                                </>
                            )}
                            <Footer />
                        </ScrollView>
                    ) : (
                        <View style={{ flex: 1, width: '100%', height: '100%', position: 'absolute' }}>
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
