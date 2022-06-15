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
import NewProjectPoints from './routes/NewProjectPoints';
import NewProjectArea from './routes/NewProjectArea';
import ProjectForm from './routes/ProjectForm';

function App(){
    //token/storage of choice
    //  const token = localStorage.getItem('token_data')

    // true == active user (logged in)
    // check token
    const [state, setState] = React.useState(/*token !== null && token !== '' ? true : */false);
    const [token, setToken] = React.useState("");

    // Set user vars to access the user home page
    function handleOnLogin(active, token) {
        setState(active);
        setToken(token);
    }

    // clear all fields on logout
    function handleOnLogout(active) {
        // setUser({});
        // setEmail("");
        // setPassword("");
        // localStorage.clear();
        setState(active);
    }

    // can be reached at (url)/home/(any component path below), ex: (url)/home/settings
    function UserRoutes() {
        
        const passLogout=(active)=>{
            handleOnLogout(active);
        }

        return (
            <div id='userRoutes'>
                <AppNavBar passLogout={passLogout} passToken={token}/>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path='project/:id/*' element={<ProjectPage />} />
                    <Route path='new' element={<NewProject />} />
                    <Route path='new/area/points' element={<NewProjectPoints/>}/>
                    <Route path='new/area/points/form' element={<ProjectForm/>} />
                    <Route path='new/area' element={<NewProjectArea />}/>
                    <Route path='settings' element={<SettingsPage />} />
                    <Route path='edit/:id' element={<EditProject />} />
                </Routes>
            </div>
        );
    } 

    // (url)/(any path below)
    return(
        <Router>
            <Routes>
                {/* pass onLogin function to handle userState */}
                <Route index element={<Title onLogin={handleOnLogin}/>}/>
                    <Route path='home/*' element={<UserRoutes />}/>
                <Route path='new' element={<NewUser />} />
            </Routes>
        </Router>
    );
}

export default App;