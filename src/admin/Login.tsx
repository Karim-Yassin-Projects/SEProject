import { useNavigate } from 'react-router-dom';
import { Formik, FormikHelpers } from 'formik';
import FormField from "../common/FormField.tsx";
import { login, LoginRequest, loginSchema } from "./login.ts";
import { useCallback, useState } from 'react';
import BreadCrumb from "../common/BreadCrumb.tsx"; // Import the BreadCrumb component

function Login() {
    const navigate = useNavigate();
    const initialValues: LoginRequest = {Username: '', Password: ''};
    const [badLogin, setBadLogin] = useState(false);

    // Define the breadcrumb links
    const links = [
        {to: '/', label: 'Home'},
        {to: '/adminlogin', label: 'Admin Login'}
    ];

    const handleSubmit = useCallback(async (values: LoginRequest, helpers: FormikHelpers<LoginRequest>) => {
        if (!login(values.Username, values.Password)) {
            await helpers.setFieldValue('Password', ''); // Correct field name to 'Password'
            await helpers.setFieldTouched('Password', false); // Correct field name to 'Password'
            setBadLogin(true);
            return;
        }
        navigate('/dashboard')
    }, [setBadLogin, navigate]);

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={loginSchema}>
            {
                (formik) => {
                    return (
                        <div className="container">
                            <BreadCrumb links={links}/>
                            <h1> Admin Login</h1>
                            <div className="col-md-6">
                                <FormField formik={formik} name="Username" schema={loginSchema}/>
                                <FormField formik={formik} name="Password" schema={loginSchema}/>
                                {badLogin && <div className="text-danger small">Invalid username or password</div>}
                                <div className="form-group mt-2">
                                    <button type="submit" className="btn btn-primary" onClick={formik.submitForm}>Log in</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            }
        </Formik>
    );
}

export default Login;
