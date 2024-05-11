import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FoodDonations: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [donationSuccess, setDonationSuccess] = useState<boolean>(false);
    const [donationError, setDonationError] = useState<boolean>(false);
    const navigate = useNavigate();

    const foodItems = [
        { id: 1, name: 'Apples', category: 'Fruits & Vegetables', quantity: '10 KG' },
        { id: 2, name: 'Canned Soup', category: 'Canned Foods', quantity: '5 Cans' },
        { id: 3, name: 'Fresh Salad', category: 'Fresh Meals', quantity: '2 KG' },
        { id: 4, name: 'Bread', category: 'Baked Goods', quantity: '5 Loaves' },
        // Add more food items here
    ];

    const handleItemClick = (item: any) => {
        setSelectedItem(item);
    };

    const handleCloseDetails = () => {
        setSelectedItem(null);
    };

    const handleDonate = () => {
        if (quantity <= 0) {
            setDonationError(true);
            return;
        }

        // Perform any donation logic here
        // For simplicity, we'll just log the donation quantity
        console.log("Donating", quantity, "of", selectedItem.name);
        setDonationSuccess(true);

        // Reset donation quantity and close modal after 3 seconds
        setTimeout(() => {
            setQuantity(1);
            setDonationSuccess(false);
            handleCloseDetails();
        }, 3000);
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 1) {
            setQuantity(value);
            setDonationError(false);
        } else {
            setDonationError(true);
        }
    };

    return (
        <div className="container">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><button className="btn btn-link" onClick={() => navigate('/dashboard2')}>Dashboard</button></li>
                    <li className="breadcrumb-item active" aria-current="page">Food Donations</li>
                </ol>
            </nav>
            <h1 className="text-center mt-4 mb-5">Food Donation Requests</h1>
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {foodItems.map(item => (
                    <div key={item.id} className="col">
                        <div className="card border-primary shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title text-primary">{item.name}</h5>
                                <p className="card-text">Category: {item.category}</p>
                                <p className="card-text">Quantity Requested: {item.quantity}</p>
                                <button className="btn btn-primary w-100" onClick={() => handleItemClick(item)}>View Details</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {selectedItem && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{selectedItem.name} Details</h5>
                                <button type="button" className="btn-close" onClick={handleCloseDetails}></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Name:</strong> {selectedItem.name}</p>
                                <p><strong>Category:</strong> {selectedItem.category}</p>
                                <p><strong>Quantity Requested:</strong> {selectedItem.quantity}</p>
                                <div>
                                    <label>
                                        Quantity to Donate:
                                        <input type="number" value={quantity} onChange={handleQuantityChange} min="1" className="form-control" />
                                    </label>
                                    {donationError && <p style={{ color: 'red' }}>Please enter a valid donation quantity.</p>}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseDetails}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleDonate}>Donate</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {donationSuccess && (
                <div style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: 'lightgreen', padding: '10px', borderRadius: '5px' }}>
                    Donation Successful!
                </div>
            )}
        </div>
    );
};

export default FoodDonations;
