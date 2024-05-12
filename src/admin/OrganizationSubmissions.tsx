import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import BreadCrumb from "../common/BreadCrumb.tsx";
import Alert from "./Alert.tsx";

const OrganizationSubmissions: React.FC = () => {
    const navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState<string[]>([]);


    const [organizationRequests, setOrganizationRequests] = useState([
        {
            firstName: "Karim",
            lastName: "Elmeteny",
            gender: "Male",
            email: "karim@gmail.com",
            contactNumber: "1234567890",
            organizationName: "Organization A",
            organizationType: "School",
            organizationAddress: "123 Street",
            area: "Sidi Gaber",
            governorate: "Alexandria"
        },
        {
            firstName: "Yassin",
            lastName: "Ahmed",
            gender: "Male",
            email: "yassin@gmail.com",
            contactNumber: "9876543210",
            organizationName: "Organization B",
            organizationType: "Hospital",
            organizationAddress: "456 Street",
            area: "Maadi",
            governorate: "Cairo"
        },
        {
            firstName: "Haneen",
            lastName: "Tarek",
            gender: "Female",
            email: "haneen@gmail.com",
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
        setAlertMessage(["Organization request accepted!", `Organization request has been accepted successfully.`]);
    };

    const handleReject = (index: number) => {
        // Handle reject action for the organization at the specified index
        console.log("Reject request at index:", index);
        // Filter out the rejected request from the list
        setOrganizationRequests(prevRequests => prevRequests.filter((_, idx) => idx !== index));
        // Display a pop-up message
        setAlertMessage(["Organization request rejected!", "Organization request has been rejected successfully."]);

    };

    const navigateToDocuments = (event: React.MouseEvent) => {
        event.preventDefault();
        navigate('/organizationdocuments');
    };
    const links = [
        {to: '/', label: 'Home'},
        {to: '/Dashboard', label: 'Admin Dashboard'},
        {to: '/OrganizationSubmissions ', label: 'Organization Submissions'},
    ];

    return (
        <div className="container my-5">
            <BreadCrumb links={links}/>
            <h4 className="text-start">Organization Submissions</h4>
            <div className="table-responsive">
                <table className="table table-custom">
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
                        <th>Documents for verification</th>
                        <th>Approval</th>
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
                            <td>
                                <button className="btn btn-outline-primary btn-sm" onClick={navigateToDocuments}>
                                    View Documents
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-custom btn-custom-primary me-2"
                                        onClick={() => handleAccept(index)}>Accept
                                </button>
                                <button className="btn btn-custom btn-custom-danger"
                                        onClick={() => handleReject(index)}>Reject
                                </button>

                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {alertMessage.length > 0 && <Alert title={alertMessage[0]} message={alertMessage[1]} onCancel={() => setAlertMessage([])}/> }
        </div>


    );
};

export default OrganizationSubmissions;
