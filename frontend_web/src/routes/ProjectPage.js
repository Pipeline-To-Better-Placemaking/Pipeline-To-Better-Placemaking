import * as React from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import axios from '../api/axios.js';
import MapPage from './MapPage';
import TabPanel from '../components/ProjectTabPanel';
import ActivityPage from './ActivityPage';
import SurveyorPage from './SurveyorPage';
import NewActivityTimes from './NewActivityTimes';
import UnityPage from './UnityPage';
import Button from '@mui/material/Button';

/* 
    (1) Handles routes to projects/:id/(activities/map/surveyors) 
    (2) Sets object structure for Results, Graphs, and Data drawers(menus) on the Map Page

*/

export default function ProjectPage(){
    // Retrieve Location info
    const loc = useLocation();
    // Boolean to load routes after data has been reformatted
    const [loaded, setLoaded] = React.useState(false);
    // Holds basic projects info including map ids
    const [projectInfo, setProjectInfo] = React.useState();
    const [standingPoints, setStandingPoints] = React.useState();
    const [drawer, setDrawer] = React.useState();
    const [activities, setActivities] = React.useState();
    // Retrive User info/token from location state
    const user = loc.state ? loc.state.userToken : {};
    // page url: path (split index)
    // can be reached at (heroku-url)/home (1)/teams (2)/ :id (3) /projects (4)/:id (5)
    const projectId = loc.pathname.split('/')[5];
    // Holds specifics like results, locations, and types of markers, boundaries, etc.
    // Data is reformatted for performance
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

            //get Map data for activity results (needed for mui drawers)
            response?.data?.standingPoints.map((point) => (
                sPoints[point._id] = { latitude: point.latitude, longitude: point.longitude }
            ));

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
            response?.data?.programCollections.map((collection) => (
                collection.maps.map(async (id, index) => {
                    await collectionPoints(id, 'program', collection.date, index);
                })
            ))

            setActivities(results);
            setStandingPoints(sPoints);
            setDrawer({ Results: results, Graphs: '', Data: '' });
            // After all other values are set loaded to true to render routes with appropriate data
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
            stationary: 'stationary_maps',
            program:    'program_maps'
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

            var map = results;

            if (response?.data && response?.data.date && response?.data.date !== null){
                var date = new Date(dateTime);
                var format = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
                
                var time = new Date(response?.data.date);
                var set = time.toLocaleTimeString();

                if (!map[apiCategory[cat]]) {
                    map[apiCategory[cat]] = {};
                }
                if (!map[apiCategory[cat]][format]) {
                    map[apiCategory[cat]][format] = {};
                }
                if (map[apiCategory[cat]][format][set]){
                    map[apiCategory[cat]][format][`${set} (${index})`] = await response.data;
                }else{
                    map[apiCategory[cat]][format][set] = await response.data;
                }
            }

            /* !!Structure reformatted for info and access ex: 
                **the map page drawers access the date and time from this for easy access
                **if changed to be organized by name keys instead of date and time keys
                **change references to access date and time from the response data portion

                results = {
                    light_maps: {
                        '02/22/22':{
                            '9:30:-- AM':{
                                (light_maps response data)
                            }
                        }

                    }
                }
            */

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

    //loading in center, areas, and subareas from information
    var center = { lat: projectInfo?.standingPoints[0].latitude, lng: projectInfo?.standingPoints[0].longitude };
    var area = projectInfo?.area?.points;
    var subAreas = projectInfo?.subareas;
    
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
                        <Route path='activities/identifying_program' element={
                            <div>
                                <Button className='resetButton' component={Link} size='lg' variant='filledTonal' color='error' to='../activities'
                                    state={{team: loc.state.team, project: loc.state.project, userToken: loc.state.userToken}} >
                                    Reset Model
                                </Button>
                                <Button className='continueButton' component={Link} size='lg' variant='filledTonal' color='error' to='extrude' 
                                    state={{...loc.state}} >
                                    Continue Model
                                </Button>
                                <MapPage 
                                title={ projectInfo?.title } 
                                drawers={ drawer }  
                                area={ area } 
                                center={ center }
                                standingPoints={ standingPoints }
                                subAreas={ subAreas }
                                />
                            </div>
                            
                        }/>
                        <Route path='activities/identifying_program/extrude' element={
                            <UnityPage />
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