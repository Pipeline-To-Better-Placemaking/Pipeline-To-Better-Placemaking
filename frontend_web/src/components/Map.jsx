import * as React from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import { createCustomEqual } from 'fast-equals';
import { isLatLngLiteral } from '@googlemaps/typescript-guards';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import MapDrawers from './MapDrawers';
import './controls.css';

const render = (status) => {
    console.log(status);
    return <h1>{ status }</h1>;
};

//Official Category Titles
const testNames = {
    stationaryCollections: 'Humans in Place',
    movingCollections: 'Humans in Motion',
    orderCollections: 'Absence of Order Locator',
    boundariesCollections: 'Spatial and Shelter Boundaries',
    lightingCollections: 'Lighting Profile',
    natureCollections: 'Nature Prevalence',
    soundCollections: 'Acoustical Profile'
};

function FullMap(props){
    const title = props.title ? props.title : 'Project';
    const [click, setClick] = React.useState([]);
    const [zoom, setZoom] = React.useState(props.zoom ? props.zoom : 10); // initial zoom
    const [center, setCenter] = React.useState(props.center.lat ? { lat: props.center.lat, lng: props.center.lng } : { lat:28.54023216523664, lng:-81.38181298263407 });
    const [loc, setLoc] = React.useState('');
    const [data, setData] = React.useState(props.type === 1 ? props.drawers : {});
    const [areaData, setAreaData] = React.useState(props.type === 1 ? props.area : null);

    // hold the selections from the switch toggles
    const [stationaryCollections, setStationaryCollections] = React.useState({});
    const [movingCollections, setMovingCollections] = React.useState({});
    const [orderCollections, setOrderCollections] = React.useState({});
    const [boundariesCollections, setBoundariesCollections] = React.useState({});
    const [lightingCollections, setLightingCollections] = React.useState({});
    const [natureCollections, setNatureCollections] = React.useState({});
    const [soundCollections, setSoundCollections] = React.useState({});

    //holds ALL Collections for rendering
    const [collections, setCollections] = React.useState({
        orderCollections: orderCollections, 
        boundariesCollections: boundariesCollections, 
        lightingCollections: lightingCollections, 
        natureCollections: natureCollections, 
        soundCollections: soundCollections
    });

    // onSelection handles the boolean toggling from Map Drawer selections/switches
    // passes updates to specific state object and then to collections objects to register updates
    function onSelection(category, date, time, check) {
        var newSelection;
        switch (category){
            case 'stationaryCollections':
                newSelection = stationaryCollections;
                if (check === true) {
                    if (!newSelection[`${date}`]) newSelection[`${date}`] = [];
                    newSelection[`${date}`].push(time);
                } else {
                    var st = newSelection[date].indexOf(time);
                    newSelection[date].splice(st, 1);
                }
                setStationaryCollections(newSelection);
                setCollections({ ...collections, stationaryCollections: newSelection });
                break;
            case 'movingCollections':
                newSelection = movingCollections;
                if (check === true) {
                    if (!newSelection[`${date}`]) newSelection[`${date}`] = [];
                    newSelection[`${date}`].push(time);
                } else {
                    var m = newSelection[date].indexOf(time);
                    newSelection[date].splice(m, 1);
                }
                setMovingCollections(newSelection);
                setCollections({ ...collections, movingCollections: newSelection });
                break;
            case 'orderCollections':
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
                break;
            case 'boundariesCollections': 
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
                break;
            case 'lightingCollections': 
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
                break;
            case 'natureCollections':
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
                break;
            case 'soundCollections':
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
                break;
            default:
                console.log(`Error handling selection change.`);
        }
    };

    //Handles clicks for Project Map Creation and editing
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

    //Used for searching Google Places
    const form0 = (
        <div id='newProjectInput'>
            <TextField id='location-search' label='Project Location' type='search' value={ loc }/>
            <Button className='newHoveringButtons'>Search</Button>
            <Button className='newHoveringButtons' onClick={() => setClick()}>Clear</Button>
        </div>
    );

    //Renders all selected activity options to the corresponding markers, polylines and boundaries
    const actCoords = (collections) => (
        Object.entries(collections).map(([title, object], index) => (
            Object.entries(object).map(([sdate, stimes])=>(
                stimes.map(time => (
                    Object.entries(data.Activities[title][sdate][time].data).map(([ind, point], i2)=>(
                        (point.movement ? 
                            <Path 
                                key={`${sdate}.${time}.${i2}`} 
                                path={point.path} 
                                movement={point.movement}
                            />:<Marker 
                                key={`${sdate}.${time}.${i2}`} 
                                info={point.average ? 
                                    (`<div><b>${testNames[title]}</b><br/>Location ${i2}<br/>${point.average} dB</div>`) 
                                    : (point.result ? 
                                        (`<div><b>${testNames[title]}</b><br/>Location ${i2}<br/>${point.result}</div>`) 
                                        : (point.posture ? 
                                            (`<div><b>${testNames[title]}</b><br/>Location ${i2}<br/>${point.posture}</div>`) 
                                            : null)) } 
                                position={point.standingPoint ? point.standingPoint : point.point} 
                                markerType={point.average ? 'soundCollections' 
                                    : (point.result ? point.result : (point.posture ? point.posture : null))} 
                                markerSize={title === 'soundCollections' ? point.average : null} 
                            />
                        )
                    ))
                ))
            ))
        ))
    );

    return (
        <>
            {/* Map Drawers overlay in map.jsx to better communicate*/}
            { props.type === 1 ? <MapDrawers drawers={data} selection={onSelection} /> : null }
            { props.type === 1 ? <Button id='printButton'>Print Map</Button>: null }
            {/* Wrapper imports Google Maps API */}
            <Wrapper apiKey={''} render={ render } id='mapContainer'>
                <Map
                    center={ center }
                    onClick={ onClick }
                    onIdle={ onIdle }
                    zoom={ zoom }
                    order={ orderCollections }
                    boundaries={ boundariesCollections }
                    lighting={ lightingCollections }
                    nature={ natureCollections }
                    sound={ soundCollections }
                    data={ areaData }
                >
                    { props.type === 1 && areaData ? <Bounds area={areaData}/> : null }
                    { props.type === 1 ? actCoords(collections) :<Marker position={click}/> }
                </Map>
            </Wrapper>
            {/* Basic form for searching for places */}
            { props.type === 0 ? form0 : null }
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
            <div ref={ ref } style={ style } id='mapFrame'/>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    // sets the map prop on the child component (markers)
                    return React.cloneElement(child, { map });
                }
            })}
        </>
    );
};

