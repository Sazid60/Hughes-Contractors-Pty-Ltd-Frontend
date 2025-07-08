import { Link, Outlet, useLocation } from "react-router";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function AdminDashboardLayout() {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { path: "/admin", label: "Dashboard Home" },
        { path: "/admin/projects", label: "Manage Projects" },
        { path: "/admin/equipments", label: "Manage Equipments" },
    ];

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-gray-900 text-white justify-between p-4">
                {/* Top */}
                <div>
                    <Link to="/" className="flex justify-center items-center mb-6">
                        <img src="/logo.png" className="h-28 w-28 object-cover rounded-full" alt="Logo" />
                    </Link>
                    <h2 className="text-2xl font-bold text-center mb-6 uppercase">Admin Panel</h2>
                    <nav className="flex flex-col gap-3 border-t-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`py-2 mt-4 px-4  hover:bg-gray-700 transition ${location.pathname === item.path
                                    ? "bg-gray-800"
                                    : ""
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Return Button */}
                <div>
                    <Link
                        to="/"
                        className="block mt-8 py-2 px-4 bg-orange-500 hover:bg-orange-600 text-center rounded-none transition"
                    >
                        ← Return to Website
                    </Link>
                </div>
            </aside>

            {/* Mobile Hamburger + Logo */}
            <div className="md:hidden fixed top-4 left-4 z-50 flex items-center gap-4">
                <Link to="/">
                    <img src="/logo.png" alt="Logo" className="h-10 w-10 object-cover rounded-full" />
                </Link>
            </div>

            <div className="md:hidden fixed top-4 right-4 z-50">
                <button onClick={toggleMenu} className="text-3xl text-gray-900">
                    {isMenuOpen ? <HiX /> : <HiMenu />}
                </button>
            </div>

            {/* Mobile Overlay */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={closeMenu}
                />
            )}

            {/* Mobile Sidebar */}
            <div
                className={`fixed top-0 left-0 h-screen w-60 bg-white z-50 shadow-lg transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Top: Logo and Close */}
                <div className="flex items-center justify-between px-4 py-3 border-b">
                    <Link to="/" onClick={closeMenu}>
                        <img src="/logo.png" className="h-10 w-10 object-cover rounded-full" alt="Logo" />
                    </Link>
                    <button onClick={closeMenu} className="text-2xl">
                        <HiX />
                    </button>
                </div>

                {/* Routes */}
                <div className="flex flex-col gap-4 px-4 py-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={closeMenu}
                            className={`text-sm font-medium transition-colors ${location.pathname === item.path
                                ? "font-bold underline underline-offset-4"
                                : "text-gray-800 hover:text- hover:underline underline-offset-4"
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* Bottom Return Button */}
                <div className="absolute bottom-4 w-full px-4">
                    <Link
                        to="/"
                        onClick={closeMenu}
                        className="block w-full text-center py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs md:text-sm transition rounded"
                    >
                        ← Return to Website
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex justify-center items-center w-full p-4">
                <Outlet />
            </main>
        </div>
    );
}
