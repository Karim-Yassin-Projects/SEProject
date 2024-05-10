import React, { useState } from 'react';

// Sample data of clothing items
const clothingItems  = [
    { id: 1, age: 'Adult', gender: 'Male', season: 'Winter', type: 'Coat', material: 'Wool', quantity: 3 },
    { id: 2, age: 'Child', gender: 'Female', season: 'Spring', type: 'Dress', material: 'Cotton', quantity: 5 },
    { id: 3, age: 'Teen', gender: 'Female', season: 'Summer', type: 'Shorts', material: 'Denim', quantity: 2 },
    { id: 4, age: 'Adult', gender: 'Male', season: 'Fall', type: 'Jacket', material: 'Polyester', quantity: 4 },
    // Add more donation requests here
];

const ClothingList = ({ items, onItemClick }) => {
    return (
        <div>
            {items.map(item => (
                <div key={item.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                    <span style={{ marginRight: '10px' }}>{item.type}</span> - <span style={{ marginRight: '10px' }}>{item.age}</span> - <span style={{ marginRight: '10px' }}>{item.gender}</span> - <span>{item.season}</span>
                    <button style={{ marginLeft: '10px' }} onClick={() => onItemClick(item)}>View Details</button>
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
        <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2>Clothing Details</h2>
            <p><strong>Type:</strong> {item.type}</p>
            <p><strong>Age:</strong> {item.age}</p>
            <p><strong>Gender:</strong> {item.gender}</p>
            <p><strong>Season:</strong> {item.season}</p>
            <p><strong>Material:</strong> {item.material}</p>
            <p><strong>Quantity Requested:</strong> {item.quantity}</p>
            <div>
                <label>
                    Quantity to Donate:
                    <input type="number" value={quantity} onChange={handleQuantityChange} min="1" />
                </label>
            </div>
            <button onClick={onClose} style={{ marginRight: '10px' }}>Close</button>
            <button onClick={handleDonate}>Donate</button>
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
        // Perform any donation logic here
        // For simplicity, we'll just log the donation quantity
        console.log("Donating", selectedItem.type, "Quantity:", selectedItem.quantity);
        setSelectedItem(null);
    };
    /*const handleBack=()=>{

        const navigate = useNavigate();
        navigate('/requested-donations')
    }*/

    // Apply filters to clothing items
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
        <div style={{maxWidth: '600px', margin: '0 auto', padding: '20px'}}>
            <h1>Filter Clothes Donation Requests</h1>
            <div>
                <label>
                    Age:
                    <select value={filters.age} onChange={e => handleFilterChange('age', e.target.value)}>
                        <option value="">All</option>
                        <option value="Adult">Adult</option>
                        <option value="Child">Child</option>
                    </select>
                </label>
                <label>
                    Gender:
                    <select value={filters.gender} onChange={e => handleFilterChange('gender', e.target.value)}>
                        <option value="">All</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </label>
                <label>
                    Season:
                    <select value={filters.season} onChange={e => handleFilterChange('season', e.target.value)}>
                        <option value="">All</option>
                        <option value="Spring">Spring</option>
                        <option value="Summer">Summer</option>
                        <option value="Winter">Winter</option>
                        <option value="Fall">Fall</option>
                    </select>
                </label>
            </div>
            <h2>Filtered Clothing Items</h2>
            <ClothingList items={filteredItems} onItemClick={handleItemClick}/>
            {selectedItem &&
                <ClothingDetails item={selectedItem} onClose={handleCloseDetails} onDonate={handleDonate}/>}
            {/*} <button onClick={handleBack} style={{marginBottom: '10px'}}>Back</button>*/}
        </div>
    );
};

export default App;