import {useParams} from "react-router-dom";
import BreadCrumb from "../common/BreadCrumb.tsx";
import {getPostsByOrganization} from "../common/posts.ts";
import PostInfo from "../common/PostInfo.tsx";
import {Organizations} from "../common/organizations.ts";
import OrganizationDetails from "./OrganizationDetails.tsx";

function PostDetails() {
    const {postId} = useParams();
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


    // eslint-disable-next-line react-hooks/rules-of-hooks


    return (
        <div className="container">
            <BreadCrumb links={links}/>
            <h1>Donation Post</h1>
            <div className="card mt-4">
                <div className="card-header">
                    <h5 className="card-title">{post.title}</h5>
                </div>
                <div className="card-body">
                    <OrganizationDetails organization={post.organization} />

                    <div className="card-text">
                        <p><strong>Status</strong>: <strong className={post.fulfilled ? 'text-success' : 'text-danger'}>{post.fulfilled ? 'Fulfilled' : 'Not fulfilled'}</strong></p>
                        <PostInfo post={post} />
                        {post.details.split('\n').map((line, index) => (
                            <span key={index}>
                                {line}
                                <br/>
                            </span>
                        ))}
                    </div>
                    <button className="btn btn-primary my-2">Donate</button>
                    </div>
                </div>
            </div>
    );
}

export default PostDetails;