import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    const handleClick = (path: string) => navigate(path);
    const handleChangePassword = () => navigate('/changePassword');

    return (
        <div className="dashboard container d-flex flex-column p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="dashboard-heading display-3">Dashboard</h1>
                <div className="settings-panel">
                    <button className="btn btn-link" onClick={handleChangePassword}>
                        Change Password
                    </button>
                    {/* Add more settings options here if needed */}
                </div>
            </div>

            <div className="row row-cols-1 row-cols-md-2 g-4">
                <div className="col">
                    <div className="card border-primary shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title text-primary">Registered Organizations</h5>
                            <p className="card-text">View and manage all registered organizations.</p>
                            <button className="btn btn-primary float-end" onClick={() => handleClick('/registeredorganizations')}>
                                View
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card border-info shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title text-info">Registered Donors</h5>
                            <p className="card-text">View and manage all registered donors.</p>
                            <button className="btn btn-info float-end" onClick={() => handleClick('/registereddonors')}>
                                View
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card border-success shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title text-success">Review Submissions</h5>
                            <p className="card-text">Review submissions from both organizations and donors.</p>
                            <div className="d-flex justify-content-between">
                                <button className="btn btn-success" onClick={() => handleClick('/organizationsubmissions')}>
                                    Organization Submissions
                                </button>
                                <button className="btn btn-success" onClick={() => handleClick('/donorsubmissions')}>
                                    Donor Submissions
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
