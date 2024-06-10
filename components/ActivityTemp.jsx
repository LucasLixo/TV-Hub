import React from 'react';
import {
    View,
} from 'react-native';
import Styles from '../utils/Styles';
import {
    ActivityIndicator,
    MD3DarkTheme as theme,
} from 'react-native-paper';

const ActivityTemp = () => {

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