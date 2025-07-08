import { Link, NavLink } from "react-router";
import {
  Facebook,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

// Custom WhatsApp Icon Component
const WhatsAppIcon = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="currentColor"
    viewBox="0 0 24 24"
    className={className}
  >
    <path d="M20.52 3.48A12.07 12.07 0 0 0 12 0C5.38 0 0 5.38 0 12a11.92 11.92 0 0 0 1.68 6.14L0 24l6.14-1.6A12.08 12.08 0 0 0 12 24c6.62 0 12-5.38 12-12 0-3.21-1.26-6.23-3.48-8.52zM12 22a10 10 0 0 1-5.2-1.46l-.37-.23-3.64.95.97-3.55-.24-.37A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10 2.67 0 5.18 1.04 7.07 2.93A9.93 9.93 0 0 1 22 12c0 5.52-4.48 10-10 10zm5.35-7.59-.94-.47c-.53-.26-1.1-.56-1.7-.4-.45.11-.75.56-1.04.91-.18.22-.4.24-.64.14-1.04-.41-1.83-1.11-2.38-2-.14-.23-.12-.46.08-.66.29-.31.66-.71.71-1.15.05-.41-.15-.85-.33-1.22a9.82 9.82 0 0 0-.8-1.31c-.2-.29-.43-.61-.76-.75a1.04 1.04 0 0 0-.89.1c-.7.45-1.1 1.2-1.14 2.04-.06 1.26.47 2.34 1.02 3.26a8.1 8.1 0 0 0 3.57 3.13c1.12.48 2.4.94 3.6.65.88-.2 1.48-.97 1.63-1.88.06-.4-.2-.62-.63-.83z" />
  </svg>
);

export default function Footer() {
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Projects" },
    { to: "/pricing", label: "Our-Pricing" },
  ];

  return (
    <footer className="bg-black text-gray-300 px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4  gap-10">
        {/* === Company Info === */}
        <div>
          <Link to="/" className="flex items-center gap-3 mb-4">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-12 w-12 object-cover rounded-full"
            />
            <span className="text-2xl font-bold text-blue-400">Hughes</span>
          </Link>
          <p className="text-sm leading-relaxed">
            Hughes Contractors is a trusted name in civil and demolition works,
            committed to quality, safety, and professionalism throughout every
            project we handle in NSW and beyond.
          </p>
          <div className="flex gap-4 mt-4 text-orange-500">
            <Facebook className="hover:text-white cursor-pointer" />
            <Linkedin className="hover:text-white cursor-pointer" />
            <Instagram className="hover:text-white cursor-pointer" />
            {/* WhatsApp Icon with link */}
            <a
              href="https://wa.me/61419408349"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white cursor-pointer"
              title="Message us on WhatsApp"
            >
              <WhatsAppIcon size={20} />
            </a>
          </div>
        </div>

        {/* === Legal === */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-orange-500 mb-4">Legal</h2>
          <p className="text-sm text-gray-400 hover:text-white cursor-pointer">
            Terms of Use
          </p>
          <p className="text-sm text-gray-400 hover:text-white cursor-pointer">
            Privacy Policy
          </p>
          <p className="text-sm text-gray-400 hover:text-white cursor-pointer">
            Cookie Policy
          </p>
        </div>

        {/* === Quick Links === */}
        <div>
          <h2 className="text-xl font-bold text-orange-500 mb-4">Quick Links</h2>
          <ul className="space-y-2">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) =>
                    `text-sm hover:underline ${
                      isActive ? "text-white font-semibold" : "text-gray-400"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* === Contact Info === */}
        <div>
          <h2 className="text-xl font-bold text-orange-500 mb-4">Contact Us</h2>
          <div className="text-sm space-y-2">
            <p className="text-white font-semibold">
              HUGHES CONTRACTORS PTY LTD
            </p>
            <p>ABN: 21633533276</p>
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-blue-400" />
              <span>hughesecw@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-blue-400" />
              <span>19 Bay Street, Botany NSW 2019</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-blue-400" />
              <span>02 8384 9867</span>
            </div>
            <p className="font-semibold text-white pt-2">
              Civil & Demolition Contractors
            </p>
            <p>Leo Hughes</p>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-blue-400" />
              <span>+61 419 408 349</span>
            </div>
          </div>
        </div>
      </div>

      {/* === Footer Bottom === */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-blue-400">Hughes Contractors Pty Ltd</span>. All
        rights reserved.
      </div>
    </footer>
  );
}
