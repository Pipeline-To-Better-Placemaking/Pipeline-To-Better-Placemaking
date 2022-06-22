import * as React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis, Tooltip, Legend, Label, PieChart, Pie } from 'recharts';

function Charts(props){
    const data = props.data;
    const selection = props.selection;
    const type = props.type;
    const boundsColor = {
        Constructed: '#FF00E5',
        Shelter: '#FFA64D',
        Material: '#00FFC1'
    };

    const stationaryColor = {
        Sitting: '#ff0000',
        Standing: '#0000ff',
        Laying: '#ffff00',
        Squatting: '#008000'
    }


    const testNames = {
        stationary_collections: 'Humans in Place',
        moving_collections: 'Humans in Motion',
        order_collections: 'Absence of Order Locator',
        boundary_collections: 'Spatial Boundaries',
        lighting_collections: 'Lighting Profile',
        nature_collections: 'Nature Prevalence',
        sound_collections: 'Acoustical Profile'
    };

    const cat = selection.split('.');

    const soundBarChart=(data)=>(
        <BarChart width={ 250 } height={ 190 } data={ data }>
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
            } else if (obj.posture === 'Squatting'){
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
            } else if (obj.age === '30-50'){
                mAdult++;
            } else {
                senior++;
            }

            if (obj.gender === 'Female') {
                female++;
            } else {
                male++;
            }

            if (obj.activity === 'Socializing') {
                solitary ++;
            } else if (obj.activity === 'Waiting') {
                waiting ++;
            } else if (obj.activity === 'Recreation') {
                recreation ++;
            } else if (obj.activity === 'Eating') {
                eating ++;
            } else {
                solitary ++;
            }
        };

        var posture = [{ posture: 'Sitting', count: sitting }, { posture: 'Standing', count: standing }, { posture: 'Laying', count: laying }, { posture: 'Squatting', count: squatting }];

        var age = [{ age: '0-14', count: kid }, { age: '15-21', count: teen }, { age: '22-30', count: yAdult }, { age: '30-50', count: mAdult }, { age: '50+', count: senior }];
        
        var gender =[{gender: 'Male', count: male}, {gender: 'Female', count: female}]

        var activity = [{ activity: 'Socializing', count: socializing }, { activity: 'Waiting', count: waiting }, { activity: 'Recreation', count: recreation }, { activity: 'Eating', count: eating }, { age: 'Solitary', count: solitary }];

        return( 
            <>
                Posture
                <BarChart width={250} height={190} data={posture}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='posture' />
                    <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={'count'} >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={stationaryColor[entry.posture]} />
                        ))}
                    </Bar>
                </BarChart>
                Age
                <BarChart width={250} height={190} data={age}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='age' />
                    <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={'count'} fill='#636262' />
                </BarChart>
                Gender
                <BarChart width={250} height={190} data={gender}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='gender' />
                    <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={'count'} fill='#636262' />
                </BarChart>
                Activity
                <BarChart width={250} height={190} data={activity}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='activity' />
                    <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={'count'} fill='#636262' />
                </BarChart>
            </>
       )
    };

    const multiBoundaryCharts=(data)=>{
        var constructed = [];
        var shelter = 0;
        var material = 0;

        for (const arr of  Object.values(data)){
           for(const index in arr[0]){
               if(arr[0][index].kind === 'Shelter'){
                shelter += arr[0][index].value 
                } else if(arr[0][index].kind === 'Material'){
                material += arr[0][index].value
                } else {
                    constructed.push(arr[0][index]);
                }
           };
        };

        var array = [{kind: 'Shelter', value: shelter},{kind: 'Material', value: material}]
        
        return(
            <div id='boundCharts'>
                Material and Shelter Areas
                <PieChart width={250} height={190}>
                    <Legend />
                        <Pie data={array} dataKey='value' nameKey='kind' cx='50%' cy='50%' outerRadius={50} fill='#00B68A' >
                            {array.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={boundsColor[entry.kind]} />
                            ))}
                        </Pie>

                    <Tooltip />
                </PieChart>
                Constructed Distances
                <BarChart width={250} height={190} data={constructed}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='kind' />
                    <YAxis label={{ value: 'Distance', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={'value'} fill={boundsColor['Constructed']} />
                </BarChart>
            </div>
        );
    };

    const BoundaryPieChart=(data)=>{
        var constructed = [];
        var horizontal = [];

        for (const obj of Object.values(data)) {
            if (obj.kind === 'Shelter' || obj.kind === 'Material') {
                horizontal.push(obj);
                console.log(horizontal);
            } else {
                constructed.push(obj);
                console.log(constructed);
            }
        };

        return(
            <div id='boundCharts'>
                Boundary Areas
                <PieChart width={250} height={190}>
                    <Legend />
                    <Pie data={horizontal} dataKey='value' nameKey='kind' cx='50%' cy='50%' outerRadius={50} fill='#00B68A' >
                        {horizontal.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={boundsColor[entry.kind]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
                Boundary Distances
                <PieChart width={250} height={190}>
                        <Pie data={constructed} dataKey='value' nameKey='kind' cx='50%' cy='50%' outerRadius={50} fill='#00B68A' >
                            {constructed.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={boundsColor[entry.kind]} />
                            ))}
                        </Pie>
                    <Tooltip />
                </PieChart>
            </div>
        );
    };

    return(
       type === 0 ? 
       <div key={ selection } style={{ borderBottom: '2px solid #e8e8e8', paddingBottom: '5px' }}>
            <div className='sectionName'>
                <div style={{fontSize: 'large'}}>{ testNames[cat[0]] }</div>
                {cat[1]}  {cat[2]}
            </div>
            { cat[0] === 'sound_collections' ? soundBarChart(data) : (cat[0] === 'boundary_collections' ? BoundaryPieChart(data) : (cat[0] === 'stationary_collections' ? stationaryBarCharts(data) : null)) }
        </div> : 
            <div key={selection} style={{ borderBottom: '2px solid #e8e8e8', paddingBottom: '5px'}}>
                <div className='sectionName' style={{ fontSize: 'large', marginBottom: '5px' }}>
                    { testNames[cat[0]] }: Summary
                </div>
                { cat[0] === 'boundary_collections' ? multiBoundaryCharts(data) : null }
            </div>
    );
}

export default Charts;