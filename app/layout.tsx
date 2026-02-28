import type { Metadata } from "next";
import { Roboto_Mono, Vazirmatn } from "next/font/google";
import "./globals.css";
import NavBar from "./component/navBar";
import Footer from "./component/footer";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  title: "24 Game",
  description: "The classic 24 card game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoMono.variable} ${vazirmatn.variable} antialiased flex flex-col min-h-screen`}
      >
        <NavBar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
