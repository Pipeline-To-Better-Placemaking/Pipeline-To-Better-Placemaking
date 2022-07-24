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
    const [standingPoints, setStandingPoints] = React.useState();
    const [drawer, setDrawer] = React.useState();
    const [activities, setActivities] = React.useState();
    const user = loc.state ? loc.state.userToken : {};
    // page url: path (split index)
    // can be reached at (heroku-url)/home (1)/teams (2)/ :id (3) /projects (4)/:id (5)
    const projectId = loc.pathname.split('/')[5];
    //Holds specifics like results, locations, and types of markers, boundaries, etc.
    var results = {};
    var sPoints = {};

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

            setProjectInfo(response.data);

            response?.data?.standingPoints.map((point) => (
                sPoints[point._id] = { latitude: point.latitude, longitude: point.longitude }
            ));

            //get Map data for activity results (needed in drawers)
            response?.data?.boundariesCollections.map((collection) => (
                collection.maps.map(async (id, index) => {
                    await collectionPoints(id, 'bounds', collection.date, index);
                })
            ))
            response?.data?.lightCollections.map((collection) => (
                collection.maps.map(async (id, index) => (
                    await collectionPoints(id, 'light', collection.date, index)
                ))
            ))
            response?.data?.movingCollections.map((collection) => (
                collection.maps.map(async (id, index) => (
                    await collectionPoints(id, 'moving', collection.date, index)
                ))
            ))
            response?.data?.natureCollections.map((collection) => (
                collection.maps.map(async (id, index) => (
                    await collectionPoints(id, 'nature', collection.date, index)
                ))
            ))
            response?.data?.orderCollections.map((collection) => (
                collection.maps.map(async (id, index) => (
                    await collectionPoints(id, 'order', collection.date, index)
                ))
            ))
            response?.data?.soundCollections.map((collection) => (
                collection.maps.map( async (id, index) => (
                    await collectionPoints(id, 'sound', collection.date, index)
                ))
            ))
            response?.data?.stationaryCollections.map((collection) => (
                collection.maps.map( async (id, index) => (
                    await collectionPoints(id, 'stationary', collection.date, index)
                ))
            ))

            setActivities(results);
            setStandingPoints(sPoints);
            setDrawer({ Results: results, Graphs: '', Data: '' });
            setLoaded(true);
            
        } catch(error){
            //project api get error
            console.log('ERROR: ', error);
            return;
        }
    }

    //light order nature boundaries
    const collectionPoints = async (id, cat, dateTime, index) => {
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

            console.log(response.data);
            
            var date = new Date(dateTime);
            var map = results;
            //console.log(typeof (dateTime));
            if (!map[apiCategory[cat]]) {
                map[apiCategory[cat]] = {};
            }
            if(!map[apiCategory[cat]][date.toLocaleDateString()]){ 
                map[apiCategory[cat]][`${date.toLocaleDateString()}`] = {};
            }
            var time = new Date(response?.data.date).toLocaleTimeString();
            if (map[apiCategory[cat]][date.toLocaleDateString()][time]){
                map[apiCategory[cat]][date.toLocaleDateString()][`${time} (${index})`] = await response.data;
            }else{
                map[apiCategory[cat]][date.toLocaleDateString()][time] = await response.data;
            }

            results = map;
        } catch (error) {
            //project api get error
            console.log('ERROR: ', error);
            return;
        }
    }

    React.useEffect(() => {
        projectData()
    }, []);

    //loading in center from project
    var center = { lat: projectInfo?.standingPoints[0].latitude, lng: projectInfo?.standingPoints[0].longitude };
    var area = projectInfo?.area?.points;
    var subAreas = projectInfo?.subareas;
    
    //console.log(drawer);
    console.log(projectInfo);
    //console.log(standingPoints);
    console.log(drawer);
    return (
        <div id='ProjectPage'>
            <TabPanel state={ loc.state }/>
            {
                loaded ? 
                    <Routes>
                        <Route index element={
                            <MapPage
                                title={ projectInfo?.title } 
                                drawers={ drawer } 
                                area={ area } 
                                center={ center }
                                standingPoints={ standingPoints }
                                subAreas={ subAreas }
                            />
                        } />
                        <Route path='map' element={
                            <MapPage 
                                title={ projectInfo?.title } 
                                drawers={ drawer }  
                                area={ area } 
                                center={ center }
                                standingPoints={ standingPoints }
                                subAreas={ subAreas }
                            />
                        } />
                        <Route path='activities' element={
                            <ActivityPage 
                                title={ projectInfo?.title }  
                                drawers={ activities }
                            />
                        } />
                        <Route path='activities/times' element={
                            <NewActivityTimes 
                                projectInfo={projectInfo}
                            />
                        }/>
                        <Route path='surveyors' element={
                            <SurveyorPage title={ projectInfo?.title } 
                                drawers={ activities }  
                            />
                        } />
                    </Routes>
                : null
            }
        </div>
    );
}

export default ProjectPage;