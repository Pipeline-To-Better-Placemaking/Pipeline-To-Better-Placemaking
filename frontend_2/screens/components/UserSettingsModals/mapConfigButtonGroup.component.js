import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from './mapConfigButtonGroup.styles';

export function MapConfigButtonGroup(props) {

    const [selected, setSelected] = useState(true)

    const onStandardPress = async () => {
        setSelected(false)

        await AsyncStorage.setItem("@mapConfig", "standard")
    }

    const onSatellitePress = async () => {
        setSelected(true)

        await AsyncStorage.setItem("@mapConfig", "satellite")
    }

    return(
        <View style={styles.container}>

            <Button status={"primary"}
                    appearance={selected ? "primary" : "outline"}
                    onPress={onSatellitePress}
                    style={styles.buttonRight}>
                SATELLITE MAP
            </Button>

            <Button status={"primary"}
                    appearance={selected ? "outline" : "primary"}
                    onPress={onStandardPress}
                    style={styles.buttonLeft}>
                STANDARD MAP
            </Button>

        </View>
    )
}
