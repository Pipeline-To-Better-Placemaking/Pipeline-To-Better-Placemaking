import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Close from '@mui/icons-material/Close';

import './controls.css';

export default function MapDrawer() {
    const drawers = [
        {
            anchor: 'left',
            name: 'Activities',
            categories: [
                {
                    type: 'Aoo',
                    dates: ['2/22/22', '3/5/22', '11/20/21']
                },
                {
                    type: 'B',
                    dates: ['2/29/22', '4/1/22', '12/2/21']
                },
                {
                    type: 'L',
                    dates: []
                },
                {
                    type: 'N',
                    dates: []
                },
                {
                    type: 'So',
                    dates: []
                }
            ]
        },
        {
            anchor: 'right',
            name: 'Graphs',
            categories: [
                {
                    type: '',
                    dates: []
                }
            ]
        },
        {
            anchor: 'bottom',
            name: 'Data',
            categories: [
                {
                    type: '',
                    dates: []
                }
            ]
        }
    ];

    const testNames = {
        Aoo: 'Absence of Order',
        B: 'Boundaries',
        L: 'Lighting',
        N: 'Nature',
        So: 'Sound'
    };

    const [open, setOpen] = React.useState({
        Aoo: false, 
        B: false, 
        L: false, 
        N: false, 
        So: false
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
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (drawer) => (
        <Box
            sx={{ width: drawer.anchor === 'top' || drawer.anchor === 'bottom' ? 'auto' : 250 }}
            id={drawer.anchor+'ListBox'}
        >
            <List>
                {drawer.categories.map((catdrawer, index) => (
                    <div key={catdrawer.type}>
                        <ListItemButton key={catdrawer.type+index} onClick={handleClick(catdrawer.type, !open[catdrawer.type])}>
                            <ListItemText primary={catdrawer.type ? testNames[catdrawer.type] : ''} />
                            {drawer.anchor === 'left' ? (open[catdrawer.type] ? <ExpandLess /> : <ExpandMore />): null}
                        </ListItemButton>
                        {drawer.anchor === 'left' ? sublist(catdrawer.type, catdrawer.dates) : null}
                    </div>
                ))}
            </List>
        </Box>
    );

    const sublist = (test, dates) => (
        <Collapse in={open[test]} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
                {dates.map((text, index) => (
                    <ListItemButton key={text+''+index} sx={{ pl: 4 }}>
                        <ListItemText primary={text} />
                    </ListItemButton>
                ))}
            </List>
        </Collapse>
    );

    return (
        <div id='projectFrame'>
            {drawers.map((drawer) => (
                <React.Fragment key={drawer.anchor}>
                    <Button id={drawer.anchor+'Button'} onClick={toggleDrawer(drawer.anchor, !state[drawer.anchor])}>
                        {drawer.name}
                    </Button>
                    <Drawer
                        id={drawer.anchor+'Drawer'}
                        anchor={drawer.anchor}
                        open={state[drawer.anchor]}
                        onClose={toggleDrawer(drawer.anchor, false)}
                        hideBackdrop={true}
                    >
                        {drawer.anchor === 'bottom' ? <Button id={drawer.anchor + 'CloseButton'} sx={{position: 'fixed', alignSelf: 'center'}} onClick={toggleDrawer(drawer.anchor, !state[drawer.anchor])}>Close <Close/></Button> : null}
                        {list(drawer)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}