
import Link from 'next/link';

export default function NavBar() {
	return (
		<nav className="w-full fixed top-0 left-0 z-50 bg-white/0 backdrop-blur border-b border-black/5">
			<div className="max-w-screen-xl mx-auto flex items-center justify-between py-3 px-6">
				{/* Logo */}
				<Link href="/" className="font-bold text-2xl text-white tracking-wide no-underline">
					24 Game
				</Link>
				{/* Menu */}
				<div className="flex gap-8 items-center">
					<Link href="/play" className="text-white font-medium no-underline text-lg transition-colors hover:text-blue-600">Play</Link>
					<Link href="/rules" className="text-white font-medium no-underline text-lg transition-colors hover:text-blue-600">Rules</Link>
				</div>
			</div>
		</nav>
	);
}
