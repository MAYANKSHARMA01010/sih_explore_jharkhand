/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/common/navbar";
import Footer from "@/app/components/common/footer";

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
    if (resendCounter > 0) t = window.setTimeout(() => setResendCounter(resendCounter - 1), 1000);
    return () => { if (t !== undefined) clearTimeout(t); };
  }, [resendCounter]);

  const isValidEmail = (e: string) => /^\S+@\S+\.\S+$/.test(e);
  const isValidPhone = (p: string) => /^\d{10,15}$/.test(p.replace(/[^0-9]/g, ""));

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

  /* Password login */
  async function submitPasswordLogin() {
    if (!isValidEmail(identifier)) return setError("Enter a valid email");
    if (!password || password.length < 6) return setError("Enter your password (min 6 chars)");
    try {
      const json = await postJSON("/api/login", { method: "password", email: identifier, password });
      // expected: { success: true }
      setLoggedIn(true);
    } catch (err) {}
  }

  /* OTP flow */
  async function sendOtp() {
    // accept either email or phone
    const val = identifier.trim();
    if (isValidEmail(val)) {
      // email
    } else if (isValidPhone(val)) {
      // phone
    } else {
      return setError("Enter a valid email or phone number");
    }

    try {
      const json = await postJSON("/api/send-otp", { method: isValidEmail(identifier) ? "email" : "phone", value: identifier, purpose: "login" });
      setOtpSentId(json.sentId ?? null);
      setResendCounter(json.ttlSeconds ?? 120);
    } catch (err) {}
  }

  async function verifyOtp() {
    if (!otpSentId) return setError("No OTP request found. Please send OTP first.");
    if (!otpCode || otpCode.length < 4) return setError("Enter the OTP code");
    try {
      const json = await postJSON("/api/verify-otp", { sentId: otpSentId, code: otpCode });
      if (json.verified) setLoggedIn(true);
      else setError("OTP invalid or expired");
    } catch (err) {}
  }

  function resetError() { setError(null); }

  return (
   <>
   <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-green-300 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-green-100">
        <h1 className="text-2xl font-bold text-green-700 mb-1">Welcome back</h1>
        <p className="text-sm text-gray-600 mb-6">Sign in to your account — choose password or OTP login.</p>

        <div className="flex gap-2 mb-4">
          <button className={`tab ${mode === 'password' ? 'tab-active' : ''}`} onClick={() => { setMode('password'); setOtpSentId(null); setOtpCode(''); setError(null); }}>Password</button>
          <button className={`tab ${mode === 'otp' ? 'tab-active' : ''}`} onClick={() => { setMode('otp'); setPassword(''); setError(null); }}>OTP</button>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="text-sm text-gray-700">Email or Phone</span>
            <input value={identifier} onChange={(e) => setIdentifier(e.target.value)} className="mt-1 input" placeholder="you@example.com or 9999999999" />
          </label>

          {mode === 'password' && (
            <>
              <label className="block">
                <span className="text-sm text-gray-700">Password</span>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 input" placeholder="Your password" />
              </label>

              <div className="flex items-center justify-between">
                <button className="btn-primary" onClick={submitPasswordLogin} disabled={loading}>Sign in</button>
                <button className="btn-ghost" onClick={() => {/* forgot password flow placeholder */}}>Forgot?</button>
              </div>
            </>
          )}

          {mode === 'otp' && (
            <>
              <div className="flex gap-2">
                <button className="btn" onClick={sendOtp} disabled={!!otpSentId || resendCounter>0}>Send OTP</button>
                <button className="btn-ghost" disabled={!otpSentId || resendCounter>0} onClick={sendOtp}>Resend</button>
                <div className="ml-auto text-sm text-gray-500 self-center">{resendCounter>0 ? `${resendCounter}s` : ''}</div>
              </div>

              {otpSentId && (
                <div>
                  <label className="block mt-2">
                    <span className="text-sm text-gray-700">Enter OTP</span>
                    <input value={otpCode} onChange={(e) => setOtpCode(e.target.value)} className="mt-1 input" placeholder="123456" />
                  </label>
                  <div className="mt-3 flex items-center gap-2">
                    <button className="btn-primary" onClick={verifyOtp}>Verify & Sign in</button>
                    <button className="btn" onClick={() => { setOtpSentId(null); setOtpCode(''); }}>Cancel</button>
                  </div>
                </div>
              )}
            </>
          )}

          {error && <div className="text-sm text-red-700 bg-red-50 p-2 rounded mt-2">{error}</div>}
          {loading && <div className="text-sm text-gray-600">Working... please wait.</div>}

          {loggedIn && (
            <div className="mt-4 p-3 rounded bg-green-50 border border-green-100 text-green-800">You are signed in — redirecting...</div>
          )}

          <div className="mt-4 text-sm text-gray-600">Don't have an account? <a className="text-green-700 underline" onClick={() => router.push("/register")}>Create one</a></div>
        </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 0.65rem 0.9rem;
          border: 1px solid #e6eef0;
          border-radius: 0.75rem;
          color: #0f172a;
          background: #ffffff;
        }
        .input:focus {
          outline: none;
          border-color: #16a34a;
          box-shadow: 0 6px 18px rgba(22,163,74,0.06), 0 0 0 4px rgba(16,185,129,0.04);
          transform: translateY(-1px);
        }

        .btn {
          padding: 0.55rem 0.85rem;
          background: linear-gradient(180deg, #f8faf9 0%, #f3f7f4 100%);
          border-radius: 0.7rem;
          border: 1px solid rgba(16,185,129,0.08);
          color: #064e3b;
          font-weight: 600;
          cursor: pointer;
        }
        .btn:hover { transform: translateY(-1px); }

        .btn-ghost {
          padding: 0.55rem 0.85rem;
          background: transparent;
          border-radius: 0.7rem;
          color: #15803d;
          font-weight: 600;
          border: 1px dashed rgba(21,128,61,0.08);
        }

        .btn-primary {
          padding: 0.6rem 0.95rem;
          background: linear-gradient(180deg, #16a34a 0%, #15803d 100%);
          color: #ffffff;
          border-radius: 0.75rem;
          border: 1px solid rgba(8,145,102,0.12);
          font-weight: 700;
          cursor: pointer;
        }

        .tab {
          padding: 0.45rem 0.75rem;
          border-radius: 0.65rem;
          border: 1px solid transparent;
          background: transparent;
          color: #065f46;
          font-weight: 700;
          cursor: pointer;
        }
        .tab-active {
          background: linear-gradient(180deg, rgba(16,185,129,0.14) 0%, rgba(16,185,129,0.08) 100%);
          border-color: rgba(16,185,129,0.14);
          box-shadow: 0 6px 18px rgba(16,185,129,0.06);
        }

        @media (max-width: 640px) {
          .input { padding: 0.6rem; }
          .btn, .btn-ghost, .btn-primary { padding: 0.5rem 0.7rem; font-size: 0.95rem; }
        }
      `}</style>
      </div>
    </div>
    <Footer />
   </>
  );
}
