import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AppNavBar from './components/AppNavBar';
import Title from './routes/Title';
import Home from './routes/Home';
import NewProject from './routes/NewProject';
import NewUser from './routes/NewUser';
import SettingsPage from './routes/SettingsPage';
import EditProject from './routes/EditProject';
import ProjectPage from './routes/ProjectPage';

function UserRoutes() {
    // can be reached at (url)/home/(any component path below), ex: (url)/home/settings
    return (
        <div id='userRoutes'>
            <AppNavBar />
            <Routes>
                <Route index element={<Home />} />
                <Route path='project/:id/*' element={<ProjectPage />} />
                <Route path='new' element={<NewProject />} />
                <Route path='settings' element={<SettingsPage />} />
                <Route path='edit/:id' element={<EditProject />} />
            </Routes>
        </div>
    );
} 

function App(){
    // (url)/(any path below)
    return(
        <Router>
            <Routes>
                <Route index element={<Title />}/>
                    <Route path='home/*' element={<UserRoutes />}/>
                <Route path='new' element={<NewUser />} />
            </Routes>
        </Router>
    );
}

export default App;