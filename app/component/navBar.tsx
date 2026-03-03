
import Link from 'next/link';
import Image from 'next/image';

export default function NavBar() {
	return (
		<nav className="w-full z-50 bg-white/0 backdrop-blur">
			<div className="max-w-screen-xl mx-auto flex items-center justify-between py-1">
				<Link href="/" className="no-underline">
					<Image
						src="/logo-removebg-preview-crop.png"
						alt="Game 24 Logo"
						width={120}
						height={0}
						className="object-contain h-auto"
						priority
					/>
				</Link>
				<Link href="/login" className="flex items-center justify-center w-4 h-4 hover:opacity-70 transition-opacity">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 448 512"
						fill="currentColor"
						className="w-4 h-4 text-gray-500"
						aria-label="Login"
					>
						<path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
					</svg>
				</Link>
			</div>
		</nav>
	);
}
