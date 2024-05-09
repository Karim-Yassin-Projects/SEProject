import {useEffect, useState} from "react";
import BreadCrumb from "../common/BreadCrumb.tsx";
import {NavLink, useParams} from "react-router-dom";
import DeleteButton from "../common/DeleteButton.tsx";
import {allPosts, DonorWithPost, Titles} from "./posts.ts";

function Donors() {

    const [donorList, setDonorList] = useState<DonorWithPost[]>([]);
    const {postIdOrStatus} = useParams();
    const postId = postIdOrStatus ? parseInt(postIdOrStatus) : null;

    useEffect(() => {

            let all = allPosts.reduce((prev, curr) => {
                prev.push(...curr.donors.map((donor) => ({...donor, post: curr})));
                return prev;
            }, [] as DonorWithPost[]);

            if (typeof postId === 'number' && !isNaN(postId)) {
                all = all.filter((donor) => donor.post.id === postId);
            } else if (postIdOrStatus === 'fulfilled') {
                all = all.filter((donor) => donor.post.fulfilled);
            } else if (postIdOrStatus === 'unfulfilled') {
                all = all.filter((donor) => !donor.post.fulfilled);
                console.log(all)
            }
            setDonorList(all);
        }, [postIdOrStatus, postId]
    );

    if (postId !== null && isNaN(postId)  && postIdOrStatus !== undefined && !Titles[postIdOrStatus]) {
        return <div>Invalid Post ID</div>;
    }
    const post = postId !== null && !isNaN(postId) ? allPosts.find((post) => post.id === postId) : null;
    if (postId !== null && !isNaN(postId) && !post) {
        return <div>Post not found</div>;
    }

    const links = [
        {to: '/', label: 'Home'},
        {to: '/representative', label: 'Representative Dashboard'},

    ];

    let title: string;

    if (postIdOrStatus !== undefined && postIdOrStatus !== 'recent' && postIdOrStatus !== 'weekly' && postIdOrStatus !== 'monthly') {
        links.push( {to: '/representative/donation-posts', label: 'Donation Posts'});
        links.push({
            to: `/representative/donation-posts/${postIdOrStatus}`,
            label: post?.title ?? Titles[postIdOrStatus]
        });
        links.push({to: `/representative/donation-posts/${postIdOrStatus}/donors`, label: 'Donors'});
        title = 'Donors: ' + (post?.title ?? Titles[postIdOrStatus]);
    } else {
        title = Titles[postIdOrStatus ?? 'all'];
        links.push({to: postIdOrStatus ? `/representative/donation-posts/${postIdOrStatus}/donors` : '/representative/donation-posts/donors', label: title});
    }
    return (
        <div className="container">
            <BreadCrumb links={links}></BreadCrumb>
            <h1>{title}</h1>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Donor Name</th>
                    <th>Post Title</th>
                    <th>Post Status</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {donorList.map((donor, index) => (
                    <tr key={index}>
                        <td>{donor.firstName} {donor.lastName}</td>
                        <td>{donor.post.title}</td>
                        <td className={donor.post.fulfilled ? 'text-success' : 'text-danger'}>
                            <strong>{donor.post.fulfilled ? 'Fulfilled' : 'Not Fulfilled'}</strong></td>
                        <td>
                            <NavLink to={`/representative/donation-posts/${donor.post.id}/donors/${donor.donorId}`}
                                     className="btn btn-secondary me-2">Show Details</NavLink>
                            {donor.post.fulfilled && <DeleteButton onConfirm={() => {
                                //donorList.splice(index, 1);
                                setDonorList(donorList.toSpliced(index, 1));
                            }}/>}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Donors;