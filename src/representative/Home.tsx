import {useNavigate} from "react-router-dom";


function Home(){
    const navigate = useNavigate();
    const handleDropOff = () => {
        navigate('/scheduledropoff');
    }
    const handlePost = () => {
        navigate('/donationpost');
    }

    const handleView = () => {
        navigate('/donationposts');
    }
    return <>
        <h1 className="text-center">Organization Representative home</h1>
        <div className="container">
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

    </>
}

export default Home;