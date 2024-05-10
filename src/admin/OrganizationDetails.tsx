import React from 'react';
import BreadCrumb from "../common/BreadCrumb.tsx";
import Location from './Location';
import './styling.css';

interface Organization {
    email: string;
    phone: string;
    address: string;
    location: string;
    type: string;
}

const OrganizationDetails: React.FC<{ organization: Organization }> = ({ organization }) => {
    const dummyOrganization: Organization = {
        email: "organization@example.com",
        phone: "+20123456789",
        address: "123 Street, Area A, Governorate A",
        location: "",
        type: "Hospital / Non-Profit / School / Mosque / Church"
    };

    const mergedOrganization: Organization = { ...dummyOrganization, ...organization };

    const links = [
        {to: '/', label: 'Home'},
        {to: '/admin-login', label: 'Login'},
        {to: '/Dashboard', label: 'Dashboard'},
        {to: '/RegisteredOrganizations', label: 'Registered Organizations'},
        {to: '/OrganizationDetails', label: 'Organization Details' }
    ];

    return (
        <div className="organization-details">
            <div className="container">
                <BreadCrumb links={links}/>
                <h1>Organization Details</h1>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <h2>Contact Information</h2>
                            <p><strong>Email:</strong> {mergedOrganization.email}</p>
                            <p><strong>Phone:</strong> {mergedOrganization.phone}</p>
                        </div>
                    <div className="card">
                        <h2>Address</h2>
                        <p>{mergedOrganization.address}</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <h2>Location on Map</h2>
                        <Location />
                    </div>
                    <div className="card">
                        <h2>Type of Organization</h2>
                        <p>{mergedOrganization.type}</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default OrganizationDetails;
