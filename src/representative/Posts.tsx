import {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import DeleteButton from "../common/DeleteButton.tsx";
import BreadCrumb from "../common/BreadCrumb.tsx";
import {getPostsForDefaultOrganization, Post} from "../common/posts.ts";

function Posts({fulfilled }: {fulfilled?: boolean}) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [itemsPerPage,] = useState(10);
    useEffect(() => {
        let all = getPostsForDefaultOrganization();
        if (fulfilled !== undefined) {
            all = all.filter((post) => post.fulfilled === fulfilled);
        }
        setPosts(all);
        setCurrentPageIndex(0);
    }, [fulfilled, setPosts]);

    const deletePost = (id: number) => {
        setPosts(posts.filter((post) => post.id !== id));
    };

    const links = [
        {to: '/', label: 'Home'},
        {to: '/representative', label: 'Representative Dashboard'},
        {to: '/representative/posts', label: 'Donation Posts'}
    ];

    if (fulfilled) {
        links.push({to: '/representative/posts/fulfilled', label: 'Fulfilled Posts'});
    } else if (fulfilled === false) {
        links.push({to: '/representative/posts/unfulfilled', label: 'Unfulfilled Posts'});
    }

    const indexOfFirstPost = currentPageIndex * itemsPerPage;
    const indexOfLastPost = Math.min(indexOfFirstPost + itemsPerPage - 1, posts.length - 1);
    const numberOfPages = Math.ceil(posts.length / itemsPerPage);
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber: number) =>{
        if (pageNumber < 0 || pageNumber >= numberOfPages) {
            return;
        }
        setCurrentPageIndex(pageNumber)
    } ;


    const title = fulfilled === true ? 'Fulfilled Donation Posts' :
        fulfilled == undefined ? 'Donation Posts' : 'Unfulfilled Donation Posts';
    return (
        <div className="container">
            <BreadCrumb links={links}/>
            <h1>{title}</h1>
            <div className="text-end mb-2">
                {fulfilled !== undefined &&
                    <NavLink to="/representative/posts" className="btn btn-secondary ms-2">View All</NavLink>}
                {fulfilled !== true && <NavLink to="/representative/posts/fulfilled" className="btn btn-secondary ms-2">View
                    Fulfilled</NavLink>}
                {fulfilled !== false &&
                    <NavLink to="/representative/posts/unfulfilled" className="btn btn-secondary ms-2">View
                        Unfulfilled</NavLink>}

                <NavLink to="/representative/posts/new" className="btn btn-primary ms-2">Add new donation
                    post</NavLink>
            </div>
            { currentPosts.length > 0 && <table className="table table-striped">
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
                {currentPosts.map((post) => (
                    <tr key={post.id}>
                        <td>{post.id}</td>
                        <td>{post.category}</td>
                        <td>{post.title}</td>
                        <td className={post.fulfilled ? 'text-success' : 'text-danger'}>
                            <strong>{post.fulfilled ? 'Fulfilled' : 'Not Fulfilled'}</strong></td>
                        <td>
                            <NavLink className="btn btn-secondary mr-2 mx-1"
                                     to={`/representative/posts/${post.id}`}>Details</NavLink>
                            <NavLink className="btn btn-secondary mr-2 mx-1"
                                     to={`/representative/posts/${post.id}/update`}>Update</NavLink>
                            <NavLink className="btn btn-secondary mx-1"
                                     to={`/representative/posts/${post.id}/donations`}> View Donors</NavLink>
                            {post.fulfilled && <DeleteButton onConfirm={() => deletePost(post.id)}/>}

                        </td>
                    </tr>
                ))}
                </tbody>
            </table> }
            {currentPosts.length === 0 && <div className="alert alert-info my-3 text-center">
                <i className="bi bi-info-circle me-2"></i>
                No posts found
            </div>}
            {numberOfPages > 1 && <nav className="text-center" aria-label="Pagination">
                <ul className='pagination justify-content-center'>
                    <li className='page-item'><button className="page-link" onClick={() => paginate(currentPageIndex - 1)}>Previous</button></li>
                    {Array(Math.ceil(posts.length / itemsPerPage)).fill(null).map((_, index) => (
                        <li key={index} className={`page-item ${index === currentPageIndex ? 'active' : ''}`}>
                            <button onClick={() => paginate(index)} className='page-link'>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li className='page-item'><button className="page-link" onClick={() => paginate(currentPageIndex + 1)}>Next</button></li>
                </ul>
            </nav> }
        </div>
    );
}

export default Posts;