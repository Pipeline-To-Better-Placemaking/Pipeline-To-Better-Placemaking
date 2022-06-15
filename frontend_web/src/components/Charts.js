import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

function Charts(props){
    const data = props.data;
    const selection = props.selection;
    const [soundSources, setSoundSources] = React.useState([]);
    const [aOO, setAOO] = React.useState([]);

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
            { type[0] === 'soundCollections' ? soundBarChart(data) : null }
        </div>
    );
}

export default Charts;