import BreadCrumb from "../common/BreadCrumb.tsx";
import {InferType, object, string} from "yup";
import {Formik} from "formik";
import FormField from "../common/FormField.tsx";
import {useState} from "react";


const contactSchema = object().shape({
    name: string().required('Name is required').label('Name'),
    email: string().email().required().label('Email'),
    message: string().required('Message is required').meta({
        textarea: true
    }).label('Message')
});

type ContactRequest = InferType<typeof contactSchema>;

function Contact() {
    const links = [
        {to: '/', label: 'Home'},
        {to: '/contact', label: 'Contact Us'},
    ];

    const [success, setSuccess] = useState(false);

    const handleSubmit = () => {
        setSuccess(true);
    }
    const initialValues: ContactRequest = {
        name: '',
        email: '',
        message: ''
    }
    return (
        <div className="container">
            <BreadCrumb links={links}/>
            <h1>Contact Us</h1>

            <div className="card my-4">
                <div className="card-header">
                    <h5>Our Contact Information</h5>
                </div>
                <div className="card-body">

                    <p className="card-text">
                        <strong>Address:</strong> Street 9, Maadi, Cairo, Egypt. P.O. 11431<br/>
                        <strong>Email:</strong> <a href="mailto:ilovemaadi@example.com">ilovemaadi@example.com</a><br/>
                        <strong>Phone:</strong> +20 101 123 4567
                    </p>
                </div>
            </div>

            {success ? <div className="alert alert-success success-box">
                <i className="bi bi-check"></i>
                Message sent successfully
            </div> : <>
                <h3>Send us a message</h3>
                <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={contactSchema}>{
                    (formik) => (
                        <>
                            <p className="small">The marker <span className="text-danger">*</span> denotes a required
                                field.</p>
                            <FormField formik={formik} name="name" schema={contactSchema}/>
                            <FormField formik={formik} name="email" schema={contactSchema}/>
                            <FormField formik={formik} name="message" schema={contactSchema}/>

                            <div className="offset-md-2 my-2">
                                <button type="submit" className="btn btn-primary" onClick={formik.submitForm}>Send
                                    message
                                </button>
                            </div>
                        </>
                    )
                }</Formik></>}
        </div>
    );
}

export default Contact;
