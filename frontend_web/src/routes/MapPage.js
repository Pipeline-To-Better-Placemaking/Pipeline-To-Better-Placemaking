import * as React from 'react';

import MapDrawers from '../components/MapDrawers';
import Map from '../components/Map';
import './routes.css';

function MapPage(){
    const actDrawers = [
        {
            name: 'Activities',
            categories: [
                {
                    title: 'orderCollections',
                    maps: [
                        {
                            date: '2/22/22',
                            data: '',
                        },
                        {
                            date: '3/5/22',
                            data: '',
                        },
                        {
                            date: '11/20/21',
                            data: ''
                        }
                    ]
                },
                {
                    title: 'boundariesCollections',
                    maps: [
                        {
                            date: '2/29/22',
                            data: ''
                        },
                        {
                            date: '4/1/22',
                            data: ''
                        },
                        {
                            date: '12/2/21',
                            data: ''
                        }
                    ]
                },
                {
                    title: 'lightingCollections',
                    maps: []
                },
                {
                    title: 'natureCollections',
                    maps: []
                },
                {
                    title: 'soundCollections',
                    maps: [
                        {
                            date: '2/29/22',
                            data:
                                [
                                    {
                                        standingPoint: '28.603369329889514, -81.20129371852886',
                                        average: '80'
                                    },
                                ]
                        },
                        {
                            date: '4/1/22',
                            data: ''
                        },
                        {
                            date: '12/2/21',
                            data: ''
                        }
                    ]
                }
            ]
        },
        {
            name: 'Graphs',
            categories: [
                {
                    title: '',
                    maps: []
                }
            ]
        },
        {
            name: 'Data',
            categories: [
                {
                    title: '',
                    maps: []
                }
            ]
        }
    ];

    const [selectedResults, setSelectedResults] = React.useState({});

    /* selectedData handles the boolean toggling from Map Drawer selections/switched */
    function selectedData(category, date, check) {
        if(selectedResults[category+''+date] !== null){
            selectedResults[category + '' + date] = check;
            console.log(selectedResults[category + '' + date]+' MapPage');
            setSelectedResults(selectedResults);
        } else {
            console.log('error toggling selection');
        }
    }

    const center = {lat:28.602846550128262, lng:-81.20006526689143};

    return (
        <div id='MapPage'>
            <MapDrawers drawers={actDrawers} select={selectedData}/>
            <Map center={center} zoom={16} type={1} data={actDrawers} results={selectedResults}/>
        </div>
    );
}

export default MapPage;