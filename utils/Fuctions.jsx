import { useContext } from "react";
import {
    ToastAndroid,
} from "react-native";
import * as Clipboard from 'expo-clipboard';
import { VizerContext } from "./VizerProvider";

export const clipboardToast = async (Clip) => {
    await Clipboard.setStringAsync(Clip);
    ToastAndroid.show(`Copiado`, ToastAndroid.SHORT);
}

export const encodeWithPlus = (str) => {
    return encodeURIComponent(str).replace(/%20/g, '+');
}

export const extractUrlVizer = (url) => {
    const regex = /(\d+)\/?$/;
    const match = url.match(regex);
    const vizerHost = useContext(VizerContext);
    return `${vizerHost}/embed/getplay.php?id=${match ? match[1] : null}`;
}

export const capitalizeString = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
};
