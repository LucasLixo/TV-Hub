import React, { useContext } from 'react';
import {
    View,
} from 'react-native';
import Styles from '../../utils/Styles';
import { useNavigation } from '@react-navigation/native';
import {
    MD3DarkTheme as theme,
    Text,
    IconButton,
    Divider,
} from 'react-native-paper';
import { VizerContext } from '../../utils/VizerProvider';

const ExpandResults = ({ title, url }) => {
    const vizerHost = useContext(VizerContext);
    
    const navigation = useNavigation();

    return (
        <>
            <View style={[Styles.Header, { paddingLeft: 10 }]}>
                <Text variant="titleSmall" style={{fontSize: 16, fontWeight: 'bold', textTransform: 'capitalize' }}>
                    {title}
                </Text>
                <IconButton
                    icon="arrow-right"
                    iconColor={theme.colors.primary}
                    size={32}
                    style={{ width: '10%' }}
                    onPress={() => navigation.navigate('ResultsGenre', { title, url : vizerHost + url })}
                />
            </View>
            <Divider style={{ marginVertical: 5 }} />
        </>
    );
};

// Export
export default ExpandResults;
