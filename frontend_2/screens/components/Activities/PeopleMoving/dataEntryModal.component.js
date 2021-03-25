import React, { useState } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, Modal, KeyboardAvoidingView } from 'react-native';

import { useTheme, Text, Button, Select, Input, Icon, Popover, Divider, List, ListItem, SelectItem } from '@ui-kitten/components';
import * as Location from 'expo-location';
import styles from './dataEntryModal.styles.js';
import { DataGroupMovement } from './dataGroupMovement.component.js';

const movement = ["Walking", "Running", "Swiming", "Activity on Wheels", "Handicap Assisted Wheels"]

export function DataEntryModal(props) {

    const theme = useTheme();

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
        <Modal transparent={true} animationType='slide' visible={props.visible}>
          <View style={{height: '100%',backgroundColor:'rgba(0,0,0, 0.5)'}}>
            <View
              style={{
                height: '50%',
                marginTop: 'auto',
                backgroundColor:theme['background-basic-color-1'],
                borderTopLeftRadius: 35,
                borderTopRightRadius: 35,
                borderWidth: 1
              }}
            >
                <ScrollView>
                    <Text category={'h1'} style={{alignSelf: 'center'}}>Data</Text>
                    <Text category={'s1'} style={{alignSelf: 'center', marginTop: -20}}>___________</Text>
                    <View style={{flexDirection: 'column', marginLeft: 15}}>

                        <DataGroupMovement setMovementData={setMovementData}/>

                    </View>

                    <Button style={{marginTop: 15, marginBottom: 20, width: 100, alignSelf:'center'}} onPress={sendData}> Submit </Button>

                </ScrollView>
            </View>
          </View>
        </Modal>
    )
}
