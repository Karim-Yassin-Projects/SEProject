import React from 'react';

// Define a type for the organization object
interface Organization {
    email: string;
    phone: string;
    address: string;
    location: string;
    type: string;
}

const OrganizationDetails: React.FC<{ organization: Organization }> = ({ organization }) => {
    // Dummy data for organization details
    const dummyOrganization: Organization = {
        email: "organization@example.com",
        phone: "+20123456789",
        address: "123 Street, Area A, Governorate A",
        location: "",
        type: "Hospital / Non-Profit / School / Mosque / Church"
    };

    // Merge dummy data with provided organization data, prioritizing provided data
    const mergedOrganization: Organization = { ...dummyOrganization, ...organization };

    // Redirect URL for the location
    const locationURL = 'https://www.google.com/maps/d/viewer?mid=1T-8cuFZikeyTFftOFduzq7sax6Y&hl=en&ll=41.3811355469548%2C2.119373911464044&z=14';

    return (
        <div className="container">
            <h1 className="text-center mb-4">Organization Details</h1>
            <div className="row">
                <div className="col-md-6">
                    <div className="mb-4">
                        <h2>Contact Information</h2>
                        <p><strong>Email:</strong> {mergedOrganization.email}</p>
                        <p><strong>Phone:</strong> {mergedOrganization.phone}</p>
                    </div>
                    <div className="mb-4">
                        <h2>Address</h2>
                        <p>{mergedOrganization.address}</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-4">
                        <h2>Location</h2>
                        <p>{mergedOrganization.location}</p>
                        {/* Location link with redirect */}
                        <a href={locationURL} target="_blank" rel="noopener noreferrer">View on Map</a>
                    </div>
                    <div className="mb-4">
                        <h2>Type of Organization</h2>
                        <p>{mergedOrganization.type}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrganizationDetails;
