import {NavLink, useNavigate} from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useEffect, useState} from "react";
import BreadCrumb from "../common/BreadCrumb.tsx";
import DeleteButton from "../common/DeleteButton.tsx";
import {AllDonations, Donation} from "../common/posts.ts";
import {Organizations} from "../common/organizations.ts";

const times = [
    'just now',
    '5 minutes ago',
    '10 minutes ago',
    '1 hour ago',
]

function Home() {
    const navigate = useNavigate();
    const allDonations = AllDonations;

    const [recentIndex, setRecentIndex] = useState(0);
    useEffect(() => {
        const intervalId = setInterval(() => {
            toast.success("You have just received a new donation.", {
                onClick: () => {
                    navigate(`/representative/posts/${allDonations[0].post.id}/donations/${allDonations[0].id}`);
                }
            });
            setRecentIndex((current) => (current + 1))
        }, 15000);

        return () => clearInterval(intervalId);
    });
    const links = [
        {to: '/', label: 'Home'},
        {to: '/representative', label: 'Representative Dashboard'},
    ]
    const recentDonations: Donation[] = [];
    for (let i = 0; i < 3; i++) {
        recentDonations.push(allDonations[(recentIndex + i) % allDonations.length]);
    }
    return <>

        <div className="container">
            <BreadCrumb links={links}/>
            <h6 className="text-start">Welcome Kareem</h6>
            <h4 className="text-start">Dashboard</h4>
            <div className="row overflow-hidden">
                <div className="col-lg-6 p-1 d-table-cell float-none align-top">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Recent Donations</h5>
                            <ul className="list-unstyled mb-4">
                                {recentDonations.map((donor, index) => <li
                                    key={donor.id}>
                                    <NavLink
                                        to={`/representative/posts/${donor.post.id}/donations/${donor.id}`}>{donor.firstName} {donor.lastName}</NavLink>: {donor.details}
                                    &nbsp;
                                    <small className="text-secondary">({times[index % times.length]})</small></li>)}
                            </ul>

                        </div>
                        <div className="card-footer text-center">
                            <NavLink to="/representative/posts" className="btn btn-primary btn-sm">View
                                Donation
                                Posts</NavLink>
                            <NavLink to="/representative/posts/donations"
                                     className="btn btn-primary btn-sm ms-2 my-1">View
                                All Donations</NavLink>
                            <NavLink to="/representative/posts/recent/donations"
                                     className="btn btn-primary btn-sm ms-2 my-1">View
                                Recent Donations</NavLink>
                            <NavLink to="/representative/posts/new"
                                     className="btn btn-primary btn-sm ms-2 my-1">New Donation Post</NavLink>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-lg-3 p-1 d-table-cell float-none align-top">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Unfulfilled Posts</h5>
                            <p className="card-text display-4 text-danger">1234</p>

                        </div>
                        <div className="card-footer text-center">
                            <NavLink to="/representative/posts/unfulfilled" className="btn btn-primary btn-sm my-1">View
                                Unfulfilled Posts</NavLink>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-lg-3 p-1 d-table-cell float-none align-top">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Fulfilled Posts</h5>
                            <p className="card-text display-4 text-success">345</p>
                        </div>
                        <div className="card-footer text-center">
                            <NavLink to="/representative/posts/fulfilled" className="btn btn-primary btn-sm my-1">View
                                Fulfilled Posts</NavLink>
                        </div>
                    </div>
                </div>
                <div className="clearfix"></div>
            </div>

            <div className="row overflow-hidden">
                <div className="col-8 col-lg-4 p-1 d-table-cell float-none align-top">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Organization</h5>
                            <p className="card-text"><strong>{Organizations[0].name}</strong></p>
                            <p className="card-text">Address: {Organizations[0].address}, {Organizations[0].area}, {Organizations[0].governorate}<br />
                                Phone: {Organizations[0].phone}
                            </p>
                        </div>
                        <div className="card-footer text-center">
                            <NavLink to="/representative/update-organization" className="btn btn-primary btn-sm me-2 my-1">Update
                                Organization</NavLink>
                            <DeleteButton title="Confirm delete Organization"
                                          deleteText="Delete Organization"
                                          deleteButtonClass="btn btn-danger btn-sm my-1"
                                          message="Are you sure you want to delete organization 'Maadi Orphanage'? Doing so will delete all donation posts, organization information from database and cannot be undone."
                                          onConfirm={() => navigate('/')}/>
                        </div>
                    </div>
                </div>
                <div className="col-4 col-lg-2 p-1 d-table-cell float-none align-top">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Representative</h5>
                            <p className="card-text">Kareem Elmeteny</p>

                        </div>
                        <div className="card-footer text-center">
                            <NavLink to="/representative/change-password" className="btn btn-primary btn-sm my-1">Change Password</NavLink>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-lg-3 p-1 d-table-cell float-none align-top">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Donations this month</h5>
                            <p className="card-text display-4">384</p>
                        </div>
                        <div className="card-footer text-center">
                            <NavLink to="/representative/posts/monthly/donations" className="btn btn-primary btn-sm my-1">View
                                this month's donations</NavLink>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-lg-3 p-1">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Donations this week</h5>
                            <p className="card-text display-4">82</p>

                        </div>
                        <div className="card-footer text-center">
                            <NavLink to="/representative/posts/weekly/donations" className="btn btn-primary btn-sm my-1">View
                                this week's donations</NavLink>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <ToastContainer/>
    </>
}

export default Home;