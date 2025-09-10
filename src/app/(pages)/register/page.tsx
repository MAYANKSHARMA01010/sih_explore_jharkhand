/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";

/**
 * SignupWizard.tsx
 *
 * Single-file React + TypeScript component implementing the frontend logic for a
 * signup flow with three roles: "user", "guide", "shopkeeper".
 *
 * Behavior summary (frontend-only):
 * - Role selection: user | guide | shopkeeper
 * - user: choose phone OR email verification -> OTP flow -> account created immediately on success
 * - guide/shopkeeper: Aadhar verification (aadhar number -> send OTP -> verify) -> phone OTP -> then enter email
 *   an email verification link will be requested from backend and the account enters a "Pending email verification (24h)" state
 * - All network calls are placeholders (fetch to /api/...) and must be implemented server-side.
 * - Includes client-side validation, resend-timers, and error handling.
 *
 * Styling: Tailwind classes (no external CSS file needed). Replace or remove as desired.
 */

type Role = "user" | "guide" | "shopkeeper";

type VerificationMethod = "email" | "phone";

export default function SignupWizard() {
  const [role, setRole] = useState<Role | null>(null);

  // Common profile fields
  const [name, setName] = useState("");

  // For user role: allow user to pick email or phone OTP
  const [userMethod, setUserMethod] = useState<VerificationMethod>("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Aadhar flow data (guides & shopkeepers)
  const [aadharNumber, setAadharNumber] = useState("");
  const [aadharOtpSentId, setAadharOtpSentId] = useState<string | null>(null);
  const [aadharOtp, setAadharOtp] = useState("");
  const [aadharVerified, setAadharVerified] = useState(false);
  const [aadharUploadFile, setAadharUploadFile] = useState<File | null>(null);

  // Phone/email OTP common
  const [otpSentId, setOtpSentId] = useState<string | null>(null);
  const [otpCode, setOtpCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // UI state
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // For resend timers
  const [resendCounter, setResendCounter] = useState<number>(0);
  useEffect(() => {
    let t: number | undefined;
    if (resendCounter > 0) t = window.setTimeout(() => setResendCounter(resendCounter - 1), 1000);
    return () => {
      if (t !== undefined) {
        clearTimeout(t);
      }
    };
  }, [resendCounter]);

  // small validators
  const isValidEmail = (e: string) => /^\S+@\S+\.\S+$/.test(e);
  const isValidPhone = (p: string) => /^\d{10,15}$/.test(p.replace(/[^0-9]/g, ""));
  const isValidAadhar = (a: string) => /^\d{12}$/.test(a.replace(/[^0-9]/g, ""));

  // helper: generic POST
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

  // ---------- OTP flows (phone/email) ----------
  async function sendOtp(method: VerificationMethod, value: string, purpose: string) {
    if (method === "email" && !isValidEmail(value)) {
      setError("Enter a valid email");
      return;
    }
    if (method === "phone" && !isValidPhone(value)) {
      setError("Enter a valid phone number (digits only, 10-15)");
      return;
    }

    try {
      const payload = { method, value, purpose, role };
      // Example endpoint: POST /api/send-otp with {method, value, purpose, role}
      const json = await postJSON("/api/send-otp", payload);
      // json should contain e.g. { sentId: "abc123", ttlSeconds: 120 }
      setOtpSentId(json.sentId ?? null);
      setResendCounter(json.ttlSeconds ?? 120);
      setStep((s) => Math.max(s, 2));
    } catch (err) {
      // error set in postJSON
    }
  }

  async function verifyOtp(sentId: string | null, code: string) {
    if (!sentId) return setError("No OTP request found, please re-send OTP");
    if (!code || code.length < 4) return setError("Enter the OTP code");

    try {
      const json = await postJSON("/api/verify-otp", { sentId, code });
      if (json.verified) {
        setIsVerified(true);
        setStep((s) => Math.max(s, 3));
        return true;
      } else {
        setError("OTP incorrect or expired");
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  // ---------- Aadhar-specific flow (simulate) ----------
  async function sendAadharOtp() {
    if (!isValidAadhar(aadharNumber)) {
      setError("Aadhar must be 12 digits");
      return;
    }
    try {
      const json = await postJSON("/api/aadhar/send-otp", { aadharNumber });
      setAadharOtpSentId(json.sentId ?? null);
      setResendCounter(json.ttlSeconds ?? 120);
      setStep((s) => Math.max(s, 2));
    } catch (err) {
    }
  }

  async function verifyAadharOtp() {
    if (!aadharOtpSentId) return setError("No aadhar OTP request found");
    if (!aadharOtp) return setError("Enter aadhar OTP");
    try {
      const json = await postJSON("/api/aadhar/verify-otp", { sentId: aadharOtpSentId, code: aadharOtp });
      if (json.verified) {
        setAadharVerified(true);
        setStep((s) => Math.max(s, 3));
        // Backend might return KYC status: "auto_approved" or "manual_review"
        if (json.kycStatus === "manual_review") {
          setError("Aadhar uploaded & verified, but KYC requires manual review. We'll notify you by email when ready.");
        }
        return true;
      } else {
        setError("Aadhar OTP invalid or expired");
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  // After aadhar and phone verified, request email verification link
  async function requestEmailVerificationAndCreateAccount() {
    if (!isValidEmail(email)) return setError("Enter a valid email before proceeding");
    try {
      const json = await postJSON("/api/create-account-pending-email", {
        role,
        name,
        email,
        phone: phone || null,
        aadharNumber: aadharVerified ? aadharNumber : null,
        aadharUploadProvided: !!aadharUploadFile,
      });
      // backend should send email with a link that the user clicks to confirm (valid for 24 hours)
      setStep(99); // final pending state
    } catch (err) {
    }
  }

  // ---------- Submit for 'user' (email or phone OTP immediate creation) ----------
  async function submitUserSignup() {
    // depending on userMethod, we expect isVerified to be true and otpSentId present
    if (!isVerified) return setError("Please complete OTP verification first");
    try {
      const json = await postJSON("/api/create-account", {
        role: "user",
        name,
        email: userMethod === "email" ? email : null,
        phone: userMethod === "phone" ? phone : null,
      });
      // json.success -> account created
      setStep(100);
    } catch (err) {}
  }

  // ---------- small UI helpers ----------
  function resetErrors() {
    setError(null);
  }

  function onUploadAadhar(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setAadharUploadFile(f);
  }

  // ---------- Render ----------
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg text-black">
      <h2 className="text-2xl font-semibold mb-4">Create account</h2>

      {/* Role selection */}
      {!role && (
        <div>
          <p className="mb-2 text-black">Register as:</p>
          <div className="flex gap-3">
            <button className="btn" onClick={() => setRole("user")}>User</button>
            <button className="btn" onClick={() => setRole("guide")}>Guide</button>
            <button className="btn" onClick={() => setRole("shopkeeper")}>Shopkeeper</button>
          </div>
          <p className="mt-4 text-sm text-slate-600">Choose the role to see the required verification flow.</p>
        </div>
      )}

      {/* Common: show selected role and a back option */}
      {role && (
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-slate-500">Role</span>
              <h3 className="font-medium">{role}</h3>
            </div>
            <button className="text-sm underline" onClick={() => { setRole(null); setStep(1); }}>Change</button>
          </div>

          <div className="mt-4 space-y-4">
            <label className="block">
              <span className="text-sm">Name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 input" placeholder="Your full name" />
            </label>

            {/* Role-specific flows */}
            {role === "user" && (
              <div className="p-4 border rounded-lg">
                <p className="text-sm mb-2">Sign up options for users: choose a verification method</p>
                <div className="flex gap-2 mb-3">
                  <label className="inline-flex items-center">
                    <input type="radio" checked={userMethod === "email"} onChange={() => setUserMethod("email")} />
                    <span className="ml-2">Email</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" checked={userMethod === "phone"} onChange={() => setUserMethod("phone")} />
                    <span className="ml-2">Phone</span>
                  </label>
                </div>

                {userMethod === "email" && (
                  <div>
                    <label className="block">
                      <span className="text-sm">Email</span>
                      <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 input" placeholder="you@example.com" />
                    </label>
                    <div className="mt-3 flex gap-2">
                      <button className="btn" onClick={() => sendOtp("email", email, "signup_user_email")}>Send OTP</button>
                      <button className="btn-ghost" disabled={!otpSentId || resendCounter>0} onClick={() => sendOtp("email", email, "signup_user_email")}>Resend OTP</button>
                    </div>
                  </div>
                )}

                {userMethod === "phone" && (
                  <div>
                    <label className="block">
                      <span className="text-sm">Phone</span>
                      <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 input" placeholder="10-digit phone" />
                    </label>
                    <div className="mt-3 flex gap-2">
                      <button className="btn" onClick={() => sendOtp("phone", phone, "signup_user_phone")}>Send OTP</button>
                      <button className="btn-ghost" disabled={!otpSentId || resendCounter>0} onClick={() => sendOtp("phone", phone, "signup_user_phone")}>Resend OTP</button>
                    </div>
                  </div>
                )}

                {/* OTP input (shared) */}
                {otpSentId && (
                  <div className="mt-3">
                    <label className="block">
                      <span className="text-sm">Enter OTP</span>
                      <input value={otpCode} onChange={(e) => setOtpCode(e.target.value)} className="mt-1 input" placeholder="123456" />
                    </label>
                    <div className="mt-2 flex gap-2">
                      <button className="btn" onClick={() => verifyOtp(otpSentId, otpCode)}>Verify OTP</button>
                      <button className="btn-ghost" disabled={resendCounter>0} onClick={() => sendOtp(userMethod, userMethod === "email" ? email : phone, "signup_user")}>Resend ({resendCounter}s)</button>
                    </div>
                  </div>
                )}

                {/* On success allow final submit */}
                {isVerified && (
                  <div className="mt-3">
                    <p className="text-sm text-green-700">Verified! Ready to create your account.</p>
                    <button className="btn-primary mt-2" onClick={submitUserSignup}>Create Account</button>
                  </div>
                )}
              </div>
            )}

            {(role === "guide" || role === "shopkeeper") && (
              <div className="p-4 border rounded-lg space-y-4">
                <p className="text-sm">KYC for guides & shopkeepers</p>

                <label className="block">
                  <span className="text-sm">Aadhar number (12 digits)</span>
                  <input value={aadharNumber} onChange={(e) => setAadharNumber(e.target.value)} className="mt-1 input" placeholder="123412341234" />
                </label>

                <label className="block">
                  <span className="text-sm">Upload Aadhar (optional but recommended)</span>
                  <input type="file" accept="image/*,application/pdf" onChange={onUploadAadhar} />
                </label>

                <div className="flex gap-2">
                  <button className="btn" onClick={sendAadharOtp}>Send Aadhar OTP</button>
                  <button className="btn-ghost" disabled={!aadharOtpSentId || resendCounter>0} onClick={sendAadharOtp}>Resend Aadhar OTP</button>
                </div>

                {aadharOtpSentId && (
                  <div>
                    <label className="block mt-2">
                      <span className="text-sm">Enter Aadhar OTP</span>
                      <input value={aadharOtp} onChange={(e) => setAadharOtp(e.target.value)} className="mt-1 input" placeholder="OTP" />
                    </label>
                    <div className="mt-2">
                      <button className="btn" onClick={verifyAadharOtp}>Verify Aadhar OTP</button>
                      <span className="ml-2 text-sm">Resend in {resendCounter}s</span>
                    </div>
                  </div>
                )}

                {aadharVerified && (
                  <div className="mt-2 p-3 rounded border bg-slate-50">
                    <p className="text-sm">Aadhar verified. Next, verify your phone number.</p>
                    <label className="block mt-2">
                      <span className="text-sm">Phone</span>
                      <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 input" placeholder="10-digit phone" />
                    </label>
                    <div className="mt-2 flex gap-2">
                      <button className="btn" onClick={() => sendOtp("phone", phone, "kyc_phone")}>Send Phone OTP</button>
                      <button className="btn-ghost" disabled={!otpSentId || resendCounter>0} onClick={() => sendOtp("phone", phone, "kyc_phone")}>Resend</button>
                    </div>

                    {otpSentId && (
                      <div className="mt-2">
                        <label className="block">
                          <span className="text-sm">Phone OTP</span>
                          <input value={otpCode} onChange={(e) => setOtpCode(e.target.value)} className="mt-1 input" placeholder="OTP" />
                        </label>
                        <div className="mt-2">
                          <button className="btn" onClick={async () => {
                            const ok = await verifyOtp(otpSentId, otpCode);
                            if (ok) setStep(4);
                          }}>Verify Phone</button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* After phone verification, collect email to send 24-hour verification link */}
                {step >= 4 && (
                  <div className="mt-2">
                    <label className="block">
                      <span className="text-sm">Email (we will send a verification link - valid 24 hours)</span>
                      <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 input" placeholder="your@email.com" />
                    </label>
                    <div className="mt-2">
                      <button className="btn-primary" onClick={requestEmailVerificationAndCreateAccount}>Send Email Verification & Create Pending Account</button>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* Errors and loading */}
            {error && <div className="mt-3 text-sm text-red-700">{error}</div>}
            {loading && <div className="mt-3 text-sm text-slate-500">Working... please wait.</div>}

            {/* Final/pending states */}
            {step === 99 && (
              <div className="mt-4 p-4 rounded bg-yellow-50 border">
                <h4 className="font-medium">Pending email verification</h4>
                <p className="text-sm">We've sent an email with a verification link. The account will be activated once the email is verified (link valid for 24 hours). If not verified, the account will remain pending and may be removed per your backend policy.</p>
              </div>
            )}

            {step === 100 && (
              <div className="mt-4 p-4 rounded bg-green-50 border">
                <h4 className="font-medium">Account created</h4>
                <p className="text-sm">Your account has been created successfully. You can now log in.</p>
              </div>
            )}

          </div>
        </div>
      )}

      <style jsx>{`
        /* Inputs */
        .input {
          width: 100%;
          padding: 0.65rem 0.9rem;
          border: 1px solid #e6eef0;
          border-radius: 0.75rem;
          color: #0f172a;
          background: #ffffff;
          transition: box-shadow 0.15s ease, border-color 0.15s ease, transform 0.06s ease;
        }
        .input:focus {
          outline: none;
          border-color: #16a34a; /* green-600 */
          box-shadow: 0 6px 18px rgba(22,163,74,0.08), 0 0 0 4px rgba(16,185,129,0.06);
          transform: translateY(-1px);
        }

        /* Buttons - neutral */
        .btn {
          padding: 0.55rem 0.85rem;
          background: linear-gradient(180deg, #f8faf9 0%, #f3f7f4 100%);
          border-radius: 0.7rem;
          border: 1px solid rgba(16,185,129,0.12);
          color: #064e3b;
          font-weight: 600;
          box-shadow: 0 1px 0 rgba(2,6,23,0.03);
          cursor: pointer;
          transition: transform 0.08s ease, box-shadow 0.12s ease, background 0.12s ease;
        }
        .btn:hover {
          transform: translateY(-1px);
          background: linear-gradient(180deg, #eefbf4 0%, #e6f7ee 100%);
        }
        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        /* Ghost button - transparent variant */
        .btn-ghost {
          padding: 0.55rem 0.85rem;
          background: transparent;
          border-radius: 0.7rem;
          color: #15803d;
          font-weight: 600;
          border: 1px dashed rgba(21,128,61,0.12);
          cursor: pointer;
          transition: background 0.12s ease, color 0.12s ease;
        }
        .btn-ghost:hover {
          background: rgba(16,185,129,0.06);
        }
        .btn-ghost:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Primary (accent) button */
        .btn-primary {
          padding: 0.6rem 0.95rem;
          background: linear-gradient(180deg, #16a34a 0%, #15803d 100%);
          color: #ffffff;
          border-radius: 0.75rem;
          border: 1px solid rgba(8,145,102,0.16);
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(6,95,70,0.08);
          transition: transform 0.08s ease, box-shadow 0.12s ease, filter 0.12s ease;
        }
        .btn-primary:hover {
          transform: translateY(-1px);
          filter: brightness(1.03);
        }
        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        /* File input (subtle) */
        input[type="file"] {
          margin-top: 0.5rem;
          display: block;
        }

        /* Tiny responsive tweaks */
        @media (max-width: 640px) {
          .input { padding: 0.6rem; }
          .btn, .btn-ghost, .btn-primary { padding: 0.55rem 0.75rem; font-size: 0.95rem; }
        }
      `}</style>
    </div>
  );
}
