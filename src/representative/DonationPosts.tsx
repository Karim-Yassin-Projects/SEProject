import { useState} from 'react';
import {NavLink} from "react-router-dom";
import DeleteButton from "../common/DeleteButton.tsx";
import BreadCrumb from "../common/BreadCrumb.tsx";
import {allPosts} from "./posts.ts";

function DonationPosts() {
    const [posts, setPosts] = useState(allPosts);

    const deletePost = (id: number) => {
        setPosts(posts.filter((post) => post.id !== id));
    };

    const links = [
        {to: '/', label: 'Home'},
        {to: '/representative', label: 'Representative Dashboard'},
        {to: '/representative/donation-posts', label: 'Donation Posts'}
    ];

    return (
        <div className="container">
            <BreadCrumb links={links}/>
            <h1>Donation Posts</h1>
            <div className="text-end">
                <NavLink to="/representative/donation-post" className="btn btn-primary mb-2 ">Add new donation
                    post</NavLink>
            </div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Category</th>
                    <th>Details</th>
                    <th>Fulfilled</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {posts.map((post) => (
                    <tr key={post.id}>
                        <td>{post.id}</td>
                        <td>{post.category}</td>
                        <td>{post.details}</td>
                        <td>{post.fulfilled ? 'Yes' : 'No'}</td>
                        <td>
                            <NavLink className="btn btn-primary mr-2 mx-1"
                                     to={`/representative/update-post/${post.id}`}>Update</NavLink>
                            <button className="btn btn-secondary mx-1"> View Donors</button>
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