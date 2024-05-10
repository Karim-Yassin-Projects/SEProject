import {RouteObject} from "react-router-dom";
import Home from "./Home.tsx";
import RepresentativeRegistration from "./Register.tsx";
import Login from "./Login.tsx";
import Posts from "./Posts.tsx";
import PostForm from "./PostForm.tsx";
import UpdatePost from "./UpdatePost.tsx";
import RegisterThanks from "./RegisterThanks.tsx";
import Donations from "./Donations.tsx";
import DonationDetails from "./DonationDetails.tsx";
import PostDetails from "./PostDetails.tsx";
import ChangePassword from "./ChangePassword.tsx";
import Register from "./Register.tsx";

export const routes: RouteObject[] = [
    {path: '', element: <Home/>},
    {path: 'register', element: <RepresentativeRegistration/>},
    {path: 'login', element: <Login/>},
    {path: 'posts', element: <Posts/>},
    {path: 'posts/fulfilled', element: <Posts fulfilled={true}/>},
    {path: 'posts/unfulfilled', element: <Posts fulfilled={false}/>},
    {path: 'posts/new', element: <PostForm/>},
    {path: 'posts/donations', element: <Donations/>},
    {path: 'posts/:postId/update', element: <UpdatePost/>},
    {path: 'posts/:postId', element: <PostDetails/>},
    {path: 'posts/:postIdOrStatus/donations', element: <Donations/>},
    {path: 'posts/:postId/donations/:donationId', element: <DonationDetails/>},
    {path: 'notifications', element: <Donations/>},
    {path: 'register-thanks', element: <RegisterThanks/>},
    {path: 'change-password', element: <ChangePassword />},
    {path: 'update-organization', element: <Register update={true}/>},
    // Add more routes here
];