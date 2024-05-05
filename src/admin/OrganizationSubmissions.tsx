import React, { useState } from 'react';

const OrganizationSubmissions: React.FC = () => {
    // Dummy data for organization requests
    const [organizationRequests, setOrganizationRequests] = useState([
        {
            firstName: "John",
            lastName: "Doe",
            gender: "Male",
            email: "john@example.com",
            contactNumber: "1234567890",
            organizationName: "Organization A",
            organizationType: "School",
            organizationAddress: "123 Street",
            area: "Sidi Gaber",
            governorate: "Alexandria"
        },
        {
            firstName: "Jane",
            lastName: "Smith",
            gender: "Female",
            email: "jane@example.com",
            contactNumber: "9876543210",
            organizationName: "Organization B",
            organizationType: "Hospital",
            organizationAddress: "456 Street",
            area: "Maadi",
            governorate: "Cairo"
        },
        {
            firstName: "Alice",
            lastName: "Johnson",
            gender: "Female",
            email: "alice@example.com",
            contactNumber: "4561237890",
            organizationName: "Organization C",
            organizationType: "Non-profit",
            organizationAddress: "789 Street",
            area: "Zamalek",
            governorate: "Cairo"
        }
    ]);

    const handleAccept = (index: number) => {
        // Handle accept action for the organization at the specified index
        console.log("Accept request at index:", index);
        // Filter out the accepted request from the list
        setOrganizationRequests(prevRequests => prevRequests.filter((_, idx) => idx !== index));
        // Display a pop-up message
        alert("Organization request accepted!");
    };

    const handleReject = (index: number) => {
        // Handle reject action for the organization at the specified index
        console.log("Reject request at index:", index);
        // Filter out the rejected request from the list
        setOrganizationRequests(prevRequests => prevRequests.filter((_, idx) => idx !== index));
        // Display a pop-up message
        alert("Organization request rejected!");
    };

    return (
        <div className="container">
            <h1 className="text-center">Organization Submissions</h1>
            <table className="table mt-4">
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Gender</th>
                    <th>Email</th>
                    <th>Contact Number</th>
                    <th>Organization Name</th>
                    <th>Organization Type</th>
                    <th>Organization Address</th>
                    <th>Area</th>
                    <th>Governorate</th>
                    <th>Documents for Verification</th>
                    <th>Submission / Request Approval</th>
                </tr>
                </thead>
                <tbody>
                {organizationRequests.map((org, index) => (
                    <tr key={index}>
                        <td>{org.firstName}</td>
                        <td>{org.lastName}</td>
                        <td>{org.gender}</td>
                        <td>{org.email}</td>
                        <td>{org.contactNumber}</td>
                        <td>{org.organizationName}</td>
                        <td>{org.organizationType}</td>
                        <td>{org.organizationAddress}</td>
                        <td>{org.area}</td>
                        <td>{org.governorate}</td>
                        <td><a href="https://en.wikipedia.org/wiki/PDF">Document</a></td>
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

export default OrganizationSubmissions;
