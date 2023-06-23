import {GoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api';
import {useCallback, useEffect, useState} from "react";
import {GOOGLE_API_KEY} from "../../mapsAPI";
import {db} from "../../firebase";
import {onValue, ref} from "firebase/database";

const containerStyle = {
    width: '100%',
    height: '100%'
};

export const LocationHandler = () => {

    const [latitudes, setLatitudes] = useState([]);
    const [longitudes, setLongitudes] = useState([]);
    const [map, setMap] = useState(null);

    useEffect(() => {
        onValue(ref(db, '/coordinates/latitude'), (snapshot) => {
            setLatitudes([]);
            const data = snapshot.val();
            if (data !== null) {
                Object.values(data).map(set => {
                    setLatitudes((oldArray) => [...oldArray, set]);
                });
            }
        });
        onValue(ref(db, '/coordinates/longitude'), (snapshot) => {
            setLongitudes([]);
            const data = snapshot.val();
            if (data !== null) {
                Object.values(data).map(set => {
                    setLongitudes((oldArray) => [...oldArray, set]);
                });
            }
        });
    }, []);

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_API_KEY
    })

    let latitude = 0, longitude = 0;

    for ( let i = 0; i <= latitudes.length -1; i++ ) {
        latitude = latitudes[i];
        longitude = longitudes[i];
    }

    const gpsLocation = {
        lat: latitude,
        lng: longitude
    }

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(gpsLocation);
        map.fitBounds(bounds);
        setMap(map);
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={gpsLocation}
            zoom={18}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <Marker position={gpsLocation}/>
        </GoogleMap>
    ) : <></>
}
