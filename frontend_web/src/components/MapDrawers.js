import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Close from '@mui/icons-material/Close';
import Switch from '@mui/material/Switch';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

import ActivityTable from './ActivityTable';
import './controls.css';

export default function MapDrawer(props) {
    const drawers = props.drawers;
    const [selections, setSelections] = React.useState({});
    const [checked, setChecked] = React.useState({});
    const [timeOpen, setTimeOpen] = React.useState({});

    const menuAnchors = {
        Activities: 'left',
        Graphs: 'right',
        Data: 'bottom'
    };

    const testNames = {
        orderCollections: 'Absence of Order',
        boundariesCollections: 'Boundaries',
        lightingCollections: 'Lighting',
        natureCollections: 'Nature',
        soundCollections: 'Sound'
    };

    const [dateOpen, setDateOpen] = React.useState({
        orderCollections: false,
        boundariesCollections: false,
        lightingCollections: false,
        natureCollections: false,
        soundCollections: false
    });

    const [state, setState] = React.useState({
        left: false,
        bottom: false,
        right: false,
    });

    const handleClickDate = (text, open) => (event) => {
        setDateOpen({...dateOpen, [text]: open});
    };

    const handleClickTime = (text, open) => (event) => {
        setTimeOpen({ ...timeOpen, [text]: open });
    };

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.title === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const toggleSwitch = (category, date, time) => (event) => {
        setChecked({ ...checked, [`${category}.${date}.${time}`]: event.target.checked});
        // default is false has reverse setting so !checked[cat + date] must be sent
        // selected means checked[..]=false
        props.selection(category, date, time, !checked[`${category}.${date}.${time}`]);
        if(!checked[`${category}.${date}.${time}`]){
            selections[`${category}.${date}.${time}`] = drawers.Activities[category][date][time];
        } else {
            var delSelections = selections;
            delete delSelections[`${category}.${date}.${time}`];
            setSelections(delSelections);
        }
    };

    const list = (name, drawer) => (
        <Box
            sx={{ width: menuAnchors[name] === 'top' || menuAnchors[name] === 'bottom' ? 'auto' : 250 }}
            id={menuAnchors[name]+'ListBox'}
        >
            <List>
                {Object.entries(drawer).map(([category, dates], index) => (
                    <div key={category}>
                        <ListItemButton key={category+index} onClick={handleClickDate(category, !dateOpen[category])}>
                            <ListItemText primary={category ? testNames[category] : ''} />
                            {menuAnchors[name] === 'left' ? (dateOpen[category] ? <ExpandLess /> : <ExpandMore />): null}
                        </ListItemButton>
                        {menuAnchors[name] === 'left' ? dateList(category, dates) : null}
                    </div>
                ))}
            </List>
        </Box>
    );

    function dateList(title, dates){
        return(
            <Collapse in={dateOpen[title]} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                    {Object.entries(dates).map(([date, times], index) => (
                        <div key={date}>
                            <ListItemButton key={date + index} sx={{ pl: 4, bgcolor: '#dcedfc'}} onClick={handleClickTime(date, !timeOpen[date])}>
                                <ListItemText primary={date} />
                                {date ? (timeOpen[date] ? <ExpandLess /> : <ExpandMore />):null }
                            </ListItemButton>
                            {timeList(title, date, times)}
                        </div>
                    ))}
                </List>
            </Collapse>
        );
   };

    const timeList = (title, date, times) => (
        <Collapse in={timeOpen[date]} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
                {
                    Object.keys(times).map((time, index) => (
                        time ? <ListItem key={date + time + index} sx={{ pl: 4, bgcolor: '#aed5fa' }}>
                            <FormControlLabel control={<Switch checked={checked[`${title}.${date}.${time}`] ? checked[`${title}.${date}.${time}`] : false} onChange={toggleSwitch(title, date, time, checked[`${title}${date}${time}`])} />} label={time} />
                        </ListItem> : null
                    ))
                }
            </List>
        </Collapse>
    );

    const dataDrawer = (selections) => (
        <TableContainer component={Paper}> 
            <ActivityTable type={1} activity={selections}/>
        </TableContainer>
    );

    return (
        <div id='projectFrame'>
            {Object.entries(drawers).map(([name, data]) => (
                <React.Fragment key={menuAnchors[name]}>
                    <Button id={menuAnchors[name] + 'Button'} onClick={toggleDrawer(menuAnchors[name], !state[menuAnchors[name]])}>
                        {name}
                    </Button>
                    <Drawer
                        id={menuAnchors[name]+'Drawer'}
                        anchor={menuAnchors[name]}
                        open={state[menuAnchors[name]]}
                        onClose={toggleDrawer(menuAnchors[name], false)}
                        hideBackdrop={true}
                    >
                        {menuAnchors[name] === 'bottom' ? <Button id={menuAnchors[name] + 'CloseButton'} sx={{position: 'fixed', alignSelf: 'center'}} onClick={toggleDrawer(menuAnchors[name], !state[menuAnchors[name]])}>Close <Close/></Button> : null}
                        {menuAnchors[name] === 'left' ? list(name, data) : (menuAnchors[name] === 'bottom' ? dataDrawer(selections) : null)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}