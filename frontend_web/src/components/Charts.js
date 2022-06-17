import * as React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis, Tooltip, Legend, Label, PieChart, Pie } from 'recharts';

function Charts(props){
    const data = props.data;
    const selection = props.selection;
    const boundsColor = {
        construction: '#FF00E5',
        shelter: '#00B68A',
        material: '#FFF066'
    };
    const [soundSources, setSoundSources] = React.useState([]);


    const testNames = {
        stationaryCollections: 'Humans in Place',
        movingCollections: 'Humans in Motion',
        orderCollections: 'Absence of Order Locator',
        boundaryCollections: 'Spatial and Shelter Boundaries',
        lightingCollections: 'Lighting Profile',
        natureCollections: 'Nature Prevalence',
        soundCollections: 'Acoustical Profile'
    };

    const type = selection.split('.');

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
    )

    return(
        <div key={ selection } style={{ marginBottom: '5px', borderBottom: '2px solid #e8e8e8', paddingBottom: '5px' }}>
            <div style={{ paddingLeft: '10px' }}>
                { testNames[type[0]] }
                <br />
                { type[1] }
                <br />
                { type[2] }
            </div>
            { type[0] === 'soundCollections' ? soundBarChart(data) : (type[0] === 'boundaryCollections' ? BoundaryPieChart(data) : null) }
        </div>
    );
}

export default Charts;