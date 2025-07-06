import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { Separator } from "@/components/ui/separator";


export default function Footer() {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/team" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
  ];

  const serviceLinks = [
    { name: "Web Design", href: "/services/web-design" },
    { name: "Development", href: "/services/development" },
    { name: "SEO", href: "/services/seo" },
    { name: "Consulting", href: "/services/consulting" },
  ];

  const supportLinks = [
    { name: "Help Center", href: "/help" },
    { name: "Contact Us", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Documentation", href: "/docs" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "GDPR", href: "/gdpr" },
  ];

  const socialLinks = [
    { name: "Facebook", href: "https://facebook.com", icon: FaFacebookF },
    { name: "Twitter", href: "https://twitter.com", icon: FaTwitter },
    { name: "Instagram", href: "https://instagram.com", icon: FaInstagram },
    { name: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedinIn },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="xl:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-xl font-bold text-white">Logo</span>
            </Link>
            <p className="text-slate-400 mb-6 max-w-md">
              We create exceptional digital experiences that help businesses
              grow and connect with their audiences in meaningful ways.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MdLocationOn className="w-4 h-4 text-blue-400" />
                <span className="text-sm">
                  123 Business Street, City, State 12345
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MdPhone className="w-4 h-4 text-blue-400" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MdEmail className="w-4 h-4 text-blue-400" />
                <span className="text-sm">hello@company.com</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-white font-semibold text-lg mb-2">
                Stay Updated
              </h3>
              <p className="text-slate-400 text-sm">
                Subscribe to our newsletter for the latest updates and insights.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-slate-800" />

        {/* Bottom Footer */}
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          {/* Copyright */}
          <div className="text-slate-400 text-sm text-center lg:text-left">
            <p>&copy; {currentYear} Your Company Name. All rights reserved.</p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center lg:justify-end gap-6">
            {legalLinks.map((link, index) => (
              <span key={link.name} className="flex items-center">
                <Link
                  to={link.href}
                  className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  {link.name}
                </Link>
                {index < legalLinks.length - 1 && (
                  <span className="text-slate-600 mx-3">|</span>
                )}
              </span>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors duration-200"
                  aria-label={social.name}
                >
                  <IconComponent className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
