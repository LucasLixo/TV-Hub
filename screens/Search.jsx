import React, { useContext, useEffect, useReducer, useState } from 'react';
import WebScraping from '../components/web/WebScraping';
import { View, ScrollView, Pressable } from 'react-native';
import { encodeWithPlus } from '../utils/Fuctions';
import {
    MD3DarkTheme,
    Text,
    Card,
    Button,
    Divider,
} from 'react-native-paper';
import { GENRES_MOVIES, VIZER_SEARCH } from '../utils/Constants';
import ActivityTemp from '../components/ActivityTemp';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SCRIPT_NEW_MOVIES, SCRIPT_PAGES } from '../utils/Scripts';
import Styles from '../utils/Styles';
import FlatlistVertical from '../components/FlatlistVertical';
import Footer from './includes/Footer';
import uuid from 'react-native-uuid';
import { VizerContext } from '../utils/VizerProvider';
import MyMD3 from '../utils/MyMD3';

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
    const theme = { 
        ...MD3DarkTheme, 
        colors: MyMD3.dark 
    }    

    const vizerHost = useContext(VizerContext);

    const navigation = useNavigation();
    const route = useRoute();

    const [isString, setString] = useState(() => { return '' });
    const [isResults, setResults] = useState(() => { return [] });
    const [isStringSearch, setStringSearch] = useState(() => { return '' });

    const [isLoaded, setLoaded] = useState(() => { return true });

    const [state, dispatch] = useReducer(reducer, {
        TotalPage: null,
        Page: 1,
    });

    const searchUrl = `${VIZER_SEARCH}${isStringSearch}&page=${state.Page}`;

    useEffect(() => {
        if (route.params?.query) {
            setString(route.params.query);
        }
    }, [route.params?.query]);

    useEffect(() => {
        setStringSearch(encodeWithPlus(isString));
    }, [isString]);

    useEffect(() => {
        if (isResults.length > 0) {
            setLoaded(false);
        }
    }, [isResults]);

    useEffect(() => {
        setLoaded(true);
    }, [isStringSearch]);

    const handleResults = (results) => {
        const parsedResults = JSON.parse(results);
        if (JSON.stringify(isResults) !== JSON.stringify(parsedResults)) {
            setResults(parsedResults);
        }
    };

    return (
        <>
            {vizerHost && (
                <>
                    <ScrollView style={[Styles.ContainerView, { paddingTop: 10 }]} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                        {isStringSearch ? (
                            <>
                                <WebScraping
                                    isUrl={vizerHost + searchUrl}
                                    isInjectedJavaScript={SCRIPT_NEW_MOVIES}
                                    setHandleMessage={handleResults}
                                />
                                <WebScraping
                                    isUrl={`${vizerHost}${VIZER_SEARCH}${isStringSearch}`}
                                    isInjectedJavaScript={SCRIPT_PAGES}
                                    setHandleMessage={(results) => {
                                        dispatch({ type: 'setTotalPage', payload: parseInt(results) });
                                    }}
                                />
                                {isResults.length > 0 && state.TotalPage !== null && (
                                    <>
                                        <View style={[Styles.Header, { paddingHorizontal: 10 }]}>
                                            {state.TotalPage !== 0 && state.Page > 1 && (
                                                <Button
                                                    mode='contained'
                                                    onPress={() => {
                                                        setLoaded(true);
                                                        dispatch({ type: 'preview' });
                                                    }}
                                                >
                                                    {`Anterior`}
                                                </Button>
                                            )}
                                            {state.TotalPage !== 0 && state.Page !== state.TotalPage && (
                                                <Button
                                                    mode='contained'
                                                    onPress={() => {
                                                        setLoaded(true);
                                                        dispatch({ type: 'next' });
                                                    }}
                                                >
                                                    {`Próximo`}
                                                </Button>
                                            )}
                                        </View>
                                        <Divider style={{ marginVertical: 5 }} />
                                        <View style={[Styles.Header, { paddingHorizontal: 10 }]}>
                                            <Text variant="titleSmall">{`Total de Páginas: ${state.TotalPage}`}</Text>
                                            <Text variant="titleSmall">{`Página: ${state.Page}`}</Text>
                                        </View>
                                        <Divider style={{ marginVertical: 5 }} />
                                        <FlatlistVertical data={isResults} />
                                        <Footer />
                                    </>
                                )}
                            </>
                        ) : (
                            <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                                {GENRES_MOVIES.map(({ key, title, url }) => (
                                    <Pressable
                                        key={uuid.v4()}
                                        style={{
                                            width: '40%',
                                            height: 160,
                                            backgroundColor: theme.colors.primary,
                                            marginHorizontal: '5%',
                                            marginVertical: 10,
                                            justifyContent: 'flex-end',
                                            borderRadius: 10,
                                            overflow: 'hidden',
                                            position: 'relative'
                                        }}
                                        onPress={() => navigation.navigate('ResultsGenre', { title, url : vizerHost + url })}
                                    >
                                        <Card>
                                            <Card.Cover source={genreKey[key]} style={{ resizeMode: 'cover' }} />
                                            <Card.Content>
                                                <Text variant="titleSmall" style={{ textTransform: 'capitalize' }} numberOfLines={1} ellipsizeMode='tail' >{title}</Text>
                                            </Card.Content>
                                        </Card>
                                    </Pressable>
                                ))}
                                <Footer />
                            </View>
                        )}
                    </ScrollView>
                    {isStringSearch && isLoaded && (
                        <View style={{ flex: 1, width: '100%', height: '100%', position: 'absolute', backgroundColor: theme.colors.background }}>
                            <ActivityTemp />
                        </View>
                    )}
                </>
            )}
        </>
    );
};

// Export
export default Search;
