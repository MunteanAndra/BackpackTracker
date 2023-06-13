import React, {useEffect, useState} from "react";
import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";
import {GOOGLE_API_KEY} from "../../mapsAPI";
import {onValue, ref} from "firebase/database";
import {db} from "../../firebase";

export const RouteMap = () => {

    const [activeMarker, setActiveMarker] = useState(null);
    const [coordinates, setCoordinates] = useState([]);

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

    useEffect(() => {
        onValue(ref(db, '/coordinates'), (snapshot) => {
            setCoordinates([]);
            const data = snapshot.val();
            if (data !== null) {
                Object.values(data).map(set => {
                    setCoordinates((oldArray) => [...oldArray, set]);
                });
            }
        });
    }, []);

    const buildMarkers = (coordinates) => {

        const markers = [];
        for (let i = 0; i <= coordinates.length/2-1; i++) {
            const marker = {
                id: i+1,
                position: {
                    lat: coordinates[i],
                    lng: coordinates[i + coordinates.length/2]
                }
            };
            markers.push(marker);
        }
        return markers;
    };

    const centerCoordinates = {
        lat: coordinates[0],
        lng: coordinates[coordinates.length/2]
    };

    const markers = buildMarkers(coordinates);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: GOOGLE_API_KEY,
    });

    const handleOnLoad = (map) => {
        const bounds = new window.google.maps.LatLngBounds();
        markers.forEach(({ position }) => bounds.extend(position));
        map.fitBounds(bounds);
    };

    return isLoaded ? (
        <div style={{ margin: '3rem' }}>
        <GoogleMap
            onLoad={handleOnLoad}
            onClick={() => setActiveMarker(null)}
            center={centerCoordinates}
            zoom={15}
            mapContainerStyle={{ height: "100vh" }}
        >
            {markers.map(({ id,position }) => (
                <Marker
                    key={id}
                    position={position}
                    onClick={() => handleActiveMarker(id)}
                >
                </Marker>
            ))}
        </GoogleMap>
        </div>
    ) : <></>
}

