import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard2 = () => {
    const navigate = useNavigate();

    const handleRequestedDonations = () => navigate('/requested-donations');
    const handleFilterClothes = () => navigate('/filter-clothes');
    const handleToyDonations = () => navigate('/toy-donations');
    const handleFoodDonations = () => navigate('/food-donations');
    const handleSchoolSupplies = () => navigate('/school-supplies');

    return (
        <div className="dashboard container d-flex flex-column p-4">
            <h1 className="dashboard-heading display-3 mb-4">Dashboard</h1>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/donor-login">Log in</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                </ol>
            </nav>
            <div className="row row-cols-1 row-cols-md-2 g-4">
                <div className="col">
                    <div className="card border-primary shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title text-primary">Donation Categories</h5>
                            <p className="card-text">View donation categories.</p>
                            <button className="btn btn-primary float-end" onClick={handleRequestedDonations}>
                                View
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card border-primary shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title text-primary">Donate Clothes</h5>
                            <p className="card-text">Donate clothes to those in need.</p>
                            <button className="btn btn-primary float-end" onClick={handleFilterClothes}>
                                Donate
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card border-primary shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title text-primary">Toy Donations</h5>
                            <p className="card-text">Donate toys for children.</p>
                            <button className="btn btn-primary float-end" onClick={handleToyDonations}>
                                Donate
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card border-primary shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title text-primary">Food Donations</h5>
                            <p className="card-text">Donate food items for the needy.</p>
                            <button className="btn btn-primary float-end" onClick={handleFoodDonations}>
                                Donate
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card border-primary shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title text-primary">School Supplies Donations</h5>
                            <p className="card-text">Donate school supplies for educational purposes.</p>
                            <button className="btn btn-primary float-end" onClick={handleSchoolSupplies}>
                                Donate
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard2;
