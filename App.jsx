import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';
import ActivityErro from './components/ActivityErro';
import {
    setStatusBarBackgroundColor,
    setStatusBarHidden,
    setStatusBarStyle,
    setStatusBarTranslucent
} from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import {
    IconButton,
    MD3DarkTheme,
    PaperProvider,
    Searchbar,
} from 'react-native-paper';
import Styles from './utils/Styles';
import Movie from './screens/Movie';
import Search from './screens/Search';
import ResultsGenre from './screens/ResultsGenre';
import DetailsMovie from './screens/DetailsMovie';
import Comments from './screens/Comments';
import PlayerVideo from './screens/PlayerVideo';
import Download from './screens/Download';

const theme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        background: '#000000'
    }
};

const Stack = createStackNavigator();

const useInternetConnection = () => {
    const [isConnected, setIsConnected] = useState(() => true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return isConnected;
};

const SearchHeader = ({ navigation }) => {
    const [query, setQuery] = useState('');

    const handleQueryChange = (newQuery) => {
        setQuery(newQuery);
        navigation.setParams({ query: newQuery });
    };

    return (
        <Searchbar
            mode="bar"
            style={{ flex: 1, width: '100%', backgroundColor: theme.colors.background }}
            placeholder="Pesquisar"
            value={query}
            onChangeText={handleQueryChange}
        />
    );
};

export default function App() {
    useEffect(() => {
        setStatusBarBackgroundColor(theme.colors.elevation.level5, true);
        setStatusBarHidden(false, 'none');
        setStatusBarStyle('light');
        setStatusBarTranslucent(true);
        SystemUI.setBackgroundColorAsync(theme.colors.background);
    }, []);

    const isConnected = useInternetConnection();

    return (
        <PaperProvider theme={theme} style={Styles.AreaView}>
            {isConnected ? (
                <NavigationContainer theme={theme}>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: theme.colors.elevation.level5,
                            },
                            headerTintColor: '#FFFFFF',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                        }}
                        initialRouteName="Movie"
                    >
                        <Stack.Screen
                            options={({ navigation }) => ({
                                title: 'TV Hub',
                                headerRight: () =>
                                    <IconButton
                                        icon="magnify"
                                        size={32}
                                        iconColor={theme.colors.primary}
                                        onPress={() => navigation.navigate('Search')}
                                    />
                            })}
                            name="Movie" component={Movie}
                        />
                        <Stack.Screen
                            options={({ navigation }) => ({
                                title: '',
                                headerRight: () => <SearchHeader navigation={navigation} />
                            })}
                            name="Search" component={Search}
                        />
                        <Stack.Screen
                            options={{ title: '' }}
                            name="ResultsGenre" component={ResultsGenre}
                        />
                        <Stack.Screen
                            options={{ title: '' }}
                            name="DetailsMovie" component={DetailsMovie}
                        />
                        <Stack.Screen
                            options={{ title: 'Comentários' }}
                            name="Comments" component={Comments}
                        />
                        <Stack.Screen
                            options={{ headerShown: false }}
                            name="PlayerVideo" component={PlayerVideo}
                        />
                        <Stack.Screen
                            options={{ title: '' }}
                            name="Download" component={Download}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            ) : (
                <SafeAreaView style={Styles.AreaView}>
                    <ActivityErro textError="SEM CONEXÃO COM A INTERNET" />
                </SafeAreaView>
            )}
        </PaperProvider>
    );
}
