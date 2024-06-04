import React from 'react';
import { Text } from 'react-native';
import Colors from '../hooks/Colors';

const MyText = ({ type = 'default', style, children, ...rest }) => {
    const textStyles = {
        default: { fontFamily: 'Noto-Sans', color: Colors.text.a, fontSize: 14, fontWeight: 'normal' },
        subtitle: { fontFamily: 'Noto-Sans', color: Colors.text.a, fontSize: 14, fontWeight: 'normal' },
        topic: { fontFamily: 'Noto-Sans', color: Colors.text.a, fontSize: 14, fontWeight: 'bold' },
        description: { fontFamily: 'Noto-Sans', color: Colors.text.b, fontSize: 14, fontWeight: 'normal' },
        title: { fontFamily: 'Noto-Sans', color: Colors.sky.a, fontSize: 18, fontWeight: 'bold' }
    };

    return (
        <Text
            numberOfLines={type === 'title' ? 1 : undefined}
            ellipsizeMode={type === 'title' ? 'tail' : undefined}
            style={[textStyles[type], style]}
            {...rest}
        >
            {children || ''}
        </Text>
    );
};

// Export
export default MyText;
