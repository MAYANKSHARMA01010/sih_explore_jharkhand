/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../../components/common/navbar";
import Footer from "../../components/common/footer";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [method, setMethod] = useState("email");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [loader, setLoader] = useState(false);
  const [sendOTP, setSendOTP] = useState(false);

  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Simulate sending OTP
  const handleSendOtp = () => {
    const email = formData.email.trim();
    if (!email) return alert("Please enter your email!");
    if (!isValidEmail(email)) return alert("Invalid email!");

    setLoader(true);
    setTimeout(() => {
      alert(`OTP sent to ${email}`);
      setStep(2);
      setSendOTP(true);
      setResendTimer(60);
      setLoader(false);
    }, 1000);
  };

  const handleVerifyOtp = () => {
    if (!otp) return alert("Please enter OTP!");
    // For testing, accept any OTP
    alert("OTP verified!");
    setStep(3);
  };

  const handleRegister = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword)
      return alert("All fields are required!");
    if (formData.password !== formData.confirmPassword)
      return alert("Passwords do not match!");
    alert("Registered successfully! Redirecting to login...");
    router.push("/login");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-300 py-20">
        <div className="w-full max-w-md p-10 rounded-2xl bg-gray-50 border border-gray-200 shadow-lg flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Register</h2>

          {/* Method Toggle */}
          <div className="flex justify-center gap-4">
            <button
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                method === "email" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setMethod("email")}
            >
              Email
            </button>
            <button
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                method === "phone" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => alert("Phone registration not implemented!")}
            >
              Phone
            </button>
          </div>

          {/* Step 1: Email */}
          {step === 1 && method === "email" && (
            <>
              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 transition-all"
              />
              <button
                onClick={handleSendOtp}
                disabled={loader || !isValidEmail(formData.email)}
                className="w-full py-3 rounded-lg bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition-all disabled:opacity-70"
              >
                {loader ? "Sending OTP..." : "Send OTP"}
              </button>
            </>
          )}

          {/* Step 2: OTP */}
          {step === 2 && method === "email" && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 transition-all"
              />
              <button
                onClick={handleVerifyOtp}
                className="w-full py-3 rounded-lg bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition-all"
              >
                Verify OTP
              </button>
              <button
                onClick={() => setStep(1)}
                className="w-full py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-all"
              >
                Change Email
              </button>
            </>
          )}

          {/* Step 3: Profile & Password */}
          {step === 3 && (
            <>
              <input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 transition-all"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 transition-all"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600"
                >
                  {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>

              <button
                onClick={handleRegister}
                disabled={loader}
                className="w-full py-3 rounded-lg bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition-all disabled:opacity-70"
              >
                {loader ? "Registering..." : "Register"}
              </button>
            </>
          )}

          <p className="text-gray-600 text-center">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-green-600 font-semibold cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
