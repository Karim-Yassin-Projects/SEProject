import {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import DeleteButton from "../common/DeleteButton.tsx";
import BreadCrumb from "../common/BreadCrumb.tsx";
import {allPosts, Post} from "./posts.ts";

function DonationPosts({fulfilled }: {fulfilled?: boolean}) {

    const [posts, setPosts] = useState<Post[]>([]);
    useEffect(() => {
        let all = allPosts;
        if (fulfilled !== undefined) {
            all = all.filter((post) => post.fulfilled === fulfilled);
        }
        setPosts(all);
    }, [fulfilled]);

    const deletePost = (id: number) => {
        setPosts(posts.filter((post) => post.id !== id));
    };

    const links = [
        {to: '/', label: 'Home'},
        {to: '/representative', label: 'Representative Dashboard'},
        {to: '/representative/donation-posts', label: 'Donation Posts'}
    ];

    if (fulfilled) {
        links.push({to: '/representative/donation-posts/fulfilled', label: 'Fulfilled Posts'});
    }

    const title = fulfilled === true ? 'Fulfilled Donation Posts' :
        fulfilled == undefined ? 'Donation Posts' : 'Unfulfilled Donation Posts';
    return (
        <div className="container">
            <BreadCrumb links={links}/>
            <h1>{title}</h1>
            <div className="text-end mb-2">
                {fulfilled !== undefined && <NavLink to="/representative/donation-posts" className="btn btn-secondary ms-2">View All</NavLink>}
                {fulfilled !== true && <NavLink to="/representative/donation-posts/fulfilled" className="btn btn-secondary ms-2">View Fulfilled</NavLink>}
                {fulfilled !== false && <NavLink to="/representative/donation-posts/unfulfilled" className="btn btn-secondary ms-2">View Unfulfilled</NavLink>}

                <NavLink to="/representative/donation-posts/new" className="btn btn-primary ms-2">Add new donation
                    post</NavLink>
            </div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Category</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {posts.map((post) => (
                    <tr key={post.id}>
                        <td>{post.id}</td>
                        <td>{post.category}</td>
                        <td>{post.title}</td>
                        <td className={post.fulfilled ? 'text-success' : 'text-danger'}><strong>{post.fulfilled ? 'Fulfilled' : 'Not Fulfilled'}</strong></td>
                        <td>
                            <NavLink className="btn btn-secondary mr-2 mx-1"
                                     to={`/representative/donation-posts/${post.id}`}>Details</NavLink>
                            <NavLink className="btn btn-secondary mr-2 mx-1"
                                     to={`/representative/donation-posts/${post.id}/update`}>Update</NavLink>
                            <NavLink className="btn btn-secondary mx-1" to={`/representative/donation-posts/${post.id}/donors`}> View Donors</NavLink>
                            {post.fulfilled && <DeleteButton onConfirm={() => deletePost(post.id)}/>}

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default DonationPosts;