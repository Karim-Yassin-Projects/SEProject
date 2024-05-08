import {useNavigate} from "react-router-dom";
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
    const handlePost = () => {
        navigate('/representative/donation-post');
    }

    const handleView = () => {
        navigate('/representative/donation-posts');
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
            <button className="btn btn-primary" onClick={handlePost}> Create Donation Post</button>
        </div>
        <div className="container">
            <p className="text-black">View Donation Posts</p>
            <button className="btn btn-primary" onClick={handleView}> View</button>
        </div>
        <ToastContainer/>
    </>
}

export default Home;