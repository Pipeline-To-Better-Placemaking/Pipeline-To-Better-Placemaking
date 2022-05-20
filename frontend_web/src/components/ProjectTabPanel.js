import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link, useLocation } from 'react-router-dom';

import './controls.css';

export default function ProjectTabs(props) {
    const location = useLocation();
    const [value, setValue] = React.useState(props.state != null ? props.state : 0);
    const [mapIndex, setMapIndex] = React.useState('unselected');
    const [surveyorIndex, setSurveyorIndex] = React.useState('unselected');
    const [activityIndex, setActivityIndex] = React.useState('unselected');
    const segment = location.pathname.split('/');
    const tail = segment[segment.length - 1];

    React.useEffect(() => {
        if(tail === 'map' || tail === 'project'){ 
            handleUpdate('map', 0) 
        } else{ 
            tail === 'surveyors' ? handleUpdate('surveyors', 1) : handleUpdate('activities', 2);
        }
    }, [tail]);

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
        } else {
            setMapIndex('unselected');
            setSurveyorIndex('unselected');
            setActivityIndex('Mui-selected');
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
        <div>
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