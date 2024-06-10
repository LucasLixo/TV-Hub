import React, { useState } from 'react';
import HeaderTitle from './includes/HeaderTitle';
import { FlatList, Image, Pressable, ScrollView, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Styles from '../utils/Styles';
import WebScraping from '../components/web/WebScraping';
import { SCRIPT_DETAILS_MOVIES, SCRIPT_EPISODES } from '../utils/Scripts';
import ActivityTemp from '../components/ActivityTemp';
import ShowModalData from '../components/ShowModalData';
import {
    MD3DarkTheme as theme,
    Text,
    Icon
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

    return (
        <>
            {data && (
                <>
                    {isDetails ? (
                        <ScrollView style={{ width: '100%', paddingLeft: 10 }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                            <HeaderTitle title={data.title} />
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
                                    <View style={Styles.Hr} />
                                    <Text variant="titleSmall">
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
                                                const backgroundColor = isSelectedIndex === index ? theme.colors.primary : theme.colors.elevation.level4;

                                                return (
                                                    <Pressable
                                                        style={{
                                                            height: '100%',
                                                            paddingHorizontal: 10,
                                                            borderRadius: 10,
                                                            backgroundColor,
                                                            justifyContent: 'center',
                                                            marginRight: 10
                                                        }}
                                                        onPress={() => {
                                                            setSelectedIndex(index);
                                                            setLoadEpsisodes(true);
                                                            setSeasonLink(`?temporada=${index + 1}`);
                                                        }}
                                                    >
                                                        <Text variant="titleSmall">
                                                            {item.title}
                                                        </Text>
                                                    </Pressable>
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
                                            <View style={Styles.Hr} />
                                            <Text variant="titleSmall">
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
                                                            style={{
                                                                height: '100%',
                                                            }}
                                                            keyExtractor={(item, index) => `episode-${index}-${item.title}`}
                                                            horizontal={true}
                                                            showsHorizontalScrollIndicator={false}
                                                            showsVerticalScrollIndicator={false}
                                                            renderItem={({ item, index }) => (
                                                                <Pressable
                                                                    style={{
                                                                        height: '100%',
                                                                        flexDirection: 'row',
                                                                        paddingHorizontal: 10,
                                                                        borderRadius: 10,
                                                                        backgroundColor: theme.colors.primary,
                                                                        alignItems: 'center',
                                                                        marginRight: 10
                                                                    }}
                                                                    onPress={() => {
                                                                        setUrlPD(item.link.replace(/\s+/g, '').replace(/.*:\/\//, 'https://'))
                                                                        setModalEpisode(!isModalEpisode)
                                                                    }}
                                                                >
                                                                    <Text variant="titleSmall">
                                                                        {`Episódio ${index + 1} `}
                                                                    </Text>
                                                                </Pressable>
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
                                    <View style={Styles.Hr} />
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10 }}>
                                        <Text variant="titleSmall">
                                            {'Assistir'}
                                        </Text>
                                        <Text variant="titleSmall">
                                            {'Baixar'}
                                        </Text>
                                    </View>
                                    <View style={Styles.ContainerServices}>
                                        <Pressable style={Styles.ContainerServicesPressable} onPress={() => setShowPlayer(!isShowPlayer)}>
                                            <Icon source="play" size={32} />
                                        </Pressable>
                                        <Pressable style={Styles.ContainerServicesPressable} onPress={() => setShowDownload(!isShowDownload)}>
                                            <Icon source="download" size={32} />
                                        </Pressable>
                                    </View>
                                </>
                            )}
                            {isDetails.genres && isDetails.genres.length > 0 && (
                                <>
                                    <View style={Styles.Hr} />
                                    <Text variant="titleSmall">
                                        {'Generos'}
                                    </Text>
                                    <View style={[Styles.ContainerServices, { paddingRight: 0 }]}>
                                        <FlatList
                                            data={isDetails.genres}
                                            style={{
                                                height: '100%',
                                            }}
                                            keyExtractor={(item, index) => `genre-${index}-${item.title}`}
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={false}
                                            showsVerticalScrollIndicator={false}
                                            renderItem={({ item, index }) => (
                                                <Pressable
                                                    style={{
                                                        height: '100%',
                                                        paddingHorizontal: 10,
                                                        borderRadius: 10,
                                                        backgroundColor: theme.colors.onPrimary,
                                                        justifyContent: 'center',
                                                        marginRight: 10
                                                    }}
                                                    onPress={() => navigation.navigate('ResultsGenre', { title: item.title, url: item.link })}
                                                >
                                                    <Text variant="titleSmall">
                                                        {item.title}
                                                    </Text>
                                                </Pressable>
                                            )}
                                        />
                                    </View>
                                </>
                            )}
                            {isDetails.title && (
                                <>
                                    <View style={Styles.Hr} />
                                    <Text variant="titleSmall">
                                        {'Titulo original\n'}
                                        <Text type='description'>
                                            {isDetails.title}
                                        </Text>
                                    </Text>
                                </>
                            )}
                            <Pressable
                                onPress={() => setShowMessage(!isShowMessage)}
                                style={{ flexDirection: 'column' }}
                            >
                                <View style={Styles.Hr} />
                                <Text
                                    variant="titleSmall"
                                    numberOfLines={5}
                                    ellipsizeMode='tail'
                                >
                                    {`Sinopse\n`}
                                    <Text type='description'>
                                        {isDetails.sinopse.replace('Ler mais...', '')}
                                    </Text>
                                </Text>
                            </Pressable>
                            <View style={Styles.Hr} />
                            <Text variant="titleSmall">
                                {`Duração\n`}
                                <Text type='description'>
                                    {data.time}
                                </Text>
                            </Text>
                            <View style={Styles.Hr} />
                            <Text variant="titleSmall">
                                {`Diretor\n`}
                                <Text type='description'>
                                    {isDetails.diretor.replace(/<b>.*?<\/b> /g, '')}
                                </Text>
                            </Text>
                            <View style={Styles.Hr} />
                            <Text variant="titleSmall">
                                {`Elenco\n`}
                                <Text type='description'>
                                    {isDetails.elenco.replace(/<b>.*?<\/b> /g, '')}
                                </Text>
                            </Text>
                            <View style={Styles.Hr} />
                            <Text variant="titleSmall">
                                {`Produtor\n`}
                                <Text type='description'>
                                    {isDetails.produtor.replace(/<b>.*?<\/b> /g, '')}
                                </Text>
                            </Text>
                            <View style={Styles.Hr} />
                            <Pressable
                                style={{
                                    backgroundColor: theme.colors.onPrimary,
                                    paddingVertical: 5,
                                    paddingHorizontal: 10,
                                    borderRadius: 10,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                                onPress={() => navigation.navigate('Comments', { url: isDetails.comments })}
                            >
                                <>
                                    <Text variant="titleSmall">
                                        {` Comentários`}
                                    </Text>
                                    <Icon source='chat-processing' size={32} />
                                </>
                            </Pressable>
                            <View style={Styles.Hr} />
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
                            <HeaderTitle title={data.title} />
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
