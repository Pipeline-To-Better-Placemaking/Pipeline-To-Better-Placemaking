import * as React from 'react';
import Button from '@mui/material/Button';
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
import { testNames } from '../functions/HelperFunctions';

function ActivityPage(props) {
    const drawers = props.drawers;

    const exportData = (e) => {
        var workbook = XLSX.utils.book_new();
        var stationary = [];
        var moving = [];
        var order = [];
        var boundaries = [];
        var lighting = [];
        var nature = [];
        var sound = [];

        // Loop through Project Data
        Object.entries(drawers).forEach(([category, catobject])=>{
            Object.entries(catobject).forEach(([date, dateobject])=>{
                Object.entries(dateobject).forEach(([time, timeobject])=>{
                    Object.entries(timeobject.data).forEach(([index, dataobjects])=>{
                        var obj = {}
                        // Create an object based on category and append it to its related array
                        if(category === 'stationary_maps') {
                            obj = { Category: testNames(category), Date: date, Time: time, Point: index, Posture: dataobjects.posture, Age: dataobjects.age, Gender: dataobjects.gender, Activity: `${dataobjects.activity}` };
                            stationary.push(obj);
                        } else if(category === 'moving_maps') {
                            obj = { Category: testNames(category), Date: date, Time: time, Point: index, Mode: dataobjects.mode }
                            moving.push(obj);
                        } else if(category === 'order_maps') {
                            obj = { Category: testNames(category), Date: date, Time: time, Point: index, Result: dataobjects.result, Type: dataobjects.type }
                            order.push(obj);
                        } else if(category === 'boundaries_maps') {
                            obj = { Category: testNames(category), Date: date, Time: time, Point: index, Kind: dataobjects.kind, Description: dataobjects.description, 'Value (ft/sq.ft)': dataobjects.value }
                            boundaries.push(obj);
                        } else if(category === 'lighting_maps') {
                            obj = { Category: testNames(category), Date: date, Time: time, Point: index, Result: dataobjects.result }
                            lighting.push(obj);
                        } else if(category === 'nature_maps' && dataobjects.result === 'Water') {
                            obj = { Category: testNames(category), Date: date, Time: time, Point: index, Result: dataobjects.result, 'Value (ft/sq.ft)': dataobjects.value }
                            nature.push(obj);
                        } else if(category === 'nature_maps') {
                            obj = { Category: testNames(category), Date: date, Time: time, Point: index, Result: dataobjects.result }
                            nature.push(obj);
                        } else if(category === 'sound_maps') {
                            obj = { Category: testNames(category), Date: date, Time: time, Point: index, 'Average (dB)': dataobjects.average, 'Sound Type': `${dataobjects.sound_type}`, Source: dataobjects.source}
                            sound.push(obj);
                        }
                        // console.log(arr);
                    })
                })
            })
        })

        // Create new worksheets for each category
        var worksheetstat = XLSX.utils.json_to_sheet(stationary);
        var worksheetmov = XLSX.utils.json_to_sheet(moving);
        var worksheetord = XLSX.utils.json_to_sheet(order);
        var worksheetbounds = XLSX.utils.json_to_sheet(boundaries);
        var worksheetlight = XLSX.utils.json_to_sheet(lighting);
        var worksheetnat = XLSX.utils.json_to_sheet(nature);
        var worksheetsound = XLSX.utils.json_to_sheet(sound);

        // Append worksheets to workbook and name them
        XLSX.utils.book_append_sheet(workbook, worksheetord, 'AbsenceOfOrder');
        XLSX.utils.book_append_sheet(workbook, worksheetsound, 'AcousticalProfile');
        XLSX.utils.book_append_sheet(workbook, worksheetbounds, 'SpatialBoundaries');
        XLSX.utils.book_append_sheet(workbook, worksheetlight, 'LightingProfile');
        XLSX.utils.book_append_sheet(workbook, worksheetnat, 'NaturePrevalence');
        XLSX.utils.book_append_sheet(workbook, worksheetmov, 'PeopleInMotion');
        XLSX.utils.book_append_sheet(workbook, worksheetstat, 'PeopleInPlace');
        
        // Excel Format
        XLSX.writeFileXLSX(workbook, 'PlaceProject.xlsx');

        // CSV universal Format
        //XLSX.writeFileXLSX(workbook, 'PlaceProject.csv');
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
                                colSpan={ 12 }
                            >
                                <Typography variant='h6'>Activity Results</Typography>
                                <Button onClick={ exportData }>Export Data</Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* type 0 is the expandable/nested tables for the Activity Project Page */}
                        <ActivityTable type={ 0 } activity={ drawers }/>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
} 
export default ActivityPage;