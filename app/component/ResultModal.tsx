"use client";

import { useEffect } from "react";
import ReloadIcon from "./reload";

interface ResultModalProps {
  message: string;
  thinkingSeconds: number;
  onClose: () => void;
  onNewGame: () => void;
}

function formatTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s === 0 ? `${m}m` : `${m}m ${s}s`;
}

const ResultModal = ({
  message,
  thinkingSeconds,
  onClose,
  onNewGame,
}: ResultModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onNewGame();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNewGame]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl px-8 py-8 flex flex-col items-center gap-4 max-w-sm w-full mx-4 animate-[fadeInScale_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition cursor-pointer text-xl"
          onClick={onClose}
        >
          ×
        </button>

        <p className="text-2xl font-bold text-center text-gray-800">{message}</p>

        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-indigo-400 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="12" cy="12" r="10" />
            <path strokeLinecap="round" d="M12 6v6l4 2" />
          </svg>
          <span>
            Thinking time:{" "}
            <span className="font-semibold text-indigo-600">
              {formatTime(thinkingSeconds)}
            </span>
          </span>
        </div>

        <div className="flex gap-3 mt-1 w-full">
          <button
            type="button"
            className="flex-1 px-4 py-2 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 transition cursor-pointer"
            onClick={onClose}
          >
            Keep Playing
          </button>
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition cursor-pointer"
            onClick={onNewGame}
          >
            <ReloadIcon className="w-4 h-4" color="#fff" />
            New Game
          </button>
        </div>

        <p className="text-xs text-gray-400 -mt-1">Press Esc to start a new game</p>
      </div>
    </div>
  );
};

export default ResultModal;
