import React, { useState, useEffect } from 'react';

const TransportationSelection = () => {
    const [selectedTransportation, setSelectedTransportation] = useState('');
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [eta, setETA] = useState(null);

    useEffect(() => {
        calculateETA();
    }, [selectedTransportation, selectedTimeSlot]);

    const calculateETA = () => {
        // Logic to calculate ETA based on selected transportation and time slot
        let calculatedETA = null;
        if (selectedTransportation && selectedTimeSlot) {
            switch (selectedTransportation) {
                case 'Truck':
                    calculatedETA = 120; // ETA in minutes for a Truck
                    break;
                case 'Car':
                    calculatedETA = 60; // ETA in minutes for a Car
                    break;
                case 'Motorcycle':
                    calculatedETA = 30; // ETA in minutes for a Motorcycle
                    break;
                default:
                    calculatedETA = null;
            }
            setETA(calculatedETA);
        }
    };

    const handleTransportationChange = (event) => {
        setSelectedTransportation(event.target.value);
    };

    const handleTimeSlotChange = (event) => {
        setSelectedTimeSlot(event.target.value);
    };

    const handlePickupRequest = () => {
        if (selectedTransportation && selectedTimeSlot && eta !== null) {
            alert(`Requesting ${selectedTransportation} for donation pickup at ${selectedTimeSlot}.\nETA: ${eta} minutes`);
            scheduleNotification(eta);
        } else {
            alert('Please select both transportation and time slot.');
        }
    };

    const scheduleNotification = (eta) => {
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
        } else if (Notification.permission === "granted") {
            showNotification(eta);
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(function (permission) {
                if (permission === "granted") {
                    showNotification(eta);
                }
            });
        }
    };

    const showNotification = (eta) => {
        const notificationMessage = `Driver will arrive in ${eta} minutes for donation pickup.`;
        const notification = new Notification("Driver Arrival Notification", {
            body: notificationMessage,
            icon: '/path/to/icon.png', // Replace with your icon path
        });

        notification.onclick = function () {
            // Handle click event when user clicks on the notification
            alert("Driver has arrived!");
        };
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Schedule Selection for Donation Pickup</h1>
            <div className="mb-3">
                <label className="form-label">Select Transportation:</label>
                <select
                    className="form-select"
                    value={selectedTransportation}
                    onChange={handleTransportationChange}
                >
                    <option value="">Select Transportation</option>
                    <option value="Truck">Truck</option>
                    <option value="Car">Car</option>
                    <option value="Motorcycle">Motorcycle</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Select Time Slot:</label>
                <select
                    className="form-select"
                    value={selectedTimeSlot}
                    onChange={handleTimeSlotChange}
                >
                    <option value="">Select Time Slot</option>
                    <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM - 4:00 PM)</option>
                    <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 PM - 8:00 PM)</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">ETA:</label>
                <p>{eta !== null ? `${eta} minutes` : 'Select transportation and time slot to calculate ETA'}</p>
            </div>
            <button className="btn btn-primary" onClick={handlePickupRequest}>Request Pickup</button>
        </div>
    );
};

export default TransportationSelection;
