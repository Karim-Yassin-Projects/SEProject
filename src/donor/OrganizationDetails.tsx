import {Organization} from "../common/organizations.ts";
import {GoogleMap, MarkerF, useJsApiLoader} from "@react-google-maps/api";
import {useCallback, useEffect, useState} from "react";

// noinspection SpellCheckingInspection
const API_KEY = "AIzaSyBzhIL1AJxDc3-0KxRm8fzZEGV2hLUfzXo";


function OrganizationDetails({organization}: { organization: Organization }) {
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: API_KEY
    });

    const [map, setMap] = useState<google.maps.Map | null>(null)
    const containerStyle = {
        width: '400px',
        height: '400px'
    };
    const onLoad = useCallback((m: google.maps.Map) => {

        setMap(m);
        m.setZoom(15);
    }, []);
    const onUnmount = useCallback(() => {
        setMap(null)
    }, []);
    useEffect(() => {
        if (!map) {
            return;
        }
        const pos = {
            lat: organization.latitude,
            lng: organization.longitude
        }
        map.panTo(pos);
        map.setCenter(pos);
    }, [organization, map]);


    return (
        <div>
            <h5 className="card-title">{organization.name}</h5>
            <div className=" row">
                <div className="col-md-6">
                    <p>
                        <strong>Type</strong>: {organization.type}<br/>
                        <strong>Website</strong>: <a href="https://www.example.com">https://www.example.com</a><br/>
                        <strong>Email</strong>: <a href="mailto:info@example.com">info@example.com</a>
                    </p>
                    <p>
                        <strong>Address</strong>: {organization.address}, {organization.area}<br/>
                        <strong>Governorate</strong>: {organization.governorate}<br/>
                        <strong>Phone</strong>: {organization.phone}
                    </p>
                </div>
                <div className="col-md-6">
                    {(isLoaded ?
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            onLoad={onLoad}
                            onUnmount={onUnmount}
                        >
                            <MarkerF position={{
                                lat: organization.latitude,
                                lng: organization.longitude
                            }}
                            />
                        </GoogleMap>
                        : <></>)}
                </div>
            </div>
        </div>
    );
}

export default OrganizationDetails;