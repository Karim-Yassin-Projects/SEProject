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
import {Formik} from "formik";
import {DonationRequest, donationSchema, DonationTypes, TransportationTypes} from "./donation.ts";
import FormField from "../common/FormField.tsx";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import dayjs from "dayjs";


function PostDetails() {
    const {postId} = useParams();
    const [showModal, setShowModal] = useState(false);
    const [donationDone, setDonationDone] = useState(false);
    const [donationRequest, setDonationRequest] = useState<DonationRequest | null>(null);

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


    const initialRequest: DonationRequest = {
        type: '',
        category: post.category,
        quantity: 1,
        date: null as unknown as Date,
    };
    const selectType = !(isMedicalCasesPost(post) || isTeachingPost(post) || isBloodDonationPost(post));

    if (isBloodDonationPost(post)) {
        initialRequest.type = 'Drop-off';

    }


    const links = [
        {to: '/', label: 'Home'},
        {to: '/donor', label: 'Donor Dashboard'},
        {to: '/donor/search-posts', label: 'Donation Posts'},
        {to: `/donor/post-details/${post.id}`, label: `${post.title}`}
    ]


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
        donationMessage = `Please enter the amount of time you would like to volunteer.`;
        donationAmountLabel = 'Blood Units';
    }

    const handleSubmit = (values: DonationRequest) => {
        setDonationRequest(values);
        setDonationDone(true);
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
                    {!donationDone && <button className="btn btn-primary my-2" onClick={() => setShowModal(true)}
                            disabled={donationDone}>{donateButtonLabel}</button> }
                    {donationDone && <div className="alert alert-success my-2" role="alert">
                        Your request has been received.
                        Thank you for your contribution. Our community appreciates your help.

                        {!(isMedicalCasesPost(post) || isTeachingPost(post))
                            && <div className="my-2">
                                <h5>Donation Details:</h5>
                                <p>
                                    <strong>Donation Amount:</strong> {donationRequest?.quantity} {isFoodPost(post) &&
                                WeightCategories.includes(post.food.category!) ? ' Kg' : ''}
                                    {isBloodDonationPost(post) && ' Blood Units'}
                                    {donationRequest?.type === 'Pickup' && <>
                                        <br/>
                                        <strong>Transportation Type:</strong> {donationRequest?.transportationType}
                                        </>
                                    }
                                    {donationRequest?.date && <>
                                    <br />
                                        This donation has scheduled <strong>{donationRequest.type}</strong> on <strong>{donationRequest.date.toLocaleDateString(['en-GB'])}
                                        &nbsp;at {donationRequest.date.toLocaleTimeString(['en-GB'], {hour: '2-digit', minute: '2-digit'})}</strong>
                                    </>
                                    }
                                </p>
                            </div>
                        }
                    </div>}
                </div>
            </div>
            {showModal &&
                <Formik initialValues={initialRequest} validationSchema={donationSchema} onSubmit={handleSubmit}>
                    {
                        (formik) => {
                            const type = formik.values.type;
                            return (
                                <div className="modal d-flex" tabIndex={-1} role="dialog">
                                    <div className="modal-dialog big-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title">{donateButtonLabel}</h5>
                                                <button type="button" className="close" aria-label="Close"
                                                        onClick={closeModal}>
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                {donationDone &&
                                                    <div className="alert alert-success success-box" role="alert">
                                                        <i className="bi bi-check"></i>
                                                        Your request has been received.
                                                        Thank you for your contribution. Our community appreciates your
                                                        help.
                                                    </div>
                                                }
                                                {!donationDone && <>
                                                    {donationAmountLabel && <>
                                                        <p className="text-primary">
                                                            {donationMessage}
                                                        </p>


                                                        <>
                                                            {selectType && <FormField formik={formik} name="type"
                                                                                      schema={donationSchema}
                                                                                      options={DonationTypes}/>}
                                                            <FormField formik={formik} name="quantity"
                                                                       schema={donationSchema}
                                                                       label={donationAmountLabel}/>
                                                            {type == 'Pickup' &&
                                                                <FormField formik={formik} name="transportationType"
                                                                           schema={donationSchema}
                                                                           options={TransportationTypes}/>}
                                                            {type != '' && <>
                                                                <LocalizationProvider dateAdapter={AdapterDayjs}
                                                                                      adapterLocale='en-gb'>
                                                                    <div className="form-group row">
                                                                        <label htmlFor="dropOffDate"
                                                                               className="col-md-2">{type} Date</label>
                                                                        <div className="col-md-10">
                                                                            <DateTimePicker label={`choose ${type} date`}
                                                                                            value={dayjs(formik.values.date)}
                                                                                            onChange={(e) => formik.setFieldValue('date', e?.toDate())}/>

                                                                            {formik.errors.date && <div className="text-danger small">Please select {type} date.</div>}
                                                                        </div>

                                                                    </div>
                                                                </LocalizationProvider>
                                                            </>}

                                                        </>
                                                    </>}
                                                </>}
                                            </div>
                                            {!donationDone && <>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-primary"
                                                            onClick={formik.submitForm}>{donateButtonLabel}
                                                    </button>
                                                    <button type="button" className="btn btn-secondary"
                                                            onClick={closeModal}>Cancel
                                                    </button>
                                                </div>
                                            </>}

                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    }
                </Formik>
            }
        </div>
    );
}

export default PostDetails;