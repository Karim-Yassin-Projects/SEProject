import React, { useState } from 'react';

const DonorSubmissions: React.FC = () => {
    // Dummy data for donor requests
    const [donorRequests, setDonorRequests] = useState([
        { id: 1, name: "Donor X", type: "Doctor" },
        { id: 2, name: "Donor Y", type: "Teacher" },
        { id: 3, name: "Donor Z", type: "Doctor" }
    ]);

    const handleAccept = (id: number) => {
        // Handle accept action for the donor with the specified ID
        console.log("Accept request with ID:", id);
        // Filter out the accepted request from the list
        setDonorRequests(prevRequests => prevRequests.filter(donor => donor.id !== id));
        // Display a pop-up message
        alert("Donor request accepted!");
    };

    const handleReject = (id: number) => {
        // Handle reject action for the donor with the specified ID
        console.log("Reject request with ID:", id);
        // Filter out the rejected request from the list
        setDonorRequests(prevRequests => prevRequests.filter(donor => donor.id !== id));
        // Display a pop-up message
        alert("Donor request rejected!");
    };

    return (
        <div className="container">
            <h1 className="text-center">Donor Submissions</h1>
            <table className="table mt-4">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {donorRequests.map(donor => (
                    <tr key={donor.id}>
                        <td>{donor.id}</td>
                        <td>{donor.name}</td>
                        <td>{donor.type}</td>
                        <td>
                            <button className="btn btn-success me-2" onClick={() => handleAccept(donor.id)}>Accept</button>
                            <button className="btn btn-danger" onClick={() => handleReject(donor.id)}>Reject</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default DonorSubmissions;
