import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { ViewableArea, ContentContainer } from '../../../components/content.component';
import { Header } from '../../../components/headers.component';
import { useTheme, Button, Text } from '@ui-kitten/components';
import { LineTools } from '../../../components/Activities/PeopleMoving/lineTools.component';
import { BoundaryMap } from '../../../components/Maps/boundaryMap.component';
import { ErrorModal } from '../../../components/Activities/Boundary/errorModal.component';
import { DataModal } from '../../../components/Activities/Boundary/dataModal.component';
import { PurposeModal } from '../../../components/Activities/Boundary/purposeModal.component';
import { calcArea, haverSine } from '../../../components/helperFunctions';
import CountDown from 'react-native-countdown-component';
import DropDownPicker from 'react-native-dropdown-picker';

import { styles } from './boundaryTest.styles';

export function BoundaryTest(props){
    const theme = useTheme();

    const [area] = useState(props.timeSlot.area);
    const [recenter] = useState(false); // not used

    // Begins the test
    const [start, setStart] = useState(false);

    // timer stuff
    const initalTime = props.timeSlot.timeLeft
    // controls the rendered countdown timer
    const [timer, setTimer] = useState(initalTime);
    // controls timer interval instance
    const [id, setId] = useState();

    // filter controls
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    const [filter, setFilter] = useState([
        {label: "Hide", value: 0},
        {label: "Show All", value: 1}, 
        {label: "Constructed", value: 2},
        {label: "Material", value: 3}, 
        {label: "Shelter", value: 4}
    ]);
    const [viewAll, setViewAll] = useState(false);
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
    const [constructTotalPaths] = useState([]);
    const [materialTotalPaths] = useState([]);
    const [shelterTotalPaths] = useState([]);

    // used to store all collected data during test (to be sent to DB)
    const [data] = useState([]);
    const [dataIndex, setDataIndex] = useState(0);

    // Modal controls/tools
    const [errorModal, setErrorModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [dataModal, setDataModal] = useState(false);
    const [prompts, setPrompts] = useState([]);
    const [purposeModal, setPurposeModal] = useState(false);

    const constructPrompt = ["Curbs", "Building Wall", "Fences", "Planter", "Partial Wall"]
    const matPrompt = ["Bricks (pavers)", "Concrete", "Tile", "Natural (grass)", "Wood (deck)"]
    const shePrompt = ["Canopy", "Trees", "Umbrella Dining", "Temporary", "Constructed Ceiling"]

    // ends activity and sends data to the DB
    const endActivity = async () => {
        console.log('ending activity');
        setStart(false);
        clearInterval(id);
        
        // closes any modals that may be open
        if(errorModal) setErrorModal(false);
        if(dataModal) setDataModal(false);
        if(purposeModal) setPurposeModal(false);
        
        try {
            const response = await fetch('https://p2bp.herokuapp.com/api/boundaries_maps/' + props.timeSlot._id + '/data', {
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
            
            console.log(info);

        } catch (error) {
            console.log("ERROR: ", error)
        }
        props.navigation.navigate("ActivitySignUpPage");
    }
    
    // closes the modal and stores the boundary data
    const closeData = async (inf) => {
        // close the modal
        setDataModal(false);
        // increase the dataIndex
        setDataIndex(dataIndex + 1);
        let type;
        let val = 0;
        // store the boundary in its respective array and set the type variable
        // if we are doing a constructed boundary, pull up the purpose modal
        if(boundIndex === 0){
            setPurposeModal(true);
            constructTotalPaths.push(currentPath);
            type = 'Constructed'
            // calculate the distance between each subsequent point to find total distance of drawn line
            for (let i = 1; i < currentPathSize; i++) val += haverSine(currentPath[i-1], currentPath[i]);
            // ensure the percision is fixed to 2nd decimal place
            let tempString = val.toFixed(2);
            val = parseFloat(tempString);
        }
        else if (boundIndex === 1){
            materialTotalPaths.push(currentPath);
            type = 'Material'
            val = calcArea(currentPath)
        }
        else{
            shelterTotalPaths.push(currentPath);
            type = 'Shelter'
            val = calcArea(currentPath)
        }
        // gets rid of any parenthesis in the description (for material and shelter prompts)
        let shorten = inf.description.indexOf("(");
        let fixedDesc;
        if(shorten !== -1){
            fixedDesc = inf.description.slice(0, shorten - 1);
        }
        else fixedDesc = inf.description

        // package the data
        data.push(
            {
                path: currentPath,
                kind: type,
                description: fixedDesc,
                value: val,
                purpose: [],
                time: new Date()
            }
        );

        // whenever the data is packaged, clear out the current paths stuff for next enteries
        let emptyPath = [];
        setCurrentPath(emptyPath);
        setCurrentPathSize(0);

        // reset test controls
        setLineTools(false);
        setBoundIndex(-1);
    }

    // closes the purpose modal and stores the purpose(s)
    const closePurpose = async (inf) => {        
        data[dataIndex - 1].purpose = inf.purpose;
        setPurposeModal(false);
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
            //console.log(count);
            // when timer hits 0, end the test (is a time at site test)
            if(count === 0){
                // clear the interval to avoid resuming timer issues
                clearInterval(id);
                setStart(false);
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
                <Button style={styles.startButton} onPress={() => setStart(true)}>
                    <View>
                        <Text style={styles.startStopText}>Start</Text>
                    </View>
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
                    <View>
                        <Text style={styles.startStopText}>End</Text>
                    </View>
                </Button>
            )
        }
    }
    
    // controls which boundaries show on the map during data collection
    const filterControl = (item) =>{
        let type = item.value;
        // Hide (set to default)
        if(type === 0){
            setViewAll(false);
            setConstructBool(false);
            setMaterialBool(false);
            setShelterBool(false);
        }
        
        else{
            // all bounds needs this to be true to render
            setViewAll(true);  
            // Show All
            if(type === 1){
                setConstructBool(true);
                setMaterialBool(true);
                setShelterBool(true);
            }
            // Construction
            else if(type === 2){
                setConstructBool(true);
                setMaterialBool(false);
                setShelterBool(false);
            }
            // Material
            else if(type === 3){
                setConstructBool(false);
                setMaterialBool(true);
                setShelterBool(false);
            }
            // Shelter
            else if(type === 4){
                setConstructBool(false);
                setMaterialBool(false);
                setShelterBool(true);
            }
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
        // only add a marker if the test has started and the line toolbar is pulled up
        if(start && lineTools){
            // current marker being added
            // console.log(marker);
            // cannot use currentPath.push here, causes a read-only error somehow on the 3rd marker
            setCurrentPath(currentPath.concat(marker));
            setCurrentPathSize(currentPathSize+1);
        }
    }

    // checks the boundary and sets the buttons to collect data
    const confirm = () => {
        // constructed boundary
        if(boundIndex === 0){
            // line size check, needs at least 2 points
            if(currentPathSize < 2){
                setErrorMsg("Need at least 2 points to confirm a Constructed Boundary");
                setErrorModal(true);
                return
            }
            // sets the modals buttons and pulls up the modal
            setPrompts(constructPrompt);
        }
        // material/shelter boundary
        else if(boundIndex === 1 || boundIndex === 2){
            // polygon size check, needs at lest 3 points
            if(currentPathSize < 3){
                setErrorMsg("Need at least 3 points to confirm a Material/Shelter Boundary");
                setErrorModal(true);
                return
            }
            
            if(boundIndex === 1) setPrompts(matPrompt);
            else setPrompts(shePrompt); 
        }
        
        // pull up the data modal
        setDataModal(true);
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
    
    // only allow the user to choose the boundary type when the test is started
    const boundaryType = (val) =>{
        if(start){
            if(val === 0){
                console.log('Constructed Boundary');
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
                    <Button style={styles.buttons} onPress={() => boundaryType(0)}>
                        <View>
                            <Text style={styles.buttonTxt}>Constructed</Text>
                        </View>
                    </Button>
                    <Button style={styles.buttons} onPress={() => boundaryType(1)}>
                        <View>
                            <Text style={styles.buttonTxt}>Material</Text>
                        </View>
                    </Button>
                    <Button style={styles.buttons} onPress={() => boundaryType(2)}>
                        <View>
                            <Text style={styles.buttonTxt}>Shelter</Text>
                        </View>
                    </Button>
                </View>
            )
        }
    }
    
    // closes the error modal
    const dismiss = () =>{
        setErrorModal(false);
    }
    
    // closes the data modal and brings user back to the boundary they were drawing
    const goBack = () =>{
        setDataModal(false);
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

                    <DataModal
                        visible={dataModal}
                        closeData={closeData}
                        back={goBack}
                        desc={prompts}
                    />

                    <PurposeModal 
                        visible={purposeModal}
                        closePurpose={closePurpose}
                    />
                    
                    {/* this zIndex enables the dropdown menu to render over the map */}
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