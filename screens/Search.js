import React, { useEffect, useReducer, useState } from 'react';
import WebScraping from '../components/web/WebScraping';
import HeaderSearch from './includes/HeaderSearch';
import { View, ScrollView, Pressable, Image } from 'react-native';
import { encodeWithPlus } from '../hooks/Fuctions';
import { GENRES_MOVIES, VIZER_SEARCH } from '../hooks/Constants';
import ActivityTemp from '../components/ActivityTemp';
import { useNavigation } from '@react-navigation/native';
import { SCRIPT_NEW_MOVIES, SCRIPT_PAGES } from '../hooks/Scripts';
import Styles from '../hooks/Styles';
import FlatlistVertical from '../components/FlatlistVertical';
import MyText from '../components/MyText';
import Colors from '../hooks/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import Footer from './includes/Footer';

const reducer = (state, action) => {
    switch (action.type) {
        case 'preview':
            return { ...state, Page: Math.max(state.Page - 1, 1) };
        case 'next':
            return { ...state, Page: state.Page + 1 };
        case 'setTotalPage':
            return { ...state, TotalPage: action.payload };
        default:
            return state;
    }
};

const genreKey = {
    'recente': require('../assets/genres/faroeste+recente.png'),
    'animacao': require('../assets/genres/animacao.png'),
    'aventura': require('../assets/genres/aventura.png'),
    'acao': require('../assets/genres/acao.png'),
    'comedia': require('../assets/genres/nacional+comedia.png'),
    'crime': require('../assets/genres/crime.png'),
    'documentario': require('../assets/genres/documentario.png'),
    'drama': require('../assets/genres/drama+romance.png'),
    'familia': require('../assets/genres/familia.png'),
    'fantasia': require('../assets/genres/fantasia.png'),
    'faroeste': require('../assets/genres/faroeste+recente.png'),
    'ficcao': require('../assets/genres/ficcao.png'),
    'guerra': require('../assets/genres/guerra.png'),
    'historia': require('../assets/genres/historia.png'),
    'misterio': require('../assets/genres/misterio.png'),
    'musica': require('../assets/genres/musica.png'),
    'nacional': require('../assets/genres/nacional+comedia.png'),
    'romance': require('../assets/genres/drama+romance.png'),
    'suspense': require('../assets/genres/suspense.png'),
    'terror': require('../assets/genres/terror.png'),
};

const Search = () => {
    const navigation = useNavigation();

    const [isString, setString] = useState('');
    const [isResults, setResults] = useState([]);
    const [isStringSearch, setStringSearch] = useState('');

    const [isLoaded, setLoaded] = useState(true);

    const [state, dispatch] = useReducer(reducer, {
        TotalPage: null,
        Page: 1,
    });

    const searchUrl = `${VIZER_SEARCH}${isStringSearch}&page=${state.Page}`;

    useEffect(() => {
        setStringSearch(encodeWithPlus(isString));
    }, [isString]);

    useEffect(() => {
        if (isResults.length > 0) {
            setLoaded(false);
        }
    }, [isResults]);

    return (
        <>
            <ScrollView style={Styles.ContainerView} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <HeaderSearch setStringSearch={setString} />
                {isStringSearch ? (
                    <>
                        <WebScraping
                            isUrl={searchUrl}
                            isInjectedJavaScript={SCRIPT_NEW_MOVIES}
                            setHandleMessage={(results) => {
                                setResults(JSON.parse(results));
                            }}
                        />
                        <WebScraping
                            isUrl={`${VIZER_SEARCH}${isStringSearch}`}
                            isInjectedJavaScript={SCRIPT_PAGES}
                            setHandleMessage={(results) => {
                                dispatch({ type: 'setTotalPage', payload: parseInt(results) });
                            }}
                        />
                        {isResults.length > 0 && state.TotalPage !== null && (
                            <>
                                <View style={[Styles.Header, { paddingHorizontal: 10 }]}>
                                    {state.Page !== 1 && (
                                        <Pressable
                                            style={Styles.ButtonPage}
                                            onPress={() => {
                                                setLoaded(true);
                                                dispatch({ type: 'preview' })
                                            }}
                                        >
                                            <MyText type='topic'>
                                                {`Anterior`}
                                            </MyText>
                                        </Pressable>
                                    )}
                                    <MyText type='topic'>{`Páginas: ${state.TotalPage}`}</MyText>
                                    {state.Page !== state.TotalPage && (
                                        <Pressable
                                            style={Styles.ButtonPage}
                                            onPress={() => {
                                                setLoaded(true);
                                                dispatch({ type: 'next' })
                                            }}
                                        >
                                            <MyText type='topic'>
                                                {`Próximo`}
                                            </MyText>
                                        </Pressable>
                                    )}
                                </View>
                                <View style={Styles.Hr} />
                                <FlatlistVertical data={isResults} />
                                <Footer />
                            </>
                        )}
                    </>
                ) : (
                    <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {GENRES_MOVIES.map(({ key, title, url }) => (
                            <Pressable
                                key={key}
                                style={{
                                    width: '40%',
                                    height: 100,
                                    backgroundColor: Colors.sky.b,
                                    marginHorizontal: '5%',
                                    marginVertical: 10,
                                    justifyContent: 'flex-end',
                                    borderRadius: 10,
                                    overflow: 'hidden',
                                    position: 'relative'
                                }}
                                onPress={() => navigation.navigate('ResultsGenre', { title, url })}
                            >
                                <Image
                                    source={genreKey[key]}
                                    style={{ position: 'absolute', width: '100%', height: '100%' }}
                                    resizeMode='cover'
                                />
                                <LinearGradient colors={['transparent', Colors.background.c]}>
                                    <MyText
                                        type='topic'
                                        style={{ textTransform: 'capitalize', width: '100%', textAlign: 'center' }}
                                    >
                                        {title}
                                    </MyText>
                                </LinearGradient>
                            </Pressable>
                        ))}
                        <Footer />
                    </View>
                )}
            </ScrollView>
            {isStringSearch && isLoaded && (
                <View style={{ width: '100%', height: '100%', position: 'absolute' }}>
                    <ActivityTemp />
                </View>
            )}
        </>
    );
};

// Export
export default Search;
