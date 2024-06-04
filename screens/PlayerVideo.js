import React, { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { setStatusBarHidden } from 'expo-status-bar';
import ActivityTemp from '../components/ActivityTemp';
import WebPlayer from '../components/web/WebPlayer';
import { SCRIPT_BLOCK_MIXDROP, SCRIPT_BLOCK_FILEMOON, SCRIPT_BLOCK_STREAMTAPE } from '../hooks/Scripts';

const PlayerVideo = () => {
    const route = useRoute();

    const url = route.params?.url;
    const service = route.params?.service;

    let webPlayerProps = {};
    
    useEffect(() => {
        setStatusBarHidden(true, 'none');
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        return () => {
            setStatusBarHidden(false, 'none');
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        };
    });

    if (url && service) {
        switch (service) {
            case 'mixdrop':
                webPlayerProps = {
                    isUrl: url,
                    isInjectedJavaScript: SCRIPT_BLOCK_MIXDROP,
                };
                break;
            case 'filemoon':
                webPlayerProps = {
                    isUrl: url,
                    isInjectedJavaScript: SCRIPT_BLOCK_FILEMOON,
                };
                break;
            case 'streamtape':
                webPlayerProps = {
                    isUrl: url,
                    isInjectedJavaScript: SCRIPT_BLOCK_STREAMTAPE,
                };
                break;
        }
    }

    return (
        <>
            {url && service ? (
                <WebPlayer
                    {...webPlayerProps}
                    setHandleErro={(results) => console.log(results)}
                />
            ) : (
                <ActivityTemp />
            )}
        </>
    );
};

// Export
export default PlayerVideo;
