import {useParams} from "react-router-dom";
import {donors} from "./donor.ts";
import BreadCrumb from "../common/BreadCrumb.tsx";

function DonorDetails() {
    const {postId} = useParams();
    if (!postId) {
        return <div>Missing post Id</div>
    }

    const id = parseInt(postId);
    if (isNaN(id)) {
        return <div>Invalid postId Id</div>
    }

    const donor = donors.find(donor => donor.postId === id);
    if (!donor) {
        return <div>Donor not found</div>
    }

    const links = [
        {to: '/', label: 'Home'},
        {to: '/representative', label: 'Organization Representative'},
        {to: '/representative/fulfilled-donors', label: 'Fulfilled Donors'},
        {to: `/representative/contact-details/${postId}`, label: `${donor.donorName}'s Contact details`}
    ];

    return (
        <div className="container">
            <BreadCrumb links={links}></BreadCrumb>
            <h1>Donation Info </h1>
            <h4>Donor Details</h4>
            <dl className="row">
                <dt className="col-sm-2 text-end">First name:</dt>
                <dd className="col-sm-10">{donor.firstName}</dd>

                <dt className="col-sm-2 text-end">Last name:</dt>
                <dd className="col-sm-10">{donor.lastName}</dd>

                <dt className="col-sm-2 text-end">Email:</dt>
                <dd className="col-sm-10"><a href={`mailto:${donor.email}`}>{donor.email}</a></dd>
            </dl>
            <h4>Donation Details</h4>
            <dl className="row">
                <dt className="col-sm-2 text-end">Details:</dt>
                <dd className="col-sm-10">{donor.details}</dd>

                <dt className="col-sm-2 text-end">Status:</dt>
                <dd className="col-sm-10">Fulfilled</dd>
            </dl>
            <h4>Contact Details</h4>
                <dl className="row">
                    <dt className="col-sm-2 text-end">Address:</dt>
                    <dd className="col-sm-10">{donor.address}</dd>

                    <dt className="col-sm-2 text-end">Area:</dt>
                    <dd className="col-sm-10">{donor.area}</dd>

                    <dt className="col-sm-2 text-end">Governorate:</dt>
                    <dd className="col-sm-10">{donor.governorate}</dd>

                    <dt className="col-sm-2 text-end">Phone number:</dt>
                    <dd className="col-sm-10">{donor.phone}</dd>


                </dl>
        </div>
);
}

export default DonorDetails;