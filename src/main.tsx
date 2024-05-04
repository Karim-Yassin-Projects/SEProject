import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import AdminHome from './admin/Home.tsx'
import DonorHome from './donor/Home.tsx'
import RepresentativeHome from './representative/Home.tsx'
import AppLayout from "./AppLayout.tsx";
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons';
import Dashboard from "./admin/Dashboard.tsx";
import OrganizationSubmissions from "./admin/OrganizationSubmissions.tsx";
import DonorSubmissions from "./admin/DonorSubmissions.tsx";
import ChangePassword from "./admin/ChangePassword.tsx";
import Login from "./representative/Login.tsx";
import RepresentativeRegistration from "./representative/Register.tsx";
import Location from "./representative/Location.tsx";
import Schedule from "./representative/Schedule.tsx";
import DonationPost from "./representative/Post.tsx";
import DonationPosts from "./representative/DonationPosts.tsx";
import UpdatePost from "./representative/UpdatePost.tsx";
import Notifications from "./representative/Notifications.tsx";


const routes = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout/>,
        children:[
            {path: '/', element: <App/>},
            {path: '/adminlogin', element: <AdminHome/>},
            {path: '/donor', element: <DonorHome/>},
            {path: '/representativehome', element: <RepresentativeHome/>},
            {path: '/dashboard', element: <Dashboard/>},
            {path: '/organizationsubmissions', element: <OrganizationSubmissions/>},
            {path: '/donorsubmissions', element: <DonorSubmissions/>},
            {path: '/changepassword',element: <ChangePassword/>},
            {path: '/representativeregister', element: <RepresentativeRegistration/>},
            {path: '/representativelogin', element: <Login/>},
            {path: '/location', element: <Location/>},
            {path: 'scheduledropoff', element: <Schedule/>},
            {path: '/donationpost', element: <DonationPost/>},
            {path: 'donationposts', element: <DonationPosts/>},
            {path: `/representative/update-post/:postId`, element: <UpdatePost/>},
            {path: '/notifications', element: <Notifications/>},
        ]
    },

]);
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={routes}></RouterProvider>
    </React.StrictMode>,
)