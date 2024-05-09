import {RouteObject} from "react-router-dom";
import Home from "./Home.tsx";
import RepresentativeRegistration from "./Register.tsx";
import Login from "./Login.tsx";
import DonationPosts from "./DonationPosts.tsx";
import NewDonationPost from "./NewDonationPost.tsx";
import UpdatePost from "./UpdatePost.tsx";
import Schedule from "./Schedule.tsx";
import RegisterThanks from "./RegisterThanks.tsx";
import Donors from "./Donors.tsx";
import DonorDetails from "./DonorDetails.tsx";
import DonationPost from "./DonationPost.tsx";

export const routes: RouteObject[] = [
    {path: '', element: <Home/>},
    {path: 'register', element: <RepresentativeRegistration/>},
    {path: 'login', element: <Login/>},
    {path: 'donation-posts', element: <DonationPosts/>},
    {path: 'donation-posts/fulfilled', element: <DonationPosts fulfilled={true}/>},
    {path: 'donation-posts/unfulfilled', element: <DonationPosts fulfilled={false}/>},
    {path: 'donation-posts/new', element: <NewDonationPost/>},
    {path: 'donation-posts/donors', element: <Donors/>},
    {path: 'donation-posts/:postId/update', element: <UpdatePost/>},
    {path: 'donation-posts/:postId', element: <DonationPost/>},
    {path: 'donation-posts/:postIdOrStatus/donors', element: <Donors/>},
    {path: 'donation-posts/:postId/donors/:donorId', element: <DonorDetails/>},
    {path: 'notifications', element: <Donors/>},
    {path: 'schedule-drop-off', element: <Schedule/>},
    {path: 'register-thanks', element: <RegisterThanks/>},
    // Add more routes here
];