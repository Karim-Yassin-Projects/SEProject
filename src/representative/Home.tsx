import {NavLink, useNavigate} from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useEffect} from "react";
import BreadCrumb from "../common/BreadCrumb.tsx";


function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        const intervalId = setInterval(() => {
            toast.success("You have just received a new donation.", {
                onClick: () => {
                    navigate('/representative/notifications');
                }
            });
        }, 15000);

        return () => clearInterval(intervalId);
    });
    const handleDropOff = () => {
        navigate('/representative/schedule-drop-off');
    }

    const links = [
        {to: '/', label: 'Home'},
        {to: '/representative', label: 'Representative Dashboard'},
    ]
    return <>

        <div className="container">
            <BreadCrumb links={links}/>
            <h1 className="text-center">Organization Representative Dashboard</h1>
            <p className="text-black">Schedule Donation Drop-Off</p>
            <button className="btn btn-primary" onClick={handleDropOff}> Schedule Drop-Off</button>
        </div>
        <div className="container">
            <p className="text-black">Create a donation post</p>
            <NavLink className="btn btn-primary" to="/representative/donation-posts/new"> Create Donation Post</NavLink>
        </div>
        <div className="container">
            <p className="text-black">View Donation Posts</p>
            <NavLink className="btn btn-primary" to="/representative/donation-posts">View</NavLink>
        </div>
        <ToastContainer/>
    </>
}

export default Home;