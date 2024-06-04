import React from 'react';
import {
    FlatList,
    Image,
    Pressable,
    View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Styles from '../hooks/Styles';
import MyText from './MyText';
import Colors from '../hooks/Colors';
import { useNavigation } from '@react-navigation/native';

const FlatlistHorizontal = ({ data }) => {
    const navigation = useNavigation();

    return (
        <FlatList
            data={data}
            style={{ marginTop: 15 }}
            keyExtractor={(item, index) => "#" + index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
                const cleanImgUrl = item.img.replace(/\s+/g, '').replace(/.*:\/\//, 'https://');
                const cleanUrl = item.url.replace(/\s+/g, '').replace(/.*:\/\//, 'https://');
                
                return (
                    <Pressable 
                        style={Styles.FlatlistHorizontal} 
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
            }}
        />
    );
};

// Export
export default FlatlistHorizontal;
