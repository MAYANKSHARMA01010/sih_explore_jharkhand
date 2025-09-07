"use client";

import React from "react";
import { Globe } from "lucide-react";
import { Button } from "../components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Brand Left Side */}
        <div className="flex items-center space-x-2">
          <div className="bg-green-600 text-white font-bold px-2 py-1 rounded-md">
            EJ
          </div>
          <span className="font-semibold text-lg text-gray-800">
            Explore Jharkhand
          </span>
        </div>

        {/* Links Middle Side */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <a href="#" className="hover:text-green-600">Home</a>
          <a href="#" className="hover:text-green-600">Destinations</a>
          <a href="#" className="hover:text-green-600">Plan Trip</a>
          <a href="#" className="hover:text-green-600">Marketplace</a>
          <a href="#" className="hover:text-green-600">Guides</a>
          <a href="#" className="hover:text-green-600">Transport</a>
          <a href="#" className="hover:text-green-600">Dashboard</a>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-color-white text-black" size="icon">
                <Globe className="h-5 w-5 hover:bg-color-white-100" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>हिंदी</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Auth */}
          <Button>Login</Button>
          <Button>Plan Your Trip</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
