import { StyleSheet } from 'react-native';

// Recursos
import Colors from './Colors';

const Styles = StyleSheet.create({
    AreaView: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    ContainerView: {
        width: '100%',
        height: 'auto',
        paddingLeft: 10,
        paddingBottom: 10,
        flexDirection: 'column',
    },
    Hr: {
        width: '95%',
        marginHorizontal: 'auto',
        marginVertical: 5,
        borderBottomColor: Colors.gray.a,
        borderBottomWidth: 1,
    },
    Header: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    WebView: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: Colors.background.a
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
        backgroundColor: Colors.gray.a,
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
        backgroundColor: Colors.gray.b
    },
    FlatlistHorizontalTime: {
        position: 'absolute',
        paddingHorizontal: 5,
        paddingVertical: 2,
        top: 5,
        right: 5,
        borderRadius: 5,
        backgroundColor: Colors.gray.b
    },
    FlatlistHorizontalTitle: {
        position: 'absolute',
        width: '100%',
        padding: 5,
        bottom: 0,
        left: 0,
    },
    DetailsTop: {
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    FlatlistVertical: {
        width: 160,
        height: 240,
        backgroundColor: Colors.gray.a,
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
        backgroundColor: Colors.background.c,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    ContainerServices: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 10,
    },
    ContainerServicesPressable: {
        width: '30%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: Colors.sky.b,
    },
    CardOut: {
        width: '100%',
        padding: 10,
        borderRadius: 10,
        backgroundColor: Colors.background.a
    },
    CardIn: {
        width: '100%',
        padding: 5,
        borderRadius: 10,
        backgroundColor: Colors.gray.a
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
        backgroundColor: Colors.sky.b,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ButtonPage: {
        borderRadius: 10, 
        marginRight: 10, 
        paddingHorizontal: 10, 
        height: '100%', 
        justifyContent: 'center', 
        backgroundColor: Colors.sky.b
    }
});

// Export
export default Styles;