"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/common/navbar";
import heroImage from "../../../public/heroImage.jpg";

type LoginMode = "password" | "otp";

export default function LoginPage() {
  const [mode, setMode] = useState<LoginMode>("password");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpSentId, setOtpSentId] = useState<string | null>(null);
  const [resendCounter, setResendCounter] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

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

  async function postJSON<T>(url: string, body: Record<string, unknown>): Promise<T> {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = (await res.json()) as T;
      if (!res.ok) throw new Error((json as any)?.message || "Request failed");
      return json;
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Network error");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  const resetAll = () => {
    setIdentifier("");
    setPassword("");
    setOtpCode("");
    setOtpSentId(null);
    setError(null);
    setResendCounter(0);
  };

  async function submitPasswordLogin() {
    if (!isValidEmail(identifier)) return setError("Enter a valid email");
    if (!password || password.length < 6)
      return setError("Enter your password (min 6 chars)");

    await postJSON<{ success: boolean }>("/api/login", {
      method: "password",
      email: identifier,
      password,
    });

    setLoggedIn(true);
    resetAll();
  }

  async function sendOtp() {
    const val = identifier.trim();
    if (!isValidEmail(val) && !isValidPhone(val))
      return setError("Enter a valid email or phone number");

    const json = await postJSON<{ sentId: string; ttlSeconds: number }>("/api/send-otp", {
      method: isValidEmail(identifier) ? "email" : "phone",
      value: identifier,
      purpose: "login",
    });

    setOtpSentId(json.sentId ?? null);
    setResendCounter(json.ttlSeconds ?? 120);
    setOtpCode(""); // Reset OTP input
  }

  async function verifyOtp() {
    if (!otpSentId) return setError("No OTP request found. Please send OTP first.");
    if (!otpCode || otpCode.length < 4) return setError("Enter the OTP code");

    const json = await postJSON<{ verified: boolean }>("/api/verify-otp", {
      sentId: otpSentId,
      code: otpCode,
    });

    if (json.verified) {
      setLoggedIn(true);
      resetAll();
    } else {
      setError("OTP invalid or expired");
    }
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
          <h1 className="text-3xl font-extrabold text-green-800 mb-2 text-center">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-700 mb-6 text-center">
            Sign in to your account using Password or OTP
          </p>

          <div className="flex justify-center gap-3 mb-6">
            <button
              className={`px-5 py-2 rounded-xl font-bold text-green-800 transition-all duration-300 ${
                mode === "password"
                  ? "bg-green-100 border border-green-200 shadow-lg scale-105"
                  : "bg-transparent border border-transparent hover:bg-green-50"
              }`}
              onClick={() => {
                setMode("password");
                resetAll();
              }}
            >
              Password
            </button>
            <button
              className={`px-5 py-2 rounded-xl font-bold text-green-800 transition-all duration-300 ${
                mode === "otp"
                  ? "bg-green-100 border border-green-200 shadow-lg scale-105"
                  : "bg-transparent border border-transparent hover:bg-green-50"
              }`}
              onClick={() => {
                setMode("otp");
                resetAll();
              }}
            >
              OTP
            </button>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                id="identifier"
                className="peer w-full px-5 py-3 rounded-2xl border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"
                placeholder="Your email or phone"
              />
              <label
                htmlFor="identifier"
                className={`absolute left-5 text-gray-400 text-sm transition-all cursor-text select-none
                  ${identifier ? "top-0 text-green-700 text-sm" : "top-3 text-gray-400 text-base"} 
                  peer-focus:top-0 peer-focus:text-green-700 peer-focus:text-sm`}
              >
                Email or Phone
              </label>
            </div>

            {mode === "password" && (
              <>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    className="peer w-full px-5 py-3 rounded-2xl border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"
                    placeholder="Your password"
                  />
                  <label
                    htmlFor="password"
                    className={`absolute left-5 text-gray-400 text-sm transition-all cursor-text select-none
                      ${password ? "top-0 text-green-700 text-sm" : "top-3 text-gray-400 text-base"} 
                      peer-focus:top-0 peer-focus:text-green-700 peer-focus:text-sm`}
                  >
                    Password
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-600 text-white rounded-2xl font-bold shadow-lg transform hover:-translate-y-1 transition"
                    onClick={submitPasswordLogin}
                    disabled={loading}
                  >
                    Sign in
                  </button>
                  <button className="px-4 py-2 text-green-700 font-semibold rounded-xl border border-dashed border-green-200 hover:bg-green-50 transition">
                    Forgot?
                  </button>
                </div>
              </>
            )}

            {mode === "otp" && (
              <>
                <div className="flex gap-2 mt-2">
                  <button
                    className="flex-1 px-4 py-3 bg-gray-100 text-green-700 rounded-xl font-semibold hover:bg-gray-200 transition transform hover:-translate-y-0.5"
                    onClick={sendOtp}
                    disabled={!!otpSentId || resendCounter > 0}
                  >
                    Send OTP
                  </button>
                  <button
                    className="px-4 py-3 text-green-700 rounded-xl border border-dashed border-green-200 font-semibold hover:bg-green-50 transition"
                    disabled={!otpSentId || resendCounter > 0}
                    onClick={sendOtp}
                  >
                    Resend
                  </button>
                  <div className="ml-auto text-sm text-gray-500 self-center">
                    {resendCounter > 0 ? `${resendCounter}s` : ""}
                  </div>
                </div>

                {otpSentId && (
                  <div className="mt-3 relative">
                    <input
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      id="otpCode"
                      className="peer w-full px-5 py-3 rounded-2xl border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"
                      placeholder="123456"
                    />
                    <label
                      htmlFor="otpCode"
                      className={`absolute left-5 text-gray-400 text-sm transition-all cursor-text select-none
                        ${otpCode ? "top-0 text-green-700 text-sm" : "top-3 text-gray-400 text-base"} 
                        peer-focus:top-0 peer-focus:text-green-700 peer-focus:text-sm`}
                    >
                      Enter OTP
                    </label>
                    <div className="flex gap-2 mt-3">
                      <button
                        className="flex-1 px-5 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-600 text-white rounded-2xl font-bold shadow-lg transform hover:-translate-y-1 transition"
                        onClick={verifyOtp}
                      >
                        Verify & Sign in
                      </button>
                      <button
                        className="px-5 py-3 bg-gray-100 text-green-700 rounded-2xl font-semibold hover:bg-gray-200 transition"
                        onClick={() => resetAll()}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {error && (
              <div className="text-sm text-red-700 bg-red-50 p-3 rounded mt-3 text-center font-medium animate-slide-in">
                {error}
              </div>
            )}
            {loading && (
              <div className="text-sm text-gray-200 text-center mt-2 animate-pulse">
                Working... please wait.
              </div>
            )}
            {loggedIn && (
              <div className="mt-4 p-3 rounded bg-green-50 border border-green-100 text-green-800 text-center font-medium animate-slide-in">
                You are signed in — redirecting...
              </div>
            )}

            <div className="mt-6 text-sm text-black text-center">
              Don&apos;t have an account?{" "}
              <a
                className="text-green-400 underline cursor-pointer hover:text-green-300 transition"
                onClick={() => router.push("/register")}
              >
                Create one
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes zoom-slow {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-zoom-slow {
          animation: zoom-slow 20s ease-in-out infinite;
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease forwards;
        }

        @keyframes slide-in {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.4s ease forwards;
        }
      `}</style>
    </>
  );
}
