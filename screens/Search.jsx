import React, { useEffect, useReducer, useState } from 'react';
import WebScraping from '../components/web/WebScraping';
import HeaderSearch from './includes/HeaderSearch';
import { View, ScrollView, Pressable } from 'react-native';
import { encodeWithPlus } from '../utils/Fuctions';
import {
    MD3DarkTheme,
    Text,
    Card,
    Button
} from 'react-native-paper';
import { GENRES_MOVIES, VIZER_SEARCH } from '../utils/Constants';
import ActivityTemp from '../components/ActivityTemp';
import { useNavigation } from '@react-navigation/native';
import { SCRIPT_NEW_MOVIES, SCRIPT_PAGES } from '../utils/Scripts';
import Styles from '../utils/Styles';
import FlatlistVertical from '../components/FlatlistVertical';
import Footer from './includes/Footer';

const theme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        background: '#000000'
    }
};

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

    const [isString, setString] = useState(() => '');
    const [isResults, setResults] = useState(() => []);
    const [isStringSearch, setStringSearch] = useState(() => '');

    const [isLoaded, setLoaded] = useState(() => true);

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
            <ScrollView style={Styles.ContainerView} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <HeaderSearch setStringSearch={setString} />
                {isStringSearch ? (
                    <>
                        <WebScraping
                            isUrl={searchUrl}
                            isInjectedJavaScript={SCRIPT_NEW_MOVIES}
                            setHandleMessage={handleResults}
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
                                    {state.TotalPage != 0 && state.Page > 1 && (
                                        <Button
                                            mode='contained'
                                            onPress={() => {
                                                setLoaded(true)
                                                dispatch({ type: 'preview' })
                                            }}
                                        >
                                            {`Anterior`}
                                        </Button>
                                    )}
                                    <Text variant="titleSmall">{`Páginas: ${state.TotalPage}`}</Text>
                                    {state.TotalPage != 0 && state.Page !== state.TotalPage && (
                                        <Button
                                            mode='contained'
                                            onPress={() => {
                                                setLoaded(true)
                                                dispatch({ type: 'next' })
                                            }}
                                        >
                                            {`Próximo`}
                                        </Button>
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
                                    height: 160,
                                    backgroundColor: theme.colors.primary,
                                    marginHorizontal: '5%',
                                    marginVertical: 10,
                                    justifyContent: 'flex-end',
                                    borderRadius: 10,
                                    overflow: 'hidden',
                                    position: 'relative'
                                }}
                                onPress={() => navigation.navigate('ResultsGenre', { title, url })}
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
                <View style={{ position: 'absolute', top: '50%', height: 100, width: '100%', backgroundColor: theme.colors.background }}>
                    <ActivityTemp />
                </View>
            )}
        </>
    );
};

// Export
export default Search;
