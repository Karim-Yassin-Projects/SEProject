import {useEffect, useState} from 'react';
import {Formik, FormikProps} from "formik";
import {PostRequest, postSchema } from "./posts.ts";
import FormField from "../common/FormField.tsx";
import BreadCrumb from "../common/BreadCrumb.tsx";
import ClothesForm from "../common/ClothesForm.tsx";
import BloodDonationForm from "../common/BloodDonationsForm.tsx";
import MedicalSuppliesForm from "../common/MedicalSuppliesForm.tsx";
import SchoolSuppliesForm from "../common/SchoolSuppliesForm.tsx";
import ToysForm from "../common/ToysForm.tsx";
import FoodForm from "../common/FoodForm.tsx";
import {Organizations} from "../common/organizations.ts";
import {Post, PostCategories} from "../common/posts.ts";
import TeachingForm from "../common/TeachingForm.tsx";
import MedicalCasesForm from "../common/MedicalCasesForm.tsx";

const fieldNames = ['clothes', 'bloodDonation', 'medicalSupplies', 'schoolSupplies', 'toys', 'food', 'teaching', 'medicalCase'];
const categoryFields: Record<string, string> = {
    'Clothes': 'clothes',
    'Blood Donations': 'bloodDonation',
    'Medical Supplies': 'medicalSupplies',
    'School Supplies': 'schoolSupplies',
    'Toys': 'toys',
    'Food': 'food',
    'Teaching Cases': 'teaching',
    'Medical Cases': 'medicalCase',
}

function getDefaultValues(): PostRequest {
    return {
        category: '',
        details: '',
        title: '',
        clothes: {
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
        teaching: {
            search: false,
            subject: '',
            numberOfStudents: '',
            governorate: Organizations[0].governorate,
            area: Organizations[0].area,
        },
        medicalCase: {
            search: false,
            specialization: '',
            patientName: '',
            patientAge: '',
            patientGender: '',
            patientWeight: '',
            caseDescription: '',
            governorate: Organizations[0].governorate,
            area: Organizations[0].area,
            organizationName: Organizations[0].name,
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

function InnerForm({formik, isSubmitted, update, post}: {
    formik: FormikProps<PostRequest>,
    isSubmitted: boolean,
    update: boolean,
    post?: undefined | Post
}) {
    const category = formik.values.category;

    useEffect(() => {
        async function updatePost() {
            const field = categoryFields[category];
            for (const fieldName of fieldNames) {
                const values = (formik.values as Record<string, unknown>)[fieldName];
                if (field === fieldName) {
                    if (values) continue;
                    await formik.setFieldValue(fieldName, (getDefaultValues() as Record<string, unknown>)[fieldName]);
                } else {
                    if (!values) continue;
                    await formik.setFieldValue(fieldName, null);
                }
            }
        }
        updatePost().catch(console.error);
    }, [category, formik]);


    const links = post ? [
        {to: '/', label: 'Home'},
        {to: '/representative', label: 'Representative Dashboard'},
        {to: '/representative/posts', label: 'Donation Posts'},
        {to: `/representative/posts/${post.id}`, label: `${post.title}` },
        {to: `/representative/posts/${post.id}/update`, label: 'Update'}
    ] : [
        {to: '/', label: 'Home'},
        {to: '/representative', label: 'Organization Representative'},
        {to: '/representative/posts', label: 'Donation Posts'},
        {to: '/representative/donation-post', label: 'Create Donation Post'}
    ]

    return (
        <div className="container">
            <BreadCrumb links={links}/>
            <h1>Create Donation Post</h1>
            {!isSubmitted &&
                <>
                    <p className="small">The marker <span className="text-danger">*</span> denotes a required field.</p>
                    {update ?
                        <div className="form-group row my-2">
                            <label className="col-md-2">Category</label>
                            <div className="col-md-10"><strong>{category}</strong></div>
                        </div>
                        :
                        <FormField formik={formik} name="category" schema={postSchema}
                                   options={PostCategories}/>}
                    <FormField formik={formik} name="title" schema={postSchema}/>
                    <FormField formik={formik} name="details" schema={postSchema}/>
                    {update && <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input"
                               checked={formik.values.fulfilled}
                               onChange={() => formik.setFieldValue('fulfilled', !formik.values.fulfilled)}/>
                        <label className="form-check-label">Fulfilled</label>
                    </div>}
                    {formik.values.category === 'Clothes' &&
                        <ClothesForm name="clothes" formik={formik} schema={postSchema}/>}
                    {formik.values.category === 'Blood Donations' &&
                        <BloodDonationForm formik={formik} schema={postSchema} name="bloodDonation"/>}
                    {formik.values.category === 'Medical Supplies' &&
                        <MedicalSuppliesForm formik={formik} schema={postSchema} name="medicalSupplies"/>}
                    {formik.values.category === 'School Supplies' &&
                        <SchoolSuppliesForm formik={formik} schema={postSchema} name="schoolSupplies"/>}
                    {formik.values.category === 'Toys' && <ToysForm formik={formik} schema={postSchema} name="toys"/>}
                    {formik.values.category === 'Food' && <FoodForm formik={formik} schema={postSchema} name="food"/>}
                    {formik.values.category === 'Teaching Cases' && <TeachingForm formik={formik} schema={postSchema} name="teaching"/>}
                    {formik.values.category === 'Medical Cases' && <MedicalCasesForm formik={formik} schema={postSchema} name="medicalCase"/>}
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
    );

}

function PostForm({post}: { post?: Post }) {
    if (post) {
        post = {
            ...post,
            donations: [],
        }
        const p = post as unknown as Record<string, unknown>;
        for (const field of fieldNames) {
            if (!p[field]) {
                p[field] = null;
            }
        }
    }
    const initialValues = post ? post : getDefaultValues();
    const update = !!post;
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleSubmit = () => {
        setIsSubmitted(true);
    }
    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={postSchema}>
            {
                (formik) => <InnerForm formik={formik} isSubmitted={isSubmitted} update={update} post={post}/>
            }
        </Formik>
    );
}

export default PostForm;