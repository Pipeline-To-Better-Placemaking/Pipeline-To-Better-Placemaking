import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, Modal, KeyboardAvoidingView } from 'react-native';

import { Text, Button, Select, Input, Icon, Popover, Divider, List, ListItem, SelectItem } from '@ui-kitten/components';
import * as Location from 'expo-location';
import styles from './dataEntryModal.styles.js';

export function DataGroupActivity(props) {

    const [activityIndex, setActivityIndex] = useState(-1)
    const [activityMatrix, setActivityMatrix] = useState([0,0,0,0])

    const _setActivityIndex = async (index) => {


        let mat = [0,0,0,0]
        mat[index] = 1

        await setActivityIndex(index)
        await setActivityMatrix(mat)
        await props.setActivityData(index, mat)
    }

    return(
        <View style={{marginTop: 20}}>
        <Text category={'h6'} style={{marginBottom: 10}}> Activity: </Text>
            <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
                <Button style={{width:150, marginRight: 45}} appearance={activityMatrix[0] ? 'primary' : 'outline'} onPress={() => _setActivityIndex(0)}>Talking</Button>
                <Button style={{width:150}} appearance={activityMatrix[1] ? 'primary' : 'outline'} onPress={() => _setActivityIndex(1)}>Transit Waiting</Button>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10, justifyContent:'space-around'}}>
                <Button style={{width:150, marginRight: 45}} appearance={activityMatrix[2] ? 'primary' : 'outline'} onPress={() => _setActivityIndex(2)}>Recreation</Button>
                <Button style={{width:150}} appearance={activityMatrix[3] ? 'primary' : 'outline'} onPress={() => _setActivityIndex(3)}>Eating</Button>
            </View>
        </View>
    )
}
