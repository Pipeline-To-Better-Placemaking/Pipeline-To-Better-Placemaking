import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ViewableArea, ContentContainer } from '../../../components/content.component';
import { Header } from '../../../components/headers.component';
import { useTheme, Button, Text, Icon } from '@ui-kitten/components';
import { StationaryActivityMap } from '../../../components/Maps/stationaryActivityMap.component.js';
import { MovingModal } from '../../../components/Activities/Stationary/movingModal.component.js';
import { DataEntryModal } from '../../../components/Activities/Stationary/dataEntryModal.component.js';
import { DeleteModal } from '../../../components/Activities/deleteModal.component';
import { PopupMessage } from '../../../components/Activities/popupMessage.component';
import CountDown from 'react-native-countdown-component';

import { styles } from '../activity.style';

export function StationaryActivity(props) {

    const theme = useTheme();

    /// Location, area, and standing points for SM
    /// Bool indicating to the map to recenter
    const [location] = useState(props.timeSlot.location)
    const [area] = useState(props.timeSlot.area)
    const [position] = useState(props.timeSlot.position)
    const [recenter, setRecenter] = useState(false)

    // Begins the test
    const [start, setStart] = useState(false)
    const [initalStart, setInitalStart] = useState(true);
    const [disabled, setDisabled] = useState(true);

    // timer stuff
    const initalTime = props.timeSlot.timeLeft
    // controls the rendered countdown timer
    const [timer, setTimer] = useState(initalTime);
    // controls timer interval instance
    const [id, setId] = useState();

    const [popupMsg, setPopupMsg] = useState(true);

    // Shows the moving and data input modal
    const [moving, setMoving] = useState(false)
    const [dataModal, setDataModal] = useState(false)

    // The index of the standing points
    const [standingIndex, setStandingIndex] = useState(0)

    // Temp marker, inputted data points, and all of their locations
    const [tempMarker, setTempMarker] = useState([])
    const [data] = useState([])
    const [markers] = useState([])
    
    // delete data point controls
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(-1);
    const [deleteDesc, setDeleteDesc] = useState('');
    const [deleteExtraDesc, setDeleteExtraDesc] = useState('');

    // Opens the data model and stores a temporary points
    const onPointCreate = async (marker) => {
        if (start) {
            setDataModal(true)
            setTempMarker(marker)
        }
    }

    // Closes the modal and saves the data point
    const closeData = async (inf) => {

        if (inf.ageIndex > -1 && inf.genderIndex > -1 && inf.activityCount > 0 && inf.postureIndex > -1) {

            let pointData = {
                age: inf.age,
                gender: inf.gender,
                activity: inf.activity,
                posture: inf.posture,
                location: tempMarker,
                colorIndex: inf.colorIndex,
                time: new Date(),
                standingPoint: position[standingIndex]._id,
            }
            
            //changed this to have let (it was just: obj = { ...)
            let obj = {
                marker: tempMarker,
                colorIndex: inf.postureIndex
            }
            
            data.push(pointData);
            markers.push(obj);

            setDataModal(false)
        }
    }

    // pulls up the delete modal
    const handleDelete = (index) =>{
        let descriptionFormat = "Posture: " + data[index].posture
        descriptionFormat = descriptionFormat.concat(', Age: ', data[index].age)
        descriptionFormat = descriptionFormat.concat(', Gender: ', data[index].gender)
        descriptionFormat = descriptionFormat.concat(', Activity: ', data[index].activity, '.')

        // sets the description and index, then pulls up the modal
        setDeleteDesc("data point");
        setDeleteExtraDesc(descriptionFormat);
        setDeleteIndex(index)
        setDeleteModal(true);
    }
    
    // deletes the point from the arrays
    const deletePoint = async () =>{
        // removes the data point from both arrays
        data.splice(deleteIndex, 1)
        markers.splice(deleteIndex, 1)
        
        //reset delete controls
        setDeleteIndex(-1);
        setDeleteDesc('');
        setDeleteExtraDesc('');
        setDeleteModal(false);
    }

    // End Button press
    const endActivity = async () => {
        setStart(false)
        clearInterval(id);

        // Saves the SM data
        try {
            const response = await fetch('https://p2bp.herokuapp.com/api/stationary_maps/' + props.timeSlot._id + '/data', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + props.token
                },
                body: JSON.stringify({
                    entries: data
                })
            })

            let info = await response.json()

        } catch (error) {
            console.log("ERROR: ", error)
        }

        props.navigation.navigate("ActivitySignUpPage");
    }

    // Called when there is more than one standing point
    // This function ensures everything resets
    const restart = () => {
        let standingPointLength = Object.keys(props.timeSlot.position).length
        // clear the interval whenever we restart/end
        clearInterval(id);
        setDataModal(false);
        // don't allow the play/pause button to show when the timer has hit 0
        setDisabled(true);

        if (standingIndex < standingPointLength-1){            
            setStandingIndex(standingIndex+1)
            setTimer(initalTime)
            setRecenter(true)
            setStart(false)
            setMoving(true)
        }
        else if (standingIndex == standingPointLength-1){
            endActivity()
            props.navigation.navigate("ActivitySignUpPage");
        }
    }

    // Starts back up the activity
    const rebegin = () =>{
        console.log('rebegin called')
        setStart(true)
        setMoving(false)
        setRecenter(false)
    }

    // Start and Exit button
    const StartStopButton = () => {

        if (initalStart) {
            return(
                <Button style={styles.startButton} onPress={() => setStart(true)} >
                    <View>
                        <Text style={styles.startStopText}>Start</Text>
                    </View>
                </Button>
            )
        }
        else{
            return(
                <Button
                    status={'danger'}
                    style={styles.stopButton}
                    onPress={() => endActivity()}
                    >
                        <View>
                            <Text style={styles.startStopText}>End</Text>
                        </View>
                    </Button>
            )
        }
    }

    // helps control the countdown timer
    useEffect(() =>{
        // only start the timer when we start the test
        if(start){
            setPopupMsg(false);
            startTime(timer);
            setInitalStart(false);
            setDisabled(false);
        }
        // timer gets pasued
        else if(start === false){
            clearInterval(id);
        }
    }, [start]);

    // begins/updates the timer
    function startTime(current){
        let count = current;
        setId(setInterval(() =>{            
            count--;
            // timer is what actually gets rendered so update every second
            setTimer(count);
            // console.log(count);
            // when the timer reaches 0, call restart
            if(count === 0){
                // clear the interval to avoid resuming timer issues
                clearInterval(id);
                restart();
            }
        // 1000 ms == 1 s
        }, 1000));
    }

    const PlayPauseButton = () =>{
        const Play = () => <Icon name='play-circle' fill={'#FFFFFF'} style={styles.playPauseIcon} />
        const Pause = () => <Icon name='pause-circle' fill={'#FFFFFF'} style={styles.playPauseIcon} />
      
        // timer is active
        if(start){
          return(
            <TouchableOpacity style={styles.playPauseButton} onPress={() => setStart(false)}>
              <Pause />
            </TouchableOpacity>
          )
        }
        // timer is paused
        else{
          return(
            <TouchableOpacity style={styles.playPauseButton} onPress={() => setStart(true)}>
              <Play />
            </TouchableOpacity>
          )
        }
    }

    // Count Down Timer and the Start/Exit button
    const TimeBar = () => {

        return(
            <View>
                <View style={styles.container}>

                    <StartStopButton/>

                    <View style={styles.timerRow}>
                            
                        {disabled ?
                            null
                        :
                            <PlayPauseButton />
                        }

                        <CountDown
                            running={start}
                            until={timer}
                            size={20}
                            digitStyle={{backgroundColor:theme['background-basic-color-1']}}
                            digitTxtStyle={{color:theme['text-basic-color']}}
                            separatorStyle={{color:theme['text-basic-color']}}
                            timeToShow={['M', 'S']}
                            timeLabels={{m: '', s: ''}}
                            showSeparator
                        />
                    </View>
                </View>
            </View>
        )
    }

    // Main render
    return(
        <ViewableArea>
            <Header text={'People in Place'}/>
            <ContentContainer>

                    <TimeBar/>

                    <PopupMessage
                        visible={popupMsg}
                    />

                    <DataEntryModal
                        visible={dataModal}
                        anchor={TimeBar}
                        closeData={closeData}
                    />

                    <MovingModal
                        moving={moving}
                        confirm={rebegin}
                    />

                    <DeleteModal
                        visible={deleteModal}
                        setVisible={setDeleteModal}
                        dataType={deleteDesc}
                        extraInfo={deleteExtraDesc}
                        deleteFunction={deletePoint}
                    />

                    <StationaryActivityMap
                        location={location}
                        area={area}
                        position={position[standingIndex]}
                        markers={markers}
                        addMarker={onPointCreate}
                        deleteMarker={handleDelete}
                        recenter={recenter}
                    />

            </ContentContainer>
            {start ?
                <View style={styles.descriptionViewNoMargin}>
                    <Text category={'s1'}>Tap on the map to plot data points</Text>
                </View>
            :
                <View style={styles.descriptionViewNoMargin}>
                    {disabled ?
                        null
                    :
                        <Text category={'s1'}>Press the play button to resume the test</Text>
                    }
                </View>
            }
        </ViewableArea>
    );
}