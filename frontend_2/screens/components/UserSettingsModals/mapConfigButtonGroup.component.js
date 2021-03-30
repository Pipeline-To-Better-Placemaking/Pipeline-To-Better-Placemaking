import React, { useState, useEffect } from 'react';
import { View, Modal, ScrollView } from 'react-native';
import { Icon, Input, Text, Button, ButtonGroup } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        <View style={{flexDirection: 'row', alignSelf: 'center', margin:5}}>

            <Button status={"primary"}
                    appearance={selected ? "primary" : "outline"}
                    onPress={onStandardPress}
                    style={{borderTopRightRadius: 0, borderBottomRightRadius: 0, width:'50%'}}>
                STANDARD MAP
            </Button>

            <Button status={"primary"}
                    appearance={selected ? "outline" : "primary"}
                    onPress={onSatellitePress}
                    style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0, width:'50%'}}>
                SATELLITE MAP
            </Button>

        </View>
    )
}
