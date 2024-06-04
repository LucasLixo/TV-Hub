import React from 'react';
import { TextInput } from 'react-native';
import Colors from '../hooks/Colors';

const MyTextInput = ({ style, ...rest }) => {
    return (
        <TextInput
            selectionColor={Colors.sky.b}
            selectionHandleColor={Colors.sky.b}
            cursorColor={Colors.sky.b}
            style={[{ width: '90%', height: '100%', fontSize: 18, fontFamily: 'Noto-Sans', color: Colors.text.a }, style]}
            {...rest}
        />
    );
};

// Export
export default MyTextInput;
