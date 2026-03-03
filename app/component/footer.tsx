import Link from "next/link";

const VERSION = "0.1.0";

export default function Footer() {
  return (
    <footer className="w-full py-4 flex flex-col items-center gap-1 bg-transparent">
      <nav className="flex gap-6 items-center">
        <Link href="/rules" className="text-sm text-[#141413] underline transition-colors">Rules</Link>
        <Link href="/about" className="text-sm text-[#141413] underline transition-colors">About</Link>
        <a href="https://github.com/iJOKE17/game-24" target="_blank" rel="noopener noreferrer" className="text-sm text-[#141413] underline transition-colors">GitHub</a>
        <Link href="/contract" className="text-sm text-[#141413] underline transition-colors">Contact</Link>
      </nav>
      <p className="text-xs text-[#141413] font-mono">Version {VERSION}</p>
    </footer>
  );
}
