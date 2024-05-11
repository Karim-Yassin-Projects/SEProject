import {CreateDonationRequest, newDonationSchema} from "./donations.ts";
import {useState} from "react";
import {Formik} from "formik";
import FormField from "../common/FormField.tsx";
import {NavLink} from "react-router-dom";
import {PostCategories} from "../common/posts.ts";

function CreateDonation() {
    const initialValues: CreateDonationRequest = {category: '', title: '', details: '', quantity: 0};
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = () => {
        setIsSubmitted(true);
    }
    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={newDonationSchema}>
            {
                (formik) => {
                    return <div className="container">

                        <h1>Create Donation</h1>
                        {!isSubmitted &&
                            <>
                                <FormField formik={formik} name="category" schema={newDonationSchema}
                                           options={PostCategories}/>
                                <FormField formik={formik} name="title" schema={newDonationSchema}/>
                                <FormField formik={formik} name="quantity" schema={newDonationSchema}/>
                                <FormField formik={formik} name="details" schema={newDonationSchema}/>
                                <div className="form-group mt-2">
                                    <button type="submit" className="btn btn-primary" onClick={formik.submitForm}>Create
                                        Donation
                                    </button>
                                </div>
                            </>
                        }
                        {isSubmitted &&
                            <div className="alert alert-success my-3 success-box">
                                <i className="bi bi-check"></i>
                                Donation with category "{formik.values.category}"
                                has been successfully created.
                            </div>}

                        <div className="mt-3">
                            <NavLink className="btn btn-secondary" to="/donor">Back
                                to Dashboard</NavLink>
                        </div>
                    </div>
                }
            }
        </Formik>


    );
}
export default CreateDonation;