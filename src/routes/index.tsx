import { createBrowserRouter } from "react-router";
import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/HomePage";
import ErrorPage from "@/pages/ErrorPage";
import Projects from "@/pages/Projects";

import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import AdminHome from "@/pages/admin/AdminHomePage";

import OurPricing from "@/pages/OurPricing";
import ManageProjectsPage from "@/pages/admin/ManageProjectsPage";
import ManageEquipmentsPage from "@/pages/admin/ManageEquipmentsPage";
import ProjectDetails from "@/pages/ProjectDetails";
import TermsPage from "@/pages/admin/TermsPage";



const router = createBrowserRouter([
    {
        path: "/admin",
        Component: AdminDashboardLayout,
        children: [
            { index: true, Component: AdminHome },
            { path: "projects", Component: ManageProjectsPage },
            { path: "equipments", Component: ManageEquipmentsPage },
            { path: "terms", Component: TermsPage },
        ],
    },
    {
        path: "/",
        Component: MainLayout,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                Component: HomePage,
            },
            {
                path: "projects/:id",
                Component: ProjectDetails
            },
            {
                path: "projects",
                Component: Projects,
            },
            {
                path: "pricing",
                Component: OurPricing,
            },
        ],
    },
]);

export default router;
