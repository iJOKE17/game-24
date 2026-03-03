import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Play 24 Game — Make 24 with 4 Numbers",
  description:
    "Play the classic 24 card game online. Use four numbers and any combination of +, −, ×, ÷ operators to reach the number 24. Free, fast, and no sign-up required.",
  keywords: [
    "24 game",
    "make 24",
    "24 card game",
    "math puzzle",
    "number puzzle",
    "arithmetic game",
    "mental math game",
  ],
  openGraph: {
    title: "Play 24 Game — Make 24 with 4 Numbers",
    description:
      "Use four numbers and +, −, ×, ÷ to reach 24. A classic arithmetic puzzle game you can play in your browser.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Play 24 Game — Make 24 with 4 Numbers",
    description:
      "Use four numbers and +, −, ×, ÷ to reach 24. A classic arithmetic puzzle game you can play in your browser.",
  },
};

export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
