import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Convert both input and stored username to lowercase for case-insensitive comparison
        const lowercaseUsername = username.toLowerCase();
        if (lowercaseUsername === 'admin' && password === 'admin') {
            // Dummy authentication success, navigate to dashboard
            navigate('/dashboard');
        } else {
            // Dummy authentication failed, display error message
            setErrorMessage('Invalid username or password');
        }
    };

    return (
        <div className="container">
            <h1 className="text-center">Admin Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default Login;
