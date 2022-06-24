import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import * as XLSX from 'xlsx/xlsx.mjs';

import './routes.css';
import ActivityTable from '../components/ActivityTable';
import ActivityForm from '../components/ActivityForm';
import Button from '@mui/material/Button';

function ActivityPage(props){
    const drawers = props.drawers;

    const testNames = {
        stationary_collections: 'Humans in Place',
        moving_collections: 'Humans in Motion',
        order_collections: 'Absence of Order Locator',
        boundaries_collections: 'Spatial Boundaries',
        lighting_collections: 'Lighting Profile',
        nature_collections: 'Nature Prevalence',
        sound_collections: 'Acoustical Profile'
    };

    const exportData = (e) => {
        var workbook = XLSX.utils.book_new();
        var arr = [];
        Object.entries(drawers).forEach(([category, catobject])=>{
            Object.entries(catobject).forEach(([date, dateobject])=>{
                Object.entries(dateobject).forEach(([time, timeobject])=>{
                    Object.entries(timeobject.data).forEach(([index, dataobjects])=>{
                        var obj = {}
                        if(category === 'stationary_collections'){
                            obj = { Category: testNames[category], Date: date, Time: time, Point: index, Posture: dataobjects.posture, Age: dataobjects.age, Gender: dataobjects.gender, Activity: `${dataobjects.activity}` }
                        } else if(category === 'moving_collections'){
                            obj = { Category: testNames[category], Date: date, Time: time, Point: index, Mode: dataobjects.mode}
                        } else if(category === 'order_collections'){
                            obj = { Category: testNames[category], Date: date, Time: time, Point: index, Result: dataobjects.result, Type: dataobjects.type}
                        } else if(category === 'boundaries_collections'){
                            obj = { Category: testNames[category], Date: date, Time: time, Point: index, Kind: dataobjects.kind, Description: dataobjects.description, 'Value (ft/sq.ft)': dataobjects.value }
                        } else if(category === 'lighting_collections'){
                            obj = { Category: testNames[category], Date: date, Time: time, Point: index, Result: dataobjects.result}
                        } else if(category === 'nature_collections' && dataobjects.result === 'Water'){
                            obj = { Category: testNames[category], Date: date, Time: time, Point: index, Result: dataobjects.result, 'Value (ft/sq.ft)': dataobjects.value}
                        } else if(category === 'nature_collections'){
                            obj = { Category: testNames[category], Date: date, Time: time, Point: index, Result: dataobjects.result}
                        } else if(category === 'sound_collections'){
                            obj = { Category: testNames[category], Date: date, Time: time, Point: index, 'Average (dB)': dataobjects.average, 'Sound Type': `${dataobjects.sound_type}`, Source: dataobjects.source}
                        }

                        arr.push(obj);
                        console.log(arr);

                    })
                })
            })
        })

        var worksheet = XLSX.utils.json_to_sheet(arr);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'PlaceProject');
        XLSX.writeFileXLSX(workbook, 'PlaceProject.xlsx');
    }
    

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
                                <Button onClick={exportData}>Export Data</Button>
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