import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const [showOrganizations, setShowOrganizations] = useState(false);
    const [showDonors, setShowDonors] = useState(false);

    const navigate = useNavigate();

    const redirectToOrganizationSubmissions = () => {
        // Redirect to the Organization Submissions page
        navigate('/organizationsubmissions');
    };

    const redirectToDonorSubmissions = () => {
        // Redirect to the Donor Submissions page
        navigate('/donorsubmissions');
    };

    // Dummy data for organizations and donors
    const organizations = [
        { name: "Organization A" },
        { name: "Organization B" },
        { name: "Organization C" }
    ];

    const donors = [
        { name: "Donor X", type: "Doctor" },
        { name: "Donor Y", type: "Teacher" },
        { name: "Donor Z", type: "Doctor" }
    ];

    return (
        <div className="container">
            <h1 className="text-center">Dashboard</h1>

            <div className="mt-4">
                <h2>View Organizations List</h2>
                <button className="btn btn-primary" onClick={() => setShowOrganizations(!showOrganizations)}>
                    {showOrganizations ? 'Hide Organizations' : 'Show Organizations'}
                </button>
                {showOrganizations && (
                    <ul>
                        {organizations.map((org, index) => (
                            <li key={index}>
                                {org.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="mt-4">
                <h2>View Donors List</h2>
                <button className="btn btn-primary" onClick={() => setShowDonors(!showDonors)}>
                    {showDonors ? 'Hide Donors' : 'Show Donors'}
                </button>
                {showDonors && (
                    <ul>
                        {donors.map((donor, index) => (
                            <li key={index}>
                                {donor.name} - {donor.type}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="mt-4">
                <h2>Review Submissions</h2>
                <button className="btn btn-primary me-2" onClick={redirectToOrganizationSubmissions}>
                    Organization Submissions
                </button>
                <button className="btn btn-primary" onClick={redirectToDonorSubmissions}>
                    Donor Submissions
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
