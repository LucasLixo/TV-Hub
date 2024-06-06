import React from 'react';
import {
    View,
    Pressable,
} from 'react-native';
import Colors from '../../hooks/Colors';
import Styles from '../../hooks/Styles';
import IconsStyle from '../../hooks/IconsStyle';
import { useNavigation } from '@react-navigation/native';
import MyTextInput from '../../components/MyTextInput';

const HeaderSearch = ({ setStringSearch }) => {
    const navigation = useNavigation();

    return (
        <>
            <View style={[Styles.Header, { zIndex: 11 }]}>
                <Pressable onPress={() => navigation.goBack()}>
                    <IconsStyle name='arrowLeft' size={32} color={Colors.sky.a} stroke={Colors.sky.a} strokeWidth={2} />
                </Pressable>
                <MyTextInput
                    placeholder='Pesquisar'
                    placeholderTextColor={Colors.text.b}
                    onChangeText={setStringSearch}
                    maxLength={24}
                />
            </View>
            <View style={Styles.Hr} />
        </>
    );
};

// Export
export default HeaderSearch;