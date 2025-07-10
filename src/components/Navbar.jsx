"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Features", path: "/features" },
    { name: "Pricing", path: "/pricing" },
  ];

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 px-2 md:px-8 py-4 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Left: Logo and both Menu Buttons */}
        <div className="flex items-center gap-4">
          {/* Fullscreen sidebar trigger (desktop only) */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-2xl text-black md:block hidden"
          >
            <FiMenu />
          </button>

          {/* Mobile menu trigger (mobile only) */}
          <button
            onClick={() => setIsMobileOpen(true)}
            className="text-2xl text-black md:hidden"
          >
            <FiMenu />
          </button>

          <Image
            src="/assets/ParthamLogo.png"
            alt="IOGO Logo"
            width={120}
            height={40}
            priority
          />
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 text-base font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className={`hover:text-blue-600 transition ${
                  pathname === item.path ? "font-bold text-black" : "text-black"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-4">
          <button className="bg-[#b2faff] text-black border border-black px-5 py-1.5 rounded-full hover:bg-[#a2eff0] transition font-medium">
            Sign Up
          </button>
          <button className="bg-[#b2faff] text-black border border-black px-5 py-1.5 rounded-full hover:bg-[#a2eff0] transition font-medium">
            Log in
          </button>
        </div>
      </div>

      {/* ✅ Fullscreen Sidebar (20% width, left) */}
      {isSidebarOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setIsSidebarOpen(false)}
          ></div>

          {/* Sidebar with no gap at top or left */}
          <div className="fixed top-0 left-0 h-screen w-[20%] bg-white z-50 shadow-md flex flex-col items-center justify-center">
            {/* Close button inside the sidebar with manual positioning */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="absolute top-4 right-4 text-2xl text-black"
            >
              <FiX />
            </button>

            {/* Media Icons */}
            <div className="flex flex-col gap-6 text-2xl text-black">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </>
      )}

      {/* ✅ Mobile Navbar */}
      {isMobileOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-white z-50 flex flex-col items-center justify-center text-center md:hidden">
          {/* Close Button */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="absolute top-4 right-4 text-3xl text-black"
          >
            <FiX />
          </button>

          {/* Nav Links */}
          <div className="flex flex-col gap-6 mt-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={`text-2xl ${
                  pathname === item.path
                    ? "text-blue-700 font-bold"
                    : "text-black"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 mt-10 w-2/3">
            <button
              onClick={() => setIsMobileOpen(false)}
              className="bg-[#b2faff] text-black border border-black px-4 py-2 rounded-full hover:bg-[#a2eff0] font-medium"
            >
              Sign Up
            </button>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="bg-[#b2faff] text-black border border-black px-4 py-2 rounded-full hover:bg-[#a2eff0] font-medium"
            >
              Log in
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
