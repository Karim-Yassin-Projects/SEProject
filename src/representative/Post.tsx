import {useState} from 'react';
import {Formik} from "formik";
import {CreatePostRequest, newPostSchema, PostCategories} from "./posts.ts";
import FormField from "../common/FormField.tsx";
import {NavLink} from "react-router-dom";

function Post() {
    const initialValues: CreatePostRequest = {category: '', details: ''};
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = () => {

        setIsSubmitted(true);
    }

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={newPostSchema}>
            {
                (formik) => {
                    return <div className="container">
                        <h1>Create Donation Post</h1>
                        {!isSubmitted &&
                            <>
                                <FormField formik={formik} name="category" schema={newPostSchema}
                                           options={PostCategories}/>
                                {formik.values.category &&
                                    <FormField formik={formik} name="details" schema={newPostSchema}/>}
                                {formik.values.category && <div className="form-group mt-2">
                                    <button type="submit" className="btn btn-primary" onClick={formik.submitForm}>Create
                                        Post
                                    </button>
                                </div>}
                            </>
                        }
                        {isSubmitted &&
                            <div className="alert alert-info my-3">Donation Post created
                                Successfully for category "{formik.values.category}". </div>}

                        <div className="mt-3">
                            <NavLink className="btn btn-secondary" onClick={formik.submitForm} to="/representative">Back
                                to home</NavLink>
                        </div>
                    </div>
                }
            }
        </Formik>


    );
}

export default Post;