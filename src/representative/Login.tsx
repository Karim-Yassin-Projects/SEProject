import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {representatives} from "../representative/OrganizationRepresentative";


function Login(){
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try{
            const representative = representatives.find((representative: { username: string; password: string; }) => representative.username === username && representative.password === password);
            if(representative) {
                navigate('/representative');
            }
            else {
                alert('Invalid username or password');
                return;
            }
        }
        catch (error){
            alert('An error occurred');
        }


    }

    function handleRegistration() {
        navigate('/representativeregister');
    }

    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputUsername1">Username</label>
                    <input type="text" className="form-control" id="exampleInputUsername1" aria-describedby="usernameHelp" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                </div>
                <button type="submit" className="btn btn-primary">Log in</button>
                <button type="button" className="btn btn-secondary" onClick={handleRegistration}>Don't have an account? Register</button>
            </form>
        </div>
    );
}

export default Login;