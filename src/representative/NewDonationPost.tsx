import {useState} from 'react';
import {Formik} from "formik";
import {CreatePostRequest, newPostSchema, PostCategories} from "./posts.ts";
import FormField from "../common/FormField.tsx";
import {NavLink} from "react-router-dom";
import BreadCrumb from "../common/BreadCrumb.tsx";

function NewDonationPost() {
    const initialValues: CreatePostRequest = {category: '', details: '', title: ''};
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = () => {
        setIsSubmitted(true);
    }

    const links = [
        {to: '/', label: 'Home'},
        {to: '/representative', label: 'Organization Representative'},
        {to: '/representative/donation-posts', label: 'Donation Posts'},
        {to: '/representative/donation-post', label: 'Create Donation Post'}
    ]

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={newPostSchema}>
            {
                (formik) => {
                    return <div className="container">
                        <BreadCrumb links={links}/>
                        <h1>Create Donation Post</h1>
                        {!isSubmitted &&
                            <>
                                <FormField formik={formik} name="category" schema={newPostSchema}
                                           options={PostCategories}/>
                                <FormField formik={formik} name="title" schema={newPostSchema}/>
                                <FormField formik={formik} name="details" schema={newPostSchema}/>
                                <div className="form-group mt-2">
                                    <button type="submit" className="btn btn-primary" onClick={formik.submitForm}>Create
                                        Post
                                    </button>
                                </div>
                            </>
                        }
                        {isSubmitted &&
                            <div className="alert alert-success my-3 success-box">
                                <i className="bi bi-check"></i>
                                Donation post with category "{formik.values.category}"
                                has been successfully submitted
                                for approval.
                            </div>}

                        <div className="mt-3">
                            <NavLink className="btn btn-secondary" to="/representative">Back
                                to Dashboard</NavLink>
                        </div>
                    </div>
                }
            }
        </Formik>


    );
}

export default NewDonationPost;