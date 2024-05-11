import {useEffect, useState} from 'react';
import {Formik} from "formik";
import {PostRequest, postSchema, PostCategories} from "./posts.ts";
import FormField from "../common/FormField.tsx";
import BreadCrumb from "../common/BreadCrumb.tsx";
import ClothesForm from "../common/ClothesForm.tsx";
import BloodDonationForm from "../common/BloodDonationsForm.tsx";
import MedicalSuppliesForm from "../common/MedicalSuppliesForm.tsx";
import SchoolSuppliesForm from "../common/SchoolSuppliesForm.tsx";
import ToysForm from "../common/ToysForm.tsx";
import FoodForm from "../common/FoodForm.tsx";
import {Organizations} from "../common/organizations.ts";

const fieldNames = ['cloths', 'bloodDonation', 'medicalSupplies', 'schoolSupplies', 'toys', 'food'];
const categoryFields: Record<string, string> = {
    'Clothes': 'cloths',
    'Blood Donations': 'bloodDonation',
    'Medical Supplies': 'medicalSupplies',
    'School Supplies': 'schoolSupplies',
    'Toys': 'toys',
    'Food': 'food',
}

function getDefaultValues(): PostRequest {
    return {
        category: '',
        details: '',
        title: '',
        cloths: {
            search: false,
            quantity: '',
            type: '',
            material: '',
            gender: '',
            ageRange: '',
            season: '',
        },
        bloodDonation: {
            search: false,
            type: '',
            patientName: '',
            hospitalName: Organizations[0].name,
            governorate: Organizations[0].governorate,
            area: Organizations[0].area,
        },
        medicalSupplies: {
            search: false,
            quantity: '',
            category: '',
            medicationType: '',
            use: '',
            document: '',
            documentSize: 1,
            documentType: '',
        },
        schoolSupplies: {
            search: false,
            quantity: '',
            type: '',
        },
        toys: {
            search: false,
            quantity: '',
            category: '',
            ageRange: '',
            toyGender: '',
            toyType: '',
            document: '',
            documentSize: 1,
            documentType: ''
        },
        food: {
            search: false,
            category: '',
            quantity: '',
            weight: '',
        },
        fulfilled: false
    };
}

// function getInitialValues(): PostRequest {
//     const res: PostRequest = getDefaultValues();
//     for (const field of fieldNames) {
//         (res as any)[field] = undefined;
//     }
//     return res;
// }

function PostForm() {
    const initialValues: PostRequest = getDefaultValues();

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = () => {
        setIsSubmitted(true);
    }

    const links = [
        {to: '/', label: 'Home'},
        {to: '/representative', label: 'Organization Representative'},
        {to: '/representative/posts', label: 'Donation Posts'},
        {to: '/representative/donation-post', label: 'Create Donation Post'}
    ]



    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={postSchema}>
            {
                (formik) => {
                    useEffect(() => {
                        async function updatePost() {
                            const category = formik.values.category;
                            const field = categoryFields[category];
                            for (const fieldName of fieldNames) {
                                const values = (formik.values as any)[fieldName];
                                if (field === fieldName) {
                                    if (values) continue;
                                    await formik.setFieldValue(fieldName, (getDefaultValues() as any)[fieldName]);
                                } else {
                                    if (!values) continue;
                                    await formik.setFieldValue(fieldName, null);
                                }
                            }
                        }

                        updatePost().catch(console.error);
                    }, [formik.values.category]);
                    return <div className="container">
                        <BreadCrumb links={links}/>
                        <h1>Create Donation Post</h1>
                        {!isSubmitted &&
                            <>
                                <p className="small">The marker <span className="text-danger">*</span> denotes a required field.</p>
                                <FormField formik={formik} name="category" schema={postSchema}
                                           options={PostCategories}/>
                                <FormField formik={formik} name="title" schema={postSchema}/>
                                <FormField formik={formik} name="details" schema={postSchema}/>
                                { formik.values.category === 'Clothes' && <ClothesForm name="cloths" formik={formik} schema={postSchema}/> }
                                { formik.values.category === 'Blood Donations' && <BloodDonationForm formik={formik} schema={postSchema} name="bloodDonation" /> }
                                { formik.values.category === 'Medical Supplies' && <MedicalSuppliesForm formik={formik} schema={postSchema} name="medicalSupplies" /> }
                                { formik.values.category === 'School Supplies' && <SchoolSuppliesForm formik={formik} schema={postSchema} name="schoolSupplies" /> }
                                { formik.values.category === 'Toys' && <ToysForm formik={formik} schema={postSchema} name="toys" /> }
                                { formik.values.category === 'Food' && <FoodForm formik={formik} schema={postSchema} name="food" /> }
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
                    </div>

                }
            }
        </Formik>


    );
}

export default PostForm;