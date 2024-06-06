import React from 'react';
import {
    Text,
    View,
} from 'react-native';
import Styles from '../hooks/Styles';
import Colors from '../hooks/Colors';

const ActivityErro = ({ textError }) => {

    return (
        <View style={Styles.ContainerCenter}>
            <Text style={{ fontSize: 22, textAlign: 'center', textTransform: 'uppercase', color: Colors.sky.a }}>
                {`ERROR`}
            </Text>
            {textError && (
                <Text style={{ fontSize: 12, textAlign: 'center', textTransform: 'uppercase', color: Colors.text.a }}>
                    {textError}
                </Text>
            )}
        </View>
    );
};

// Export
export default ActivityErro;