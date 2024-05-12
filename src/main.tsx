import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import AdminHome from './admin/Login.tsx'
import AppLayout from "./AppLayout.tsx";
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons';
import 'dayjs/locale/en-gb.js';
import Dashboard from "./admin/Dashboard.tsx";
import OrganizationSubmissions from "./admin/OrganizationSubmissions.tsx";
import DonorSubmissions from "./admin/DonorSubmissions.tsx";
import ChangePassword from "./admin/ChangePassword.tsx";
import RegisteredOrganizations from './admin/RegisteredOrganizations.tsx';
import RegisteredDonors from './admin/RegisteredDonors.tsx';
import OrganizationDetails from './admin/OrganizationDetails.tsx';
import DonorDocuments from './admin/DonorDocuments.tsx';

import OrganizationDocuments from './admin/OrganizationDocuments.tsx';


import {routes as representativeRoutes} from "./representative/routes.tsx";
import {routes as donorRoutes} from "./donor/routes.tsx";
import Layout from "./common/Layout.tsx";

import PrivacyPolicy from "./info/PrivacyPolicy.tsx";
import Terms from "./info/Terms.tsx";
import About from "./info/About.tsx";
import Contact from "./info/Contact.tsx";



const organizations = [
    {
        id: 1,
        name: 'Organization A',
        // other organization data...
    },
    // other organizations...
];

const routes = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout/>,
        children:[
            {path: '/', element: <App/>},

            // Info Routes
            {path: '/privacy-policy', element: <PrivacyPolicy/>},
            {path: '/terms', element: <Terms/>},
            {path: '/about', element: <About/>},
            {path: '/contact', element: <Contact/>},

            // Admin routes
            {path: '/adminlogin', element: <AdminHome/>},
            {path: '/dashboard', element: <Dashboard/>},
            {path: '/organizationsubmissions', element: <OrganizationSubmissions/>},
            {path: '/donorsubmissions', element: <DonorSubmissions/>},
            {path: '/changepassword',element: <ChangePassword/>},
            { path: '/registeredorganizations', element: <RegisteredOrganizations /> },
            { path: '/registereddonors', element: <RegisteredDonors /> },
            { path: '/organizationdetails', element: <OrganizationDetails organization={organizations} /> },
            {path: '/organizationdocuments', element: <OrganizationDocuments /> },
            {path: '/donordocuments', element: <DonorDocuments /> },
            {
                path: '/donor', element: <Layout/>,
                children: donorRoutes,
            },
            {
                path: '/representative', element: <Layout/>,
                children: representativeRoutes
            },
        ]
    },

]);
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={routes}></RouterProvider>
    </React.StrictMode>,
)