import React, { useContext, useEffect, useReducer, useState } from "react";
import { ScrollView, View } from "react-native";
import Styles from "../utils/Styles";
import MyMD3 from '../utils/MyMD3';
import { MD3DarkTheme, Button, Divider, Text } from "react-native-paper";
import { encodeWithPlus } from "../utils/Fuctions";
import { VizerContext } from '../utils/VizerProvider';
import { SCRIPT_NEW_MOVIES, SCRIPT_PAGES } from '../utils/Scripts';
import { VIZER_SEARCH } from "../utils/Constants";
import WebScraping from "../components/web/WebScraping";
import ActivityTemp from "../components/ActivityTemp";
import Card from "../components/Card";
import { useRoute } from "@react-navigation/native";

const theme = {
    ...MD3DarkTheme,
    colors: MyMD3.dark
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'preview':
            return { ...state, Page: Math.max(state.Page - 1, 1) };
        case 'next':
            return { ...state, Page: state.Page + 1 };
        case 'setTotalPage':
            return { ...state, TotalPage: action.Page };
        case 'setPage':
            return { ...state, Page: state.Page };
        default:
            return state;
    }
};

const Home = () => {
    const [query, setQuery] = useState(() => { return '' });
    const [searchQuery, setSearchQuery] = useState(() => { return '' });
    const [isResults, setResults] = useState(() => { return [] });
    const [isLoaded, setLoaded] = useState(() => { return true });

    const [state, dispatch] = useReducer(reducer, {
        TotalPage: null,
        Page: 1,
    });

    const vizerHost = useContext(VizerContext);

    useEffect(() => {
        if (query !== '') {
            dispatch({ type: 'setPage', Page: 1 })
            setSearchQuery(`${VIZER_SEARCH}${encodeWithPlus(query)}&page=${state.Page}`);
            setLoaded(true);
        } else {
            setResults([]);
            setLoaded(false);
        }
    }, [query]);

    const route = useRoute();

    useEffect(() => {
        if (route.params?.query) {
            setQuery(route.params.query);
        }
    }, [route.params?.query]);

    const handleResults = (results) => {
        const parsedResults = JSON.parse(results);
        if (JSON.stringify(isResults) !== JSON.stringify(parsedResults)) {
            setResults(parsedResults);
            setLoaded(false);
        }
    };

    return (
        <>
            {vizerHost && (
                <View style={Styles.AreaView}>
                    {query !== '' && (
                        <>
                            <WebScraping
                                isUrl={`${vizerHost}${searchQuery}`}
                                isInjectedJavaScript={SCRIPT_NEW_MOVIES}
                                setHandleMessage={handleResults}
                            />
                            <WebScraping
                                isUrl={`${vizerHost}${searchQuery}`}
                                isInjectedJavaScript={SCRIPT_PAGES}
                                setHandleMessage={(results) => {
                                    dispatch({ type: 'setTotalPage', Page: parseInt(results) });
                                }}
                            />
                            {isResults.length > 0 && state.TotalPage !== null && (
                                <ScrollView style={Styles.ContainerView}>
                                    <View style={Styles.Header}>
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
                                    <Divider style={Styles.Divider} />
                                    <View style={Styles.Header}>
                                        <Text style={Styles.TextDefault} variant="titleLarge">{`Total de Páginas: ${state.TotalPage}`}</Text>
                                        <Text style={Styles.TextDefault} variant="titleLarge">{`Página: ${state.Page}`}</Text>
                                    </View>
                                    <Divider style={Styles.Divider} />
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                                        {isResults.map((item, index) => (
                                            <Card key={index} item={item} />
                                        ))}
                                    </View>
                                </ScrollView>
                            )}
                            {isLoaded && (
                                <View style={{ flex: 1, width: '100%', height: '100%', position: 'absolute', backgroundColor: '#00000080' }}>
                                    <ActivityTemp />
                                </View>
                            )}
                        </>
                    )}
                </View>
            )}
        </>
    );
}

export default Home;