const Marker = (options) => {
    const markerType = options.markerType;
    const info = options.info;
    const markerSize = Number(options.markerSize);
    const colors = {
        soundCollections: ['#B073FF', '#B073FF'],
        animals: ['#9C4B00', 'red'],
        plants: ['#BEFF05', 'red'],
        squatting: ['green', 'black'],
        sitting: ['red', 'black'],
        standing: ['blue', 'black'],
        laying: ['yellow', 'black'],
        none: ['white', 'white']
    }

    //SVG shape icons
    const style = {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: colors[markerType][0],
        fillOpacity: (markerSize ? 0.3 : 0.8),
        scale: (markerSize ? markerSize : 10),
        strokeWeight: 1, 
        strokeColor: colors[markerType][1]

    };

    const icon = (colors[markerType][0]) ? style : null;
    const [marker, setMarker] = React.useState();
    const [infoWindow, setInfoWindow] = React.useState()

    React.useEffect(() => {
        if (!marker) {
            setMarker(new google.maps.Marker({ 
                icon: icon, 
                zIndex: (markerType === 'soundCollections' ? 1 : 99999999)}));
            if(!infoWindow){
                setInfoWindow(new google.maps.InfoWindow({
                    content: info,
                }));
            }
        }

        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker, icon, info, infoWindow, markerType]);

    React.useEffect(() => {
        if (marker) {
            marker.setOptions({ clickable: true, map: options.map, position: options.position });

            marker.addListener('click', () => {
                infoWindow.open({
                    anchor: marker,
                    map: options.map,
                    shouldFocus: false,
                });
            });
        }
    }, [marker, options, infoWindow]);

    return null;
};

const Bounds = (options) => {
    const [paths, setPaths] = React.useState();
    const bounds = {
        area: {
            paths: options.area,
            strokeColor: 'rgba(255,0,0,0.5)',
            strokeOpacity: 0.8,
            strokeWeight: 3,
            fillColor: 'rgba(0,0,0,0.2)',
        },
        water:{},
        construction:{},
        material:{},
        shelter:{}
    }

    React.useEffect(() => {
        if (!paths) {
            setPaths(new google.maps.Polygon(bounds.area));
        }

        return () => {
            if (paths) {
                paths.setMap(null);
            }
        };
    }, [paths, bounds.area]);

    React.useEffect(() => {
        if (paths) {
            paths.setOptions({ map: options.map });
        }
    }, [paths, options]);

    return null;
};

const Path = (options) => {
    const [path, setPath] = React.useState();

    const colors = {
        walking: '#0000FF',
        running: '#FF0000',
        swimming: '#FFFF00',
        onwheels: '#008000',
        handicap: '#FFA500'
    }

    console.log(colors[options.movement])

    const lines = {
        style: {
            path: options.path,
            strokeColor: colors[options.movement],
            strokeOpacity: 0.9,
            strokeWeight: 2
        }
    }

    React.useEffect(() => {
        if (!path) {
            setPath(new google.maps.Polyline(lines.style));
        }

        return () => {
            if (path) {
                path.setMap(null);
            }
        };
    }, [path, lines.style]);

    React.useEffect(() => {
        if (path) {
            path.setOptions({ map: options.map });
        }
    }, [path, options]);

    return null;
}

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