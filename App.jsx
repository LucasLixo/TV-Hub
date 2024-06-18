import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ScreenOrientation from 'expo-screen-orientation';
import NetInfo from '@react-native-community/netinfo';
import * as SplashScreen from 'expo-splash-screen';
import {
    setStatusBarBackgroundColor,
    setStatusBarHidden,
    setStatusBarStyle,
    setStatusBarTranslucent
} from 'expo-status-bar';
import {
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
import { VizerProvider } from './utils/VizerProvider';
import MyMD3 from './utils/MyMD3'

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

const useInternetConnection = () => {
    const [isConnected, setIsConnected] = useState(() => { return true });

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

export default function App() {
    const isConnected = useInternetConnection();

    const theme = { 
        ...MD3DarkTheme, 
        colors: MyMD3.dark 
    }
    
    useEffect(() => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        if (isConnected) {
            setStatusBarBackgroundColor(theme.colors.elevation.level5, true);
        }
        setStatusBarHidden(false, 'none');
        setStatusBarStyle('light');
        setStatusBarTranslucent(true);
    }, [isConnected]);

    useEffect(() => {
        const onLayoutRoot = async () => {
            await SplashScreen.hideAsync();
        }
        onLayoutRoot();
    }, []);

    const SearchHeader = ({ navigation }) => {
        const [query, setQuery] = useState(() => { return '' });

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
                rippleColor={theme.colors.outline}
                placeholderTextColor='#FFFFFF'
                icon='arrow-left'
                onIconPress={() => navigation.goBack()}
                value={query}
                onChangeText={handleQueryChange}
            />
        );
    };

    return (
        <PaperProvider theme={theme} style={Styles.AreaView}>
            <VizerProvider>
                {isConnected ? (
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
                            </Dialog>
                        </Portal>
                    </SafeAreaView>
                )}
            </VizerProvider>
        </PaperProvider>
    );
}
