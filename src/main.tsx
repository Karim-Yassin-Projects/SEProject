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
import Dashboard from "./admin/Dashboard.tsx";
import OrganizationSubmissions from "./admin/OrganizationSubmissions.tsx";
import DonorSubmissions from "./admin/DonorSubmissions.tsx";
import ChangePassword from "./admin/ChangePassword.tsx";
import DonorSelection from "./donor/DonorSelection.tsx";
import {routes as representativeRoutes} from "./representative/routes.tsx";
import RepresentativeLayout from "./representative/Layout.tsx";
import TeacherDetails from "./donor/TeacherDetails.tsx";
import RequestedDonations from "./donor/RequestedDonations.tsx";
import ClinicDetails from "./donor/ClinicDetails.tsx";
import FilterClothes from "./donor/FilterClothes.tsx";


const routes = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout/>,
        children:[
            {path: '/', element: <App/>},
            {path: '/adminlogin', element: <AdminHome/>},
            {path: '/donor', element: <DonorHome/>},
            {path: '/dashboard', element: <Dashboard/>},
            {path: '/organizationsubmissions', element: <OrganizationSubmissions/>},
            {path: '/donorsubmissions', element: <DonorSubmissions/>},
            {path: '/changepassword',element: <ChangePassword/>},
            {path:'/donor-selection', element: <DonorSelection/>},
            {path: '/clinic-details', element: <ClinicDetails/>},
            {path: '/teacher-details', element: <TeacherDetails/>},
            {path: '/requested-donations', element: <RequestedDonations/>},
            {path: '/filter-clothes', element:<FilterClothes/>},
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