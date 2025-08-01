// src/app/layout.js
"use client";

import "../app/globals.css";
import Navbar from "@/components/Navbar";
import BottomNavbar from "@/components/BottomNavbar";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import { AuthProvider } from "@/contexts/AuthContext"; // ✅ Import AuthProvider

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideNav = ["/login", "/registration", "/profile", "/serviceproviderprofile"].includes(pathname);

  return (
    <html lang="en">
      <body className="text-gray-800 dark:text-white">
        <Toaster position="top-right" />
        <AuthProvider>
          {!hideNav && <Navbar />}
          <main className="min-h-screen">{children}</main>

          <div className="fixed bottom-4 right-4 z-50"></div>

          {!hideNav && (
            <>
              <Script
                src="https://cdn.botpress.cloud/webchat/v3.2/inject.js"
                strategy="lazyOnload"
                defer
                id="botpress-inject"
              />
              <Script
                src="https://files.bpcontent.cloud/2025/07/23/08/20250723081415-6V819DZ0.js"
                strategy="lazyOnload"
                defer
                id="botpress-config"
              />
            </>
          )}
          {!hideNav && <BottomNavbar />}
        </AuthProvider>
      </body>
    </html>
  );
}
