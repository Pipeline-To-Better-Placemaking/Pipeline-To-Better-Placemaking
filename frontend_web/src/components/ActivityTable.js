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

function Row(props) {
    const row = props.row;
    const name = props.name;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow className='categories' sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell>
                    <IconButton
                        aria-label='expand row'
                        size='small'
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell className='catTitle' component='th' scope='row'>
                    {name}
                </TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
            </TableRow>
            <TableRow className='subtables'>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={open} timeout='auto' unmountOnExit>
                        {subtable(row, 0)}
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const subtable = (row, type) => (    
    <Box sx={{ margin: 1 }}>
        <Table size='small' aria-label='activity'>
            <TableHead>
                <TableRow>
                    <TableCell colSpan={2} className='value'>{type === 0 ? 'Value' : 'Category'}</TableCell>
                    <TableCell colSpan={type === 0 ? 2 : 1} className='type'>{type === 0 ? 'Type' : 'Value'}</TableCell>
                    <TableCell>{type === 0 ? 'Location' : 'Type'}</TableCell>
                    <TableCell>{type === 0 ? 'Date' : 'Location'}</TableCell>
                    <TableCell>{type === 0 ? 'Surveyor' : 'Date'}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {type === 0 ? row.map((object, index) => (
                    <TableRow key={index}>
                        <TableCell colSpan={2} className='value'>
                            {object.value}
                        </TableCell>
                        <TableCell colSpan={2} className='type'>
                            {object.type}
                        </TableCell>
                        <TableCell>{object.location}</TableCell>
                        <TableCell>{object.date}</TableCell>
                        <TableCell>{object.surveyor}</TableCell>
                    </TableRow>
                )) : Object.entries(row).map(([instance, array])=>(
                    array.map((point, index)=>(
                        <TableRow key={index}>
                            <TableCell colSpan={2} className='value'>
                                {instance.split('.')[0]}
                            </TableCell>
                            <TableCell colSpan={1} className='type'>
                                {instance.split('.')[0] === 'soundCollections' ? `${point.average} dB` : (point.result ? point.result : 'N/A')}
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell>Location {index}</TableCell>
                            <TableCell>{`${instance.split('.')[1]} ${instance.split('.')[2]}`}</TableCell>
                        </TableRow>
                    ))
                ))}
            </TableBody>
        </Table>
    </Box>
)

Row.propTypes = {
    row: PropTypes.arrayOf(
        PropTypes.shape({
            location: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            surveyor: PropTypes.string.isRequired
        }),
    ).isRequired,
};


function ActivityTable(props){
    /* Nested Expandable Tables */
    const activityRow = props.activity;

    return(
            props.type === 0 ? (Object.entries(activityRow).map(([type, array]) => (
                <Row key={type} name={type} row={array} />
            ))) : subtable(activityRow, 1)
    );
}

export default ActivityTable;