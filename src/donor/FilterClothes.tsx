import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";

const clothingItems = [
    { id: 1, age: 'Adult', gender: 'Male', season: 'Winter', type: 'Coat', material: 'Wool', quantity: 3 },
    { id: 2, age: 'Child', gender: 'Female', season: 'Spring', type: 'Dress', material: 'Cotton', quantity: 5 },
    { id: 3, age: 'Teen', gender: 'Female', season: 'Summer', type: 'Shorts', material: 'Denim', quantity: 2 },
    { id: 4, age: 'Adult', gender: 'Male', season: 'Fall', type: 'Jacket', material: 'Polyester', quantity: 4 },
];
const links=[
    {to: '/dashboard2', label: 'Dashboard'},
]
const ClothingList = ({ items, onItemClick }) => {
    return (
        <div className="mt-4">
            {items.map(item => (
                <div key={item.id} className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">{item.type}</h5>
                        <p className="card-text">Age: {item.age}, Gender: {item.gender}, Season: {item.season}</p>
                        <button className="btn btn-primary" onClick={() => onItemClick(item)}>View Details</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

const ClothingDetails = ({ item, onClose, onDonate }) => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 1) {
            setQuantity(value);
        }
    };

    const handleDonate = () => {
        onDonate();
        onClose();
    };

    return (
        <div className="mt-4 card">
            <div className="card-body">
                <h5 className="card-title">Clothing Details</h5>
                <p><strong>Type:</strong> {item.type}</p>
                <p><strong>Age:</strong> {item.age}</p>
                <p><strong>Gender:</strong> {item.gender}</p>
                <p><strong>Season:</strong> {item.season}</p>
                <p><strong>Material:</strong> {item.material}</p>
                <p><strong>Quantity Requested:</strong> {item.quantity}</p>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity to Donate:</label>
                    <input type="number" id="quantity" className="form-control" value={quantity} onChange={handleQuantityChange} min="1" />
                </div>
                <button className="btn btn-secondary mr-2" onClick={onClose}>Close</button>
                <button className="btn btn-primary" onClick={handleDonate}>Donate</button>
            </div>
        </div>
    );
};

const App = () => {
    const [filters, setFilters] = useState({ age: '', gender: '', season: '' });
    const [filteredItems, setFilteredItems] = useState(clothingItems);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleFilterChange = (filterName, value) => {
        setFilters({ ...filters, [filterName]: value });
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const handleCloseDetails = () => {
        setSelectedItem(null);
    };

    const handleDonate = () => {
        console.log("Donating", selectedItem.type, "Quantity:", selectedItem.quantity);
        setSelectedItem(null);
    };

    React.useEffect(() => {
        const filtered = clothingItems.filter(item => {
            return (
                (filters.age === '' || item.age === filters.age) &&
                (filters.gender === '' || item.gender === filters.gender) &&
                (filters.season === '' || item.season === filters.season)
            );
        });
        setFilteredItems(filtered);
    }, [filters]);

    return (
        <div className="container mt-5">
            <h1>Filter Clothes Donation Requests</h1>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/dashboard2">Dashboard</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Filter Clothes</li>
                </ol>
            </nav>
            <div className="row mt-4">
                <div className="col-md-4">
                    <label>Age:</label>
                    <select className="form-control" value={filters.age}
                            onChange={e => handleFilterChange('age', e.target.value)}>
                        <option value="">All</option>
                        <option value="Adult">Adult</option>
                        <option value="Child">Child</option>
                        <option value="Teen">Teen</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <label>Gender:</label>
                    <select className="form-control" value={filters.gender}
                            onChange={e => handleFilterChange('gender', e.target.value)}>
                        <option value="">All</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <label>Season:</label>
                    <select className="form-control" value={filters.season}
                            onChange={e => handleFilterChange('season', e.target.value)}>
                        <option value="">All</option>
                        <option value="Spring">Spring</option>
                        <option value="Summer">Summer</option>
                        <option value="Winter">Winter</option>
                        <option value="Fall">Fall</option>
                    </select>
                </div>
            </div>
            <h2 className="mt-5">Filtered Clothing Items</h2>
            <ClothingList items={filteredItems} onItemClick={handleItemClick}/>
            {selectedItem &&
                <ClothingDetails item={selectedItem} onClose={handleCloseDetails} onDonate={handleDonate}/>}
        </div>
    );
};

export default App;
