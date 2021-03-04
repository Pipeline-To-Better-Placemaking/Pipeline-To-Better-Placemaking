import React, { useState } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, Modal, KeyboardAvoidingView } from 'react-native';

import { Text, Button, Select, Input, Icon, Popover, Divider, List, ListItem, SelectItem } from '@ui-kitten/components';
import * as Location from 'expo-location';
import styles from './dataEntryModal.styles.js';
import { DataGroupAge } from './dataGroupAge.component.js';
import { DataGroupGender } from './dataGroupGender.component.js';
import { DataGroupActivity } from './dataGroupActivity.component.js';
import { DataGroupPosture } from './dataGroupPosture.component.js';

const age = ["0 - 14", "15 - 24", "25 - 64", "65+"]
const gender = ["Male", "Female"]
const activity = ["Talking", "Transit Waiting", "Recreation", "Eating"]
const posture = ["Standing", "Sitting", "Laying", "Lounging"]

export function DataEntryModal(props) {

    const [visible] = useState(props.visible)

    const [ageIndex, setAgeIndex] = useState(-1)
    const [genderIndex, setGenderIndex] = useState(-1)
    const [activityIndex, setActivityIndex] = useState(-1)
    const [postureIndex, setPostureIndex] = useState(-1)

    const [ageMatrix, setAgeMatrix] = useState([])
    const [genderMatrix, setGenderMatrix] = useState([])
    const [activityMatrix, setActivityMatrix] = useState([])
    const [postureMatrix, setPostureMatrix] = useState([])

    const setAgeData = async(index, matrix) => {

        await setAgeIndex(index)
        await setAgeMatrix(matrix)
    }

    const setGenderData = async(index, matrix) => {

        await setGenderIndex(index)
        await setGenderMatrix(matrix)
    }

    const setActivityData = async(index, matrix) => {

        await setActivityIndex(index)
        await setActivityMatrix(matrix)
    }

    const setPostureData = async(index, matrix) => {

        await setPostureIndex(index)
        await setPostureMatrix(matrix)
    }

    const sendData = async () => {

        let data = {
            ageIndex: ageIndex,
            genderIndex: genderIndex,
            activityIndex: activityIndex,
            postureIndex: postureIndex,
            age: age[ageIndex],
            gender: gender[genderIndex],
            activity: activity[activityIndex],
            posture: posture[postureIndex]
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

                        <DataGroupAge setAgeData={setAgeData}/>
                        <DataGroupGender setGenderData={setGenderData}/>
                        <DataGroupActivity setActivityData={setActivityData}/>
                        <DataGroupPosture setPostureData={setPostureData}/>

                    </View>

                    <Button style={{marginTop: 15, marginBottom: 20, width: 100, alignSelf:'center'}} onPress={sendData}> Submit </Button>

                </ScrollView>
            </View>
        </Modal>
    )
}
