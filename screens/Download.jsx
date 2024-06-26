import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import ActivityTemp from '../components/ActivityTemp';
import WebIframe from '../components/web/WebIframe';
import { SCRIPT_EXTRACT_FILEMOON, SCRIPT_EXTRACT_MIXDROP, SCRIPT_EXTRACT_STREAMTAPE } from '../utils/Scripts';
import { Linking, Pressable, View } from 'react-native';
import Styles from '../utils/Styles';
import {
    Text,
    Divider,
} from 'react-native-paper';
import { clipboardToast } from '../utils/Fuctions';
import ActivityErro from '../components/ActivityErro';

const Download = () => {
    const route = useRoute();
    const [isVideoState, setVideoState] = useState(() => { return true });

    const [script, setScript] = useState(() => { return null });
    const [urlVideo, setUrlVideo] = useState(() => { return null });
    // const [status, setStatus] = useState(() => { return null });
    // const [headers, setHeaders] = useState(() => { return null });

    const title = route.params?.title;
    const url = route.params?.url;
    const service = route.params?.service;

    useEffect(() => {
        switch (service) {
            case 'mixdrop':
                setScript(SCRIPT_EXTRACT_MIXDROP);
                break;
            case 'filemoon':
                setScript(SCRIPT_EXTRACT_FILEMOON);
                break;
            case 'streamtape':
                setScript(SCRIPT_EXTRACT_STREAMTAPE);
                break;
            default:
                setScript(null);
        }
    }, [service]);

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ title: `Baixar: ${title}` });
    }, [title]);

    /* const headersUrl = async (url) => {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            // setStatus(response.status);
            setHeaders(response.headers.map);
        } catch (error) {
            // console.log(error);
        }
    } */

    const openUrl = async () => {
        const ADM = `com.dv.adm`;

        const supported = await Linking.canOpenURL(`intent://${urlVideo}#Intent;scheme=https;package=${ADM};end`);
        if (supported) {
            await Linking.openURL(`intent://${urlVideo}#Intent;package=${ADM};end`);
        } else {
            await Linking.openURL(`https://play.google.com/store/apps/details?id=${ADM}`);
        }
    };

    /* useEffect(() => {
        if (urlVideo) {
            headersUrl(urlVideo);
        }
    }, [urlVideo]); */

    if (!script) {
        return <ActivityTemp />;
    }

    return (
        <View style={{ flex: 1, width: '100%', height: '100%' }}>
            {(urlVideo && urlVideo !== '') ? (
                <View style={{ flex: 1, flexDirection: 'column', padding: 10 }}>
                    {/* {headers && headers['content-length'] && (
                        <>
                            <View style={Styles.CardContainer}>
                                <Text variant="titleSmall">{`Tamanho`}</Text>
                                <Text variant="titleSmall">{`${Math.round(parseInt(headers['content-length']) / (1024 * 1024))}mb`}</Text>
                            </View>
                            <Divider style={{ marginVertical: 5 }} />
                        </>
                    )} */}
                    <View style={[Styles.CardContainer, { height: 40 }]}>
                        <Pressable style={[Styles.CardContainerButton, { width: '100%' }]} onPress={() => clipboardToast(urlVideo)}>
                            <Text variant="titleSmall">{`Copiar Link`}</Text>
                        </Pressable>
                    </View>
                    <Divider style={{ marginVertical: 5 }} />
                    <View style={[Styles.CardContainer, { height: 40 }]}>
                        <Pressable style={[Styles.CardContainerButton, { width: '100%' }]} onPress={() => openUrl(urlVideo)}>
                            <Text variant="titleSmall">{`Baixar Video com ADM`}</Text>
                        </Pressable>
                    </View>
                </View>
            ) : (
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={{ width: '100%', height: 240, position: 'relative' }}>
                        {isVideoState ? (
                            <WebIframe
                                isUrl={url}
                                isInjectedJavaScript={script}
                                setHandleMessage={(urlExtracted) => {
                                    if (urlExtracted != null && urlExtracted !== 'null') {
                                        setUrlVideo(urlExtracted);
                                    }
                                }}
                                setHandleVideo={(state) => setVideoState(state)}
                                overScrollMode='never'
                                scrollEnabled={false}
                            />
                        ) : (
                            <ActivityErro textError='Sem Video' />
                        )}
                    </View>
                    <Text variant="titleSmall" style={{ textTransform: 'uppercase' }}>{`Inicie o video para baixar`}</Text>
                </View>
            )}
        </View>
    );
};

export default Download;
