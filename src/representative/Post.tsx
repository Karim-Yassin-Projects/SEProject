import React, { useState } from 'react';

function Post() {
    const [category, setCategory] = useState("");
    const [details, setDetails] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const categories = [
        "Clothes",
        "Toys",
        "Food",
        "Medical Supplies",
        "School Supplies",
        "Blood Donations",
    ];

    const handleCategoryChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setCategory(event.target.value);
    };

    const handleDetailsChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setDetails(event.target.value);
    };

    const handleSubmit = () => {
        setCategory("");
        setDetails("");
        setIsSubmitted(true);
    }

    return (
        <div className="container">
            <h1>Create Donation Post</h1>
            <div className="mb-3">
                <label className="form-label">Select a category for the donation:</label>
                <select value={category} onChange={handleCategoryChange} className="form-select">
                    <option value="">Select a category...</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
                {category && (
                    <div className="mt-3">
                        <label className="form-label">Enter the details for the donation:</label>
                        <textarea value={details} onChange={handleDetailsChange} className="form-control"></textarea>
                    </div>
                )}
                <button type="submit" className="btn btn-primary mt-3" onClick={handleSubmit}> Create Post</button>
            </div>
            {isSubmitted && <div className="alert alert-success">Donation Post Created Successfully. {category}</div>}
        </div>
    );
}

export default Post;