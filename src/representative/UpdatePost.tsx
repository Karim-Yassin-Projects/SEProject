import {useState} from 'react';
import { NavLink, useParams} from 'react-router-dom';
import BreadCrumb from "../common/BreadCrumb.tsx";
import {allPosts, newPostSchema, Post, PostCategories, UpdatePostRequest} from "./posts.ts";
import FormField from "../common/FormField.tsx";
import {Formik} from "formik";

interface PostFormProps {
    post: Post
}

function PostForm({post}: PostFormProps) {
    const initialValues: UpdatePostRequest = {
        category: post.category,
        details: post.details,
        fulfilled: post.fulfilled,
        title: post.title
    };
    const [isSubmitted, setIsSubmitted] = useState(false);


    const handleSubmit = () => {
        setIsSubmitted(true);
    };

    const links = [
        {to: '/', label: 'Home'},
        {to: '/representative', label: 'Representative Dashboard'},
        {to: '/representative/donation-posts', label: 'Donation Posts'},
        {to: `/representative/donation-posts/${post.id}`, label: `${post.id}` },
        {to: `/representative/donation-posts/${post.id}/update`, label: 'Update'}
    ]

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={newPostSchema}>
            {
                (formik) => {
                    return <div className="container">
                        <BreadCrumb links={links}/>
                        <h1>Update Donation Post</h1>
                        {!isSubmitted &&
                            <>
                                <FormField formik={formik} name="category" schema={newPostSchema}
                                           options={PostCategories}/>
                                <FormField formik={formik} name="title" schema={newPostSchema}/>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" checked={formik.values.fulfilled}
                                           onChange={() => formik.setFieldValue('fulfilled', !formik.values.fulfilled)}/>
                                    <label className="form-check-label">Fulfilled</label>
                                </div>
                                <FormField formik={formik} name="details" schema={newPostSchema}/>
                                <div className="form-group mt-2">
                                    <button type="submit" className="btn btn-primary" onClick={formik.submitForm}>Update
                                        Post
                                    </button>
                                </div>
                            </>
                        }
                        {isSubmitted &&
                            <div className="alert alert-success my-3 success-box">
                                <i className="bi bi-check"></i>
                                Your update has been submitted for approval.
                            </div>}
                        <div className="mt-3">
                            <NavLink className="btn btn-secondary" to="/representative">Back
                                to Dashboard</NavLink>
                        </div>
                    </div>
                }
            }
        </Formik>
    )
        ;
}

function UpdatePost() {
    const {postId} = useParams();

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

    return <PostForm post={post}/>;
}

export default UpdatePost;