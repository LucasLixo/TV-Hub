import React from 'react';
import {
    View,
    Pressable,
} from 'react-native';
import Colors from '../../hooks/Colors';
import IconsStyle from '../../hooks/IconsStyle';
import MyText from '../../components/MyText';
import { useNavigation } from '@react-navigation/native';
import Styles from '../../hooks/Styles';

const HeaderOptions = ({ title }) => {
    const navigation = useNavigation();

    return (
        <View style={[Styles.Header, { paddingHorizontal: 10, zIndex: 11 }]}>
            <View style={{ width: '50%' }}>
                <MyText type='title'>
                    {title || `TV Hub`}
                </MyText>
            </View>
            <View style={{ width: '50%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Pressable
                    style={{ marginLeft: 10 }}
                    onPress={() => navigation.navigate('Search')}
                >
                    <IconsStyle name='search' size={32} color={Colors.sky.a} />
                </Pressable>
                <Pressable
                    style={{ marginLeft: 10 }}
                    onPress={() => navigation.navigate('Config')}
                >
                    <IconsStyle name='config' size={32} color={Colors.sky.a} />
                </Pressable>
            </View>
        </View>
    );
};

// Export
export default HeaderOptions;