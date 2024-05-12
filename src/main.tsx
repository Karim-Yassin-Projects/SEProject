import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import AdminHome from './admin/Home.tsx'
import DonorHome from './donor/Home.tsx'
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

import DonorSelection from "./donor/DonorSelection.tsx";
import {routes as representativeRoutes} from "./representative/routes.tsx";
import RepresentativeLayout from "./representative/Layout.tsx";
import TeacherDetails from "./donor/TeacherDetails.tsx";
import RequestedDonations from "./donor/RequestedDonations.tsx";
import ClinicDetails from "./donor/ClinicDetails.tsx";
import FilterClothes from "./donor/FilterClothes.tsx";
import MedicalDetails from "./donor/MedicalDetails.tsx";
import MedicalRequests from "./donor/MedicalRequests.tsx";
import MedicalRequest from "./donor/MedicalRequest.tsx";
import CreateDonation from "./donor/CreateDonation.tsx";
import Dashboard2 from "./donor/Dashboard2.tsx";
import DonorRegistration from "./donor/DonorRegistration.tsx";
import DonorLogin from "./donor/Home.tsx"
import PrivacyPolicy from "./info/PrivacyPolicy.tsx";
import Terms from "./info/Terms.tsx";
import About from "./info/About.tsx";
import Contact from "./info/Contact.tsx";
import SearchPosts from "./donor/SearchPosts.tsx";
import PostDetails from "./donor/PostDetails.tsx";

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
            {path: '/privacy-policy', element: <PrivacyPolicy/>},
            {path: '/terms', element: <Terms/>},
            {path: '/about', element: <About/>},
            {path: '/contact', element: <Contact/>},
            {path: '/adminlogin', element: <AdminHome/>},
            {path: '/donor', element: <DonorHome/>},
            {path: '/dashboard', element: <Dashboard/>},
            {path: '/organizationsubmissions', element: <OrganizationSubmissions/>},
            {path: '/donorsubmissions', element: <DonorSubmissions/>},
            {path: '/changepassword',element: <ChangePassword/>},
            {path:'/donor-selection', element: <DonorSelection/>},
            {path: '/clinic-details', element: <ClinicDetails onSubmit={null}/>},
            {path: '/teacher-details', element: <TeacherDetails onSubmit={null}/>},
            {path: '/requested-donations', element: <RequestedDonations onSearch={null}/>},
            {path: '/filter-clothes', element:<FilterClothes/>},
            {path: '/medical-details', element: <MedicalDetails/>},
            {path: '/medical-requests', element: <MedicalRequests/>},
            {path: 'medical-request/:postId', element: <MedicalRequest/>},
            {path: 'create-donation', element: <CreateDonation/>},
            {path: '/dashboard2', element:<Dashboard2/>},
            {path:'/donor-registration', element:<DonorRegistration/>},
            {path:'/donor-login', element:<DonorLogin/>},
            {path: '/search-posts', element:<SearchPosts/>},
            { path: '/registeredorganizations', element: <RegisteredOrganizations /> },
            { path: '/registereddonors', element: <RegisteredDonors /> },
            { path: '/organizationdetails', element: <OrganizationDetails organization={organizations} /> },
            {path: '/organizationdocuments', element: <OrganizationDocuments /> },
            {path: '/donordocuments', element: <DonorDocuments /> },
            {path: '/search-posts', element: <SearchPosts/>},
            {path: '/post-details-donor/:postId', element: <PostDetails/>},
            {
                path: '/representative', element: <RepresentativeLayout/>,
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