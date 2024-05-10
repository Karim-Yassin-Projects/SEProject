import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function ClinicLocationForm({ onSubmit }) {
    // State variables to store form data
    const [address, setAddress] = useState('');
    const [area, setArea] = useState('');
    const [governorate, setGovernorate] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [proBonoCases, setProBonoCases] = useState('');

    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Call the onSubmit function passed from the parent component with form data
        //onSubmit({ address, area, governorate, specialty, proBonoCases });
        console.log({
            address,
            area,
            governorate,
            specialty,
            proBonoCases
        })
        // Clear form fields after submission
        setAddress('');
        setArea('');
        setGovernorate('');
        setSpecialty('');
        setProBonoCases('');

        // Navigate to the requested-donations page
        navigate('/dashboard2');
    };

    return (
        <div className="container mt-5">
            <h2>Clinic Location Specification</h2>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Clinic Location Form</li>
                </ol>
            </nav>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address:</label>
                    <input type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="area" className="form-label">Area:</label>
                    <input type="text" className="form-control" id="area" value={area} onChange={(e) => setArea(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="governorate" className="form-label">Governorate:</label>
                    <input type="text" className="form-control" id="governorate" value={governorate} onChange={(e) => setGovernorate(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="specialty" className="form-label">Specialty:</label>
                    <input type="text" className="form-control" id="specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="proBonoCases" className="form-label">Pro-bono Cases:</label>
                    <input type="number" className="form-control" id="proBonoCases" value={proBonoCases} onChange={(e) => setProBonoCases(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default ClinicLocationForm;
