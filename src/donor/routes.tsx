import Dashboard from "./Dashboard.tsx";
import Register from "./Register.tsx";
import SearchPosts from "./SearchPosts.tsx";
import PostDetails from "./PostDetails.tsx";
import Login from "./Login.tsx";
import RegisterThanks from "./RegisterThanks.tsx";


export const routes = [
    {path: '', element: <Dashboard/>},
    {path: 'register', element: <Register update={false}/>},
    {path: 'register-thanks', element: <RegisterThanks />},
    {path: 'login', element: <Login/>},
    {path: 'search-posts', element: <SearchPosts />},
    {path: 'search-posts/:category', element: <SearchPosts />},
    {path: 'post-details/:postId', element: <PostDetails/>},
]