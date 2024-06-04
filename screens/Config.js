import React from 'react';
/* import WebView from 'react-native-webview';
 */
import { VIZER_DOMAIN } from "../hooks/Constants";
import MyText from '../components/MyText';
import Styles from '../hooks/Styles';
import { ScrollView, View } from 'react-native';

const Config = () => {
    /* const configHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style type="text/css">
                html, body, body * {
                    padding: 0,
                    margin: 0,
                    boxsizing: border-box;
                    color: ${Colors.text.a};
                }
                html, body {
                    padding: 20px 0,
                }
                body {
                    background: ${Colors.background.a};
                }
            </style>
        </head>
        <body>
            <ul>
                <li>Em breve</li>
            </ul>
        </body>
        </html>
    `; */

    return (
        <ScrollView style={{ paddingHorizontal: 10, width: '100%', height: 'auto' }}>
            {/* <WebView
                style={{ flex: 1, backgroundColor: Colors.background.a }}
                source={{ html: configHtml }}
                userAgent={USER_AGENT_MOZILLA}
            /> */}
            <View style={Styles.Hr} />
            <MyText type='topic'>
                {`Provedor: `}
                <MyText type='description'>
                    {VIZER_DOMAIN}
                </MyText>
            </MyText>
        </ScrollView>
    );
};

// Export
export default Config;