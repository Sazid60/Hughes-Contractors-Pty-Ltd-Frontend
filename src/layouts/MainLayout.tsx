// import Footer from "@/elements/shared/Footer";
import Navbar from "@/elements/shared/Navbar";
import { Outlet } from "react-router";


export default function MainLayout() {
    return (

        <div>
            <Navbar />
            <div className='min-h-[calc(100vh-68px)] font-libertinus'>
                <Outlet />
            </div>
            {/* <Footer /> */}
        </div>

    )
}
