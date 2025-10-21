"use client";

import React, { useState, useEffect } from "react";
import { Globe, Menu } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

import logo from "../../../public/Logo.png";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoPopup, setLogoPopup] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const links = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destination" },
    { name: "Marketplace", path: "/marketplace" },
    { name: "Guides", path: "/guides" },
    { name: "Transport", path: "/transport" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const navBg =
    isHome && !scrolled
      ? "bg-transparent"
      : "bg-white/90 backdrop-blur-lg shadow-lg";
  const textColor = isHome && !scrolled ? "text-white" : "text-gray-800";

  return (
    <>
      <nav
        className={`w-full fixed top-0 z-50 transition-all duration-500 ${navBg}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 md:py-5">
          {/* Brand */}
          <div
            className="flex items-center cursor-pointer flex-shrink-0 gap-2"
            onClick={() => setLogoPopup(true)}
          >
            <Image
              src={logo}
              alt="Johar Logo"
              width={55}
              height={55}
              className="transition-transform duration-300 hover:scale-125 drop-shadow-md"
            />
            <span
              className={`font-extrabold text-2xl md:text-3xl tracking-tight transition-colors duration-500 ${
                isHome && !scrolled
                  ? "text-white drop-shadow-lg"
                  : "text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-600"
              }`}
            >
              Johar
            </span>
          </div>

          {/* Desktop Links (lg and above) */}
          <div
            className={`hidden lg:flex items-center space-x-8 font-semibold transition-colors duration-500 ${textColor}`}
          >
            {links.map((link) => (
              <button
                key={link.name}
                onClick={() => router.push(link.path)}
                className="relative group text-lg transition-all duration-300"
              >
                <span className="group-hover:text-green-500">{link.name}</span>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-green-400 to-yellow-40Next.js00 transition-all duration-500 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-5">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className={`shadow-md rounded-full p-3 transition-all duration-500 ${
                    isHome && !scrolled
                      ? "bg-white/20 text-white hover:bg-white/40"
                      : "bg-gray-100 text-gray-800 hover:bg-green-100"
                  }`}
                  size="icon"
                >
                  <Globe className="h-6 w-6 transition-transform duration-300 group-hover:rotate-12" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="shadow-xl border border-gray-200 rounded-lg">
                <DropdownMenuItem className="hover:bg-green-100 transition-colors text-gray-800">
                  English
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:bg-green-100 transition-colors text-gray-800"
                  onClick={() => {
                    alert(
                      "Hindi is not available right now. We are working on it."
                    );
                  }}
                  onSelect={(e) => e.preventDefault()}
                >
                  हिंदी
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Auth Buttons (xl and above) */}
            <div className="hidden xl:flex items-center gap-3 flex-shrink-0">
              <Button
                onClick={() => router.push("/login")}
                className="bg-green-600 text-white px-5 py-2 text-md rounded-lg font-semibold shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap"
              >
                Login
              </Button>
              <Button
                onClick={() => router.push("/planTrip")}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-5 py-2 text-md rounded-lg font-semibold shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap"
              >
                Plan Your Trip
              </Button>
            </div>

            {/* Hamburger (visible below xl) */}
            <button
              className={`xl:hidden focus:outline-none p-3 rounded-md transition-colors text-xl ${
                isHome && !scrolled
                  ? "text-white"
                  : "text-gray-800 hover:bg-gray-100"
              }`}
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="relative w-64 bg-white h-full p-6 flex flex-col gap-6">
            <button
              onClick={() => setSidebarOpen(false)}
              className="self-end p-2 text-gray-700 hover:text-black"
            >
              ✕
            </button>
            {links.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  router.push(link.path);
                  setSidebarOpen(false);
                }}
                className="text-gray-800 font-semibold text-lg text-left hover:text-green-600"
              >
                {link.name}
              </button>
            ))}
            <Button
              onClick={() => {
                router.push("/login");
                setSidebarOpen(false);
              }}
              className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:scale-105 transition-all duration-300"
            >
              Login
            </Button>
            <Button
              onClick={() => {
                router.push("/planTrip");
                setSidebarOpen(false);
              }}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-5 py-2 rounded-lg font-semibold shadow-md hover:scale-105 transition-all duration-300"
            >
              Plan Your Trip
            </Button>
          </div>
        </div>
      )}

      {/* Logo Popup with floating effect */}
      {logoPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
          {/* blurred background */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setLogoPopup(false)}
          ></div>

          {/* floating logo */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative z-50"
          >
            <Image
              src={logo}
              alt="Johar Logo"
              width={250}
              height={250}
              className="drop-shadow-xl cursor-pointer"
              onClick={() => setLogoPopup(false)}
            />
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Navbar;