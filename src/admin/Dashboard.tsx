import React from 'react';
import { useNavigate } from 'react-router-dom';
import BreadCrumb from "../common/BreadCrumb.tsx";

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    const handleClick = (path: string) => navigate(path);
    const handleChangePassword = () => navigate('/changePassword');

    const links = [
        {to: '/', label: 'Home'},
        {to: '/adminlogin', label: 'Login'},
        {to: '/Dashboard', label: 'Dashboard'}
    ];

    // Example data for submission counts
    const totalOrgSubmissions = 42;  // Number of pending organization submissions
    const totalDonorSubmissions = 35; // Number of pending donor submissions

    return (
        <div className="container mt-5">
            <BreadCrumb links={links}/>
            <h4 className="text-start">Dashboard</h4>
            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Manage Organizations</h5>
                            <p className="card-text">Overview and manage all registered organizations.</p>
                            <button className="btn btn-outline-dark" onClick={() => handleClick('/registeredorganizations')}>
                                View Organizations
                            </button>
                        </div>
                    </div>
                    <div className="card border-0 shadow-sm mt-4">
                        <div className="card-body">
                            <h5 className="card-title">Manage Donors</h5>
                            <p className="card-text">Overview and manage all donor accounts.</p>
                            <button className="btn btn-outline-dark" onClick={() => handleClick('/registereddonors')}>
                                View Donors
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Submissions</h5>
                            <p className="card-text">Review and approve pending submissions.</p>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <button className="btn btn-outline-dark" onClick={() => handleClick('/organizationsubmissions')}>
                                    View Organization Submissions
                                </button>
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-hourglass-split me-2"></i>
                                    <span className="badge bg-warning text-dark p-2">{totalOrgSubmissions}</span>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <button className="btn btn-outline-dark" onClick={() => handleClick('/donorsubmissions')}>
                                    View Donor Submissions
                                </button>
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-hourglass-split me-2"></i>
                                    <span className="badge bg-warning text-dark p-2">{totalDonorSubmissions}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card border-0 shadow-sm mt-4">
                        <div className="card-body">
                            <h5 className="card-title">Settings</h5>
                            <button onClick={handleChangePassword} className="btn btn-outline-dark">
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
