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

import {testNames} from '../functions/HelperFunctions';

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
                    { testNames(name) }
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
                    <TableCell>{ type === 0 ? 'Location' : 'Type(s)/Source(s)' }</TableCell>
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
                                        {object.average ? `${object.average} dB` : (object.value && object.kind === 'Constructed' ? `${object.value} ft.` : (object.value && object.kind ? `${object.value} sq.ft.` : (object.posture ? object.posture : (object.mode ? object.mode : ''))))}
                                    </TableCell>
                                    <TableCell colSpan={ 2 } className='type'>
                                        {object.average ? `${object.sound_type}` : (object.kind ? (`${object.kind} (${object.description})`) : (object.age ? `${object.age} ${object.gender} (${object.activity})` : 'N/A'))}
                                    </TableCell>
                                    <TableCell>Location { index }</TableCell>
                                    <TableCell>{ date } { time }</TableCell>
                                    <TableCell>{ tObj.researcher }</TableCell>
                                </TableRow>
                            ))
                        ))
                    )) : Object.entries(row).map(([instance, data])=>(
                        Object.entries(data.data).map(([index, point], ind)=>(
                            <TableRow key={ ind }>
                                <TableCell colSpan={ 2 } className='category'>
                                    { testNames(instance.split('.')[0]) }
                                </TableCell>
                                <TableCell colSpan={1} className='value'>
                                    {
                                        instance.split('.')[0] === 'sound_maps' ? `${point.average} dB` : (point.value && point.kind === 'Constructed' ? `${point.value} ft.` : (point.value && point.kind ? `${point.value} sq.ft.` : (point.posture ? point.posture : (point.mode ? `${point.mode}` : 'N/A'))))
                                    }
                                </TableCell>
                                <TableCell>
                                    {   
                                        point.average ? `${point.sound_type}` : (point.kind ? (`${point.kind} (${point.description})`) : (point.age ? `${point.age} ${point.gender} (${point.activity})` : 'N/A'))
                                    }
                                </TableCell>
                                <TableCell>Location { ind+1 }</TableCell>
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

function ActivityTable(props) {
    /* Nested Expandable Tables */
    const activityRow = props.activity;

    return(
            props.type === 0 ? (Object.entries(activityRow).map(([type, obj]) => (
                <Row key={ type } name={ type } row={ obj } />
            ))) : subtable(activityRow, 1)
    );
}

export default ActivityTable;