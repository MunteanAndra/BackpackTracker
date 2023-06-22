import React, {useEffect, useState} from "react";
import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";
import {GOOGLE_API_KEY} from "../../mapsAPI";
import {onValue, ref} from "firebase/database";
import {db} from "../../firebase";

export const RouteMap = () => {

    const [activeMarker, setActiveMarker] = useState(null);
    const [latitudes, setLatitudes] = useState([]);
    const [longitudes, setLongitudes] = useState([]);

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

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

    const buildMarkers = (latitudes, longitudes) => {

        const markers = [];
        for (let i = 0; i <= latitudes.length - 1; i++) {
            const marker = {
                id: i+1,
                position: {
                    lat: latitudes[i],
                    lng: longitudes[i]
                }
            };
            markers.push(marker);
        }
        return markers;
    };

    const centerCoordinates = {
        lat: latitudes[0],
        lng: longitudes[0]
    };

    const markers = buildMarkers(latitudes, longitudes);

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

