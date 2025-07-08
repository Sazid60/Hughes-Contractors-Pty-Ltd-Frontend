import { createBrowserRouter } from "react-router";
import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/HomePage";
import ErrorPage from "@/pages/ErrorPage";
import MissionVision from "@/pages/MissionVision";
import WhatWeDo from "@/pages/WhatWeDo";
import Projects from "@/pages/Projects";
import OurEquipments from "@/pages/OurEquipments";
import AdminDashboardLayout from "@/pages/admin/AdminDashboardLayout";
import AdminHome from "@/pages/admin/AdminHome";
import ManageProjects from "@/pages/admin/ManageProjects";
import ManageEquipments from "@/pages/admin/AdminEquipments";



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
                path: "mission-vision",
                Component: MissionVision,
            },
            {
                path: "what-we-do",
                Component: WhatWeDo,
            },
            {
                path: "projects",
                Component: Projects,
            },
            {
                path: "equipments",
                Component: OurEquipments,
            },
        ],
    },
]);

export default router;
