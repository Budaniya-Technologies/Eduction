"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Features", path: "/features" },
    { name: "Pricing", path: "/pricing" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          EduLearn
        </Link>

        <ul className="flex gap-6 items-center text-lg font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className={`px-3 py-1 rounded-md transition-colors duration-200 ${
                  pathname === item.path
                    ? "bg-yellow-400 text-black font-semibold"
                    : "hover:bg-transparent"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex gap-3">
          <button className="bg-cyan-200 text-black border border-black rounded-full px-4 py-1 font-semibold">
            Sign Up
          </button>
          <button className="bg-cyan-200 text-black border border-black rounded-full px-4 py-1 font-semibold">
            Log in
          </button>
        </div>
      </div>
    </nav>
  );
}
