import * as React from 'react';
import Map from '../components/Map';
import './routes.css';

function MapPage(props){
    const drawers = props.drawers;

    const center = { lat:28.602846550128262, lng:-81.20006526689143 };

    const area = [
        { lat: 28.60554990612719, lng:-81.20110596383721 },
        { lat: 28.606199831533385, lng:-81.19778002454426 },
        { lat:28.603392878566126, lng:-81.19546259587324 },
        { lat: 28.600755404733533, lng:-81.19444335642248 },
        { lat:28.598011890739404, lng:-81.1974018330677 },
        { lat: 28.59642933335552, lng:-81.19959051571513 },
        { lat: 28.59729597487453, lng:- 81.20322759118913 },
        { lat: 28.599839338049176, lng:-81.20663936117703 },
        { lat: 28.601506620541844, lng:-81.20608146164412 },
        { lat: 28.604549107390945, lng:-81.2062102077004 },
        { lat: 28.60644237514531, lng:-81.20359237160903 }
    ];


    return (
        <div id='MapPage'>
            <Map
                center={ center } 
                zoom={ 16 } 
                type={ 1 }
                drawers={ drawers }
                area={ area }
            />
        </div>
    );
}

export default MapPage;