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
            { cat[0] === 'sound_collections' ? soundBarChart(data) : (cat[0] === 'boundary_collections' ? BoundaryPieChart(data) : null) }
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