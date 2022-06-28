import * as React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis, Tooltip, Legend, Label, PieChart, Pie } from 'recharts';
import { Area, testNames } from '../functions/HelperFunctions';

function Charts(props) {
    const width = 300;
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
        'Handicap Assisted Wheels': '#FFA500',
    }

    const cat = selection.split('.');

    const soundBarChart = (data) => (
        <BarChart width={ width } height={ height } data={ data }>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis label={{ value: 'Decibels', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey={'average'} fill='#B073FF' />
        </BarChart>
    );

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
        
        var gender =[{ gender: 'Male', count: male }, { gender: 'Female', count: female }]

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
       )
    };

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

    const multiBoundaryCharts = (data) => {
        var constructed = [];
        var shelter = 0;
        var material = 0;

        for (const arr of  Object.values(data)) {
           for(const index in arr[0]) {
                if(arr[0][index].kind === 'Shelter') {
                    shelter += arr[0][index].value ;
                } else if(arr[0][index].kind === 'Material') {
                    material += arr[0][index].value;
                } else {
                    constructed.push(arr[0][index]);
                }
           };
        };

        var array = [{ kind: 'Shelter', value: (shelter/projectArea) },{ kind: 'Material', value: (material/projectArea) }, { kind: 'Unmarked', value: ((projectArea-(material+shelter))/projectArea) }];
        var marked = [{ kind: 'Shelter', value: shelter }, { kind: 'Material', value: material }];
        return(
            <div className='Charts'>
                <div style={{ fontSize: 'larger' }}>Portion of Total Area</div>
                <PieChart width={ width } height={ height }>
                        <Pie data={ array } dataKey='value' nameKey='kind' cx='50%' cy='50%' outerRadius={ 50 } fill='#00B68A' >
                            { array.map((entry, index) => (
                                <Cell key={ `cell-${index}` } fill={ boundsColor[entry.kind] } stroke={ boundsColor[entry.kind] } fillOpacity={ 0.65 } />
                            )) }
                        </Pie>
                    <Tooltip />
                </PieChart>
                <div style={{ fontSize: 'larger' }}>Marked Areas</div>
                <PieChart width={ width } height={ height }>
                    <Pie data={ marked } dataKey='value' nameKey='kind' cx='50%' cy='50%' outerRadius={ 50 } fill='#00B68A' >
                        { marked.map((entry, index) => (
                            <Cell key={ `cell-${index}` } fill={ boundsColor[entry.kind] } stroke={ boundsColor[entry.kind] } fillOpacity={ 0.65 } />
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

    return(
       type === 0 ? 
       <div key={ selection } style={{ borderBottom: '2px solid #e8e8e8', paddingBottom: '5px' }}>
            <div className='sectionName'>
                <div style={{ fontSize: 'large' }}>{ testNames(cat[0]) }</div>
                { cat[1] }  { cat[2] }
            </div>
                { cat[0] === 'sound_collections' ? soundBarChart(data) : (cat[0] === 'boundaries_collections' ? BoundaryPieChart(data) : (cat[0] === 'moving_collections' ? movingBarChart(data) : (cat[0] === 'stationary_collections' ? stationaryBarCharts(data) : null))) }
        </div> : 
            <div key={ selection } style={{ borderBottom: '2px solid #e8e8e8', paddingBottom: '5px'}}>
                <div className='sectionName' style={{ fontSize: 'large', marginBottom: '5px' }}>
                    { testNames(cat[0]) }: Summary
                </div>
                { cat[0] === 'boundaries_collections' ? multiBoundaryCharts(data) : null }
            </div>
    );
};

export default Charts;