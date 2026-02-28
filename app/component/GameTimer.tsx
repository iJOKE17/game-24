"use client";

import { useEffect, useRef, useState } from "react";

function formatTimer(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
}

interface GameTimerProps {
  resetKey: number;
}

const GameTimer = ({ resetKey }: GameTimerProps) => {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setSeconds(0);
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [resetKey]);

  return (
    <div className="flex items-center gap-2 mb-5 px-4 py-2 bg-indigo-50 rounded-full border border-indigo-200 shadow-sm">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 text-indigo-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      <span className="text-indigo-700 font-bold text-base tabular-nums">
        {formatTimer(seconds)}
      </span>
    </div>
  );
};

export default GameTimer;
