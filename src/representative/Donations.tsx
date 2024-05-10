import {useEffect, useState} from "react";
import BreadCrumb from "../common/BreadCrumb.tsx";
import {NavLink, useParams} from "react-router-dom";
import DeleteButton from "../common/DeleteButton.tsx";
import {Titles} from "./posts.ts";
import {AllPosts, Donation, getDonationsForDefaultOrganization} from "../common/posts.ts";

function Donations() {

    const [donations, setDonations] = useState<Donation[]>([]);
    const {postIdOrStatus} = useParams();
    const postId = postIdOrStatus ? parseInt(postIdOrStatus) : null;
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [itemsPerPage,] = useState(10);

    useEffect(() => {

            let all = getDonationsForDefaultOrganization();

            if (typeof postId === 'number' && !isNaN(postId)) {
                all = all.filter((donor) => donor.post.id === postId);
            } else if (postIdOrStatus === 'fulfilled') {
                all = all.filter((donor) => donor.post.fulfilled);
            } else if (postIdOrStatus === 'unfulfilled') {
                all = all.filter((donor) => !donor.post.fulfilled);
                console.log(all)
            }
            setDonations(all);
        }, [postIdOrStatus, postId]
    );

    if (postId !== null && isNaN(postId)  && postIdOrStatus !== undefined && !Titles[postIdOrStatus]) {
        return <div>Invalid Post ID</div>;
    }
    const post = postId !== null && !isNaN(postId) ? AllPosts.find((post) => post.id === postId) : null;
    if (postId !== null && !isNaN(postId) && !post) {
        return <div>Post not found</div>;
    }

    const links = [
        {to: '/', label: 'Home'},
        {to: '/representative', label: 'Representative Dashboard'},

    ];

    let title: string;

    if (postIdOrStatus !== undefined && postIdOrStatus !== 'recent' && postIdOrStatus !== 'weekly' && postIdOrStatus !== 'monthly') {
        links.push( {to: '/representative/posts', label: 'Donation Posts'});
        links.push({
            to: `/representative/posts/${postIdOrStatus}`,
            label: post?.title ?? Titles[postIdOrStatus]
        });
        links.push({to: `/representative/posts/${postIdOrStatus}/donations`, label: 'Donations'});
        title = 'Donations: ' + (post?.title ?? Titles[postIdOrStatus]);
    } else {
        title = Titles[postIdOrStatus ?? 'all'];
        links.push({to: postIdOrStatus ? `/representative/posts/${postIdOrStatus}/donations` : '/representative/posts/donations', label: title});
    }

    const indexOfFirstPost = currentPageIndex * itemsPerPage;
    const indexOfLastPost = Math.min(indexOfFirstPost + itemsPerPage - 1, donations.length - 1);
    const numberOfPages = Math.ceil(donations.length / itemsPerPage);
    const currentDonations = donations.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber: number) =>{
        if (pageNumber < 0 || pageNumber >= numberOfPages) {
            return;
        }
        setCurrentPageIndex(pageNumber)
    } ;
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
                {currentDonations.map((donor, index) => (
                    <tr key={index}>
                        <td>{donor.firstName} {donor.lastName}</td>
                        <td>{donor.post.title}</td>
                        <td className={donor.post.fulfilled ? 'text-success' : 'text-danger'}>
                            <strong>{donor.post.fulfilled ? 'Fulfilled' : 'Not Fulfilled'}</strong></td>
                        <td>
                            <NavLink to={`/representative/posts/${donor.post.id}/donations/${donor.id}`}
                                     className="btn btn-secondary me-2">Show Details</NavLink>
                            {donor.post.fulfilled && <DeleteButton onConfirm={() => {
                                //donorList.splice(index, 1);
                                setDonations(donations.toSpliced(index, 1));
                            }}/>}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <nav className="text-center" aria-label="Pagination">
                <ul className='pagination justify-content-center'>
                    <li className='page-item'>
                        <button className="page-link" onClick={() => paginate(currentPageIndex - 1)}>Previous</button>
                    </li>
                    {Array(Math.ceil(donations.length / itemsPerPage)).fill(null).map((_, index) => (
                        <li key={index} className={`page-item ${index === currentPageIndex ? 'active' : ''}`}>
                            <button onClick={() => paginate(index)} className='page-link'>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li className='page-item'>
                        <button className="page-link" onClick={() => paginate(currentPageIndex + 1)}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Donations;