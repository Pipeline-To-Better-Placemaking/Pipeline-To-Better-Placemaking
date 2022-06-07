import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

function Charts(props){
    const data = props.data
    const [soundSources, setSoundSources] = React.useState([]);
    const [aOO, setAOO] = React.useState([]);

    const soundBarChart=(data)=>(
        <BarChart width={250} height={190} data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis label={{ value: 'Decibels', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey={'average'} fill='#B073FF' />
        </BarChart>
    )

    return(
        soundBarChart(data)
    );
}

export default Charts;