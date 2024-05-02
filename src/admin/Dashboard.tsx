import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const [showDonors, setShowDonors] = useState(false);
    const navigate = useNavigate();

    const redirectToRegisteredOrganizations = () => {
        navigate('/registeredorganizations');
    };

    const redirectToDonorSubmissions = () => {
        navigate('/donorsubmissions');
    };

    const redirectToOrganizationSubmissions = () => {
        navigate('/organizationsubmissions');
    };

    return (
        <div className="container">
            <h1 className="text-center">Dashboard</h1>

            <div className="mt-4">
                <h2>View Organizational List</h2>
                <button className="btn btn-primary" onClick={redirectToRegisteredOrganizations}>
                    View Registered Organizations
                </button>
            </div>

            <div className="mt-4">
                <h2>View Donors List</h2>
                <button className="btn btn-primary" onClick={() => setShowDonors(!showDonors)}>
                    {showDonors ? 'Hide Donors' : 'Show Donors'}
                </button>
                {showDonors && (
                    <ul>
                        {/* Donors list will be displayed here */}
                    </ul>
                )}
            </div>

            <div className="mt-4">
                <h2>Review Submissions</h2>
                <div>
                    <button className="btn btn-primary me-2" onClick={redirectToOrganizationSubmissions}>
                        Organization Submissions
                    </button>
                    <button className="btn btn-primary" onClick={redirectToDonorSubmissions}>
                        Donor Submissions
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
