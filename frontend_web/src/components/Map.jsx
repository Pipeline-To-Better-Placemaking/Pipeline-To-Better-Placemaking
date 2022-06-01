import * as React from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import { createCustomEqual } from 'fast-equals';
import { isLatLngLiteral } from '@googlemaps/typescript-guards';
import Button from '@mui/material/Button';
import MapDrawers from './MapDrawers';
import TextField from '@mui/material/TextField';

import './controls.css';

const render = (status) => {
    console.log(status);
    return <h1>{status}</h1>;
};

function FullMap(props){
    const [click, setClick] = React.useState([]);
    const [zoom, setZoom] = React.useState(props.zoom ? props.zoom : 10); // initial zoom
    const [center, setCenter] = React.useState(props.center.lat ? { lat: props.center.lat, lng: props.center.lng } : { lat:28.54023216523664, lng:-81.38181298263407});
    const [loc, setLoc] = React.useState('');
    const [data, setData] = React.useState(props.type === 1 ? props.drawers : {})

    // hold the selections from the switch toggles
    const [key, setKey] = React.useState(0);
    const [orderCollections, setOrderCollections] = React.useState({});
    const [boundariesCollections, setBoundariesCollections] = React.useState({});
    const [lightingCollections, setLightingCollections] = React.useState({});
    const [natureCollections, setNatureCollections] = React.useState({});
    const [soundCollections, setSoundCollections] = React.useState({});
    const [collections, setCollections] = React.useState({
        orderCollections: orderCollections, 
        boundariesCollections: boundariesCollections, 
        lightingCollections: lightingCollections, 
        natureCollections: natureCollections, 
        soundCollections: soundCollections
    });

    // selectedData handles the boolean toggling from Map Drawer selections/switches
    function onSelection(category, date, time, check) {
        console.log(`${category} ${date} ${time} ${check}`);
        var newSelection;
        if (category === 'orderCollections') {
            newSelection = orderCollections;
            if (check === true) {
                if (!newSelection[`${date}`]) newSelection[`${date}`] = [];
                newSelection[`${date}`].push(time);
            } else {
                var o = newSelection[date].indexOf(time);
                newSelection[date].splice(o, 1);
            }
            setOrderCollections(newSelection);
            setCollections({...collections, orderCollections: newSelection});
        } else if (category === 'boundariesCollections') {
            newSelection = boundariesCollections;
            if (check === true) {
                if (!newSelection[`${date}`]) newSelection[`${date}`] = [];
                newSelection[`${date}`].push(time);
            } else {
                var b = newSelection[date].indexOf(time);
                newSelection[date].splice(b, 1);
            }
            setBoundariesCollections(newSelection);
            setCollections({ ...collections, boundariesCollections: newSelection });
        } else if (category === 'lightingCollections') {
            newSelection = lightingCollections;
            if (check === true) {
                if (!newSelection[`${date}`]) newSelection[`${date}`] = [];
                newSelection[`${date}`].push(time);
            } else {
                var l = newSelection[date].indexOf(time);
                newSelection[date].splice(l, 1);
            }
            setLightingCollections(newSelection);
            setCollections({ ...collections, lightingCollections: newSelection });
        } else if (category === 'natureCollections') {
            newSelection = natureCollections;
            if (check === true) {
                if (!newSelection[`${date}`]) newSelection[`${date}`] = [];
                newSelection[`${date}`].push(time);
            } else {
                var n = newSelection[date].indexOf(time);
                newSelection[date].splice(n, 1);
            }
            setNatureCollections(newSelection);
            setCollections({ ...collections, natureCollections: newSelection });
        } else if (category === 'soundCollections') {
            newSelection = soundCollections;
            if (check === true) {
                if (!newSelection[`${date}`]) newSelection[`${date}`] = [];
                newSelection[`${date}`].push(time);
            } else {
                var s = newSelection[date].indexOf(time);
                newSelection[date].splice(s, 1);
            }
            setSoundCollections(newSelection);
            setCollections({ ...collections, soundCollections: newSelection });
        } else {
            console.log('error');
        }  
        
        setKey(key => key + 1)
        console.log(collections);
    };

    const onClick = (e) => {
        if(props.type === 2 || props.type === 0){
            setClick(e.latLng);
            setCenter(e.latLng);
        } else {
            setClick([...click, e.latLng]);
        }
    };

    const onIdle = (m) => {
        setZoom(m.getZoom());
        setCenter(m.getCenter().toJSON());
    };

    const form0 = (
        <div id='newProjectInput'>
            <TextField id='location-search' label='Project Location' type='search' value={loc}/>
            <Button className='newHoveringButtons'>Search</Button>
            <Button className='newHoveringButtons' onClick={() => setClick()}>Clear</Button>
        </div>
    );

    const actCoords = (collections) => (
        Object.entries(collections).map(([title, object], index) => (
            Object.entries(object).map(([sdate, stimes])=>(
                stimes.map(time => (
                    Object.entries(data.Activities[title][sdate][time]).map(([ind, point], i2)=>(
                        <Marker key={`${sdate}.${time}.${i2}`} position={point['standingPoint']} markerType={point['average'] ? 'soundCollections' : (point['result'] ? point['result'] : null)} markerSize={title === 'soundCollections' ? point['average'] : null} /> 
                    ))
                ))
            ))
        ))
    );

    return (
        <>
            {props.type === 1 ? <MapDrawers drawers={data} selection={onSelection} /> : null}
            <Wrapper apiKey={''} render={render}>
                <Map
                    center={center}
                    onClick={onClick}
                    onIdle={onIdle}
                    zoom={zoom}
                    order={orderCollections}
                    boundaries={boundariesCollections}
                    lighting={lightingCollections}
                    nature={natureCollections}
                    sound={soundCollections}
                >
                    {props.type === 1 ?
                       actCoords(collections)
                    :<Marker position={click}/>}
                </Map>
            </Wrapper>
            {/* Basic form for searching for places */}
            {props.type === 0 ? form0 : null}
        </>
    );
};

