import * as React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
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
import axios from '../api/axios';
import './routes.css';
import ActivityTable from '../components/ActivityTable';
import ActivityForm from '../components/ActivityForm';
import { testNames } from '../functions/HelperFunctions';

export default function ActivityPage(props) {
    // Props from MapPage.js
    const drawers = props.drawers;
    const loc = useLocation();
    const nav = useNavigate();

    const [message, setMessage] = React.useState('');
    const deleteResp = React.useRef(null);
    var selectedID = '';
    var selectedType = '';

    const openConfirmation = (cat, title, id) => (e) => {
        // Opens confirmation window for deleting a project
        const popup = document.getElementById('deleteWindow');
        const inner = document.getElementById('popUpText');
        selectedID = id;
        selectedType = cat;
        inner.innerHTML = '';
        inner.innerHTML = `<h6>Are you sure you would like to delete '${title}' activity?<br/> This cannot be undone.</h6>`
        popup.style.display = 'flex';
    }

    const closeWindow = (e) => {
        e.preventDefault();
        console.log('close');
        const popup = document.getElementById('deleteWindow');
        const inner = document.getElementById('popUpText');
        popup.style.display = 'none';
        inner.innerHTML = '';
        selectedID = '';
        selectedType = '';
        setMessage('');
        deleteResp.current.style.display = 'none';
    }

    // Called to export a workbook with all activity data
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
                        } else if (category === 'sound_maps') {
                            obj = { Category: testNames(category), Date: date, Time: time, Point: index, 'Average (dB)': dataobjects.average, 'Sound Types/Sources': `${dataobjects.sound_type}` }
                            sound.push(obj);
                        } else if (category === 'boundaries_maps') {
                            obj = { Category: testNames(category), Date: date, Time: time, Point: index, Kind: dataobjects.kind, Description: dataobjects.description, Purpose: `${dataobjects.purpose}`, 'Value (ft/sq.ft)': dataobjects.value }
                            boundaries.push(obj);
                        } else if(category === 'order_maps') {
                            dataobjects.points.forEach((point, ind)=>{
                                obj = { Category: testNames(category), Date: date, Time: time, Point: ind, Kind: point.kind, Description: point.description }
                                order.push(obj);
                            })
                        } else if(category === 'light_maps') {
                            dataobjects.points.forEach((point, ind) => {
                                obj = { Category: testNames(category), Date: date, Time: time, Point: ind, Description: point.light_description }
                                lighting.push(obj);
                            })
                        } else if (category === 'nature_maps') {
                            Object.entries(dataobjects).forEach(([type, pointArr], ind0)=>{
                                if(type === 'weather'){
                                    obj = { Category: testNames(category), Date: date, Time: time, Point: 'N/A', 'Weather (temp/sky)': `${pointArr.temperature}`, 'Kind/Value (ft/sq.ft)': '', Description: `${pointArr.description}` }
                                    nature.push(obj);
                                } else if(type === 'water'){
                                    pointArr.forEach((natureArea, ind1)=>{
                                        obj = { Category: testNames(category), Date: date, Time: time, Point: ind1, 'Weather (temp/sky)': '', 'Kind/Area (ft/sq.ft)': `${natureArea.area}`, Description: `${natureArea.description}` }
                                        nature.push(obj);
                                    })
                                } else if(type === 'animal') {
                                    pointArr.forEach((natureArea, ind1) => {
                                        obj = { Category: testNames(category), Date: date, Time: time, Point: ind1, 'Weather (temp/sky)': '', 'Kind/Area (ft/sq.ft)': `${natureArea.kind}`, Description: `${natureArea.description}` }
                                        nature.push(obj);
                                    })
                                }
                            })
                        }
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
        XLSX.writeFileXLSX(workbook, `${props.title}.xlsx`);

        // CSV universal Format, in case this is preferred
        //XLSX.writeFileXLSX(workbook, 'PlaceProject.csv');
    }

    const deleteActivity = async (e) => {
        try {
            const response = await axios.delete(`/${selectedType}/${selectedID}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${loc.state.userToken.token}`
                },
                withCredentials: true
            });

            closeWindow(e);
            nav('../activities', { replace: true, state: { team: loc.state.team, project: loc.state.project, userToken: loc.state.userToken } });

        } catch (error) {
            console.log('ERROR: ', error);
            setMessage(error.response.data?.message);
            deleteResp.current.style.display = 'inline-block';
            return;
        }
    }

    return(
        <div id='activityPage'>
            <ActivityForm/>
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
                        <ActivityTable type={ 0 } activity={ drawers } open={openConfirmation}/>
                    </TableBody>
                </Table>
            </TableContainer>
            <div id='deleteWindow' style={{ display: 'none', position: 'fixed', justifyContent: 'center', alignItems: 'center' }}>
                <div id='popUpBlock'>
                    <span ref={deleteResp} style={{ display: 'none', color: 'red' }}>{message}</span>
                    <div id='popUpText'></div>
                    <Button id='deleteButton' onClick={deleteActivity}>Confirm</Button>
                    <Button id='cancelButton' onClick={closeWindow}>Cancel</Button>
                </div>
            </div>
        </div>
    );
}