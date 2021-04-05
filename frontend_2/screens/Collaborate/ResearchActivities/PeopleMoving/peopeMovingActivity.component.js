import React, { useState } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { LineTools } from '../../../components/Activities/PeopleMoving/lineTools.component.js';
import { PeopleMovingMap } from '../../../components/Maps/peopleMovingMap.component.js';
import { useTheme, Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import { ViewableArea, ContentContainer } from '../../../components/content.component';
import { Header } from '../../../components/headers.component';
import { MovingModal } from '../../../components/Activities/Stationary/movingModal.component.js';
import CountDown from 'react-native-countdown-component';
import { DataEntryModal } from '../../../components/Activities/PeopleMoving/dataEntryModal.component.js';

export function PeopleMovingActivity(props) {

    const theme = useTheme();

    /// Location, area, and standing points for SM
    /// Bool indicating to the map to recenter
    const [location] = useState(props.timeSlot.location)
    const [area] = useState(props.timeSlot.area)
    const [position] = useState(props.timeSlot.position)
    const [recenter, setRecenter] = useState(false)

    // Begins the test
    const [start, setStart] = useState(false)

    // Shows the moving and data input modal
    const [moving, setMoving] = useState(false)
    const [dataModal, setDataModal] = useState(false)
    const [lineTools, setLineTools] = useState(false)
    const [viewAllLines, setViewAllLines] = useState(false)

    // The index of the standing points
    const [standingIndex, setStandingIndex] = useState(0)

    // Temp marker, inputted data points, and all of their locations
    const [tempMarker, setTempMarker] = useState([])
    const [data, setData] = useState([])

    // Current path being drawn
    const [currentPath, setCurrentPath] = useState([])
    const [currentPathSize, setCurrentPathSize] = useState(0)
    const [totalPaths, setTotalPaths] = useState([])

    // Updates the time in TimeBar
    const updateTime = (value) => {

        let temp = props.timeSlot;
        temp.timeLeft = value-1;
        props.setTimeSlot(temp);

        // If we hit 0, restart the timer
        if (value-1 == 0){
            let resetSlot = props.timeSlot;
            resetSlot.timeLeft = props.initialTimeSlot.timeLeft;
            props.setTimeSlot(resetSlot);

            restart()
        }
    }

    // End Button press
    const endActivity = async () => {
        setStart(false)

        // Saves the PM data
        try {
            console.log("TimeSlot: " + props.timeSlot._id)
            console.log("Data: " + JSON.stringify(data))

            const response = await fetch('https://measuringplacesd.herokuapp.com/api/moving_maps/' + props.timeSlot._id + '/data', {
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

        if (standingIndex < standingPointLength-1){

            setStandingIndex(standingIndex+1)
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

        if (start) {
            return(
                <Button
                    status={'danger'}
                    style={{height: 50, marginLeft: 5, width: 90}}
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
                    style={{height: 50, marginLeft: 5, width: 90}}
                    onPress={() => setStart(true)}
                >
                    Start
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

            setData(data.concat(dat))
            setTotalPaths(totalPaths.concat(totalLines))
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

    // Count Down Timer and the Start/Exit button
    const TimeBar = () => {

        return(
            <View>
                <View style={{margin:5, flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}}>

                    <StartStopButton/>

                    <Button
                        style={{backgroundColor:theme['background-basic-color-3']}}
                        appearance='ghost'
                        accessoryLeft={VisibleIcon}
                        onPress={viewAllDrawnLines}
                    />

                    <View>
                        <CountDown
                            running={start}
                            until={props.timeSlot.timeLeft}
                            onChange={(value) => updateTime(value)}
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
        if (start && lineTools) {
            return (
                <LineTools confirm={confirmLine} cancel={cancelLine} removeLastPoint={removeLastLinePoint}/>
            )
        }
        else{
            return null;
        }
    }

    return(
        <ViewableArea>
            <Header text={'People Moving Acitivity'}/>
            <ContentContainer>

                <TimeBar/>

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
