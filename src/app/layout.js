// src/app/layout.js
"use client";

import "../app/globals.css";
import Navbar from "@/components/Navbar";
import BottomNavbar from "@/components/BottomNavbar";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const hideNav = pathname === "/login" || pathname === "/signup";

  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-white">
        {!hideNav && <Navbar />}
        <main className="min-h-screen">{children}</main>
        {!hideNav && <BottomNavbar />}
      </body>
    </html>
  );
}
