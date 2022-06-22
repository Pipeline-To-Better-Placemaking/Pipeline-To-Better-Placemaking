import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { ViewableArea, ContentContainer } from '../../../components/content.component';
import { Header } from '../../../components/headers.component';
import { useTheme, Button } from '@ui-kitten/components';
//import { StationaryActivityMap } from '../../../components/Maps/stationaryActivityMap.component.js';
//import { DataEntryModal } from '../../../components/Activities/Stationary/dataEntryModal.component.js';
import CountDown from 'react-native-countdown-component';

import { styles } from './natureTest.styles';

export function NatureTest(props) {

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

    // timer stuff
    const initalTime = props.timeSlot.timeLeft
    // controls the rendered countdown timer
    const [timer, setTimer] = useState(initalTime);
    // controls timer interval instance
    const [id, setId] = useState();

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

    // End Button press
    const endActivity = async () => {
        setStart(false)
        clearInterval(id);

        // // Saves the SM data
        // try {
        //     const response = await fetch('https://measuringplacesd.herokuapp.com/api/stationary_maps/' + props.timeSlot._id + '/data', {
        //         method: 'POST',
        //         headers: {
        //             Accept: 'application/json',
        //                 'Content-Type': 'application/json',
        //                 'Authorization': 'Bearer ' + props.token
        //         },
        //         body: JSON.stringify({
        //             entries: data
        //         })
        //     })

        //     let info = await response.json()

        // } catch (error) {
        //     console.log("ERROR: ", error)
        // }

        props.navigation.navigate("ActivitySignUpPage");
    }

    // Start and Exit button
    const StartStopButton = () => {

        if (initalStart) {
            return(
                <Button style={styles.startButton} onPress={() => setStart(true)} >
                    Start
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
                        End
                    </Button>
            )
        }
    }

    // helps control the countdown timer
    useEffect(() =>{
        // only start the timer when we start the test
        if(start){
            startTime(timer);
            setInitalStart(false);
        }
    }, [start]);

    // begins/updates the timer
    function startTime(current){
        let count = current;
        setId(setInterval(() =>{            
            count--;
            // timer is what actually gets rendered so update every second
            setTimer(count);
            //console.log(count);
            // when the timer reaches 0, call restart
            if(count === 0){
                // clear the interval to avoid resuming timer issues
                clearInterval(id);
                endActivity();
            }
        // 1000 ms == 1 s
        }, 1000));
    }

    // Count Down Timer and the Start/Exit button
    const TimeBar = () => {

        return(
            <View>
                <View style={styles.container}>

                    <StartStopButton/>

                    <View>
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
            <Header text={'Nature Prevalence'}/>
            <ContentContainer>

                    <TimeBar/>

                    {/* <DataEntryModal
                        visible={dataModal}
                        anchor={TimeBar}
                        closeData={closeData}
                    /> */}

                    {/* <StationaryActivityMap
                        location={location}
                        area={area}
                        position={position[standingIndex]}
                        markers={markers}
                        addMarker={onPointCreate}
                        recenter={recenter}
                    /> */}

            </ContentContainer>
        </ViewableArea>
    );
}