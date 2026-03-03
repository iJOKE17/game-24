import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about the 24 Game — a classic arithmetic puzzle where you combine four numbers to make 24.",
};

export default function AboutPage() {
  return (
    <main className="flex items-center justify-center min-h-[80vh] bg-[#faf9f5] px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-5xl">🃏</span>
          <h1 className="text-3xl font-extrabold text-indigo-700 text-center">About 24 Game</h1>
          <p className="text-gray-500 text-center text-sm max-w-md">
            A classic arithmetic card game that sharpens your mental math skills.
          </p>
        </div>

        {/* What is it */}
        <section className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-gray-800">What is the 24 Game?</h2>
          <p className="text-gray-600 leading-relaxed">
            The 24 Game is a mathematical card game in which the objective is to find a way to
            manipulate four numbers so that the end result is 24. You can use addition, subtraction,
            multiplication, and division — and each number must be used exactly once.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Originally published as a card game in 1988, it has been used in schools worldwide to
            help students practice arithmetic and develop number sense.
          </p>
        </section>


        {/* Why play */}
        <section className="bg-indigo-50 rounded-xl p-5 flex flex-col gap-2">
          <h2 className="text-xl font-bold text-gray-800">Why Play?</h2>
          <ul className="flex flex-col gap-1 text-gray-600 list-disc list-inside">
            <li>Improves mental arithmetic speed</li>
            <li>Builds problem-solving and logical thinking</li>
            <li>Great for all ages — students, teachers, and curious minds</li>
            <li>No account or download required — play instantly in your browser</li>
          </ul>
        </section>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/play"
            className="flex-1 text-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow transition"
          >
            Play Now
          </Link>
          <Link
            href="/rules"
            className="flex-1 text-center px-6 py-3 bg-white border-2 border-indigo-200 hover:border-indigo-400 text-indigo-700 font-bold rounded-lg shadow transition"
          >
            View Rules
          </Link>
        </div>
      </div>
    </main>
  );
}
