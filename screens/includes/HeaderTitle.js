import React from 'react';
import {
    View,
    Pressable,
} from 'react-native';

import Colors from '../../hooks/Colors';
import Styles from '../../hooks/Styles';
import IconsStyle from '../../hooks/IconsStyle';
import { useNavigation } from '@react-navigation/native';
import MyText from '../../components/MyText';

const HeaderTitle = ({ title }) => {
    const navigation = useNavigation();

    return (
        <>
            <View style={[Styles.Header, { paddingLeft: 10, zIndex: 11 }]}>
                <Pressable style={{ width: '10%' }} onPress={() => navigation.goBack()}>
                    <IconsStyle name='arrowLeft' size={32} color={Colors.sky.a} stroke={Colors.sky.a} strokeWidth={2} />
                </Pressable>
                <View style={{ width: '90%' }}>
                    <MyText type='title' style={{ textAlign: 'right', textTransform: 'capitalize' }}>
                        {` ${title} ` || ''}
                    </MyText>
                </View>
            </View>
            <View style={Styles.Hr} />
        </>
    );
};

// Export
export default HeaderTitle;