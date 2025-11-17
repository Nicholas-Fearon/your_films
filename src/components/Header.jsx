import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

export default async function Header() {
  const { userId } = await auth();

  return (
    <header className="bg-gray-800 text-white shadow-lg">
      <nav className="container mx-auto p-4 flex justify-center space-x-8">
        <Link
          href="/"
          className="hover:text-gray-300 transition-colors duration-300 font-semibold"
        >
          Home
        </Link>
        <Link
          href="/search"
          className="hover:text-gray-300 transition-colors duration-300 font-semibold"
        >
          Films
        </Link>
        {userId ? (
          <Link
            href={`/profile/${userId}`}
            className="hover:text-gray-300 transition-colors duration-300 font-semibold"
          >
            Profile
          </Link>
        ) : (
          <span className="text-gray-400 font-semibold">Profile</span>
        )}
        <Link
          href="/about"
          className="hover:text-gray-300 transition-colors duration-300 font-semibold"
        >
          About
        </Link>
      </nav>
    </header>
  );
}