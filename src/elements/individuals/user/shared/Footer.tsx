import { FaLinkedinIn, FaWhatsapp, } from "react-icons/fa";
import { PiPhoneCall } from "react-icons/pi";

import { NavLink } from "react-router";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/pricing", label: "Our Pricing" },
  { to: "/terms-and-conditions", label: "Terms and Condition" },
];

// Only 3 social/contact icons as requested:
const contactIcons = [
  {
    icon: FaLinkedinIn,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/leo-hughes-7730ab374/",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    // WhatsApp chat URL with phone number in international format, no + sign, just digits
    href: "https://wa.me/61419408349",
  },
  {
    icon: PiPhoneCall,
    label: "Call",
    href: "tel:+61419408349",
  },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white px-6 py-12">
      <div className="max-w-6xl mx-auto text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/logo.webp" alt="Company Logo" className="h-28 w-28" />
        </div>

        {/* Description */}
        <p className="text-gray-300 max-w-xl mx-auto mb-6">
          Hughes Contractors is a trusted name in civil and demolition works,
          committed to quality, safety, and professionalism throughout every
          project we handle in NSW and beyond.
        </p>

        {/* Navigation Links */}
        <ul className="flex flex-wrap justify-center gap-6 mb-8">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `text-sm transition hover:text-white/75 ${
                    isActive ? "text-white font-semibold" : "text-gray-400"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Contact Icons */}
        <ul className="flex justify-center gap-8 mb-6">
          {contactIcons.map(({ icon: Icon, href, label }) => (
            <li key={label}>
              <a
                href={href}
                target={label !== "Call" ? "_blank" : undefined} // open new tab except call
                rel={label !== "Call" ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="text-gray-400 hover:text-white transition"
              >
                <Icon className="w-6 h-6" />
              </a>
            </li>
          ))}
        </ul>

        {/* Footer Bottom */}
        <div className="text-sm text-gray-500 border-t border-gray-700 pt-4">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-orange-600">Hughes Contractors Pty Ltd</span>. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
