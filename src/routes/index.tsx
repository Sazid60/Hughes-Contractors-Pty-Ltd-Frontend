import { createBrowserRouter } from "react-router";
import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/HomePage";
import ErrorPage from "@/pages/ErrorPage";
import Projects from "@/pages/Projects";

import AdminDashboardLayout from "@/pages/admin/AdminDashboardLayout";
import AdminHome from "@/pages/admin/AdminHome";
import ManageProjects from "@/pages/admin/ManageProjects";
import ManageEquipments from "@/pages/admin/ManageEquipments";
import OurPricing from "@/pages/OurPricing";



const router = createBrowserRouter([
    {
        path: "/admin",
        Component: AdminDashboardLayout,
        children: [
            { index: true, Component: AdminHome },
            { path: "projects", Component: ManageProjects },
            { path: "equipments", Component: ManageEquipments },
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
