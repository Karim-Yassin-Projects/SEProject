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
            type: 'Doctor'
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
        },
        {
            id: 3,
            firstName: 'Yassin',
            lastName: 'Ahmed',
            gender: 'Male',
            email: 'yassin@gmail.com',
            contactNumber: '1234567890',
            password: 'password123',
            address: '123 Main St',
            area: 'Sidi Gaber',
            governorate: 'Alexandria',
            type: 'Teacher'
        },
        {
            id: 4,
            firstName: 'Ahmed',
            lastName: 'Hossam',
            gender: 'Male',
            email: 'ahmed@gmail.com',
            contactNumber: '1234567890',
            password: 'password123',
            address: '123 Main St',
            area: 'Sidi Gaber',
            governorate: 'Alexandria',
            type: 'Teacher'
        },
        {
            id: 5,
            firstName: 'Haneen',
            lastName: 'Tarek',
            gender: 'Female',
            email: 'haneen@gmail.com',
            contactNumber: '1234567890',
            password: 'password123',
            address: '123 Main St',
            area: 'Sidi Gaber',
            governorate: 'Alexandria',
            type: 'Doctor'
        },
        {
            id: 6,
            firstName: 'Karim',
            lastName: 'Sherif',
            gender: 'Male',
            email: 'karim@gmail.com',
            contactNumber: '1234567890',
            password: 'password123',
            address: '123 Main St',
            area: 'Sidi Gaber',
            governorate: 'Alexandria',
            type: 'Doctor'
        },
        {
            id: 7,
            firstName: 'Yassin',
            lastName: 'Ahmed',
            gender: 'Male',
            email: 'yassin@gmail.com',
            contactNumber: '1234567890',
            password: 'password123',
            address: '123 Main St',
            area: 'Sidi Gaber',
            governorate: 'Alexandria',
            type: 'Teacher'
        },
        {
            id: 8,
            firstName: 'Yassin',
            lastName: 'Ahmed',
            gender: 'Male',
            email: 'yassin@gmail.com',
            contactNumber: '1234567890',
            password: 'password123',
            address: '123 Main St',
            area: 'Sidi Gaber',
            governorate: 'Alexandria',
            type: 'Doctor'
        },
        {
            id: 9,
            firstName: 'Yassin',
            lastName: 'Ahmed',
            gender: 'Male',
            email: 'yassin@gmail.com',
            contactNumber: '1234567890',
            password: 'password123',
            address: '123 Main St',
            area: 'Sidi Gaber',
            governorate: 'Alexandria',
            type: 'Doctor'
        },
        {
            id: 10,
            firstName: 'Yassin',
            lastName: 'Ahmed',
            gender: 'Male',
            email: 'yassin@gmail.com',
            contactNumber: '1234567890',
            password: 'password123',
            address: '123 Main St',
            area: 'Sidi Gaber',
            governorate: 'Alexandria',
            type: 'Doctor'

}
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');

    const handleDeleteDonor = (id: number) => {
        setDonors(prevDonors => prevDonors.filter(donor => donor.id !== id));
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleTypeChange = (event) => {
        setFilterType(event.target.value);
    };

    const filteredDonors = donors.filter(donor =>
        (`${donor.firstName} ${donor.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterType === 'All' || donor.type === filterType))
    );

    const links = [
        {to: '/', label: 'Home'},
        {to: '/adminlogin', label: 'Login'},
        {to: '/Dashboard', label: 'Dashboard'},
        {to: '/RegisteredDonors', label: 'Donors'},
    ];

    return (
        <div className="container">
            <BreadCrumb links={links}/>
            <h4 className="text-start">Donors</h4>
            <div className="row mb-3">
                <div className="col-md-6">
                    <div className="input-group">
                        <span className="input-group-text">Search Name</span>
                        <input
                            type="text"
                            placeholder="Enter name..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="input-group">
                        <span className="input-group-text">Type of Donor</span>
                        <select
                            className="form-control"
                            value={filterType}
                            onChange={handleTypeChange}
                        >
                            <option value="All">Any</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Teacher">Teacher</option>
                            {/* Add other types as needed */}
                        </select>
                    </div>
                </div>
            </div>
            <table className="table table-striped">
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
                {filteredDonors.map(donor => (
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
