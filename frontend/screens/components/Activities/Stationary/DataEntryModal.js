import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, Modal, KeyboardAvoidingView } from 'react-native';

import { Text, Button, Select, Input, Icon, Popover, Divider, List, ListItem, SelectItem } from '@ui-kitten/components';
import * as Location from 'expo-location';
import styles from './dataEntryModalStyles.js';
import DataOptionButton from './DataOptionButton.js';

const age = ["0 - 14", "15 - 24", "25 - 64", "65+"]
const gender = ["Male", "Female"]
const activity = ["Talking", "Transit Waiting", "Recreation", "Eating"]
const posture = ["Standing", "Sitting", "Laying", "Lounging"]

class DataEntryModal extends Component {

    constructor(props){
        super(props)

        this.state = {
            visible: props.visible,
            ageIndex: -1,
            genderIndex: -1,
            activityIndex: -1,
            postureIndex: -1,
            ageMatrix: [0, 0, 0, 0],
            genderMatrix: [0, 0],
            activityMatrix: [0, 0, 0, 0],
            postureMatrix: [0, 0, 0, 0]
        }

        this.setAgeIndex = this.setAgeIndex.bind(this)
        this.setGenderIndex = this.setGenderIndex.bind(this)
        this.setActivityIndex = this.setActivityIndex.bind(this)
        this.setPostureIndex = this.setPostureIndex.bind(this)
    }

    setAgeIndex(index){

        let ageMatrix = this.state.ageMatrix

        for (let i = 0; i < ageMatrix.length; i++){
            ageMatrix[i] = 0
        }

        ageMatrix[index] = 1

        this.setState({
            ageIndex: index,
            ageMatrix: ageMatrix
        })
    }

    setGenderIndex(index){

        let genderMatrix = this.state.genderMatrix

        for (let i = 0; i < genderMatrix.length; i++){
            genderMatrix[i] = 0
        }

        genderMatrix[index] = 1

        this.setState({
            genderIndex: index,
            genderMatrix: genderMatrix
        })
    }

    setActivityIndex(index){

        let activityMatrix = this.state.activityMatrix

        for (let i = 0; i < activityMatrix.length; i++){
            activityMatrix[i] = 0
        }

        activityMatrix[index] = 1

        this.setState({
            activityIndex: index,
            activityMatrix: activityMatrix
        })
    }

    setPostureIndex(index){

        let postureMatrix = this.state.postureMatrix


        for (let i = 0; i < postureMatrix.length; i++){
            postureMatrix[i] = 0
        }

        postureMatrix[index] = 1

        this.setState({
            postureMatrix: index,
            postureMatrix: postureMatrix
        })
    }

    sendData = () => {

        let data = {
            ageIndex: this.state.ageIndex,
            genderIndex: this.state.genderIndex,
            activityIndex: this.state.activityIndex,
            postureIndex: this.state.postureIndex,
            age: age[this.state.ageIndex],
            gender: gender[this.state.genderIndex],
            activity: activity[this.state.activityIndex],
            posture: posture[this.state.postureIndex]

        }

        this.props.closeData(data)

        this.setState({
            ageIndex: -1,
            genderIndex: -1,
            activityIndex: -1,
            postureIndex: -1
        }) 
    }

    render() {

        return(
            <Modal transparent={true} animationType='slide'visible={this.props.visible}>
                <View style={styles.modalContainer}>
                    <ScrollView style={styles.scorllViewContainer}>
                        <Text category={'h1'} style={{alignSelf: 'center'}}>Data</Text>
                        <Text category={'s1'} style={{alignSelf: 'center', marginTop: -20}}>___________</Text>
                        <View style={{flexDirection: 'column', marginLeft: 15}}>

                            <Text category={'h6'} style={{marginBottom: 10}}> Age: </Text>
                            <View style={{flexDirection: 'row',}}>
                                <DataOptionButton index={0} selectionMatrix={this.state.ageMatrix} setIndex={this.setAgeIndex} text={"0 - 14"}/>
                                <DataOptionButton index={1} selectionMatrix={this.state.ageMatrix} setIndex={this.setAgeIndex} text={"15 - 24"}/>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 10}}>
                                <DataOptionButton index={2} selectionMatrix={this.state.ageMatrix} setIndex={this.setAgeIndex} text={"25 - 64"}/>
                                <DataOptionButton index={3} selectionMatrix={this.state.ageMatrix} setIndex={this.setAgeIndex} text={"65+"}/>
                            </View>

                            <Text category={'h6'} style={{marginBottom: 10, marginTop: 25}}> Gender: </Text>
                            <View style={{flexDirection: 'row',}}>
                                <DataOptionButton index={0} selectionMatrix={this.state.genderMatrix} setIndex={this.setGenderIndex} text={"Male"}/>
                                <DataOptionButton index={1} selectionMatrix={this.state.genderMatrix} setIndex={this.setGenderIndex} text={"Female"}/>
                            </View>

                            <Text category={'h6'} style={{marginBottom: 10, marginTop: 25}}> Activity: </Text>
                            <View style={{flexDirection: 'row', marginTop: 10}}>
                                <DataOptionButton index={0} selectionMatrix={this.state.activityMatrix} setIndex={this.setActivityIndex} text={"Talking"}/>
                                <DataOptionButton index={1} selectionMatrix={this.state.activityMatrix} setIndex={this.setActivityIndex} text={"Transit Waiting"}/>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 10}}>
                                <DataOptionButton index={2} selectionMatrix={this.state.activityMatrix} setIndex={this.setActivityIndex} text={"Recreation"}/>
                                <DataOptionButton index={3} selectionMatrix={this.state.activityMatrix} setIndex={this.setActivityIndex} text={"Eating"}/>
                            </View>

                            <Text category={'h6'} style={{marginBottom: 10, marginTop: 25}}> Posture: </Text>
                            <View style={{flexDirection: 'row', marginTop: 10}}>
                                <DataOptionButton index={0} selectionMatrix={this.state.postureMatrix} setIndex={this.setPostureIndex} text={"Standing"}/>
                                <DataOptionButton index={1} selectionMatrix={this.state.postureMatrix} setIndex={this.setPostureIndex} text={"Sitting"}/>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 10}}>
                                <DataOptionButton index={2} selectionMatrix={this.state.postureMatrix} setIndex={this.setPostureIndex} text={"Laying"}/>
                                <DataOptionButton index={3} selectionMatrix={this.state.postureMatrix} setIndex={this.setPostureIndex} text={"Lounging"}/>
                            </View>

                        </View>

                        <Button style={{marginTop: 15, marginBottom: 20, width: 100, alignSelf:'center'}} onPress={this.sendData}> Submit </Button>

                    </ScrollView>
                </View>
            </Modal>
        )
    }
}

export default DataEntryModal