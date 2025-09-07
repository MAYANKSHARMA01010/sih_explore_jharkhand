"use client";

import React, { useState } from "react";
import { Globe, Menu, X } from "lucide-react";
import { Button } from "../components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const links = [
    { name: "Home", href: "#" },
    { name: "Destinations", href: "#" },
    { name: "Marketplace", href: "#" },
    { name: "Guides", href: "#" },
    { name: "Transport", href: "#" },
    { name: "Dashboard", href: "#" },
  ];

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Brand */}
        <div className="flex items-center space-x-2">
          <div className="bg-green-600 text-white font-bold px-2 py-1 rounded-md">
            EJ
          </div>
          <span className="font-semibold text-lg text-gray-800">
            Explore Jharkhand
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-green-600"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-white text-black" size="icon">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="text-black">English</DropdownMenuItem>
              <DropdownMenuItem className="text-black">हिंदी</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Auth Buttons */}
          <div className="hidden md:flex space-x-2">
            <Button>Login</Button>
            <Button>Plan Your Trip</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Sidebar / Slider */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <span className="font-bold text-lg text-gray-800">Menu</span>
          <button
            className="focus:outline-none"
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
              className="text-gray-700 hover:text-green-600 font-medium"
              onClick={() => setSidebarOpen(false)}
            >
              {link.name}
            </a>
          ))}

          <div className="flex flex-col space-y-2 mt-4">
            <Button onClick={() => setSidebarOpen(false)}>Login</Button>
            <Button onClick={() => setSidebarOpen(false)}>
              Plan Your Trip
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
