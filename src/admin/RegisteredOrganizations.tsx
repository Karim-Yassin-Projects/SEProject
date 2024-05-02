import React, { useState } from 'react';

const RegisteredOrganizations: React.FC = () => {
    const [organizations, setOrganizations] = useState([
        {
            id: 1,
            name: "Organization A",
            area: "Sidi Gaber",
            governorate: "Alexandria",
            type: "School",
            address: "Address A",
            contact: "Contact A",
            location: "Location A"
        },
        {
            id: 2,
            name: "Organization B",
            area: "Maadi",
            governorate: "Cairo",
            type: "Hospital",
            address: "Address B",
            contact: "Contact B",
            location: "Location B"
        },
        {
            id: 3,
            name: "Organization C",
            area: "Giza City",
            governorate: "Giza",
            type: "Non-profit",
            address: "Address C",
            contact: "Contact C",
            location: "Location C"
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterArea, setFilterArea] = useState('');
    const [filterGovernorate, setFilterGovernorate] = useState('');
    const [filterType, setFilterType] = useState('');

    const handleDeleteOrganization = (id: number) => {
        const updatedOrganizations = organizations.filter(org => org.id !== id);
        setOrganizations(updatedOrganizations);
    };

    const filteredOrganizations = organizations.filter(org =>
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterArea ? org.area === filterArea : true) &&
        (filterGovernorate ? org.governorate === filterGovernorate : true) &&
        (filterType ? org.type === filterType : true)
    );

    const organizationTypes = ['School', 'Hospital', 'Non-profit', 'Mosque', 'Church'];
    const governorates = ['Alexandria', 'Aswan', 'Assiut', 'Cairo', 'Dakahlia', 'Fayoum', 'Giza', 'Ismailia', 'Matrouh', 'Minya', 'Menofia'];
    const areas = {
        Alexandria: ['Sidi Gaber', 'Montaza', 'Raml Station', 'Stanley', 'Sporting'],
        Minya: ['Minya City', 'Shibin El Kom'],
        Aswan: ['Aswan City'],
        Assiut: ['Assiut City'],
        Giza: ['Giza City'],
        Fayoum: ['Fayoum City'],
        Ismailia: ['Ismailia City'],
        Cairo: ['Maadi', 'Zamalek','Tagmoa','Shiekh Zayed'],
        Mansoura: ['Mansoura'],
        Matrouh: ['Marsa Matrouh'],
        PortSaid: ['Port Said City'],
        // Add areas for other governorates as needed
    };

    const locationURL = 'https://www.google.com/maps/d/viewer?mid=1T-8cuFZikeyTFftOFduzq7sax6Y&hl=en&ll=41.3811355469548%2C2.119373911464044&z=14';

    return (
        <div className="container">
            <h1 className="text-center">Registered Organizations</h1>

            <div className="mt-4">
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by organization name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <select
                            className="form-select"
                            value={filterGovernorate}
                            onChange={(e) => {
                                setFilterGovernorate(e.target.value);
                                setFilterArea(''); // Reset filterArea when selecting a new governorate
                            }}
                        >
                            <option value="">Filter by governorate...</option>
                            {governorates.map((governorate, index) => (
                                <option key={index} value={governorate}>{governorate}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col">
                        <select
                            className="form-select"
                            value={filterArea}
                            onChange={(e) => setFilterArea(e.target.value)}
                        >
                            <option value="">Filter by area...</option>
                            {filterGovernorate && areas[filterGovernorate].map((area, index) => (
                                <option key={index} value={area}>{area}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col">
                        <select
                            className="form-select"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="">Filter by type...</option>
                            {organizationTypes.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Area</th>
                        <th>Governorate</th>
                        <th>Type</th>
                        <th>Address</th>
                        <th>Contact</th>
                        <th>Location</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredOrganizations.map((org) => (
                        <tr key={org.id}>
                            <td>{org.name}</td>
                            <td>{org.area}</td>
                            <td>{org.governorate}</td>
                            <td>{org.type}</td>
                            <td>{org.address}</td>
                            <td>{org.contact}</td>
                            <td><a href={locationURL} target="_blank" rel="noopener noreferrer">{org.location}</a></td>
                            <td>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteOrganization(org.id)}>Delete Organization</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RegisteredOrganizations;
