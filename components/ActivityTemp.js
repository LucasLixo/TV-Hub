import React from 'react';
import {
    View,
    ActivityIndicator,
} from 'react-native';

import Colors from '../hooks/Colors';
import Styles from '../hooks/Styles';

const ActivityTemp = () => {

    return (
        <View style={Styles.ContainerCenter}>
            <ActivityIndicator
                color={Colors.sky.a}
                size="large"
                hidesWhenStopped={true}
            />
        </View>
    );
};

// Export
export default ActivityTemp;