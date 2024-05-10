import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    const handleClick = (path: string) => navigate(path);
    const handleChangePassword = () => navigate('/changePassword');

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Dashboard</h1>
            <div className="row">
                <div className="col-md-6 col-lg-4 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Manage Organizations</h5>
                            <p className="card-text">Overview and manage all registered organizations.</p>
                            <button className="btn btn-primary" onClick={() => handleClick('/registeredorganizations')}>
                                View Organizations
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Manage Donors</h5>
                            <p className="card-text">Access and modify donor information and contributions.</p>
                            <button className="btn btn-secondary" onClick={() => handleClick('/registereddonors')}>
                                View Donors
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Review Submissions</h5>
                            <p className="card-text">Review and approve submissions from organizations and donors.</p>
                            <div className="btn-group" role="group" aria-label="Submission Buttons">
                                <button className="btn btn-success" onClick={() => handleClick('/organizationsubmissions')}>
                                    Organization Submissions
                                </button>
                                <button className="btn btn-info" onClick={() => handleClick('/donorsubmissions')}>
                                    Donor Submissions
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Settings</h5>
                            <button onClick={handleChangePassword} className="btn btn-warning">
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
