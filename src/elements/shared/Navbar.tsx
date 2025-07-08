import { Link, NavLink, useLocation } from "react-router";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === "/";

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/projects", label: "Projects" },
        { to: "/pricing", label: "Our-Pricing" },
    ];

    const toggleMenu = () => setIsMenuOpen(prev => !prev);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav>
            {/* Top Navbar */}
            <div
                className={`fixed top-0 left-0 w-full z-50 px-3 sm:px-4 md:px-6 lg:px-10 xl:px-12 py-3 md:py-4 flex justify-between items-center shadow-lg transition-all duration-300
                ${isHome
                        ? "bg-black/50 backdrop-blur-xs"
                        : "bg-cover bg-center bg-no-repeat "
                    }`}
                style={!isHome ? { backgroundImage: "url('/Banner.jpg')" } : {}}
            >
                {/* Logo & Title */}
                <Link to={"/"}>
                    <div className="flex items-center gap-4">
                        <img
                            className="h-12 w-12 md:h-16 md:w-16 rounded-full object-cover"
                            src="/logo.png"
                            alt="Logo"
                        />
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-6 border px-4 py-2 shadow-2xl">
                    {navLinks.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === "/"}
                            className={({ isActive }) =>
                                `text-sm px-2 py-1 transition-colors text-white ${isActive
                                    ? "font-bold underline underline-offset-4"
                                    : "text-gray-300 hover:text-white hover:underline underline-offset-4"
                                }`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </div>

                {/* Mobile Menu Icon */}
                <button onClick={toggleMenu} className="md:hidden text-3xl text-white">
                    {isMenuOpen ? <HiX /> : <HiMenu />}
                </button>
            </div>

            {/* Overlay when menu is open */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-30 bg-black/50" onClick={closeMenu} />
            )}

            {/* Mobile Side Nav */}
            <div
                className={`fixed top-0 left-0 h-full w-60 bg-white z-60 shadow-lg transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between px-4 py-3 border-b">
                    <Link to={"/"}>
                        <div className="flex items-center gap-3">
                            <img
                                className="h-10 w-10 rounded-full object-cover"
                                src="/logo.png"
                                alt="Logo"
                            />
                        </div>
                    </Link>
                    <button onClick={closeMenu} className="text-2xl">
                        <HiX />
                    </button>
                </div>

                <div className="flex flex-col mt-4 px-6 gap-4">
                    {navLinks.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === "/"}
                            onClick={closeMenu}
                            className={({ isActive }) =>
                                `font-medium transition-colors ${isActive
                                    ? "font-bold underline underline-offset-4"
                                    : "text-gray-800 hover:text-black hover:underline underline-offset-4"
                                }`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </div>
            </div>
        </nav>
    );
}
