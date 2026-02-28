
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
			</div>
		</nav>
	);
}
