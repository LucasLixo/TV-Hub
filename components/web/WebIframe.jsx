import React from 'react';
import WebView from 'react-native-webview';
import { USER_AGENT_IPHONE } from '../../utils/Constants';
import Styles from '../../utils/Styles';
import { DOMAINS } from '../../utils/Constants';

const WebIframe = ({ isUrl, isInjectedJavaScript, setHandleErro, setHandleMessage, ...props }) => {
    const onShouldStartLoadWithRequest = (request) => {
        const url = new URL(request.url);
        
        const hostname = url.hostname;
        return DOMAINS.some(domain => hostname.includes(domain));
    };

    return (
        <WebView
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
            onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
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
            allowsFullscreenVideo={false}
            // text size android
            textZoom={100}
            // Downloads
            cacheEnabled={true}
            cacheMode='LOAD_CACHE_ELSE_NETWORK'
            saveFormDataDisabled={false}
            allowFileAccess={false}
            // Icognito
            incognito={false}
            // Scrool
            overScrollMode='always'
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            // enable zoom
            setBuiltInZoomControls={false}
            // load media - always
            mixedContentMode='compatibility'
            thirdPartyCookiesEnabled={true}
            sharedCookiesEnabled={true}
            {...props}
        />
    );
};

// Export
export default WebIframe;
