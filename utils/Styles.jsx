import { StyleSheet } from 'react-native';
import {
    MD3DarkTheme,
} from 'react-native-paper';
import MyMD3 from './MyMD3';

const theme = { 
    ...MD3DarkTheme, 
    colors: MyMD3.dark 
}

const Styles = StyleSheet.create({
    AreaView: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'relative',
        backgroundColor: theme.colors.background,
    },
    ContainerView: {
        width: '100%',
        height: 'auto',
        paddingLeft: 10,
        paddingBottom: 10,
        flexDirection: 'column',
    },
    Header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    WebView: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: theme.colors.background,
    },
    ContainerCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 10,
    },
    FlatlistHorizontal: {
        width: 160,
        height: 240,
        backgroundColor: theme.colors.inversePrimary,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 5,
        marginRight: 15,
    },
    FlatlistHorizontalLanguage: {
        position: 'absolute',
        paddingHorizontal: 5,
        paddingVertical: 2,
        top: 5,
        left: 5,
        borderRadius: 5,
        backgroundColor: theme.colors.elevation.level4,
    },
    FlatlistHorizontalTime: {
        position: 'absolute',
        paddingHorizontal: 5,
        paddingVertical: 2,
        top: 5,
        right: 5,
        borderRadius: 5,
        backgroundColor: theme.colors.elevation.level4,
    },
    FlatlistHorizontalTitle: {
        backgroundColor: theme.colors.elevation.level1,
        position: 'absolute',
        width: '100%',
        padding: 5,
        bottom: 0,
        left: 0,
    },
    FlatlistVertical: {
        width: 160,
        height: 240,
        backgroundColor: theme.colors.inversePrimary,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 5,
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 10,
    },
    ModalContentShadow: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: -1,
        backgroundColor: '#000000CC',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    ContainerServices: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 10,
    },
    CardOut: {
        width: '100%',
        padding: 10,
        borderRadius: 10,
        backgroundColor: theme.colors.background,
    },
    CardIn: {
        width: '100%',
        padding: 5,
        borderRadius: 10,
    },
    CardContainer: {
        width: '100%',
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    CardContainerButton: {
        width: '40%',
        height: '100%',
        backgroundColor: theme.colors.onPrimary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

// Export
export default Styles;