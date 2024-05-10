import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteButton from "../common/DeleteButton";
import BreadCrumb from "../common/BreadCrumb.tsx";

const RegisteredOrganizations: React.FC = () => {
    const [organizations, setOrganizations] = useState([
        {
            id: 1,
            name: "Organization A",
            area: "Sidi Gaber",
            governorate: "Alexandria",
            type: "School",
            address: "123 Street",
            contact: "+2010000001",
            location: "Location A"
        },
        {
            id: 2,
            name: "Organization B",
            area: "Maadi",
            governorate: "Cairo",
            type: "Hospital",
            address: "456 Street",
            contact: "+2010000001",
            location: "Location B"
        },
        {
            id: 3,
            name: "Organization C",
            area: "Giza City",
            governorate: "Giza",
            type: "Non-profit",
            address: "789 Street",
            contact: "+2010000001",
            location: "Location C"
        }
    ]);

    const navigate = useNavigate();

    const redirectToOrganizationDetails = () => {
        navigate('/organizationdetails');
    };

    const handleDeleteOrganization = (id: number) => {
        const updatedOrganizations = organizations.filter(org => org.id !== id);
        setOrganizations(updatedOrganizations);
    };

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
        Cairo: ['Maadi', 'Zamalek', 'Tagmoa', 'Shiekh Zayed'],
        Mansoura: ['Mansoura'],
        Matrouh: ['Marsa Matrouh'],
        PortSaid: ['Port Said City'],
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [filterArea, setFilterArea] = useState('');
    const [filterGovernorate, setFilterGovernorate] = useState<keyof typeof areas | "">('');
    const [filterType, setFilterType] = useState('');

    const filteredOrganizations = organizations.filter(org =>
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterArea ? org.area === filterArea : true) &&
        (filterGovernorate ? org.governorate === filterGovernorate : true) &&
        (filterType ? org.type === filterType : true)
    );

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case 'filterGovernorate':
                setFilterGovernorate(value as keyof typeof areas | "");
                setFilterArea('');
                break;
            case 'filterArea':
                setFilterArea(value);
                break;
            case 'filterType':
                setFilterType(value);
                break;
            default:
                break;
        }
    };
    const links = [
        {to: '/', label: 'Home'},
        {to: '/Home', label: 'Login'},
        {to: '/Dashboard', label: 'Dashboard'},
        {to: '/RegisteredOrganizations', label: 'Registered Organizations'},
    ];

    return (
        <div className="container">
            <BreadCrumb links={links}/>
            <h1 className="text-center">Registered Organizations</h1>

            <div className="row mb-3">
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by organization name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col">
                    <select
                        className="form-select"
                        name="filterGovernorate"
                        value={filterGovernorate}
                        onChange={handleFilterChange}
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
                        name="filterArea"
                        value={filterArea}
                        onChange={handleFilterChange}
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
                        name="filterType"
                        value={filterType}
                        onChange={handleFilterChange}
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
                    <th>Organization Details</th>
                    <th>Account Management</th>
                </tr>
                </thead>
                <tbody>
                {filteredOrganizations.map((org) => (
                    <tr key={org.id}>
                        <td>{org.name}</td>
                        <td>{org.area}</td>
                        <td>{org.governorate}</td>
                        <td>{org.type}</td>
                        <td>
                            <button
                                className="btn btn-link"
                                onClick={() => redirectToOrganizationDetails(org.id)}
                            >
                                View
                            </button>
                        </td>
                        <td>
                            <DeleteButton
                                onConfirm={() => handleDeleteOrganization(org.id)}
                                title="Confirm Delete"
                                message={`Are you sure you want to delete ${org.name}? This action cannot be undone.`}
                                deleteText="Delete Organization"
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default RegisteredOrganizations;
