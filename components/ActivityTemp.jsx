import React from 'react';
import {
    View,
} from 'react-native';
import Styles from '../utils/Styles';
import {
    ActivityIndicator,
    MD3DarkTheme,
} from 'react-native-paper';
import MyMD3 from '../utils/MyMD3';

const ActivityTemp = () => {
    const theme = { 
        ...MD3DarkTheme, 
        colors: MyMD3.dark
    }
    
    return (
        <View style={Styles.ContainerCenter}>
            <ActivityIndicator
                color={theme.colors.primary}
                size="large"
                hidesWhenStopped={true}
                animating={true}
            />
        </View>
    );
};

// Export
export default ActivityTemp;