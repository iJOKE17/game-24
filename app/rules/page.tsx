import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rules",
  description:
    "Learn how to play the 24 Game. Use four numbers with +, −, ×, ÷ and parentheses to reach exactly 24. Simple rules, endless challenge.",
  keywords: [
    "24 game rules",
    "how to play 24 game",
    "math puzzle rules",
    "arithmetic game instructions",
  ],
  openGraph: {
    title: "How to Play the 24 Game",
    description:
      "Simple rules, endless challenge. Combine four numbers using basic arithmetic to reach 24.",
    type: "website",
  },
};

const rules = [
  {
    number: "01",
    title: "Four Numbers",
    description:
      "Each round gives you four numbers. They can range from 1 to 9 — sometimes friendly, sometimes fiendish.",
    icon: "🎲",
  },
  {
    number: "02",
    title: "Four Operations",
    description:
      "Use addition (+), subtraction (−), multiplication (×), and division (÷) to combine the numbers.",
    icon: "➕",
  },
  {
    number: "03",
    title: "Use Each Number Exactly Once",
    description:
      "Every number must appear in your expression — no skipping, no repeating. All four, no exceptions.",
    icon: "☑️",
  },
  {
    number: "04",
    title: "Parentheses Are Your Friend",
    description:
      "Change the order of operations freely with parentheses. (3 + 5) × 3 is very different from 3 + 5 × 3.",
    icon: "🔢",
  },
  {
    number: "05",
    title: "Hit Exactly 24",
    description:
      "Your final answer must equal exactly 24 — not 23, not 25. Precision is everything.",
    icon: "🎯",
  },
];

const examples = [
  {
    numbers: "2, 3, 4, 6",
    expression: "2 × 3 × (6 − 4)",
    result: 24,
  },
  {
    numbers: "1, 5, 5, 5",
    expression: "5 × (5 − 1 ÷ 5)",
    result: 24,
  },
  {
    numbers: "3, 3, 8, 8",
    expression: "8 ÷ (3 − 8 ÷ 3)",
    result: 24,
  },
];

export default function RulesPage() {
  return (
    <main className="flex items-center justify-center min-h-[80vh] bg-[#faf9f5] px-4 py-12">
      <div className="w-full max-w-2xl flex flex-col gap-8">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center gap-2 text-center">
          <span className="text-5xl">📖</span>
          <h1 className="text-3xl font-extrabold text-indigo-700">How to Play</h1>
          <p className="text-gray-500 text-sm max-w-md">
            The 24 Game has one simple goal and infinite ways to get there. Master
            these five rules and you&apos;re ready to play.
          </p>
        </div>

        {/* Rules */}
        <div className="flex flex-col gap-4">
          {rules.map((rule) => (
            <div
              key={rule.number}
              className="bg-white rounded-2xl shadow-md p-5 flex items-start gap-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-xl">
                {rule.icon}
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-indigo-400 tracking-widest">
                    RULE {rule.number}
                  </span>
                </div>
                <h2 className="text-base font-extrabold text-gray-800">{rule.title}</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{rule.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Examples */}
        <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-4">
          <h2 className="text-xl font-extrabold text-gray-800 flex items-center gap-2">
            <span>💡</span> Worked Examples
          </h2>
          <p className="text-gray-500 text-sm">
            Stuck? Here&apos;s how the same four numbers can combine to make 24:
          </p>
          <div className="flex flex-col gap-3">
            {examples.map((ex) => (
              <div
                key={ex.numbers}
                className="flex items-center justify-between bg-indigo-50 rounded-xl px-4 py-3 flex-wrap gap-2"
              >
                <div className="flex flex-col">
                  <span className="text-xs text-indigo-400 font-bold tracking-wide">NUMBERS</span>
                  <span className="font-bold text-gray-700">{ex.numbers}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-indigo-400 font-bold tracking-wide">EXPRESSION</span>
                  <span className="font-mono font-bold text-gray-700">{ex.expression}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-indigo-400 font-bold tracking-wide">RESULT</span>
                  <span className="font-extrabold text-indigo-700 text-lg">{ex.result}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex flex-col gap-3">
          <h2 className="text-xl font-extrabold text-gray-800 flex items-center gap-2">
            <span>🏆</span> Pro Tips
          </h2>
          <ul className="flex flex-col gap-2 text-sm text-gray-700">
            {[
              "Try multiplication first — it's the fastest way to get big numbers.",
              "If you have a 1, use it to adjust: multiplying or dividing by 1 leaves you in control.",
              "Fractions are legal! 3 ÷ (1 − 3/4) = 12 × 2 = 24.",
              "No solution exists for some combinations — that's part of the challenge.",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-amber-500 font-bold flex-shrink-0">→</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/play"
            className="flex-1 text-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow transition"
          >
            Play Now
          </Link>
          <Link
            href="/about"
            className="flex-1 text-center px-6 py-3 bg-white border-2 border-indigo-200 hover:border-indigo-400 text-indigo-700 font-bold rounded-lg shadow transition"
          >
            About the Game
          </Link>
        </div>

      </div>
    </main>
  );
}
