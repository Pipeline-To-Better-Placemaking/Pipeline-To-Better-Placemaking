import * as React from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import { createCustomEqual } from 'fast-equals';
import { isLatLngLiteral } from '@googlemaps/typescript-guards';
import Button from '@mui/material/Button';
import UndoIcon from '@mui/icons-material/Undo';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';

import MapDrawers from './MapDrawers';
import { testNames } from '../functions/HelperFunctions';
import './controls.css';

const render = (status) => {
    console.log(status);
    return <h1>{ status }</h1>;
};

    // props.type :
    // 0 - new project
    // 1 - Map Page
    // 2 - edit project
    // 3 - new project points
    // 4 - new project area
    // 5 - new project map
function FullMap(props) {
    const [map, setMap] = React.useState(null);
    const [mapPlaces, setMapPlaces] = React.useState(null);
    const [placeOn, setPlaceOn] = React.useState(false);
    const [title, setTitle] = React.useState(props.type > 0 ? props.title : null);
    const [zoom, setZoom] = React.useState(props.zoom ? props.zoom : 10); // initial zoom
    const [center, setCenter] = React.useState(props.center.lat ? { lat: props.center.lat, lng: props.center.lng } : { lat:28.54023216523664, lng:-81.38181298263407 });
    const [bounds, setBounds] = React.useState();
    const [click, setClick] = React.useState(props.type === 0 || props.type === 2 ? props.center : null);
    const [data, setData] = React.useState(props.type === 1 ? props.drawers : {});
    const [areaData, setAreaData] = React.useState(props.type === 1 || props.type === 3 || props.type === 5 ? props.area : null);
    const [clicks, setClicks] = React.useState(props.type === 5 ? props.points : (props.type === 3 ? [props.center] :[]));

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
        stationary_collections: stationaryCollections,
        moving_collections: movingCollections,
        order_collections: orderCollections, 
        boundaries_collections: boundariesCollections, 
        lighting_collections: lightingCollections, 
        nature_collections: natureCollections, 
        sound_collections: soundCollections
    });

    var updateKey = 0;

    // onSelection handles the boolean toggling from Map Drawer selections/switches
    // passes updates to specific state object and then to collections objects to register updates
    function onSelection(category, date, time, check) {
        var newSelection;
        switch (category) {
            case 'stationary_collections':
                newSelection = stationaryCollections;
                if (check === true) {
                    if (!newSelection[`${date}`]) newSelection[`${date}`] = [];
                    newSelection[`${date}`].push(time);
                } else {
                    var st = newSelection[date].indexOf(time);
                    newSelection[date].splice(st, 1);
                }
                setStationaryCollections(newSelection);
                setCollections({ ...collections, stationary_collections: newSelection });
                break;
            case 'moving_collections':
                newSelection = movingCollections;
                if (check === true) {
                    if (!newSelection[`${date}`]) newSelection[`${date}`] = [];
                    newSelection[`${date}`].push(time);
                } else {
                    var m = newSelection[date].indexOf(time);
                    newSelection[date].splice(m, 1);
                }
                setMovingCollections(newSelection);
                setCollections({ ...collections, moving_collections: newSelection });
                break;
            case 'order_collections':
                newSelection = orderCollections;
                if (check === true) {
                    if (!newSelection[`${date}`]) newSelection[`${date}`] = [];
                    newSelection[`${date}`].push(time);
                } else {
                    var o = newSelection[date].indexOf(time);
                    newSelection[date].splice(o, 1);
                }
                setOrderCollections(newSelection);
                setCollections({...collections, order_collections: newSelection});
                break;
            case 'boundaries_collections': 
                newSelection = boundariesCollections;
                if (check === true) {
                    if (!newSelection[`${date}`]) newSelection[`${date}`] = [];
                    newSelection[`${date}`].push(time);
                } else {
                    var b = newSelection[date].indexOf(time);
                    newSelection[date].splice(b, 1);
                }
                setBoundariesCollections(newSelection);
                setCollections({ ...collections, boundaries_collections: newSelection });
                break;
            case 'lighting_collections': 
                newSelection = lightingCollections;
                if (check === true) {
                    if (!newSelection[`${date}`]) newSelection[`${date}`] = [];
                    newSelection[`${date}`].push(time);
                } else {
                    var l = newSelection[date].indexOf(time);
                    newSelection[date].splice(l, 1);
                }
                setLightingCollections(newSelection);
                setCollections({ ...collections, lighting_collections: newSelection });
                break;
            case 'nature_collections':
                newSelection = natureCollections;
                if (check === true) {
                    if (!newSelection[`${date}`]) newSelection[`${date}`] = [];
                    newSelection[`${date}`].push(time);
                } else {
                    var n = newSelection[date].indexOf(time);
                    newSelection[date].splice(n, 1);
                }
                setNatureCollections(newSelection);
                setCollections({ ...collections, nature_collections: newSelection });
                break;
            case 'sound_collections':
                newSelection = soundCollections;
                if (check === true) {
                    if (!newSelection[`${date}`]) newSelection[`${date}`] = [];
                    newSelection[`${date}`].push(time);
                } else {
                    var s = newSelection[date].indexOf(time);
                    newSelection[date].splice(s, 1);
                }
                setSoundCollections(newSelection);
                setCollections({ ...collections, sound_collections: newSelection });
                break;
            default:
                console.log(`Error handling selection change.`);
        }
    };

    //html2canvas functions --- saveAs, convertToImage -----
    function saveAs(url, filename) {
        var link = document.createElement('a');

        //simulated link and link click with removal
        if (typeof link.download === 'string') {

            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();

            //remove the link when done
            document.body.removeChild(link);
        } else {
            window.open(url);
        }
    }

    const convertToImage = (e) => {
        html2canvas(document.getElementById('mapFrame'), {
            useCORS: true
        }).then(
            function(canvas) {saveAs(canvas.toDataURL(), `${title}.png`)}
        );
    }

    // Event handling functions ------
    const onMClick = (e) => {
        if(props.type === 2 || props.type === 0) {
            setClick(e.latLng);
            setCenter(e.latLng);
        } else if(props.type === 3 || props.type === 4) {
            var clickObj = {
                lat: 0,
                lng: 0
            }
            clickObj.lat = e.latLng.lat();
            clickObj.lng = e.latLng.lng();
            setClicks([...clicks, clickObj]);
            console.log(clicks);
        } else {
            setCenter(e.latLng);
        }
    };

    const onPClick = (e) => {
        if (props.type === 0) {
            setClick(e.latLng);
            setCenter(e.latLng);
        } else {
            setClick(e.latLng);
        }
    };

    const onIdle = (m) => {
        setZoom(m.getZoom() ? m.getZoom() : 10);
        setCenter(m.getCenter().toJSON());
    };

    const onBounds = (m, p) => (event) => {
        setBounds(p.setBounds(m.getBounds()));
    };

    const onChange = (p) => (event) => {
        const place = p.getPlace();
        setCenter(place.geometry.location);
        setClick(place.geometry.location);
    }

    const removePoint = (e) => {
        let temp = clicks;
        temp.splice(clicks.length-1, 1);
        setClicks(temp);
    };

    const togglePlaces = (e) => {
        setPlaceOn(!placeOn);
    }

    const boundsPathWindow = (title, date, time, index, ver) => (e) => {
        console.log(title, date, time, index);
        const popup = document.getElementById('pathBoundWindow');
        const inner = document.getElementById('popUpText');
        if(ver === 0 || ver === 2) {
            // version 0 & 2 === spatial boundaries (constructed = polyline, shelter and material boundary)
            inner.innerHTML = '';
            inner.innerHTML = `<h5>${testNames(title)}</h5><br/>Location ${index+1}<br/>kind: ${data.Activities[title][date][time].data[index].kind}<br/>description: ${data.Activities[title][date][time].data[index].description}<br/>value: ${data.Activities[title][date][time].data[index].value}`
            popup.style.display = 'flex';
        } else if(ver === 1) {
            // version 1 == water nature collection
            const popup = document.getElementById('pathBoundWindow');
            inner.innerHTML = '';
            inner.innerHTML = `<h5>${testNames(title)}</h5><br/>Location ${index+1}<br/>result: ${data.Activities[title][date][time].data[index].result}<br/>value: ${data.Activities[title][date][time].data[index].value}`
            popup.style.display = 'flex';
        } else {
            // version 3 moving collections
            const popup = document.getElementById('pathBoundWindow');
            inner.innerHTML = '';
            inner.innerHTML = `<h5>${testNames(title)}</h5><br/>Location ${index+1}<br/>mode: ${data.Activities[title][date][time].data[index].mode}`
            popup.style.display = 'flex';
        }
    }

    const closeWindow = (e) => {
        const popup = document.getElementById('pathBoundWindow');
        const inner = document.getElementById('popUpText');
        popup.style.display = 'none';
        inner.innerHTML = '';
    }

    //Renders all selected activity options to the corresponding markers, polylines and boundaries -----
    const actCoords = (collections) => (
        Object.entries(collections).map(([title, object], index) => (
            Object.entries(object).map(([sdate, stimes])=>(
                stimes.map(time => (
                    Object.entries(data.Activities[title][sdate][time].data).map(([ind, point], i2)=>(
                        (point.mode || point.kind === 'Constructed' ? 
                            <Path 
                                key={`${sdate}.${time}.${i2}`} 
                                path={point.path} 
                                mode={point.mode ? point.mode : point.kind}
                                title={title} date={sdate} time={time} index={i2}
                                boundsPathWindow={boundsPathWindow}
                            /> 
                            :
                            (point.kind === 'Shelter' || point.kind === 'Material' || point.result === 'Water' ? 
                                <Bounds 
                                    key={`${sdate}.${time}.${i2}`} 
                                    title={title} 
                                    date={sdate} 
                                    time={time} 
                                    index={i2} 
                                    area={point.path} 
                                    type={point.kind ? point.kind : point.result} 
                                    boundsPathWindow={boundsPathWindow}
                                /> 
                                :
                                <Marker 
                                    key={`${sdate}.${time}.${i2}`} 
                                    shape={title === 'order_collections' ? 'triangle' : (title === 'lighting_collections' ? 'lightcircle' : 'circle')}
                                    info={ point.average ? 
                                        (`<div><b>${testNames(title)}</b><br/>Location ${i2}<br/>${point.average} dB</div>`) 
                                            : (point.result ? 
                                                (`<div><b>${testNames(title)}</b><br/>Location ${i2}<br/>${point.result}</div>`)
                                                    : (point.posture ? 
                                                        (`<div><b>${testNames(title)}</b><br/>Location ${i2}<br/>${point.posture}</div>`) 
                                                            : null)) } 
                                    position={point.standingPoint ? point.standingPoint : point.point} 
                                    markerType={point.average ? 'sound_collections' 
                                        : (point.result ? point.result : (point.posture ? point.posture : null))} 
                                    markerSize={title === 'sound_collections' ? point.average : null} 
                                />
                            )
                        )
                    ))
                ))
            ))
        ))
    );

    // Components returned on render -----
    return (
        <div id='mapDoc'>
            {/* Map Drawers overlay in map.jsx to better communicate*/}
            { props.type === 1 ? <MapDrawers drawers={data} selection={onSelection} area={ areaData }/> : null }
            { props.type === 1 ? <Button id='printButton' onClick={convertToImage}>Print Map</Button>: null }
            {/* Wrapper imports Google Maps API */}
            <Wrapper apiKey={''} render={render} id='mapContainer' libraries={['drawing', 'places']}>
                <Map
                    center={ center }
                    onClick={ onMClick }
                    onIdle={ onIdle }
                    onBounds={ onBounds }
                    mapObj={ setMap }
                    places={ mapPlaces }
                    zoom={ zoom }
                >
                    { areaData ? <Bounds area={areaData} type={'area'} /> :  null }
                    { props.type === 1 ? 
                        actCoords(collections) : 
                        (props.type === 2 || props.type === 4 ? 
                            <Marker position={props.center} /> : 
                            (props.type === 0 ? 
                                <Marker position={center} /> : null)) }
                    { props.type === 0 ? <Places map={map} onChange={placeOn ? onChange : null} on={placeOn} togglePlaces={togglePlaces} onClick={onPClick} center={center} zoom={zoom} /> : null }
                    {/* Change marker types for non center markers to show difference */}
                    { props.type === 3 || props.type === 5 ? clicks.map((latLng, i) => (<Marker key={i} position={ latLng } info={`<div>Position ${i}</div>`}/>)) : null }
                    { props.type === 4 ? NewArea(clicks,updateKey) : null } {/*<DrawBounds onComplete={ onComplete } center={ props.center } zoom={ zoom } title={ title } points={ clicks }/>: null */}
                </Map>
            </Wrapper>
            { props.type === 4 ?
                <div id='newAreaBlock'>
                    <Button
                        id='newAreaButton'
                        className='newHoveringButtons confirm'
                        component={ Link }
                        to='points'
                        state={({ center: center, title: title, area: clicks, zoom: zoom })}
                    >
                        Set Bounds
                    </Button>
                    <Button className='newHoveringButtons' onClick={ removePoint }>Undo <UndoIcon /></Button>
                </div> : null
            }
            { props.type === 3 ? 
                <Button
                    id='newPointsButton'
                    className='newHoveringButtons confirm'
                    component={ Link }
                    to='/home/teams/:id/new/area/points/form'
                    state={{
                        center: center, 
                        title: title, 
                        area: areaData, 
                        points: clicks, 
                        zoom: zoom
                    }}
                >
                    Set Points
                </Button> : null
            }
            <div id='pathBoundWindow' style={{display: 'none', position: 'fixed', flexDirection: 'row', justifyContent: 'center'}}>
                <div id='popUpBlock'>
                    <div id='popUpText'></div>
                    <Button id='closeButton' onClick={closeWindow}>Close</Button>
                </div>
            </div>
        </div>
    );
};

