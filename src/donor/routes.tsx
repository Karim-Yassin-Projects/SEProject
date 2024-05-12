import TeacherDetails from "./TeacherDetails.tsx";
import RequestedDonations from "./RequestedDonations.tsx";
import ClinicDetails from "./ClinicDetails.tsx";
import FilterClothes from "./FilterClothes.tsx";
import MedicalDetails from "./MedicalDetails.tsx";
import MedicalRequests from "./MedicalRequests.tsx";
import MedicalRequest from "./MedicalRequest.tsx";
import CreateDonation from "./CreateDonation.tsx";
import Dashboard from "./Dashboard.tsx";
import Register from "./Register.tsx";
import SearchPosts from "./SearchPosts.tsx";
import PostDetails from "./PostDetails.tsx";
import SchoolSupplies from "./SchoolSupplies.tsx";
import FoodDonations from "./FoodDonations.tsx";
import ToyDonations from "./ToyDonations.tsx";
import Books from "./Books.tsx";
import Stationary from "./Stationary.tsx";
import DonorSelection from "./DonorSelection.tsx";
import Login from "./Login.tsx";
import RegisterThanks from "./RegisterThanks.tsx";


export const routes = [
    {path: '', element: <Dashboard/>},
    {path: 'register', element: <Register update={false}/>},
    {path: 'register-thanks', element: <RegisterThanks />},
    {path: 'login', element: <Login/>},

    {path: 'donor-selection', element: <DonorSelection/>},
    {path: 'clinic-details', element: <ClinicDetails onSubmit={null}/>},
    {path: 'teacher-details', element: <TeacherDetails onSubmit={null}/>},
    {path: 'requested-donations', element: <RequestedDonations onSearch={null}/>},
    {path: 'filter-clothes', element: <FilterClothes/>},
    {path: 'medical-details', element: <MedicalDetails/>},
    {path: 'medical-requests', element: <MedicalRequests/>},
    {path: 'medical-request/:postId', element: <MedicalRequest/>},
    {path: 'create-donation', element: <CreateDonation/>},
    {path: 'dashboard2', element: <Dashboard/>},
    // {path: 'donor-registration', element: <DonorRegistration/>},
    {path: 'search-posts', element: <SearchPosts/>},
    {path: 'school-supplies', element: <SchoolSupplies/>},
    {path: 'food-donations', element: <FoodDonations/>},
    {path: 'toy-donations', element: <ToyDonations/>},
    {path: 'books', element: <Books/>},
    {path: 'stationary', element: <Stationary/>},
    {path: 'dashboard2', element: <Dashboard/>},
    {path: 'search-posts', element: <SearchPosts/>},
    {path: 'post-details-donor/:postId', element: <PostDetails/>},
]