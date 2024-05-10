import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        navigate('/requested-donations');
    };

    return (
        <div>
            <h2>Clinic Location Specification</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Address:
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                </label>
                <br />
                <label>
                    Area:
                    <input type="text" value={area} onChange={(e) => setArea(e.target.value)} />
                </label>
                <br />
                <label>
                    Governorate:
                    <input type="text" value={governorate} onChange={(e) => setGovernorate(e.target.value)} />
                </label>
                <br />
                <label>
                    Specialty:
                    <input type="text" value={specialty} onChange={(e) => setSpecialty(e.target.value)} />
                </label>
                <br />
                <label>
                    Pro-bono Cases:
                    <input type="number" value={proBonoCases} onChange={(e) => setProBonoCases(e.target.value)} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ClinicLocationForm;
