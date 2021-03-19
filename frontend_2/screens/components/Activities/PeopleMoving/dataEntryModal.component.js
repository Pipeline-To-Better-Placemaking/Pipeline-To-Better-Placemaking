import React, { useState } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, Modal, KeyboardAvoidingView } from 'react-native';

import { Text, Button, Select, Input, Icon, Popover, Divider, List, ListItem, SelectItem } from '@ui-kitten/components';
import * as Location from 'expo-location';
import styles from './dataEntryModal.styles.js';
import { DataGroupMovement } from './dataGroupMovement.component.js';

const movement = ["Walking", "Running", "Swiming", "Activity on Wheels", "Handicap Assisted Wheels"]

export function DataEntryModal(props) {

    const [movementIndex, setMovementIndex] = useState(-1)
    const [movementMatrix, setmMovementMatrix] = useState([])

    const setMovementData = async(index, matrix) => {

        await setMovementIndex(index)
        await setmMovementMatrix(matrix)
    }

    const sendData = async () => {

        let data = {
            movementIndex: movementIndex,
            movement: movement[movementIndex], 
        }

        await props.closeData(data)
    }

    return(
        <Modal transparent={true} animationType='slide'visible={props.visible}>
            <View style={styles.modalContainer}>
                <ScrollView style={styles.scorllViewContainer}>
                    <Text category={'h1'} style={{alignSelf: 'center'}}>Data</Text>
                    <Text category={'s1'} style={{alignSelf: 'center', marginTop: -20}}>___________</Text>
                    <View style={{flexDirection: 'column', marginLeft: 15}}>

                        <DataGroupMovement setMovementData={setMovementData}/>

                    </View>

                    <Button style={{marginTop: 15, marginBottom: 20, width: 100, alignSelf:'center'}} onPress={sendData}> Submit </Button>

                </ScrollView>
            </View>
        </Modal>
    )
}
