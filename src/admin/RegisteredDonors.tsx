import React, { useState } from 'react';

const RegisteredDonors: React.FC = () => {
    const [donors, setDonors] = useState([
        {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            gender: 'Male',
            email: 'john@example.com',
            contactNumber: '1234567890',
            password: 'password123',
            address: '123 Main St',
            area: 'Sidi Gaber', // Example area
            governorate: 'Alexandria', // Example governorate
            type: 'Donor'
        },
        {
            id: 2,
            firstName: 'Jane',
            lastName: 'Doe',
            gender: 'Female',
            email: 'jane@example.com',
            contactNumber: '0987654321',
            password: 'password456',
            address: '456 Elm St',
            area: 'Montaza', // Example area
            governorate: 'Cairo', // Example governorate
            type: 'Teacher'
        }
    ]);

    const handleDeleteDonor = (id: number) => {
        const updatedDonors = donors.filter(donor => donor.id !== id);
        setDonors(updatedDonors);
    };

    return (
        <div className="container">
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
                    <th>Actions</th> {/* Added column for actions */}
                </tr>
                </thead>
                <tbody>
                {donors.map((donor) => (
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
                            <button className="btn btn-danger" onClick={() => handleDeleteDonor(donor.id)}>Delete Donor</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default RegisteredDonors;
