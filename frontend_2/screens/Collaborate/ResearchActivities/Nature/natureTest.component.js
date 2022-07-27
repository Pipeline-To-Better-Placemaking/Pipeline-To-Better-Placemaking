import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ViewableArea, ContentContainer } from '../../../components/content.component';
import { Header } from '../../../components/headers.component';
import { useTheme, Button, Text, Icon } from '@ui-kitten/components';
import { LineTools } from '../../../components/Activities/PeopleMoving/lineTools.component';
import { NatureMap } from '../../../components/Maps/natureMap.component.js';
import { ErrorModal } from '../../../components/Activities/Boundary/errorModal.component';
import { WeatherModal } from '../../../components/Activities/Nature/weatherModal.component';
import { WaterModal } from '../../../components/Activities/Nature/waterModal.component';
import { VegeModal } from '../../../components/Activities/Nature/vegeModal.component';
import { DataModal } from '../../../components/Activities/Nature/dataModal.component';
import { DeleteModal } from '../../../components/Activities/deleteModal.component';
import { PopupMessage } from '../../../components/Activities/popupMessage.component';
import { calcArea } from '../../../components/helperFunctions';
import CountDown from 'react-native-countdown-component';

import { styles } from './natureTest.styles';

export function NatureTest(props) {

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
    const [errorModal, setErrorModal] = useState(false);
    const errorMsg = "Need at least 3 points to confirm a body of water";
    const [popupMsg, setPopupMsg] = useState(false);
    // set to true so the user can leave the app to check the weather before starting the test (avoiding the timer/responsiveness issue)
    const [weatherModal, setWeatherModal] = useState(true);
    const [waterModal, setWaterModal] = useState(false);
    const [vegeModal, setVegeModal] = useState(false);
    const [dataModal, setDataModal] = useState(false);
    
    // used to determine which type of polygon is being drawn
    // -1 is none, 0 is body of water, 1 is vegetation
    const [polyType, setPolyType] = useState(-1); 
    const [lineTools, setLineTools] = useState(false);
    
    // Current path being drawn and current marker being placed
    const [currentPath, setCurrentPath] = useState([]);
    const [currentPathSize, setCurrentPathSize] = useState(0);
    const [tempMarker, setTempMarker] = useState();
    
    // delete animal data controls
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(-1);
    const [deleteDesc, setDeleteDesc] = useState('');
    const [deleteExtraDesc, setDeleteExtraDesc] = useState('');

    // Used to store all the data info
    const [totalWaterPaths] = useState([]);
    const [totalVegePaths] = useState([]);
    const [dataPoints] = useState([]);
    const [weatherData] = useState([]);
    const [waterData] = useState([]);
    const [vegeData] = useState([]);

    // End Button press or whenever the timer hits 0
    const endActivity = async () => {
        setStart(false)
        clearInterval(id);

        // close any of the modals that may be open when the test ends (timer hits 0 while in a modal)
        if(dataModal) setDataModal(false);
        if(waterModal) setWaterModal(false);
        if(vegeModal) setVegeModal(false);
        if(errorModal) setErrorModal(false);
        
        // package the data; needs to be an array for multiple entries for a test
        let data =[{
            weather: weatherData[0],
            water: waterData,
            vegetation: vegeData,
            animal: dataPoints,
            time: new Date()
        }]

        // Sends the collected data to DB
        try {
            const response = await fetch('https://p2bp.herokuapp.com/api/nature_maps/' + props.timeSlot._id + '/data', {
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
        
            console.log(info)
        
        } catch (error) {
            console.log("ERROR: ", error)
        }

        props.navigation.navigate("ActivitySignUpPage");
    }
    
    // Opens the data model and stores a temporary points
    const onPointCreate = async (marker) =>{
        if (start && !lineTools) {
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

    // pulls up the delete modal
    const handleDelete = (index) =>{
        // sets the description and index, then pulls up the modal
        setDeleteDesc(dataPoints[index].kind.toLowerCase() + " animal data point")
        setDeleteExtraDesc(dataPoints[index].description)
        setDeleteIndex(index)
        setDeleteModal(true);
    }
    
    // deletes the point from the data array
    const deletePoint = async () =>{
        // removes the data point from the array
        dataPoints.splice(deleteIndex, 1)
        
        //reset delete controls
        setDeleteIndex(-1);
        setDeleteDesc('');
        setDeleteExtraDesc('');
        setDeleteModal(false);
    }
    
    // Closes the weather modal and saves the data
    const closeWeather = async (inf) =>{
        weatherData.push(inf);
        setWeatherModal(false);
        setPopupMsg(true);
    }

    const closeWater = async (inf) =>{
        let obj = {
            description: inf.description,
            area: calcArea(currentPath),
            location: currentPath
        }
        waterData.push(obj)
        setWaterModal(false);
        totalWaterPaths.push(currentPath);
        // whenever the data is saved, clear out the current paths stuff for next enteries
        let emptyPath = [];
        setCurrentPath(emptyPath);
        setCurrentPathSize(0);

        // reset test controls
        setLineTools(false);
        setPolyType(-1);
    }

    const closeVege = async (inf) =>{
        let obj = {
            description: inf.description,
            area: calcArea(currentPath),
            location: currentPath
        }
        vegeData.push(obj)
        setVegeModal(false);
        totalVegePaths.push(currentPath);
        // whenever the data is saved, clear out the current paths stuff for next enteries
        let emptyPath = [];
        setCurrentPath(emptyPath);
        setCurrentPathSize(0);

        // reset test controls
        setLineTools(false);
        setPolyType(-1);
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
            // console.log('starting timer useEffect')
            setPopupMsg(false);
            startTime(timer);
            setInitalStart(false);
        }
        // timer is paused
        else if(start === false){
            // console.log('stopping timer useEffect')
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

    // adds a marker to the current path
    const addShape = (marker) =>{
        // only add a marker if the test has started and the line toolbar is pulled up
        if(start && lineTools){
            // cannot use currentPath.push here, causes a read-only error somehow on the 3rd marker
            setCurrentPath(currentPath.concat(marker));
            setCurrentPathSize(currentPathSize+1);
        }
    }

    // checks the boundary and sets the buttons to collect data
    const confirm = () => {
        // polygon size check, needs at lest 3 points
        if(currentPathSize < 3){
            setErrorModal(true);
            return
        }
        // pull up the water data modal if the type is 0
        if(polyType === 0) setWaterModal(true);
        // pull up the vegetation data modal if the type is 1
        else if(polyType === 1) setVegeModal(true);
        else console.log('error, polyType: ' + polyType);
    }
    
    // removes last plotted marker
    const removeLastPoint = () => {
        if (currentPathSize >= 1) {              
            let currPath = [...currentPath]
            currPath.splice(-1, 1)
            
            setCurrentPath(currPath)
            setCurrentPathSize(currentPathSize - 1)
        }
        // if we try deleting with no marker on drawn boundary, put away the line toolbar
        else setLineTools(false);
    }
    
    // cancels the current line being drawn (also closes line toolbar)
    const cancel = () => {
        // reset current path and path size, set line tools to false
        let emptyPath = []
        setCurrentPath(emptyPath)
        setCurrentPathSize(0)
        setLineTools(false)
        
    }

    const LineToolBar = () => {
        if (start && lineTools) {
            return (
                <LineTools confirm={confirm} cancel={cancel} removeLastPoint={removeLastPoint}/>
            )
        }
        else{
            return null;
        }
    }

    const ButtonToolBar = () =>{
        // line toolbar is rendered
        if(lineTools) return null
        
        else{
            // render the button toolbar only if the test has started
            if(start){
                return(
                    <View style={styles.toolBarView}>
                        <View style={styles.descriptionView}>
                            <Text category={'s1'}>Tap on the map to plot animal data points</Text>
                        </View>
                        
                        <View style={styles.buttonView}>
                            <Button style={styles.button} onPress={() => {setLineTools(true); setPolyType(0)}}>
                                <View>
                                    <Text style={styles.buttonTxt}>Body of Water</Text>
                                </View>
                            </Button>
                            <Button style={styles.button} onPress={() => {setLineTools(true); setPolyType(1)}}>
                                <View>
                                    <Text style={styles.buttonTxt}>Vegetation</Text>
                                </View>
                            </Button>
                        </View>
                    </View>
                )
            }
            // test has started, but then gets pasued
            else if(!initalStart){
                return(
                    <View style={styles.pausedDescriptionView}>
                        <Text category={'s1'}>Press the play button to resume the test</Text>
                    </View>
                )
            }
            // initally renders this (test has not yet started)
            else return null
        }
    }

    // closes the error modal
    const dismiss = () =>{
        setErrorModal(false);
    }
    
    // closes the modals without submitting anything
    const goBack = () =>{
        if(waterModal) setWaterModal(false);
        else if (vegeModal) setVegeModal(false);
        else{
            setTempMarker();
            setDataModal(false);
        }
    }

    // Main render
    return(
        <ViewableArea>
            <Header text={'Nature Prevalence'}/>
            <ContentContainer>

                <TimeBar/>

                <ErrorModal
                    errorModal={errorModal}
                    errorMessage={errorMsg}
                    dismiss={dismiss}
                />

                <PopupMessage
                    visible={popupMsg}
                />

                <WeatherModal
                    visible={weatherModal}
                    closeData={closeWeather}
                />

                <WaterModal 
                    visible={waterModal}
                    closeData={closeWater}
                    back={goBack}
                />

                <VegeModal
                    visible={vegeModal}
                    closeData={closeVege}
                    back={goBack}
                />

                <DataModal
                    visible={dataModal}
                    closeData={closeData}
                    point={tempMarker}
                    back={goBack}
                />

                <DeleteModal
                    visible={deleteModal}
                    setVisible={setDeleteModal}
                    dataType={deleteDesc}
                    extraInfo={deleteExtraDesc}
                    deleteFunction={deletePoint}
                />

                <NatureMap
                    area={area}
                    markers={currentPath}
                    marker={tempMarker}
                    dataPoints={dataPoints}
                    water={totalWaterPaths}
                    vege={totalVegePaths}
                    addMarker={onPointCreate}
                    deleteMarker={handleDelete}
                    addShape={addShape}
                    cond={lineTools}
                    polyType={polyType}
                />

                <ButtonToolBar />
                <LineToolBar />

            </ContentContainer>
        </ViewableArea>
    );
}