interface MapProps extends google.maps.MapOptions {
    style: { [key: string]: string };
    onClick?: (e: google.maps.MapMouseEvent) => void;
    onIdle?: (map: google.maps.Map) => void;
    onBounds?: (map: google.maps.Map, place: google.maps.places.Autocomplete) => void;
}

const Map: React.FC<MapProps> = ({ onClick, onIdle, onBounds, mapObj, places, children, style, ...options }) => {
    const ref = React.useRef(null);
    const [map, setMap] = React.useState();

    React.useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}));
            mapObj(map);
        }
    }, [ref, map, mapObj]);

    useDeepCompareEffectForMaps(() => {
        if (map) {
            map.setOptions(options);
        }
    }, [map, options]);

    React.useEffect(() => {
        if (map) {
            ['click', 'idle', 'bounds_changed'].forEach((eventName) =>
                google.maps.event.clearListeners(map, eventName)
            );
            if (onClick) {
                map.addListener('click', onClick);
            }

            if (onIdle) {
                map.addListener('idle', () => onIdle(map));
            }

            if(onBounds) {
                map.addListener('bounds_changed', () => onBounds(map, places))
            }
        }
    }, [map, onClick, onIdle, onBounds, places]);

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
    const shape = options.shape;

    const colors = {
        sound_collections: ['#B073FF', '#B073FF'],
        animals: ['#9C4B00', 'red'],
        plants: ['#BEFF05', 'red'],
        Squatting: ['green', 'black'],
        Sitting: ['red', 'black'],
        Standing: ['blue', 'black'],
        Laying: ['yellow', 'black'],
        human: ['#FF9900', '#FF9900'],
        built: ['#FFE600', '#FFD800'],
        none: ['white', 'white'],
        Rhythmatic: ['#FFE600', '#FFD800'],
        Task: ['#FF9900', '#FF9900'],
        Building: ['#FF00E5', '#FF00E5'],
        New: ['rgba(255, 0, 0, 0.5)', 'rgba(255,0,0,0.5)']
    };
    
    //SVG shape icons
    let style = {
        path: shape === 'triangle' ? 'M 0 2 L 2 2 L 1 0.25 z' : 
            (shape === 'lightcircle' ? ("M 3.102 1.097 C 1.999 1.097 1.102 1.994 1.102 3.097 C 1.102 4.2 1.999 5.097 3.102 5.097 C 4.205 5.097 5.102 4.2 5.102 3.097 C 5.102 1.994 4.205 1.097 3.102 1.097 Z M 3.102 4.552 C 2.3 4.552 1.647 3.899 1.647 3.097 C 1.647 2.295 2.3 1.642 3.102 1.642 C 3.904 1.642 4.557 2.295 4.557 3.097 C 4.557 3.899 3.904 4.552 3.102 4.552 Z M 3.738 3.097 C 3.738 3.448 3.453 3.733 3.102 3.733 C 2.751 3.733 2.466 3.448 2.466 3.097 C 2.466 2.746 2.751 2.461 3.102 2.461 C 3.453 2.461 3.738 2.746 3.738 3.097 Z") : google.maps.SymbolPath.CIRCLE),
        fillColor: markerType ? colors[markerType][0] : colors.none[0],
        fillOpacity: (markerSize ? 0.3 : 0.8),
        scale: (markerSize ? (markerSize/2) : (shape === 'lightcircle' ? 5 : 10)),
        strokeWeight: 1, 
        strokeColor: markerType ? colors[markerType][1] : colors['none'][0],
        anchor: shape === 'lightcircle' ? new google.maps.Point(3.1, 3.1) : (shape === 'triangle' ? new google.maps.Point(1, 1) : new google.maps.Point(0,0))
    };

    const icon = markerType ? ((colors[markerType][0]) ? style : null) : null;

    const [marker, setMarker] = React.useState();
    const [infoWindow, setInfoWindow] = React.useState()

    React.useEffect(() => {
        if (!marker) {
            setMarker(new google.maps.Marker({ 
                icon: icon, 
                zIndex: (markerType === 'sound_collections' ? 10 : 99999999)}));
            if(!infoWindow) {
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
            marker.setOptions({ clickable: true, map: options.map, position: options.position ? options.position : null });

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

const Bounds = ({boundsPathWindow, ...options}) => {
    const [paths, setPaths] = React.useState();
    const [area, setArea] = React.useState(options.area);

    const type = options.type;

    if (area !== options.area && type === 'New') {
        setArea(options.area)
    }

    const bounds = {
        area: {
            paths: area,
            strokeColor: 'rgba(255,0,0,0.5)',
            strokeOpacity: 0.8,
            strokeWeight: 3,
            fillColor: 'rgba(0,0,0,0.2)',     
            clickable: false                 
        },
        types: {
            paths: area,
            strokeColor: type === 'Water' ? '#2578C5' : (type === 'Material' ? '#00FFC1' : (type === 'Shelter' ? '#FFA64D' : (type === 'New' ? 'rgba(255,0,0,0.5)' : '#FFFFFF'))),
            strokeWeight: 2,
            fillColor: type === 'Water' ? '#2578C5' : (type === 'Material' ? '#00FFC1' : (type === 'Shelter' ? '#FFA64D' : (type === 'New' ? 'rgba(255,0,0,0.5)' :'#C4C4C4'))),
            fillOpacity: 0.45,
            clickable: type === 'New' ? false : true
        },
    }

    React.useEffect(() => {
        if (!paths) {
            setPaths(new google.maps.Polygon(type === 'area' ? bounds.area : bounds.types));
        }

        return () => {
            if (paths) {
                paths.setMap(null);
            }
        };
    }, [paths, type, bounds.area, bounds.types, bounds.new]);

    React.useEffect(() => {
        if (paths) {
            paths.setOptions({ map: options.map, paths: area });

            ['click'].forEach((eventName) =>
                google.maps.event.clearListeners(paths, eventName)
            );

            if (boundsPathWindow) {
                paths.addListener('click', boundsPathWindow(options.title, options.date, options.time, options.index, (type === 'Water' ? 1 : 0)));
            }
        }

    }, [paths, options, type, area, boundsPathWindow]);

    return null;
};

const Path = ({boundsPathWindow, ...options}) => {
    const [path, setPath] = React.useState();
    const type = options.title;

    const colors = {
        Walking: '#0000FF',
        Running: '#FF0000',
        Swimming: '#FFFF00',
        'Activity on Wheels': '#008000',
        'Handicap Assisted Wheels': '#FFA500',
        Constructed: '#FF00E5',
        New: 'rgba(255, 0, 0, 0.5)'
    }

    const lines = {
        style: {
            path: options.path,
            strokeColor: colors[options.mode],
            strokeOpacity: 0.9,
            strokeWeight: 2,
            clickable: true
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

            ['click'].forEach((eventName) =>
                google.maps.event.clearListeners(path, eventName)
            );

            if (boundsPathWindow) {
                path.addListener('click', boundsPathWindow(options.title, options.date, options.time, options.index, (type === 'moving_collections' ? 3 : 2)));
            }
        }
    }, [path, options, type, boundsPathWindow]);

    return null;
}

const NewArea = (points, key) => (
    !points ? null : 
        (points.length <= 1 ?
            points.map((coord, index) => (
            <Marker
                key={index}
                position={coord}
            />
        )) :
            (points.length === 2 ?
                <Path
                    path={ points }
                    mode='New'
                />
            :
            <Bounds
                area={ points }
                type='New'
            />
        )
    )
);

interface PlaceProps extends google.maps.places.AutocompleteOptions {
    onChange?: (place: google.maps.places.Autocomplete) => void;
}

const Places: React.FC<PlaceProps> = ({onChange, ...options}) => {
    const [placesWidget, setPlacesWidget] = React.useState();
    const ref = React.useRef(null);

    React.useEffect(() => {
        if (ref.current && !placesWidget && options.on) {
            setPlacesWidget(
                new google.maps.places.Autocomplete(ref.current, {
                    types: ['establishment'],
                    componentRestrictions: { country: ['US'] },
                    fields: ['name', 'address_components', 'geometry'],
                })
            );
        }
    }, [ref, placesWidget, options.on]);

    useDeepCompareEffectForMaps(() => {
        if (placesWidget) {
            placesWidget.setOptions({
                types: ['establishment'],
                componentRestrictions: { country: ['US'] },
                fields: ['name', 'address_components', 'geometry'],
            });
        }
    }, [placesWidget]);

    React.useEffect(() => {
        if ( placesWidget) {
            ['place_changed'].forEach((eventName) =>
                google.maps.event.clearListeners(placesWidget, eventName)
            );

            if (onChange) {
                placesWidget.addListener('place_changed', onChange(placesWidget));
            }
        }
    }, [placesWidget, onChange]);

    return(
        <div id='newProjectInput'>
            <Button
                id='placesButton'
                className='newHoveringButtons'
                onClick={options.togglePlaces}
            >
                { options.on ? 'Disbale Autocomplete' : 'Enable Autocomplete'}
            </Button>
            <input ref={ ref } name='search' id='locationSearch' label='Project Location' type='text' />
            <Button 
                className='newHoveringButtons' 
                id='newLocationButton' 
                component={ Link } to='area' 
                state={({ 
                    center: options.center, 
                    title: ( placesWidget && placesWidget.getPlace() ? placesWidget.getPlace().name : document.getElementById('locationSearch')?.value),
                    zoom: options.zoom
                })}
            >
                Set Project
            </Button>
        </div>
    );
}

// Helper functions for React use of Google Maps, required for React to recognize changes at deeper elements --
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