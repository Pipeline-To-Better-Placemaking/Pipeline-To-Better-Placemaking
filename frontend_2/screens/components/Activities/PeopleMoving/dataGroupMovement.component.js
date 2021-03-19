import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, Modal, KeyboardAvoidingView } from 'react-native';

import { Text, Button, Select, Input, Icon, Popover, Divider, List, ListItem, SelectItem } from '@ui-kitten/components';
import * as Location from 'expo-location';
import styles from './dataEntryModal.styles.js';

export function DataGroupMovement(props) {

    const [movementIndex, setMovementIndex] = useState(-1)
    const [movementMatrix, setMovementMatrix] = useState([0,0,0,0,0])

    const _setMovementIndex = async (index) => {


        let mat = [0,0,0,0,0]
        mat[index] = 1

        await setMovementIndex(index)
        await setMovementMatrix(mat)
        await props.setMovementData(index, mat)
    }

    return(
        <View style={{marginTop: 20}}>
        <Text category={'h6'} style={{marginBottom: 10}}> Movement: </Text>
            {/* <View style={{flexDirection: 'row', justifyContent:'space-around'}}> */}
                <Button style={{width:275, marginTop: 10, alignSelf: 'center'}} appearance={movementMatrix[0] ? 'primary' : 'outline'} onPress={() => _setMovementIndex(0)}>Walking</Button>
                <Button style={{width:275, marginTop: 10, alignSelf: 'center'}} appearance={movementMatrix[1] ? 'primary' : 'outline'} onPress={() => _setMovementIndex(1)}>Running</Button>
            {/* </View> */}
            {/* <View style={{flexDirection: 'row', marginTop: 10, justifyContent:'space-around'}}> */}
                <Button style={{width:275, marginTop: 10, alignSelf: 'center'}} appearance={movementMatrix[2] ? 'primary' : 'outline'} onPress={() => _setMovementIndex(2)}>Swimming</Button>
                <Button style={{width:275, marginTop: 10, alignSelf: 'center'}} appearance={movementMatrix[3] ? 'primary' : 'outline'} onPress={() => _setMovementIndex(3)}>Activity on Wheels</Button>
            {/* </View> */}
            {/* <View style={{flexDirection: 'row', marginTop: 10, justifyContent:'space-around'}}> */}
                <Button style={{width:275, marginTop: 10, alignSelf: 'center'}} appearance={movementMatrix[4] ? 'primary' : 'outline'} onPress={() => _setMovementIndex(4)}>Handicap Assisted Wheels</Button>
            {/* </View> */}
        </View>
    )
}
