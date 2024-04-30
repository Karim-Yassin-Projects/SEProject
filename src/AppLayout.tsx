import NavBar from "./common/NavBar.tsx";
import Footer from "./common/Footer.tsx";
import {Outlet} from "react-router-dom";

function AppLayout(){
    return (
        <div className="d-flex flex-column min-vh-100">
            <div className="sticky-top"><NavBar /></div>
            <Outlet />
            <div className="mt-auto"><Footer /></div>

        </div>
    )
}

export default AppLayout;