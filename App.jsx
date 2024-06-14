import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ScreenOrientation from 'expo-screen-orientation';
import NetInfo from '@react-native-community/netinfo';
import RNRestart from 'react-native-restart';
import {
    setStatusBarBackgroundColor,
    setStatusBarHidden,
    setStatusBarStyle,
    setStatusBarTranslucent
} from 'expo-status-bar';
import {
    Button,
    Dialog,
    IconButton,
    MD3DarkTheme,
    PaperProvider,
    Portal,
    Text,
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
            style={{ flex: 1, width: 2000, backgroundColor: theme.colors.elevation.level5, color: '#FFFFFF' }}
            placeholder="Pesquisar"
            iconColor='#FFFFFF'
            rippleColor={theme.colors.inversePrimary}
            placeholderTextColor='#FFFFFF'
            icon='arrow-left'
            onIconPress={() => navigation.goBack()}
            value={query}
            onChangeText={handleQueryChange}
        />
    );
};

export default function App() {
    useEffect(() => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        setStatusBarBackgroundColor(theme.colors.elevation.level5, true);
        setStatusBarHidden(false, 'none');
        setStatusBarStyle('light');
        setStatusBarTranslucent(true);
    }, []);

    const appRestart = () => {
        RNRestart.restart();
    }

    const isConnected = useInternetConnection();

    return (
        <PaperProvider theme={theme} style={Styles.AreaView}>
            {false ? (
                <NavigationContainer theme={theme} style={{ backgroundColor: theme.colors.background }}>
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
                                headerTitle: () => <SearchHeader navigation={navigation} />,
                                headerLeft: () => null,
                                headerRight: () => null,
                                headerTitleAlign: 'center',
                                headerStyle: {
                                    backgroundColor: theme.colors.elevation.level5,
                                    shadowOpacity: 0,
                                    elevation: 0,
                                },
                                headerTitleContainerStyle: {
                                    left: 0,
                                    right: 0,
                                },
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
                    <Portal>
                        <Dialog visible={true}>
                            <Dialog.Title>Erro de conexão</Dialog.Title>
                            <Dialog.Content>
                                <Text variant="bodyMedium">Não é possível conectar-se ao servidor. Verifique sua conexão com a Internet e tente novamente.</Text>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={() => appRestart()}>Tente novamente</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </SafeAreaView>
            )}
        </PaperProvider>
    );
}
