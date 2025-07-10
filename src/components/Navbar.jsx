"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click on menu icon
  const handleMenuClick = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setIsMobileOpen(true);
    }
  };

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
        {/* Left: Logo and Menu Icon (Always visible) */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleMenuClick}
            className="text-2xl text-black"
          >
            <FiMenu />
          </button>
          <span className="text-2xl font-bold text-black">IOGO</span>
        </div>

        {/* Center Nav (desktop only) */}
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

        {/* Right: Buttons (desktop only) */}
        <div className="hidden md:flex gap-4">
          <button className="bg-[#b2faff] text-black border border-black px-5 py-1.5 rounded-full hover:bg-[#a2eff0] transition font-medium">
            Sign Up
          </button>
          <button className="bg-[#b2faff] text-black border border-black px-5 py-1.5 rounded-full hover:bg-[#a2eff0] transition font-medium">
            Log in
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Menu (only on mobile) */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center px-6 space-y-8 text-center md:hidden">
          <button
            onClick={() => setIsMobileOpen(false)}
            className="absolute top-6 right-6 text-3xl text-black"
          >
            <FiX />
          </button>

          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={`text-2xl ${
                pathname === item.path ? "text-blue-700 font-bold" : "text-black"
              }`}
            >
              {item.name}
            </Link>
          ))}

          <div className="flex flex-col gap-4 w-1/2">
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
