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
import ActivityForm from '../components/ActivityForm';

function ActivityPage(props){
    const drawers = props.drawers

    return(
        <div id='activityPage'>
            <ActivityForm />
            <TableContainer component={Paper}>
                <Table aria-label='collapsible table'>
                    <TableHead>
                        <TableRow>
                            <TableCell 
                                align='center' 
                                colSpan={12}
                            >
                                <Typography variant='h6'>Activity Results</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* type 0 is the expandable/nested tables for the Activity Project Page */}
                        <ActivityTable type={0} activity={drawers}/>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
} 
export default ActivityPage;