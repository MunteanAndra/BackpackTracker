import {GoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api';
import {useCallback, useState} from "react";
import {GOOGLE_API_KEY} from "../../mapsAPI";

/*import Geocoder from "react-geocode";

Geocoder.setApiKey(GOOGLE_API_KEY);
Geocoder.setRegion("ro");
Geocoder.setLocationType("ROOFTOP");

Geocoder.fromLatLng("48.8583701", "2.2922926").then(
    (response) => {
        const address = response.results[0].formatted_address;
        console.log(address);
    },
    (error) => {
        console.error(error);
    }
);*/

const containerStyle = {
    width: '100%',
    height: '100%'
};

const gpsLocation = {
    lat: 45.74754,
    lng: 21.226026
};

export const LocationHandler = () => {
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_API_KEY
    })

    const [map, setMap] = useState(null);

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
            zoom={19}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <Marker position={gpsLocation}/>
        </GoogleMap>
    ) : <></>
}
