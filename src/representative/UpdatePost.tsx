import {useState} from 'react';
import { useParams} from 'react-router-dom';
import BreadCrumb from "../common/BreadCrumb.tsx";
import { newPostSchema, PostCategories, UpdatePostRequest, updatePostSchema} from "./posts.ts";
import FormField from "../common/FormField.tsx";
import {Formik} from "formik";
import {getPostsForDefaultOrganization, Post} from "../common/posts.ts";

interface PostFormProps {
    post: Post
}

function PostForm({post}: PostFormProps) {
    const initialValues: UpdatePostRequest = {
        category: post.category,
        details: post.details,
        fulfilled: post.fulfilled,
        title: post.title,

    };
    const [isSubmitted, setIsSubmitted] = useState(false);


    const handleSubmit = () => {
        setIsSubmitted(true);
    };

    const links = [
        {to: '/', label: 'Home'},
        {to: '/representative', label: 'Representative Dashboard'},
        {to: '/representative/posts', label: 'Donation Posts'},
        {to: `/representative/posts/${post.id}`, label: `${post.title}` },
        {to: `/representative/posts/${post.id}/update`, label: 'Update'}
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
                                <p className="small">The marker <span className="text-danger">*</span> denotes a
                                    required field.</p>
                                <FormField formik={formik} name="category" schema={updatePostSchema}
                                           options={PostCategories}/>
                                <FormField formik={formik} name="title" schema={updatePostSchema}/>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input"
                                           checked={formik.values.fulfilled}
                                           onChange={() => formik.setFieldValue('fulfilled', !formik.values.fulfilled)}/>
                                    <label className="form-check-label">Fulfilled</label>
                                </div>
                                <FormField formik={formik} name="details" schema={updatePostSchema}/>
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

    const post = getPostsForDefaultOrganization().find(p => p.id === postIdNum);
    if (!post) {
        return <div>Post not found</div>
    }

    return <PostForm post={post}/>;
}

export default UpdatePost;