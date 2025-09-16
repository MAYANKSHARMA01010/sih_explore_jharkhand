"use client";

import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import logo from "../../../public/Logo.png";
import { useRouter } from "next/navigation";

function Footer() {
  const router = useRouter();

  return (
    <footer className="relative overflow-hidden bg-gray-950 text-white">
      {/* Background overlay*/}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Info */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <Image
              src={logo}
              alt="Johar Logo"
              width={50}
              height={50}
              className="drop-shadow-md"
            />
            <h2 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-400 to-yellow-400 bg-clip-text text-transparent">
              Johar
            </h2>
          </div>
          <p className="text-gray-300 text-sm leading-6 mb-6">
            Explore Jharkhand with AI-powered planning, authentic cultural
            experiences, and sustainable tourism that empowers local communities.
          </p>
          <div className="space-y-2 text-sm text-gray-400">
            <p className="flex items-center gap-2">
              <MapPin size={16} /> Ranchi, Jharkhand, India
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} /> +91 12345 67890
            </p>
            <p className="flex items-center gap-2">
              <Mail size={16} /> hello@johar.com
            </p>
          </div>
          <div className="flex gap-3 mt-5">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-2 bg-white/10 rounded-lg hover:bg-emerald-500/30 transition-all duration-300"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <button
                onClick={() => router.push("/destinations")}
                className="hover:text-emerald-400 transition-colors"
              >
                Destinations
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/marketplace")}
                className="hover:text-emerald-400 transition-colors"
              >
                Marketplace
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/guides")}
                className="hover:text-emerald-400 transition-colors"
              >
                Guides
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/transport")}
                className="hover:text-emerald-400 transition-colors"
              >
                Transport
              </button>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <button
                onClick={() => router.push("/plan-trip")}
                className="hover:text-emerald-400 transition-colors"
              >
                AI Trip Planner
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/marketplace")}
                className="hover:text-emerald-400 transition-colors"
              >
                Handicrafts Marketplace
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/guides")}
                className="hover:text-emerald-400 transition-colors"
              >
                Local Guides
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/dashboard")}
                className="hover:text-emerald-400 transition-colors"
              >
                Dashboard
              </button>
            </li>
          </ul>
        </div>

        {/* Auth */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Join Us</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <button
                onClick={() => router.push("/login")}
                className="hover:text-emerald-400 transition-colors"
              >
                Login
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/plan-trip")}
                className="hover:text-emerald-400 transition-colors"
              >
                Plan Your Trip
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10 mt-10"></div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} Johar. All rights reserved.</p>
        <p className="text-emerald-400 font-medium mt-2 md:mt-0">
          Where Culture Meets Technology
        </p>
      </div>
    </footer>
  );
}

export default Footer;
