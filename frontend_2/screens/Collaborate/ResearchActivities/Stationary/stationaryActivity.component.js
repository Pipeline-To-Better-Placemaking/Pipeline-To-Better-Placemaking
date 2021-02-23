import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, Modal, KeyboardAvoidingView } from 'react-native';
import { ViewableArea, ContentContainer } from '../../../components/content.component';
import { Header } from '../../../components/headers.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import { StationaryActivityMap } from '../../../components/Maps/stationaryActivityMap.component.js';
import { Timer } from '../../../components/timer.component.js';
import { MovingModal } from '../../../components/Activities/Stationary/movingModal.component.js';
import { DataEntryModal } from '../../../components/Activities/Stationary/dataEntryModal.component.js';
import CountDown from 'react-native-countdown-component';

export function StationaryActivity(props) {


    const [location] = useState(props.timeSlot.location)
    const [area] = useState(props.timeSlot.area)
    const [position] = useState(props.timeSlot.position)
    const [start, setStart] = useState(false)
    const [moving, setMoving] = useState(false)
    const [standingIndex, setStandingIndex] = useState(0)
    const [dataModal, setDataModal] = useState(false)
    const [tempMarker, setTempMarker] = useState([])
    const [data, setData] = useState([{}])
    const [markers, setMarkers] = useState([])
    const [recenter, setRecenter] = useState(false)

    const openPrevPage = () => {
        props.navigation.navigate("SignUpPage");
    }

    const onPointCreate = async (marker) => {

        if (start) {
            setDataModal(true)
            setTempMarker(marker)
        }
    }

    const closeData = async (inf) => {

        console.log("Inf is: " + JSON.stringify(inf))

        if (inf.ageIndex > -1 && inf.genderIndex > -1 && inf.activityIndex > -1) {

            let pointData = {
                age: inf.age,
                gender: inf.gender,
                activity: inf.activity,
                posture: inf.posture,
                location: tempMarker
            }

            setData(() => data.concat(pointData))
            setMarkers(() => markers.concat(tempMarker))

            console.log("Data: " +  JSON.stringify(data))

            setDataModal(false)
        }
    }

    const endActivity = () => {
      setStart(false)
      props.navigation.navigate("ActivitySignUpPage");
    }

    const restart = () => {
        let standingPointLength = Object.keys(props.timeSlot.position).length

        console.log("Resetting...")
        console.log("StandingIndex: " + standingIndex)
        console.log("StandingPointLength: " + standingPointLength)

        if (standingIndex < standingPointLength-1){
            console.log("Increasing index")

            setStandingIndex(standingIndex+1)
            setRecenter(true)
            setStart(false)
            setMoving(true)
        }
        else if (standingIndex == standingPointLength-1){
            props.navigation.navigate("ActivitySignUpPage");
        }
    }

    const rebegin = () =>{

        setStart(true)
        setMoving(false)
        setRecenter(false)
    }

    const StartStopButton = () => {

        if (start) {
            return(
                <Button
                    status={'danger'}
                    style={{height: 50, marginTop: 5, marginLeft: 5, width: 90}}
                    onPress={() => endActivity()}
                    >
                        End
                    </Button>
            )
        }
        else{
            return(
                <Button
                    style={{backgroundColor: '#006FD6'}}
                    style={{height: 50, marginTop: 5, marginLeft: 5, width: 90}}
                    onPress={() => setStart(true)}
                >
                    Start
                </Button>
            )
        }
    }

    const updateTime = (value) => {
        console.log("timer: ", value-1);
        console.log("Time left: " + JSON.stringify(props.timeSlot.timeLeft))
        console.log("Initial time slot time left: " + JSON.stringify(props.initialTimeSlot.timeLeft))
        let temp = props.timeSlot;
        temp.timeLeft = value-1;
        props.setTimeSlot(temp);

        if (value-1 == 0){
            console.log("Initial time slot time left: " + JSON.stringify(props.initialTimeSlot.timeLeft))
            let resetSlot = props.timeSlot;
            resetSlot.timeLeft = props.initialTimeSlot.timeLeft;
            props.setTimeSlot(resetSlot);

            restart()
        }
    }

    const TimeBar = () => {

        return(
            <View>
                <View style={{height: 60, flexDirection: 'row'}}>

                    <StartStopButton/>

                    <View style={{marginLeft: 175, marginTop: 5}}>
                        <CountDown
                            running={start}
                            until={props.timeSlot.timeLeft}
                            onChange={(value) => updateTime(value)}
                            size={20}
                            digitStyle={{backgroundColor: 'white'}}
                            digitTxtStyle={{color: 'black'}}
                            timeToShow={['M', 'S']}
                            timeLabels={{m: '', s: ''}}
                            showSeparator
                        />
                    </View>
                </View>
            </View>
        )
    }

    return(
        <ViewableArea>
            <Header text={'Stationary Activity'}/>
            <ContentContainer>

                    <TimeBar/>

                    <DataEntryModal
                        visible={dataModal}
                        anchor={TimeBar}
                        closeData={closeData}
                    />

                    <MovingModal
                        moving={moving}
                        confirm={rebegin}
                    />

                    <StationaryActivityMap
                        location={location}
                        area={area}
                        position={position[standingIndex]}
                        markers={markers}
                        addMarker={onPointCreate}
                        recenter={recenter}
                    />

            </ContentContainer>
        </ViewableArea>
    )
};
