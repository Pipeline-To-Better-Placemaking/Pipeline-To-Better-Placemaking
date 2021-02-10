import React, { useState } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, Modal, KeyboardAvoidingView } from 'react-native';

import { Text, Button, Select, Input, Icon, Popover, Divider, List, ListItem, SelectItem } from '@ui-kitten/components';
import * as Location from 'expo-location';
import styles from './dataEntryModalStyles.js';
import { DataOptionButton } from './dataOptionButton.component.js';

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
    const [ageMatrix, setAgeMatrix] = useState([0,0,0,0])
    const [genderMatrix, setGenderMatrix] = useState([0,0,0,0])
    const [activityMatrix, setActivityMatrix] = useState([0,0,0,0])
    const [postureMatrix, setPostureMatrix] = useState([0,0,0,0])


    const _setAgeIndex = async (index) => {

        
    }

    const _setGenderIndex = (index) => {

        setGenderMatrix([0,0,0,0])

        let mat = genderMatrix
        mat[index] = 1

        setGenderMatrix(mat)
        setGenderIndex(index)
    }

    const _setActivityIndex = (index) => {

        setActivityMatrix([0,0,0,0])

        let mat = activityMatrix
        mat[index] = 1

        setActivityMatrix(mat)
        setActivityIndex(index)
    }

    const _setPostureIndex = (index) => {

        setPostureMatrix([0,0,0,0])

        let mat = postureMatrix
        mat[index] = 1

        setPostureMatrix(mat)
        setPostureIndex(index)
    }

    const sendData = async () => {

        // console.log("Sending data...")

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

        setAgeIndex(-1)
        setGenderIndex(-1)
        setActivityIndex(-1)
        setPostureIndex(-1)
    }

    

    return(
        <Modal transparent={true} animationType='slide'visible={props.visible}>
            <View style={styles.modalContainer}>
                <ScrollView style={styles.scorllViewContainer}>
                    <Text category={'h1'} style={{alignSelf: 'center'}}>Data</Text>
                    <Text category={'s1'} style={{alignSelf: 'center', marginTop: -20}}>___________</Text>
                    <View style={{flexDirection: 'column', marginLeft: 15}}>

                        <Text category={'h6'} style={{marginBottom: 10}}> Age: </Text>
                        <View style={{flexDirection: 'row',}}>
                            <DataOptionButton index={0} selectionMatrix={ageMatrix} setIndex={_setAgeIndex} text={"0 - 14"}/>
                            <DataOptionButton index={1} selectionMatrix={ageMatrix} setIndex={_setAgeIndex} text={"15 - 24"}/>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <DataOptionButton index={2} selectionMatrix={ageMatrix} setIndex={_setAgeIndex} text={"25 - 64"}/>
                            <DataOptionButton index={3} selectionMatrix={ageMatrix} setIndex={_setAgeIndex} text={"65+"}/>
                        </View>

                        <Text category={'h6'} style={{marginBottom: 10, marginTop: 25}}> Gender: </Text>
                        <View style={{flexDirection: 'row',}}>
                            <DataOptionButton index={0} selectionMatrix={genderMatrix} setIndex={_setGenderIndex} text={"Male"}/>
                            <DataOptionButton index={1} selectionMatrix={genderMatrix} setIndex={_setGenderIndex} text={"Female"}/>
                        </View>

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
                        </View>

                    </View>

                    <Button style={{marginTop: 15, marginBottom: 20, width: 100, alignSelf:'center'}} onPress={sendData}> Submit </Button>

                </ScrollView>
            </View>
        </Modal>
    )
}