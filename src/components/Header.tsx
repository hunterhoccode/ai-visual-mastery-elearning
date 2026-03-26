"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-black font-extrabold text-sm">
              AI
            </div>
            <span className="text-sm font-bold text-white">AI Visual Mastery</span>
          </Link>
          <nav className="flex items-center gap-1">
            {[
              { href: "/", label: "Home" },
              { href: "/modules", label: "Modules" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === href
                    ? "text-primary"
                    : "text-muted hover:text-white"
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/modules"
              className="ml-2 px-4 py-1.5 bg-primary text-black text-sm font-bold rounded-lg hover:bg-primary-dark transition-colors"
            >
              Start Learning
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
