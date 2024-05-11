import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import BreadCrumb from "../common/BreadCrumb.tsx";

const DonorsSubmission: React.FC = () => {
    const navigate = useNavigate();

    const [donors, setDonors] = useState([
        {
            firstName: 'Yassin',
            lastName: 'Ahmed',
            contactNumber: '1234567890',
            email: 'yassin@gmail.com',
            type: 'Donor',
            documentsLink: 'https://en.wikipedia.org/wiki/PDF'
        },
        {
            firstName: 'Ahmed',
            lastName: 'Hossam',
            contactNumber: '0987654321',
            email: 'ahmed@gmail.com',
            type: 'Teacher',
            documentsLink: 'https://en.wikipedia.org/wiki/PDF'
        },
        {
            firstName: 'Raghad',
            lastName: 'Helal',
            contactNumber: '1234567890',
            email: 'Raghad@gmail.com',
            type: 'Donor',
            documentsLink: 'https://en.wikipedia.org/wiki/PDF'
        },
        {
            firstName: 'Karim',
            lastName: 'Sherif',
            contactNumber: '1234567890',
            email: 'Karim@gmail.com',
            type: 'Teacher',
            documentsLink: 'https://en.wikipedia.org/wiki/PDF'
        },
    ]);

    const handleAccept = (index: number) => {
        const donor = donors[index];
        alert(`Request Accepted For: ${donor.firstName} ${donor.lastName}`);
        setDonors(prevDonors => prevDonors.filter((_, idx) => idx !== index));
    };

    const handleReject = (index: number) => {
        const donor = donors[index];
        alert(`Request Rejected For: ${donor.firstName} ${donor.lastName}`);
        setDonors(prevDonors => prevDonors.filter((_, idx) => idx !== index));
    };

    const navigateToDocuments = (event: React.MouseEvent) => {
        event.preventDefault();
        navigate('/donordocuments');
    };

    const links = [
        {to: '/', label: 'Home'},
        {to: '/admin-login', label: 'Login'},
        {to: '/Dashboard', label: 'Dashboard'},
        {to: '/DonorSubmissions ', label: 'Donor Submissions'},
    ];

    return (
        <div className="container my-5">
            <BreadCrumb links={links}/>
            <h4 className="text-start">Donor Submissions</h4>
            <div className="table-responsive">
                <table className="table table-custom">
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Contact Number</th>
                        <th>Email</th>
                        <th>Type</th>
                        <th>Documents for Verification</th>
                        <th>Approval</th>
                    </tr>
                    </thead>
                    <tbody>
                    {donors.map((donor, index) => (
                        <tr key={index}>
                            <td>{donor.firstName}</td>
                            <td>{donor.lastName}</td>
                            <td>{donor.contactNumber}</td>
                            <td>{donor.email}</td>
                            <td>{donor.type}</td>
                            <td>
                                <button className="btn btn-outline-primary btn-sm" onClick={navigateToDocuments}>
                                    View Documents
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-custom btn-custom-primary me-2" onClick={() => handleAccept(index)}>Accept</button>
                                <button className="btn btn-custom btn-custom-danger" onClick={() => handleReject(index)}>Reject</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DonorsSubmission;
