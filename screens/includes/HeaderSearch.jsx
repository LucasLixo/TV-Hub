import React from 'react';
import {
    View,
} from 'react-native';
import Styles from '../../utils/Styles';
import {
    MD3DarkTheme as theme,
    IconButton,
    TextInput
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const HeaderSearch = ({ setStringSearch }) => {
    const navigation = useNavigation();

    return (
        <>
            <View style={[Styles.Header, { zIndex: 11, paddingRight: 10, marginTop: 10 }]}>
                <IconButton
                    icon="arrow-left"
                    iconColor={theme.colors.primary}
                    size={32}
                    onPress={() => navigation.goBack()}
                />
                <TextInput
                    label="Pesquisar"
                    mode='outlined'
                    style={{ flex: 1 }}
                    maxLength={24}
                    onChangeText={setStringSearch}
                />
            </View>
            <View style={Styles.Hr} />
        </>
    );
};

// Export
export default HeaderSearch;