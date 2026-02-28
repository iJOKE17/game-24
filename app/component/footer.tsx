import Link from "next/link";

const GIT_HASH = "21a3bbd";
const VERSION = "0.1.0";

export default function Footer() {
  return (
    <footer className="w-full py-4 flex flex-col items-center gap-1 bg-[#faf9f5]">
      <nav className="flex gap-6 items-center">
        <Link href="/rules" className="text-sm text-[#141413] underline hover:text-white transition-colors">Rules</Link>
        <Link href="/about" className="text-sm text-[#141413] underline hover:text-white transition-colors">About</Link>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[#141413] underline hover:text-white transition-colors">GitHub</a>
        <a href="mailto:contact@example.com" className="text-sm text-[#141413] underline hover:text-white transition-colors">Contact</a>
      </nav>
      <p className="text-xs text-[#141413] font-mono">Version {VERSION} (#{GIT_HASH})</p>
    </footer>
  );
}
