import React, { useRef } from 'react';
import WebView from 'react-native-webview';
import { USER_AGENT_WINDOWS } from '../../hooks/Constants';
import Styles from '../../hooks/Styles';
import { DOMAINS } from '../../hooks/Constants';

const WebPlayer = ({ isUrl, isInjectedJavaScript, setHandleErro }) => {
    const WebRef = useRef(null);

    const onShouldStartLoadWithRequest = (request) => {
        const url = new URL(request.url);
        // return DOMAINS.includes(url.hostname);
        const hostname = url.hostname;
        return DOMAINS.some(domain => hostname.includes(domain));
    };

    return (
        <WebView
            ref={WebRef}
            source={{ uri: isUrl }}
            style={Styles.WebView}
            // javaScript Enabled
            javaScriptEnabled={true}
            // javaScript Can Open Window
            javaScriptCanOpenWindowsAutomatically={false}
            setSupportMultipleWindows={false}
            // dom Storage Enabled
            domStorageEnabled={true}
            // scales Page To Fit
            scalesPageToFit={false}
            // on Error
            onError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                setHandleErro(nativeEvent.description);
            }}
            injectedJavaScript={isInjectedJavaScript}
            onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
            // start In Loading State
            startInLoadingState={false}
            // userAgent
            userAgent={USER_AGENT_WINDOWS}
            // allows Protected Media
            allowsProtectedMedia={true}
            allowsFullscreenVideo={true}
            // text size android
            textZoom={100}
            // force Dark
            forceDarkOn={true}
            // Downloads
            cacheEnabled={true}
            cacheMode='LOAD_CACHE_ELSE_NETWORK'
            saveFormDataDisabled={false}
            allowFileAccess={false}
            // Icognito
            incognito={false}
            // Scrool
            overScrollMode='never'
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            // enable zoom
            setBuiltInZoomControls={false}
            // load media - always
            mixedContentMode='compatibility'
            thirdPartyCookiesEnabled={true}
            sharedCookiesEnabled={true}
        />
    );
};

// Export
export default WebPlayer;
