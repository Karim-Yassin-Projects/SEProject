import React, { useState } from 'react';
import SideBar from './SideBar';
import {useNavigate} from "react-router-dom";

function SearchDonationItemsByCategory({ onSearch }) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [dummyData, setDummyData] = useState([]);

    const navigate = useNavigate();
    const handleSearch = () => {
        let data = [];
        if (selectedCategory === 'all categories') {
            data = [
                'Rice', 'Canned Beans', 'Cereal', 'Pasta', 'Teddy Bear', 'Doll', 'Toy Car', 'Building Blocks',
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
        console.log('Selected Category:', selectedCategory);
        console.log('Dummy Data:', data);
        setDummyData(data);
        // Call the onSearch function passed from the parent component with the selected category
        onSearch(selectedCategory, data);
    };

   const handleFilterClothes = () => {
        navigate('/filter-clothes')
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    {/* Include the Sidebar component here */}
                    <SideBar
                        handleSearch={handleSearch}
                        handleFilterClothes={handleFilterClothes}
                        selectedCategory={selectedCategory}
                    />
                </div>
                <div className="col-md-9">
                    <h2>Search Donation Items by Category</h2>
                    <div className="mb-3">
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
                    </div>
                    {/*<button type="button" className="btn btn-primary" onClick={handleSearch} disabled={!selectedCategory}>
                        Search
                    </button>
                    <button type="button" className="btn btn-primary ms-3" onClick={handleFilterClothes} disabled={selectedCategory !== 'clothes'}>
                        Filter Clothes
                    </button>*/}
                    {dummyData.length > 0 && (
                        <div>
                            <h3>Requested Donation Items</h3>
                            <ul>
                                {dummyData.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchDonationItemsByCategory;
