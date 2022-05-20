import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Title from './Title';
import Home from './routes/Home';
import MapPage from './routes/MapPage';
import AppNavBar from './components/AppNavBar';
import TabPanel from './components/ProjectTabPanel';
import ActivityPage from './routes/ActivityPage';
import SurveyorPage from './routes/SurveyorPage';
import NewProject from './routes/NewProject';
import NewUser from './routes/NewUser';

function Project() {

    return (
        <div id='project'>
            <TabPanel />
            <Routes>
                <Route index element={<MapPage />} />
                <Route path='map' element={<MapPage />} />
                <Route path='activities' element={<ActivityPage />} />
                <Route path='surveyors' element={<SurveyorPage />}/>
            </Routes>
        </div>
    );
}

function UserRoutes() {

    return (
        <div id='userRoutes'>
            <AppNavBar />
            <Routes>
                <Route index element={<Home />} />
                <Route path='project/*' element={<Project />} />
                <Route path='new' element={<NewProject />} />
            </Routes>
        </div>
    );
} 

function App(){
    return(
        <Router>
            <Routes>
                <Route index element={<Title />}/>
                    <Route path='u/*' element={<UserRoutes />}/>
                <Route path='new' element={<NewUser />}/>
            </Routes>
        </Router>
    );
}

export default App;