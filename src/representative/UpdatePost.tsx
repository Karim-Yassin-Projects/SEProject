import React, { useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import {donors } from "./donor.ts";

function UpdatePost() {
    const {postId} = useParams();

    if (!postId) {
        return <div>Missing post Id</div>
    }

    const postIdNum = parseInt(postId);


    const post = donors.find(p => p.postId === postIdNum);
    if (!post) {
        return <div>Post not found</div>
    }
    const [title, setTitle] = useState(post.postName);
    const [fulfilled, setFulfilled] = useState(post.postStatus === 'Fulfilled');
    const [details, setDetails] = useState(post.details ?? '');
    const [isUpdated, setIsUpdated] = useState(false);
    if (!postIdNum) {
        return <div>Missing post Id</div>
    }
    const handleTitleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setTitle(event.target.value);
    };

    const handleFulfilledChange = (event: { target: { checked: React.SetStateAction<boolean>; }; }) => {
        setFulfilled(event.target.checked);
    };

    const handleDetailsChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setDetails(event.target.value);
    };

    const handleSubmit = () => {
        setTitle("");
        setFulfilled(false);
        setDetails("");
        setIsUpdated(true);
    };

    return (
        <div className="container">
            <h1>Update Post</h1>
            {!isUpdated ? (
                <form>
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input type="text" className="form-control" value={title} onChange={handleTitleChange} readOnly={true} />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" checked={fulfilled} onChange={handleFulfilledChange} />
                        <label className="form-check-label">Fulfilled</label>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Details</label>
                        <textarea className="form-control" value={details} onChange={handleDetailsChange}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Update</button>
                </form>
            ) : (
                <div className="alert alert-info">Post Updated Successfully.  {title}
                    <Link to="/representative" className="link-blue">Back to Home</Link>
                </div>
            )}
        </div>
    );
}

export default UpdatePost;