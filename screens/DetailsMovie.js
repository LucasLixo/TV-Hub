import React, { useState } from 'react';
import HeaderTitle from './includes/HeaderTitle';
import { FlatList, Image, Pressable, ScrollView, View } from 'react-native';
import MyText from '../components/MyText';
import { useNavigation, useRoute } from '@react-navigation/native';
import Styles from '../hooks/Styles';
import WebScraping from '../components/web/WebScraping';
import { SCRIPT_DETAILS_MOVIES, SCRIPT_EPISODES } from '../hooks/Scripts';
import ActivityTemp from '../components/ActivityTemp';
import ShowModalData from '../components/ShowModalData';
import Colors from '../hooks/Colors';
import IconsStyle from '../hooks/IconsStyle';
import OptionsPlayer from './includes/OptionsPlayer';
import OptionsDownload from './includes/OptionsDownload';
import OptionsEpisode from './includes/OptionsEpisode';
import Footer from './includes/Footer';

const DetailsMovie = () => {
    const route = useRoute();
    const [isDetails, setDetails] = useState(null);
    const [isShowMessage, setShowMessage] = useState(false);
    const [isShowImage, setShowImage] = useState(false);

    const [isSelectedIndex, setSelectedIndex] = useState(0);

    const [isModalEpisode, setModalEpisode] = useState(false);
    const [isUrlPD, setUrlPD] = useState('');

    const [isEpsisodes, setEpsisodes] = useState([]);
    const [isLoadEpsisodes, setLoadEpsisodes] = useState(false);

    const [isSeasonLink, setSeasonLink] = useState('?temporada=1');

    const [isShowPlayer, setShowPlayer] = useState(false);
    const [isShowDownload, setShowDownload] = useState(false);

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
                                        <MyText
                                            style={[Styles.FlatlistHorizontalLanguage, { fontSize: 16, fontWeight: 'bold' }]}
                                            type='subtitle'
                                        >
                                            {`Dublado`}
                                        </MyText>
                                    ) : (
                                        <MyText
                                            style={[Styles.FlatlistHorizontalLanguage, { fontSize: 16, fontWeight: 'bold' }]}
                                            type='subtitle'
                                        >
                                            {`Legendado`}
                                        </MyText>
                                    )}
                                </Pressable>
                            </View>
                            {isDetails.season && isDetails.season.length > 0 ? (
                                <>
                                    <View style={Styles.Hr} />
                                    <MyText type='topic'>
                                        {'Temporadas'}
                                    </MyText>
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
                                                const backgroundColor = isSelectedIndex === index ? Colors.sky.b : Colors.gray.c;

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
                                                        <MyText type='topic'>
                                                            {item.title}
                                                        </MyText>
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
                                            <MyText type='topic'>
                                                {'Episódios'}
                                            </MyText>
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
                                                                        backgroundColor: Colors.sky.b,
                                                                        alignItems: 'center',
                                                                        marginRight: 10
                                                                    }}
                                                                    onPress={() => {
                                                                        setUrlPD(item.link.replace(/\s+/g, '').replace(/.*:\/\//, 'https://'))
                                                                        setModalEpisode(!isModalEpisode)
                                                                    }}
                                                                >
                                                                    <MyText type='topic'>
                                                                        {`Episódio ${index + 1} `}
                                                                    </MyText>
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
                                        <MyText type='topic'>
                                            {'Assistir'}
                                        </MyText>
                                        <MyText type='topic'>
                                            {'Baixar'}
                                        </MyText>
                                    </View>
                                    <View style={Styles.ContainerServices}>
                                        <Pressable
                                            style={Styles.ContainerServicesPressable}
                                            onPress={() => setShowPlayer(!isShowPlayer)}
                                        >
                                            <IconsStyle name='play' color={Colors.text.a} size={32} />
                                        </Pressable>
                                        <Pressable
                                            style={Styles.ContainerServicesPressable}
                                            onPress={() => setShowDownload(!isShowDownload)}
                                        >
                                            <IconsStyle name='download' color={Colors.text.a} size={32} />
                                        </Pressable>
                                    </View>
                                </>
                            )}
                            {isDetails.genres && isDetails.genres.length > 0 && (
                                <>
                                    <View style={Styles.Hr} />
                                    <MyText type='topic'>
                                        {'Generos'}
                                    </MyText>
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
                                                        backgroundColor: Colors.sky.b,
                                                        justifyContent: 'center',
                                                        marginRight: 10
                                                    }}
                                                    onPress={() => navigation.navigate('ResultsGenre', { title: item.title, url: item.link })}
                                                >
                                                    <MyText type='topic'>
                                                        {item.title}
                                                    </MyText>
                                                </Pressable>
                                            )}
                                        />
                                    </View>
                                </>
                            )}
                            {isDetails.title && (
                                <>
                                    <View style={Styles.Hr} />
                                    <MyText type='topic'>
                                        {'Titulo original\n'}
                                        <MyText type='description'>
                                            {isDetails.title}
                                        </MyText>
                                    </MyText>
                                </>
                            )}
                            <Pressable
                                onPress={() => setShowMessage(!isShowMessage)}
                                style={{ flexDirection: 'column' }}
                            >
                                <View style={Styles.Hr} />
                                <MyText
                                    type='topic'
                                    numberOfLines={5}
                                    ellipsizeMode='tail'
                                >
                                    {`Sinopse\n`}
                                    <MyText type='description'>
                                        {isDetails.sinopse.replace('Ler mais...', '')}
                                    </MyText>
                                </MyText>
                            </Pressable>
                            <View style={Styles.Hr} />
                            <MyText type='topic'>
                                {`Duração\n`}
                                <MyText type='description'>
                                    {data.time}
                                </MyText>
                            </MyText>
                            <View style={Styles.Hr} />
                            <MyText type='topic'>
                                {`Diretor\n`}
                                <MyText type='description'>
                                    {isDetails.diretor.replace(/<b>.*?<\/b> /g, '')}
                                </MyText>
                            </MyText>
                            <View style={Styles.Hr} />
                            <MyText type='topic'>
                                {`Elenco\n`}
                                <MyText type='description'>
                                    {isDetails.elenco.replace(/<b>.*?<\/b> /g, '')}
                                </MyText>
                            </MyText>
                            <View style={Styles.Hr} />
                            <MyText type='topic'>
                                {`Produtor\n`}
                                <MyText type='description'>
                                    {isDetails.produtor.replace(/<b>.*?<\/b> /g, '')}
                                </MyText>
                            </MyText>
                            <View style={Styles.Hr} />
                            <Pressable
                                style={{
                                    backgroundColor: Colors.sky.b,
                                    padding: 5,
                                    borderRadius: 10,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onPress={() => navigation.navigate('Comments', { url: isDetails.comments })}
                            >
                                <>
                                    <IconsStyle name='chat' color={Colors.text.a} size={32} />
                                    <MyText type='topic' style={{ fontSize: 16 }}>
                                        {` Comentários`}
                                    </MyText>
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
