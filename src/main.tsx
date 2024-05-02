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
import RegisteredOrganizations from "./admin/RegisteredOrganizations.tsx";
import RegisteredDonors from "./admin/RegisteredDonors.tsx";



const routes = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout/>,
        children:[
            {path: '/', element: <App/>},
            {path: '/adminlogin', element: <AdminHome/>},
            {path: '/donor', element: <DonorHome/>},
            {path: '/representative', element: <RepresentativeHome/>},
            {path: '/dashboard', element: <Dashboard/>},
            {path: '/organizationsubmissions', element: <OrganizationSubmissions/>},
            {path: '/donorsubmissions', element: <DonorSubmissions/>},
            {path: '/changepassword',element: <ChangePassword/>},
            {path: '/registeredorganizations',element: <RegisteredOrganizations/>},
            {path: '/registereddonors',element: <RegisteredDonors/>},



        ]
    },

]);
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={routes}></RouterProvider>
    </React.StrictMode>,
)