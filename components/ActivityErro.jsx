import React from 'react';
import {
    View,
} from 'react-native';
import {
    MD3DarkTheme as theme,
    Text,
} from 'react-native-paper';
import Styles from '../utils/Styles';

const ActivityErro = ({ textError }) => {

    return (
        <View style={Styles.ContainerCenter}>
            <Text variant="headlineMedium" style={{ textAlign: 'center', textTransform: 'uppercase' }}>
                {`ERROR`}
            </Text>
            {textError && (
                <Text variant="titleMedium" style={{ textAlign: 'center', textTransform: 'uppercase', color: theme.colors.primary }}>
                    {textError}
                </Text>
            )}
        </View>
    );
};

// Export
export default ActivityErro;