import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SearchDonationItemsByCategory({ onSearch }) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [dummyData, setDummyData] = useState([]);

    const handleSearch = () => {
        let data = [];
        // Dummy data for demonstration
        if (selectedCategory === 'all categories') {
            data = ['Rice', 'Canned Beans', 'Cereal', 'Pasta', 'Teddy Bear', 'Doll', 'Toy Car', 'Building Blocks',
                'T-Shirt', 'Sweater', 'Jeans', 'Dress', 'Bandages', 'Gauze', 'Antiseptic',
                'Pencils', 'Notebooks', 'Glue', 'Scissors', 'Backpacks', 'Pens',
                'Blood Bag', 'Plasma', 'Platelets'
            ];
        } else if (selectedCategory === 'food') {
            data = ['Rice', 'Canned Beans', 'Cereal', 'Pasta'];
        } else if (selectedCategory === 'toys') {
            data = ['Teddy Bear', 'Doll', 'Toy Car', 'Building Blocks'];
        } else if (selectedCategory === 'clothes') {
            data = ['T-Shirt', 'Sweater', 'Jeans', 'Dress'];
        } else if (selectedCategory === 'medical supplies') {
            data = ['Bandages', 'Gauze', 'Antiseptic'];
        } else if (selectedCategory === 'school supplies') {
            data = ['Pencils', 'Notebooks', 'Glue', 'Scissors', 'Backpacks', 'Pens'];
        } else if (selectedCategory === 'blood donations') {
            data = ['Blood Bag', 'Plasma', 'Platelets'];
        }
        setDummyData(data);
        // Call the onSearch function passed from the parent component with the selected category
        onSearch(selectedCategory, data);
    };

    const handleSearchButtonClick = () => {
        // Call handleSearch function when the button is clicked
        handleSearch();
    };

    return (
        <div className="container mt-5">
            <h2>Search Donation Items by Category</h2>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/dashboard2">Dashboard</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Search Donation Items</li>
                </ol>
            </nav>
            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="input-group">
                        <select
                            className="form-select"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">Select category...</option>
                            <option value="all categories">All Categories</option>
                            <option value="food">Food</option>
                            <option value="toys">Toys</option>
                            <option value="clothes">Clothes</option>
                            <option value="medical supplies">Medical Supplies</option>
                            <option value="school supplies">School Supplies</option>
                            <option value="blood donations">Blood Donations</option>
                        </select>
                        <button type="button" className="btn btn-primary ms-3" onClick={handleSearchButtonClick}
                                disabled={!selectedCategory}>
                            Search
                        </button>
                    </div>
                </div>
            </div>
            {/* Render the requested donation items */}
            {dummyData.length > 0 && (
                <div className="mt-4">
                    <h3>Requested Donation Items</h3>
                    <ul className="list-group">
                        {dummyData.map((item, index) => (
                            <li key={index} className="list-group-item">{item}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SearchDonationItemsByCategory;
