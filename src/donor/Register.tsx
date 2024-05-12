import {NavLink, useNavigate} from "react-router-dom";
import {Genders, Governorates, Organizations} from "../common/organizations.ts";
import {RegisterRequest, registerSchema, Roles} from "./register.ts";
import {Formik, FormikProps} from "formik";
import BreadCrumb from "../common/BreadCrumb.tsx";
import FormField from "../common/FormField.tsx";
import DocumentUpload from "../common/DocumentUpload.tsx";
import {GoogleMap, MarkerF, useJsApiLoader} from "@react-google-maps/api";
import {RefObject, useCallback, useEffect, useRef, useState} from "react";
import {Specializations} from "../common/medical-cases.ts";
import {Subjects} from "../common/teaching.ts";

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
        await formik.setFieldValue('address', details.address);
    }
    if (details.area) {
        await formik.setFieldValue('area', details.area);
    }
    if (details.governorate) {
        await formik.setFieldValue('governorate', details.governorate);
    }
}

function RegistrationForm({update}: { update: boolean }) {
    const initialValues: RegisterRequest = update ? {
        firstName: 'Raghad',
        lastName: 'Helal',
        password: '12345678',
        confirmPassword: '12345678',
        email: 'raghar.helal@example.com',
        phoneNumber: '01000055555',
        area: 'Maadi',
        role: 'Doctor',
        doctorSpeciality: 'Cardiology',
        numberOfProBonoCases: '10',
        numberOfProBonoClasses: '',
        numberOfProBonoStudents: '',
        teacherSpeciality: '',
        address: 'Street 9',
        gender: 'Female',
        governorate: 'Cairo',
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
        role: '',
        doctorSpeciality: '',
        numberOfProBonoCases: '',
        numberOfProBonoClasses: '',
        numberOfProBonoStudents: '',
        teacherSpeciality: '',
        address: '',
        gender: '',
        governorate: '',
        documentSize: 1,
        document: '',
        documentType: '',
        acceptTerms: ''
    };

    const navigate = useNavigate();

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

    const links = update ? [
            {to: '/', label: 'Home'},
            {to: '/donor', label: 'Donor Dashboard'},
            {to: '/donor/update-donor', label: 'Update Donor Information'},
        ] :
        [
            {to: '/', label: 'Home'},
            {to: '/donor/register', label: 'Donor Registration'}
        ];


    const handleSubmit = async (values: RegisterRequest) => {
        if (!update && (values.role === 'Doctor' || values.role === 'Teacher')) {
            navigate('/donor/register-thanks');
        } else {
            navigate('/donor');
        }
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={registerSchema}
                innerRef={formikRef}>
            {

                (formik) => {
                    const role = formik.values.role;
                    const showDocument = role === 'Doctor' || role === 'Teacher';
                    return (
                        <div className="container">
                            <BreadCrumb links={links}/>
                            <h1>{update ? 'Update Donor Information' : 'Donor Registration'}</h1>
                            <p className="small">The marker <span className="text-danger">*</span> denotes a required
                                field.</p>
                            <div className="row">
                                <div className="col-md-6">

                                    <FormField formik={formik} name="firstName" schema={registerSchema}/>
                                    <FormField formik={formik} name="lastName" schema={registerSchema}/>
                                    <FormField formik={formik} name="gender" schema={registerSchema} options={Genders}
                                               radio/>
                                    <FormField formik={formik} name="email" schema={registerSchema}/>
                                    {!update &&
                                        <>
                                            <FormField formik={formik} name="password" schema={registerSchema}/>
                                            <FormField formik={formik} name="confirmPassword" schema={registerSchema}/>
                                        </>}

                                    <FormField formik={formik} name="phoneNumber" schema={registerSchema}/>
                                    {!update && <FormField formik={formik} name="role" schema={registerSchema}
                                                           options={Roles}/>}

                                    {update && <div className="form-group">
                                        <label className="col-md-2 form-label">Role</label>
                                        <div className="col-md-8">{formik.values.role}</div>
                                    </div>}

                                    {role === 'Doctor' && <div className="card">
                                        <div className="card-header">
                                            <h5>Clinic Details</h5>
                                        </div>
                                        <div className="card-body">
                                            <FormField formik={formik} name="doctorSpeciality" schema={registerSchema}
                                                       options={Specializations}/>
                                            <FormField formik={formik} name="numberOfProBonoCases"
                                                       schema={registerSchema}/>
                                        </div>
                                    </div>}

                                    {role === 'Teacher' && <div className="card">
                                        <div className="card-header">
                                            <h5>Clinic Details</h5>
                                        </div>
                                        <div className="card-body">
                                            <FormField formik={formik} name="teacherSpeciality" schema={registerSchema}
                                                       options={Subjects}/>
                                            <FormField formik={formik} name="numberOfProBonoClasses"
                                                       schema={registerSchema}/>
                                            <FormField formik={formik} name="numberOfProBonoStudents"
                                                       schema={registerSchema}/>
                                        </div>
                                        </div>
                                    }
                                        <FormField formik={formik} name="address" schema={registerSchema}/>
                                        <FormField formik={formik} name="area" schema={registerSchema}/>
                                        <FormField formik={formik} name="governorate" schema={registerSchema}
                                                   options={Governorates}/>
                                        {!update && showDocument && <>
                                            <DocumentUpload formik={formik} schema={registerSchema}
                                                            label={`Upload a document to prove your credentials as a ${role}.`}/>
                                        </>
                                        }
                                        {!update && <div className="mb-3 form-check">
                                            <input type="checkbox" className="form-check-input"
                                                   checked={formik.values.acceptTerms === 'true'}
                                                   onChange={() => formik.setFieldValue('acceptTerms', formik.values.acceptTerms === 'true' ? 'false' : 'true')}/>
                                            <label className="form-check-label">I have read and accepted the <NavLink
                                                to="/privacy-policy" target="_blank">Privacy
                                                Policy </NavLink> and <NavLink
                                                to="/terms" target="_blank">Terms and Conditions</NavLink> for the I
                                                Love
                                                Maadi (NGO). </label>
                                            {formik.submitCount > 0 && formik.errors.acceptTerms &&
                                                <div
                                                    className="invalid-feedback d-block">{formik.errors.acceptTerms}</div>}
                                        </div>}

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
                                : <></>
                                )}
                            </div>
                        </div>
                {
                    !update &&
                    <div className="form-group mt-2">
                        <button type="submit" className="btn btn-primary"
                                onClick={formik.submitForm}>Register
                        </button>
                        <NavLink className="btn btn-secondary mx-2"
                                 to="/donor/login">Already have an account? Login
                        </NavLink>
                    </div>
                }
                {
                    update &&
                    <div className="form-group mt-2">
                        <button type="submit" className="btn btn-primary"
                                onClick={formik.submitForm}>Update
                        </button>
                        <NavLink type="button" className="btn btn-secondary mx-2"
                                 to="/donor">Cancel

                        </NavLink>
                    </div>
                }
                </div>
                )
                }
                }
                </Formik>
                )
                    ;
                }

                export default RegistrationForm;