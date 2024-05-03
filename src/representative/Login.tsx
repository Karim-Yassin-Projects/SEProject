import {useNavigate} from "react-router-dom";
import {Formik} from "formik";
import FormField from "../common/FormField.tsx";
import {LoginRequest, loginSchema} from "./login.ts";

function Login() {
    const navigate = useNavigate();
    const initialValues: LoginRequest = {username: '', password: ''};
    const handleSubmit = async () => {
        navigate('/representativehome')
    }

    function handleRegistration() {
        navigate('/representativeregister');
    }

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={loginSchema}>
            {
                (formik) => {
                    return (
                        <div className="container">
                            <h1>Login</h1>
                            <div className="col-md-6">
                                <FormField formik={formik} name="username" schema={loginSchema}/>
                                <FormField formik={formik} name="password" schema={loginSchema}/>
                                <div className="form-group form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                    <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                                </div>
                                <div className="form-group mt-2">
                                    <button type="submit" className="btn btn-primary" onClick={formik.submitForm}>Log in</button>
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