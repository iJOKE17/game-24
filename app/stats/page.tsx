"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

export default function StatsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <main className="flex items-center justify-center min-h-[50vh] bg-[#faf9f5]">
        <div className="w-10 h-10 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" aria-hidden />
      </main>
    );
  }

  if (!session?.user) {
    return null;
  }

  const { user } = session;

  // Placeholder stats – replace with real data when you have a backend/db
  const stats = [
    { label: "Games played", value: "—", icon: "🎲" },
    { label: "Rounds won", value: "—", icon: "🏆" },
    { label: "Best time (sec)", value: "—", icon: "⏱️" },
    { label: "Current streak", value: "—", icon: "🔥" },
  ];

  return (
    <main className="flex flex-col items-center bg-[#faf9f5] px-4 py-12 min-h-full">
      <div className="w-full max-w-lg flex flex-col gap-6">
        {/* Profile card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 flex-shrink-0">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name ?? "Profile"}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  fill="currentColor"
                  className="w-10 h-10 text-gray-400"
                  aria-hidden
                >
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                </svg>
              </div>
            )}
          </div>
          <div className="text-center">
            <h1 className="text-lg font-semibold text-gray-800">
              {user.name ?? "User"}
            </h1>
            {user.email && (
              <p className="text-sm text-gray-500 mt-0.5">{user.email}</p>
            )}
          </div>
        </div>

        {/* Stats section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-sm font-semibold text-gray-600 tracking-wide mb-4 flex items-center gap-2">
            <span aria-hidden>📊</span>
            Your stats
          </h2>
          <ul className="grid grid-cols-2 gap-3">
            {stats.map(({ label, value, icon }) => (
              <li
                key={label}
                className="flex flex-col gap-1 p-3 rounded-xl bg-[#faf9f5] border border-gray-100"
              >
                <span className="text-xs text-gray-500 font-medium">{label}</span>
                <span className="text-lg font-semibold text-gray-800 flex items-center gap-1.5">
                  <span aria-hidden>{icon}</span>
                  {value}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-400 mt-3">
            Stats will be saved when you play while logged in.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            href="/play"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow transition"
          >
            Play game
          </Link>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 text-sm font-medium transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4" aria-hidden>
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 381.9c-8.5 8.5-22.3 8.5-30.8 0s-8.5-22.3 0-30.8l75.2-75.2H176c-12.4 0-22.4-10-22.4-22.4s10-22.4 22.4-22.4h246.3l-75.2-75.2c-8.5-8.5-8.5-22.3 0-30.8s22.3-8.5 30.8 0zM160 64c-17.7 0-32 14.3-32 32v320c0 17.7 14.3 32 32 32h96c12.4 0 22.4-10 22.4-22.4s-10-22.4-22.4-22.4H192V96h64c12.4 0 22.4-10 22.4-22.4S268.4 64 256 64H160z" />
            </svg>
            Sign out
          </button>
        </div>
      </div>
    </main>
  );
}
