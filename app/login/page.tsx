"use client";

import { useState } from "react";
import type { Metadata } from "next";

/* ---------- tiny reusable input ---------- */
function Field({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-500 font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? label}
        className="w-full px-3 py-2 rounded-lg bg-[#f0ede6] border border-transparent focus:border-indigo-400 focus:outline-none text-sm text-gray-700 placeholder:text-gray-400 transition"
      />
    </div>
  );
}

/* ---------- OAuth button ---------- */
function OAuthButton({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-sm text-gray-700 font-medium shadow-sm transition"
    >
      {icon}
      {label}
    </button>
  );
}

/* ---------- Google icon ---------- */
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden>
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

/* ---------- GitHub icon ---------- */
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

/* ---------- page ---------- */
export default function LoginPage() {
  /* register state */
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regVerifyEmail, setRegVerifyEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regVerifyPassword, setRegVerifyPassword] = useState("");

  /* login state */
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <main className="flex items-center justify-center h-full bg-[#faf9f5] px-4 py-12">
      <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* ── Register ── */}
        <div className="order-2 sm:order-1 bg-white rounded-2xl shadow-lg p-7 flex flex-col gap-5">
          <div className="flex items-center gap-2">
            {/* person-plus icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor" className="w-4 h-4 text-indigo-500" aria-hidden>
              <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0c73.3 0 135.9 45 163 109.9c2.5 6.2 4.7 12.6 6.5 19.1H29.7C13.3 433 0 419.7 0 403.3C0 396.2 .8 389.2 2.3 482.3zm448 .7l0-112 48 0 0 112-48 0zm112-112l0 112-48 0 0-112 48 0zm-56-24a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm-16-152l0-48 48 0 0 48 48 0 0 48-48 0 0 48-48 0 0-48-48 0 0-48 48 0z"/>
            </svg>
            <h2 className="text-sm font-semibold text-gray-600 tracking-wide">register</h2>
          </div>

          <form onSubmit={handleRegister} className="flex flex-col gap-3">
            <Field label="username" value={regUsername} onChange={setRegUsername} />
            <Field label="email" type="email" value={regEmail} onChange={setRegEmail} />
            <Field label="verify email" type="email" value={regVerifyEmail} onChange={setRegVerifyEmail} />
            <Field label="password" type="password" value={regPassword} onChange={setRegPassword} />
            <Field label="verify password" type="password" value={regVerifyPassword} onChange={setRegVerifyPassword} />

            <button
              type="submit"
              className="mt-1 flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor" className="w-3.5 h-3.5" aria-hidden>
                <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0c73.3 0 135.9 45 163 109.9c2.5 6.2 4.7 12.6 6.5 19.1H29.7C13.3 433 0 419.7 0 403.3C0 396.2 .8 389.2 2.3 482.3zm448 .7l0-112 48 0 0 112-48 0zm112-112l0 112-48 0 0-112 48 0zm-56-24a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm-16-152l0-48 48 0 0 48 48 0 0 48-48 0 0 48-48 0 0-48-48 0 0-48 48 0z"/>
              </svg>
              sign up
            </button>
          </form>
        </div>

        {/* ── Login ── */}
        <div className="order-1 sm:order-2 bg-white rounded-2xl shadow-lg p-7 flex flex-col gap-5">
          <div className="flex items-center gap-2">
            {/* arrow-right-to-bracket icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4 text-indigo-500" aria-hidden>
              <path d="M352 96l64 0c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c53 0 96-43 96-96l0-256c0-53-43-96-96-96l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-9.4 182.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L242.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"/>
            </svg>
            <h2 className="text-sm font-semibold text-gray-600 tracking-wide">login</h2>
          </div>

          {/* OAuth */}
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <OAuthButton label="Google" icon={<GoogleIcon />} />
              <OAuthButton label="GitHub" icon={<GitHubIcon />} />
            </div>
            <div className="flex items-center gap-3 my-1">
              <span className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">or</span>
              <span className="flex-1 h-px bg-gray-200" />
            </div>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <Field label="email" type="email" value={loginEmail} onChange={setLoginEmail} />
            <Field label="password" type="password" value={loginPassword} onChange={setLoginPassword} />

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-indigo-600 rounded"
              />
              <span className="text-xs text-gray-500">remember me</span>
            </label>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-3.5 h-3.5" aria-hidden>
                <path d="M352 96l64 0c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c53 0 96-43 96-96l0-256c0-53-43-96-96-96l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-9.4 182.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L242.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"/>
              </svg>
              sign in
            </button>

            <p className="text-right">
              <button
                type="button"
                className="text-xs text-gray-400 hover:text-indigo-500 transition"
              >
                forgot password?
              </button>
            </p>
          </form>
        </div>

      </div>
    </main>
  );
}
