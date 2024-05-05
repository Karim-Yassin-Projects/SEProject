import {RouteObject} from "react-router-dom";
import Home from "./Home.tsx";
import RepresentativeRegistration from "./Register.tsx";
import Login from "./Login.tsx";
import DonationPosts from "./DonationPosts.tsx";
import DonationPost from "./Post.tsx";
import Notifications from "./Notifications.tsx";
import UpdatePost from "./UpdatePost.tsx";
import Schedule from "./Schedule.tsx";

export const routes: RouteObject[] = [
    {path: '', element: <Home/>},
    {path: 'register', element: <RepresentativeRegistration/>},
    {path: 'login', element: <Login/>},
    {path: 'donation-posts', element: <DonationPosts/>},
    {path: 'donation-post', element: <DonationPost />},
    {path: 'notifications', element: <Notifications />},
    {path: `update-post/:postId`, element: <UpdatePost/>},
    {path: 'schedule-drop-off', element: <Schedule/>},


    // Add more routes here
];