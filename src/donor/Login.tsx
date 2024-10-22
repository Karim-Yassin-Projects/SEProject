import {useNavigate} from "react-router-dom";
import {Formik, FormikHelpers} from "formik";
import FormField from "../common/FormField.tsx";
import {login, LoginRequest, loginSchema} from "./login.ts";
import {useCallback, useState} from "react";

function Login() {
    const navigate = useNavigate();
    const initialValues: LoginRequest = {email: '', password: ''};
    const [badLogin, setBadLogin] = useState(false);
    const handleSubmit = useCallback(async (values: LoginRequest, helpers: FormikHelpers<LoginRequest>) => {
        if (!login(values.email, values.password)) {
            await helpers.setFieldValue('password', '');
            await helpers.setFieldTouched('password', false);
            setBadLogin(true);
            return;
        }
        navigate('/donor')
    }, [setBadLogin, navigate]);

    const handleRegistration = useCallback(() => navigate('/donor/register'), [navigate]);

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={loginSchema}>
            {
                (formik) => {
                    return (
                        <div className="container">
                            <h1>Login</h1>
                            <div className="col-md-6">
                                <p className="small">The marker <span className="text-danger">*</span> denotes a
                                    required field.</p>
                                <FormField formik={formik} name="email" schema={loginSchema}/>
                                <FormField formik={formik} name="password" schema={loginSchema}/>
                                {badLogin && <div className="text-danger small">Invalid username or password</div>}
                                <div className="form-group form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                    <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                                </div>
                                <div className="form-group mt-2">
                                    <button type="submit" className="btn btn-primary" onClick={formik.submitForm}>Log
                                        in
                                    </button>
                                    <button type="button" className="btn btn-secondary mx-2"
                                            onClick={handleRegistration}>Don't
                                        have an account? Register
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

export default Login;