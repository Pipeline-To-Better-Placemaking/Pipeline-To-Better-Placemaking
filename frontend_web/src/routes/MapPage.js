import * as React from 'react';
import { useParams } from 'react-router-dom';

import Map from '../components/Map';
import './routes.css';

function MapPage(props) {
    const id = useParams();
    const drawers = props.drawers;
    const title = props.title;
    const area = props.area;
    const center = props.center;

    console.log(id);

    /*const teamProjects = async() => {
        // There can be multiple projects
        let projectIds = teamInfo?.projects;

        try {
            const response = await axios.get({
                url: `https://p2bp.herokuapp.com/api/projects/${projectId._id}`, 
                method: 'GET',
                headers: { 
                    Accept: 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + props.passToken.token },
                    params: {
                        _id: projectId._id
                    },
                    withCredentials: true
            });
            console.log(project info)
            console.log(JSON.stringify(response.data));
            const proj = projects;
            proj.push(response.data);
            setProjects(proj);
            
        } catch(error){
            //proget api get error
            console.log('ERROR: ', error);
            return;
        }
    }*/

    //Map Drawers moved inside Map component for more direct data Passing
    return (
        <div id='MapPage'>
            {/* Map type 1 implies viewing project map and activity results */}
            <Map
                title={ title }
                center={ center } 
                zoom={ 16 } 
                type={ 1 }
                drawers={ drawers }
                area={ area }
            />
        </div>
    );
}

export default MapPage;