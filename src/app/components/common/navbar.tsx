"use client";

import React, { useState, useEffect } from "react";
import { Globe, Menu, X } from "lucide-react";
import { Button } from "../ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Navbar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { name: "Home", href: "#" },
    { name: "Destinations", href: "#" },
    { name: "Marketplace", href: "#" },
    { name: "Guides", href: "#" },
    { name: "Transport", href: "#" },
    { name: "Dashboard", href: "#" },
  ];

  // Detect scroll to apply background and shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full fixed top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 md:py-4">
        {/* Brand */}
        <div className="flex items-center space-x-2">
          <div className="bg-green-600 text-white font-bold px-3 py-2 rounded-md shadow-md transition-transform transform hover:scale-110">
            EJ
          </div>
          <span className="font-semibold text-lg md:text-xl text-gray-800 tracking-wide">
            Explore Jharkhand
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative group transition-colors duration-300 hover:text-green-600"
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="bg-white/80 text-black shadow-sm hover:bg-green-100 transition-all duration-300"
                size="icon"
              >
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="shadow-xl border border-gray-200 rounded-md">
              <DropdownMenuItem className="text-black hover:bg-green-100 transition-colors">
                English
              </DropdownMenuItem>
              <DropdownMenuItem className="text-black hover:bg-green-100 transition-colors">
                हिंदी
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Auth Buttons */}
          <div className="hidden md:flex space-x-2">
            <Button className="relative overflow-hidden bg-green-600 text-white px-4 py-2 rounded-lg font-medium shadow-md transition-all duration-300 hover:scale-105 group">
              <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
              <span className="relative z-10">Login</span>
            </Button>
            <Button className="relative overflow-hidden bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-2 rounded-lg font-medium shadow-md transition-all duration-300 hover:scale-105 group">
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
              <span className="relative z-10">Plan Your Trip</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Sidebar / Slider */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-500 ease-in-out z-50 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b shadow-sm">
          <span className="font-bold text-lg text-gray-800">Menu</span>
          <button
            className="focus:outline-none p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col px-6 py-4 space-y-4">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-300"
              onClick={() => setSidebarOpen(false)}
            >
              {link.name}
            </a>
          ))}

          <div className="flex flex-col space-y-2 mt-4">
            <Button
              className="relative overflow-hidden bg-green-600 text-white px-4 py-2 rounded-lg font-medium shadow-md transition-all duration-300 hover:scale-105 group"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
              <span className="relative z-10">Login</span>
            </Button>
            <Button
              className="relative overflow-hidden bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-2 rounded-lg font-medium shadow-md transition-all duration-300 hover:scale-105 group"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
              <span className="relative z-10">Plan Your Trip</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity duration-300 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
