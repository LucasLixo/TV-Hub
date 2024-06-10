import React from 'react';
import WebIframe from '../components/web/WebIframe';
import { useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import { SCRIPT_DISQUS } from '../utils/Scripts';

const Comments = () => {
    const route = useRoute();
    const url = route.params?.url;

    return (
        <>
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