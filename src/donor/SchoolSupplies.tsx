import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SchoolSupplies: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [donationSuccess, setDonationSuccess] = useState<boolean>(false);
    const [donationError, setDonationError] = useState<boolean>(false);
    const navigate = useNavigate();

    const schoolSuppliesItems = [
        { id: 1, item: 'Notebooks', quantity: 20, isStationary: true },
        { id: 2, item: 'Pencils', quantity: 50, isStationary: true },
        { id: 3, item: 'Books', quantity: 10, isStationary: false },
        { id: 4, item: 'Stationary', quantity: 15, isStationary: true },
    ];

    const handleItemClick = (item: any) => {
        setSelectedItem(item);
        // Navigate to Books page only if the clicked item is 'Books'
        if (item.item === 'Books') {
            navigate('/books');
        } else if (item.item === 'Stationary') {
            navigate('/stationary');
        }
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
        console.log("Donating", quantity, "of", selectedItem.item);
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

    // Filter out items that are not books or stationary
    const filteredItems = schoolSuppliesItems.filter(item => item.item === 'Books' || item.item === 'Stationary');

    return (
        <div className="container mt-5">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><button className="btn btn-link" onClick={() => navigate('/dashboard2')}>Dashboard</button></li>
                    <li className="breadcrumb-item active" aria-current="page">School Supplies</li>
                </ol>
            </nav>
            <h1 className="text-center mb-4">View School Supplies Donation Requests</h1>
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {filteredItems.map(item => (
                    <div key={item.id} className="col">
                        <div className="card border-primary shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title text-primary">{item.item}</h5>
                                <p className="card-text">Quantity: {item.quantity}</p>
                                <button className="btn btn-primary w-100" onClick={() => handleItemClick(item)}>View Details</button>
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
                                <h5 className="modal-title">{selectedItem.item} Details</h5>
                                <button type="button" className="btn-close" onClick={handleCloseDetails}></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Item:</strong> {selectedItem.item}</p>
                                <p><strong>Quantity Requested:</strong> {selectedItem.quantity}</p>
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
                <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1050 }}>
                    <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="toast-header">
                            <strong className="me-auto">Donation Successful!</strong>
                            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SchoolSupplies;
