import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from './mapConfigButtonGroup.styles';

export function MapConfigButtonGroup(props) {

    const [selected, setSelected] = useState(true)

    const onStandardPress = async () => {
        setSelected(true)

        await AsyncStorage.setItem("@mapConfig", "standard")
    }

    const onSatellitePress = async () => {
        setSelected(false)

        await AsyncStorage.setItem("@mapConfig", "satellite")
    }

    return(
        <View style={styles.container}>

            <Button status={"primary"}
                    appearance={selected ? "primary" : "outline"}
                    onPress={onStandardPress}
                    style={styles.buttonRight}>
                STANDARD MAP
            </Button>

            <Button status={"primary"}
                    appearance={selected ? "outline" : "primary"}
                    onPress={onSatellitePress}
                    style={styles.buttonLeft}>
                SATELLITE MAP
            </Button>

        </View>
    )
}
