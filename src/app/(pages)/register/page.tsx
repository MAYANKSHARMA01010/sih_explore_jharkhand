/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Navbar from "@/app/components/common/navbar";
import React, { useState, useEffect } from "react";
import heroImage from "../../../public/heroImage.jpg";

type Role = "user" | "guide" | "shopkeeper";
type VerificationMethod = "email" | "phone";

export default function SignupPage() {
  const [role, setRole] = useState<Role | null>(null);
  const [name, setName] = useState("");

  const [userMethod, setUserMethod] = useState<VerificationMethod>("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [aadharNumber, setAadharNumber] = useState("");
  const [aadharOtpSentId, setAadharOtpSentId] = useState<string | null>(null);
  const [aadharOtp, setAadharOtp] = useState("");
  const [aadharVerified, setAadharVerified] = useState(false);
  const [aadharUploadFile, setAadharUploadFile] = useState<File | null>(null);

  const [otpSentId, setOtpSentId] = useState<string | null>(null);
  const [otpCode, setOtpCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendCounter, setResendCounter] = useState<number>(0);

  useEffect(() => {
    let t: number | undefined;
    if (resendCounter > 0)
      t = window.setTimeout(() => setResendCounter(resendCounter - 1), 1000);
    return () => {
      if (t !== undefined) clearTimeout(t);
    };
  }, [resendCounter]);

  const isValidEmail = (e: string) => /^\S+@\S+\.\S+$/.test(e);
  const isValidPhone = (p: string) =>
    /^\d{10,15}$/.test(p.replace(/[^0-9]/g, ""));
  const isValidAadhar = (a: string) =>
    /^\d{12}$/.test(a.replace(/[^0-9]/g, ""));

  async function postJSON(url: string, body: any) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || "Request failed");
      return json;
    } catch (err: any) {
      setError(err.message || "Network error");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function sendOtp(
    method: VerificationMethod,
    value: string,
    purpose: string
  ) {
    if (method === "email" && !isValidEmail(value)) return setError("Enter a valid email");
    if (method === "phone" && !isValidPhone(value))
      return setError("Enter a valid phone number (10-15 digits)");

    try {
      const payload = { method, value, purpose, role };
      const json = await postJSON("/api/send-otp", payload);
      setOtpSentId(json.sentId ?? null);
      setResendCounter(json.ttlSeconds ?? 120);
    } catch (err) {}
  }

  async function verifyOtp(sentId: string | null, code: string) {
    if (!sentId) return setError("No OTP request found");
    if (!code) return setError("Enter OTP");

    try {
      const json = await postJSON("/api/verify-otp", { sentId, code });
      if (json.verified) setIsVerified(true);
    } catch (err) {}
  }

  async function sendAadharOtp() {
    if (!isValidAadhar(aadharNumber)) return setError("Aadhar must be 12 digits");
    try {
      const json = await postJSON("/api/aadhar/send-otp", { aadharNumber });
      setAadharOtpSentId(json.sentId ?? null);
      setResendCounter(json.ttlSeconds ?? 120);
    } catch (err) {}
  }

  async function verifyAadharOtp() {
    if (!aadharOtpSentId) return setError("No aadhar OTP request");
    if (!aadharOtp) return setError("Enter aadhar OTP");

    try {
      const json = await postJSON("/api/aadhar/verify-otp", {
        sentId: aadharOtpSentId,
        code: aadharOtp,
      });
      if (json.verified) setAadharVerified(true);
    } catch (err) {}
  }

  function onUploadAadhar(e: React.ChangeEvent<HTMLInputElement>) {
    setAadharUploadFile(e.target.files?.[0] ?? null);
  }

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center relative animate-zoom-slow"
        style={{ backgroundImage: `url(${heroImage.src})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative w-full max-w-md bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 transform transition-all duration-700 scale-95 opacity-0 animate-fade-in">
          <h2 className="text-3xl font-extrabold text-green-800 mb-6 text-center">Create Account</h2>

          {!role && (
            <div className="space-y-3 text-center">
              <p className="text-black font-medium">Register as:</p>
              <div className="flex justify-center gap-3">
                <button className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition" onClick={() => setRole("user")}>User</button>
                <button className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition" onClick={() => setRole("guide")}>Guide</button>
                <button className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition" onClick={() => setRole("shopkeeper")}>Shopkeeper</button>
              </div>
            </div>
          )}

          {role && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Role: <strong>{role}</strong></span>
                <button className="text-sm underline" onClick={() => setRole(null)}>Change</button>
              </div>

              <label className="block relative">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="peer w-full px-4 pt-5 pb-2 rounded-xl border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <span className="absolute left-4 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-green-600 peer-focus:text-sm">
                  Name
                </span>
              </label>

              {role === "user" && (
                <div className="p-4 border rounded-lg space-y-4">
                  <p className="text-sm">Sign up options:</p>
                  <div className="flex gap-4">
                    <label className="inline-flex items-center gap-2">
                      <input type="radio" checked={userMethod === "email"} onChange={() => setUserMethod("email")} /> Email
                    </label>
                    <label className="inline-flex items-center gap-2">
                      <input type="radio" checked={userMethod === "phone"} onChange={() => setUserMethod("phone")} /> Phone
                    </label>
                  </div>

                  {userMethod === "email" && (
                    <label className="block relative">
                      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="peer w-full px-4 pt-5 pb-2 rounded-xl border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                      <span className="absolute left-4 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-green-600 peer-focus:text-sm">Email</span>
                    </label>
                  )}

                  {userMethod === "phone" && (
                    <label className="block relative">
                      <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="10-digit phone" className="peer w-full px-4 pt-5 pb-2 rounded-xl border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                      <span className="absolute left-4 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-green-600 peer-focus:text-sm">Phone</span>
                    </label>
                  )}

                  {(userMethod === "email" || userMethod === "phone") && (
                    <div className="flex gap-2 mt-2">
                      <button className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition" onClick={() => sendOtp(userMethod, userMethod === "email" ? email : phone, "signup_user")}>Send OTP</button>
                      <button className="px-4 py-2 rounded-xl border border-green-600 text-green-600 hover:bg-green-50 transition" disabled={!otpSentId || resendCounter > 0} onClick={() => sendOtp(userMethod, userMethod === "email" ? email : phone, "signup_user")}>Resend OTP</button>
                    </div>
                  )}

                  {otpSentId && (
                    <label className="block relative mt-2">
                      <input value={otpCode} onChange={e => setOtpCode(e.target.value)} placeholder="123456" className="peer w-full px-4 pt-5 pb-2 rounded-xl border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                      <span className="absolute left-4 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-green-600 peer-focus:text-sm">Enter OTP</span>
                      <button className="mt-2 px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition" onClick={() => verifyOtp(otpSentId, otpCode)}>Verify OTP</button>
                    </label>
                  )}

                  {isVerified && (
                    <button className="w-full mt-2 px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition">Create Account</button>
                  )}
                </div>
              )}

              {(role === "guide" || role === "shopkeeper") && (
                <div className="p-4 border rounded-lg space-y-4">
                  <label className="block relative">
                    <input value={aadharNumber} onChange={e => setAadharNumber(e.target.value)} placeholder="123412341234" className="peer w-full px-4 pt-5 pb-2 rounded-xl border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                    <span className="absolute left-4 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-green-600 peer-focus:text-sm">Aadhar Number</span>
                  </label>

                  <input type="file" accept="image/*,application/pdf" className="block mt-2" onChange={onUploadAadhar} />

                  <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition" onClick={sendAadharOtp}>Send Aadhar OTP</button>
                    <button className="px-4 py-2 rounded-xl border border-green-600 text-green-600 hover:bg-green-50 transition" disabled={!aadharOtpSentId || resendCounter > 0} onClick={sendAadharOtp}>Resend OTP</button>
                  </div>

                  {aadharOtpSentId && (
                    <label className="block relative mt-2">
                      <input value={aadharOtp} onChange={e => setAadharOtp(e.target.value)} placeholder="OTP" className="peer w-full px-4 pt-5 pb-2 rounded-xl border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                      <span className="absolute left-4 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-green-600 peer-focus:text-sm">Enter Aadhar OTP</span>
                      <button className="mt-2 px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition" onClick={verifyAadharOtp}>Verify OTP</button>
                    </label>
                  )}

                  {aadharVerified && (
                    <label className="block relative mt-2">
                      <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="10-digit phone" className="peer w-full px-4 pt-5 pb-2 rounded-xl border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                      <span className="absolute left-4 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-green-600 peer-focus:text-sm">Phone</span>
                    </label>
                  )}
                </div>
              )}

              {error && <div className="text-red-700 text-sm mt-2">{error}</div>}
              {loading && <div className="text-gray-200 text-sm mt-2 animate-pulse">Working... please wait</div>}
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes zoom-slow {0% {transform: scale(1);}50% {transform: scale(1.05);}100% {transform: scale(1);}}
        .animate-zoom-slow {animation: zoom-slow 20s ease-in-out infinite;}
        @keyframes fade-in {0% {opacity:0; transform: scale(0.95);}100% {opacity:1; transform: scale(1);}}
        .animate-fade-in {animation: fade-in 0.6s ease forwards;}
      `}</style>
    </>
  );
}
