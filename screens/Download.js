import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import ActivityTemp from '../components/ActivityTemp';
import MyText from '../components/MyText';
import WebIframe from '../components/web/WebIframe';
import { SCRIPT_EXTRACT_FILEMOON, SCRIPT_EXTRACT_MIXDROP, SCRIPT_EXTRACT_STREAMTAPE } from '../hooks/Scripts';
import { Linking, Pressable, View } from 'react-native';
import HeaderTitle from './includes/HeaderTitle';
import Styles from '../hooks/Styles';
import { clipboardToast } from '../hooks/Fuctions';

const Download = () => {
    const route = useRoute();
    const [script, setScript] = useState(() => { return null });
    const [urlVideo, setUrlVideo] = useState(() => { return null });
    const [status, setStatus] = useState(() => { return null });
    const [headers, setHeaders] = useState(() => { return null });

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

    const headersUrl = async (url) => {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            setStatus(response.status);
            setHeaders(response.headers.map);
        } catch (error) {
            console.log(error);
        }
    }

    const openUrl = async () => {
        const ADM = `com.dv.adm`;

        const supported = await Linking.canOpenURL(`intent://${urlVideo}#Intent;scheme=https;package=${ADM};end`);
        if (supported) {
            await Linking.openURL(`intent://${urlVideo}#Intent;package=${ADM};end`);
        } else {
            await Linking.openURL(`https://play.google.com/store/apps/details?id=${ADM}`);
        }
    };

    useEffect(() => {
        if (urlVideo) {
            headersUrl(urlVideo);
        }
    }, [urlVideo]);

    if (!script) {
        return <ActivityTemp />;
    }

    return (
        <View style={{ flex: 1, width: '100%', height: '100%' }}>
            <HeaderTitle title={`Baixar: ${title}`} />
            {(urlVideo && urlVideo !== '') ? (
                <View style={{ flex: 1, flexDirection: 'column', padding: 10 }}>
                    <View style={Styles.CardContainer}>
                        <MyText type='topic'>{`Status`}</MyText>
                        <MyText type='description'>{status}</MyText>
                    </View>
                    <View style={Styles.Hr} />
                    {headers && headers['content-type'] && (
                        <>
                            <View style={Styles.CardContainer}>
                                <MyText type='topic'>{`Extensão`}</MyText>
                                <MyText type='description'>{headers['content-type']}</MyText>
                            </View>
                            <View style={Styles.Hr} />
                        </>
                    )}
                    {headers && headers['content-length'] && (
                        <>
                            <View style={Styles.CardContainer}>
                                <MyText type='topic'>{`Tamanho`}</MyText>
                                <MyText type='description'>{`${Math.round(parseInt(headers['content-length']) / (1024 * 1024))}mb`}</MyText>
                            </View>
                            <View style={Styles.Hr} />
                        </>
                    )}
                    <View style={[Styles.CardContainer, { height: 40 }]}>
                        <Pressable style={[Styles.CardContainerButton, { width: '100%' }]} onPress={() => clipboardToast(urlVideo)}>
                            <MyText type='topic'>{`Copiar Link`}</MyText>
                        </Pressable>
                    </View>
                    <View style={Styles.Hr} />
                    <View style={[Styles.CardContainer, { height: 40 }]}>
                        <Pressable style={[Styles.CardContainerButton, { width: '100%' }]} onPress={() => openUrl(urlVideo)}>
                            <MyText type='topic'>{`Baixar Video com ADM`}</MyText>
                        </Pressable>
                    </View>
                </View>
            ) : (
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={{ width: '100%', height: 240, position: 'relative' }}>
                        <WebIframe
                            isUrl={url}
                            isInjectedJavaScript={script}
                            setHandleMessage={(urlExtracted) => {
                                if (urlExtracted != null && urlExtracted !== 'null') {
                                    setUrlVideo(urlExtracted);
                                }
                            }}
                            overScrollMode='never' 
                            scrollEnabled={false} 
                        />
                    </View>
                    <MyText type='topic' style={{ textTransform: 'uppercase' }}>{`Inicie o video para baixar`}</MyText>
                </View>
            )}
        </View>
    );
};

export default Download;
