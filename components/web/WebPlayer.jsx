import React from 'react';
import WebView from 'react-native-webview';
import { USER_AGENT_ANDROID } from '../../utils/Constants';
import Styles from '../../utils/Styles';
import { DOMAINS } from '../../utils/Constants';

const WebPlayer = ({ isUrl, isInjectedJavaScript, setHandleErro, setHandleVideo }) => {
    const onShouldStartLoadWithRequest = (request) => {
        const url = new URL(request.url);
        const hostname = url.hostname;

        const requiresPathCheck = ['mixdrop', 'streamtape', 'filemoon'];
        const domainRequiresPathCheck = requiresPathCheck.some(domain => hostname.includes(domain));

        if (domainRequiresPathCheck) {
            setHandleVideo(!url.pathname.endsWith('/e/'));
        }

        return DOMAINS.some(domain => hostname.includes(domain));
    };

    const scrollCSS = `
        body { overflow: hidden; }
        ::-webkit-scrollbar { display: none; }
    `;

    const scrollJavaScript = `
        setTimeout(() => {
            const style = document.createElement('style');
            style.type = 'text/css';
            style.appendChild(document.createTextNode(\`${scrollCSS}\`));
            document.head.appendChild(style);
        }, 1000);
        true;
    `;

    return (
        <WebView
            source={{
                uri: isUrl,
                headers: {
                    'User-Agent': USER_AGENT_ANDROID,
                }
            }}
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
            injectedJavaScript={isInjectedJavaScript + scrollJavaScript}
            onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
            // start In Loading State
            startInLoadingState={false}
            // userAgent
            userAgent={USER_AGENT_ANDROID}
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
            scrollEnabled={false}
            overScrollMode='never'
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            // enable zoom
            setBuiltInZoomControls={true}
            // load media - always
            mixedContentMode='compatibility'
            thirdPartyCookiesEnabled={true}
            sharedCookiesEnabled={true}
        />
    );
};

// Export
export default WebPlayer;
