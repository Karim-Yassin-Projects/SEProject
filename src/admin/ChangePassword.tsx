import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const ChangePassword: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Here you can implement the logic to change the password
        // For this example, I'll just simulate a successful password change
        // You can replace this with your actual logic
        setTimeout(() => {
            // Clear the form fields and error message
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setError('');
            // Display popup message
            window.alert('Password changed successfully!');
            // Redirect back to admin login page
            navigate('/adminlogin');
        }, 1000); // Simulating a delay for password change process
    };

    return (
        <div className="container">
            <h1 className="text-center">Change Password</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="currentPassword">Current Password:</label>
                    <input
                        type="password"
                        id="currentPassword"
                        className="form-control"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword">New Password:</label>
                    <input
                        type="password"
                        id="newPassword"
                        className="form-control"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                {error && <div className="text-danger">{error}</div>}
                <button type="submit" className="btn btn-primary mt-3">Change Password</button>
            </form>
        </div>
    );
};

export default ChangePassword;
