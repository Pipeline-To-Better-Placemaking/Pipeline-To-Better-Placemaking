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

import './controls.css';

export default function MapDrawer(props) {
    const drawers = props.drawers;
    const [checked, setChecked] = React.useState({});

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

    const [open, setOpen] = React.useState({
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

    const handleClick = (text, open) => (event) => {
        setOpen({...open, [text]: open});
    };

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.title === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const toggleSwitch = (category, date) => (event) => {
        setChecked({...checked, [category+''+date]: event.target.checked});
        props.select(category, date, !checked[category + '' + date]);
    };

    const list = (drawer) => (
        <Box
            sx={{ width: menuAnchors[drawer.name] === 'top' || menuAnchors[drawer.name] === 'bottom' ? 'auto' : 250 }}
            id={menuAnchors[drawer.name]+'ListBox'}
        >
            <List>
                {drawer.categories.map((catdrawer, index) => (
                    <div key={catdrawer.title}>
                        <ListItemButton key={catdrawer.title+index} onClick={handleClick(catdrawer.title, !open[catdrawer.title])}>
                            <ListItemText primary={catdrawer.title ? testNames[catdrawer.title] : ''} />
                            {menuAnchors[drawer.name] === 'left' ? (open[catdrawer.title] ? <ExpandLess /> : <ExpandMore />): null}
                        </ListItemButton>
                        {menuAnchors[drawer.name] === 'left' ? sublist(catdrawer.title, catdrawer.maps) : null}
                    </div>
                ))}
            </List>
        </Box>
    );

    const sublist = (test, maps) => (
        <Collapse in={open[test]} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
                {maps.map((text, index) => (
                    <ListItem key={text.date+''+index} sx={{ pl: 4 }}>
                        <FormControlLabel control={<Switch checked={checked[test + '' + text.date] ? checked[test + '' + text.date] : false} onChange={toggleSwitch(test, text.date, checked[test+''+text.date])}/>} label={text.date} />
                    </ListItem>
                ))}
            </List>
        </Collapse>
    );

    return (
        <div id='projectFrame'>
            {drawers.map((drawer) => (
                <React.Fragment key={menuAnchors[drawer.name]}>
                    <Button id={menuAnchors[drawer.name] + 'Button'} onClick={toggleDrawer(menuAnchors[drawer.name], !state[menuAnchors[drawer.name]])}>
                        {drawer.name}
                    </Button>
                    <Drawer
                        id={menuAnchors[drawer.name]+'Drawer'}
                        anchor={menuAnchors[drawer.name]}
                        open={state[menuAnchors[drawer.name]]}
                        onClose={toggleDrawer(menuAnchors[drawer.name], false)}
                        hideBackdrop={true}
                    >
                        {menuAnchors[drawer.name] === 'bottom' ? <Button id={menuAnchors[drawer.name] + 'CloseButton'} sx={{position: 'fixed', alignSelf: 'center'}} onClick={toggleDrawer(menuAnchors[drawer.name], !state[menuAnchors[drawer.name]])}>Close <Close/></Button> : null}
                        {list(drawer)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}