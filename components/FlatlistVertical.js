import React from 'react';
import {
    ScrollView,
    Image,
    Pressable,
    View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Styles from '../hooks/Styles';
import MyText from './MyText';
import Colors from '../hooks/Colors';
import { useNavigation } from '@react-navigation/native';

const FlatlistVertical = ({ data }) => {
    const navigation = useNavigation();
    const items = [];

    data.forEach((item, index) => {
        const cleanImgUrl = item.img.replace(/\s+/g, '').replace(/.*:\/\//, 'https://');
        const cleanUrl = item.url.replace(/\s+/g, '').replace(/.*:\/\//, 'https://');

        items.push(
            <Pressable
                key={`#${index.toString()}`}
                style={Styles.FlatlistVertical}
                onPress={() => {
                    navigation.navigate('DetailsMovie', {
                        data: {
                            img: cleanImgUrl,
                            language: item.language,
                            title: item.title,
                            url: cleanUrl,
                            date: item.date,
                            time: item.time,
                        }
                    })
                }}
            >
                <Image
                    style={{ width: '100%', height: '100%', position: 'absolute', zIndex: -1 }}
                    source={{ uri: cleanImgUrl }}
                    resizeMode='cover'
                />
                <View style={Styles.FlatlistHorizontalLanguage}>
                    <MyText type='default'>
                        {item.language}
                    </MyText>
                </View>
                <View style={Styles.FlatlistHorizontalTime}>
                    <MyText type='default'>
                        {item.time}
                    </MyText>
                </View>
                <LinearGradient colors={['transparent', Colors.background.c]} style={Styles.FlatlistHorizontalTitle}>
                    <MyText type='default' numberOfLines={1} ellipsizeMode='tail'>
                        {item.title}
                    </MyText>
                </LinearGradient>
            </Pressable>
        );
    });

    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {items}
        </View>
    );
};

// Export
export default FlatlistVertical;
