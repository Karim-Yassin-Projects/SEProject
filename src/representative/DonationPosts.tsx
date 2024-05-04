import { MouseEventHandler, useState} from 'react';
import {useNavigate} from "react-router-dom";

function DonationPosts() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([
        {id: 1, title: 'Post 1', fulfilled: true},
        {id: 2, title: 'Post 2', fulfilled: false},
    ]);

    const deletePost = (id: number) => {
        setPosts(posts.filter((post) => post.id !== id));
    };

    const handleUpdate: MouseEventHandler<HTMLButtonElement> | undefined = () => {
        navigate('/updatepost');
    }

    return (
        <div className="container">
            <h1>Donation Posts</h1>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Fulfilled</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {posts.map((post) => (
                    <tr key={post.id}>
                        <td>{post.id}</td>
                        <td>{post.title}</td>
                        <td>{post.fulfilled ? 'Yes' : 'No'}</td>
                        <td>
                            <button className="btn btn-primary mr-2 mx-1" onClick={handleUpdate}>Update</button>
                            <button className="btn btn-danger mx-1" onClick={() => deletePost(post.id)}>Delete</button>
                            <button className="btn btn-secondary mx-1"> View Donors</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default DonationPosts;