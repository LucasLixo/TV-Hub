import React from 'react';
import WebIframe from '../components/web/WebIframe';
import HeaderTitle from './includes/HeaderTitle';
import { useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import { LinearGradient } from 'react-native-svg';
import Colors from '../hooks/Colors';
import { SCRIPT_DISQUS } from '../hooks/Scripts';

const Comments = () => {
    const route = useRoute();
    const url = route.params?.url;

    return (
        <>
            <HeaderTitle title='Comentários' />
            <LinearGradient
                colors={[Colors.background.a, 'red']}
                style={{
                    width: '110%',
                    height: 20,
                    position: 'absolute',
                    zIndex: 10,
                }}
            />
            <View style={{ flex: 1, width: '100%', height: '100%', padding: 10 }}>
                <WebIframe
                    isUrl={url}
                    isInjectedJavaScript={SCRIPT_DISQUS}
                    setHandleErro={() => console.log()}
                />
            </View>
        </>
    );
};

// Export
export default Comments;