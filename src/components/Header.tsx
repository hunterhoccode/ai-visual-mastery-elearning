"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-violet-200 group-hover:shadow-violet-300 transition-shadow">
              AI
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground leading-tight">
                AI Visual Mastery
              </h1>
              <p className="text-xs text-gray-500 -mt-0.5">
                Complete Studio Suite
              </p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {[
              { href: "/", label: "Home" },
              { href: "/modules", label: "All Modules" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname === href
                    ? "bg-violet-100 text-primary"
                    : "text-gray-600 hover:bg-gray-100 hover:text-foreground"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
          <Link
            href="/modules"
            className="px-5 py-2.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-violet-200 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            Start Learning
          </Link>
        </div>
      </div>
    </header>
  );
}
