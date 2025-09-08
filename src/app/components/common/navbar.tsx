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
import { useRouter } from "next/navigation";

import logo from "../../../public/Logo.png";

const Navbar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoPopup, setLogoPopup] = useState(false);
  const router = useRouter();

  const links = [
    { name: "Home", href: "#" },
    { name: "Destinations", href: "#" },
    { name: "Marketplace", href: "#" },
    { name: "Guides", href: "#" },
    { name: "Transport", href: "#" },
    { name: "Dashboard", href: "#" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`w-full fixed top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-lg shadow-lg"
            : "bg-transparent"
        }`}
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
                scrolled
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-600"
                  : "text-white drop-shadow-lg"
              }`}
            >
              Johar
            </span>
          </div>

          {/* Desktop Links */}
          <div
            className={`hidden md:flex space-x-8 font-semibold transition-colors duration-500 ${
              scrolled ? "text-gray-800" : "text-white"
            }`}
          >
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative group text-lg transition-all duration-300"
              >
                <span className="group-hover:text-green-500">{link.name}</span>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-green-400 to-yellow-400 transition-all duration-500 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-5">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className={`shadow-md rounded-full p-3 transition-all duration-500 ${
                    scrolled
                      ? "bg-gray-100 text-gray-800 hover:bg-green-100"
                      : "bg-white/20 text-white hover:bg-white/40"
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
                onClick={() => router.push("../../pages/login")} 
                className="bg-green-600 text-white px-6 py-3 text-lg rounded-lg font-semibold shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                Login
              </Button>
              <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-3 text-lg rounded-lg font-semibold shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg">
                Plan Your Trip
              </Button>
            </div>

            {/* Mobile Menu */}
            <button
              className={`md:hidden focus:outline-none p-3 rounded-md transition-colors text-xl ${
                scrolled ? "hover:bg-gray-100 text-gray-800" : "text-white"
              }`}
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-500 ease-in-out z-50 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b shadow-sm">
          <span className="font-bold text-xl text-gray-800">Menu</span>
          <button
            className="focus:outline-none p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-7 h-7" />
          </button>
        </div>
        <div className="flex flex-col px-6 py-6 space-y-5">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-lg text-gray-700 hover:text-green-600 font-medium transition-colors duration-300"
              onClick={() => setSidebarOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="flex flex-col space-y-3 mt-6">
            <Button 
              onClick={() => router.push("../../pages/login")} 
              className="bg-green-600 text-white px-6 py-3 text-lg rounded-lg font-semibold shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg"
            >
              Login
            </Button>
            <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-3 text-lg rounded-lg font-semibold shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg">
              Plan Your Trip
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay for Sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Logo Popup */}
      {logoPopup && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md z-[100] animate-fadeIn"
          onClick={() => setLogoPopup(false)}
        >
          <div className="flex flex-col items-center">
            <Image
              src={logo}
              alt="Johar Logo"
              width={150}
              height={150}
              className="drop-shadow-2xl animate-bounce"
            />
            <span className="mt-4 text-4xl font-extrabold text-white drop-shadow-lg">
              Johar
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
