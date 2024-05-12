import {RefObject, useCallback, useEffect, useRef, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {RegisterRequest, registerSchema} from "./register.ts";
import {Formik, FormikProps} from "formik";
import FormField from "../common/FormField.tsx";
import {GoogleMap, MarkerF, useJsApiLoader} from "@react-google-maps/api";
import DocumentUpload from "../common/DocumentUpload.tsx";
import BreadCrumb from "../common/BreadCrumb.tsx";
import {Genders, Governorates, Organizations, OrganizationTypes} from "../common/organizations.ts";
// noinspection SpellCheckingInspection
const API_KEY = "AIzaSyBzhIL1AJxDc3-0KxRm8fzZEGV2hLUfzXo";

type Position = {
    lat: number;
    lng: number;
}

const defaultPosition: Position = {
    lat: 30.0444,
    lng: 31.2357
}

type AddressDetails = {
    address?: string;
    area?: string;
    governorate?: string;
}

async function getGeocoderInfo(lat: number, lng: number): Promise<google.maps.GeocoderResponse> {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`);
    return await response.json();
}

async function getAddressDetails(lat: number, lng: number): Promise<AddressDetails> {
    const details: AddressDetails = {}
    const address = await getGeocoderInfo(lat, lng);

    if (address.results && address.results.length > 0) {
        address.results = address.results.sort((a, b) => b.address_components.length - a.address_components.length);
        const result = address.results[0];
        const components: string[] = [];
        const street_number = result.address_components.find(c => c.types.indexOf("street_number") >= 0)?.long_name;
        if (street_number) {
            components.push(street_number);
        }

        const street = result.address_components.find(c => c.types.indexOf("route") >= 0)?.long_name;
        if (street) {
            components.push(street);
        }

        const area3 = result.address_components.find(c => c.types.indexOf("administrative_area_level_3") >= 0)?.long_name;
        if (area3) {
            components.push(area3);
        }

        const area2 = result.address_components.find(c => c.types.indexOf("administrative_area_level_2") >= 0)?.long_name ?? '';

        const governorate = result.address_components.find(c => c.types.indexOf("administrative_area_level_1") >= 0)?.long_name ?? '';

        details.address = components.join(' ');

        if (area2) {
            details.area = area2;
        }

        if (governorate) {
            const actual = Governorates.find(g => g.indexOf(governorate) >= 0 || governorate.indexOf(g) >= 0);
            if (actual) {
                details.governorate = actual;
            }
        }
    }
    return details;
}

async function updateAddress(details: AddressDetails, formik: FormikProps<RegisterRequest>): Promise<void> {
    if (details.address) {
        await formik.setFieldValue('organizationAddress', details.address);
    }
    if (details.area) {
        await formik.setFieldValue('area', details.area);
    }
    if (details.governorate) {
        await formik.setFieldValue('governorate', details.governorate);
    }
}

interface RegisterProps {
    update?: boolean
}

function OrganizationRegistration({update}: RegisterProps) {
    const initialValues: RegisterRequest = update ? {
        firstName: 'Kareem',
        lastName: 'ElMeteny',
        password: '12345678',
        confirmPassword: '12345678',
        email: 'kareem.elmeteny@gmail.com',
        phoneNumber: Organizations[0].phone,
        area: Organizations[0].area,
        organizationName: Organizations[0].name,
        organizationType: Organizations[0].type,
        organizationAddress: Organizations[0].address,
        gender: 'Male',
        governorate: Organizations[0].governorate,
        documentSize: 1000,
        document: 'x.pdf',
        documentType: 'pdf',
        acceptTerms: 'true'
    } : {
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        email: '',
        phoneNumber: '',
        area: '',
        organizationName: '',
        organizationType: '',
        organizationAddress: '',
        gender: '',
        governorate: '',
        documentSize: 1,
        document: '',
        documentType: '',
        acceptTerms: ''
    };
    const [position, setPosition] = useState<Position | null>(update ? {
        lat: Organizations[0].latitude,
        lng: Organizations[0].longitude
    } : null);
    useEffect(() => {
        if (update) {
            return;
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setPosition({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });

            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, [update]);
    const formikRef = useRef<FormikProps<RegisterRequest>>(null) satisfies RefObject<FormikProps<RegisterRequest>>;
    useEffect(() => {
        const formik = formikRef.current;
        if (!formik) {
            return;
        }
        if (!position) {
            return;
        }
        const doUpdateForm = async () => {
            const details = await getAddressDetails(position.lat, position.lng);
            await updateAddress(details, formik);
        }

        doUpdateForm().catch(console.error);
    }, [position, formikRef]);

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: API_KEY
    });
    const handleMapClick = useCallback(async (e: google.maps.MapMouseEvent) => {
        setPosition({lat: e.latLng!.lat(), lng: e.latLng!.lng()});
    }, [setPosition]);

    const containerStyle = {
        width: '400px',
        height: '400px'
    };
    const [map, setMap] = useState<google.maps.Map | null>(null)

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
        map.panTo(position ?? defaultPosition);
        map.setCenter(position ?? defaultPosition);
        // const bounds = new window.google.maps.LatLngBounds(position ?? defaultPosition);
        // map.fitBounds(bounds);
        //map.setZoom(20);

    }, [position, map]);

    const navigate = useNavigate();


    const handleSubmit = useCallback(() => {
        navigate(update ? '/representative' : '/representative/register-thanks');
    }, [navigate, update]);
    const handleLogin = useCallback(() => navigate('/representative/login'), [navigate]);

    const links = update ? [
        {to: '/', label: 'Home'},
        {to: '/representative', label: 'Representative Dashboard'},
        {to: '/representative/update-organization', label: 'Update Organization'},
    ] : [
        {to: '/', label: 'Home'},
        {to: '/representative/register', label: 'Organization Representative Registration'},
    ];

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={registerSchema}
                innerRef={formikRef}>
            {

                (formik) => {
                    return (
                        <div className="container">
                            <BreadCrumb links={links}/>
                            <h1>{update ? 'Update Organization' : 'Organization Representative Register'}</h1>
                            <p className="small">The marker <span className="text-danger">*</span> denotes a required
                                field.</p>
                            <div className="row">
                                <div className="col-md-6">
                                    <FormField formik={formik} name="firstName" schema={registerSchema}/>
                                    <FormField formik={formik} name="lastName" schema={registerSchema}/>
                                    <FormField formik={formik} name="gender" schema={registerSchema} options={Genders} radio />
                                    <FormField formik={formik} name="email" schema={registerSchema}/>
                                    {!update &&
                                        <>
                                            <FormField formik={formik} name="password" schema={registerSchema}/>
                                            <FormField formik={formik} name="confirmPassword" schema={registerSchema}/>
                                        </>}

                                    <FormField formik={formik} name="phoneNumber" schema={registerSchema}/>
                                    <FormField formik={formik} name="organizationName" schema={registerSchema}/>
                                    <FormField formik={formik} name="organizationType" schema={registerSchema}
                                               options={OrganizationTypes}/>
                                    <FormField formik={formik} name="organizationAddress" schema={registerSchema}/>
                                    <FormField formik={formik} name="area" schema={registerSchema}/>
                                    <FormField formik={formik} name="governorate" schema={registerSchema}
                                               options={Governorates}/>
                                    {!update && <>
                                        <DocumentUpload formik={formik} schema={registerSchema}
                                                        label="Upload a document to prove you are a representative for this organization."/>
                                        <div className="mb-3 form-check">
                                            <input type="checkbox" className="form-check-input"
                                                   checked={formik.values.acceptTerms === 'true'}
                                                   onChange={() => formik.setFieldValue('acceptTerms', formik.values.acceptTerms === 'true' ? 'false' : 'true')}/>
                                            <label className="form-check-label">I have read and accepted the <NavLink to="/privacy-policy" target="_blank">Privacy Policy </NavLink> and <NavLink to="/terms" target="_blank">Terms and Conditions</NavLink> for the I Love Maadi (NGO). </label>
                                            {formik.submitCount > 0 && formik.errors.acceptTerms &&
                                                <div className="invalid-feedback d-block">{formik.errors.acceptTerms}</div>}
                                        </div>
                                    </>
                                    }
                                </div>
                                <div className="col-md-6">
                                    {(isLoaded ?
                                        <GoogleMap
                                            mapContainerStyle={containerStyle}
                                            onLoad={onLoad}
                                            onUnmount={onUnmount}
                                            onClick={handleMapClick}
                                        >
                                            {position && <MarkerF position={position}/>}
                                        </GoogleMap>
                                        : <></>)}
                                </div>
                            </div>
                            {!update &&
                                <div className="form-group mt-2">
                                    <button type="submit" className="btn btn-primary"
                                            onClick={formik.submitForm}>Register
                                    </button>
                                    <button type="button" className="btn btn-secondary mx-2"
                                            onClick={handleLogin}>Already have an account? Login
                                    </button>
                                </div>}
                            {update &&
                                <div className="form-group mt-2">
                                    <button type="submit" className="btn btn-primary"
                                            onClick={formik.submitForm}>Update
                                    </button>
                                    <NavLink type="button" className="btn btn-secondary mx-2"
                                             to="/representative">Cancel

                                    </NavLink>
                                </div>}
                        </div>
                    )
                }
            }
        </Formik>
    );
}

export default OrganizationRegistration;