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
    MD3DarkTheme as theme,
    PaperProvider,
} from 'react-native-paper';
import Styles from './utils/Styles';
import Movie from './screens/Movie';
import Search from './screens/Search';
import ResultsGenre from './screens/ResultsGenre';
import DetailsMovie from './screens/DetailsMovie';
import Comments from './screens/Comments';
import PlayerVideo from './screens/PlayerVideo';
import Download from './screens/Download';

const Stack = createStackNavigator();

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

export default function App() {

    useEffect(() => {
        setStatusBarBackgroundColor(theme.colors.background, true)
        setStatusBarHidden(false, 'none');
        setStatusBarStyle('light');
        setStatusBarTranslucent(true);
        SystemUI.setBackgroundColorAsync(theme.colors.background);
    }, []);

    const isConnected = useInternetConnection();

    return isConnected ? (
        <NavigationContainer theme={theme}>
            <PaperProvider theme={theme}>
                <SafeAreaView style={Styles.AreaView}>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                        }}
                        initialRouteName='Movie'
                    >
                        <Stack.Screen name="Movie" component={Movie} />
                        <Stack.Screen name="Search" component={Search} />
                        <Stack.Screen name="ResultsGenre" component={ResultsGenre} />
                        <Stack.Screen name="DetailsMovie" component={DetailsMovie} />
                        <Stack.Screen name="Comments" component={Comments} />
                        <Stack.Screen name="PlayerVideo" component={PlayerVideo} />
                        <Stack.Screen name="Download" component={Download} />
                    </Stack.Navigator>
                </SafeAreaView>
            </PaperProvider>
        </NavigationContainer>
    ) : (
        <SafeAreaView style={Styles.AreaView}>
            <ActivityErro textError='SEM CONEXÃO COM A INTERNET' />
        </SafeAreaView>
    );
}
