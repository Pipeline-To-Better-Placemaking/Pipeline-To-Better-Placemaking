import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ViewableArea, ContentContainer } from '../../../components/content.component';
import { Header } from '../../../components/headers.component';
import { useTheme, Button, Text, Icon } from '@ui-kitten/components';
import { OrderMap } from '../../../components/Maps/orderMap.component.js';
import { DataModal } from '../../../components/Activities/Order/dataModal.component';
import { DeleteModal } from '../../../components/Activities/deleteModal.component';
import { DescModal } from '../../../components/Activities/Order/descModal.component';
import { PopupMessage } from '../../../components/Activities/popupMessage.component';
import CountDown from 'react-native-countdown-component';

import { styles } from './orderTest.styles';

export function OrderTest(props) {

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
    const [descModal, setDescModal] = useState(false);
    const [tempMarker, setTempMarker] = useState();
    const [popupMsg, setPopupMsg] = useState(true);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(-1);
    const [deleteDesc, setDeleteDesc] = useState('');
    const [deleteExtraDesc, setDeleteExtraDesc] = useState();
    const [prompt, setPrompt] = useState([]);

    const behaviorPrompts = ['Panhandling', 'Boisterous Voice', 'Dangerous Wildlife', 'Reckless Behavior', 'Unsafe Equipment', 'Living in Public'];
    const maintenancePrompts = ['Broken Environment', 'Dirty/Unmaintained', 'Unwanted Graffiti', 'Littering', 'Overfilled Trashcan', 'Unkept Landscape'];

    // Used to store all the data info
    const [data] = useState([]);
    const [tempKind, setTempKind] = useState();

    // End Button press or whenever the timer hits 0
    const endActivity = async () => {
        setStart(false)
        clearInterval(id);

        // close any of the modals that may be open when the test ends (timer hits 0 while in a modal)
        if(dataModal) setDataModal(false);
        if(descModal) setDescModal(false);
        
        // package the data; needs to be an array for multiple entries for a test
        let packageData =[{
            points: data,
            time: new Date()
        }]

        // Sends the collected data to DB
        try {
            const response = await fetch('https://p2bp.herokuapp.com/api/order_maps/' + props.timeSlot._id + '/data', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + props.token
                },
                body: JSON.stringify({
                    entries: packageData
                })
            })

            let info = await response.json()
        
            console.log(info)
        
        } catch (error) {
            console.log("ERROR: ", error)
        }

        props.navigation.navigate("ActivitySignUpPage");
    }
    
    // Opens the data model and stores a temporary point
    const onPointCreate = async (marker) => {
        if(start){
            setDataModal(true)
            setTempMarker(marker)
        }
    }

    // Closes the modal, saves the data locally, and pulls up the next modal
    const closeData = async (inf) => {
        // save the kind locally
        setTempKind(inf.kind);
        
        // sets the description choices based on the kind
        if(inf.kind === 'Behavior') setPrompt(behaviorPrompts);
        else setPrompt(maintenancePrompts);
        
        // close the modal and pull up the description modal
        setDataModal(false);
        setDescModal(true);
    }
    
    // Closes the modal and saves the data
    const closeDesc = async (inf) =>{        
        let info = {
            kind: tempKind,
            location: tempMarker,
            description: inf.description
        }
        data.push(info);
        // reset tempMarker, tempKind, and close the modal
        setTempMarker();
        setTempKind();
        setDescModal(false);
    }

    // pulls up the delete modal
    const handleDelete = (index) =>{
        let descriptionFormat = []; 

        // formats the description array for a cleaner display
        data[index].description.forEach(element =>{
            // if we are not at the last element, concat with comma and a whitespace
            if(element.localeCompare(data[index].description[data[index].description.length - 1]) !== 0) descriptionFormat.push(element.concat(", "));
            // when we are at the last element, concat with nothing
            else descriptionFormat.push(element.concat(''));
        })

        // sets the description and index, then pulls up the modal
        setDeleteDesc(data[index].kind.toLowerCase() + " data point");
        setDeleteExtraDesc(descriptionFormat);
        setDeleteIndex(index);
        setDeleteModal(true);
    }
    
    // deletes the point from the data array
    const deletePoint = async () =>{
        // removes the data point from the array
        data.splice(deleteIndex, 1)
        
        //reset delete controls
        setDeleteIndex(-1);
        setDeleteDesc('');
        setDeleteExtraDesc('');
        setDeleteModal(false);
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
        }
        // test gets pasued
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
                endActivity();
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
                        
                        {initalStart ?
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

    // closes the modals without submitting anything
    const goBack = () =>{
        // if the description modal was open, close it and pull up the data modal
        if(descModal){
            setDescModal(false);
            setDataModal(true);
        }
        // otherwise, reset the tempMarker and close the data modal
        else if (dataModal){
            setTempMarker();
            setDataModal(false);
        }
    }

    // Main render
    return(
        <ViewableArea>
            <Header text={'Absence of Order'}/>
            <ContentContainer>

                <TimeBar/>

                <PopupMessage
                    visible={popupMsg}
                />

                <DataModal
                    visible={dataModal}
                    closeData={closeData}
                    back={goBack}
                />

                <DescModal
                    visible={descModal}
                    prompt={prompt}
                    closeData={closeDesc}
                    back={goBack}
                />

                <DeleteModal
                    visible={deleteModal}
                    setVisible={setDeleteModal}
                    dataType={deleteDesc}
                    extraInfo={deleteExtraDesc}
                    deleteFunction={deletePoint}
                />

                <OrderMap
                    area={area}
                    marker={tempMarker}
                    dataPoints={data}
                    addMarker={onPointCreate}
                    deleteMarker={handleDelete}
                />

            </ContentContainer>
            {start ?
                <View style={styles.descriptionView}>
                    <Text category={'s1'}>Tap on the map to plot misconduct data points</Text>
                </View>
            :
                <View style={styles.descriptionView}>
                    {initalStart ?
                        null
                    :
                        <Text category={'s1'}>Press the play button to resume the test</Text>
                    }
                </View>
            }
        </ViewableArea>
    );
}