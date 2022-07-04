import React, { useState, useEffect } from 'react';
import { View, LogBox } from 'react-native';
import { ViewableArea, ContentContainer } from '../../../components/content.component';
import { Header } from '../../../components/headers.component';
import { useTheme, Button } from '@ui-kitten/components';
// import { LightMap } from '../../../components/Maps/lightMap.component.js';
import CountDown from 'react-native-countdown-component';

import { styles } from './lightTest.styles';

export function LightTest(props) {

    const theme = useTheme();

    const [area] = useState(props.timeSlot.area);

    // Begins the test
    const [start, setStart] = useState(false);
    const [initalStart, setInitalStart] = useState(true);

    // timer stuff
    const initalTime = props.timeSlot.timeLeft;
    // controls the rendered countdown timer
    const [timer, setTimer] = useState(initalTime);
    // controls timer interval instance
    const [id, setId] = useState();

    // Modal controls
    const [dataModal, setDataModal] = useState(false);
    
    const [tempMarker, setTempMarker] = useState();

    // Used to store all the data info
    const [dataPoints] = useState([]);

    // End Button press or whenever the timer hits 0
    const endActivity = async () => {
        setStart(false)
        clearInterval(id);

        // close any of the modals that may be open when the test ends (timer hits 0 while in a modal)
        // if(dataModal) setDataModal(false);
        // if(waterModal) setWaterModal(false);
        // if(errorModal) setErrorModal(false);
        
        // // package the data; needs to be an array for multiple entries for a test
        // let data =[{
        //     weather: weatherData[0],
        //     water: waterData,
        //     points: dataPoints,
        //     time: new Date()
        // }]

        // // Sends the collected data to DB
        // try {
        //     const response = await fetch('https://p2bp.herokuapp.com/api/light_maps/' + props.timeSlot._id + '/data', {
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
        
        //     console.log(info)
        
        // } catch (error) {
        //     console.log("ERROR: ", error)
        // }

        props.navigation.navigate("ActivitySignUpPage");
    }
    
    // Opens the data model and stores a temporary points
    const onPointCreate = async (marker) => {
        if (start) {
            setDataModal(true)
            setTempMarker(marker)
        }
    }

    // Closes the modal and saves the data point
    const closeData = async (inf) => {
        // save the data point to be rendered
        dataPoints.push(inf);
        setDataModal(false);
        setTempMarker();
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

    // ignores the event emitter warnings in app (for dev. only)
    LogBox.ignoreAllLogs();

    // Main render
    return(
        <ViewableArea>
            <Header text={'Lighting Profile'}/>
            <ContentContainer>

                <TimeBar/>

                {/* <DataModal
                    visible={dataModal}
                    closeData={closeData}
                    point={tempMarker}
                    back={goBack}
                /> */}

                {/* <LightMap
                    area={area}
                    marker={tempMarker}
                    dataPoints={dataPoints}
                /> */}

            </ContentContainer>
        </ViewableArea>
    );
}