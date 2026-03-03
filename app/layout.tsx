import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import NavBar from "./component/navBar";
import Footer from "./component/footer";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "24 Game — Classic Arithmetic Puzzle",
    template: "%s | 24 Game",
  },
  description:
    "Play the classic 24 card game online. Combine four numbers using +, −, ×, ÷ to make 24. Free math puzzle game — no sign-up needed.",
  keywords: ["24 game", "math puzzle", "arithmetic game", "number game", "card game"],
  openGraph: {
    siteName: "24 Game",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.className} antialiased flex flex-col min-h-screen`}
      >
        <NavBar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
