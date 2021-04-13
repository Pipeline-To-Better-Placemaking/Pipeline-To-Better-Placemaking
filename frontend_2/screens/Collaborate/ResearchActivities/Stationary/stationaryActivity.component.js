import React, { useState } from 'react';
import { View } from 'react-native';
import { ViewableArea, ContentContainer } from '../../../components/content.component';
import { Header } from '../../../components/headers.component';
import { useTheme, Button } from '@ui-kitten/components';
import { StationaryActivityMap } from '../../../components/Maps/stationaryActivityMap.component.js';
import { MovingModal } from '../../../components/Activities/Stationary/movingModal.component.js';
import { DataEntryModal } from '../../../components/Activities/Stationary/dataEntryModal.component.js';
import CountDown from 'react-native-countdown-component';

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

    // Shows the moving and data input modal
    const [moving, setMoving] = useState(false)
    const [dataModal, setDataModal] = useState(false)

    // The index of the standing points
    const [standingIndex, setStandingIndex] = useState(0)

    // Temp marker, inputted data points, and all of their locations
    const [tempMarker, setTempMarker] = useState([])
    const [data, setData] = useState([])
    const [markers, setMarkers] = useState([])

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

            obj = {
                marker: tempMarker,
                colorIndex: inf.postureIndex
            }

            setData(() => data.concat(pointData))
            setMarkers(() => markers.concat(obj))

            setDataModal(false)
        }
    }

    // End Button press
    const endActivity = async () => {

        setStart(false)

        // Saves the SM data
        try {
            const response = await fetch('https://measuringplacesd.herokuapp.com/api/stationary_maps/' + props.timeSlot._id + '/data', {
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

    // Called when there is ore than one standing point
    // This function ensures everything resets
    const restart = () => {
        let standingPointLength = Object.keys(props.timeSlot.position).length

        if (dataModal) {
            setDataModal(false)
        }

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
    const rebegin = () =>{

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

    // Updates the time in TimeBar
    const updateTime = (value) => {

        let temp = props.timeSlot;
        temp.timeLeft = value-1;
        props.setTimeSlot(temp);

        // If we hit 0, restart the timer
        if (value-1 == 0){

            let orgTime = props.initialTimeSlot.timeLeft

            temp.timeLeft = orgTime

            props.setTimeSlot(temp);

            restart()
        }
    }

    // Count Down Timer and the Start/Exit button
    const TimeBar = () => {

        return(
            <View>
                <View style={{margin:5, flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}}>

                    <StartStopButton/>

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

    // Main render
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
