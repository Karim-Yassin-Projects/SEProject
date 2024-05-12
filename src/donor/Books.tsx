import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Books: React.FC = () => {
    const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [donationSuccess, setDonationSuccess] = useState<boolean>(false);

    const handleGradeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedGrade(e.target.value);
    };

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLanguage(e.target.value);
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 1) {
            setQuantity(value);
        }
    };

    const handleDonate = () => {
        // Perform any donation logic here
        // For simplicity, we'll just log the donation quantity
        console.log("Donating", quantity, "books for grade level", selectedGrade, "in", selectedLanguage, "language");
        setDonationSuccess(true);
    };

    return (
        <div className="container mt-5">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/dashboard2">Dashboard</Link></li>
                    <li className="breadcrumb-item"><Link to="/school-supplies">School Supplies</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Books</li>
                </ol>
            </nav>
            <h1 className="text-center mb-4">View Book Details</h1>
            <div className="row mb-3">
                <div className="col-md-4">
                    <label htmlFor="gradeSelect" className="form-label">Select Grade Level:</label>
                    <select className="form-select" id="gradeSelect" onChange={handleGradeChange}>
                        <option value="">-- Select Grade Level --</option>
                        <option value="Grade 1">Grade 1</option>
                        <option value="Grade 2">Grade 2</option>
                        <option value="Grade 3">Grade 3</option>
                        {/* Add more grade options here */}
                    </select>
                </div>
                <div className="col-md-4">
                    <label htmlFor="languageSelect" className="form-label">Select Language:</label>
                    <select className="form-select" id="languageSelect" onChange={handleLanguageChange}>
                        <option value="">-- Select Language --</option>
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        {/* Add more language options here */}
                    </select>
                </div>
            </div>
            {selectedGrade && selectedLanguage && (
                <div className="row">
                    <div className="col">
                        {/* Book Details */}
                        <h3>Book Name: Mathematics Textbook</h3>
                        <p>Author: John Smith</p>
                        <p>Edition: 1st Edition</p>
                        <p>Summary: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <p>Grade Level: {selectedGrade}</p>
                        <p>Language: {selectedLanguage}</p>
                        <p>Quantity Required: 10</p>
                        <hr />
                        {/* Quantity Selection */}
                        <h3>Quantity Selection</h3>
                        <div className="input-group mb-3">
                            <input
                                type="number"
                                className="form-control"
                                value={quantity}
                                onChange={handleQuantityChange}
                                min="1"
                            />
                            <button className="btn btn-primary" onClick={handleDonate}>
                                Donate
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {donationSuccess && (
                <div className="alert alert-success" role="alert">
                    Donation Successful!
                </div>
            )}
        </div>
    );
};

export default Books;
