"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lesson } from "@/lib/content";

interface MobileNavProps {
  lessons: Lesson[];
  moduleSlug: string;
  moduleTitle: string;
  moduleNumber: number;
}

export default function MobileNav({
  lessons,
  moduleSlug,
  moduleTitle,
  moduleNumber,
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 bg-white rounded-2xl border border-border shadow-sm"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
            {moduleNumber}
          </div>
          <div className="text-left">
            <p className="text-xs text-gray-500">Module {moduleNumber}</p>
            <p className="text-sm font-semibold text-foreground">
              {moduleTitle}
            </p>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="mt-2 bg-white rounded-2xl border border-border shadow-lg overflow-hidden">
          <nav className="p-2 max-h-80 overflow-y-auto">
            {lessons.map((lesson) => {
              const href = `/modules/${moduleSlug}/${lesson.slug}`;
              const isActive = pathname === href;
              return (
                <Link key={lesson.slug} href={href} onClick={() => setIsOpen(false)}>
                  <div
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-violet-50 text-primary"
                        : "hover:bg-gray-50 text-gray-600"
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                        isActive
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {lesson.number}
                    </span>
                    <span className={`text-sm ${isActive ? "font-semibold" : "font-medium"}`}>
                      {lesson.title}
                    </span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}
