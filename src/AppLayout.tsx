import NavBar from "./common/NavBar.tsx";
import Footer from "./common/Footer.tsx";
import {Outlet, useLocation} from "react-router-dom";
import {useEffect} from "react";

function AppLayout() {
    // Extracts pathname property(key) from an object
    const {pathname} = useLocation();

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="d-flex flex-column min-vh-100">
            <div className="sticky-top"><NavBar/></div>
            <Outlet/>
            <div className="mt-auto"><Footer/></div>
        </div>
    )
}

export default AppLayout;