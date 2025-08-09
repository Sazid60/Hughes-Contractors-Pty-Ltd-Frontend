
import Footer from "@/elements/individuals/user/shared/Footer";
import Navbar from "@/elements/individuals/user/shared/Navbar";
import { Outlet, ScrollRestoration } from "react-router";


export default function MainLayout() {
    return (
        <>
            <ScrollRestoration />
            <Navbar />
            <div className='min-h-[calc(100vh-68px)] font-libertinus'>
                <Outlet />
            </div>
            <Footer />
        </>


    )
}
