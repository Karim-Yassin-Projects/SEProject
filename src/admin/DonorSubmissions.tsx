import React, { useState } from 'react';

const DonorsSubmission: React.FC = () => {
    const [donors, setDonors] = useState([
        {
            firstName: 'John',
            lastName: 'Doe',
            contactNumber: '1234567890',
            type: 'Donor',
            documentsLink: 'https://en.wikipedia.org/wiki/PDF' // Link for documents verification
        },
        {
            firstName: 'Jane',
            lastName: 'Lucas',
            contactNumber: '0987654321',
            type: 'Teacher',
            documentsLink: 'https://en.wikipedia.org/wiki/PDF' // Link for documents verification
        }
    ]);

    const handleAccept = (index: number) => {
        // Perform accept action here
        const donor = donors[index];
        alert(`Request Accepted For: ${donor.firstName} ${donor.lastName}`);
        setDonors(prevDonors => prevDonors.filter((_, idx) => idx !== index)); // Remove selected donor from the list
    };

    const handleReject = (index: number) => {
        // Perform reject action here
        const donor = donors[index];
        alert(`Request Rejected For: ${donor.firstName} ${donor.lastName}`);
        setDonors(prevDonors => prevDonors.filter((_, idx) => idx !== index)); // Remove selected donor from the list
    };

    return (
        <div className="container">
            <h1 className="text-center">Donor Submissions</h1>

            <table className="table">
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Contact Number</th>
                    <th>Type</th>
                    <th>Documents for Verification</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {donors.map((donor, index) => (
                    <tr key={index}>
                        <td>{donor.firstName}</td>
                        <td>{donor.lastName}</td>
                        <td>{donor.contactNumber}</td>
                        <td>{donor.type}</td>
                        <td><a href={donor.documentsLink} target="_blank" rel="noopener noreferrer">PDF</a></td>
                        <td>
                            <button className="btn btn-success me-2" onClick={() => handleAccept(index)}>Accept</button>
                            <button className="btn btn-danger" onClick={() => handleReject(index)}>Reject</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default DonorsSubmission;
