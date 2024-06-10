import React, { useState } from 'react';
import WebScraping from '../components/web/WebScraping';
import { GENRES_MOVIES } from '../utils/Constants';
import FlatlistHorizontal from '../components/FlatlistHorizontal';
import { SCRIPT_NEW_MOVIES } from '../utils/Scripts';
import { ScrollView, View } from 'react-native';
import Styles from '../utils/Styles';
import ExpandResults from './includes/ExpandResults';
import Footer from './includes/Footer';
import ActivityTemp from '../components/ActivityTemp';

const Movie = () => {
    const [results, setResults] = useState(() => { return {
        recente: [],
        animacao: [],
        aventura: [],
        acao: [],
        comedia: [],
    }});

    const makeEven = (data) => (data.length % 2 === 0 ? data : data.slice(0, -1));

    const handleMessage = (key, data) => {
        setResults((prevResults) => ({
            ...prevResults,
            [key]: makeEven(JSON.parse(data)),
        }));
    };

    const allDataLoaded = Object.values(results).every((data) => data.length > 0);

    return (
        <>
            {GENRES_MOVIES.slice(0, 5).map(({ key, url }) => (
                <WebScraping
                    key={key}
                    isUrl={url}
                    isInjectedJavaScript={SCRIPT_NEW_MOVIES}
                    setHandleMessage={(data) => handleMessage(key, data)}
                />
            ))}
            {allDataLoaded ? (
                <ScrollView style={Styles.ContainerView} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    {GENRES_MOVIES.slice(0, 5).map(({ key, title, url }) => (
                        <View key={key}>
                            <ExpandResults title={title} url={url} />
                            <FlatlistHorizontal data={results[key].slice(0, results[key].length / 2)} />
                        </View>
                    ))}
                    <Footer />
                </ScrollView>
            ) : (
                <View style={{ flex: 1, width: '100%', height: '100%', position: 'absolute' }}>
                    <ActivityTemp />
                </View>
            )}
        </>
    );
};

export default Movie;
