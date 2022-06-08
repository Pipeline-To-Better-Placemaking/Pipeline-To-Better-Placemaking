import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { ViewableArea, ContentContainer } from '../../../components/content.component';
import { Header } from '../../../components/headers.component';
import { useTheme, Button } from '@ui-kitten/components';
import { MovingModal } from '../../../components/Activities/Stationary/movingModal.component.js';
// import { SoundMap } from '../../../components/Maps/soundMap.component'; not using sound map!!
import CountDown from 'react-native-countdown-component';

import { styles } from './boundaryTest.styles';

export function SoundTest(props){
    const theme = useTheme();

    /// Location, area, and standing points for SM
    /// Bool indicating to the map to recenter
    const [location] = useState(props.timeSlot.location);
    const [area] = useState(props.timeSlot.area);
    const [position] = useState(props.timeSlot.position);
    const [recenter, setRecenter] = useState(false);

    // Begins the test
    const [start, setStart] = useState(false);
    const [initalStart, setInitalStart] = useState(true);

    // Controls the modal telling you to go to the next standing point
    const [moving, setMoving] = useState(false);

    // The index of the standing points
    const [standingIndex, setStandingIndex] = useState(0);

    // total # of iterations are every standing point 5 times; get rid of this (from sound test)
    const totalIter = Object.keys(props.timeSlot.position).length * 5;
    const [tracker, setTracker] = useState(1);

    // timer stuff
    const initalTime = props.timeSlot.timeLeft
    // controls the rendered countdown timer
    const [timer, setTimer] = useState(initalTime);
    // controls timer interval instance
    let id;

    // ends activity, packages and sends data to the DB
    const endActivity = async () => {
        setStart(false);
        console.log('ending activity');
        
        // let objData = [];
        // for(let i = 0; i < standingLen; i++){
        //     let dec_1 = {
        //         recording: decArr[i][0],
        //         predominant_type: mainSoundArr[i][0]
        //     }
        //     let dec_2 = {
        //         recording: decArr[i][1],
        //         predominant_type: mainSoundArr[i][1]
        //     }
        //     let dec_3 = {
        //         recording: decArr[i][2],
        //         predominant_type: mainSoundArr[i][2]
        //     }
        //     let dec_4 = {
        //         recording: decArr[i][3],
        //         predominant_type: mainSoundArr[i][3]
        //     }
        //     let dec_5 = {
        //         recording: decArr[i][4],
        //         predominant_type: mainSoundArr[i][4]
        //     }

        //     let pointData = {
        //         decibel_1: dec_1,
        //         decibel_2: dec_2,
        //         decibel_3: dec_3,
        //         decibel_4: dec_4,
        //         decibel_5: dec_5,
        //         average: decAvg[i],
        //         sound_type: soundsArr[i],
        //         standingPoint: position[i]._id,
        //         time: new Date()
        //     }
        //     objData.push(pointData);
        // }

        try {
            const response = await fetch('https://measuringplacesd.herokuapp.com/api/boundary_maps/' + props.timeSlot._id + '/data', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + props.token
                },
                body: JSON.stringify({
                    entries: objData
                })
            })

            let info = await response.json()
            
            // console.log(info);

        } catch (error) {
            console.log("ERROR: ", error)
        }
        props.navigation.navigate("ActivitySignUpPage");
    }
    
    // closes the modal and stores the measurement; copy from sound test, ex of how to store data locally
    const closeDecibelData = async (inf) => {
        // close the modal
        setDecibelModal(false);    
        // // pull up next modal only if we are at the end of the measurement
        // if(timer === 0){
        //     // push last measurement on to curr and compute its average, then store in the appropriate row of decArr
        //     curr.push(parseFloat(inf.decibel));
        //     let avg = computeAverage(curr);
        //     // standingIndex <= # standing points always, so if something exists at that index of decArr, push the measurement onto it
        //     if(decArr[standingIndex]) decArr[standingIndex].push(avg);
        //     // if nothing existed at that index, push a new array (with the average) into the 2D array (its the 1st iteration of measurement at that standing point)
        //     else decArr.push([avg]);
            
        //     // reset curr for subsequent entries
        //     setCurr([]);
        //     // pull up sounds modal (multi-select)
        //     setSoundsModal(true);
        // }
        // // else resume the measurement
        // else{
        //     // store current measurement in curr
        //     curr.push(parseFloat(inf.decibel));
        //     resume();
        // }
    }

    // resume or restarts the test based on timer's value
    const resume = () =>{
        // console.log('resume called');
        if(timer !== 0) setStart(true);
        // when timer hits 0, we are at the last modal so call restart (after the last modal)
        else restart();
    }

    // Called when there is more than one standing point
    // This function ensures everything resets; look at people moving restart to see what to do here
    const restart = () => {
        // clear the interval whenever we restart/end
        clearInterval(id);
        
        // have not yet reached the last iteration
        if (tracker < totalIter){
            // cycle through the standing points
            // let nextIndex = (standingIndex + 1) % (totalIter / 5)
            
            // // set the new standing point
            // setStandingIndex(nextIndex)
            // // update the tracker
            // setTracker(tracker + 1)
            // reset the timer
            setTimer(initalTime);
            // recenter the map region
            setRecenter(true)
            // ensure the test is paused
            setStart(false)
            // pull up the moving (to next spot) modal
            setMoving(true)
        }
        // we reached the end of the test so endActivity (and navigate to the activity signup page)
        else if (tracker === totalIter){
            endActivity();
            props.navigation.navigate("ActivitySignUpPage");
        }
    }

    // Starts back up the activity
    const rebegin = () =>{
        setStart(true)
        setMoving(false)
        setRecenter(false)
    }

     // Start button and progress tracker component
     const StartTracker = () => {
        // only show the start button before the test is started (to start the test)
        if (initalStart) {
            return(
                <Button style={styles.startButton} onPress={() =>{setStart(true);}} >
                    Start
                </Button>
            )
        }
        // else, show the end button
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
            // console.log('useEffect start');
            startTime(timer);
            setInitalStart(false);
        }
    }, [start]);

    // begins/updates the timer
    function startTime(current){
        let count = current;
        id = setInterval(() =>{            
            count--;
            // timer is what actually gets rendered so update every second
            setTimer(count);
            //console.log(count);
            // every 5 seconds or when the timer hits 0, pause the timer and render the modal(s) for data collection
            if(count % 5 == 0){
                // clear the interval to avoid resuming timer issues
                clearInterval(id);
                handleModal();
            }
        // 1000 ms == 1 s
        }, 1000);
    }
    
    // pulls up the 1st modal
    function handleModal(){
        setStart(false);
        // setDecibelModal(true);
    }

     // CountDown Timer and the StartTracker component
     const TimeBar = () => {
        return(
            <View>
                <View style={styles.container}>

                    <StartTracker/>

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

    return(
        <ViewableArea>
            <Header text={'Spatial Boundaries'}/>
            <ContentContainer>
                    
                    <TimeBar/>
                    
                    {/* <DecibelEntryModal
                        visible={decibelModal}
                        closeData={closeDecibelData}
                    />

                    <SoundsModal
                        visible={soundsModal}
                        closeData={closeSoundsData}
                    />

                    <MainSoundModal
                        visible={mainSoundModal}
                        closeData={closeMainData}
                    /> */}

                    <MovingModal
                        moving={moving}
                        confirm={rebegin}
                    />
                    
                    {/* prob going to use PressMapAreaWrapper */}
                    {/* <SoundMap
                        location={location}
                        area={area}
                        position={position[standingIndex]}
                        recenter={recenter}
                    /> */}

            </ContentContainer>
        </ViewableArea>
    );
}