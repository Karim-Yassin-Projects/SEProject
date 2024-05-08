import { useEffect, useState } from "react";
import { Donor, donors } from "./donor.ts";

function DonorFulfilled() {
    const [fulfilledDonors, setFulfilledDonors] = useState<Donor[]>([]);

    useEffect(() => {
        const matchedDonors = donors.filter(donor => donor.postStatus === 'Fulfilled');
        setFulfilledDonors(matchedDonors);
    }, []);

    return (
        <div className="container">
            <h1>Fulfilled Donors Details</h1>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Donor Name</th>
                    <th>Post Name</th>
                    <th>Post Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {fulfilledDonors.map((donor, index) => (
                    <tr key={index}>
                        <td>{donor.donorName}</td>
                        <td>{donor.postName}</td>
                        <td>{donor.postStatus}</td>
                        <td>
                            <button className="btn btn-primary" type="button" data-toggle="collapse" data-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`}>
                                Show/Hide Contact Details
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {fulfilledDonors.map((_donor, index) => (
                <div className="collapse" id={`collapse${index}`}>
                    <div className="card card-body">
                        Contact Details: 01099290532
                    </div>
                </div>
            ))}
        </div>
    );
}

export default DonorFulfilled;