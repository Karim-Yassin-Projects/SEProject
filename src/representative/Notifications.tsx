import {useNavigate} from "react-router-dom";
import {useCallback} from "react";
import {donors} from "./donor.ts";

function Notifications() {
    const navigate = useNavigate();
    const handleUpdate = useCallback((postId: number) => {
        navigate(`/representative/update-post/${postId}`);
    }, [navigate]);
    const fulfilledDonors = donors.filter((donor) => donor.postStatus === 'Fulfilled');

    return (
        <div className="container">
            <h1>Donor Notifications</h1>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Donor ID</th>
                    <th>Donor Name</th>
                    <th>Post Name</th>
                    <th>Post Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {fulfilledDonors.map((donor) => (
                    <tr key={donor.donorId}>
                        <td>{donor.donorId}</td>
                        <td>{donor.donorName}</td>
                        <td>{donor.postName}</td>
                        <td>{donor.postStatus}</td>
                        <td>
                            <button className="btn btn-primary" onClick={() => handleUpdate(donor.postId)}>Update</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Notifications;