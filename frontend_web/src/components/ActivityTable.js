import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const testNames = {
    stationaryCollections: 'Humans in Place',
    movingCollections: 'Humans in Motion',
    orderCollections: 'Absence of Order Locator',
    boundariesCollections: 'Spatial and Shelter Boundaries',
    lightingCollections: 'Lighting Profile',
    natureCollections: 'Nature Prevalence',
    soundCollections: 'Acoustical Profile'
};

// Collapsible Table for Activity Page
function Row(props) {
    const row = props.row;
    const name = props.name;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow className='categories' sx={{ '& > *': {borderBottom: 'unset'} }}>
                <TableCell>
                    <IconButton
                        aria-label='expand row'
                        size='small'
                        onClick={ () => setOpen(!open) }
                    >
                        { open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon /> }
                    </IconButton>
                </TableCell>
                <TableCell className='catTitle' component='th' scope='row'>
                    { testNames[name] }
                </TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
            </TableRow>
            <TableRow className='subtables'>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={ 12 }>
                    <Collapse in={ open } timeout='auto' unmountOnExit>
                        { subtable(row, 0) }
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


//Subtables for Map Page Data Drawer and Activity Page Collapsible Table
const subtable = (row, type) => (    
    <Box sx={{ margin: 1 }} className='subTable'>
        <Table stickyHeader size='small' aria-label='activity'>
            <TableHead sx={{ bgcolor: '#e2e2e2'}}>
                <TableRow>
                    <TableCell colSpan={ 2 } className='value'>{ type === 0 ? 'Value' : 'Category' }</TableCell>
                    <TableCell colSpan={ type === 0 ? 2 : 1 } className='type'>
                        { type === 0 ? 'Type' : 'Value' }
                    </TableCell>
                    <TableCell>{ type === 0 ? 'Location' : 'Type' }</TableCell>
                    <TableCell>{ type === 0 ? 'Date Time' : 'Location' }</TableCell>
                    <TableCell>{ type === 0 ? 'Surveyor' : 'Date Time' }</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                { type === 0 ? 
                    Object.entries(row).map(([date, dObj])=>(
                        Object.entries(dObj).map(([time, tObj])=>(
                            tObj.data.map((object, index) => (
                                <TableRow key={ index }>
                                    <TableCell colSpan={ 2 } className='value'>
                                        { object.average ? object.average : (object.result ? object.result : (object.posture ? object.posture : (object.movement ? object.movement : ''))) }
                                    </TableCell>
                                    <TableCell colSpan={ 2 } className='type'>
                                    </TableCell>
                                    <TableCell>Location { index }</TableCell>
                                    <TableCell>{ date } { time }</TableCell>
                                    <TableCell>{ tObj.surveyor }</TableCell>
                                </TableRow>
                            ))
                        ))
                    )) : Object.entries(row).map(([instance, data])=>(
                        Object.entries(data.data).map(([index, point], ind)=>(
                            <TableRow key={ ind }>
                                <TableCell colSpan={ 2 } className='category'>
                                    { testNames[instance.split('.')[0]] }
                                </TableCell>
                                <TableCell colSpan={1} className='value'>
                                    { instance.split('.')[0] === 'soundCollections' ? 
                                        `${point.average} dB` : 
                                        (point.result ? 
                                            point.result : 
                                            (point.posture ? point.posture : 'N/A')
                                        )
                                    }
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell>Location { ind }</TableCell>
                                <TableCell>{ `${instance.split('.')[1]} ${instance.split('.')[2]}` }</TableCell>
                            </TableRow>
                        ))
                    ))
                }
            </TableBody>
        </Table>
    </Box>
)


Row.propTypes = {
    row: PropTypes.shape({}).isRequired,
};

function ActivityTable(props){
    /* Nested Expandable Tables */
    const activityRow = props.activity;

    return(
            props.type === 0 ? (Object.entries(activityRow).map(([type, obj]) => (
                <Row key={ type } name={ type } row={ obj } />
            ))) : subtable(activityRow, 1)
    );
}

export default ActivityTable;