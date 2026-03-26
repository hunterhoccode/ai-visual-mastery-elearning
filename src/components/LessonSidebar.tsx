"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lesson } from "@/lib/content";

interface LessonSidebarProps {
  lessons: Lesson[];
  moduleSlug: string;
  moduleTitle: string;
  moduleNumber: number;
}

export default function LessonSidebar({
  lessons,
  moduleSlug,
  moduleTitle,
  moduleNumber,
}: LessonSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-80 shrink-0 hidden lg:block">
      <div className="sticky top-20 bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
        {/* Module header */}
        <div className="p-5 bg-gradient-to-br from-violet-500 to-purple-600 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-lg font-bold">
              {moduleNumber}
            </div>
            <div>
              <span className="text-xs font-semibold opacity-80 uppercase tracking-wider">
                Module {moduleNumber}
              </span>
              <h3 className="font-bold leading-snug">{moduleTitle}</h3>
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs opacity-80 mb-1">
              <span>{lessons.length} lessons</span>
            </div>
            <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white/80 rounded-full transition-all"
                style={{
                  width: `${
                    ((lessons.findIndex(
                      (l) =>
                        pathname ===
                        `/modules/${moduleSlug}/${l.slug}`
                    ) +
                      1) /
                      lessons.length) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Lesson list */}
        <nav className="p-2 max-h-[calc(100vh-14rem)] overflow-y-auto">
          {lessons.map((lesson, index) => {
            const href = `/modules/${moduleSlug}/${lesson.slug}`;
            const isActive = pathname === href;
            const activeIndex = lessons.findIndex(
              (l) => pathname === `/modules/${moduleSlug}/${l.slug}`
            );
            const isPast = index < activeIndex;

            return (
              <Link key={lesson.slug} href={href}>
                <div
                  className={`flex items-start gap-3 p-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-violet-50 text-primary shadow-sm"
                      : isPast
                        ? "text-gray-400 hover:bg-gray-50"
                        : "hover:bg-gray-50 text-gray-600"
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition-all ${
                      isActive
                        ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-md"
                        : isPast
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {isPast ? (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      lesson.number
                    )}
                  </span>
                  <span
                    className={`text-sm leading-snug ${
                      isActive ? "font-semibold" : "font-medium"
                    }`}
                  >
                    {lesson.title}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
