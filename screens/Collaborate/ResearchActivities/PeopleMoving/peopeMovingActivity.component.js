import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { LineTools } from '../../../components/Activities/PeopleMoving/lineTools.component.js';
import { PeopleMovingMap } from '../../../components/Maps/peopleMovingMap.component.js';
import { useTheme,  Button,  Icon, Text } from '@ui-kitten/components';
import { ViewableArea, ContentContainer } from '../../../components/content.component';
import { Header } from '../../../components/headers.component';
import { MovingModal } from '../../../components/Activities/Stationary/movingModal.component.js';
import { DataEntryModal } from '../../../components/Activities/PeopleMoving/dataEntryModal.component.js';
import { PopupMessage } from '../../../components/Activities/popupMessage.component.js';
import CountDown from 'react-native-countdown-fixed';
import { HEROKU_SERVER } from '@env';

import { styles } from '../activity.style';

export function PeopleMovingActivity(props) {

    const theme = useTheme();

    /// area, and standing points for SM
    /// Bool indicating to the map to recenter
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

    // Shows the moving and data input modal
    const [moving, setMoving] = useState(false)
    const [dataModal, setDataModal] = useState(false)
    const [lineTools, setLineTools] = useState(false)
    const [viewAllLines, setViewAllLines] = useState(false)
    const [popupMsg, setPopupMsg] = useState(true);

    // The index of the standing points
    const [standingIndex, setStandingIndex] = useState(0)

    // Temp marker, inputted data points, and all of their locations
    const [data] = useState([])

    // Current path being drawn
    const [currentPath, setCurrentPath] = useState([])
    const [currentPathSize, setCurrentPathSize] = useState(0)
    const [totalPaths] = useState([])

    // End Button press
    const endActivity = async () => {
        setStart(false);
        // clear interval if the activity ends early
        clearInterval(id);

        // Saves the PM data
        try {
            // console.log("TimeSlot: " + props.timeSlot._id)
            // console.log("Data: " + JSON.stringify(data))

            const response = await fetch(HEROKU_SERVER+'/moving_maps/' + props.timeSlot._id + '/data', {
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
            console.log("Response: " + JSON.stringify(info))

        } catch (error) {
            console.log("ERROR: ", error)
        }

        props.navigation.navigate("ActivitySignUpPage");
    }

    // Called when there is ore than one standing point
    // This function ensures everything resets
    const restart = () => {
        let standingPointLength = Object.keys(props.timeSlot.position).length

        // clear the interval whenever we restart/end
        clearInterval(id);
        // resets currentPath (if anything was in it when the timer hits 0)
        let emptyPath = []            
        setCurrentPath(emptyPath)
        setCurrentPathSize(0)
        // closes the modal/line toolbar if they were opened
        setDataModal(false);
        setLineTools(false);
        // disable the play/pause button on restarts
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
    const rebegin = () => {
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

    // Opens the data model and stores a temporary points
    const addLinePoint = async (marker) => {

        if (start) {

            if (currentPathSize == 0){
                setLineTools(true)
            }

            setCurrentPath(currentPath.concat(marker))
            setCurrentPathSize(currentPathSize+1)
        }
    }

    const removeLastLinePoint = () => {

        if (currentPathSize > 0) {

            let currPath = [...currentPath]
            currPath.splice(-1, 1)

            setCurrentPath(currPath)
            setCurrentPathSize(currentPathSize-1)
        }
    }

    const confirmLine = () => {
        setLineTools(false)
        setDataModal(true)
    }

    const confirmData = (inf) => {

        if (inf.movementIndex > -1) {

            let dat = {
                path: currentPath,
                mode: inf.movement,
                time: new Date(),
                standingPoint: position[standingIndex]._id,
            }

            let totalLines = {
                path: currentPath,
                colorIndex: inf.movementIndex
            }

            let emptyPath = []
            
            data.push(dat);
            totalPaths.push(totalLines);
            setCurrentPath(emptyPath)
            setCurrentPathSize(0)
            setDataModal(false)
        }

    }

    const cancelLine = () => {
        let emptyPath = []

        setCurrentPath(emptyPath)
        setCurrentPathSize(0)
        setLineTools(false)
    }

    const viewAllDrawnLines = () => {
        setViewAllLines(!viewAllLines)
    }

    const VisibleIcon = (props) => (
      <Icon {...props} fill='#8F9BB3' name={viewAllLines ? 'eye' : 'eye-off'}/>
    )

    // helps control the countdown timer
    useEffect(() =>{
        // only start the timer when we start the test
        if(start){
            console.log('starting timer useEffect')
            setPopupMsg(false);
            startTime(timer);
            setInitalStart(false);
            setDisabled(false);
        }
        else if(start === false){
            console.log('stopping timer useEffect');
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
            console.log(count);
            // when the timer hits 0, call restart
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

                    <Button
                        style={{backgroundColor:theme['background-basic-color-3']}}
                        appearance='ghost'
                        accessoryLeft={VisibleIcon}
                        onPress={viewAllDrawnLines}
                    />

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

    const LineToolBar = () => {
        if (start) {
            if(lineTools){
                return (
                    <LineTools confirm={confirmLine} cancel={cancelLine} removeLastPoint={removeLastLinePoint}/>
                )
            }
            else{                
                return(
                    <View style={styles.descriptionView}>
                        <Text category={'s1'}>Tap on the map to start drawing moving data</Text>
                    </View>
                )
            }
        }
        // disabled must be false for this message to appear
        else if(!disabled){
            return(
                <View style={styles.descriptionView}>
                     <Text category={'s1'}>Press the play button to resume the test</Text>
                </View>
            )
        }
        // initally renders this (before starting the test/transitioning to next standing point)
        else return null
    }

    return(
        <ViewableArea>
            <Header text={'People in Motion'}/>
            <ContentContainer>

                <TimeBar/>

                <PopupMessage
                    visible={popupMsg}
                />

                <DataEntryModal
                    visible={dataModal}
                    anchor={TimeBar}
                    closeData={confirmData}
                />

                <MovingModal
                    moving={moving}
                    confirm={rebegin}
                />

                <PeopleMovingMap
                    area={area}
                    position={position[standingIndex]}
                    markers={currentPath}
                    addMarker={addLinePoint}
                    recenter={recenter}
                    lineTools={lineTools}
                    totalPaths={totalPaths}
                    viewAllLines={viewAllLines}
                />

                <LineToolBar/>

            </ContentContainer>
        </ViewableArea>
    );
}
