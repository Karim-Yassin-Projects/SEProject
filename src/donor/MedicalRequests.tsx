import {NavLink} from "react-router-dom";
import {AllPosts} from "../common/posts.ts";
function MedicalRequests(){
    const medicalRequests = AllPosts.find(p => p.category === "Medical Supplies");

    if (!medicalRequests) {
        return <div>Medical Requests not found</div>
    }
    return (
        <div className="container">
            <h1>Medical Requests</h1>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Fulfilled</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{medicalRequests.title}</td>
                    <td style={{color: medicalRequests.fulfilled? 'green':'red'}}>
                        <strong>{medicalRequests.fulfilled? 'Fulfilled':'Not Fulfilled'}</strong>
                    </td>
                    <td>
                        <NavLink to={`/medical-request/${medicalRequests.id}`}>
                            <button className="btn btn-primary">View Details</button>
                        </NavLink>
                        </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default MedicalRequests;