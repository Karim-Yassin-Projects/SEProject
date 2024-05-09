import {useNavigate, useParams} from "react-router-dom";
import {allPosts} from "./posts.ts";
import BreadCrumb from "../common/BreadCrumb.tsx";
import DeleteButton from "../common/DeleteButton.tsx";

function DonationPost() {
    const {postId} = useParams();
    const navigate = useNavigate();

    if (!postId) {
        return <div>Missing post Id</div>
    }

    const postIdNum = parseInt(postId);
    if (!postIdNum) {
        return <div>Invalid post Id</div>
    }

    const post = allPosts.find(p => p.id === postIdNum);
    if (!post) {
        return <div>Post not found</div>
    }

    const links = [
        {to: '/', label: 'Home'},
        {to: '/representative', label: 'Representative Dashboard'},
        {to: '/representative/donation-posts', label: 'Donation Posts'},
        {to: `/representative/donation-posts/${post.id}`, label: `${post.title}`}
    ]

    return (
        <div className="container">
            <BreadCrumb links={links}/>
            <h1>Donation Post</h1>
            <div className="card mt-4">
                <div className="card-header">
                    <h5 className="card-title">{post.title}</h5>
                </div>
                <div className="card-body">
                    <div className="card-text">
                        <p><strong>Status</strong>: <strong className={post.fulfilled ? 'text-success' : 'text-danger'}>{post.fulfilled ? 'Fulfilled' : 'Not fulfilled'}</strong></p>

                        {post.details.split('\n').map((line, index) => (
                            <span key={index}>
                                {line}
                                <br/>
                            </span>
                        ))}
                    </div>

                    <div className="mt-2">
                        <a href={`/representative/donation-posts/${post.id}/update`}
                           className="btn btn-secondary me-2">Update</a>
                        <a href={`/representative/donation-posts/${post.id}/donors`} className="btn btn-secondary me-2">View
                            Donors</a>
                        {post.fulfilled && <span className="me-2"><DeleteButton onConfirm={() => navigate('/representative/donation-posts')} /></span> }
                    </div>
                </div>
            </div>
        </div>
    );

}

export default DonationPost;