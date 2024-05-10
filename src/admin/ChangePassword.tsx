import {Formik} from "formik";
import {ChangePasswordRequest, changePasswordSchema } from "./login.ts";
import FormField from "../common/FormField.tsx";
import {NavLink} from "react-router-dom";
import {useState} from "react";
import BreadCrumb from "../common/BreadCrumb.tsx";

function ChangePassword() {
    const initialValues: ChangePasswordRequest = {oldPassword: '', newPassword: '', confirmPassword: ''};
    const [badLogin, setBadLogin] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const handleSubmit = async (values: ChangePasswordRequest) => {
        if (values.oldPassword !== 'admin') {
            setBadLogin(true);
            return;
        }
        setPasswordChanged(true);
    }

    const links = [
        {to: '/', label: 'Home'},
        {to: '/Dashboard', label: 'Dashboard'},
        {to: '/ChangePassword', label: 'Change Password'},
    ];
    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={changePasswordSchema}>
            {
                (formik) => {
                    return (
                        <div className="container">
                            <BreadCrumb links={links}/>
                            <h1>Change Password</h1>
                            {!passwordChanged && <div className="col-md-10">
                                <FormField formik={formik} name="oldPassword" schema={changePasswordSchema}/>
                                {badLogin && <div className="text-danger small">Old password is incorrect</div>}
                                <FormField formik={formik} name="newPassword" schema={changePasswordSchema}/>
                                <FormField formik={formik} name="confirmPassword" schema={changePasswordSchema}/>
                                <div className="form-group mt-2">
                                    <button type="submit" className="btn btn-primary" onClick={formik.submitForm}>Change
                                        Password
                                    </button>
                                    <NavLink type="button" className="btn btn-secondary mx-2"
                                             to="/representative">Cancel
                                    </NavLink>
                                </div>
                            </div> }
                            {passwordChanged && <div className="alert alert-success success-box my-3">
                                <i className="bi bi-check"></i>
                                Password changed successfully
                            </div>}
                        </div>
                    )
                }
            }
        </Formik>
    )
}

export default ChangePassword;