import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the 24 Game team. We'd love to hear your feedback, bug reports, or ideas.",
};

export default function ContactPage() {
  return (
    <main className="flex items-center justify-center min-h-[80vh] bg-[#faf9f5] px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-5xl">✉️</span>
          <h1 className="text-3xl font-extrabold text-indigo-700 text-center">Contact</h1>
          <p className="text-gray-500 text-center text-sm max-w-md">
            Have feedback, found a bug, or just want to say hi? Reach out — we&apos;d love to hear from you.
          </p>
        </div>

        {/* Contact options */}
        <section className="flex flex-col gap-4">
          {/* GitHub */}
          <a
            href="https://github.com/iJOKE17/game-24/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-indigo-300 hover:bg-indigo-50 transition group"
          >
            <span className="text-3xl">🐛</span>
            <div>
              <div className="font-bold text-gray-800 group-hover:text-indigo-700 transition">
                Report a Bug / Feature Request
              </div>
              <div className="text-sm text-gray-500">Open an issue on GitHub</div>
            </div>
          </a>

          {/* GitHub repo */}
          <a
            href="https://github.com/iJOKE17/game-24"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-indigo-300 hover:bg-indigo-50 transition group"
          >
            <span className="text-3xl">💻</span>
            <div>
              <div className="font-bold text-gray-800 group-hover:text-indigo-700 transition">
                Source Code
              </div>
              <div className="text-sm text-gray-500">View or contribute on GitHub</div>
            </div>
          </a>
        </section>

        {/* FAQ */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-gray-800">FAQ</h2>
          <div className="flex flex-col gap-3">
            {[
              {
                q: "Is the game free?",
                a: "Yes, completely free — no sign-up, no ads, no downloads.",
              },
              {
                q: "Can I contribute to the project?",
                a: "Absolutely! The source code is open on GitHub. Pull requests are welcome.",
              },
              {
                q: "I found a puzzle with no solution. Is that possible?",
                a: "Yes! Not every set of four numbers has a solution that equals 24. That's part of the challenge.",
              },
            ].map(({ q, a }, i) => (
              <div key={i} className="bg-indigo-50 rounded-xl p-4">
                <div className="font-semibold text-gray-800 mb-1">{q}</div>
                <div className="text-gray-600 text-sm">{a}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
