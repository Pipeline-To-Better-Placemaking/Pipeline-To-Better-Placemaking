import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, Modal, KeyboardAvoidingView } from 'react-native';

import { Text, Button, Select, Input, Icon, Popover, Divider, List, ListItem, SelectItem } from '@ui-kitten/components';
import * as Location from 'expo-location';
import styles from './dataEntryModal.styles.js';

export function DataGroupPosture(props) {

    const [postureIndex, setPostureIndex] = useState(-1)
    const [postureMatrix, setPostureMatrix] = useState([0,0,0,0])

    const _setPostureIndex = async (index) => {

        let mat = [0,0,0,0]
        mat[index] = 1

        await setPostureIndex(index)
        await setPostureMatrix(mat)
        await props.setPostureData(index, mat)
    }

    return(
        <View style={{marginTop: 20}}>
        <Text category={'h6'} style={{marginBottom: 10}}> Posture: </Text>
            <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
                <Button style={{width:150, marginRight: 45}} appearance={postureMatrix[0] ? 'primary' : 'outline'} onPress={() => _setPostureIndex(0)}>Standing</Button>
                <Button style={{width:150, marginRight: 10}} appearance={postureMatrix[1] ? 'primary' : 'outline'} onPress={() => _setPostureIndex(1)}>Sitting</Button>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10, justifyContent:'space-around'}}>
                <Button style={{width:150, marginRight: 45}} appearance={postureMatrix[2] ? 'primary' : 'outline'} onPress={() => _setPostureIndex(2)}>Laying Down</Button>
                <Button style={{width:150, marginRight: 10}} appearance={postureMatrix[3] ? 'primary' : 'outline'} onPress={() => _setPostureIndex(3)}>Squating</Button>
            </View>
        </View>
    )
}
