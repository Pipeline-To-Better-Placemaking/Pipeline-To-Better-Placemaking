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
    const { row } = props;
    //console.log(row.name);
    //console.log(row.history[0].value);
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
                    {row.name}
                </TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
            </TableRow>
            <TableRow className='subtables'>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={open} timeout='auto' unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table size='small' aria-label='activity'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell colSpan={2} className='value'>Value</TableCell>
                                        <TableCell colSpan={2} className='type'>Type</TableCell>
                                        <TableCell>Location</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Surveyor</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow, index) => (
                                        <TableRow key={index}>
                                            <TableCell colSpan={2} className='value'>
                                                {historyRow.value}
                                            </TableCell>
                                            <TableCell colSpan={2} className='type'>
                                                {historyRow.type}
                                            </TableCell>
                                            <TableCell>{historyRow.location}</TableCell>
                                            <TableCell>{historyRow.date}</TableCell>
                                            <TableCell>{historyRow.surveyor}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        history: PropTypes.arrayOf(
            PropTypes.shape({
                location: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
                surveyor: PropTypes.string.isRequired
            }),
        ).isRequired,
    }).isRequired,
};


function ActivityTable(props){
    /* Nested Expandable Tables */
    const activityRow = props.activity;

    return(
            activityRow.map(row => (
                <Row key={row.name} row={row} />
            ))
    );
}

export default ActivityTable;