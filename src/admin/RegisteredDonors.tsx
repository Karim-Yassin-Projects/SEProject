import React, { useState } from 'react';
import DeleteButton from "../common/DeleteButton";
import BreadCrumb from "../common/BreadCrumb.tsx";

const RegisteredDonors: React.FC = () => {
    const [donors, setDonors] = useState([
        {
            id: 1,
            firstName: 'Yassin',
            lastName: 'Ahmed',
            gender: 'Male',
            email: 'yassin@gmail.com',
            contactNumber: '1234567890',
            password: 'password123',
            address: '123 Main St',
            area: 'Sidi Gaber',
            governorate: 'Alexandria',
            type: 'Donor'
        },
        {
            id: 2,
            firstName: 'Raghad',
            lastName: 'Helal',
            gender: 'Female',
            email: 'raghad@egmail.com',
            contactNumber: '0987654321',
            password: 'password456',
            address: '456 Elm St',
            area: 'Montaza',
            governorate: 'Cairo',
            type: 'Teacher'
        }
    ]);

    const handleDeleteDonor = (id: number) => {
        setDonors(prevDonors => prevDonors.filter(donor => donor.id !== id));
    };
    const links = [
        {to: '/', label: 'Home'},
        {to: '/admin-login', label: 'Login'},
        {to: '/Dashboard', label: 'Dashboard'},
        {to: '/RegisteredDonors', label: 'Registered Donors'},
    ];

    return (
        <div className="container">
            <BreadCrumb links={links}/>
            <h1 className="text-center">Registered Donors</h1>
            <table className="table">
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Gender</th>
                    <th>Email</th>
                    <th>Contact Number</th>
                    <th>Password</th>
                    <th>Address</th>
                    <th>Area</th>
                    <th>Governorate</th>
                    <th>Type</th>
                    <th>Account Management</th>
                </tr>
                </thead>
                <tbody>
                {donors.map(donor => (
                    <tr key={donor.id}>
                        <td>{donor.firstName}</td>
                        <td>{donor.lastName}</td>
                        <td>{donor.gender}</td>
                        <td>{donor.email}</td>
                        <td>{donor.contactNumber}</td>
                        <td>{donor.password}</td>
                        <td>{donor.address}</td>
                        <td>{donor.area}</td>
                        <td>{donor.governorate}</td>
                        <td>{donor.type}</td>
                        <td>
                            <DeleteButton
                                onConfirm={() => handleDeleteDonor(donor.id)}
                                message={`Are you sure you want to delete ${donor.firstName} ${donor.lastName}? This action cannot be undone.`}
                                deleteText="Delete Donor"
                                deleteButtonClass="btn btn-danger"
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default RegisteredDonors;
