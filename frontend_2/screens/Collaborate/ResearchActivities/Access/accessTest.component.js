import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, LogBox  } from 'react-native';
import { ViewableArea, ContentContainer } from '../../../components/content.component';
import { Header } from '../../../components/headers.component';
import { useTheme, Button, Text, Icon } from '@ui-kitten/components';
import { AccessMap } from '../../../components/Maps/accessMap.component.js';
import { LineTools } from '../../../components/Activities/PeopleMoving/lineTools.component';
import { ErrorModal } from '../../../components/Activities/Access/errorModal.component';
import { DataModal } from '../../../components/Activities/Access/dataModal.component';
import { DetailsModal } from '../../../components/Activities/Access/detailsModal.component';
import { DeleteModal } from '../../../components/Activities/deleteModal.component';
import { PopupMessage } from '../../../components/Activities/popupMessage.component';
import { calcArea, haverSine } from '../../../components/helperFunctions';
import CountDown from 'react-native-countdown-fixed';
import DropDownPicker from 'react-native-dropdown-picker';
import {format as prettyFormat} from 'pretty-format';
import { LOCAL_SERVER } from '@env';

import { styles } from './accessTest.styles';

LogBox.ignoreLogs(['EventEmitter.removeListener']);

export function AccessTest(props) {
    const theme = useTheme();
    const plat = Platform.OS;

    const [area] = useState(props.timeSlot.area);
    const [recenter] = useState(false); // not used

    // Begins the test
    const [start, setStart] = useState(false);
    const [initalStart, setInitalStart] = useState(true);
    // timer stuff
    const initalTime = props.timeSlot.timeLeft;
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
        {label: "Access Point", value: 2},
        {label: "Access Path", value: 3}, 
        {label: "Access Area", value: 4}
    ]);
    const [viewAll, setViewAll] = useState(false);
    const [pointBool, setPointBool] = useState(false);
    const [pathBool, setPathBool] = useState(false);
    const [areaBool, setAreaBool] = useState(false);


    // access tools
    const [lineTools, setLineTools] = useState(false);
    const [accessIndex, setAccessIndex] = useState(-1);

    // Current path being drawn
    const [currentPath, setCurrentPath] = useState([])
    const [currentPathSize, setCurrentPathSize] = useState(0)
    // Stores total paths seperatley for the 3 types of access
    const [totalPoints] = useState([]);
    const [totalPaths] = useState([]);
    const [totalAreas] = useState([]);

    // used to store all collected data during test (to be sent to DB)
    const [data] = useState([]);
    const [dataIndex, setDataIndex] = useState(0);

    // Modal controls/tools
    const [accessDataType, setAccessDataType] = useState("");
    const [errorModal, setErrorModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [popupMsg, setPopupMsg] = useState(true);
    const [dataModal, setDataModal] = useState(false);
    const [prompts, setPrompts] = useState([]);
    const [detailsModal, setDetailsModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(-1);
    const [deleteCoords, setDeleteCoords] = useState();
    const [deleteDesc, setDeleteDesc] = useState('');
    const [deleteType, setDeleteType] = useState(-1);

    const pointPrompt = ["Ride Share Drop Off", "Bike Rack", "Public Transport Stop", "Valet Counter", "E-scooter Parking"]
    const pathPrompt = ["Sidewalk", "Side Street", "Main Road"]
    const areaPrompt = ["Parking Lot", "Parking Garage"]
    

    // closes the modal and stores the access data
    
    // ends activity and sends data to the DB

    const endActivity = async () => {
        //console.log('ending activity');
        setStart(false);
        clearInterval(id);
        
        // closes any modals that may be open
        if(errorModal) setErrorModal(false);
        if(dataModal) setDataModal(false);
        if(detailsModal) setDetailsModal(false);
        
        try {
            const response = await fetch(LOCAL_SERVER+'/access_maps/' + props.timeSlot._id + '/data', {
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

            console.log("🚀 ~ file: accessTest.component.js:117 ~ endActivity ~ info", info);
            console.log("🚀 ~ file: accessTest.component.js:117 ~ endActivity ~ data", data);


        } catch (error) {
            console.log("ERROR: ", error)
        }
        props.navigation.navigate("ActivitySignUpPage");
    }
    
    const closeData = async (inf) => {
        // close the modal
        setDataModal(false);
        // increase the dataIndex
        setDataIndex(dataIndex + 1);
        let type;
        let val = 0;
        // store the access in its respective array and set the type variable

        // Point access
        if(accessIndex === 0){
            totalPoints.push(currentPath);
            type = 'Access Point';
            val = 0;
            setAccessDataType("Point");
        }

        // Path Access
        else if (accessIndex === 1){
            totalPaths.push(currentPath);
            type = 'Access Path';  
            // calculate the distance between each subsequent point to find total distance of drawn line
            for (let i = 1; i < currentPathSize; i++) val += haverSine(currentPath[i-1], currentPath[i]);
            // ensure the percision is fixed to 2nd decimal place
            let tempString = val.toFixed(2);
            val = parseFloat(tempString);
            setAccessDataType("Path");
        }

        // Area Access
        else {
            totalAreas.push(currentPath);
            type = 'Access Area';
            val = calcArea(currentPath);
            setAccessDataType("Area");
        }

        // package the data
        data.push(
            {
                path: currentPath,
                accessType: type,
                description: inf.description,
                inPerimeter: true,
                area: val,
                distancePath: 0,
                distanceFromArea: 0,
                time: new Date()
            }
        );

        //console.log("\n\n\n DISTANCE FROM PERIMETER: \n", calculateMinimumDistance(props.initialTimeSlot.area, currentPath));
        //console.log("\n\n\n PERIMETER: \n", props.initialTimeSlot.area);

        // Map perimeter area object into 2D array of coords
        const projectCoordinates = props.initialTimeSlot.area.map(coord => [coord.latitude, coord.longitude]);

        // Map test object into 2D array of coords
        const testCoordinates = currentPath.map(coord => [coord.latitude, coord.longitude]);

        if(!isWithinProjectArea(projectCoordinates, testCoordinates)) {
            const distance = calculateMinimumDistance(projectCoordinates, testCoordinates);

            data[dataIndex].inPerimeter = false;
            data[dataIndex].distanceFromArea = distance;
        }


        
        setDetailsModal(true);
        setStart(false);

        console.log("🚀 ~ file: accessTest.component.js:184 ~ closeData ~ data", prettyFormat(data));


        // whenever the data is packaged, clear out the current paths stuff for next enteries
        let emptyPath = [];
        setCurrentPath(emptyPath);
        setCurrentPathSize(0);

        // reset test controls
        setLineTools(false);
        setAccessIndex(-1);
    }

    // closes the details modal and stores the details(s)
    const closeDetails = async (inf) => {        
        data[dataIndex - 1].details = inf;

        console.log("🚀 ~ file: accessTest.component.js:204 ~ closeDetails ~ data[dataIndex - 1]", data[dataIndex - 1]);

        setStart(true);
        setDetailsModal(false);
    }

    // Checks if the test coordinates are within the project bounds
    function isWithinProjectArea(projectCoords, testCoords) {
        const [xMin, yMin] = projectCoords.reduce(([x, y], [pX, pY]) => [Math.min(x, pX), Math.min(y, pY)], [Infinity, Infinity]);
        const [xMax, yMax] = projectCoords.reduce(([x, y], [pX, pY]) => [Math.max(x, pX), Math.max(y, pY)], [-Infinity, -Infinity]);
      
        let within = false;
      
        for (let i = 0; i < testCoords.length; i++) {
          const [x, y] = testCoords[i];
      
          // Check if point is outside bounding box
          if (x < xMin || x > xMax || y < yMin || y > yMax) {
            continue;
          }
      
          // Check intersections with project area edges
          let count = 0;
      
          for (let j = 0; j < projectCoords.length; j++) {
            const [x1, y1] = projectCoords[j];
            const [x2, y2] = projectCoords[(j + 1) % projectCoords.length];
      
            if ((y > y1 && y <= y2 || y > y2 && y <= y1) && x < (x2 - x1) * (y - y1) / (y2 - y1) + x1) {
              count++;
            }
          }
      
          if (count % 2 !== 0) {
            within = true;
            break;
          }
        }
      
        return within;
    }
      
    //Haversine formula for calculating distance between coordinates
    const distanceInMeters = (lat1, lon1, lat2, lon2) => {
        const R = 6371000; // radius of the earth in meters
        const phi1 = lat1 * Math.PI / 180; // latitude of point 1 in radians
        const phi2 = lat2 * Math.PI / 180; // latitude of point 2 in radians
        const deltaPhi = (lat2 - lat1) * Math.PI / 180; // difference in latitude in radians
        const deltaLambda = (lon2 - lon1) * Math.PI / 180; // difference in longitude in radians
        
        const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
                  Math.cos(phi1) * Math.cos(phi2) *
                  Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        
        const distance = R * c;
        return distance;
      }
      
    
    function pointToLineDistance(x, y, x1, y1, x2, y2) {
        const a = distanceInMeters(x, y, x1, y1);
        const b = distanceInMeters(x, y, x2, y2);
        const c = distanceInMeters(x1, y1, x2, y2);
        const p = (a + b + c) / 2;
        const h = (2 / c) * Math.sqrt(p * (p - a) * (p - b) * (p - c));
        return h;
    }
    
    function calculateMinimumDistance(projectCoords, testCoords) {
        let minDistance = Number.MAX_VALUE;
        
        for (let i = 0; i < projectCoords.length - 1; i++) {
            const x1 = projectCoords[i][0];
            const y1 = projectCoords[i][1];
            const x2 = projectCoords[i + 1][0];
            const y2 = projectCoords[i + 1][1];
        
            for (let j = 0; j < testCoords.length; j++) {
            const x = testCoords[j][0];
            const y = testCoords[j][1];
        
            const d = pointToLineDistance(x, y, x1, y1, x2, y2);
            minDistance = Math.min(minDistance, d);


            }
        }
        
        return minDistance;
    }    

    // adds a marker to the current path
    const addMarker = (marker) =>{
        // only add a marker if the test has started and the line toolbar is pulled up
        // console.log(marker);
        if(start && lineTools){
            // current marker being added
            // console.log(marker);
            // cannot use currentPath.push here, causes a read-only error somehow on the 3rd marker
            setCurrentPath(currentPath.concat(marker));
            setCurrentPathSize(currentPathSize+1);
        }
    }

    // pulls up the delete modal
    const handleDelete = (type, index, coords) =>{
        // point access
        if(type === 0){
            setDeleteDesc("point access")
            setDeleteType(type);
        }
        // path access
        else if(type === 1){
            setDeleteDesc("path access")
            setDeleteType(type);
        }
        // area access
        else{
            setDeleteDesc("area access")
            setDeleteType(type);
        }
        // sets the description and index, then pulls up the modal
        setDeleteIndex(index);
        setDeleteCoords(coords);
        setDeleteModal(true);
    }
    
    // deletes the access from the total paths and data arrays
    const deleteAccess = async () =>{
        // point access
        if(deleteType === 0){
            totalPoints.splice(deleteIndex, 1);
        }
        // path access
        else if(deleteType === 1){
            totalPaths.splice(deleteIndex, 1);
        }
        // area access
        else{
            totalAreas.splice(deleteIndex, 1);
        }
        let tempIndex = -1;
        let tempFilter;
        // loop through the data array looking for the access to be deleted
        for(let i = 0; i < data.length; i++){
            // searches each data's path to see if those coordinates patch the coordinates of the access that is being deleted 
            tempFilter = data[i].path.filter((coord) => deleteCoords.find((dCoord) => coord.latitude === dCoord.latitude && coord.longitude === dCoord.longitude))
            // coordinate path of point is the same as the deleteCoord path
            if(deleteType === 0){
                if(tempFilter.length === deleteCoords.length){
                    // save the index and break from the loop
                    tempIndex = i
                    break
                }
            }
            // coordinate path of path/area
            else{
                // android device
                if(plat === 'android'){
                    if(tempFilter.length === deleteCoords.length){
                        tempIndex = i;
                        break
                    }
                }
                // ios device
                else{
                    // if its an ios device, there is an extra coord at the end of the path (on the deleteCoords array which forms the enclosed line polygons)
                    if(tempFilter.length === deleteCoords.length - 1){
                        // save the index and break from the loop
                        tempIndex = i
                        break
                    }
                }
            }
        }
        // should never really go into this if statement; it should always find the access
        // but just in case it doesn't it displays this error
        // last entry is deleted due to how splice deals with -1 as the starting index
        if(tempIndex === -1) console.log('ERROR, access not found... Deleting last entry in the data array')
        
        // removes the access from the data array
        data.splice(tempIndex, 1);
        // since we removed a access object, decrement the dataIndex
        setDataIndex(dataIndex - 1);
        //reset delete controls
        setDeleteIndex(-1);
        setDeleteDesc('');
        setDeleteModal(false);
    }

    const confirm = () => {
        // point access
        if(accessIndex === 0){
            // point size check, needs at most 1 point
            if(currentPathSize != 1){
                setErrorMsg("Need 1 point to confirm a Point Access");
                setErrorModal(true);
                return
            }
            // sets the modals buttons and pulls up the modal
            setPrompts(pointPrompt);
        }
        // constructed accessary
        else if(accessIndex === 1){
            // line size check, needs at least 2 points
            if(currentPathSize < 2){
                setErrorMsg("Need at least 2 points to confirm a Path Access");
                setErrorModal(true);
                return
            }
            // sets the modals buttons and pulls up the modal
            setPrompts(pathPrompt);
        }
        // material/shelter accessary
        else if(accessIndex === 2){
            // polygon size check, needs at lest 3 points
            if(currentPathSize < 3){
                setErrorMsg("Need at least 3 points to confirm an Area Access");
                setErrorModal(true);
                return
            }
            setPrompts(areaPrompt); 
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
        // if we try deleting with no marker on drawn access, put away the line toolbar
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
    
    // only allow the user to choose the access type when the test is started
    const accessType = (val) =>{
        if(start){
            if(val === 0){
                console.log('Point Access');
                setAccessIndex(0);
                // pull up line toolbar for every non-point access type
                setLineTools(true);
            }
            else if (val === 1){
                console.log('Path Access');
                setAccessIndex(1);
                // pull up line toolbar for every non-point access type
                setLineTools(true);
            }
            else if (val === 2){
                console.log('Area Access');
                setAccessIndex(2);
                // pull up line toolbar for every non-point access type
                setLineTools(true);
            }
        }
    }

    const AccessToolBar = () =>{
        // line toolbar is rendered
        if(lineTools){
            return null
        }
        else{
            // render the button toolbar only if the test has started
            if(start){
                //console.log("Started Access");
                return(
                    <View style={styles.buttonRow}>
                        <Button style={styles.buttons} onPress={() => accessType(0)}>
                            <View>
                                <Text style={styles.buttonTxt}>Point</Text>
                            </View>
                        </Button>
                        <Button style={styles.buttons} onPress={() => accessType(1)}>
                            <View>
                                <Text style={styles.buttonTxt}>Path</Text>
                            </View>
                        </Button>
                        <Button style={styles.buttons} onPress={() => accessType(2)}>
                            <View>
                                <Text style={styles.buttonTxt}>Area</Text>
                            </View>
                        </Button>
                    </View>
                )
            }
            // if the test has been started, but then paused at some point, render this message
            else if(!initalStart){
                return(
                    <View style={styles.descriptionView}>
                        <Text category={'s1'}>Press the play button to resume the test</Text>
                    </View>
                )
            }
            // initally renders this (test has not yet started)
            else return null
        }
    }

    const dismiss = () =>{
        setErrorModal(false);
    }

    // controls which access types appear on the map during data collection
    const filterControl = (item) =>{
        let type = item.value;
        // Hide (set to default)
        if(type === 0){
            setViewAll(false);
            setPointBool(false);
            setPathBool(false);
            setAreaBool(false);
        }
        
        else{
            // all bounds needs this to be true to render
            setViewAll(true);  
            // Show All
            if(type === 1){
                setPointBool(true);
                setPathBool(true);
                setAreaBool(true);
            }
            // Construction
            else if(type === 2){
                setPointBool(true);
                setPathBool(false);
                setAreaBool(false);
            }
            // Material
            else if(type === 3){
                setPointBool(false);
                setPathBool(true);
                setAreaBool(false);
            }
            // Shelter
            else if(type === 4){
                setPointBool(false);
                setPathBool(false);
                setAreaBool(true);
            }
        }
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
        else if (start === false){
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
                setStart(false);
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

                    <View style={styles.filterView} >
                        
                        <View>
                            <DropDownPicker
                                style={styles.filterSelect}
                                disabled={initalStart}
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
        // reset the tempMarker and close the modal
        //setTempMarker();
        setDataModal(false);
    }

    // Main render
    return(
        <ViewableArea>
            <Header text={'Identifying Access'}/>
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

                {dataModal ? <DataModal
                    closeData={closeData}
                    back={goBack}
                    desc={prompts}
                    //point={tempMarker}
                /> : null}

                <DetailsModal 
                    visible={detailsModal}
                    accessType={accessDataType}
                    data={data[dataIndex - 1]}
                    closeDetails={closeDetails}
                />

                <DeleteModal
                    visible={deleteModal}
                    setVisible={setDeleteModal}
                    dataType={deleteDesc}
                    deleteFunction={deleteAccess}
                    //deleteFunction={deletePoint}
                />

                {/* this zIndex enables the dropdown menu to render over the map */}
                <View style={{zIndex: -1}}>
                        <AccessMap
                            area={area}
                            type={accessIndex}
                            markers={currentPath}
                            addMarker={addMarker}
                            deleteMarker={handleDelete}
                            pointBool={pointBool}
                            pointPaths={totalPoints}
                            pathBool={pathBool}
                            linePaths={totalPaths}
                            areaBool={areaBool}
                            areaPaths={totalAreas}
                            viewAll={viewAll}
                            lineTools={lineTools}
                            recenter={recenter}
                        />
                    </View>
                
                <AccessToolBar/>
                <LineToolBar/>

            </ContentContainer>
            {/* {start ?
                <View style={styles.descriptionView}>
                    <Text category={'s1'}>Select a type to plot Access</Text>
                </View>
            :
                <View style={styles.descriptionView}>
                    {initalStart ?
                        null
                    :
                        <Text category={'s1'}>Press the play button to resume the test</Text>
                    }
                </View>
            } */}
        </ViewableArea>
    )
}


