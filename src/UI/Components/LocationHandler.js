import {GoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api';
import {useCallback, useEffect, useState} from "react";
import {GOOGLE_API_KEY} from "../../mapsAPI";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../firebase";
import {onValue, ref} from "firebase/database";

const containerStyle = {
    width: '100%',
    height: '100%'
};

export const LocationHandler = ({func}) => {

    const [coordinates, setCoordinates] = useState([]);
    const [map, setMap] = useState(null);
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [address, setAddress] = useState('');

    const gpsLocation = {
        lat: lat,
        lng: lng,
    };

    useEffect(() => {
        fetchLocation();
        onValue(ref(db, '/lat'), (snapshot) => {
            setLat(0);
            const data = snapshot.val();
            if (data !== null) {
                setLat(data);
            }
        });
        onValue(ref(db, '/long'), (snapshot) => {
            setLng(0);
            const data = snapshot.val();
            if (data !== null) {
                setLng(data);
            }
        });
        convertToAddress().then(r => {func(address); console.log(r)});
        console.log(address);
    }, []);

    const convertToAddress = async () => {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCWj9OaziQiK004WYa73Paqr7bvbqhgLNM`
            );
            const data = await response.json();
            if (data.status === 'OK') {
                setAddress(data.results[0].formatted_address);
            } else {
                setAddress('Unable to retrieve address');
            }
        } catch (error) {
            setAddress('Error occurred while fetching address');
        }
    };

    const fetchLocation = async () => {
        await getDocs(collection(db, "coordinates"))
            .then((data) => {
                const coordinatesFromDb = data.docs.map((doc) => ({...doc.data(), id: doc.id,}));
                setCoordinates(coordinatesFromDb);
                console.log(coordinates, coordinatesFromDb);
            })
    }

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_API_KEY
    })

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
