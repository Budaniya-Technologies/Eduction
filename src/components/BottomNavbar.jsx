"use client";
import { useState } from "react";
import Link from "next/link";
import {
  FiHome,
  FiBriefcase,
  FiFolder,
  FiBookOpen,
  FiMessageSquare,
  FiSettings,
  FiTool,
} from "react-icons/fi";

const navItems = [
  { label: "HOME", icon: FiHome, path: "/" },
  { label: "JOBS", icon: FiBriefcase, path: "/jobdescription" },
  { label: "BUSINESS", icon: FiFolder, path: "/businessdescription" },
  { label: "GURUKUL", icon: FiBookOpen, path: "/gurukul" },
  { label: "QUIZ", icon: FiMessageSquare, path: "/quiz" },
  { label: "SURVEY", icon: FiSettings, path: "/survey" },
  { label: "SERVICES", icon: FiTool, path: "/services" },
];

export default function BottomNavbar() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white shadow-md border-t z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === activeIndex;

          return (
            <Link
              href={item.path || "#"}
              key={item.label}
              onClick={() => setActiveIndex(index)}
              className="flex flex-col items-center text-xs font-semibold transition-all duration-200 group"
            >
              <Icon
                className={`text-2xl mb-1 transition-all duration-200 
                  ${isActive ? "text-blue-600" : "text-gray-500"} 
                  group-hover:text-blue-600 group-hover:scale-110`}
              />
              <span
                className={`transition-colors duration-200 
                  ${isActive ? "text-blue-600" : "text-gray-500"} 
                  group-hover:text-blue-600`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
