import {Link} from "react-router-dom";

function RegisterThanks() {
    return <>
        <div className="container">

            <h1 className="text-center">Registration Successful</h1>
            <div className="alert alert-success text-center success-box my-4">

                <i className="text-success bi bi-check-lg"></i>
                Thank you for registering. We will review your application and get back to you soon.

            </div>
            <Link to="/representative/login">Go to login page</Link>
        </div>
    </>
}

export default RegisterThanks