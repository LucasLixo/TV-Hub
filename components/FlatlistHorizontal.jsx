import React from 'react';
import {
    FlatList,
    Image,
    Pressable,
    View,
} from 'react-native';
import Styles from '../utils/Styles';
import {
    Text,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';

const FlatlistHorizontal = ({ data }) => {
    const navigation = useNavigation();

    return (
        <FlatList
            data={data}
            style={{ marginTop: 15 }}
            key={uuid.v4()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
                const cleanImgUrl = item.img.replace(/\s+/g, '').replace(/.*:\/\//, 'https://');
                const cleanUrl = item.url.replace(/\s+/g, '').replace(/.*:\/\//, 'https://');
                
                return (
                    <Pressable
                        style={Styles.FlatlistHorizontal}
                        key={uuid.v4()}
                        onPress={() => {
                            navigation.navigate('DetailsMovie', { data: {
                                img: cleanImgUrl,
                                language: item.language,
                                title: item.title,
                                url: cleanUrl,
                                date: item.date,
                                time: item.time,
                            }})
                        }}
                    >
                        <Image
                            style={{ width: '100%', height: '100%', position: 'absolute', zIndex: -1 }}
                            source={{ uri: cleanImgUrl }}
                            resizeMode='cover'
                        />
                        <View style={Styles.FlatlistHorizontalLanguage}>
                            <Text variant="titleSmall">
                                {item.language}
                            </Text>
                        </View>
                        <View style={Styles.FlatlistHorizontalTime}>
                            <Text variant="titleSmall">
                                {item.time}
                            </Text>
                        </View>
                        <View style={Styles.FlatlistHorizontalTitle}>
                            <Text variant="titleSmall" numberOfLines={1} ellipsizeMode='tail'>
                                {item.title}
                            </Text>
                        </View>
                    </Pressable>
                );
            }}
        />
    );
};

// Export
export default FlatlistHorizontal;
