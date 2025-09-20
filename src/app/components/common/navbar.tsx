/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import { Globe, Menu, X } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useRouter, usePathname } from "next/navigation";

import logo from "../../../public/Logo.png";

const Navbar: React.FC = () => {
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

  // detect scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ condition: home vs other pages
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
            className="flex items-center cursor-pointer"
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
              className={`ml-2 font-extrabold text-2xl md:text-3xl tracking-tight transition-colors duration-500 ${
                isHome && !scrolled
                  ? "text-white drop-shadow-lg"
                  : "text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-600"
              }`}
            >
              Johar
            </span>
          </div>

          {/* Desktop Links */}
          <div
            className={`hidden md:flex space-x-8 font-semibold transition-colors duration-500 ${textColor}`}
          >
            {links.map((link) => (
              <button
                key={link.name}
                onClick={() => router.push(link.path)}
                className="relative group text-lg transition-all duration-300"
              >
                <span className="group-hover:text-green-500">{link.name}</span>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-green-400 to-yellow-400 transition-all duration-500 group-hover:w-full"></span>
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
                <DropdownMenuItem className="hover:bg-green-100 transition-colors text-gray-800">
                  हिंदी
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Auth Buttons */}
            <div className="hidden md:flex space-x-3">
              <Button
                onClick={() => router.push("/login")}
                className="bg-green-600 text-white px-6 py-3 text-lg rounded-lg font-semibold shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                Login
              </Button>
              <Button
                onClick={() => router.push("/planTrip")}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-3 text-lg rounded-lg font-semibold shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                Plan Your Trip
              </Button>
            </div>

            {/* Mobile Menu */}
            <button
              className={`md:hidden focus:outline-none p-3 rounded-md transition-colors text-xl ${
                isHome && !scrolled ? "text-white" : "text-gray-800 hover:bg-gray-100"
              }`}
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </nav>

      {/* ✅ Sidebar + Popup remains same */}
      {/* ... keep your sidebar and logo popup code same as before ... */}
    </>
  );
};

export default Navbar;
