import React, { useEffect, useReducer, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import ActivityTemp from '../components/ActivityTemp';
import FlatlistVertical from '../components/FlatlistVertical';
import {
    Text,
    Button,
    Divider,
} from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import Styles from '../utils/Styles';
import WebScraping from '../components/web/WebScraping';
import { SCRIPT_NEW_MOVIES, SCRIPT_PAGES } from '../utils/Scripts';
import Footer from './includes/Footer';
import { capitalizeString } from '../utils/Fuctions';

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

const Search = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [isResults, setResults] = useState(() => { return [] });
    const [isLoadResults, setLoadResults] = useState(() => { return true });

    const url = route.params?.url;
    const title = route.params?.title;

    const [state, dispatch] = useReducer(reducer, {
        TotalPage: null,
        Page: 1,
    });

    const handleResults = (results) => {
        const parsedResults = JSON.parse(results);
        if (JSON.stringify(isResults) !== JSON.stringify(parsedResults)) {
            setResults(parsedResults);
        }
    };

    useEffect(() => {
        if (isResults && isResults.length > 0) {
            setLoadResults(false);
        }
    }, [isResults]);

    useEffect(() => {
        navigation.setOptions({ title: capitalizeString(title) });
    }, [title]);

    return (
        <>
            <WebScraping
                isUrl={`${url}?&page=${state.Page}`}
                isInjectedJavaScript={SCRIPT_NEW_MOVIES}
                setHandleMessage={(results) => {
                    handleResults(results);
                }}
            />
            <WebScraping
                isUrl={url}
                isInjectedJavaScript={SCRIPT_PAGES}
                setHandleMessage={(results) => {
                    dispatch({ type: 'setTotalPage', payload: parseInt(results) });
                }}
            />
            {title && (
                <>
                    {isLoadResults ? (
                        <View style={{ width: '100%', height: '100%', position: 'relative' }}>
                            <ActivityTemp />
                        </View>
                    ) : (
                        <ScrollView style={[Styles.ContainerView, { paddingRight: 10, paddingTop: 10 }]} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={false}>
                            {state.TotalPage !== null && (
                                <>
                                    <View style={[Styles.Header, { paddingHorizontal: 10 }]}>
                                        <>
                                            {state.TotalPage != 0 && state.Page > 1 && (
                                                <Button
                                                    mode='contained'
                                                    onPress={() => {
                                                        setLoadResults(true);
                                                        dispatch({ type: 'preview' });
                                                    }}
                                                >
                                                    {`Anterior`}
                                                </Button>
                                            )}
                                            {state.TotalPage != 0 && state.Page !== state.TotalPage && (
                                                <Button
                                                    mode='contained'
                                                    onPress={() => {
                                                        setLoadResults(true);
                                                        dispatch({ type: 'next' });
                                                    }}
                                                >
                                                    {`Próximo`}
                                                </Button>
                                            )}
                                        </>
                                    </View>
                                    <Divider style={{ marginVertical: 5 }} />
                                </>
                            )}
                            {state.TotalPage !== null && (
                                <>
                                    <View style={[Styles.Header, { paddingHorizontal: 10 }]}>
                                    <Text variant="titleSmall">{`Total de Páginas: ${state.TotalPage}`}</Text>
                                        <Text variant="titleSmall">{`Página: ${state.Page}`}</Text>
                                    </View>
                                    <Divider style={{ marginVertical: 5 }} />
                                </>
                            )}
                            {isResults && isResults.length > 0 && (
                                <FlatlistVertical data={isResults} />
                            )}
                            <Footer />
                        </ScrollView>
                    )}
                </>
            )}
        </>
    );
};

// Export
export default Search;
