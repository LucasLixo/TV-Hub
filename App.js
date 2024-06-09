import React, { useCallback, useEffect, useState } from 'react';
import { AppRegistry } from 'react-native';
import { setStatusBarBackgroundColor, setStatusBarHidden, setStatusBarStyle, setStatusBarTranslucent } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import NetInfo from '@react-native-community/netinfo';
import ActivityErro from './components/ActivityErro';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Colors from './hooks/Colors';
import Styles from './hooks/Styles';
import Movie from './screens/Movie';
import Config from './screens/Config';
import Search from './screens/Search';
import Download from './screens/Download';
import PlayerVideo from './screens/PlayerVideo';
import ResultsGenre from './screens/ResultsGenre';
import DetailsMovie from './screens/DetailsMovie';
import Comments from './screens/Comments';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

const navTheme = {
    colors: {
        background: Colors.background.a,
    },
};

const useInternetConnection = () => {
    const [isConnected, setIsConnected] = useState(() => { return true });

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(() => { return state.isConnected });
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return isConnected;
};

function App() {
    const [fontsLoaded, fontError] = useFonts({ 'Noto-Sans': require('./assets/fonts/Noto-Sans-Medium.ttf')});

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    useEffect(() => {
        setStatusBarBackgroundColor(Colors.background.a, true);
        setStatusBarHidden(false, 'none');
        setStatusBarStyle('light');
        setStatusBarTranslucent(true);
    }, []);

    const isConnected = useInternetConnection();

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return isConnected ? (
        <NavigationContainer theme={navTheme}>
            <SafeAreaView style={Styles.AreaView} onLayout={onLayoutRootView}>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }}
                    initialRouteName='Movie'
                >
                    <Stack.Screen name="Movie" component={Movie} />
                    <Stack.Screen name="Search" component={Search} />
                    <Stack.Screen name="Config" component={Config} />
                    <Stack.Screen name="Download" component={Download} />
                    <Stack.Screen name="PlayerVideo" component={PlayerVideo} />
                    <Stack.Screen name="DetailsMovie" component={DetailsMovie} />
                    <Stack.Screen name="ResultsGenre" component={ResultsGenre} />
                    <Stack.Screen name="Comments" component={Comments} />
                </Stack.Navigator>
            </SafeAreaView>
        </NavigationContainer>
    ) : (
        <SafeAreaView style={Styles.AreaView}>
            <ActivityErro textError='SEM CONEXÃO COM A INTERNET' />
        </SafeAreaView>
    );
}

AppRegistry.registerComponent('App', () => App);

export default App;
