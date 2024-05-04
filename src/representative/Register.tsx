import {useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {Genders, Governorates, OrganizationTypes, RegisterRequest, registerSchema} from "./register.ts";
import {Formik} from "formik";
import FormField from "../common/FormField.tsx";

function OrganizationRegistration() {

    const navigate = useNavigate();
    const initialValues: RegisterRequest = {
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        email: '',
        phoneNumber: '',
        area: '',
        organizationName: '',
        organizationType: '',
        organizationAddress: '',
        gender: '',
        governorate: ''
    };

    const handleSubmit = useCallback(() => {
        navigate('/representativehome');
    }, [navigate]);
    const handleLogin = useCallback(() => navigate('/representativelogin'), [navigate]);


    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={registerSchema}>
            {
                (formik) => {
                    return (
                        <div className="container">
                            <h1>Register</h1>
                            <div className="col-md-9">
                                <FormField formik={formik} name="firstName" schema={registerSchema}/>
                                <FormField formik={formik} name="lastName" schema={registerSchema}/>
                                <FormField formik={formik} name="gender" schema={registerSchema} options={Genders}/>
                                <FormField formik={formik} name="email" schema={registerSchema}/>
                                <FormField formik={formik} name="password" schema={registerSchema}/>
                                <FormField formik={formik} name="confirmPassword" schema={registerSchema}/>
                                <FormField formik={formik} name="phoneNumber" schema={registerSchema}/>
                                <FormField formik={formik} name="organizationName" schema={registerSchema}/>
                                <FormField formik={formik} name="organizationType" schema={registerSchema} options={OrganizationTypes}/>
                                <FormField formik={formik} name="organizationAddress" schema={registerSchema}/>
                                <FormField formik={formik} name="area" schema={registerSchema}/>
                                <FormField formik={formik} name="governorate" schema={registerSchema} options={Governorates}/>

                                <div className="form-group mt-2">
                                    <button type="submit" className="btn btn-primary" onClick={formik.submitForm}>Register
                                    </button>
                                    <button type="button" className="btn btn-secondary mx-2"
                                            onClick={handleLogin}>Already have an account? Login
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
            }
        </Formik>
    );
}

export default OrganizationRegistration;