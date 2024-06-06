import React from 'react';
import WebView from 'react-native-webview';
import { USER_AGENT_IPHONE } from '../../hooks/Constants';

const WebScraping = ({ isUrl, isInjectedJavaScript, setHandleMessage }) => {
    
    return (
        <WebView
            source={{ uri: isUrl }}
            style={{ flex: 0, height: 0, width: 0, position: 'absolute' }}
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
            // onError={(syntheticEvent) => setHandleErro(syntheticEvent.nativeEvent.description)}
            injectedJavaScript={isInjectedJavaScript}
            onMessage={(event) => {
                // console.log(event.nativeEvent.data);
                setHandleMessage(event.nativeEvent.data)
            }}
            // start In Loading State
            startInLoadingState={false}
            // userAgent
            userAgent={USER_AGENT_IPHONE}
            // allows Protected Media
            allowsProtectedMedia={true}
            allowsFullscreenVideo={true}
            // text size android
            textZoom={100}
            // Downloads
            // cacheMode='LOAD_DEFAULT'
            cacheEnabled={true}
            cacheMode='LOAD_CACHE_ELSE_NETWORK'
            saveFormDataDisabled={false}
            allowFileAccess={false}
            // Icognito
            incognito={false}
            // load media - always
            mixedContentMode='compatibility'
            thirdPartyCookiesEnabled={true}
            sharedCookiesEnabled={true}
        />
    );
};

// Export
export default WebScraping;