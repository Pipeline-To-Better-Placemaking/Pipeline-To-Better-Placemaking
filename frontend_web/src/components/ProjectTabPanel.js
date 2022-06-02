import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link, useLocation } from 'react-router-dom';

import './controls.css';

export default function ProjectTabs(props) {
    const location = useLocation();
    const [value, setValue] = React.useState(props.state ? props.state : 0);
    const [mapIndex, setMapIndex] = React.useState('unselected');
    const [surveyorIndex, setSurveyorIndex] = React.useState('unselected');
    const [activityIndex, setActivityIndex] = React.useState('unselected');

    // needed to keep track of project page location using url
    // shows proper selection in tab bar and movement from previous page
    const segment = location.pathname.split('/');
    const tail = segment[segment.length - 1];

    React.useEffect(() => {
        if(tail === 'activities'){ 
            handleUpdate('activities', 2)
        } else{ 
            tail === 'surveyors' ? handleUpdate('surveyors', 1) : handleUpdate('map', 0);
        }
    }, [tail]);

    // manual adjustment of selected quality for Mui
    const handleUpdate = (tab, value) => {
        setValue(value);
        if (tab === 'map') {
            setMapIndex('Mui-selected');
            setSurveyorIndex('unselected');
            setActivityIndex('unselected');
        } else if (tab === 'surveyors') {
            setMapIndex('unselected');
            setSurveyorIndex('Mui-selected');
            setActivityIndex('unselected');
        } else if(tab === 'activities') {
            setMapIndex('unselected');
            setSurveyorIndex('unselected');
            setActivityIndex('Mui-selected');
        } else {
            setMapIndex('Mui-selected');
            setSurveyorIndex('unselected');
            setActivityIndex('unselected');
        }
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function LinkTab(props) {
        return (
            <Tab
                id={props.href}
                label={props.label}
                component={Link}
                to={props.href}
                state={props.value}
                className={props.className}
                tabIndex={0}
            />
        );
    }

    return (
        <div id='projectTabs'>
            <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider', bgcolor: '#00396D' }}>
                <Tabs value={value} onChange={handleChange} aria-label='project tabs' TabIndicatorProps={{ children: <span className='MuiTabs-indicatorSpan' /> }}>
                    <LinkTab value={0} label='Map' href='map' className={mapIndex} />
                    <LinkTab value={1} label='Surveyors' href='surveyors' className={surveyorIndex} />
                    <LinkTab value={2} label='Activities' href='activities' className={activityIndex} />
                </Tabs>
            </Box>
        </div>
    );
}