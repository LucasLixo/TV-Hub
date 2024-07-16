import { Dimensions, PixelRatio, StyleSheet } from 'react-native';
import {
    MD3DarkTheme,
} from 'react-native-paper';
import MyMD3 from './MyMD3';

const theme = { 
    ...MD3DarkTheme, 
    colors: MyMD3.dark 
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const cardWidth = screenWidth * 0.4;
const cardHeight = cardWidth + (cardWidth / 2);
const cardMarginVertical = cardWidth * 0.1;

const Styles = StyleSheet.create({
    AreaView: {
        flex: 1,
        width: screenWidth,
        height: screenHeight,
        position: 'relative',
        backgroundColor: theme.colors.background,
    },
    ContainerView: {
        width: screenWidth,
        height: 'auto',
        flexDirection: 'column',
        paddingVertical: cardMarginVertical
    },
    WebView: {
        flex: 1,
        width: screenWidth,
        height: screenHeight,
        position: 'absolute',
        backgroundColor: theme.colors.background,
    },
    ContainerCenter: {
        flex: 1,
        width: screenWidth,
        height: screenHeight,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 10,
    },
    Header: {
        width: screenWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '5%',
    },
    Divider: {
        marginHorizontal: '5%',
        marginVertical: cardMarginVertical / 2,
    },
    TextDefault: {
        fontSize: PixelRatio.getFontScale() * 10,
        fontWeight: 'bold',
    },
    TextInCard: {
        fontSize: PixelRatio.getFontScale() * 10,
    },
    TextTitle: {
        fontSize: PixelRatio.getFontScale() * 12,
        fontWeight: 'bold',
    },
    TextDescription: {
        fontSize: PixelRatio.getFontScale() * 10,
    },
    TextInput: {
        fontSize: PixelRatio.getFontScale() * 12,
        marginBottom: 10
    },
    //
    Item: {
        width: cardWidth,
        height: cardHeight,
        backgroundColor: theme.colors.inversePrimary,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 5,
        marginHorizontal: '5%',
        marginVertical: cardMarginVertical
    },
    ItemTopText: {
        position: 'absolute',
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 5,
        backgroundColor: theme.colors.elevation.level4,
    },
    ItemBottomText: {
        backgroundColor: theme.colors.elevation.level1,
        position: 'absolute',
        width: '100%',
        padding: 5,
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