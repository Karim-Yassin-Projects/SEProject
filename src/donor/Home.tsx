import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
    // State variables to store form data
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [area, setArea] = useState('');
    const [governorate, setGovernorate] = useState('');
    const [role, setRole] = useState('');
    const [document, setDocument] = useState(null); // State variable to store the uploaded document

    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        // Here you can perform validation and submit data to backend, including the uploaded document
        console.log({
            firstName,
            lastName,
            gender,
            email,
            contactNumber,
            password,
            address,
            area,
            governorate,
            role,
            document, // Include the uploaded document information
        });
        // Clear form fields after submission
        setFirstName('');
        setLastName('');
        setGender('');
        setEmail('');
        setContactNumber('');
        setPassword('');
        setAddress('');
        setArea('');
        setGovernorate('');
        setRole('');
        setDocument(null);
        navigate('DonorSelection.tsx');
    };

    // Function to handle file input change
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setDocument(file); // Store the uploaded document in state
    };

    return (
        <div>
            <h2>Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Last Name:
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Gender:
                    <input type="text" value={gender} onChange={(e) => setGender(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Contact Number:
                    <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Address:
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Area:
                    <input type="text" value={area} onChange={(e) => setArea(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Governorate:
                    <input type="text" value={governorate} onChange={(e) => setGovernorate(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Role:
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="">Choose Role</option>
                        {/* Default option */}
                        <option value="regular">Regular Donor</option>
                        <option value="teacher">Teacher</option>
                        <option value="doctor">Doctor</option>
                    </select>
                </label>
                <br/>
                <label>
                    Upload Document for Verification if you're a Doctor or a Teacher:
                    <input type="file" onChange={handleFileChange} />
                </label>
                <br/>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegistrationForm;
