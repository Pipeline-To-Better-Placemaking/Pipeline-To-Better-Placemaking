import * as React from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import { createCustomEqual } from 'fast-equals';
import { isLatLngLiteral } from '@googlemaps/typescript-guards';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import './controls.css';

const render = (status) => {
    return <h1>{status}</h1>;
};

function FullMap(props){
    const [click, setClick] = React.useState(props.type === 2 ? null :(props.type === 0 ? null : []));
    const [zoom, setZoom] = React.useState(props.zoom ? props.zoom : 10); // initial zoom
    const [center, setCenter] = React.useState({ lat: props.center.lat, lng: props.center.lng});
    const [loc, setLoc] = React.useState();

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

    return (
        <>
            <Wrapper apiKey={''} render={render}>
                <Map
                    center={center}
                    onClick={onClick}
                    onIdle={onIdle}
                    zoom={zoom}
                >
                    {props.type === 1 ? 
                        click.map((latLng, i) => (
                            <Marker key={i} position={latLng}/>
                        ))
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

    const style = {
        Sound: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#B073FF',
            fillOpacity: 0.5,
            scale: 10,
            strokeWeight: 1, 
            strokeColor: '#B073FF'
        }, 
        Animals: {
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

    const [marker, setMarker] = React.useState(new google.maps.Marker({ icon: style.Animals }));

    React.useEffect(() => {
        if (!marker) {
            setMarker(new google.maps.Marker({icon: style.Sound}));
        }

        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker, style.Sound]);

    React.useEffect(() => {
        if (marker) {
            marker.setOptions({position: options.position, map:options.map});
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