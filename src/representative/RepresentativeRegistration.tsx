import { useState } from "react";

function OrganizationRegistration() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [organizationName, setOrganizationName] = useState("");
    const [organizationType, setOrganizationType] = useState("");
    const [organizationAddress, setOrganizationAddress] = useState("");
    const [area, setArea] = useState("");
    const [governorate, setGovernorate] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!firstName){
            setError("First Name is required");
            return;
        }
        if(!lastName){
            setError("Last Name is required");
            return;
        }
        if(!gender){
            setError("Gender is required");
            return;
        }
        if(!email){
            setError("Email is required");
            return;
        }
        if(!password){
            setError("Password is required");
            return;
        }
        if(!confirmPassword){
            setError("Confirm Password is required");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if(!phoneNumber){
            setError("Phone Number is required");
            return;
        }
        if(!organizationName){
            setError("Organization Name is required");
            return;
        }
        if(!organizationType){
            setError("Organization Type is required");
            return;
        }
        if(!organizationAddress){
            setError("Organization Address is required");
            return;
        }
        if(!area){
            setError("Area is required");
            return;
        }
        if(governorate === "Select..."){
            setError("Governorate is required");
            return;
        }

        setTimeout(() => {
            setFirstName("");
            setLastName("");
            setGender("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setPhoneNumber("");
            setOrganizationName("");
            setOrganizationType("");
            setOrganizationAddress("");
            setArea("");
            setGovernorate("");
            setError("");
        }, 1000);
    };

    return (
        <form onSubmit={handleSubmit} className="container">
            <div className="mb-3">
                <label className="form-label">First Name:</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="form-control"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Last Name:</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="form-control"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Gender:</label>
                <div className="form-check">
                    <input type="radio" name="gender" value="Male" onChange={(e) => setGender(e.target.value)} className="form-check-input"/>
                    <label className="form-check-label">Male</label>
                </div>
                <div className="form-check">
                    <input type="radio" name="gender" value="Female" onChange={(e) => setGender(e.target.value)} className="form-check-input"/>
                    <label className="form-check-label">Female</label>
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label">Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Confirm Password:</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Phone Number:</label>
                <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="form-control"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Organization Name:</label>
                <input type="text" value={organizationName} onChange={(e) => setOrganizationName(e.target.value)} className="form-control"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Organization Type:</label>
                <input type="text" value={organizationType} onChange={(e) => setOrganizationType(e.target.value)} className="form-control"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Organization Address:</label>
                <input type="text" value={organizationAddress} onChange={(e) => setOrganizationAddress(e.target.value)} className="form-control"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Area:</label>
                <input type="text" value={area} onChange={(e) => setArea(e.target.value)} className="form-control"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Governorate:</label>
                <select value={governorate} onChange={(e) => setGovernorate(e.target.value)} className="form-select">
                    <option value="">Select...</option>
                    <option value="Cairo">Cairo</option>
                    <option value="Alexandria">Alexandria</option>
                    <option value="Aswan">Aswan</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </form>
    );
}

export default OrganizationRegistration;