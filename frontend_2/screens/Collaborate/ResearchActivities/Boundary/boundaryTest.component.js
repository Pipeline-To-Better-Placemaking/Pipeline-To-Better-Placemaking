import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { ViewableArea, ContentContainer } from '../../../components/content.component';
import { Header } from '../../../components/headers.component';
import { useTheme, Button } from '@ui-kitten/components';
import { LineTools } from '../../../components/Activities/PeopleMoving/lineTools.component.js';
import { BoundaryMap } from '../../../components/Maps/boundaryMap.component';
import CountDown from 'react-native-countdown-component';
import DropDownPicker from 'react-native-dropdown-picker';

import { ErrorModal } from '../../../components/Activities/Boundary/errorModal.component';

import { styles } from './boundaryTest.styles';

export function BoundaryTest(props){
    const theme = useTheme();

    /// Location, area, and standing points for SM
    /// Bool indicating to the map to recenter
    const [location] = useState(props.timeSlot.location);
    const [area] = useState(props.timeSlot.area);
    const [recenter] = useState(false); // not used

    // Begins the test
    const [start, setStart] = useState(false);

    // timer stuff
    const initalTime = props.timeSlot.timeLeft
    // controls the rendered countdown timer
    const [timer, setTimer] = useState(initalTime);
    // controls timer interval instance (changed it to be a useState)
    const [id, setId] = useState();

    // filter controls
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    const [filter, setFilter] = useState([
        {label: "Show All", value: 0},
        {label: "Hide", value: 1}, 
        {label: "Construction", value: 2},
        {label: "Material", value: 3}, 
        {label: "Shelter", value: 4}
    ]);
    const [viewAll, setViewAll] = useState(true);
    const [constructBool, setConstructBool] = useState(false);
    const [materialBool, setMaterialBool] = useState(false);
    const [shelterBool, setShelterBool] = useState(false);
    
    
    // boundary tools
    const [lineTools, setLineTools] = useState(false);
    const [boundIndex, setBoundIndex] = useState(-1);

    // Current path being drawn
    const [currentPath, setCurrentPath] = useState([])
    const [currentPathSize, setCurrentPathSize] = useState(0)
    // Stores total paths seperatley for the 3 types of boundaries
    const [constructTotalPaths, setConstructTotalPaths] = useState([]);
    const [materialTotalPaths, setMaterialTotalPaths] = useState([]);
    const [shelterTotalPaths, setShelterTotalPaths] = useState([]);

    const [errorModal, setErrorModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");



    // ends activity, packages and sends data to the DB
    const endActivity = async () => {

        setStart(false);
        clearInterval(id);
        console.log('timer: ' + timer);
        console.log('ending activity');
        
        // don't try to send any data yet, just close the test
        // try {
        //     const response = await fetch('https://measuringplacesd.herokuapp.com/api/boundary_maps/' + props.timeSlot._id + '/data', {
        //         method: 'POST',
        //         headers: {
        //             Accept: 'application/json',
        //                 'Content-Type': 'application/json',
        //                 'Authorization': 'Bearer ' + props.token
        //         },
        //         body: JSON.stringify({
        //             entries: objData
        //         })
        //     })

        //     let info = await response.json()
            
        //     // console.log(info);

        // } catch (error) {
        //     console.log("ERROR: ", error)
        // }
        props.navigation.navigate("ActivitySignUpPage");
    }
    
    // closes the modal and stores the measurement; copy from sound test, ex of how to store data locally
    const closeData = async (inf) => {
        // close the modal
        // setDecibelModal(false);    
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
    
    // helps control the countdown timer
    useEffect(() =>{
        // only start the timer when we start the test
        if(start){
            //console.log('useEffect start');
            startTime(timer);
        }
    }, [start]);

    // *fixed* issue: the interval wasn't stopping whenever the test ended (which causes problems)
    // solution: make the id a useState (instead of a global variable)
    // begins/updates the timer; (updated version, change the ones in the 3 exsiting activities if they have the same issue)
    function startTime(current){
        let count = current;
        setId(setInterval(() =>{
            count--;
            // timer is what actually gets rendered so update every second
            setTimer(count);
            console.log(count);
            // when timer hits 0, end the test (is a time at site test)
            if(count === 0){
                console.log('timer hits 0');
                // clear the interval to avoid resuming timer issues
                clearInterval(id);
                endActivity();
            }
        // 1000 ms == 1 s
        }, 1000));
    }

    // Start button and progress tracker component
    const StartEndButton = () => {
        // only show the start button before the test is started (to start the test)
        if (!start) {
            return(
                <Button style={styles.startButton} onPress={() => setStart(true)} >
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
    
    // controls which boundaries show on the map during data collection
    const filterControl = (item) =>{
        console.log("Value: " + item.value);
        let type = item.value;
        // Show All
        if(type === 0){
            setViewAll(true);
            setConstructBool(true);
            setMaterialBool(true);
            setShelterBool(true);
        }
        // Hide (set all filter useStates to false to render none of the boundaries)
        else if(type === 1){
            setViewAll(false);
            setConstructBool(false);
            setMaterialBool(false);
            setShelterBool(false);
        }
        // Construction
        else if(type === 2){
            setViewAll(true);
            setConstructBool(true);
            setMaterialBool(false);
            setShelterBool(false);
        }
        // Material
        else if(type === 3){
            setViewAll(true);
            setConstructBool(false);
            setMaterialBool(true);
            setShelterBool(false);
        }
        // Shelter
        else if(type === 4){
            setViewAll(true);
            setConstructBool(false);
            setMaterialBool(false);
            setShelterBool(true);
        }

    }

     // CountDown Timer and the StartEnd buttons
    const TimeBar = () => {
        return(
            <View>
                <View style={styles.container}>

                    <StartEndButton/>

                    <View style={styles.filterView} >
                        
                        <View>
                            <DropDownPicker
                                style={styles.filterSelect}
                                open={open}
                                setOpen={setOpen}
                                value={value}
                                setValue={setValue}
                                onSelectItem={ item => filterControl(item)}
                                items={filter}
                                setItems={setFilter}
                            />
                        </View>

                    </View>

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
    
    // adds a marker to the current path
    const addMarker = (marker) =>{
        // only add a marker if the test has started and the line tool bar is pulled up
        if(start && lineTools){
            // current marker being added
            console.log(marker);
            // cannot use currentPath.push here, causes a read-only error somehow on the 3rd marker
            setCurrentPath(currentPath.concat(marker));
            setCurrentPathSize(currentPathSize+1);
        }
        else console.log('map pressed with no linetools');
    }

    // closes the line toolbar and submits the boundary to collect data
    const confirm = () => {
        console.log('confirm attempt');
        // boundIndex key: 0 is construction, 1 is material, 2 is shelter
        // construction is a polyline (requires at least 2 points)
        // material and shelter is a polygon (requires at least 3 points)
        // construction boundary
        if(boundIndex === 0){
            // line size check
            if(currentPathSize < 2){
                setErrorMsg("Need at least 2 points to confirm a Construction Boundary");
                setErrorModal(true);
                return
            }
            
            constructTotalPaths.push(currentPath);

            console.log('Construction Boundary Confirmed');
        }
        // material/shelter boundary
        else if(boundIndex === 1 || boundIndex === 2){
            // polygon size check
            if(currentPathSize < 3){
                setErrorMsg("Need at least 3 points to confirm a Material/Shelter Boundary");
                setErrorModal(true);
                return
            }

            if(boundIndex === 1) materialTotalPaths.push(currentPath);
            else shelterTotalPaths.push(currentPath);

            console.log('Material/Shelter Boundary Confirmed');
        }
        // error checking
        else console.log('ERROR: should never enter here');
        
        
        console.log(currentPathSize);
        console.log(currentPath);
        setLineTools(false);
        //setDataModal(true)

        // for dev, whenever some drawn boundary is confirmed, clear out the current paths stuff for next enteries
        let emptyPath = [];
        setCurrentPath(emptyPath);
        setCurrentPathSize(0);
    }
    
    // removes last plotted marker; if last plotted marker is the only marker, close line toolbar
    const removeLastPoint = () => {
        if (currentPathSize > 0) {

            let currPath = [...currentPath]
            currPath.splice(-1, 1)

            setCurrentPath(currPath)
            setCurrentPathSize(currentPathSize-1)
        }
        else if(currentPathSize === 0){
            let currPath = [...currentPath]
            currPath.splice(-1, 1)

            setCurrentPath(currPath)
            setCurrentPathSize(currentPathSize-1)
            
            setLineTools(false);
        }
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
    
    // only allow the user to choose the boundary type when the test is started
    const boundaryType = (val) =>{
        if(start){
            if(val === 0){
                console.log('Construction Boundary');
                setBoundIndex(0);
            }
            else if (val === 1){
                console.log('Material Boundary');
                setBoundIndex(1);
            }
            else if (val === 2){
                console.log('Shelter Boundary');
                setBoundIndex(2);
            }
            // pull up line toolbar for every boundary type
            setLineTools(true);
        }
    }

    const BoundaryToolBar = () =>{
        // line toolbar is rendered
        if(lineTools){
            return null
        }
        // otherwise the button toolbar is rendered
        else{
            return(
                <View style={styles.buttonRow}>
                    <Button style={styles.buttons} onPress={() => boundaryType(0)}>Construction</Button>
                    <Button style={styles.buttons} onPress={() => boundaryType(1)}>Material</Button>
                    <Button style={styles.buttons} onPress={() => boundaryType(2)}>Shelter</Button>
                </View>
            )
        }
    }

    const dismiss = () =>{
        setErrorModal(false);
    }

    return(
        <ViewableArea>
            <Header text={'Spatial Boundaries'}/>
            <ContentContainer>
                    
                    <ErrorModal 
                        errorModal={errorModal}
                        errorMessage={errorMsg}
                        dismiss={dismiss}
                    />
                    
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
                    {/* this zIndex enables the dropdown menu to render over the map */}
                    {/* the map should still be fully interactable */}
                    <View style={{zIndex: -1}}>
                        <BoundaryMap
                            area={area}
                            type={boundIndex}
                            markers={currentPath}
                            addMarker={addMarker}
                            lineBool={constructBool}
                            linePaths={constructTotalPaths}
                            matBool={materialBool}
                            matPaths={materialTotalPaths}
                            sheBool={shelterBool}
                            shePaths={shelterTotalPaths}
                            viewAll={viewAll}
                            lineTools={lineTools}
                            recenter={recenter}
                        />
                    </View>

                    <BoundaryToolBar />
                    <LineToolBar />
                        
            </ContentContainer>
        </ViewableArea>
    );
}