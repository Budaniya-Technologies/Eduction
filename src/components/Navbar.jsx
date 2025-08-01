"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

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
    { name: "Features", path: "/FeatureShowcase" },
    { name: "Pricing", path: "/price" },
  ];

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 px-2 md:px-8 py-4 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-2xl text-black md:block hidden"
          >
            <FiMenu />
          </button>

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

        <div className="hidden md:flex gap-4 kodchasan-extralight">
          <button
            onClick={() => router.push("/registration")}
            className="bg-[#b2faff] text-black border border-black px-5 py-1.5 rounded-full hover:bg-[#a2eff0] transition font-medium"
          >
            Sign Up
          </button>

          <button
            onClick={() => router.push("/login")}
            className="px-6 py-2 rounded-full border border-white bg-cyan-300 text-black hover:bg-white hover:text-blue-700 shadow-md transition duration-300 ease-in-out font-semibold"
          >
            Log In
          </button>
        </div>
      </div>

      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setIsSidebarOpen(false)}
          ></div>

          <div className="fixed top-0 left-0 h-screen w-[20%] bg-white z-50 shadow-md flex flex-col items-center justify-center">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="absolute top-4 right-4 text-2xl text-black"
            >
              <FiX />
            </button>

            <div className="flex flex-col gap-6 text-2xl text-black">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </>
      )}

      {isMobileOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-white z-50 flex flex-col items-center justify-center text-center md:hidden">
          <button
            onClick={() => setIsMobileOpen(false)}
            className="absolute top-4 right-4 text-3xl text-black"
          >
            <FiX />
          </button>

          <div className="flex flex-col gap-6 mt-8">
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
          </div>

          <div className="flex flex-col gap-4 mt-10 w-2/3">
            <button
              onClick={() => {
                setIsMobileOpen(false);
                router.push("/registration");
              }}
              className="bg-[#b2faff] text-black border border-black px-4 py-2 rounded-full hover:bg-[#a2eff0] font-medium"
            >
              Sign Up
            </button>
            <button
              onClick={() => {
                setIsMobileOpen(false);
                router.push("/login");
              }}
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
