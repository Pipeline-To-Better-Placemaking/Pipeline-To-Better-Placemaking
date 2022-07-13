import * as React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import axios from '../api/axios.js';
import MapPage from './MapPage';
import TabPanel from '../components/ProjectTabPanel';
import ActivityPage from './ActivityPage';
import SurveyorPage from './SurveyorPage';
import NewActivityTimes from './NewActivityTimes';

function ProjectPage(){
    //loc state recieved from (project type) Display Cards on TeamHome(listing team projects)
    const loc = useLocation();
    const [loaded, setLoaded] = React.useState(false);
    //Holds basic projects info including map ids, default data overwritten on async function
    const [projectInfo, setProjectInfo] = React.useState();
    //Holds specifics like results, locations, and types of markers, boundaries, etc.
    var results = {};
    const [drawer, setDrawer] = React.useState();
    const [activities, setActivities] = React.useState();
    const user = loc.state ? loc.state.userToken : {};

    // page url: path (split index)
    // can be reached at (heroku-url)/home (1)/teams (2)/ :id (3) /projects (4)/:id (5)
    // Selected Project's data will be loaded here to pass into its relevant components 
    const projectId = loc.pathname.split('/')[5];
    //console.log(projectId);

    //load project area and location data here as well and pass to Map Page
    var area = [
        { lat: 28.60554990612719, lng: -81.20110596383721 },
        { lat: 28.606199831533385, lng: -81.19778002454426 },
        { lat: 28.603392878566126, lng: -81.19546259587324 },
        { lat: 28.600755404733533, lng: -81.19444335642248 },
        { lat: 28.598011890739404, lng: -81.1974018330677 },
        { lat: 28.59642933335552, lng: -81.19959051571513 },
        { lat: 28.59729597487453, lng: - 81.20322759118913 },
        { lat: 28.599839338049176, lng: -81.20663936117703 },
        { lat: 28.601506620541844, lng: -81.20608146164412 },
        { lat: 28.604549107390945, lng: -81.2062102077004 },
        { lat: 28.60644237514531, lng: -81.20359237160903 }
    ];

    // loc.state will be used for maintaining project title across the project sub-pages(map, activities, and researchers)
    const projectData = async() => {
        try {

            const response = await axios.get(`/projects/${projectId}`, {
                headers: {
                    // 'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${user.token}`
                },
                withCredentials: true
            });

            // console.log(response.data);
            setProjectInfo(response.data);

            //get Map data for activity results (needed in drawers)
            response?.data?.boundariesCollections.forEach((collection) => (
                collection.maps.forEach( async (id) => {
                    await collectionPoints(id, 'bounds', collection.date);

                })
            ))
            response?.data?.lightCollections.map((collection) => (
                collection.maps.map( async (id) => (
                    await collectionPoints(id, 'light', collection.date)
                ))
            ))
            response?.data?.movingCollections.map((collection) => (
                collection.maps.map( async (id) => (
                    await collectionPoints(id, 'moving', collection.date)
                ))
            ))
            response?.data?.natureCollections.map((collection) => (
                collection.maps.map( async (id) => (
                    await collectionPoints(id, 'nature', collection.date)
                ))
            ))
            response?.data?.orderCollections.map((collection) => (
                collection.maps.map( async (id) => (
                    await collectionPoints(id, 'order', collection.date)
                ))
            ))
            response?.data?.soundCollections.map((collection) => (
                collection.maps.map( async (id) => (
                    await collectionPoints(id, 'sound', collection.date)
                ))
            ))
            response?.data?.stationaryCollections.map((collection) => (
                collection.maps.map( async (id) => (
                    await collectionPoints(id, 'stationary', collection.date)
                ))
            ))

            setActivities(results);
            setDrawer({ Results: results, Graphs: '', Data: '' });
            setLoaded(true);
            
        } catch(error){
            //project api get error
            console.log('ERROR: ', error);
            return;
        }
    }

    //light order nature boundaries
    const collectionPoints = async (id, cat, dateTime) => {
        const apiCategory = {
            bounds: 'boundaries_maps',
            light: 'light_maps',
            moving: 'moving_maps',
            nature: 'nature_maps',
            order: 'order_maps',
            sound: 'sound_maps',
            stationary: 'stationary_maps'
        }

        try {
            const response = await axios.get(`/${apiCategory[cat]}/${id}`, {
                headers: {
                    // 'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${user.token}`
                },
                withCredentials: true
            });

            // console.log(response.data);
            var date = new Date(dateTime);
            var map = results;
            //console.log(typeof (dateTime));
            map[apiCategory[cat]] = {};
            map[apiCategory[cat]][date.toLocaleDateString()] = {};
            map[apiCategory[cat]][date.toLocaleDateString()][date.toLocaleTimeString()] = await response.data;

            results = map;
            //console.log(map);

        } catch (error) {
            //project api get error
            console.log('ERROR: ', error);
            return;
        }
    }

    //need to pull each collection object to pass into the drawer
    //projectInfo?.boundariesCollections, projectInfo?.standingPoints, projectInfo?.stationaryCollections, projectInfo?.movingCollections, projectInfo?.soundCollections, projectInfo?.surveyCollections]

    React.useEffect(() => {
        projectData()
    }, []);

    //loading in center from project
    var center = { lat: projectInfo?.standingPoints[0].latitude, lng: projectInfo?.standingPoints[0].longitude };
    var standingPoints = projectInfo?.standingPoints;
    area = projectInfo?.area?.points;

    //console.log(projectInfo)
    console.log(results)
    //console.log(templateDrawers)
    //console.log(center)

    return (
        <div id='ProjectPage'>
            <TabPanel state={ loc.state }/>
            {/* data passed into drawers needs map data and to match the format drawers component above */}
            {/* made it check for projectInfo.title before loading routes, later it will need to render on map data passed into drawers hopefully this helps */}
            {
                loaded ? 
                <Routes>
                    <Route index element={<MapPage title={ projectInfo?.title } 
                        drawers={ drawer } 
                        area={ area } 
                        center={ center } />} />
                    <Route path='map' element={<MapPage title={ projectInfo?.title } 
                        drawers={ drawer }  
                        area={ area } 
                        center={ center }/>} />
                    <Route path='activities' element={<ActivityPage title={ projectInfo?.title }  
                        drawers={ activities }  />} />
                    <Route path='activities/times' element={<NewActivityTimes />}/>
                    <Route path='surveyors' element={<SurveyorPage title={ projectInfo?.title } 
                        drawers={ activities }  />} />
                </Routes>
                : null
            }
        </div>
    );
}

export default ProjectPage;