import React from 'react';
import {
    View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Styles from '../../utils/Styles';
import {
    MD3DarkTheme as theme,
    Text,
    IconButton
} from 'react-native-paper';

const HeaderOptions = ({ title }) => {
    const navigation = useNavigation();

    return (
        <View style={[Styles.Header, { paddingHorizontal: 10, zIndex: 11 }]}>
            <View style={{ width: '50%' }}>
                <Text variant="titleSmall" style={{ color: theme.colors.primary }}>
                    {title || `TV Hub`}
                </Text>
            </View>
            <IconButton
                icon="search-web"
                size={32}
                iconColor={theme.colors.primary}
                onPress={() => navigation.navigate('Search')}
            />
        </View>
    );
};

// Export
export default HeaderOptions;