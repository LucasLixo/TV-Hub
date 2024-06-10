import React from 'react';
import {
    View,
} from 'react-native';
import Styles from '../../utils/Styles';
import { useNavigation } from '@react-navigation/native';
import {
    MD3DarkTheme as theme,
    Text,
    IconButton
} from 'react-native-paper';

const HeaderTitle = ({ title }) => {
    const navigation = useNavigation();

    return (
        <>
            <View style={[Styles.Header, { paddingRight: 10, zIndex: 11 }]}>
                <IconButton
                    icon="arrow-left"
                    iconColor={theme.colors.primary}
                    style={{ width: '10%' }}
                    size={32}
                    onPress={() => navigation.goBack()}
                />
                <View style={{ width: '90%' }}>
                    <Text 
                        variant="titleMedium" 
                        style={{ 
                            color: theme.colors.primary, 
                            textAlign: 'right', 
                            textTransform: 'capitalize'
                        }}
                        numberOfLines={1}
                        ellipsizeMode='tail'
                    >
                        {` ${title} ` || ''}
                    </Text>
                </View>
            </View>
            <View style={Styles.Hr} />
        </>
    );
};

// Export
export default HeaderTitle;