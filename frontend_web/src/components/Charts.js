import * as React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis, Tooltip, Legend, Label, PieChart, Pie } from 'recharts';

function Charts(props){
    const data = props.data;
    const selection = props.selection;
    const type = props.type;
    const boundsColor = {
        constructed: '#FF00E5',
        shelter: '#FFA64D',
        material: '#00FFC1'
    };


    const testNames = {
        stationaryCollections: 'Humans in Place',
        movingCollections: 'Humans in Motion',
        orderCollections: 'Absence of Order Locator',
        boundaryCollections: 'Spatial Boundaries',
        lightingCollections: 'Lighting Profile',
        natureCollections: 'Nature Prevalence',
        soundCollections: 'Acoustical Profile'
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

    const multiBoundaryCharts=(data)=>{
        var constructed = [];
        var shelter = 0;
        var material = 0;

        for (const arr of  Object.values(data)){
           for(const index in arr[0]){
               if(arr[0][index].result === 'shelter'){
                shelter += arr[0][index].area 
                } else if(arr[0][index].result === 'material'){
                material += arr[0][index].area
                } else {
                    constructed.push(arr[0][index]);
                }
           };
        };

        var array = [{result: 'shelter', area: shelter},{result: 'material', area: material}]
        
        return(
            <div id='boundCharts'>
                Material and Shelter Areas
                <PieChart width={250} height={190}>
                    <Legend />
                        <Pie data={array} dataKey='area' nameKey='result' cx='50%' cy='50%' outerRadius={50} fill='#00B68A' >
                            {array.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={boundsColor[entry.result]} />
                            ))}
                        </Pie>

                    <Tooltip />
                </PieChart>
                Constructed Distances
                <BarChart width={250} height={190} data={constructed}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='result' />
                    <YAxis label={{ value: 'Distance', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={'distance'} fill={boundsColor['constructed']} />
                </BarChart>
            </div>
        );
    };

    const BoundaryPieChart=(data)=>(
        <div id='boundCharts'>
            Boundary Areas
            <PieChart width={250} height={190}>
                <Legend />
                <Pie data={data} dataKey='area' nameKey='result' cx='50%' cy='50%' outerRadius={50} fill='#00B68A' >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={boundsColor[entry.result]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
            Boundary Distances
            <PieChart width={250} height={190}>
                    <Pie data={data} dataKey='distance' nameKey='result' cx='50%' cy='50%' outerRadius={50} fill='#00B68A' >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={boundsColor[entry.result]} />
                        ))}
                    </Pie>
                <Tooltip />
            </PieChart>
        </div>
    );

    return(
       type === 0 ? 
       <div key={ selection } style={{ borderBottom: '2px solid #e8e8e8', paddingBottom: '5px' }}>
            <div className='sectionName' style={{ display: 'flex', flexDirection: 'column', paddingLeft: '10px', alignContent: 'center', alignItems: 'center' }}>
                <div style={{fontSize: 'large'}}>{ testNames[cat[0]] }</div>
                {cat[1]}  {cat[2]}
            </div>
            { cat[0] === 'soundCollections' ? soundBarChart(data) : (cat[0] === 'boundaryCollections' ? BoundaryPieChart(data) : null) }
        </div> : 
            <div key={selection} style={{ borderBottom: '2px solid #e8e8e8', paddingBottom: '5px'}}>
                <div className='sectionName' style={{ display: 'flex', flexDirection: 'column', paddingLeft: '10px', alignContent: 'center', alignItems: 'center', fontSize: 'large', marginBottom: '5px' }}>
                    { testNames[cat[0]] }: Summary
                </div>
                { cat[0] === 'boundaryCollections' ? multiBoundaryCharts(data) : null }
            </div>
    );
}

export default Charts;