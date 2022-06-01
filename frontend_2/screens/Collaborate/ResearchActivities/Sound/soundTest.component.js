import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ViewableArea, ContentContainer } from '../../../components/content.component';
import { Header } from '../../../components/headers.component';
import { useTheme, Button } from '@ui-kitten/components';
import { MovingModal } from '../../../components/Activities/Stationary/movingModal.component.js';
//to be used as the map activity for the screen
import { SoundMap } from '../../../components/Maps/soundMap.component';
import CountDown from 'react-native-countdown-component';

import { DecibelEntryModal } from '../../../components/Activities/Sound/decibelEntryModal.component';
import { MainSoundModal } from '../../../components/Activities/Sound/mainSoundModal.component';
import { SoundsModal } from '../../../components/Activities/Sound/soundsModal.component';

import { styles } from './soundTest.styles';

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

    // total # of iterations are every standing point 5 times
    const totalIter = Object.keys(props.timeSlot.position).length * 5;
    const [tracker, setTracker] = useState(1);

    // timer stuff
    const initalTime = props.timeSlot.timeLeft
    // controls the rendered countdown timer
    const [timer, setTimer] = useState(initalTime);
    // controls timer interval instance
    let id;
    

    // control modals
    const [decibelModal, setDecibelModal] = useState(false);
    const [mainSoundModal, setMainSoundModal] = useState(false);
    const [soundsModal, setSoundsModal] = useState(false);

    // packaged data to be sent
    const [data, setData] = useState([]);

    // for a single measurement's iterations
    const [curr, setCurr] = useState([]);
    
    // for a standing point's iteration measurements (each standing point has 5 iterations of measurement)
    // row === standing point, column == iteration of measurement
    const [decArr, setDecArr] = useState([[]]);
    // each cell is a standing point's decibel average
    const [decAvg, setDecAvg] = useState([]);
    
    // used to store the main sound type
    const[mainSoundArr, setMainSoundArr] = useState([[]]);
    // used to store the sound types (multi-select)
    const[soundsArr, setSoundsArr] = useState([[]]);

                            
    // End Button press 
    const endActivity = async () => {
        setStart(false);
        console.log('ending activity');
        
        // calculates average for each standing point and stores it in its array
        let standingLen = totalIter / 5;
        for(let i = 0; i < standingLen; i++){
            let avg = computeAverage(decArr[i]);
            decAvg.push(avg);
        }
        
        // each row is a standing point, which contains 5 iterations of measurements (for that point)
        console.log(decArr);
        // each cell is a standingIndex's average measurement (the 5 iterations of measurements average)
        console.log(decAvg);
        // the main sounds array 
        // each row is a standing point, and each cell inside the row is for each iteration of measurement
        console.log(mainSoundArr);
        // the sound types (multi-select) array
        // each row is a standing point and each cell is every sound types the user submitted (duplicates ignored)
        console.log(soundsArr);

        let objData = [];
        for(let i = 0; i < standingLen; i++){
            let dec_1 = {
                recording: decArr[i][0],
                predominant_type: mainSoundArr[i][0]
            }
            let dec_2 = {
                recording: decArr[i][1],
                predominant_type: mainSoundArr[i][1]
            }
            let dec_3 = {
                recording: decArr[i][2],
                predominant_type: mainSoundArr[i][2]
            }
            let dec_4 = {
                recording: decArr[i][3],
                predominant_type: mainSoundArr[i][3]
            }
            let dec_5 = {
                recording: decArr[i][4],
                predominant_type: mainSoundArr[i][4]
            }

            let pointData = {
                decibel_1: dec_1,
                decibel_2: dec_2,
                decibel_3: dec_3,
                decibel_4: dec_4,
                decibel_5: dec_5,
                average: decAvg[i],
                sound_type: soundsArr[i],
                standingPoint: position[i]._id,
                time: new Date()
            }
            objData.push(pointData);
        }
        // console.log(objData);
        try {
            const response = await fetch('https://measuringplacesd.herokuapp.com/api/sound_maps/' + props.timeSlot._id + '/data', {
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
            
            console.log(info);

        } catch (error) {
            console.log("ERROR: ", error)
        }
        props.navigation.navigate("ActivitySignUpPage");
    }

    const computeAverage = (arr) =>{
        let ret = 0;
        let len = arr.length;
        arr.forEach(element => (ret = ret + element));
        ret = ret / len;
        return ret;
    }

    // closes the modal and stores the measurement
    const closeDecibelData = async (inf) => {
        // close the modal
        setDecibelModal(false);    
        // pull up next modal only if we are at the end of the measurement
        if(timer === 0){
            // push last measurement on to curr and compute its average, then store in the appropriate row of decArr
            curr.push(parseInt(inf.decibel));
            let avg = computeAverage(curr);
            
            // standingIndex <= # standing points always, so if something exists at that index of decArr, push the measurement onto it
            if(decArr[standingIndex]) decArr[standingIndex].push(avg);
            // if nothing existed at that index, push a new array (with the average) into the 2D array (its the 1st iteration of measurement at that standing point)
            else decArr.push([avg]);
            
            // reset curr for subsequent entries
            setCurr([]);
            // pull up main sound modal
            setMainSoundModal(true);
        }
        // else resume the measurement
        else{
            // store current measurement in curr
            curr.push(parseInt(inf.decibel));
            resume();
        }
    }
    
    // closes the main sound type modal and stores the data
    const closeMainData = async (inf) =>{        
        // force the main_sound_type to be lower case (mainly for the 'other' field)
        // standingIndex <= # standing points always, so if something exists at that index, push the data onto it
        if(mainSoundArr[standingIndex]) mainSoundArr[standingIndex].push(inf.main_sound_type.toLowerCase());
        // if nothing existed at that index, push a new array (with the data) into the 2D array (its the 1st iteration of data at that standing point)
        else mainSoundArr.push([inf.main_sound_type.toLowerCase()]);
        
        setMainSoundModal(false);
        setSoundsModal(true);
    }

    const closeSoundsData = async (inf) =>{
        // standingIndex <= # standing points always, so if something exists at that index, push the data onto it
        // don't allow duplicates for the same standingIndex
        if(soundsArr[standingIndex]){
            // returns an array with elements that are not in soundsArr[standingIndex], then adds them onto that array
            let retArr = checkDup(standingIndex, inf.sound_type);
            retArr.forEach(element => soundsArr[standingIndex].push(element));
        }
        // if nothing existed at that index, push a new array (with the data) into the 2D array (its the 1st iteration of data at that standing point)
        else soundsArr.push(inf.sound_type);
        setSoundsModal(false);
        // calls resume which then restarts/ends the test
        resume();
    }
    
    const checkDup = (ind, arr) =>{
        // convert both arrays to lowercase to make checks case insensitive (to help deal with other field)
        let lowerSoundsArr = soundsArr[ind].map( element => element.toLowerCase())
        let lowerArr = arr.map( element => element.toLowerCase())
        
        // check to see if the stuff that is to be added to soundsArr already exists there 
        // if so don't return it
        let res = lowerArr.filter(element => !lowerSoundsArr.includes(element));
        return res;
    }

    // resume or restarts the test based on timer's value
    const resume = () =>{
        // console.log('resume called');
        if(timer !== 0) setStart(true);
        // when timer hits 0, we are at the last modal so call restart (after the last modal)
        else restart();
    }

    // Called when there is more than one standing point
    // This function ensures everything resets
    const restart = () => {
        // clear the interval whenever we restart/end
        clearInterval(id);
        
        // have not yet reached the last iteration
        if (tracker < totalIter){
            // cycle through the standing points
            let nextIndex = (standingIndex + 1) % (totalIter / 5)
            
            // set the new standing point
            setStandingIndex(nextIndex)
            // update the tracker
            setTracker(tracker + 1)
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
        // else, show the progress tracker
        else{
            return(
                <Text style={styles.trackerText} > 
                    {tracker}/{totalIter} 
                </Text>
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
            // every 5 seconds, pause the timer and render the modal(s) for data collection
            if(count % 5 == 0){
                // clear the interval to avoid resuming timer issues
                clearInterval(id);
                handleModal();
            }
        // 1000 ms == 1 s
        }, 1000);
    }
    
    // pulls up the 1st modal (decibel level modal)
    function handleModal(){
        setStart(false);
        setDecibelModal(true);
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
            <Header text={'Sound Test'}/>
            <ContentContainer>
                    
                    <TimeBar/>
                    
                    <DecibelEntryModal
                        visible={decibelModal}
                        closeData={closeDecibelData}
                    />

                    <MainSoundModal
                        visible={mainSoundModal}
                        closeData={closeMainData}
                    />

                    <SoundsModal
                        visible={soundsModal}
                        closeData={closeSoundsData}
                    />

                    <MovingModal
                        moving={moving}
                        confirm={rebegin}
                    />
                    
                    <SoundMap
                        location={location}
                        area={area}
                        position={position[standingIndex]}
                        recenter={recenter}
                    />
                    
                    {/* ending test early for debugging
                    <View style={styles.bottomView} >
                        <Button
                        status={'danger'}
                        style={styles.bottomStop}
                        onPress={() => endActivity()}
                        >
                            End
                        </Button>
                    </View> */}

            </ContentContainer>
        </ViewableArea>
    );
}