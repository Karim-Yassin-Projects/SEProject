import { useState } from 'react';
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
        if (role === 'doctor') {
            // If the role is doctor, navigate to the ClinicLocationForm
            navigate('/clinic-details');
        }
        else if (role =='teacher'){
            navigate('/teacher-details');
        }
        else{
            // If the role is not doctor, navigate to the default donor selection page
            navigate('/requested-donations');
        }
    };

    // Function to handle file input change
    const handleFileChange = (event: { target: { files: never[]}; }) => {
        const file = event.target.files[0];
        setDocument(file); // Store the uploaded document in state
    };

    return (
        <div className="container">
            <h2 className="mb-3">Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">First Name:</label>
                    <input type="text" className="form-control" value={firstName}
                           onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Last Name:</label>
                    <input type="text" className="form-control" value={lastName}
                           onChange={(e) => setLastName(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Gender:</label>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="gender" id="male" value="male"
                               checked={gender === 'male'} onChange={(e) => setGender(e.target.value)}/>
                        <label className="form-check-label" htmlFor="male">
                            Male
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="gender" id="female" value="female"
                               checked={gender === 'female'} onChange={(e) => setGender(e.target.value)}/>
                        <label className="form-check-label" htmlFor="female">
                            Female
                        </label>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input type="email" className="form-control" value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Contact Number:</label>
                    <input type="text" className="form-control" value={contactNumber}
                           onChange={(e) => setContactNumber(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input type="password" className="form-control" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Address:</label>
                    <input type="text" className="form-control" value={address}
                           onChange={(e) => setAddress(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Area:</label>
                    <input type="text" className="form-control" value={area} onChange={(e) => setArea(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Governorate:</label>
                    <input type="text" className="form-control" value={governorate}
                           onChange={(e) => setGovernorate(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Role:</label>
                    <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="">Choose Role</option>
                        {/* Default option */}
                        <option value="regular">Regular Donor</option>
                        <option value="teacher">Teacher</option>
                        <option value="doctor">Doctor</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Upload Document for Verification if you're a Doctor or a
                        Teacher:</label>
                    <input type="file" className="form-control" onChange={handleFileChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
}

export default RegistrationForm;