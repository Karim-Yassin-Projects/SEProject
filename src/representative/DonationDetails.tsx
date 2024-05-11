import {NavLink, useNavigate, useParams} from "react-router-dom";
import BreadCrumb from "../common/BreadCrumb.tsx";
import {useState} from "react";
import DeleteButton from "../common/DeleteButton.tsx";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from "dayjs";
import {AllPosts, Donation, Post} from "../common/posts.ts";

function Details({post, donation}: { post: Post, donation: Donation }) {
    const [message, setMessage] = useState(
        `Dear ${donation.firstName} ${donation.lastName},
        
Thank you for your generous donation to our cause. Your contribution is greatly appreciated and will be a great help for our community.

Sincerely
The ${post.organization.name} Team`
    );
    const [showModal, setShowModal] = useState(false);
    const [messageSent, setMessageSent] = useState(false);
    const [dropOffDate, setDropOffDate] = useState(donation.dropDate);
    const [selectedDropOffDate, setSelectedDropOffDate] = useState<Dayjs| null>(null);
    const [isDropped, setIsDropped] = useState(donation.isDropped);


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
        {to: '/representative/posts', label: 'Donation Posts'},
        {to: `/representative/posts/${post.id}`, label: `${post.title}`},
        {to: `/representative/posts/${post.id}/donations`, label: 'Donors'},
        {
            to: `/representative/posts/${post.id}/donations/${donation.id}`,
            label: `${donation.firstName} ${donation.lastName}`
        }
    ];

    return (
        <div className="container">
            <BreadCrumb links={links}></BreadCrumb>
            <h1>Donation Info </h1>
            <div className="card mt-4">
                <div className="card-header">
                    <h5 className="card-title">Donor: {donation.firstName} {donation.lastName}</h5>
                </div>
                <div className="card-body">
                    <h6 className="card-subtitle mb-2">Donation Details:</h6>
                    <p className="card-text">{donation.details}</p>
                    <h6 className="card-subtitle mb-2">Donation Post:</h6>
                    <p className="card-text"><NavLink
                        to={`/representative/posts/${post.id}`}> {post.title}</NavLink></p>
                    {isDropped && dropOffDate &&
                        <div className="text-success-emphasis">This donation has been dropped off
                            at {dropOffDate.toLocaleDateString(['en-GB'])}
                            &nbsp;at {dropOffDate.toLocaleTimeString(['en-GB'], {hour: '2-digit', minute: '2-digit'})}
                        </div>}
                    {!isDropped && dropOffDate &&
                        <div className="text-success-emphasis">This donation has scheduled drop-off
                            at {dropOffDate.toLocaleDateString(['en-GB'])}
                            &nbsp;at {dropOffDate.toLocaleTimeString(['en-GB'], {hour: '2-digit', minute: '2-digit'})}
                            <br />
                            <button className="btn btn-primary ms-2" onClick={() => setIsDropped(true)}>Mark as Dropped</button>
                        </div>
                    }
                    {!isDropped && !dropOffDate && <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
                            <div>
                                <small className="">No drop-off date scheduled for this donation yet.</small>
                                <br />
                                <label htmlFor="dropOffDate" className="mb-3">Drop Off Date</label>
                                <br />
                                <DateTimePicker label="Choose date" value={selectedDropOffDate} onChange={(e) => setSelectedDropOffDate(e)}/>
                                <button className="btn btn-primary ms-2 mt-2" onClick={() => { setDropOffDate(selectedDropOffDate?.toDate()) }} disabled={!selectedDropOffDate}>Schedule Drop-off</button>
                                <br />
                            </div>
                        </LocalizationProvider>
                    </div>}
                    <h6 className="card-subtitle my-2">Post Status:</h6>
                    <p className="card-text"><strong
                        className={post.fulfilled ? 'text-success' : 'text-danger'}>{post.fulfilled ? 'Fulfilled' : 'Not fulfilled'}</strong>
                    </p>
                    <dl className="row">
                        <dt className="col-sm-2 text-end">Email:</dt>
                        <dd className="col-sm-10"><a href={`mailto:${donation.email}`}>{donation.email}</a>

                        </dd>

                        <dt className="col-sm-2 text-end">Phone number:</dt>
                        <dd className="col-sm-10">{donation.phone}</dd>
                    </dl>
                    <h6 className="card-title">Contact Address</h6>
                    <dl className="row">
                        <dt className="col-sm-2 text-end">Address:</dt>
                        <dd className="col-sm-10">{donation.address}</dd>

                        <dt className="col-sm-2 text-end">Area:</dt>
                        <dd className="col-sm-10">{donation.area}</dd>

                        <dt className="col-sm-2 text-end">Governorate:</dt>
                        <dd className="col-sm-10">{donation.governorate}</dd>
                    </dl>

                    <button className="btn btn-primary me-2" onClick={() => setShowModal(true)}
                            disabled={messageSent}>Send Thank You
                    </button>
                    {post.fulfilled && !donation.isDropped &&
                        <DeleteButton onConfirm={() => navigate(`/representative/posts/${post.id}/donations`)}/>}

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
                                        to {donation.firstName} {donation.lastName}. You can edit the
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

function DonationDetails() {
    const {postId, donationId} = useParams();

    if (!postId) {
        return <div>Missing post Id</div>
    }
    if (!donationId) {
        return <div>Missing donation Id</div>
    }

    const did = parseInt(donationId);
    if (isNaN(did)) {
        return <div>Invalid Donation Id</div>
    }

    const id = parseInt(postId);
    if (isNaN(id)) {
        return <div>Invalid Post Id</div>
    }

    const post = AllPosts.find(p => p.id === id);
    if (!post) {
        return <div>Post not found</div>
    }

    const donor = post.donations.find(d => d.id === did);
    if (!donor) {
        return <div>Donation not found</div>
    }

    return <Details post={post} donation={donor}/>;
}

export default DonationDetails;