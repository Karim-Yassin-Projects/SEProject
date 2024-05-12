import {useCallback, useEffect, useState} from "react";
import {GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

function Location(){
    const [position, setPosition] = useState({lat: 30.0444, lng: 31.2357});
    // noinspection SpellCheckingInspection
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBzhIL1AJxDc3-0KxRm8fzZEGV2hLUfzXo"
    });

    const containerStyle = {
        width: '400px',
        height: '400px'
    };
    const [, setMap] = useState<google.maps.Map|null>(null)


    useEffect(() => {
        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition((position) => {
        //         setPosition({
        //             lat: position.coords.latitude,
        //             lng: position.coords.longitude,
        //         });
        //     });
        // } else {
        //     console.log("Geolocation is not supported by this browser.");
        // }
    }, []);
    const onLoad = useCallback((m: google.maps.Map) => {
        setMap(m);
        m.setZoom(15);
    }, [setMap]);
    const onUnmount = useCallback(() => {
        setMap(null)
    }, []);

    // const onMapClick = (event: google.maps.MapMouseEvent) => {
    //     if (event.latLng) {
    //         setPosition({
    //             lat: event.latLng.lat(),
    //             lng: event.latLng.lng(),
    //         });
    //     }
    // }

    return (isLoaded ?
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={position}
            zoom={16}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={(e) => setPosition({lat: e.latLng!.lat(), lng: e.latLng!.lng()})}
        >
            <Marker position={position} />
        </GoogleMap>
        : <></>);
}
export default Location;