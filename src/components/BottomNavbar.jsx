
"use client";
import { useState } from "react";
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
  { label: "HOME", icon: FiHome },
  { label: "JOBS", icon: FiBriefcase },
  { label: "BUSINESS", icon: FiFolder },
  { label: "GURUKUL", icon: FiBookOpen },
  { label: "QUIZ", icon: FiMessageSquare },
  { label: "SURVEY", icon: FiSettings },
  { label: "SERVICES", icon: FiTool },
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
            <button
              key={item.label}
              onClick={() => setActiveIndex(index)}
              className="flex flex-col items-center text-xs font-semibold transition text-gray-600 hover:text-blue-600"
            >
              <Icon
                className={`text-2xl mb-1 ${
                  isActive ? "text-blue-600" : "text-gray-500"
                }`}
              />
              <span className={isActive ? "text-blue-600" : "text-gray-500"}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
