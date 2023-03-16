import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ViewableArea, ContentContainer } from '../../../components/content.component';
import { Header } from '../../../components/headers.component';
import { useTheme, Button, Icon, Text } from '@ui-kitten/components';
import { MovingModal } from '../../../components/Activities/Stationary/movingModal.component.js';
import { SoundMap } from '../../../components/Maps/soundMap.component';
import CountDown from 'react-native-countdown-fixed';

import { PopupMessage } from '../../../components/Activities/popupMessage.component';
import { DecibelEntryModal } from '../../../components/Activities/Sound/decibelEntryModal.component';
import { MainSoundModal } from '../../../components/Activities/Sound/mainSoundModal.component';
import { SoundsModal } from '../../../components/Activities/Sound/soundsModal.component';
import { HEROKU_SERVER } from '@env';

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
    const [disabled, setDisabled] = useState(true);

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
    const [id, setId] = useState();
    

    // control modals
    const [popupMsg, setPopupMsg] = useState(true);
    const [decibelModal, setDecibelModal] = useState(false);
    const [mainSoundModal, setMainSoundModal] = useState(false);
    const [soundsModal, setSoundsModal] = useState(false);

    // for a single measurement's iterations
    const [curr, setCurr] = useState([]);
    
    // for a standing point's iteration measurements (each standing point has 5 iterations of measurement)
    // row === standing point, column == iteration of measurement
    const [decArr] = useState([[]]);
    // each cell is a standing point's decibel average
    const [decAvg] = useState([]);
    
    // used to store the main sound type
    const[mainSoundArr] = useState([[]]);
    // used to store the sound types (multi-select)
    const[soundsArr] = useState([[]]);

    // ends activity, packages and sends data to the DB
    const endActivity = async () => {
        setStart(false);
        clearInterval(id);
        //console.log('ending activity');
        
        // calculates average for each standing point and stores it in its array
        let standingLen = totalIter / 5;
        for(let i = 0; i < standingLen; i++){
            let avg = computeAverage(decArr[i]);
            decAvg.push(avg);
        }
        
        // each row is a standing point, which contains 5 iterations of measurements (for that point)
        // console.log(decArr);
        
        // each cell is a standingIndex's average measurement (the 5 iterations of measurements average)
        // console.log(decAvg);
        
        // the main sounds array 
        // each row is a standing point, and each cell inside the row is for each iteration of measurement
        // console.log(mainSoundArr);
        
        // the sound types (multi-select) array
        // each row is a standing point and each cell is every sound types the user submitted (duplicates ignored)
        // console.log(soundsArr);

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

        try {
            const response = await fetch(HEROKU_SERVER+'/sound_maps/' + props.timeSlot._id + '/data', {
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
    
    // computes the average of a passed in array
    const computeAverage = (arr) =>{
        let mean = 0;
        let len = arr.length;
        arr.forEach(element => (mean = mean + element));
        mean = mean / len;
        // force it to round to 2 decimal places, then convert it back to a float
        let tempString = mean.toFixed(2);
        return parseFloat(tempString);
    }
    
    // closes the modal and stores the measurement
    const closeDecibelData = async (inf) => {
        // close the modal
        setDecibelModal(false);    
        // pull up next modal only if we are at the end of the measurement
        if(timer === 0){
            // push last measurement on to curr and compute its average, then store in the appropriate row of decArr
            curr.push(parseFloat(inf.decibel));
            let avg = computeAverage(curr);
            // standingIndex <= # standing points always, so if something exists at that index of decArr, push the measurement onto it
            if(decArr[standingIndex]) decArr[standingIndex].push(avg);
            // if nothing existed at that index, push a new array (with the average) into the 2D array (its the 1st iteration of measurement at that standing point)
            else decArr.push([avg]);
            
            // reset curr for subsequent entries
            setCurr([]);
            // pull up sounds modal (multi-select)
            setSoundsModal(true);
        }
        // else resume the measurement
        else{
            // store current measurement in curr
            curr.push(parseFloat(inf.decibel));
            resume();
        }
    }
    
    // closes the main sound type modal and stores the data
    const closeMainData = async (inf) =>{        
        // force the main_sound_type to be lower case (mainly for the 'other' field)
        // standingIndex <= # standing points always, so if something exists at that index, push the data onto it
        if(mainSoundArr[standingIndex]) mainSoundArr[standingIndex].push(inf.main_sound_type);
        // if nothing existed at that index, push a new array (with the data) into the 2D array (its the 1st iteration of data at that standing point)
        else mainSoundArr.push([inf.main_sound_type]);
        
        setMainSoundModal(false);
        // calls resume which then restarts/ends the test
        resume();
    }
    
    // closes the sound types modal and stores the data
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
        setMainSoundModal(true);
    }
    
    // compares the soundsArr and passed in array for duplicate entries, only returns elements (as an array) from arr that are not in soundsArr
    const checkDup = (ind, arr) =>{        
        // returns an array that has strings that are not already in soundsArr (to be added to soundsArr) 
        return arr.filter(element => !soundsArr[ind].includes(element));
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
                    <View>
                        <Text style={styles.startButtonText}>Start</Text>
                    </View>
                </Button>
            )
        }
        // else, show the progress tracker
        else{
            return(
                <Text style={styles.trackerText}> 
                    {tracker}/{totalIter} 
                </Text>
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
        // timer gets paused
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
            if(!start)
                clearInterval(id)
            if(count === 0){
                // clear the interval to avoid resuming timer issues
                clearInterval(id);
                setStart(false);
                endActivity();
            }
        // ios 1000 ms == 1 s
        // android 2000ms == 2 s ?? wtf mate
        }, Platform.OS === 'ios' ? 1000 : 2000 ));
    }
    
    // pulls up the 1st modal (decibel level modal)
    function handleModal(){
        // disable the play/pause timer button to avoid allowing users to try to press it between modal transitions (to the next modal)
        // whenever the timer resumes/rebegins, disabled becomes false (in the useEffect)
        setDisabled(true);
        setStart(false);
        setDecibelModal(true);
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

    // CountDown Timer and the StartTracker component
    const TimeBar = () => {
        return(
            <View>
                <View style={styles.container}>
                    <StartTracker/>
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

    return(
        <ViewableArea>
            <Header text={'Acoustical Profile'}/>
            <ContentContainer>
                    
                    <TimeBar/>

                    <PopupMessage
                        visible={popupMsg}
                    />
                    
                    <DecibelEntryModal
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

            </ContentContainer>
            {start ?
                null
            :
                <View style={styles.descriptionView}>
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