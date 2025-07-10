"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Features", path: "/features" },
    { name: "Pricing", path: "/pricing" },
  ];

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          EduLearn
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 items-center text-lg font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className={`px-3 py-1 rounded-md transition-colors duration-200 ${
                  pathname === item.path
                    ? "bg-yellow-400 text-black font-semibold"
                    : "hover:bg-white hover:text-blue-600"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-3">
          <button className="bg-cyan-200 text-black border border-black rounded-full px-4 py-1 font-semibold">
            Sign Up
          </button>
          <button className="bg-cyan-200 text-black border border-black rounded-full px-4 py-1 font-semibold">
            Log in
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={toggleMenu}
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 px-4 space-y-4">
          <ul className="flex flex-col gap-3 text-lg">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block w-full px-3 py-2 rounded-md ${
                    pathname === item.path
                      ? "bg-yellow-400 text-black font-semibold"
                      : "hover:bg-white hover:text-blue-600"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2 pt-2">
            <button className="bg-cyan-200 text-black border border-black rounded-full px-4 py-2 font-semibold">
              Sign Up
            </button>
            <button className="bg-cyan-200 text-black border border-black rounded-full px-4 py-2 font-semibold">
              Log in
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
