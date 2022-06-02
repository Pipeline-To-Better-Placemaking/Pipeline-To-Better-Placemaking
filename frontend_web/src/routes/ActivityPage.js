import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import './routes.css';
import ActivityTable from '../components/ActivityTable';

function ActivityPage(){
    const sample = {
            'Absence of Order': [
                {
                    value: 'Bricks',
                    type: 'N/A',
                    location: 'location 2',
                    date: '2/2/22',
                    surveyor: 'Bob',
                }
            ],
            'Boundaries': [
                {
                    value: '',
                    type: 'Vertical',
                    location: 'location 3',
                    date: '2/2/22',
                    surveyor: 'Mark',
                },
                {
                    value: '10 sqft.',
                    type: 'Horizontal',
                    location: 'location 3',
                    date: '4/2/22',
                    surveyor: 'Sarah'
                }
            ],
            'Lighting': [
                {
                    value: 'N/A',
                    type: 'N/A',
                    location: 'all locations',
                    date: '3/1/22',
                    surveyor: 'Anne'
                }
            ],
            'Nature': [
                {
                    value: 'Animal',
                    type: 'Domestic',
                    location: 'location 1',
                    date: '4/4/22',
                    surveyor: 'Tim'
                },
                {
                    value: 'Animal',
                    type: 'Domestic',
                    location: 'location 2',
                    date: '4/4/22',
                    surveyor: 'Tim'
                },
                {
                    value: 'Animal',
                    type: 'Domestic',
                    location: 'location 3',
                    date: '4/4/22',
                    surveyor: 'Tim'
                },
                {
                    value: 'Animal',
                    type: 'Wild',
                    location: 'location 4',
                    date: '4/4/22',
                    surveyor: 'Tim'
                }
            ],
            'Sound': [
                {
                    value: '2dB',
                    type: 'Barking',
                    location: 'location 1',
                    date: '1/2/22',
                    surveyor: 'Sarah'
                },
                {
                    value: '80dB',
                    type: 'Music',
                    location: 'location 2',
                    date: '1/2/22',
                    surveyor: 'Sarah'
                },
                {
                    value: '10dB',
                    type: 'Conversation/Talking',
                    location: 'location 3',
                    date: '1/2/22',
                    surveyor: 'Sarah'
                },
                {
                    value: '5db',
                    type: 'Cars',
                    location: 'location 4',
                    date: '1/2/22',
                    surveyor: 'Sarah'
                }
            ],
        };

    return(
        <div id='activityPage'>
            <TableContainer component={Paper}>
                <Table aria-label='collapsible table'>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' colSpan={12}><Typography variant='h6'>Activity Results</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <ActivityTable type={0} activity={sample}/>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
} 
export default ActivityPage;