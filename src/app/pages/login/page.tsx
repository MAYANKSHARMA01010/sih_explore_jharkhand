"use client";

import React, { useState } from "react";
import Navbar from "../../components/common/navbar";
import Footer from "../../components/common/footer";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [method, setMethod] = useState("email");
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
  });

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = () => {
    if (method === "email") {
      if (!isValidEmail(formData.email.trim())) {
        alert("Please enter a valid email!");
        return;
      }
    } else if (method === "phone") {
      alert("Phone login is not implemented yet.");
      return;
    }

    if (!formData.password) {
      alert("Password is required!");
      return;
    }

    setLoader(true);
    setTimeout(() => {
      alert("Login successful!");
      router.push("/");
      setLoader(false);
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-300 py-20">
        <div className="w-full max-w-md p-10 rounded-2xl bg-gray-50 border border-gray-200 shadow-lg flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Welcome Back
          </h2>

          {/* Method Toggle */}
          <div className="flex justify-center gap-4">
            <button
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                method === "email"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setMethod("email")}
            >
              Email
            </button>
            <button
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                method === "phone"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => alert("Phone login is not implemented yet.")}
            >
              Phone
            </button>
          </div>

          {/* Email Input */}
          {method === "email" && (
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 transition-all"
            />
          )}

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600"
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loader}
            className="w-full py-3 rounded-lg bg-green-600 text-white font-semibold text-lg shadow-md hover:bg-green-700 transition-all disabled:opacity-70"
          >
            {loader ? "Logging in..." : "Login"}
          </button>

          <p className="text-gray-600 text-center">
            Don’t have an account?{" "}
            <span
              onClick={() => router.push("/register")}
              className="text-green-600 font-semibold cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
