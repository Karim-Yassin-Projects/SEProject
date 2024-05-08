import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard2 = () => {
    return (
        <div className="container mt-5">
            <h1 className="mb-4">Dashboard</h1>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <Link to="/requested-donations" className="btn btn-primary btn-lg btn-block">Requested Donations</Link>
                </div>
                <div className="col-md-6">
                    <Link to="/filter-clothes" className="btn btn-primary btn-lg btn-block">Donate Clothes</Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard2;
