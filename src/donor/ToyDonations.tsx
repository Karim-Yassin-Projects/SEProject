import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ToyDonations: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [donationSuccess, setDonationSuccess] = useState<boolean>(false);
    const [donationError, setDonationError] = useState<boolean>(false);

    const toyItems = [
        { id: 1, name: 'Board Games', age: '3+', gender: 'Unisex', category: 'Board Games', quantity: 5 },
        { id: 2, name: 'Stuffed Animals', age: '0+', gender: 'Unisex', category: 'Stuffed Toys', quantity: 10 },
        { id: 3, name: 'Barbie Doll', age: '3-8', gender: 'Girl', category: 'Dolls', quantity: 3 },
        { id: 4, name: 'Soccer Ball', age: '5+', gender: 'Boy', category: 'Sports', quantity: 7 },
        { id: 5, name: 'Toy Cars', age: '3+', gender: 'Boy', category: 'Cars', quantity: 8 },
        { id: 6, name: 'Outdoor Playset', age: '3+', gender: 'Unisex', category: 'Outdoor', quantity: 2 },
        // Add more toy items here
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

        console.log("Donating", quantity, "of", selectedItem.name);
        setDonationSuccess(true);

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
        <div className="container mt-5">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/dashboard2">Dashboard</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Toy Donations</li>
                </ol>
            </nav>
            <h1 className="text-center mb-4">Toy Donation Requests</h1>
            <div className="row">
                {toyItems.map(item => (
                    <div key={item.id} className="col-md-6 col-lg-4 mb-4">
                        <div className={`card border-${item.gender === 'Boy' ? 'primary' : item.gender === 'Girl' ? 'pink' : 'success'} shadow-sm`}>
                            <div className="card-body">
                                <h5 className={`card-title text-${item.gender === 'Boy' ? 'primary' : item.gender === 'Girl' ? 'pink' : 'success'}`}>{item.name}</h5>
                                <p className="card-text">Age: {item.age}</p>
                                <p className="card-text">Gender: {item.gender}</p>
                                <p className="card-text">Category: {item.category}</p>
                                <p className="card-text">Quantity: {item.quantity}</p>
                                <button className={`btn btn-${item.gender === 'Boy' ? 'primary' : item.gender === 'Girl' ? 'pink' : 'success'} w-100`} onClick={() => handleItemClick(item)}>View Details</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {selectedItem && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{selectedItem.name} Details</h5>
                                <button type="button" className="btn-close" onClick={handleCloseDetails}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col">
                                        <p><strong>Name:</strong> {selectedItem.name}</p>
                                        <p><strong>Age:</strong> {selectedItem.age}</p>
                                        <p><strong>Gender:</strong> {selectedItem.gender}</p>
                                    </div>
                                    <div className="col">
                                        <p><strong>Category:</strong> {selectedItem.category}</p>
                                        <p><strong>Quantity Requested:</strong> {selectedItem.quantity}</p>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="donationQuantity" className="form-label">Quantity to Donate:</label>
                                    <input type="number" id="donationQuantity" value={quantity} onChange={handleQuantityChange} min="1" className="form-control" />
                                    {donationError && <div className="text-danger mt-1">Please enter a valid donation quantity.</div>}
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
                <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1050 }}>
                    <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ borderRadius: '10px' }}>
                        <strong>Donation Successful!</strong> Thank you for your generosity.
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setDonationSuccess(false)}></button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ToyDonations;
