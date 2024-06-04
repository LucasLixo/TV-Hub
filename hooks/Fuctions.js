import {
    ToastAndroid,
} from "react-native";
import * as Clipboard from 'expo-clipboard';
import { VIZER_HOST } from './Constants';

export const clipboardToast = async (Clip) => {
    await Clipboard.setStringAsync(Clip);
    ToastAndroid.show(`Copiado`, ToastAndroid.SHORT);
}

export const encodeWithPlus = (str) => {
    return encodeURIComponent(str).replace(/%20/g, '+');
}

export const verifyUrl = async (url) => {
    try {
        const response = await fetch(url);
        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

export const extractUrlVizer = (url) => {
    const regex = /(\d+)\/?$/;
    const match = url.match(regex);
    return `${VIZER_HOST}/embed/getplay.php?id=${match ? match[1] : null}`;
}
