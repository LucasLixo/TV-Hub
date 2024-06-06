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

const ExpandResults = ({ title, url }) => {
    const navigation = useNavigation();

    return (
        <>
            <View style={Styles.Hr} />
            <View style={[Styles.Header, { paddingLeft: 10 }]}>
                <MyText type='subtitle' style={{fontSize: 16, fontWeight: 'bold', textTransform: 'capitalize' }}>
                    {title}
                </MyText>
                <Pressable onPress={() => navigation.navigate('ResultsGenre', { title, url })}>
                    <IconsStyle name='arrowRight' size={32} color={Colors.text.a} stroke={Colors.text.a} strokeWidth={1} />
                </Pressable>
            </View>
        </>
    );
};

// Export
export default ExpandResults;