interface MapProps extends google.maps.MapOptions {
    style: { [key: string]: string };
    onClick?: (e: google.maps.MapMouseEvent) => void;
    onIdle?: (map: google.maps.Map) => void;
}

const Map: React.FC<MapProps> = ({ onClick, onIdle, children, style, ...options }) => {
    const ref = React.useRef(null);
    const [map, setMap] = React.useState();

    React.useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}));
        }
    }, [ref, map]);

    useDeepCompareEffectForMaps(() => {
        if (map) {
            map.setOptions(options);
        }
    }, [map, options]);

    React.useEffect(() => {
        if (map) {
            ['click', 'idle'].forEach((eventName) =>
                google.maps.event.clearListeners(map, eventName)
            );
            if (onClick) {
                map.addListener('click', onClick);
            }

            if (onIdle) {
                map.addListener('idle', () => onIdle(map));
            }
        }
    }, [map, onClick, onIdle]);

    return (
        <>
            <div ref={ref} style={style} id='mapFrame'/>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    // set the map prop on the child component
                    return React.cloneElement(child, {map});
                }
            })}
        </>
    );
};

const Marker = (options) => {
    console.log('here');
    const markerType = options.markerType;
    const markerSize = Number(options.markerSize);

    const style = {
        soundCollections: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#B073FF',
            fillOpacity: 0.3,
            scale: (markerSize ? markerSize : 10),
            strokeWeight: 1, 
            strokeColor: '#B073FF'
        }, 
        animal: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#9C4B00',
            fillOpacity: 0.9,
            scale: 10,
            strokeWeight: 2,
            strokeColor: 'red'
        },
        Plants: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#BEFF05',
            fillOpacity: 0.9,
            scale: 10,
            strokeWeight: 2,
            strokeColor: 'red'
        }

    };
    const icon = style[markerType] ? style[markerType] : style.soundCollections;
    console.log(options.position);

    const [marker, setMarker] = React.useState();

    React.useEffect(() => {
        if (!marker) {
            setMarker(new google.maps.Marker({icon: icon}));
        }

        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker, icon]);

    React.useEffect(() => {
        if (marker) {
            marker.setOptions({ clickable: true, map: options.map, position: options.position});
        }
    }, [marker, options]);

    return null;
};

const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a, b) => {
    if (isLatLngLiteral(a) || a instanceof google.maps.LatLng || isLatLngLiteral(b) || b instanceof google.maps.LatLng) {
        return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }
    return deepEqual(a, b);
});

function useDeepCompareMemoize(value) {
    const ref = React.useRef();

    if (!deepCompareEqualsForMaps(value, ref.current)) {
        ref.current = value;
    }
    return ref.current;
}

function useDeepCompareEffectForMaps(callback, dependencies) {
    React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

export default FullMap;