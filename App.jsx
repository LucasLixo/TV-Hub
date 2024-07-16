import React, { useEffect, useState } from 'react';
import {
    PaperProvider,
    MD3DarkTheme,
    Dialog,
    Portal,
    Searchbar,
} from 'react-native-paper';
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
import { VizerProvider } from './utils/VizerProvider';
import MyMD3 from './utils/MyMD3';
import Styles from './utils/Styles';
import Home from './screens/Home';
import Comments from './screens/Comments';
import PlayerVideo from './screens/PlayerVideo';
import DetailsMovie from './screens/DetailsMovie';
import { Dimensions } from 'react-native';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

const theme = {
    ...MD3DarkTheme,
    colors: MyMD3.dark
}

const SearchHeader = ({ navigation }) => {
    const [query, setQuery] = useState(() => { return '' });

    const handleQueryChange = (newQuery) => {
        setQuery(newQuery);
        navigation.setParams({ query: newQuery });
    };

    return (
        <Searchbar
            mode="view"
            style={{ flex: 1, width: Dimensions.get('window').width, padding: 0, margin: 0, backgroundColor: theme.colors.elevation.level5, color: '#FFFFFF' }}
            inputStyle={Styles.TextInput}
            placeholder="Pesquisar"
            rippleColor={theme.colors.outline}
            color='#FFFFFF'
            icon='magnify'
            iconColor='#FFFFFF'
            value={query}
            onChangeText={handleQueryChange}
        />
    );
};

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

const App = () => {
    const isConnected = useInternetConnection();

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
                                    fontWeight: 'normal',
                                    fontSize: 16,
                                },
                                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                            }}
                            initialRouteName="Home"
                        >
                            <Stack.Screen
                                options={({ navigation }) => ({
                                    headerLeft: () => <SearchHeader navigation={navigation} />,
                                    headerTitle: () => null,
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
                                name="Home"
                                component={Home}
                            />
                            <Stack.Screen
                                options={{ title: '' }}
                                name="DetailsMovie"
                                component={DetailsMovie}
                            />
                            <Stack.Screen
                                options={{ title: 'Comentários' }}
                                name="Comments"
                                component={Comments}
                            />
                            <Stack.Screen
                                options={{ headerShown: false }}
                                name="PlayerVideo"
                                component={PlayerVideo}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                ) : (
                    <Portal>
                        <Dialog visible={true}>
                            <Dialog.Title>Erro de conexão</Dialog.Title>
                            <Dialog.Content>
                                <Text variant="bodyMedium">Não é possível conectar-se ao servidor. Verifique sua conexão com a Internet e tente novamente.</Text>
                            </Dialog.Content>
                        </Dialog>
                    </Portal>
                )}
            </VizerProvider>
        </PaperProvider>
    );
}

export default App;