import BreadCrumb from "../common/BreadCrumb.tsx";
import DashboardCard from "./DashboardCard.tsx";
import {PostCategories, unfulfilledPosts} from "../common/posts.ts";
import {NavLink, useNavigate} from "react-router-dom";
import DeleteButton from "../common/DeleteButton.tsx";

const Dashboard = () => {
    const navigate = useNavigate();
    const links = [
        {to: '/', label: 'Home'},
        {to: '/donor', label: 'Donor Dashboard'},
    ];

    return (
        <div className="dashboard container d-flex flex-column p-4">
            <BreadCrumb links={links}/>
            <h1 className="display-3 mb-4">Dashboard</h1>

            <div className="row overflow-hidden">
                <DashboardCard category="" count={unfulfilledPosts().length}/>
                {
                    PostCategories.map(category =>
                        <DashboardCard key={category} category={category} count={unfulfilledPosts(category).length}/>)
                }
                <div className="col-6 col-lg-3 p-1 d-table-cell float-none align-top">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Donor Details</h5>
                            <p className="card-text text-center">
                                Raghad Helal<br/>
                                Cardiology Doctor
                            </p>
                        </div>
                        <div className="card-footer text-center">
                            <NavLink to="/donor/update-profile" className="btn btn-primary btn-sm my-1">Update
                                Profile</NavLink>
                            <NavLink to="/donor/change-password" className="btn btn-primary btn-sm ms-2 my-1">Change Password</NavLink>
                            <DeleteButton onConfirm={() => navigate('/')}
                                          deleteButtonClass="btn btn-danger btn-sm ms-2 my-1"
                                          message="Are you sure you want to delete your account? This action cannot be undone."
                                          deleteText="Delete Account"
                                          title="Delete Account"
                            />
                        </div>

                    </div>
                </div>
            </div>


        </div>
    );
};

export default Dashboard;
