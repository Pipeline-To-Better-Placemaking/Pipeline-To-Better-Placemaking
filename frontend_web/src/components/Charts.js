import * as React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis, Tooltip, Legend, PieChart, Pie } from 'recharts';
import PetsIcon from '@mui/icons-material/Pets';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CommuteIcon from '@mui/icons-material/Commute';
import PeopleIcon from '@mui/icons-material/People';
import WavesIcon from '@mui/icons-material/Waves';
import AirIcon from '@mui/icons-material/Air';
import { Area, testNames } from '../functions/HelperFunctions';

export default function Charts(props) {
    const width = 280;
    const height = 200;
    const data = props.data;
    const selection = props.selection;
    const type = props.type;
    const projectArea = Area(props.projArea);

    const boundsColor = {
        Constructed: '#FF00E5',
        Shelter: '#FFA64D',
        Material: '#00FFC1',
        Unmarked: '#C4C4C4'
    };

    const natureColor = {
        Water: '#2578C5',
        Vegetation: '#BEFF05',
        Animals: '#9C4B00',
        None: '#C4C4C4'
    }

    const stationaryColor = {
        Sitting: '#ff0000',
        Standing: '#0000ff',
        Laying: '#ffff00',
        Squatting: '#008000'
    }

    const movingColor = {
        Walking: '#0000FF',
        Running: '#FF0000',
        Swimming: '#FFFF00',
        'Activity on Wheels': '#008000',
        'Handicap Assisted Wheels': '#FFA500'
    }

    const lightColor = {
        Rhythmic: '#FFE600',
        Building: '#FF9900',
        Task: '#FF00E5'
    }

    const orderColor = {
        Behavior: '#FF9900',
        Maintenance: '#FFD800'
    }

    const cat = selection.split('.');

    const soundIcons ={
        Animals: <PetsIcon/>,
        Music: <MusicNoteIcon/>,
        Traffic: <CommuteIcon/>,
        'People Sounds': <PeopleIcon/>,
        'Water Feature': <WavesIcon/>,
        Wind: <AirIcon/>,
        Other: null
    }

    const multiSoundCharts = (data) => {
        var frequent = [];
        var high = {};
        var low = {};
        var measurements = [];
        var indexes = [0];

        var indexing = [
            'Animals',
            'Music',
            'Traffic',
            'People Sounds',
            'Water Feature',
            'Wind',
            'Other'
        ];

        Object.entries(data).map(([dateTime, arr])=>(
            arr.forEach((obj, index)=>{
                measurements.push(obj);
                Object.entries(obj).forEach(([key, dataVal])=>{
                    console.log(obj);
                    if (key === 'decibel_1' || key === 'decibel_2' || key === 'decibel_3' || key === 'decibel_4' || key === 'decibel_5') {
                        if (key === 'decibel_1') {
                            high = dataVal
                            low = dataVal
                            frequent.push(dataVal);
                        } else {
                            if (dataVal.recording > high.recording) {
                                high = dataVal;
                            } else if (dataVal.recording < high.recording) {
                                low = dataVal;
                            }
                        }

                        if (dataVal.predominant_type === 'Animals') {
                            frequent[0] += 1;
                        } else if (dataVal.predominant_type === 'Music') {
                            frequent[1] += 1;
                        } else if (dataVal.predominant_type === 'Traffic') {
                            frequent[2] += 1;
                        } else if (dataVal.predominant_type === 'People Sounds') {
                            frequent[3] += 1;
                        } else if (dataVal.predominant_type === 'Water Feature') {
                            frequent[4] += 1;
                        } else if (dataVal.predominant_type === 'Wind') {
                            frequent[5] += 1;
                        } else {
                            frequent[6] += 1;
                        }
                    }
                })
            })
        ))

        frequent.forEach((value, index) => {
            if (value > frequent(indexes[0])) {
                indexes = []
                indexes = [index];
            } else if (value === frequent(indexes[0])) {
                indexes.push(index);
            }
        })

        console.log(measurements);
        return(
            <div className='Charts'>
                <div style={{ fontSize: 'larger' }}>High and Low</div>
                Highest Recorded Volume: {high.recording} dB
                <br />
                Predominant Source:<br />
                {soundIcons[high.predominant_type] ? soundIcons[high.predominant_type] : soundIcons.Other}<br /> {high.predominant_type}<br />
                Lowest Recorded Volume: {low.recording} dB
                <br />
                Predominant Source:<br />
                {soundIcons[low.predominant_type] ? soundIcons[low.predominant_type] : soundIcons.Other}<br /> {low.predominant_type}
                <div style={{ fontSize: 'larger' }}>Most Frequent Reported Source(s)</div>
                {indexes.map((value) => (`${indexing[value]}`))}
                <br />
                <BarChart width={width} height={height} data={measurements}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis label={{ value: 'Decibels', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={'average'} fill='#B073FF' />
                </BarChart>
            </div>
        );
    }

    const soundBarChart = (data) => {
        var frequent = [0, 0, 0, 0, 0, 0, 0];
        var indexes = [0];
        var high = {};
        var low = {};

        var indexing = [
            'Animals',
            'Music',
            'Traffic',
            'People Sounds',
            'Water Feature',
            'Wind',
            'Other'
        ]

        data.map((obj)=>(
            Object.entries(obj).forEach(([key, dataVal], index)=>{
                if(key === 'decibel_1' || key === 'decibel_2' || key === 'decibel_3' || key === 'decibel_4' || key === 'decibel_5'){
                    if(key === 'decibel_1'){
                        high = dataVal
                        low = dataVal
                        frequent.push(dataVal);
                    } else {
                        if(dataVal.recording > high.recording){
                            high = dataVal;
                        } else if (dataVal.recording < high.recording){
                            low = dataVal;
                        }
                    }

                    if (dataVal.predominant_type === 'Animals') {
                        frequent[0] += 1;
                    } else if (dataVal.predominant_type === 'Music') {
                        frequent[1] += 1;
                    } else if (dataVal.predominant_type === 'Traffic') {
                        frequent[2] += 1;
                    } else if (dataVal.predominant_type === 'People Sounds') {
                        frequent[3] += 1;
                    } else if (dataVal.predominant_type === 'Water Feature') {
                        frequent[4] += 1;
                    } else if (dataVal.predominant_type === 'Wind') {
                        frequent[5] += 1;
                    } else {
                        frequent[6] += 1;
                    }
                }
            })
        ))

        frequent.forEach((value, index)=>{
            if(value > frequent(indexes[0])){
                indexes = []
                indexes = [index];
            } else if (value === frequent(indexes[0])){
               indexes.push(index);
            }
        })

        return(
            <div className='Charts'>
                <div style={{ fontSize: 'larger' }}>High and Low</div>
                Highest Recorded Volume: {high.recording} dB
                <br/>
                Predominant Source:<br/>
                {soundIcons[high.predominant_type] ? soundIcons[high.predominant_type] : soundIcons.Other}<br/> {high.predominant_type}<br/>
                Lowest Recorded Volume: {low.recording} dB
                <br />
                Predominant Source:<br/>
                {soundIcons[low.predominant_type] ? soundIcons[low.predominant_type] : soundIcons.Other}<br/> {low.predominant_type}
                <div style={{ fontSize: 'larger' }}>Most Frequent Reported Source(s)</div>
                {indexes.map((value)=>(`${indexing[value]}`))}
                <br/>
                <BarChart width={ width } height={ height } data={ data }>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis label={{ value: 'Decibels', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={'average'} fill='#B073FF' />
                </BarChart>
            </div>
        );
    };

    const multiStationary = (data) => {
        var standing = 0, laying = 0, squatting = 0, sitting = 0;
        var kid = 0, teen = 0, yAdult = 0, mAdult = 0, senior = 0;
        var male = 0, female = 0;
        var socializing = 0, waiting = 0, recreation = 0, eating = 0, solitary = 0;

        for (const [dateTime, resultArr] of Object.entries(data)) {
            for(const index1 of resultArr){
                for (const obj of index1) {
                    if (obj.posture === 'Standing') {
                        standing++;
                    } else if (obj.posture === 'Laying') {
                        laying++;
                    } else if (obj.posture === 'Squatting') {
                        squatting++;
                    } else {
                        sitting++;
                    }

                    if (obj.age === '0-14') {
                        kid++;
                    } else if (obj.age === '15-21') {
                        teen++;
                    } else if (obj.age === '22-30') {
                        yAdult++;
                    } else if (obj.age === '30-50') {
                        mAdult++;
                    } else {
                        senior++;
                    }

                    if (obj.gender === 'Female') {
                        female++;
                    } else {
                        male++;
                    }

                    if (obj.activity.includes('Socializing')) {
                        socializing++;
                    }
                    if (obj.activity.includes('Waiting')) {
                        waiting++;
                    }
                    if (obj.activity.includes('Recreation')) {
                        recreation++;
                    }
                    if (obj.activity.includes('Eating')) {
                        eating++;
                    }
                    if (obj.activity.includes('Solitary')) {
                        solitary++;
                    }
                }
            }
        }

        var posture = [{ posture: 'Sitting', count: sitting }, { posture: 'Standing', count: standing }, { posture: 'Laying', count: laying }, { posture: 'Squatting', count: squatting }];
        var age = [{ age: '0-14', count: kid }, { age: '15-21', count: teen }, { age: '22-30', count: yAdult }, { age: '30-50', count: mAdult }, { age: '50+', count: senior }];
        var gender = [{ gender: 'Male', count: male }, { gender: 'Female', count: female }]
        var activity = [{ activity: 'Socializing', count: socializing }, { activity: 'Waiting', count: waiting }, { activity: 'Recreation', count: recreation }, { activity: 'Eating', count: eating }, { activity: 'Solitary', count: solitary }];

        return (
            <div className='Charts'>
                <div style={{ fontSize: 'larger' }}>Posture</div>
                <BarChart width={width} height={height} data={posture}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='posture' />
                    <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey={'count'} >
                        {posture.map((entry, index) => (
                            <Cell key={`cell-${index}`} stroke={'#000000'} fill={stationaryColor[entry.posture]} fillOpacity={0.7} />
                        ))}
                    </Bar>
                </BarChart>
                <div style={{ fontSize: 'larger' }}>Age</div>
                <BarChart width={width} height={height} data={age}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='age' />
                    <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey={'count'} fill='#636262' fillOpacity={0.75} />
                </BarChart>
                <div style={{ fontSize: 'larger' }}>Gender</div>
                <BarChart width={width} height={height} data={gender}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='gender' />
                    <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey={'count'} fill='#636262' fillOpacity={0.75} />
                </BarChart>
                <div style={{ fontSize: 'larger' }}>Activity</div>
                <BarChart width={width} height={height} data={activity}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='activity' />
                    <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey={'count'} fill='#636262' fillOpacity={0.75} />
                </BarChart>
                <br />
                <div >
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: stationaryColor['Sitting'] }}>&nbsp;&nbsp;</div>&nbsp;Sitting</div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: stationaryColor['Standing'] }}>&nbsp;&nbsp;</div>&nbsp;Standing</div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: stationaryColor['Laying'] }}>&nbsp;&nbsp;</div>&nbsp;Swimming</div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: stationaryColor['Squatting'] }}>&nbsp;&nbsp;</div>&nbsp;Squatting</div>
                </div>
            </div>
        )
    }

    // posture, age, gender, activity
    const stationaryBarCharts = (data) => {
        var standing = 0, laying = 0, squatting = 0, sitting = 0;
        var kid = 0, teen = 0, yAdult = 0, mAdult = 0, senior = 0;
        var male = 0, female = 0;
        var socializing = 0, waiting = 0, recreation = 0, eating = 0, solitary = 0;

        for (const obj of Object.values(data)) {
            if (obj.posture === 'Standing') {
                standing++;
            } else if (obj.posture === 'Laying') {
                laying++;
            } else if (obj.posture === 'Squatting') {
                squatting++;
            } else {
                sitting++;
            }

            if (obj.age === '0-14') {
                kid++;
            } else if (obj.age === '15-21') {
                teen++;
            } else if (obj.age === '22-30') {
                yAdult++;
            } else if (obj.age === '30-50') {
                mAdult++;
            } else {
                senior++;
            }

            if (obj.gender === 'Female') {
                female++;
            } else {
                male++;
            }

            if (obj.activity.includes('Socializing')) {
                socializing ++;
            }
            if (obj.activity.includes('Waiting')) {
                waiting ++;
            }
            if (obj.activity.includes('Recreation')) {
                recreation ++;
            }
            if(obj.activity.includes('Eating')) {
                eating ++;
            } 
            if (obj.activity.includes('Solitary')) {
                solitary ++;
            }
        };

        var posture = [{ posture: 'Sitting', count: sitting }, { posture: 'Standing', count: standing }, { posture: 'Laying', count: laying }, { posture: 'Squatting', count: squatting }];
        var age = [{ age: '0-14', count: kid }, { age: '15-21', count: teen }, { age: '22-30', count: yAdult }, { age: '30-50', count: mAdult }, { age: '50+', count: senior }];
        var gender =[{ gender: 'Male', count: male }, { gender: 'Female', count: female }];
        var activity = [{ activity: 'Socializing', count: socializing }, { activity: 'Waiting', count: waiting }, { activity: 'Recreation', count: recreation }, { activity: 'Eating', count: eating }, { activity: 'Solitary', count: solitary }];

        return( 
            <div className='Charts'>
                <div style={{ fontSize: 'larger' }}>Posture</div>
                <BarChart width={ width } height={ height } data={ posture }>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='posture' />
                    <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey={'count'} >
                        { posture.map((entry, index) => (
                            <Cell key={ `cell-${index}` } stroke={ '#000000' } fill={ stationaryColor[entry.posture] } fillOpacity={ 0.7 } />
                        )) }
                    </Bar>
                </BarChart>
                <div style={{ fontSize: 'larger' }}>Age</div>
                <BarChart width={ width } height={ height } data={ age }>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='age' />
                    <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey={ 'count' } fill='#636262' fillOpacity={ 0.75 } />
                </BarChart>
                <div style={{ fontSize: 'larger' }}>Gender</div>
                <BarChart width={ width } height={ height } data={ gender }>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='gender' />
                    <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey={ 'count' } fill='#636262' fillOpacity={ 0.75 } />
                </BarChart>
                <div style={{ fontSize: 'larger' }}>Activity</div>
                <BarChart width={ width } height={ height } data={ activity }>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='activity' />
                    <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey={ 'count' } fill='#636262' fillOpacity={ 0.75 } />
                </BarChart>
                <br />
                <div >
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: stationaryColor['Sitting'] }}>&nbsp;&nbsp;</div>&nbsp;Sitting</div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: stationaryColor['Standing'] }}>&nbsp;&nbsp;</div>&nbsp;Standing</div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: stationaryColor['Laying'] }}>&nbsp;&nbsp;</div>&nbsp;Swimming</div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: stationaryColor['Squatting'] }}>&nbsp;&nbsp;</div>&nbsp;Squatting</div>
                </div>
            </div>
        );
    };

    const multiMoving = (data) => {
        var running = 0, walking = 0, swimming = 0, onwheels = 0, handicap = 0;

        for (const [dateTime, resultArr] of Object.entries(data)) {
            for (const index1 of resultArr) {
                for (const obj of index1) {
                    if (obj.mode === 'Walking') {
                        walking++;
                    } else if (obj.mode === 'Running') {
                        running++;
                    } else if (obj.mode === 'Swimming') {
                        swimming++;
                    } else if (obj.mode === 'Activity on Wheels') {
                        onwheels++;
                    } else if (obj.mode === 'Handicap Assisted Wheels') {
                        handicap++;
                    }
                }
            }
        }

        var mode = [{ mode: 'Walking', count: walking }, { mode: 'Running', count: running }, { mode: 'Swimming', count: swimming }, { mode: 'Activity on Wheels', count: onwheels }, { mode: 'Handicap Assisted Wheels', count: handicap }];
        return (
            <div className='Charts'>
                <BarChart width={width} height={height} data={mode}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='mode' />
                    <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey={'count'} fill='#636262'>
                        {mode.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={movingColor[entry.mode]} fillOpacity={0.8} />
                        ))}
                    </Bar>
                </BarChart>
                <br />
                <div >
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: movingColor['Walking'] }}>&nbsp;&nbsp;</div>&nbsp;Walking</div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: movingColor['Running'] }}>&nbsp;&nbsp;</div>&nbsp;Running</div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: movingColor['Swimming'] }}>&nbsp;&nbsp;</div>&nbsp;Swimming</div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: movingColor['Activity on Wheels'] }}>&nbsp;&nbsp;</div>&nbsp;Activity on Wheels</div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: movingColor['Handicap Assisted Wheels'] }}>&nbsp;&nbsp;</div>&nbsp;Handicap Assisted Wheels</div>
                </div>
            </div>
        );
    }

    const movingBarChart = (data) => {
        var running = 0, walking = 0, swimming = 0, onwheels = 0, handicap = 0;

        for (const obj of Object.values(data)) {
            if (obj.mode === 'Walking') {
                walking++;
            } else if (obj.mode === 'Running') {
                running++;
            } else if (obj.mode === 'Swimming') {
                swimming++;
            } else if (obj.mode === 'Activity on Wheels') {
                onwheels++;
            } else if (obj.mode === 'Handicap Assisted Wheels') {
                handicap++;
            }
        }

        var mode = [{ mode: 'Walking', count: walking }, { mode: 'Running', count: running }, { mode: 'Swimming', count: swimming }, { mode: 'Activity on Wheels', count: onwheels }, { mode: 'Handicap Assisted Wheels', count: handicap }];
        return(
            <div className='Charts'>
                <BarChart width={ width } height={ height } data={ mode }>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='mode' />
                    <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey={ 'count' } fill='#636262'>
                        { mode.map((entry, index) => (
                            <Cell key={ `cell-${index}` } fill={ movingColor[entry.mode] } fillOpacity={ 0.8 } />
                        )) }
                    </Bar>
                </BarChart>
                <br />
                <div >
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: movingColor['Walking'] }}>&nbsp;&nbsp;</div>&nbsp;Walking</div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: movingColor['Running'] }}>&nbsp;&nbsp;</div>&nbsp;Running</div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: movingColor['Swimming'] }}>&nbsp;&nbsp;</div>&nbsp;Swimming</div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: movingColor['Activity on Wheels'] }}>&nbsp;&nbsp;</div>&nbsp;Activity on Wheels</div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: movingColor['Handicap Assisted Wheels'] }}>&nbsp;&nbsp;</div>&nbsp;Handicap Assisted Wheels</div>
                </div>
            </div>
        );
    }

    const multiLight = (data) => {
        var rhythmic = 0, building = 0, task = 0;

        for (const arr of Object.values(data)) {
            for(const arr1 of arr){
                for (const obj of arr1) {
                    for(const point of obj.points){
                        if (point.light_description === 'Rhythmic') {
                            rhythmic++;
                        } else if (point.light_description === 'Building') {
                            building++;
                        } else {
                            task++;
                        }
                    }
                }
            }
        }
        var lights = [{ type: 'Building', count: building }, { type: 'Rhythmic', count: rhythmic }, { type: 'Task', count: task }];
        return (
            <div className='Charts'>
                <BarChart width={width} height={height} data={lights}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='type' />
                    <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey={'count'} fill='#636262'>
                        {lights.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={lightColor[entry.type]} fillOpacity={0.8} />
                        ))}
                    </Bar>
                </BarChart>
                <br />
                <div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: lightColor['Building'] }}>&nbsp;&nbsp;</div>&nbsp; Building</div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: lightColor['Rhythmic'] }}>&nbsp;&nbsp;</div>&nbsp; Rhythmic</div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: lightColor['Task'] }}>&nbsp;&nbsp;</div>&nbsp; Task</div>
                </div>
            </div>
        );
    }

    const lightingCharts = (data) => {
        var rhythmic = 0, building = 0, task = 0;

        for(const lObj of Object.values(data)){
            for(const point of lObj.points){
                if(point.light_description === 'Rhythmic'){
                    rhythmic++;
                } else if (point.light_description === 'Building'){
                    building++;
                } else {
                    task++;
                }
            }
        }

        var lights = [{ type: 'Building', count: building }, { type: 'Rhythmic', count: rhythmic }, { type: 'Task', count: task }];
        return(
            <div className='Charts'>
                <BarChart width={width} height={height} data={lights}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='type' />
                    <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey={'count'} fill='#636262'>
                        {lights.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={lightColor[entry.type]} fillOpacity={0.8} />
                        ))}
                    </Bar>
                </BarChart>
                <br />
                <div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: lightColor['Building'] }}>&nbsp;&nbsp;</div>&nbsp; Building</div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: lightColor['Rhythmic'] }}>&nbsp;&nbsp;</div>&nbsp; Rhythmic</div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: lightColor['Task'] }}>&nbsp;&nbsp;</div>&nbsp; Task</div>
                </div>
            </div>
        )
    }

    const multiOrderCharts = (data) => {
        var behavior = 0, maintenance = 0;
        for(const arr of Object.values(data)){
            for(const subarr of arr){
                for(const terArr of subarr){
                    for(const point of terArr.points){
                        if (point.kind === 'Maintenance') {
                            maintenance++;
                        } else {
                            behavior++;
                        }
                    }
                }
            }
        }

        var order = [{ type: 'Maintenance', total: maintenance }, { type: 'Behavior', total: behavior }];
        return (
            <div className='Charts'>
                <BarChart width={width} height={height} data={order}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='type' />
                    <YAxis label={{ value: 'Total', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey={'total'} fill='#636262'>
                        {order.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={orderColor[entry.type]} fillOpacity={0.8} />
                        ))}
                    </Bar>
                </BarChart>
                <br />
                <div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: orderColor['Behavior'] }}>&nbsp;&nbsp;</div>&nbsp; Behavior</div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: orderColor['Maintenance'] }}>&nbsp;&nbsp;</div>&nbsp; Maintenance</div>
                </div>
            </div>
        )
    }

    const orderCharts = (data) => {
        var behavior = 0, maintenance = 0;

        for(const obj of data){
            for(const point of obj.points){
                if(point.kind === 'Maintenance'){
                    maintenance++;
                } else {
                    behavior++;
                }
            }
        }

        var order = [{ type: 'Maintenance', count: maintenance }, { type: 'Behavior', count: behavior }];
        return (
            <div className='Charts'>
                <BarChart width={width} height={height} data={order}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='type' />
                    <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey={'count'} fill='#636262'>
                        {order.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={orderColor[entry.type]} fillOpacity={0.8} />
                        ))}
                    </Bar>
                </BarChart>
                <br />
                <div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: orderColor['Behavior'] }}>&nbsp;&nbsp;</div>&nbsp; Behavior</div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: orderColor['Maintenance'] }}>&nbsp;&nbsp;</div>&nbsp; Maintenance</div>
                </div>
            </div>
        )
    }

    const multiBoundaryCharts = (data) => {
        var constructed = [];
        var shelter = 0;
        var material = 0;

        for (const arr of  Object.values(data)) {
            for(const ind0 in arr){
                for(const index in arr[ind0]) {
                    if(arr[0][index].kind === 'Shelter') {
                        shelter += arr[0][index].value ;
                    } else if(arr[0][index].kind === 'Material') {
                        material += arr[0][index].value;
                    } else {
                        constructed.push(arr[0][index]);
                    }
                };
            };
        };

        var totalPerc = [];
        totalPerc[0] = (shelter / projectArea) * 100;
        totalPerc[1] = Math.round(totalPerc[0]);
        totalPerc[2] = (material / projectArea) * 100;
        totalPerc[3] = Math.round(totalPerc[2]);
        totalPerc[4] = ((projectArea - (material + shelter)) / projectArea) * 100;
        totalPerc[5] = Math.round(totalPerc[4]);

        var array = [{ kind: 'Shelter', value: totalPerc[0] }, { kind: 'Material', value: totalPerc[2] }, { kind: 'Unmarked', value: totalPerc[4] }];
        var marked = [{ kind: 'Shelter', value: shelter }, { kind: 'Material', value: material }];
        return(
            <div className='Charts'>
                <div style={{ fontSize: 'larger' }}> Marked Areas </div>
                <PieChart width={width} height={height}>
                    <Pie data={marked} dataKey='value' nameKey='kind' cx='50%' cy='50%' outerRadius={50} fill='#00B68A' >
                        {marked.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={boundsColor[entry.kind]} stroke={boundsColor[entry.kind]} fillOpacity={0.65} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
                <div style={{ fontSize: 'larger' }}> Portion of Total Area </div>
                <PieChart width={ width } height={ height }>
                        <Pie data={ array } dataKey='value' nameKey='kind' cx='50%' cy='50%' outerRadius={ 50 } fill='#00B68A' >
                            { array.map((entry, index) => (
                                <Cell key={ `cell-${index}` } fill={ boundsColor[entry.kind] } stroke={ boundsColor[entry.kind] } fillOpacity={ 0.65 } />
                            )) }
                        </Pie>
                    <Tooltip />
                </PieChart>
                <br />
                <div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: boundsColor['Material'] }}>&nbsp;&nbsp;</div>&nbsp; Material (Horizontal): {totalPerc[2] < totalPerc[3] ? `<${totalPerc[3]}%` : (totalPerc[2] > totalPerc[3] ? `>${totalPerc[3]}%` : `${totalPerc[3]}%`)} </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: boundsColor['Shelter'] }}>&nbsp;&nbsp;</div>&nbsp; Shelter (Horizontal): {totalPerc[0] < totalPerc[1] ? `<${totalPerc[1]}%` : (totalPerc[0] > totalPerc[1] ? `>${totalPerc[1]}%` : `${totalPerc[1]}%`)} </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: boundsColor['Unmarked'] }}>&nbsp;&nbsp;</div>&nbsp; Unmarked: {totalPerc[4] < totalPerc[5] ? `<${totalPerc[5]}%` : (totalPerc[4] > totalPerc[5] ? `>${totalPerc[5]}%` : `${totalPerc[5]}%`)} </div>
                </div>
                <br />
                <div style={{ fontSize: 'larger' }}>Constructed Distances</div>
                <BarChart width={ width } height={ height } data={ constructed }>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='kind' />
                    <YAxis label={{ value: 'Distance', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey={ 'value' } fill={ boundsColor['Constructed'] } stroke={ boundsColor['Constructed'] } fillOpacity={ 0.65 } />
                </BarChart>
                <br />
                <div >
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: boundsColor['Material'] }}>&nbsp;&nbsp;</div>&nbsp;Material (Horizontal) </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: boundsColor['Shelter'] }}>&nbsp;&nbsp;</div>&nbsp;Shelter (Horizontal) </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: boundsColor['Constructed'] }}>&nbsp;&nbsp;</div>&nbsp;Constructed (Vertical) </div>
                </div>
            </div>
        );
    };

    const BoundaryPieChart = (data) => {
        var constructed = [];
        var horizontal = [];

        for (const obj of Object.values(data)) {
            if (obj.kind === 'Shelter' || obj.kind === 'Material') {
                horizontal.push(obj);
            } else {
                constructed.push(obj);
            }
        };

        return(
            <div id='boundCharts' className='Charts'>
                <div style={{ fontSize: 'larger' }}>Boundary Areas</div>
                <PieChart width={ width } height={ height }>
                    <Pie data={ horizontal } dataKey='value' nameKey='kind' cx='50%' cy='50%' outerRadius={ 50 } fill='#00B68A' >
                        { horizontal.map((entry, index) => (
                            <Cell key={ `cell-${index}` } fill={ boundsColor[entry.kind] } stroke={ boundsColor[entry.kind] } fillOpacity={ 0.65 }/>
                        )) }
                    </Pie>
                    <Tooltip />
                </PieChart>
                <div style={{ fontSize: 'larger' }}>Constructed Distances</div>
                <BarChart width={ width } height={ height } data={ constructed }>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='kind' />
                    <YAxis label={{ value: 'Distance', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey={ 'value' } fill={ boundsColor['Constructed'] } stroke={ boundsColor['Constructed'] } fillOpacity={ 0.65 } />
                </BarChart>
                <br/>
                <div >
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: boundsColor['Material'] }}>&nbsp;&nbsp;</div>&nbsp;Material (Horizontal) </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: boundsColor['Shelter'] }}>&nbsp;&nbsp;</div>&nbsp;Shelter (Horizontal) </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: boundsColor['Constructed'] }}>&nbsp;&nbsp;</div>&nbsp;Constructed (Vertical) </div>
                </div>
            </div>
        );
    };

    const multiNatureChart = (data) => {
        var waterAndVeg = [{nature: 'Water', area: 0}, {nature: 'Vegetation', area: 0}];
        var domestic = 0;
        var wild = 0;
        var dogs = 0, cats = 0, otherD = 0;
        var otherW = 0;
        var ducks = 0;
        var turtles = 0;
        var rabbits = 0;
        var birds = 0;
        var squirrels = 0;
        var water = 0;
        var veg = 0;

        for (const [dateTime, resultArr] of Object.entries(data)) {
            for (const index1 of resultArr) {
                for (const obj of index1) {
                    for (const [natureType, typeArr] of Object.entries(obj)){
                        for(const typePoint in typeArr){
                            if (natureType === 'water') {
                                waterAndVeg[0].area += typeArr[typePoint].area;
                                water += typeArr[typePoint].area;
                            } else if (natureType === 'vegetation') {
                                waterAndVeg[1].area += typeArr[typePoint].area;
                                veg += typeArr[typePoint].area;
                            } else {
                                if (typeArr[typePoint].description === 'Dog') {
                                    dogs++;
                                } else if (typeArr[typePoint].description === 'Cat') {
                                    cats++;
                                } else if (typeArr[typePoint].description === 'Duck') {
                                    ducks++;
                                } else if (typeArr[typePoint].description === 'Turtle') {
                                    turtles++;
                                } else if (typeArr[typePoint].description === 'Rabbit') {
                                    rabbits++;
                                } else if (typeArr[typePoint].description === 'Bird') {
                                    birds++;
                                } else if (typeArr[typePoint].description === 'Squirrel') {
                                    squirrels++;
                                }

                                if (typeArr[typePoint].kind === 'Domesticated') {
                                    domestic++;
                                    if (typeArr[typePoint].description === 'Other') {
                                        otherD++;
                                    }
                                } else if (typeArr[typePoint].kind === 'Wild') {
                                    wild++;
                                    console.log(wild);
                                    if (typeArr[typePoint].description === 'Other') {
                                        otherW++;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        var totalPerc = [];
        totalPerc[0] = (water / projectArea) * 100;
        totalPerc[1] = Math.round(totalPerc[0]);
        totalPerc[2] = (veg / projectArea) * 100;
        totalPerc[3] = Math.round(totalPerc[2]);
        totalPerc[4] = ((projectArea - (water + veg)) / projectArea) * 100;
        totalPerc[5] = Math.round(totalPerc[4]);

        var totalArea = [{ nature: 'Water', area: totalPerc[0] }, { nature: 'Vegetation', area: totalPerc[2] }, { nature: 'None', area: totalPerc[4] }];
        var species = [{ species: 'Domestic Dogs', total: dogs }, { species: 'Domestic Cats', total: cats }, { species: 'Wild Birds', total: birds }, { species: 'Wild Ducks', total: ducks }, { species: 'Wild Rabbits', total: rabbits }, { species: 'Wild Squirrels', total: squirrels }, { species: 'Wild Turtles', total: turtles }, { species: 'Domestic (Other)', total: otherD }, { species: 'Wild (Other)', total: otherW }];
        var variant = [{ variant: 'Wild', total: (wild + otherW) }, { variant: 'Domesticated', total: (domestic + otherD) }]

        return (
            <div id='natureCharts' className='Charts'>
                <div style={{ fontSize: 'larger' }}>Vegetation and Water Areas</div>
                <PieChart width={width} height={height}>
                    <Pie data={waterAndVeg} dataKey='area' nameKey='nature' cx='50%' cy='50%' outerRadius={50} fill='#00B68A' >
                        {waterAndVeg.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={natureColor[entry.nature]} stroke={'#ff0000'} fillOpacity={0.65} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
                <div style={{ fontSize: 'larger' }}>Portion of All Nature in Total Area</div>
                <PieChart width={width} height={height}>
                    <Pie data={totalArea} dataKey='area' nameKey='nature' cx='50%' cy='50%' outerRadius={50} fill='#00B68A' >
                        {totalArea.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={natureColor[entry.nature]} stroke={'#ff0000'} fillOpacity={0.65} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
                <div >
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: natureColor['Vegetation'] }}>&nbsp;&nbsp;</div>&nbsp; Vegetation: { totalPerc[2] < totalPerc[3] ? `<${totalPerc[3]}%` : `${totalPerc[3]}%` }</div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: natureColor['Water'] }}>&nbsp;&nbsp;</div>&nbsp; Water: { totalPerc[0] < totalPerc[1] ? `<${totalPerc[1]}%` : `${totalPerc[1]}%` }</div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: boundsColor['Unmarked'] }}>&nbsp;&nbsp;</div>&nbsp; None: {totalPerc[4] < totalPerc[5] ? `<${totalPerc[5]}%` : (totalPerc[4] > totalPerc[5] ? `>${totalPerc[5]}%` : `${totalPerc[5]}%`)} </div>
                </div>
                <br/>
                <div style={{ fontSize: 'larger' }}>Species</div>
                <BarChart width={width} height={height} data={species}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='species' />
                    <YAxis label={{ value: 'Total', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey={'total'} fill={natureColor['Animals']} stroke={natureColor['Animals']} fillOpacity={0.65} />
                </BarChart>
                <div style={{ fontSize: 'larger' }}>Wild vs Domesticated</div>
                <BarChart width={width} height={height} data={variant}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='variant' />
                    <YAxis label={{ value: 'Total', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey={'total'} fill={natureColor['Animals']} stroke={natureColor['Animals']} fillOpacity={0.65} />
                </BarChart>
                <br />
                <div >
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: natureColor['Animals'] }}>&nbsp;&nbsp;</div>&nbsp; Animals </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: natureColor['Vegetation'] }}>&nbsp;&nbsp;</div>&nbsp; Vegetation </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: natureColor['Water'] }}>&nbsp;&nbsp;</div>&nbsp; Water </div>
                </div>
            </div>
        );
    }

    const NaturePieChart = (data) => {
        var waterAndVeg = [];
        var domestic = 0;
        var wild = 0;
        var dogs = 0;
        var cats = 0;
        var otherD = 0;
        var otherW = 0;
        var ducks = 0;
        var turtles = 0;
        var rabbits = 0;
        var birds = 0;
        var squirrels = 0;
        var water = 0;
        var veg = 0;

        for(const ind in data){
            for (const [natureType, typeArr] of Object.entries(data[ind])) {
                var adjusted;
                for (const typePoint in typeArr){
                    //console.log(typeArr[typePoint])//
                    if (natureType === 'water'){
                        adjusted = typeArr[typePoint];
                        adjusted.nature = 'Water';
                        waterAndVeg.push(adjusted);
                        water += typeArr[typePoint].area;
                    } else if(natureType === 'vegetation'){
                        adjusted = typeArr[typePoint];
                        adjusted.nature = 'Vegetation';
                        waterAndVeg.push(adjusted);
                        veg += typeArr[typePoint].area;
                    } else {
                        if(typeArr[typePoint].description === 'Dog'){
                            dogs++;
                        } else if (typeArr[typePoint].description === 'Cat'){
                            cats++;
                        } else if (typeArr[typePoint].description === 'Duck'){
                            ducks++;
                        } else if (typeArr[typePoint].description === 'Turtle'){
                            turtles++;
                        } else if (typeArr[typePoint].description === 'Rabbit'){
                            rabbits++;
                        } else if (typeArr[typePoint].description === 'Bird'){
                            birds++;
                        } else if (typeArr[typePoint].description === 'Squirrel'){
                            squirrels++;
                        } 

                        if (typeArr[typePoint].kind === 'Domesticated'){
                            domestic++;
                            console.log(domestic);
                            if (typeArr[typePoint].description === 'Other'){
                                otherD++;
                                console.log(otherD);
                            }
                        } else if (typeArr[typePoint].kind === 'Wild'){
                            wild++;
                            console.log(wild);
                            if (typeArr[typePoint].description === 'Other'){
                                otherW++;
                            }
                        }
                    }
                }
            }
        }
        var totalPerc = [];
        totalPerc[0] = (water / projectArea) * 100;
        totalPerc[1] = Math.round(totalPerc[0]);
        totalPerc[2] = (veg / projectArea) * 100;
        totalPerc[3] = Math.round(totalPerc[2]);
        totalPerc[4] = ((projectArea - (water + veg)) / projectArea) * 100;
        totalPerc[5] = Math.round(totalPerc[4]);

        var totalArea = [{ nature: 'Water', area: totalPerc[0] }, { nature: 'Vegetation', area: totalPerc[2] }, { nature: 'None', area: totalPerc[4] }];
        var species = [{ species: 'Domestic Dogs', count: dogs }, { species: 'Domestic Cats', count: cats }, { species: 'Wild Birds', count: birds }, {species: 'Wild Ducks', count: ducks }, { species: 'Wild Rabbits', count: rabbits }, { species: 'Wild Squirrels', count: squirrels }, { species: 'Wild Turtles', count: turtles}, {species: 'Domestic (Other)', count: otherD}, {species: 'Wild (Other)', count: otherW}];
        var variant = [{ variant: 'Wild', count: (wild+otherW)}, {variant: 'Domesticated', count: (domestic+otherD)}]

        return (
            <div id='natureCharts' className='Charts'>
                <div style={{ fontSize: 'larger' }}>Vegetation and Water</div>
                <PieChart width={width} height={height}>
                    <Pie data={waterAndVeg} dataKey='area' nameKey='description' cx='50%' cy='50%' outerRadius={50} fill='#00B68A' >
                        {waterAndVeg.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={natureColor[entry.nature]} stroke={'#ff0000'} fillOpacity={0.65} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
                <div style={{ fontSize: 'larger' }}>Portion of Nature in Total Area</div>
                <PieChart width={width} height={height}>
                    <Pie data={totalArea} dataKey='area' nameKey='nature' cx='50%' cy='50%' outerRadius={50} fill='#00B68A' >
                        {totalArea.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={natureColor[entry.nature]} stroke={'#ff0000'} fillOpacity={0.65} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
                <div >
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: natureColor['Vegetation'] }}>&nbsp;&nbsp;</div>&nbsp; Vegetation: {totalPerc[2] < totalPerc[3] ? `<${totalPerc[3]}%` : `${totalPerc[3]}%`}</div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: natureColor['Water'] }}>&nbsp;&nbsp;</div>&nbsp; Water: {totalPerc[0] < totalPerc[1] ? `<${totalPerc[1]}%` : `${totalPerc[1]}%`}</div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: boundsColor['Unmarked'] }}>&nbsp;&nbsp;</div>&nbsp; None: {totalPerc[4] < totalPerc[5] ? `<${totalPerc[5]}%` : (totalPerc[4] > totalPerc[5] ? `>${totalPerc[5]}%` : `${totalPerc[5]}%`)} </div>
                </div>
                <br />
                <div style={{ fontSize: 'larger' }}>Species</div>
                <BarChart width={width} height={height} data={species}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='species' />
                    <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey={'count'} fill={natureColor['Animals']} stroke={natureColor['Animals']} fillOpacity={0.65} />
                </BarChart>
                <div style={{ fontSize: 'larger' }}>Wild vs Domesticated</div>
                <BarChart width={width} height={height} data={variant}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='variant' />
                    <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey={'count'} fill={natureColor['Animals']} stroke={natureColor['Animals']} fillOpacity={0.65} />
                </BarChart>
                <br />
                <div >
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: natureColor['Animals'] }}>&nbsp;&nbsp;</div>&nbsp; Animals </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: natureColor['Vegetation'] }}>&nbsp;&nbsp;</div>&nbsp; Vegetation </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><div style={{ backgroundColor: natureColor['Water'] }}>&nbsp;&nbsp;</div>&nbsp; Water </div>
                </div>
            </div>
        );
    };

    return(
       type === 0 ? 
            <div key={ selection } style={{ borderBottom: '2px solid #e8e8e8', paddingBottom: '5px' }}>
                <div className='sectionName'>
                    <div style={{ fontSize: 'large' }}>{ testNames(cat[0]) }</div>
                    { cat[1] }  { cat[2] }
                </div>
                    { cat[0] === 'sound_maps' ? soundBarChart(data) : (cat[0] === 'boundaries_maps' ? BoundaryPieChart(data) : (cat[0] === 'moving_maps' ? movingBarChart(data) : (cat[0] === 'stationary_maps' ? stationaryBarCharts(data) : (cat[0] === 'nature_maps' ? NaturePieChart(data) : (cat[0] === 'light_maps' ? lightingCharts(data) : ( cat[0] === 'order_maps' ? orderCharts(data) : null)))))) }
            </div> 
        : 
            <div key={ selection } style={{ borderBottom: '2px solid #e8e8e8', paddingBottom: '5px'}}>
                <div className='sectionName' style={{ fontSize: 'large', marginBottom: '5px' }}>
                    { testNames(cat[0]) }: Summary
                </div>
                {cat[0] === 'sound_maps' ? multiSoundCharts(data) : (cat[0] === 'boundaries_maps' ? multiBoundaryCharts(data) : (cat[0] === 'stationary_maps' ? multiStationary(data) : (cat[0] === 'nature_maps' ? multiNatureChart(data) : (cat[0] === 'moving_maps' ? multiMoving(data) : (cat[0] === 'light_maps' ? multiLight(data) : ( cat[0] === 'order_maps' ? multiOrderCharts(data) : null)) )) ))}
            </div>
    );
};