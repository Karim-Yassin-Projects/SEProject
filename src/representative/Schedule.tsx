import React, { useState } from 'react';
import {Link} from "react-router-dom";

function Schedule() {
    const [selectedTime, setSelectedTime] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const timeSlots = [
        "09:00 AM - 10:00 AM",
        "10:00 AM - 11:00 AM",
        "11:00 AM - 12:00 PM",
        "12:00 PM - 01:00 PM",
        "01:00 PM - 02:00 PM",
        "02:00 PM - 03:00 PM",
        "03:00 PM - 04:00 PM",
        "04:00 PM - 05:00 PM",
    ];

    const handleTimeChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedTime(event.target.value);
    };

    const handleSubmit = () => {
        setSelectedTime("");
        setIsSubmitted(true);
    }

    return (
        <div className="container">
            <h1>Schedule</h1>
            {!isSubmitted ? (
                <div className="mb-3">
                    <label className="form-label">Select a time slot for donation drop-off:</label>
                    <select value={selectedTime} onChange={handleTimeChange} className="form-select">
                        <option value="">Select a time slot...</option>
                        {timeSlots.map((timeSlot, index) => (
                            <option key={index} value={timeSlot}>{timeSlot}</option>
                        ))}
                    </select>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}> Confirm</button>
                </div>
            ) : (
                <div className="alert alert-info">Donation Drop-Off scheduled successfully. {selectedTime}
                <Link to = "/representativehome" className = "link-blue">Back to Home</Link>
                </div>
            )}
        </div>
    );
}

export default Schedule;