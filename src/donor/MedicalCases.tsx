import React, { useState } from 'react';

const ViewMedicalCases = () => {
    const [medicalCases] = useState([
        {
            id: 1,
            title: 'Heart Transplant',
            description: 'A patient requires a heart transplant surgery.',
            specialty: 'Cardiology',
            organization: 'City Hospital',
            area: 'Downtown',
            governorate: 'New York',
            patientName: 'John Doe',
            age: 45,
            gender: 'Male',
            weight: '75 kg',
            location: 'City Hospital, New York',
            address: '123 Main Street, New York',
        },
        {
            id: 2,
            title: 'Emergency Trauma Care',
            description: 'Trauma care needed for accident victims.',
            specialty: 'Emergency Medicine',
            organization: 'General Hospital',
            area: 'Uptown',
            governorate: 'New York',
            patientName: 'Jane Smith',
            age: 30,
            gender: 'Female',
            weight: '60 kg',
            location: 'General Hospital, New York',
            address: '456 Elm Street, New York',
        },
        {
            id: 3,
            title: 'Pediatric Oncology Support',
            description: 'Support for children undergoing cancer treatment.',
            specialty: 'Pediatrics',
            organization: "Children's Hospital",
            area: 'Suburb',
            governorate: 'New Jersey',
            patientName: 'Sam Johnson',
            age: 8,
            gender: 'Male',
            weight: '25 kg',
            location: "Children's Hospital, New Jersey",
            address: '789 Pine Street, New Jersey',
        },
        {
            id: 4,
            title: 'Orthopedic Surgery',
            description: 'Orthopedic surgery for patients with bone fractures.',
            specialty: 'Orthopedics',
            organization: 'Central Hospital',
            area: 'Downtown',
            governorate: 'California',
            patientName: 'Emily Brown',
            age: 50,
            gender: 'Female',
            weight: '70 kg',
            location: 'Central Hospital, California',
            address: '101 Oak Avenue, California',
        },
        // Add more dummy data covering various filtration cases
        {
            id: 5,
            title: 'Dental Checkup',
            description: 'Routine dental checkup for patients.',
            specialty: 'Dentistry',
            organization: 'Dental Clinic',
            area: 'Downtown',
            governorate: 'New York',
            patientName: 'Michael Clark',
            age: 35,
            gender: 'Male',
            weight: '80 kg',
            location: 'Dental Clinic, New York',
            address: '321 Maple Street, New York',
        },
        {
            id: 6,
            title: 'Neurology Consultation',
            description: 'Consultation for neurological disorders.',
            specialty: 'Neurology',
            organization: 'Neuro Clinic',
            area: 'Uptown',
            governorate: 'New York',
            patientName: 'Samantha White',
            age: 28,
            gender: 'Female',
            weight: '55 kg',
            location: 'Neuro Clinic, New York',
            address: '654 Birch Lane, New York',
        },
        {
            id: 7,
            title: 'Physical Therapy',
            description: 'Physical therapy sessions for rehabilitation.',
            specialty: 'Physical Therapy',
            organization: 'Rehab Center',
            area: 'Suburb',
            governorate: 'New Jersey',
            patientName: 'James Anderson',
            age: 40,
            gender: 'Male',
            weight: '90 kg',
            location: 'Rehab Center, New Jersey',
            address: '987 Cedar Road, New Jersey',
        },
        {
            id: 8,
            title: 'Ophthalmology Exam',
            description: 'Eye examination for vision problems.',
            specialty: 'Ophthalmology',
            organization: 'Eye Clinic',
            area: 'Downtown',
            governorate: 'California',
            patientName: 'Olivia Taylor',
            age: 60,
            gender: 'Female',
            weight: '65 kg',
            location: 'Eye Clinic, California',
            address: '202 Elm Avenue, California',
        },
    ]);

    const [filters, setFilters] = useState({
        specialty: '',
        organization: '',
        area: '',
        governorate: '',
    });

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    const filteredCases = medicalCases.filter((caseItem) => {
        return (
            (filters.specialty === '' || caseItem.specialty === filters.specialty) &&
            (filters.organization === '' || caseItem.organization === filters.organization) &&
            (filters.area === '' || caseItem.area === filters.area) &&
            (filters.governorate === '' || caseItem.governorate === filters.governorate)
        );
    });

    const viewCaseDetails = (caseId) => {
        const caseDetails = medicalCases.find((caseItem) => caseItem.id === caseId);
        alert(`Patient Name: ${caseDetails.patientName}\nAge: ${caseDetails.age}\nGender: ${caseDetails.gender}\nWeight: ${caseDetails.weight}\nLocation: ${caseDetails.location}\nAddress: ${caseDetails.address}\nSpecialty: ${caseDetails.specialty}\nDescription: ${caseDetails.description}`);
    };

    const volunteerForCase = (caseId) => {
        alert(`Volunteering for case with ID ${caseId}`);
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Available Medical Cases</h1>
            <div className="mb-3">
                <label className="form-label">Filter by Specialty:</label>
                <select
                    className="form-select"
                    name="specialty"
                    value={filters.specialty}
                    onChange={handleFilterChange}
                >
                    <option value="">All Specialties</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Emergency Medicine">Emergency Medicine</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Dentistry">Dentistry</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Physical Therapy">Physical Therapy</option>
                    <option value="Ophthalmology">Ophthalmology</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Filter by Organization:</label>
                <select
                    className="form-select"
                    name="organization"
                    value={filters.organization}
                    onChange={handleFilterChange}
                >
                    <option value="">All Organizations</option>
                    <option value="City Hospital">City Hospital</option>
                    <option value="General Hospital">General Hospital</option>
                    <option value="Children's Hospital">Children's Hospital</option>
                    <option value="Central Hospital">Central Hospital</option>
                    <option value="Dental Clinic">Dental Clinic</option>
                    <option value="Neuro Clinic">Neuro Clinic</option>
                    <option value="Rehab Center">Rehab Center</option>
                    <option value="Eye Clinic">Eye Clinic</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Filter by Area:</label>
                <select
                    className="form-select"
                    name="area"
                    value={filters.area}
                    onChange={handleFilterChange}
                >
                    <option value="">All Areas</option>
                    <option value="Downtown">Downtown</option>
                    <option value="Uptown">Uptown</option>
                    <option value="Suburb">Suburb</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Filter by Governorate:</label>
                <select
                    className="form-select"
                    name="governorate"
                    value={filters.governorate}
                    onChange={handleFilterChange}
                >
                    <option value="">All Governorates</option>
                    <option value="New York">New York</option>
                    <option value="New Jersey">New Jersey</option>
                    <option value="California">California</option>
                </select>
            </div>
            <ul className="list-group">
                {filteredCases.map((caseItem) => (
                    <li key={caseItem.id} className="list-group-item">
                        <h2>{caseItem.title}</h2>
                        <p>{caseItem.description}</p>
                        <p><strong>Specialty:</strong> {caseItem.specialty}</p>
                        <p><strong>Organization:</strong> {caseItem.organization}</p>
                        <p><strong>Area:</strong> {caseItem.area}</p>
                        <p><strong>Governorate:</strong> {caseItem.governorate}</p>
                        <button className="btn btn-primary me-2" onClick={() => viewCaseDetails(caseItem.id)}>View Details</button>
                        <button className="btn btn-success" onClick={() => volunteerForCase(caseItem.id)}>Volunteer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewMedicalCases;
