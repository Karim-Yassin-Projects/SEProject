import {NavLink, useNavigate, useParams} from "react-router-dom";
import BreadCrumb from "../common/BreadCrumb.tsx";
import {allPosts, Donor, Post} from "./posts.ts";
import {useState} from "react";
import DeleteButton from "../common/DeleteButton.tsx";

function Details({post, donor}: { post: Post, donor: Donor }) {
    const [message, setMessage] = useState(
        `Dear ${donor.firstName} ${donor.lastName},
        
Thank you for your generous donation to our cause. Your contribution is greatly appreciated and will bring happiness to the children in our care.

Sincerely
The Maadi Orphanage Team`
    );
    const [showModal, setShowModal] = useState(false);
    const [messageSent, setMessageSent] = useState(false);
    const navigate = useNavigate();

    const sendMessage = () => {
        setMessageSent(true);
    };
    const closeModal = () => {
        setShowModal(false);
    }


    const links = [
        {to: '/', label: 'Home'},
        {to: '/representative', label: 'Representative Dashboard'},
        {to: '/representative/donation-posts', label: 'Donation Posts'},
        {to: `/representative/donation-posts/${post.id}`, label: `${post.title}`},
        {to: `/representative/donation-posts/${post.id}/donors`, label: 'Donors'},
        {
            to: `/representative/donation-posts/${post.id}/donors/${donor.donorId}`,
            label: `${donor.firstName} ${donor.lastName}`
        }
    ];

    return (
        <div className="container">
            <BreadCrumb links={links}></BreadCrumb>
            <h1>Donation Info </h1>
            <div className="card mt-4">
                <div className="card-header">
                    <h5 className="card-title">Donor: {donor.firstName} {donor.lastName}</h5>
                </div>
                <div className="card-body">
                    <h6 className="card-subtitle mb-2">Donation Details:</h6>
                    <p className="card-text">{donor.details}</p>
                    <h6 className="card-subtitle mb-2">Donation Post:</h6>
                    <p className="card-text"><NavLink
                        to={`/representative/donation-posts/${post.id}`}> {post.title}</NavLink></p>
                    <h6 className="card-subtitle mb-2">Post Status:</h6>
                    <p className="card-text"><strong
                        className={post.fulfilled ? 'text-success' : 'text-danger'}>{post.fulfilled ? 'Fulfilled' : 'Not fulfilled'}</strong>
                    </p>
                    <dl className="row">
                        <dt className="col-sm-2 text-end">Email:</dt>
                        <dd className="col-sm-10"><a href={`mailto:${donor.email}`}>{donor.email}</a>

                        </dd>

                        <dt className="col-sm-2 text-end">Phone number:</dt>
                        <dd className="col-sm-10">{donor.phone}</dd>
                    </dl>
                    <h6 className="card-title">Contact Address</h6>
                    <dl className="row">
                        <dt className="col-sm-2 text-end">Address:</dt>
                        <dd className="col-sm-10">{donor.address}</dd>

                        <dt className="col-sm-2 text-end">Area:</dt>
                        <dd className="col-sm-10">{donor.area}</dd>

                        <dt className="col-sm-2 text-end">Governorate:</dt>
                        <dd className="col-sm-10">{donor.governorate}</dd>
                    </dl>

                    <button className="btn btn-primary me-2" onClick={() => setShowModal(true)}
                            disabled={messageSent}>Send Thank You
                    </button>
                    {post.fulfilled &&
                        <DeleteButton onConfirm={() => navigate(`/representative/donation-posts/${post.id}/donors`)}/>}
                </div>
            </div>
            {showModal &&
                <div className="modal d-block" tabIndex={-1} role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Send Thank you</h5>
                                <button type="button" className="close" aria-label="Close" onClick={closeModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {messageSent &&
                                    <div className="alert alert-success success-box" role="alert">
                                        <i className="bi bi-check"></i>
                                        Message sent successfully.
                                    </div>
                                }
                                {!messageSent && <>
                                    <p className="text-primary">Sending a thank you email
                                        to {donor.firstName} {donor.lastName}? You can edit the
                                        message
                                        before sending.</p>

                                    <div className="form-group">
                                        <label htmlFor="message">Message</label>
                                        <textarea className="form-control" id="message" rows={10} value={message}
                                                  onChange={(e) => setMessage(e.target.value)}></textarea>
                                    </div>
                                </>}
                            </div>
                            {!messageSent && <>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" onClick={sendMessage}>Send
                                    </button>
                                    <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel
                                    </button>
                                </div>
                            </>}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

function DonorDetails() {
    const {postId, donorId} = useParams();

    if (!postId) {
        return <div>Missing post Id</div>
    }
    if (!donorId) {
        return <div>Missing donor Id</div>
    }

    const did = parseInt(donorId);
    if (isNaN(did)) {
        return <div>Invalid Donor Id</div>
    }

    const id = parseInt(postId);
    if (isNaN(id)) {
        return <div>Invalid Post Id</div>
    }

    const post = allPosts.find(p => p.id === id);
    if (!post) {
        return <div>Post not found</div>
    }

    const donor = post.donors.find(d => d.donorId === did);
    if (!donor) {
        return <div>Donor not found</div>
    }

    return <Details post={post} donor={donor}/>;
}

export default DonorDetails;