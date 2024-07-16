import React from "react";
import {
    Text,
} from 'react-native-paper';
import { Image, Pressable } from "react-native";
import { View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Styles from "../utils/Styles";

const Card = ({ item }) => {
    const navigation = useNavigation();

    const cleanImgUrl = item.img.replace(/\s+/g, '').replace(/.*:\/\//, 'https://');
    const cleanUrl = item.url.replace(/\s+/g, '').replace(/.*:\/\//, 'https://');

    return (
        <Pressable
            style={Styles.Item}
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
            <View style={[Styles.ItemTopText, { top: 5, left: 5 }]}>
                <Text style={Styles.TextInCard} variant="titleSmall">
                    {item.language}
                </Text>
            </View>
            <View style={[Styles.ItemTopText, { top: 5, right: 5 }]}>
                <Text style={Styles.TextInCard} variant="titleSmall">
                    {item.time}
                </Text>
            </View>
            <View style={[Styles.ItemBottomText, { bottom: 0, left: 0 }]}>
                <Text style={[Styles.TextInCard, { fontWeight: 'bold' }]} variant="titleSmall" numberOfLines={1} ellipsizeMode='tail'>
                    {item.title}
                </Text>
            </View>
        </Pressable>
    );
};

export default Card;