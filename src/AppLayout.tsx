import NavBar from "./common/NavBar.tsx";
import Footer from "./common/Footer.tsx";
import {Outlet} from "react-router-dom";

function AppLayout(){
    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default AppLayout;