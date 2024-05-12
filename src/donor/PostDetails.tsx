import {useParams} from "react-router-dom";
import BreadCrumb from "../common/BreadCrumb.tsx";
import {
    getPostsByOrganization,
    isBloodDonationPost,
    isFoodPost,
    isMedicalCasesPost,
    isTeachingPost
} from "../common/posts.ts";
import PostInfo from "../common/PostInfo.tsx";
import {Organizations} from "../common/organizations.ts";
import OrganizationDetails from "./OrganizationDetails.tsx";
import {useState} from "react";
import {WeightCategories} from "../common/food.ts";

function PostDetails() {
    const {postId} = useParams();
    const [showModal, setShowModal] = useState(false);
    const [donationDone, setDonationDone] = useState(false);
    const [donationAmount, setDonationAmount] = useState(1);

    if (!postId) {
        return <div>Missing post Id</div>
    }

    const postIdNum = parseInt(postId);
    if (!postIdNum) {
        return <div>Invalid post Id</div>
    }
    const allPosts = Organizations.flatMap(org => getPostsByOrganization(org));
    const post = allPosts.find(p => p.id === postIdNum);
    if (!post) {
        return <div>Post not found</div>
    }

    const links = [
        {to: '/', label: 'Home'},
        {to: '/donor', label: 'Donor Dashboard'},
        {to: '/search-posts', label: 'Donation Posts'},
        {to: `/post-details-donor/${post.id}`, label: `${post.title}`}
    ]


    const sendDonation = () => {
        setDonationDone(true);
    };
    const closeModal = () => {
        setShowModal(false);
    }

    let donationMessage = `Please enter the amount you would like to donate.`;
    let donationAmountLabel = isFoodPost(post) &&
    WeightCategories.includes(post.food.category!) ? 'Weight (kg)' : 'Quantity';
    let donateButtonLabel = 'Donate';

    if (isMedicalCasesPost(post) || isTeachingPost(post)) {
        donationAmountLabel = 'Time in hours';
        donateButtonLabel = 'Volunteer';
        donationMessage = `Please enter the amount of time you would like to volunteer.`;
    }
    if (isBloodDonationPost(post)) {
        donationAmountLabel = 'Blood Units';
    }




    return (
        <div className="container">
            <BreadCrumb links={links}/>
            <h1>Donation Post</h1>
            <div className="card mt-4">
                <div className="card-header">
                    <h5 className="card-title">{post.title}</h5>
                </div>
                <div className="card-body">
                    <OrganizationDetails organization={post.organization}/>

                    <div className="card-text">
                        <p><strong>Status</strong>: <strong
                            className={post.fulfilled ? 'text-success' : 'text-danger'}>{post.fulfilled ? 'Fulfilled' : 'Not fulfilled'}</strong>
                        </p>
                        <PostInfo post={post}/>
                        {post.details.split('\n').map((line, index) => (
                            <span key={index}>
                                {line}
                                <br/>
                            </span>
                        ))}
                    </div>
                    <button className="btn btn-primary my-2" onClick={() => setShowModal(true)} disabled={donationDone}>{donateButtonLabel}</button>
                </div>
            </div>
            {showModal &&
                <div className="modal d-block" tabIndex={-1} role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{donateButtonLabel}</h5>
                                <button type="button" className="close" aria-label="Close" onClick={closeModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {donationDone &&
                                    <div className="alert alert-success success-box" role="alert">
                                        <i className="bi bi-check"></i>
                                        Your request has been received.
                                        Thank you for your contribution. Our community appreciates your help.
                                    </div>
                                }
                                {!donationDone && <>
                                {donationAmountLabel && <>
                                        <p className="text-primary">
                                            {donationMessage}
                                        </p>

                                        <div className="form-group">
                                            <label htmlFor="quantity">{donationAmountLabel}</label>
                                            <input className="form-control" id="message" type="number"
                                                   value={donationAmount}
                                                   onChange={(e) => setDonationAmount(parseInt(e.target.value))}></input>
                                        </div>
                                    </> }
                                </>}
                            </div>
                            {!donationDone && <>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" onClick={sendDonation}>{donateButtonLabel}
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

export default PostDetails;