import React, { useState } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, Modal, KeyboardAvoidingView } from 'react-native';

import { Text, Button, Select, Input, Icon, Popover, Divider, List, ListItem, SelectItem } from '@ui-kitten/components';
import * as Location from 'expo-location';
import styles from './dataEntryModalStyles.js';
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
            age: ageMatrix[ageIndex],
            gender: genderMatrix[genderIndex],
            activity: activityMatrix[activityIndex],
            posture: postureMatrix[postureIndex]
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

                        {/* <Text category={'h6'} style={{marginBottom: 10, marginTop: 25}}> Gender: </Text>
                        <View style={{flexDirection: 'row',}}>
                            <DataOptionButton index={0} selectionMatrix={genderMatrix} setIndex={_setGenderIndex} text={"Male"}/>
                            <DataOptionButton index={1} selectionMatrix={genderMatrix} setIndex={_setGenderIndex} text={"Female"}/>
                        </View> */}
{/* 
                        <Text category={'h6'} style={{marginBottom: 10, marginTop: 25}}> Activity: </Text>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <DataOptionButton index={0} selectionMatrix={activityMatrix} setIndex={_setActivityIndex} text={"Talking"}/>
                            <DataOptionButton index={1} selectionMatrix={activityMatrix} setIndex={_setActivityIndex} text={"Transit Waiting"}/>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <DataOptionButton index={2} selectionMatrix={activityMatrix} setIndex={_setActivityIndex} text={"Recreation"}/>
                            <DataOptionButton index={3} selectionMatrix={activityMatrix} setIndex={_setActivityIndex} text={"Eating"}/>
                        </View>

                        <Text category={'h6'} style={{marginBottom: 10, marginTop: 25}}> Posture: </Text>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <DataOptionButton index={0} selectionMatrix={postureMatrix} setIndex={_setPostureIndex} text={"Standing"}/>
                            <DataOptionButton index={1} selectionMatrix={postureMatrix} setIndex={_setPostureIndex} text={"Sitting"}/>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <DataOptionButton index={2} selectionMatrix={postureMatrix} setIndex={_setPostureIndex} text={"Laying"}/>
                            <DataOptionButton index={3} selectionMatrix={postureMatrix} setIndex={_setPostureIndex} text={"Lounging"}/>
                        </View> */}

                    </View>

                    <Button style={{marginTop: 15, marginBottom: 20, width: 100, alignSelf:'center'}} onPress={sendData}> Submit </Button>

                </ScrollView>
            </View>
        </Modal>
    )
}